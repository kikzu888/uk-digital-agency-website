from fastapi.testclient import TestClient

from app.core.auth import hash_password
from app.main import app


def admin_token(monkeypatch) -> str:  # type: ignore[no-untyped-def]
    password = "long-enough-password"
    monkeypatch.setenv("ADMIN_EMAIL", "admin@example.co.uk")
    monkeypatch.setenv("ADMIN_PASSWORD_HASH", hash_password(password))
    client = TestClient(app)
    response = client.post(
        "/api/v1/admin/auth/login",
        json={"email": "admin@example.co.uk", "password": password},
    )
    return str(response.json()["access_token"])


def test_admin_service_crud(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    client = TestClient(app)
    token = admin_token(monkeypatch)
    headers = {"Authorization": f"Bearer {token}"}
    slug = "placeholder-admin-service"

    create_response = client.post(
        "/api/v1/admin/services",
        headers=headers,
        json={
            "slug": slug,
            "title": "Placeholder Admin Service",
            "summary": "Placeholder admin-created service.",
            "problems": ["Placeholder problem"],
            "benefits": ["Placeholder benefit"],
            "process": ["Plan", "Build"],
            "faqs": [{"question": "Is this real?", "answer": "No, it is placeholder data."}],
        },
    )

    assert create_response.status_code == 201

    update_response = client.patch(
        f"/api/v1/admin/services/{slug}",
        headers=headers,
        json={"summary": "Updated placeholder summary."},
    )

    assert update_response.status_code == 200
    assert update_response.json()["summary"] == "Updated placeholder summary."

    delete_response = client.delete(f"/api/v1/admin/services/{slug}", headers=headers)

    assert delete_response.status_code == 204


def test_admin_news_crud(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    client = TestClient(app)
    token = admin_token(monkeypatch)
    headers = {"Authorization": f"Bearer {token}"}
    slug = "placeholder-admin-news"

    create_response = client.post(
        "/api/v1/admin/news",
        headers=headers,
        json={
            "title": "Placeholder Admin News",
            "slug": slug,
            "excerpt": "Placeholder excerpt for admin-created article.",
            "body": "Placeholder body for admin-created article.",
            "author": "Company Name Editorial",
            "category_slug": "web-development",
            "status": "draft",
        },
    )

    assert create_response.status_code == 201

    update_response = client.patch(
        f"/api/v1/admin/news/{slug}",
        headers=headers,
        json={"status": "published"},
    )

    assert update_response.status_code == 200
    assert update_response.json()["status"] == "published"

    delete_response = client.delete(f"/api/v1/admin/news/{slug}", headers=headers)

    assert delete_response.status_code == 204


def test_admin_portfolio_crud(monkeypatch) -> None:  # type: ignore[no-untyped-def]
    client = TestClient(app)
    token = admin_token(monkeypatch)
    headers = {"Authorization": f"Bearer {token}"}
    slug = "placeholder-admin-portfolio"

    create_response = client.post(
        "/api/v1/admin/portfolio",
        headers=headers,
        json={
            "title": "Placeholder Admin Portfolio",
            "slug": slug,
            "short_description": "Placeholder portfolio description.",
            "client_sector": "Placeholder sector",
            "business_problem": "Placeholder business problem.",
            "solution": "Placeholder solution.",
            "technologies": ["FastAPI", "Next.js"],
            "results": ["Placeholder result only"],
            "images": ["https://placehold.co/1200x800/png"],
            "category": "Web Development",
            "is_placeholder": True,
        },
    )

    assert create_response.status_code == 201

    update_response = client.patch(
        f"/api/v1/admin/portfolio/{slug}",
        headers=headers,
        json={"category": "CRM"},
    )

    assert update_response.status_code == 200
    assert update_response.json()["category"] == "CRM"

    delete_response = client.delete(f"/api/v1/admin/portfolio/{slug}", headers=headers)

    assert delete_response.status_code == 204
