import hashlib
import hmac
import json
import time
from dataclasses import dataclass
from typing import Mapping

from fastapi import HTTPException, status

from app.core.config import Settings
from app.schemas.orders import PaymentWebhookEvent


@dataclass
class NormalizedWebhook:
    event: PaymentWebhookEvent
    event_id: str
    payload_hash: str


def _verify_hmac_sha256(raw_body: bytes, signature: str, secret: str) -> None:
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    if not signature or not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook signature")


def _parse_json(raw_body: bytes) -> dict:
    try:
        return json.loads(raw_body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON payload") from exc


def _map_status(value: str) -> str:
    normalized = (value or "").strip().lower()
    if normalized in ("paid", "succeeded", "success", "completed"):
        return "paid"
    if normalized in ("failed", "failure", "canceled", "cancelled", "expired"):
        return "failed"
    return "pending"


def _extract_wipay_event(payload: dict) -> PaymentWebhookEvent:
    return PaymentWebhookEvent(
        order_id=(payload.get("order_id") or "").strip() or None,
        order_number=(payload.get("order_number") or payload.get("reference") or "").strip() or None,
        payment_status=_map_status(str(payload.get("payment_status") or payload.get("status") or "pending")),
        amount_minor=payload.get("amount_minor"),
        currency=(payload.get("currency") or "").upper() or None,
        provider_payment_id=(payload.get("provider_payment_id") or payload.get("transaction_id") or "").strip(),
    )


def _extract_stripe_signature_parts(signature_header: str) -> tuple[str, list[str]]:
    timestamp = ""
    v1_candidates: list[str] = []
    for part in signature_header.split(","):
        token = part.strip()
        if token.startswith("t="):
            timestamp = token[2:]
        elif token.startswith("v1="):
            v1_candidates.append(token[3:])
    return timestamp, v1_candidates


def _verify_stripe_signature(raw_body: bytes, signature_header: str, settings: Settings) -> None:
    timestamp, v1_candidates = _extract_stripe_signature_parts(signature_header)

    if not timestamp or not v1_candidates:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Malformed Stripe-Signature header")

    try:
        ts_int = int(timestamp)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Stripe signature timestamp") from exc

    tolerance = settings.stripe_webhook_tolerance_seconds
    if tolerance > 0 and abs(int(time.time()) - ts_int) > tolerance:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Stripe signature timestamp outside tolerance")

    signed_payload = timestamp.encode("utf-8") + b"." + raw_body
    expected = hmac.new(settings.stripe_webhook_secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    if not any(hmac.compare_digest(candidate, expected) for candidate in v1_candidates):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Stripe signature")


def _normalize_stripe_event(payload: dict, payload_hash: str) -> NormalizedWebhook:
    event_id = str(payload.get("id") or "").strip()
    event_type = str(payload.get("type") or "").strip()
    data_object = payload.get("data", {}).get("object", {})

    status_by_type = {
        "checkout.session.completed": "paid",
        "checkout.session.expired": "failed",
        "payment_intent.succeeded": "paid",
        "payment_intent.payment_failed": "failed",
        "payment_intent.processing": "pending",
    }
    mapped_status = status_by_type.get(event_type)
    if not mapped_status:
        raise HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="Stripe event type ignored")

    order_number = str(
        data_object.get("client_reference_id")
        or data_object.get("metadata", {}).get("order_number")
        or ""
    ).strip()
    order_id = str(data_object.get("metadata", {}).get("order_id") or "").strip()

    amount_minor = data_object.get("amount_total")
    if amount_minor is None:
        amount_minor = data_object.get("amount")

    event = PaymentWebhookEvent(
        order_id=order_id or None,
        order_number=order_number or None,
        payment_status=mapped_status,
        amount_minor=amount_minor,
        currency=str(data_object.get("currency") or "").upper() or None,
        provider_payment_id=str(data_object.get("payment_intent") or data_object.get("id") or event_id),
    )
    return NormalizedWebhook(event=event, event_id=event_id or payload_hash, payload_hash=payload_hash)


def _verify_and_parse_stripe_native(raw_body: bytes, headers: Mapping[str, str], settings: Settings) -> NormalizedWebhook:
    if not settings.stripe_webhook_secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Webhook secret is not configured")

    signature_header = headers.get("stripe-signature", "")
    if not signature_header:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing Stripe-Signature header")

    payload_hash = hashlib.sha256(raw_body).hexdigest()
    _verify_stripe_signature(raw_body, signature_header, settings)
    payload = _parse_json(raw_body)
    return _normalize_stripe_event(payload, payload_hash)


def _verify_and_parse_generic(
    provider: str,
    raw_body: bytes,
    headers: Mapping[str, str],
    settings: Settings,
) -> NormalizedWebhook:
    secret = settings.stripe_webhook_secret if provider == "stripe" else settings.wipay_webhook_secret
    if not secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Webhook secret is not configured")

    signature = headers.get("x-harricom-signature", "") or headers.get("x-wipay-signature", "")
    _verify_hmac_sha256(raw_body, signature, secret)

    payload = _parse_json(raw_body)
    if provider == "wipay" and "payment_status" not in payload and "status" in payload:
        event = _extract_wipay_event(payload)
    else:
        try:
            event = PaymentWebhookEvent.model_validate(payload)
        except ValueError as exc:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc

    payload_hash = hashlib.sha256(raw_body).hexdigest()
    event_id = (
        headers.get("x-harricom-event-id", "").strip()
        or str(payload.get("event_id") or "").strip()
        or event.provider_payment_id.strip()
        or payload_hash
    )
    return NormalizedWebhook(event=event, event_id=event_id, payload_hash=payload_hash)


def normalize_provider_webhook(
    provider: str,
    raw_body: bytes,
    headers: Mapping[str, str],
    settings: Settings,
) -> NormalizedWebhook:
    if provider == "stripe" and headers.get("stripe-signature"):
        return _verify_and_parse_stripe_native(raw_body, headers, settings)

    return _verify_and_parse_generic(provider, raw_body, headers, settings)
