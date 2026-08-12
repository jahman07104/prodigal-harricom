from datetime import datetime, timezone

from app.models.wa_click import WaClick
from app.repositories.events_repo import EventsRepository
from app.schemas.events import ClickEvent


def health_payload() -> dict[str, str]:
    return {"status": "ok", "ts": datetime.now(timezone.utc).isoformat()}


def event_to_payload(event: ClickEvent) -> dict:
    utm = event.utm
    return {
        "schema_version": event.schema_version,
        "ts": event.ts,
        "page": event.page,
        "cta": event.cta,
        "number": event.number,
        "href": event.href,
        "visitor_id": event.visitor_id,
        "session_id": event.session_id,
        "device": event.device,
        "referrer": event.referrer,
        "language": event.language,
        "timezone": event.timezone,
        "utm_source": utm.source,
        "utm_medium": utm.medium,
        "utm_campaign": utm.campaign,
        "utm_term": utm.term,
        "utm_content": utm.content,
    }


def model_to_dict(row: WaClick) -> dict:
    return {
        "id": row.id,
        "schema_version": row.schema_version,
        "ts": row.ts,
        "page": row.page,
        "cta": row.cta,
        "number": row.number,
        "href": row.href,
        "visitor_id": row.visitor_id,
        "session_id": row.session_id,
        "device": row.device,
        "referrer": row.referrer,
        "language": row.language,
        "timezone": row.timezone,
        "utm_source": row.utm_source,
        "utm_medium": row.utm_medium,
        "utm_campaign": row.utm_campaign,
        "utm_term": row.utm_term,
        "utm_content": row.utm_content,
        "received_at": str(row.received_at),
    }


def ingest_event(repo: EventsRepository, event: ClickEvent) -> None:
    repo.create(event_to_payload(event))
    repo.commit()


def ingest_batch(repo: EventsRepository, events: list[ClickEvent]) -> int:
    for event in events:
        repo.create(event_to_payload(event))
    repo.commit()
    return len(events)
