from dataclasses import dataclass
from urllib.parse import quote_plus

from fastapi import HTTPException, status

from app.models.order import Order
from app.repositories.orders_repo import OrdersRepository
from app.schemas.orders import PaymentLinkCreate


@dataclass
class PaymentLinkResult:
    provider: str
    url: str


def _build_wipay_link(order: Order, payload: PaymentLinkCreate) -> str:
    base = "https://checkout.wipayfinancial.com/hosted/pay"
    reference = quote_plus(order.order_number)
    amount = quote_plus(str(order.total_minor))
    currency = quote_plus(order.currency)
    success = quote_plus(payload.success_url)
    cancel = quote_plus(payload.cancel_url)
    return (
        f"{base}?ref={reference}&amount_minor={amount}&currency={currency}"
        f"&success_url={success}&cancel_url={cancel}"
    )


def _build_stripe_link(order: Order, payload: PaymentLinkCreate) -> str:
    # Placeholder link format until direct Stripe API integration is added.
    base = "https://checkout.stripe.com/pay/mock"
    reference = quote_plus(order.order_number)
    amount = quote_plus(str(order.total_minor))
    currency = quote_plus(order.currency.lower())
    success = quote_plus(payload.success_url)
    cancel = quote_plus(payload.cancel_url)
    return (
        f"{base}?client_reference_id={reference}&amount_minor={amount}&currency={currency}"
        f"&success_url={success}&cancel_url={cancel}"
    )


def _create_provider_link(order: Order, payload: PaymentLinkCreate) -> PaymentLinkResult:
    if payload.provider == "wipay":
        return PaymentLinkResult(provider="wipay", url=_build_wipay_link(order, payload))
    if payload.provider == "stripe":
        return PaymentLinkResult(provider="stripe", url=_build_stripe_link(order, payload))
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Unsupported payment provider")


def create_or_reuse_payment_link(
    repo: OrdersRepository,
    order_id: str,
    payload: PaymentLinkCreate,
) -> tuple[Order, PaymentLinkResult, bool]:
    order = repo.get_by_id(order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")

    if order.payment_status == "paid":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Order already paid")

    if order.payment_link and order.payment_provider == payload.provider:
        existing = PaymentLinkResult(provider=order.payment_provider, url=order.payment_link)
        return order, existing, True

    link = _create_provider_link(order, payload)
    order.payment_provider = link.provider
    order.payment_link = link.url
    if order.payment_status in ("", "unpaid"):
        order.payment_status = "pending"
    if order.status == "created":
        order.status = "awaiting_payment"

    repo.commit()
    repo.refresh(order)
    return order, link, False
