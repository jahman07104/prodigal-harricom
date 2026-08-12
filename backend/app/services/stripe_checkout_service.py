import json
from dataclasses import dataclass
from time import time
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

import stripe
from fastapi import HTTPException, status
from pydantic import BaseModel, Field, ValidationError

from app.core.config import Settings
from app.models.order import Order
from app.repositories.orders_repo import OrdersRepository
from app.schemas.orders import OrderCreate, OrderItemCreate, StripeCheckoutCreate
from app.services.orders_service import create_order


class StripeCatalogProduct(BaseModel):
    title: str = Field(min_length=1, max_length=180)
    price_id: str = Field(min_length=1, max_length=120, pattern=r"^price_[A-Za-z0-9]+$")


@dataclass
class StripeCheckoutResult:
    order: Order
    url: str


def _configured_catalog(settings: Settings) -> dict[str, StripeCatalogProduct]:
    if not settings.stripe_secret_key:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Stripe checkout is not configured")
    if not settings.stripe_product_catalog_json:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Stripe product catalog is not configured")

    try:
        raw_catalog = json.loads(settings.stripe_product_catalog_json)
        if not isinstance(raw_catalog, dict):
            raise ValueError("Catalog must be an object")
        return {
            product_code: StripeCatalogProduct.model_validate(product)
            for product_code, product in raw_catalog.items()
        }
    except (json.JSONDecodeError, ValidationError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Stripe product catalog is invalid",
        ) from exc


def _validate_redirect_url(url: str, settings: Settings) -> str:
    parsed = urlparse(url)
    origin = f"{parsed.scheme}://{parsed.netloc}".rstrip("/")
    if parsed.scheme != "https" or origin not in settings.stripe_checkout_allowed_origins:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Stripe checkout redirect URL is not allowed",
        )
    return url


def _append_checkout_session_id(url: str) -> str:
    parsed = urlparse(url)
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))
    query["session_id"] = "{CHECKOUT_SESSION_ID}"
    checkout_url = urlunparse(parsed._replace(query=urlencode(query)))
    return checkout_url.replace("%7BCHECKOUT_SESSION_ID%7D", "{CHECKOUT_SESSION_ID}")


def _retrieve_price(price_id: str):
    try:
        return stripe.Price.retrieve(price_id)
    except stripe.StripeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to retrieve the configured Stripe price",
        ) from exc


def create_stripe_checkout_session(
    repo: OrdersRepository,
    payload: StripeCheckoutCreate,
    settings: Settings,
) -> StripeCheckoutResult:
    catalog = _configured_catalog(settings)
    product = catalog.get(payload.product_code)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Stripe product not found")

    success_url = _append_checkout_session_id(_validate_redirect_url(payload.success_url, settings))
    cancel_url = _validate_redirect_url(payload.cancel_url, settings)

    stripe.api_key = settings.stripe_secret_key
    price = _retrieve_price(product.price_id)
    unit_amount = getattr(price, "unit_amount", None)
    currency = getattr(price, "currency", None)
    if not getattr(price, "active", False) or not isinstance(unit_amount, int) or unit_amount < 0 or not currency:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Configured Stripe price is unavailable")

    order, _ = create_order(
        repo,
        OrderCreate(
            customer_name=payload.customer_name,
            customer_phone=payload.customer_phone,
            customer_email=payload.customer_email,
            currency=currency.upper(),
            source_channel="prodigal_stripe_checkout",
            items=[
                OrderItemCreate(
                    template_slug=payload.product_code,
                    title=product.title,
                    quantity=payload.quantity,
                    unit_price_minor=unit_amount,
                )
            ],
        ),
    )

    try:
        checkout_session = stripe.checkout.Session.create(
            mode="payment",
            client_reference_id=order.order_number,
            customer_email=payload.customer_email or None,
            line_items=[{"price": product.price_id, "quantity": payload.quantity}],
            metadata={
                "order_id": order.id,
                "order_number": order.order_number,
                "product_code": payload.product_code,
            },
            success_url=success_url,
            cancel_url=cancel_url,
            expires_at=int(time()) + (30 * 60),
        )
    except stripe.StripeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to create Stripe Checkout session",
        ) from exc

    checkout_url = getattr(checkout_session, "url", None)
    if not checkout_url:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Stripe did not return a checkout URL")

    order.payment_provider = "stripe"
    order.payment_link = checkout_url
    order.payment_status = "pending"
    order.status = "awaiting_payment"
    repo.commit()
    repo.refresh(order)
    return StripeCheckoutResult(order=order, url=checkout_url)
