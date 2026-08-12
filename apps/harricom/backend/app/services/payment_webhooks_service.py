import hashlib
import hmac

from fastapi import HTTPException, status

from app.models.order import Order
from app.models.payment_webhook import PaymentWebhookReceipt
from app.repositories.orders_repo import OrdersRepository
from app.schemas.orders import PaymentWebhookEvent


def verify_webhook_signature(raw_body: bytes, signature: str, secret: str) -> None:
    if not secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Webhook secret is not configured",
        )

    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    if not signature or not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid webhook signature")


def _load_order(repo: OrdersRepository, event: PaymentWebhookEvent) -> Order:
    order = None
    if event.order_id:
        order = repo.get_by_id(event.order_id)
    if not order and event.order_number:
        order = repo.get_by_order_number(event.order_number)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order


def _apply_status(order: Order, payment_status: str) -> bool:
    changed = False
    if order.payment_status != payment_status:
        order.payment_status = payment_status
        changed = True

    target_status = order.status
    if payment_status == "paid":
        target_status = "paid"
    elif payment_status == "failed" and order.status in ("created", "awaiting_payment"):
        target_status = "payment_failed"
    elif payment_status == "pending" and order.status == "created":
        target_status = "awaiting_payment"

    if target_status != order.status:
        order.status = target_status
        changed = True

    return changed


def reconcile_payment_webhook(
    repo: OrdersRepository,
    provider: str,
    event: PaymentWebhookEvent,
    event_id: str,
    payload_hash: str,
) -> tuple[Order, bool, bool]:
    if not event.order_id and not event.order_number:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="order_id or order_number is required")

    existing = repo.get_webhook_receipt(provider, event_id)
    if existing:
        order = repo.get_by_id(existing.order_id) if existing.order_id else _load_order(repo, event)
        return order, False, True

    order = _load_order(repo, event)

    if order.payment_provider and order.payment_provider != provider:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Webhook provider does not match order payment provider",
        )

    if event.amount_minor is not None and event.payment_status == "paid" and event.amount_minor != order.total_minor:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Paid amount does not match order total")

    changed = _apply_status(order, event.payment_status)
    receipt = PaymentWebhookReceipt(
        provider=provider,
        event_id=event_id,
        order_id=order.id,
        payment_status=event.payment_status,
        payload_hash=payload_hash,
    )
    repo.add_webhook_receipt(receipt)

    if changed and not order.payment_provider:
        order.payment_provider = provider

    repo.commit()
    repo.refresh(order)

    return order, changed, False
