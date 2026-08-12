"""add payment webhook receipts

Revision ID: 2c87c6cd40a1
Revises: e18bb7693461
Create Date: 2026-04-23 14:17:44.544506

"""
# pyright: reportAttributeAccessIssue=false

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2c87c6cd40a1'
down_revision: Union[str, Sequence[str], None] = 'e18bb7693461'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table("payment_webhook_receipts"):
        op.create_table(
            "payment_webhook_receipts",
            sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
            sa.Column("provider", sa.String(length=32), nullable=False),
            sa.Column("event_id", sa.String(length=128), nullable=False),
            sa.Column("order_id", sa.String(length=36), nullable=True),
            sa.Column("payment_status", sa.String(length=32), nullable=False),
            sa.Column("payload_hash", sa.String(length=64), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
            sa.ForeignKeyConstraint(["order_id"], ["orders.id"]),
            sa.PrimaryKeyConstraint("id"),
            sa.UniqueConstraint("provider", "event_id", name="uq_payment_webhook_provider_event_id"),
        )

    receipt_indexes = (
        {idx["name"] for idx in inspector.get_indexes("payment_webhook_receipts")}
        if inspector.has_table("payment_webhook_receipts")
        else set()
    )
    if "ix_payment_webhook_receipts_order_id" not in receipt_indexes:
        op.create_index(
            "ix_payment_webhook_receipts_order_id",
            "payment_webhook_receipts",
            ["order_id"],
            unique=False,
        )


def downgrade() -> None:
    """Downgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table("payment_webhook_receipts"):
        receipt_indexes = {idx["name"] for idx in inspector.get_indexes("payment_webhook_receipts")}
        if "ix_payment_webhook_receipts_order_id" in receipt_indexes:
            op.drop_index("ix_payment_webhook_receipts_order_id", table_name="payment_webhook_receipts")
        op.drop_table("payment_webhook_receipts")
