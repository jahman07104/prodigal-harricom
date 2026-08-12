import csv
import io
from typing import Annotated

from fastapi import APIRouter, Depends, Query, Request, status
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import require_admin_token
from app.db.session import get_db
from app.repositories.events_repo import EventsRepository
from app.schemas.events import BatchPayload, ClickEvent
from app.services.events_service import ingest_batch, ingest_event, model_to_dict

router = APIRouter()


@router.post("/events", status_code=status.HTTP_201_CREATED)
def create_event(event: ClickEvent, db: Annotated[Session, Depends(get_db)]) -> dict:
    repo = EventsRepository(db)
    ingest_event(repo, event)
    return {"ok": True}


@router.post("/events/batch", status_code=status.HTTP_201_CREATED)
def create_batch(payload: BatchPayload, db: Annotated[Session, Depends(get_db)]) -> dict:
    repo = EventsRepository(db)
    count = ingest_batch(repo, payload.events)
    return {"ok": True, "count": count}


@router.get("/events")
def list_events(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
    page: Annotated[str, Query(description="Filter by page slug")] = "",
    number: Annotated[str, Query(description="Filter by destination number")] = "",
    from_ts: Annotated[str, Query(alias="from", description="ISO datetime lower bound")] = "",
    to_ts: Annotated[str, Query(alias="to", description="ISO datetime upper bound")] = "",
    limit: Annotated[int, Query(le=1000)] = 200,
    offset: Annotated[int, Query(ge=0)] = 0,
) -> dict:
    settings = get_settings()
    require_admin_token(request, settings.admin_token)

    repo = EventsRepository(db)
    total, rows = repo.list_events(page, number, from_ts, to_ts, limit, offset)

    return {
        "total": total,
        "limit": limit,
        "offset": offset,
        "events": [model_to_dict(row) for row in rows],
    }


@router.get("/events/export.csv")
def export_csv(request: Request, db: Annotated[Session, Depends(get_db)]) -> StreamingResponse:
    settings = get_settings()
    require_admin_token(request, settings.admin_token)

    repo = EventsRepository(db)
    rows = [model_to_dict(row) for row in repo.list_all()]

    def generate() -> str:
        buf = io.StringIO()
        writer = csv.writer(buf)
        if rows:
            writer.writerow(rows[0].keys())
            for row in rows:
                writer.writerow(list(row.values()))
        return buf.getvalue()

    return StreamingResponse(
        iter([generate()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=harricom-events.csv"},
    )


@router.get("/summary")
def summary(request: Request, db: Annotated[Session, Depends(get_db)]) -> dict:
    settings = get_settings()
    require_admin_token(request, settings.admin_token)

    repo = EventsRepository(db)
    return repo.summary()
