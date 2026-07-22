from fastapi.testclient import TestClient

from app.main import app


def test_security_headers_are_applied() -> None:
    client = TestClient(app)

    response = client.get("/health")

    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"
    assert response.headers["referrer-policy"] == "strict-origin-when-cross-origin"
