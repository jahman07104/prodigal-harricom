"""create core tables

Revision ID: 98f60682f4f4
Revises: 
Create Date: 2026-04-23 13:57:55.402986

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '98f60682f4f4'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table("orders"):
        op.create_table(
            "orders",
            sa.Column("id", sa.String(length=36), nullable=False),
            sa.Column("order_number", sa.String(length=40), nullable=False),
            sa.Column("idempotency_key", sa.String(length=128), nullable=True),
            sa.Column("source_channel", sa.String(length=32), nullable=False),
            sa.Column("customer_name", sa.String(length=120), nullable=False),
            sa.Column("customer_phone", sa.String(length=40), nullable=False),
            sa.Column("customer_email", sa.String(length=120), nullable=False),
            sa.Column("currency", sa.String(length=3), nullable=False),
            sa.Column("total_minor", sa.Integer(), nullable=False),
            sa.Column("status", sa.String(length=32), nullable=False),
            sa.Column("payment_status", sa.String(length=32), nullable=False),
            sa.Column("payment_provider", sa.String(length=32), nullable=False),
            sa.Column("payment_link", sa.String(length=500), nullable=False),
            sa.Column("notes", sa.String(length=600), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )

    order_indexes = {idx["name"] for idx in inspector.get_indexes("orders")} if inspector.has_table("orders") else set()
    if "ix_orders_order_number" not in order_indexes:
        op.create_index("ix_orders_order_number", "orders", ["order_number"], unique=True)
    if "ix_orders_idempotency_key" not in order_indexes:
        op.create_index("ix_orders_idempotency_key", "orders", ["idempotency_key"], unique=True)

    if not inspector.has_table("wa_clicks"):
        op.create_table(
            "wa_clicks",
            sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
            sa.Column("schema_version", sa.Integer(), nullable=False),
            sa.Column("ts", sa.String(), nullable=False),
            sa.Column("page", sa.String(), nullable=False),
            sa.Column("cta", sa.String(), nullable=False),
            sa.Column("number", sa.String(), nullable=False),
            sa.Column("href", sa.String(), nullable=False),
            sa.Column("visitor_id", sa.String(), nullable=False),
            sa.Column("session_id", sa.String(), nullable=False),
            sa.Column("device", sa.String(), nullable=False),
            sa.Column("referrer", sa.String(), nullable=False),
            sa.Column("language", sa.String(), nullable=False),
            sa.Column("timezone", sa.String(), nullable=False),
            sa.Column("utm_source", sa.String(), nullable=False),
            sa.Column("utm_medium", sa.String(), nullable=False),
            sa.Column("utm_campaign", sa.String(), nullable=False),
            sa.Column("utm_term", sa.String(), nullable=False),
            sa.Column("utm_content", sa.String(), nullable=False),
            sa.Column("received_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
            sa.PrimaryKeyConstraint("id"),
        )

    if not inspector.has_table("order_items"):
        op.create_table(
            "order_items",
            sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
            sa.Column("order_id", sa.String(length=36), nullable=False),
            sa.Column("template_slug", sa.String(length=120), nullable=False),
            sa.Column("title", sa.String(length=180), nullable=False),
            sa.Column("quantity", sa.Integer(), nullable=False),
            sa.Column("unit_price_minor", sa.Integer(), nullable=False),
            sa.Column("line_total_minor", sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(["order_id"], ["orders.id"]),
            sa.PrimaryKeyConstraint("id"),
        )

    item_indexes = {idx["name"] for idx in inspector.get_indexes("order_items")} if inspector.has_table("order_items") else set()
    if "ix_order_items_order_id" not in item_indexes:
        op.create_index("ix_order_items_order_id", "order_items", ["order_id"], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table("order_items"):
        item_indexes = {idx["name"] for idx in inspector.get_indexes("order_items")}
        if "ix_order_items_order_id" in item_indexes:
            op.drop_index("ix_order_items_order_id", table_name="order_items")
        op.drop_table("order_items")

    if inspector.has_table("wa_clicks"):
        op.drop_table("wa_clicks")

    if inspector.has_table("orders"):
        order_indexes = {idx["name"] for idx in inspector.get_indexes("orders")}
        if "ix_orders_idempotency_key" in order_indexes:
            op.drop_index("ix_orders_idempotency_key", table_name="orders")
        if "ix_orders_order_number" in order_indexes:
            op.drop_index("ix_orders_order_number", table_name="orders")
        op.drop_table("orders")
