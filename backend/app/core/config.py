from functools import cached_property

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = "development"
    site_url: str = "http://localhost:3000"
    api_url: str = "http://localhost:8000"
    database_url: str | None = None
    backend_cors_origins: str = "http://localhost:3000"
    secret_key: str = "change-me-in-production-use-at-least-32-characters"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 14
    admin_session_cookie_name: str = "admin_session"
    rate_limit_per_minute: int = 60
    enable_api_docs: bool = True
    email_provider: str = "console"
    email_from: str = "no-reply@example.co.uk"
    admin_notification_email: str = "admin@example.co.uk"
    resend_api_key: str | None = None
    postmark_server_token: str | None = None

    @field_validator("secret_key")
    @classmethod
    def validate_secret_key(cls, value: str) -> str:
        if value == "change-me-in-production-use-at-least-32-characters":
            return value
        if len(value) < 32:
            raise ValueError("SECRET_KEY must be at least 32 characters in non-placeholder use.")
        return value

    @cached_property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.backend_cors_origins.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env.lower() == "production"


settings = Settings()
