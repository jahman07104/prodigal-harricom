from pydantic import BaseModel, Field
from typing import Literal


class OrderItemCreate(BaseModel):
    template_slug: str = Field(default="", max_length=120)
    title: str = Field(min_length=1, max_length=180)
    quantity: int = Field(default=1, ge=1, le=100)
    unit_price_minor: int = Field(default=0, ge=0)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=1, max_length=120)
    customer_phone: str = Field(min_length=1, max_length=40)
    customer_email: str = Field(default="", max_length=120)
    currency: str = Field(default="JMD", min_length=3, max_length=3)
    source_channel: str = Field(default="whatsapp", max_length=32)
    notes: str = Field(default="", max_length=600)
    idempotency_key: str | None = Field(default=None, max_length=128)
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderItemOut(BaseModel):
    id: int
    template_slug: str
    title: str
    quantity: int
    unit_price_minor: int
    line_total_minor: int


class OrderOut(BaseModel):
    id: str
    order_number: str
    source_channel: str
    customer_name: str
    customer_phone: str
    customer_email: str
    currency: str
    total_minor: int
    status: str
    payment_status: str
    payment_provider: str
    payment_link: str
    notes: str
    created_at: str
    updated_at: str
    items: list[OrderItemOut]


class PaymentLinkCreate(BaseModel):
    provider: Literal["wipay", "stripe"]
    success_url: str = Field(min_length=1, max_length=500)
    cancel_url: str = Field(min_length=1, max_length=500)
    expires_minutes: int = Field(default=30, ge=5, le=1440)


class PaymentLinkOut(BaseModel):
    provider: str
    url: str
    reused: bool


class StripeCheckoutCreate(BaseModel):
    product_code: str = Field(min_length=1, max_length=80, pattern=r"^[a-z0-9][a-z0-9-]*$")
    quantity: int = Field(default=1, ge=1, le=10)
    customer_name: str = Field(min_length=1, max_length=120)
    customer_phone: str = Field(min_length=1, max_length=40)
    customer_email: str = Field(default="", max_length=120)
    success_url: str = Field(min_length=1, max_length=500)
    cancel_url: str = Field(min_length=1, max_length=500)


class PaymentWebhookEvent(BaseModel):
    order_id: str | None = Field(default=None, max_length=36)
    order_number: str | None = Field(default=None, max_length=40)
    payment_status: Literal["paid", "failed", "pending"]
    amount_minor: int | None = Field(default=None, ge=0)
    currency: str | None = Field(default=None, min_length=3, max_length=3)
    provider_payment_id: str = Field(default="", max_length=120)
