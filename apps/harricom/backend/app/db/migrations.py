from pathlib import Path

from alembic.config import Config
from alembic.script import ScriptDirectory
from alembic.runtime.migration import MigrationContext
from sqlalchemy import create_engine

from app.core.config import get_settings


def _normalize_database_url(database_url: str) -> str:
    if database_url.startswith("postgres://"):
        return database_url.replace("postgres://", "postgresql://", 1)
    return database_url


def _build_alembic_config(database_url: str) -> Config:
    backend_dir = Path(__file__).resolve().parents[2]
    config = Config(str(backend_dir / "alembic.ini"))
    config.set_main_option("sqlalchemy.url", database_url)
    return config


def ensure_database_at_head() -> None:
    settings = get_settings()
    database_url = _normalize_database_url(settings.database_url)
    connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
    engine = create_engine(database_url, connect_args=connect_args, future=True)

    try:
        with engine.connect() as connection:
            current_revision = MigrationContext.configure(connection).get_current_revision()

        script = ScriptDirectory.from_config(_build_alembic_config(database_url))
        heads = script.get_heads()

        if not heads:
            return

        if not current_revision:
            raise RuntimeError("Database is not migrated. Run: alembic upgrade head")

        if current_revision not in heads:
            heads_csv = ", ".join(heads)
            raise RuntimeError(
                f"Database revision {current_revision} is behind migration head {heads_csv}. "
                "Run: alembic upgrade head"
            )
    finally:
        engine.dispose()
