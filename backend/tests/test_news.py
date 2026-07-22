from fastapi.testclient import TestClient

from app.main import app


def test_list_news_articles_with_pagination() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/news?page=1&page_size=2")

    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 2
    assert data["meta"]["total"] >= 3
    assert data["meta"]["page"] == 1


def test_filter_news_articles_by_category() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/news?category=web-development")

    assert response.status_code == 200
    items = response.json()["items"]
    assert len(items) == 1
    assert items[0]["category"]["slug"] == "web-development"


def test_get_news_article_by_slug() -> None:
    client = TestClient(app)

    response = client.get("/api/v1/news/uk-sme-digital-roadmap")

    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == "uk-sme-digital-roadmap"
    assert "related_articles" in data
