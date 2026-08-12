from pydantic import BaseModel, Field


class UtmFields(BaseModel):
    source: str = ""
    medium: str = ""
    campaign: str = ""
    term: str = ""
    content: str = ""


class ClickEvent(BaseModel):
    schema_version: int = Field(2, alias="schemaVersion")
    ts: str
    page: str = ""
    cta: str = ""
    number: str = ""
    href: str = ""
    visitor_id: str = Field("", alias="visitorId")
    session_id: str = Field("", alias="sessionId")
    device: str = ""
    referrer: str = ""
    language: str = ""
    timezone: str = ""
    utm: UtmFields = Field(default_factory=UtmFields)

    model_config = {"populate_by_name": True}


class BatchPayload(BaseModel):
    events: list[ClickEvent]
