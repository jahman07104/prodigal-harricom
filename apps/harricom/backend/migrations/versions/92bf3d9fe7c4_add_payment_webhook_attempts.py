"""add payment webhook attempts

Revision ID: 92bf3d9fe7c4
Revises: 2c87c6cd40a1
Create Date: 2026-04-23 14:43:27.638120

"""
# pyright: reportAttributeAccessIssue=false

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '92bf3d9fe7c4'
down_revision: Union[str, Sequence[str], None] = '2c87c6cd40a1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if not inspector.has_table("payment_webhook_attempts"):
        op.create_table(
            "payment_webhook_attempts",
            sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
            sa.Column("provider", sa.String(length=32), nullable=False),
            sa.Column("event_id", sa.String(length=128), nullable=False),
            sa.Column("order_id", sa.String(length=36), nullable=True),
            sa.Column("outcome", sa.String(length=24), nullable=False),
            sa.Column("failure_reason", sa.String(length=300), nullable=False, server_default=""),
            sa.Column("payload_hash", sa.String(length=64), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
            sa.ForeignKeyConstraint(["order_id"], ["orders.id"]),
            sa.PrimaryKeyConstraint("id"),
        )

    attempt_indexes = (
        {idx["name"] for idx in inspector.get_indexes("payment_webhook_attempts")}
        if inspector.has_table("payment_webhook_attempts")
        else set()
    )
    if "ix_payment_webhook_attempts_provider" not in attempt_indexes:
        op.create_index("ix_payment_webhook_attempts_provider", "payment_webhook_attempts", ["provider"], unique=False)
    if "ix_payment_webhook_attempts_event_id" not in attempt_indexes:
        op.create_index("ix_payment_webhook_attempts_event_id", "payment_webhook_attempts", ["event_id"], unique=False)
    if "ix_payment_webhook_attempts_order_id" not in attempt_indexes:
        op.create_index("ix_payment_webhook_attempts_order_id", "payment_webhook_attempts", ["order_id"], unique=False)
    if "ix_payment_webhook_attempts_outcome" not in attempt_indexes:
        op.create_index("ix_payment_webhook_attempts_outcome", "payment_webhook_attempts", ["outcome"], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if inspector.has_table("payment_webhook_attempts"):
        attempt_indexes = {idx["name"] for idx in inspector.get_indexes("payment_webhook_attempts")}
        if "ix_payment_webhook_attempts_outcome" in attempt_indexes:
            op.drop_index("ix_payment_webhook_attempts_outcome", table_name="payment_webhook_attempts")
        if "ix_payment_webhook_attempts_order_id" in attempt_indexes:
            op.drop_index("ix_payment_webhook_attempts_order_id", table_name="payment_webhook_attempts")
        if "ix_payment_webhook_attempts_event_id" in attempt_indexes:
            op.drop_index("ix_payment_webhook_attempts_event_id", table_name="payment_webhook_attempts")
        if "ix_payment_webhook_attempts_provider" in attempt_indexes:
            op.drop_index("ix_payment_webhook_attempts_provider", table_name="payment_webhook_attempts")
        op.drop_table("payment_webhook_attempts")
