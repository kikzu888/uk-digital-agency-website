from fastapi.testclient import TestClient

from app.main import app


def test_list_portfolio_projects() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/portfolio")

    assert response.status_code == 200
    data = response.json()
    assert data["meta"]["total"] == 2
    assert data["items"][0]["is_placeholder"] is True


def test_get_portfolio_project_by_slug() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/portfolio/placeholder-crm-website-workflow")

    assert response.status_code == 200
    data = response.json()
    assert data["is_placeholder"] is True
    assert "No real client statistics claimed" in data["results"]
