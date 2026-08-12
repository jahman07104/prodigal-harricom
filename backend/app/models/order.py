from sqlalchemy import DateTime, ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    order_number: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    idempotency_key: Mapped[str | None] = mapped_column(String(128), unique=True, nullable=True, index=True)

    source_channel: Mapped[str] = mapped_column(String(32), default="whatsapp")
    customer_name: Mapped[str] = mapped_column(String(120), default="")
    customer_phone: Mapped[str] = mapped_column(String(40), default="")
    customer_email: Mapped[str] = mapped_column(String(120), default="")

    currency: Mapped[str] = mapped_column(String(3), default="JMD")
    total_minor: Mapped[int] = mapped_column(Integer, default=0)

    status: Mapped[str] = mapped_column(String(32), default="created")
    payment_status: Mapped[str] = mapped_column(String(32), default="unpaid")
    payment_provider: Mapped[str] = mapped_column(String(32), default="")
    payment_link: Mapped[str] = mapped_column(String(500), default="")

    notes: Mapped[str] = mapped_column(String(600), default="")
    created_at: Mapped[str] = mapped_column(
        DateTime(timezone=True),
        server_default=text("CURRENT_TIMESTAMP"),
    )
    updated_at: Mapped[str] = mapped_column(
        DateTime(timezone=True),
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=text("CURRENT_TIMESTAMP"),
    )

    items: Mapped[list["OrderItem"]] = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[str] = mapped_column(String(36), ForeignKey("orders.id"), index=True)

    template_slug: Mapped[str] = mapped_column(String(120), default="")
    title: Mapped[str] = mapped_column(String(180), default="")
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    unit_price_minor: Mapped[int] = mapped_column(Integer, default=0)
    line_total_minor: Mapped[int] = mapped_column(Integer, default=0)

    order: Mapped[Order] = relationship("Order", back_populates="items")
