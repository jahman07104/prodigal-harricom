from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class WaClick(Base):
    __tablename__ = "wa_clicks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    schema_version: Mapped[int] = mapped_column(Integer, default=2)
    ts: Mapped[str] = mapped_column(String, nullable=False)
    page: Mapped[str] = mapped_column(String, default="")
    cta: Mapped[str] = mapped_column(String, default="")
    number: Mapped[str] = mapped_column(String, default="")
    href: Mapped[str] = mapped_column(String, default="")
    visitor_id: Mapped[str] = mapped_column(String, default="")
    session_id: Mapped[str] = mapped_column(String, default="")
    device: Mapped[str] = mapped_column(String, default="")
    referrer: Mapped[str] = mapped_column(String, default="")
    language: Mapped[str] = mapped_column(String, default="")
    timezone: Mapped[str] = mapped_column(String, default="")
    utm_source: Mapped[str] = mapped_column(String, default="")
    utm_medium: Mapped[str] = mapped_column(String, default="")
    utm_campaign: Mapped[str] = mapped_column(String, default="")
    utm_term: Mapped[str] = mapped_column(String, default="")
    utm_content: Mapped[str] = mapped_column(String, default="")
    received_at: Mapped[str] = mapped_column(DateTime(timezone=True), server_default=func.now())
