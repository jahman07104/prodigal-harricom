from fastapi import APIRouter, Response, status

from app.services.events_service import health_payload

router = APIRouter()


@router.get("/healthz")
def healthz() -> dict:
    return health_payload()


@router.get("/")
def root() -> dict:
    return {
        "name": "HarriCom Analytics API",
        "status": "running",
        "health": "/healthz",
        "docs": "/docs",
        "openapi": "/openapi.json",
    }


@router.get("/favicon.ico", include_in_schema=False)
def favicon() -> Response:
    return Response(status_code=status.HTTP_204_NO_CONTENT)
