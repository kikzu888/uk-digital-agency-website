import pytest
from fastapi import HTTPException

from app.core.config import settings
from app.services.email import EmailMessage, PostmarkEmailProvider, ResendEmailProvider


@pytest.mark.asyncio
async def test_resend_provider_requires_api_key(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    monkeypatch.setattr(settings, "resend_api_key", None)
    provider = ResendEmailProvider()

    with pytest.raises(HTTPException) as exc_info:
        await provider.send(EmailMessage(to="admin@example.co.uk", subject="Test", text="Test"))

    assert exc_info.value.status_code == 503


@pytest.mark.asyncio
async def test_postmark_provider_requires_server_token(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    monkeypatch.setattr(settings, "postmark_server_token", None)
    provider = PostmarkEmailProvider()

    with pytest.raises(HTTPException) as exc_info:
        await provider.send(EmailMessage(to="admin@example.co.uk", subject="Test", text="Test"))

    assert exc_info.value.status_code == 503
