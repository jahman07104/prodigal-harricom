from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.events import router as events_router
from app.api.routes.orders import router as orders_router
from app.api.routes.system import router as system_router
from app.core.config import get_settings
from app.db.migrations import ensure_database_at_head


@asynccontextmanager
async def lifespan(_: FastAPI):
    ensure_database_at_head()
    yield


def build_application() -> FastAPI:
    settings = get_settings()
    app_instance = FastAPI(title=settings.app_name, version=settings.app_version, lifespan=lifespan)

    app_instance.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )

    app_instance.include_router(system_router)
    app_instance.include_router(events_router)
    app_instance.include_router(orders_router)
    return app_instance
