import importlib
import os
from pathlib import Path

import pytest
from alembic import command
from alembic.config import Config
from fastapi.testclient import TestClient

TEST_DB_PATH = Path(__file__).resolve().parent / "test_harricom.db"
TEST_DATABASE_URL = f"sqlite:///{TEST_DB_PATH.as_posix()}"
os.environ["DATABASE_URL"] = TEST_DATABASE_URL
os.environ["ADMIN_TOKEN"] = "test-admin-token"
os.environ["STRIPE_SECRET_KEY"] = "sk_test_123"
os.environ["STRIPE_WEBHOOK_SECRET"] = "test-stripe-secret"
os.environ["STRIPE_CHECKOUT_ALLOWED_ORIGINS"] = "https://harricom.netlify.app"
os.environ["STRIPE_PRODUCT_CATALOG_JSON"] = (
    '{"prodigal-consultation":{"title":"Prodigal Consultation","price_id":"price_test123"}}'
)
os.environ["WIPAY_WEBHOOK_SECRET"] = "test-wipay-secret"


def _run_migrations() -> None:
    if TEST_DB_PATH.exists():
        TEST_DB_PATH.unlink()

    alembic_cfg = Config(str(Path(__file__).resolve().parents[1] / "alembic.ini"))
    alembic_cfg.set_main_option("sqlalchemy.url", TEST_DATABASE_URL)
    command.upgrade(alembic_cfg, "head")


@pytest.fixture(scope="session")
def fastapi_app():
    config_module = importlib.import_module("app.core.config")
    config_module.get_settings.cache_clear()

    _run_migrations()
    app_module = importlib.import_module("app.main")
    return app_module.build_application()


@pytest.fixture()
def client(fastapi_app):
    with TestClient(fastapi_app) as test_client:
        yield test_client
