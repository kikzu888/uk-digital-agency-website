from fastapi.testclient import TestClient

from app.core.auth import hash_password
from app.main import app


def test_admin_login_reports_not_configured(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    monkeypatch.delenv("ADMIN_EMAIL", raising=False)
    monkeypatch.delenv("ADMIN_PASSWORD_HASH", raising=False)
    client = TestClient(app)

    response = client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@example.co.uk", "password": "long-enough-password"},
    )

    assert response.status_code == 503


def test_admin_login_and_profile(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    password = "long-enough-password"
    monkeypatch.setenv("ADMIN_EMAIL", "admin@example.co.uk")
    monkeypatch.setenv("ADMIN_PASSWORD_HASH", hash_password(password))
    client = TestClient(app)

    login_response = client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@example.co.uk", "password": password},
    )

    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    profile_response = client.get(
        "/api/v1/admin/me",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert profile_response.status_code == 200
    assert profile_response.json() == {"email": "admin@example.co.uk", "role": "admin"}


def test_admin_cookie_session_and_logout(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    password = "long-enough-password"
    monkeypatch.setenv("ADMIN_EMAIL", "admin@example.co.uk")
    monkeypatch.setenv("ADMIN_PASSWORD_HASH", hash_password(password))
    client = TestClient(app)

    login_response = client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@example.co.uk", "password": password},
    )

    assert login_response.status_code == 200
    assert "admin_session" in login_response.cookies

    profile_response = client.get("/api/v1/admin/me")

    assert profile_response.status_code == 200

    logout_response = client.post("/api/v1/admin/auth/logout")

    assert logout_response.status_code == 204
