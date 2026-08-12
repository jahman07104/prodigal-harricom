from typing import Any

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.wa_click import WaClick


class EventsRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def create(self, payload: dict[str, Any]) -> None:
        self.db.add(WaClick(**payload))

    def commit(self) -> None:
        self.db.commit()

    def list_events(
        self,
        page: str,
        number: str,
        from_ts: str,
        to_ts: str,
        limit: int,
        offset: int,
    ) -> tuple[int, list[WaClick]]:
        query = select(WaClick)
        if page:
            query = query.where(WaClick.page == page)
        if number:
            query = query.where(WaClick.number == number)
        if from_ts:
            query = query.where(WaClick.ts >= from_ts)
        if to_ts:
            query = query.where(WaClick.ts <= to_ts)

        total = self.db.execute(select(func.count()).select_from(query.subquery())).scalar_one()
        rows = self.db.execute(
            query.order_by(WaClick.ts.desc()).limit(limit).offset(offset)
        ).scalars().all()
        return total, rows

    def list_all(self) -> list[WaClick]:
        return self.db.execute(select(WaClick).order_by(WaClick.ts.desc())).scalars().all()

    def summary(self) -> dict[str, Any]:
        total = self.db.scalar(select(func.count()).select_from(WaClick)) or 0
        today = self.db.scalar(select(func.count()).where(WaClick.ts >= func.date("now"))) or 0
        last7 = self.db.scalar(select(func.count()).where(WaClick.ts >= func.date("now", "-6 days"))) or 0
        last30 = self.db.scalar(select(func.count()).where(WaClick.ts >= func.date("now", "-29 days"))) or 0

        top_pages = self.db.execute(
            select(WaClick.page, func.count().label("cnt"))
            .group_by(WaClick.page)
            .order_by(func.count().desc())
            .limit(5)
        ).all()
        top_ctas = self.db.execute(
            select(WaClick.cta, func.count().label("cnt"))
            .group_by(WaClick.cta)
            .order_by(func.count().desc())
            .limit(5)
        ).all()
        top_numbers = self.db.execute(
            select(WaClick.number, func.count().label("cnt"))
            .group_by(WaClick.number)
            .order_by(func.count().desc())
            .limit(5)
        ).all()

        return {
            "total": total,
            "today": today,
            "last_7_days": last7,
            "last_30_days": last30,
            "top_pages": [{"page": row[0], "cnt": row[1]} for row in top_pages],
            "top_ctas": [{"cta": row[0], "cnt": row[1]} for row in top_ctas],
            "top_numbers": [{"number": row[0], "cnt": row[1]} for row in top_numbers],
        }
