import os
from functools import lru_cache

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()


class Settings(BaseSettings):
    app_name: str = "HarriCom Analytics API"
    app_version: str = "1.1.0"
    admin_token: str = os.getenv("ADMIN_TOKEN", "")
    allowed_origins_raw: str = os.getenv("ALLOWED_ORIGINS", "*")
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///./harricom.db")
    stripe_secret_key: str = os.getenv("STRIPE_SECRET_KEY", "")
    stripe_webhook_secret: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")
    stripe_checkout_allowed_origins_raw: str = os.getenv("STRIPE_CHECKOUT_ALLOWED_ORIGINS", "")
    stripe_product_catalog_json: str = os.getenv("STRIPE_PRODUCT_CATALOG_JSON", "")
    wipay_webhook_secret: str = os.getenv("WIPAY_WEBHOOK_SECRET", "")
    stripe_webhook_tolerance_seconds: int = int(os.getenv("STRIPE_WEBHOOK_TOLERANCE_SECONDS", "300"))

    model_config = SettingsConfigDict(extra="ignore")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins_raw.split(",") if origin.strip()]

    @property
    def stripe_checkout_allowed_origins(self) -> list[str]:
        return [
            origin.rstrip("/")
            for origin in self.stripe_checkout_allowed_origins_raw.split(",")
            if origin.strip()
        ]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
