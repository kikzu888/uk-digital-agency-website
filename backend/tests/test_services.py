from fastapi.testclient import TestClient

from app.main import app


def test_list_services() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/services")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5
    assert data[0]["slug"] == "digital-marketing"


def test_get_service_by_slug() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/services/web-development")

    assert response.status_code == 200
    assert response.json()["title"] == "Web Development"


def test_get_service_returns_404_for_unknown_slug() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/services/unknown")

    assert response.status_code == 404
