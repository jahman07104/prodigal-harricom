"""add analytics and order indexes

Revision ID: e18bb7693461
Revises: 98f60682f4f4
Create Date: 2026-04-23 14:07:23.055303

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e18bb7693461'
down_revision: Union[str, Sequence[str], None] = '98f60682f4f4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table("wa_clicks"):
        wa_indexes = {idx["name"] for idx in inspector.get_indexes("wa_clicks")}
        if "ix_wa_clicks_ts" not in wa_indexes:
            op.create_index("ix_wa_clicks_ts", "wa_clicks", ["ts"], unique=False)
        if "ix_wa_clicks_page" not in wa_indexes:
            op.create_index("ix_wa_clicks_page", "wa_clicks", ["page"], unique=False)
        if "ix_wa_clicks_number" not in wa_indexes:
            op.create_index("ix_wa_clicks_number", "wa_clicks", ["number"], unique=False)
        if "ix_wa_clicks_ts_page_number" not in wa_indexes:
            op.create_index(
                "ix_wa_clicks_ts_page_number",
                "wa_clicks",
                ["ts", "page", "number"],
                unique=False,
            )

    if inspector.has_table("orders"):
        order_indexes = {idx["name"] for idx in inspector.get_indexes("orders")}
        if "ix_orders_created_at" not in order_indexes:
            op.create_index("ix_orders_created_at", "orders", ["created_at"], unique=False)
        if "ix_orders_payment_status" not in order_indexes:
            op.create_index("ix_orders_payment_status", "orders", ["payment_status"], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table("orders"):
        order_indexes = {idx["name"] for idx in inspector.get_indexes("orders")}
        if "ix_orders_payment_status" in order_indexes:
            op.drop_index("ix_orders_payment_status", table_name="orders")
        if "ix_orders_created_at" in order_indexes:
            op.drop_index("ix_orders_created_at", table_name="orders")

    if inspector.has_table("wa_clicks"):
        wa_indexes = {idx["name"] for idx in inspector.get_indexes("wa_clicks")}
        if "ix_wa_clicks_ts_page_number" in wa_indexes:
            op.drop_index("ix_wa_clicks_ts_page_number", table_name="wa_clicks")
        if "ix_wa_clicks_number" in wa_indexes:
            op.drop_index("ix_wa_clicks_number", table_name="wa_clicks")
        if "ix_wa_clicks_page" in wa_indexes:
            op.drop_index("ix_wa_clicks_page", table_name="wa_clicks")
        if "ix_wa_clicks_ts" in wa_indexes:
            op.drop_index("ix_wa_clicks_ts", table_name="wa_clicks")
