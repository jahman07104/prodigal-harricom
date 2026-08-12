import csv
import io
from typing import Literal

from typing import Annotated

import hashlib

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import require_admin_token
from app.db.session import get_db
from app.models.payment_webhook import PaymentWebhookAttempt
from app.repositories.orders_repo import OrdersRepository
from app.schemas.orders import OrderCreate, PaymentLinkCreate, StripeCheckoutCreate
from app.services.orders_service import create_order, order_to_dict
from app.services.payment_links_service import create_or_reuse_payment_link
from app.services.payment_provider_webhooks_service import normalize_provider_webhook
from app.services.payment_webhooks_service import reconcile_payment_webhook
from app.services.stripe_checkout_service import create_stripe_checkout_session

router = APIRouter()

ALLOWED_WEBHOOK_PROVIDERS = {"stripe", "wipay"}
ALLOWED_WEBHOOK_OUTCOMES = {"applied", "deduplicated", "failed", "ignored"}


def _log_webhook_attempt(
    repo: OrdersRepository,
    provider: str,
    event_id: str,
    payload_hash: str,
    outcome: str,
    order_id: str | None = None,
    failure_reason: str = "",
) -> None:
    repo.add_webhook_attempt(
        PaymentWebhookAttempt(
            provider=provider,
            event_id=event_id,
            order_id=order_id,
            outcome=outcome,
            failure_reason=failure_reason[:300],
            payload_hash=payload_hash,
        )
    )
    repo.commit()


def _normalize_webhook_filter(
    value: str | None,
    *,
    allowed: set[str],
    field_name: str,
) -> str | None:
    if value is None:
        return None
    normalized = value.strip().lower()
    if not normalized:
        return None
    if normalized not in allowed:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail=f"Invalid {field_name}. Allowed values: {', '.join(sorted(allowed))}",
        )
    return normalized


@router.post("/orders", status_code=status.HTTP_201_CREATED)
def create_order_endpoint(
    payload: OrderCreate,
    response: Response,
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    repo = OrdersRepository(db)
    order, replayed = create_order(repo, payload)
    if replayed:
        response.status_code = status.HTTP_200_OK
    return {
        "ok": True,
        "idempotent_replay": replayed,
        "order": order_to_dict(order),
    }


@router.post("/orders/{order_id}/payment-link", status_code=status.HTTP_201_CREATED)
def create_payment_link_endpoint(
    order_id: str,
    payload: PaymentLinkCreate,
    response: Response,
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    repo = OrdersRepository(db)
    order, link, reused = create_or_reuse_payment_link(repo, order_id, payload)
    if reused:
        response.status_code = status.HTTP_200_OK
    return {
        "ok": True,
        "reused": reused,
        "payment": {
            "provider": link.provider,
            "url": link.url,
        },
        "order": order_to_dict(order),
    }


@router.post("/payments/stripe/checkout-session", status_code=status.HTTP_201_CREATED)
def create_stripe_checkout_session_endpoint(
    payload: StripeCheckoutCreate,
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    result = create_stripe_checkout_session(OrdersRepository(db), payload, get_settings())
    return {
        "ok": True,
        "payment": {
            "provider": "stripe",
            "url": result.url,
        },
        "order": order_to_dict(result.order),
    }


@router.post("/payments/webhook/{provider}")
async def payment_webhook_endpoint(
    provider: Literal["stripe", "wipay"],
    request: Request,
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    settings = get_settings()
    raw_body = await request.body()
    repo = OrdersRepository(db)
    payload_hash = hashlib.sha256(raw_body).hexdigest()
    event_id = request.headers.get("x-harricom-event-id", "").strip() or payload_hash

    try:
        normalized = normalize_provider_webhook(provider, raw_body, request.headers, settings)
        payload_hash = normalized.payload_hash
        event_id = normalized.event_id
        order, applied, deduplicated = reconcile_payment_webhook(
            repo,
            provider,
            normalized.event,
            event_id=event_id,
            payload_hash=payload_hash,
        )
    except HTTPException as exc:
        status_code = exc.status_code
        detail = exc.detail
        outcome = "ignored" if status_code == status.HTTP_202_ACCEPTED else "failed"
        _log_webhook_attempt(
            repo,
            provider,
            event_id,
            payload_hash,
            outcome=outcome,
            failure_reason=str(detail),
        )
        raise
    except Exception as exc:
        _log_webhook_attempt(
            repo,
            provider,
            event_id,
            payload_hash,
            outcome="failed",
            failure_reason=str(exc),
        )
        raise

    outcome = "deduplicated" if deduplicated else "applied"
    _log_webhook_attempt(
        repo,
        provider,
        event_id,
        payload_hash,
        outcome=outcome,
        order_id=order.id,
    )

    return {
        "ok": True,
        "applied": applied,
        "deduplicated": deduplicated,
        "event_id": event_id,
        "provider": provider,
        "order": order_to_dict(order),
    }


@router.get("/payments/webhooks/diagnostics")
def payment_webhook_diagnostics(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    limit: int = 20,
    cursor: int | None = None,
    provider: str | None = None,
    outcome: str | None = None,
) -> dict:
    settings = get_settings()
    require_admin_token(request, settings.admin_token)

    provider_filter = _normalize_webhook_filter(
        provider,
        allowed=ALLOWED_WEBHOOK_PROVIDERS,
        field_name="provider",
    )
    outcome_filter = _normalize_webhook_filter(
        outcome,
        allowed=ALLOWED_WEBHOOK_OUTCOMES,
        field_name="outcome",
    )
    if cursor is not None and cursor <= 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Invalid cursor. Must be a positive integer.",
        )

    safe_limit = min(max(limit, 1), 100)
    repo = OrdersRepository(db)
    recent_attempts, next_cursor, has_more = repo.list_recent_webhook_attempts_page(
        safe_limit,
        provider=provider_filter,
        outcome=outcome_filter,
        cursor=cursor,
    )
    summary = repo.webhook_attempt_summary(
        provider=provider_filter,
        outcome=outcome_filter,
    )
    summary["recent_attempts"] = [
        {
            "provider": row.provider,
            "event_id": row.event_id,
            "order_id": row.order_id,
            "outcome": row.outcome,
            "failure_reason": row.failure_reason,
            "created_at": str(row.created_at),
        }
        for row in recent_attempts
    ]
    summary["paging"] = {
        "limit": safe_limit,
        "cursor": cursor,
        "next_cursor": next_cursor,
        "has_more": has_more,
    }
    return summary


@router.get("/payments/webhooks/export.csv")
def export_payment_webhooks_csv(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    limit: int = 1000,
    provider: str | None = None,
    outcome: str | None = None,
) -> StreamingResponse:
    settings = get_settings()
    require_admin_token(request, settings.admin_token)

    provider_filter = _normalize_webhook_filter(
        provider,
        allowed=ALLOWED_WEBHOOK_PROVIDERS,
        field_name="provider",
    )
    outcome_filter = _normalize_webhook_filter(
        outcome,
        allowed=ALLOWED_WEBHOOK_OUTCOMES,
        field_name="outcome",
    )

    safe_limit = min(max(limit, 1), 10000)
    repo = OrdersRepository(db)
    rows = repo.list_webhook_attempts_for_export(
        safe_limit,
        provider=provider_filter,
        outcome=outcome_filter,
    )

    def generate() -> str:
        buf = io.StringIO()
        writer = csv.writer(buf)
        writer.writerow(["created_at", "provider", "event_id", "order_id", "outcome", "failure_reason", "payload_hash"])
        for row in rows:
            writer.writerow([
                str(row.created_at),
                row.provider,
                row.event_id,
                row.order_id or "",
                row.outcome,
                row.failure_reason,
                row.payload_hash,
            ])
        return buf.getvalue()

    return StreamingResponse(
        iter([generate()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=harricom-payment-webhooks.csv"},
    )
