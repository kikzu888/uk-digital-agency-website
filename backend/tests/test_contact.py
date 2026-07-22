from fastapi.testclient import TestClient

from app.core.auth import hash_password
from app.main import app
from app.repositories.contact import clear_memory_submissions


def valid_contact_payload() -> dict[str, object]:
    return {
        "firstName": "Ada",
        "lastName": "Lovelace",
        "companyName": "Placeholder Company",
        "email": "ada@example.co.uk",
        "phone": "020 0000 0000",
        "service": "Web Development",
        "budget": "GBP 5,000 - GBP 10,000",
        "projectDescription": "We need a production-ready website and CRM workflow.",
        "privacyConsent": True,
        "marketingConsent": False,
        "website": "",
    }


def test_contact_submission_creates_reference() -> None:
    clear_memory_submissions()
    client = TestClient(app)

    response = client.post("/api/v1/contact", json=valid_contact_payload())

    assert response.status_code == 201
    assert response.json() == {
        "message": "Your enquiry has been received.",
        "reference": "CONTACT-1",
    }


def test_contact_submission_rejects_honeypot() -> None:
    clear_memory_submissions()
    client = TestClient(app)
    payload = valid_contact_payload()
    payload["website"] = "spam.example"

    response = client.post("/api/v1/contact", json=payload)

    assert response.status_code == 422


def test_admin_can_read_contact_submissions(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    clear_memory_submissions()
    password = "long-enough-password"
    monkeypatch.setenv("ADMIN_EMAIL", "admin@example.co.uk")
    monkeypatch.setenv("ADMIN_PASSWORD_HASH", hash_password(password))
    client = TestClient(app)
    client.post("/api/v1/contact", json=valid_contact_payload())
    login_response = client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@example.co.uk", "password": password},
    )
    token = login_response.json()["access_token"]

    response = client.get(
        "/api/v1/admin/contact-submissions",
        headers={"Authorization": f"Bearer {token}"},
    )

    assert response.status_code == 200
    assert response.json()[0]["email"] == "ada@example.co.uk"
