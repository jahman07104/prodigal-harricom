from datetime import datetime, timezone
from uuid import uuid4

from app.models.order import Order, OrderItem
from app.repositories.orders_repo import OrdersRepository
from app.schemas.orders import OrderCreate


def _now_utc() -> datetime:
    return datetime.now(timezone.utc)


def _generate_order_number() -> str:
    stamp = _now_utc().strftime("%Y%m%d")
    suffix = uuid4().hex[:8].upper()
    return f"HC-{stamp}-{suffix}"


def _normalize_currency(code: str) -> str:
    normalized = (code or "JMD").strip().upper()
    return normalized if len(normalized) == 3 else "JMD"


def create_order(repo: OrdersRepository, payload: OrderCreate) -> tuple[Order, bool]:
    key = (payload.idempotency_key or "").strip()
    if key:
        existing = repo.get_by_idempotency_key(key)
        if existing:
            return existing, True

    order_id = str(uuid4())
    order_number = _generate_order_number()

    total_minor = 0
    items: list[OrderItem] = []
    for item in payload.items:
        line_total = item.quantity * item.unit_price_minor
        total_minor += line_total
        items.append(
            OrderItem(
                template_slug=item.template_slug,
                title=item.title,
                quantity=item.quantity,
                unit_price_minor=item.unit_price_minor,
                line_total_minor=line_total,
            )
        )

    order = Order(
        id=order_id,
        order_number=order_number,
        idempotency_key=key or None,
        source_channel=payload.source_channel,
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        customer_email=payload.customer_email,
        currency=_normalize_currency(payload.currency),
        total_minor=total_minor,
        status="created",
        payment_status="unpaid",
        payment_provider="",
        payment_link="",
        notes=payload.notes,
        items=items,
    )

    repo.add(order)
    repo.commit()
    repo.refresh(order)
    return order, False


def order_to_dict(order: Order) -> dict:
    return {
        "id": order.id,
        "order_number": order.order_number,
        "source_channel": order.source_channel,
        "customer_name": order.customer_name,
        "customer_phone": order.customer_phone,
        "customer_email": order.customer_email,
        "currency": order.currency,
        "total_minor": order.total_minor,
        "status": order.status,
        "payment_status": order.payment_status,
        "payment_provider": order.payment_provider,
        "payment_link": order.payment_link,
        "notes": order.notes,
        "created_at": str(order.created_at),
        "updated_at": str(order.updated_at),
        "items": [
            {
                "id": item.id,
                "template_slug": item.template_slug,
                "title": item.title,
                "quantity": item.quantity,
                "unit_price_minor": item.unit_price_minor,
                "line_total_minor": item.line_total_minor,
            }
            for item in order.items
        ],
    }
