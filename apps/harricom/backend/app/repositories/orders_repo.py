from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from app.models.order import Order
from app.models.payment_webhook import PaymentWebhookAttempt, PaymentWebhookReceipt


class OrdersRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_idempotency_key(self, idempotency_key: str) -> Order | None:
        stmt = (
            select(Order)
            .options(selectinload(Order.items))
            .where(Order.idempotency_key == idempotency_key)
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def add(self, order: Order) -> None:
        self.db.add(order)

    def get_by_id(self, order_id: str) -> Order | None:
        stmt = (
            select(Order)
            .options(selectinload(Order.items))
            .where(Order.id == order_id)
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_order_number(self, order_number: str) -> Order | None:
        stmt = (
            select(Order)
            .options(selectinload(Order.items))
            .where(Order.order_number == order_number)
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def get_webhook_receipt(self, provider: str, event_id: str) -> PaymentWebhookReceipt | None:
        stmt = select(PaymentWebhookReceipt).where(
            PaymentWebhookReceipt.provider == provider,
            PaymentWebhookReceipt.event_id == event_id,
        )
        return self.db.execute(stmt).scalar_one_or_none()

    def add_webhook_receipt(self, receipt: PaymentWebhookReceipt) -> None:
        self.db.add(receipt)

    def add_webhook_attempt(self, attempt: PaymentWebhookAttempt) -> None:
        self.db.add(attempt)

    def _build_webhook_attempt_filters(self, provider: str | None, outcome: str | None) -> list:
        filters = []
        if provider:
            filters.append(PaymentWebhookAttempt.provider == provider)
        if outcome:
            filters.append(PaymentWebhookAttempt.outcome == outcome)
        return filters

    def _list_webhook_attempts(
        self,
        limit: int,
        provider: str | None = None,
        outcome: str | None = None,
        cursor: int | None = None,
    ) -> list[PaymentWebhookAttempt]:
        filters = self._build_webhook_attempt_filters(provider, outcome)
        if cursor is not None:
            filters.append(PaymentWebhookAttempt.id < cursor)
        stmt = select(PaymentWebhookAttempt)
        if filters:
            stmt = stmt.where(*filters)
        stmt = stmt.order_by(PaymentWebhookAttempt.id.desc()).limit(limit)
        return self.db.execute(stmt).scalars().all()

    def webhook_attempt_summary(self, provider: str | None = None, outcome: str | None = None) -> dict:
        filters = self._build_webhook_attempt_filters(provider, outcome)

        total_stmt = select(func.count(PaymentWebhookAttempt.id)).select_from(PaymentWebhookAttempt)
        if filters:
            total_stmt = total_stmt.where(*filters)
        total = self.db.scalar(total_stmt) or 0

        outcome_stmt = (
            select(PaymentWebhookAttempt.outcome, func.count(PaymentWebhookAttempt.id))
            .group_by(PaymentWebhookAttempt.outcome)
            .order_by(func.count(PaymentWebhookAttempt.id).desc())
        )
        if filters:
            outcome_stmt = outcome_stmt.where(*filters)
        outcome_rows = self.db.execute(outcome_stmt).all()

        provider_stmt = (
            select(PaymentWebhookAttempt.provider, func.count(PaymentWebhookAttempt.id))
            .group_by(PaymentWebhookAttempt.provider)
            .order_by(func.count(PaymentWebhookAttempt.id).desc())
        )
        if filters:
            provider_stmt = provider_stmt.where(*filters)
        provider_rows = self.db.execute(provider_stmt).all()

        failure_stmt = (
            select(PaymentWebhookAttempt)
            .where(PaymentWebhookAttempt.outcome.in_(["failed", "ignored"]))
            .order_by(PaymentWebhookAttempt.created_at.desc())
            .limit(10)
        )
        if filters:
            failure_stmt = failure_stmt.where(*filters)
        recent_failures = self.db.execute(failure_stmt).scalars().all()

        return {
            "total_attempts": total,
            "by_outcome": [{"outcome": row[0], "count": row[1]} for row in outcome_rows],
            "by_provider": [{"provider": row[0], "count": row[1]} for row in provider_rows],
            "recent_failures": [
                {
                    "provider": row.provider,
                    "event_id": row.event_id,
                    "outcome": row.outcome,
                    "failure_reason": row.failure_reason,
                    "created_at": str(row.created_at),
                }
                for row in recent_failures
            ],
        }

    def list_recent_webhook_attempts(
        self,
        limit: int,
        provider: str | None = None,
        outcome: str | None = None,
    ) -> list[PaymentWebhookAttempt]:
        return self._list_webhook_attempts(limit, provider=provider, outcome=outcome)

    def list_recent_webhook_attempts_page(
        self,
        limit: int,
        provider: str | None = None,
        outcome: str | None = None,
        cursor: int | None = None,
    ) -> tuple[list[PaymentWebhookAttempt], int | None, bool]:
        rows = self._list_webhook_attempts(
            limit + 1,
            provider=provider,
            outcome=outcome,
            cursor=cursor,
        )
        has_more = len(rows) > limit
        page_rows = rows[:limit]
        next_cursor = page_rows[-1].id if has_more and page_rows else None
        return page_rows, next_cursor, has_more

    def list_webhook_attempts_for_export(
        self,
        limit: int,
        provider: str | None = None,
        outcome: str | None = None,
    ) -> list[PaymentWebhookAttempt]:
        return self._list_webhook_attempts(limit, provider=provider, outcome=outcome)

    def commit(self) -> None:
        self.db.commit()

    def refresh(self, order: Order) -> None:
        self.db.refresh(order)
