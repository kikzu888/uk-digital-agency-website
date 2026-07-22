from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status

from app.api.v1.dependencies import require_admin
from app.core.auth import (
    create_access_token,
    get_configured_admin_credentials,
    verify_password,
)
from app.core.config import settings
from app.db.session import AsyncSessionLocal
from app.repositories.contact import list_contact_submissions
from app.repositories.demo_content import (
    create_news_article,
    create_portfolio_project,
    create_service,
    delete_news_article,
    delete_portfolio_project,
    delete_service,
    list_news_articles,
    list_portfolio_projects,
    list_services,
    update_news_article,
    update_portfolio_project,
    update_service,
)
from app.schemas.auth import AdminLoginRequest, AdminProfileResponse, TokenResponse
from app.schemas.common import PaginatedResponse
from app.schemas.contact import ContactSubmissionPublic
from app.schemas.news import (
    NewsArticleCreate,
    NewsArticleListItem,
    NewsArticlePublic,
    NewsArticleUpdate,
)
from app.schemas.portfolio import (
    PortfolioProjectCreate,
    PortfolioProjectListItem,
    PortfolioProjectPublic,
    PortfolioProjectUpdate,
)
from app.schemas.services import ServiceCreate, ServicePublic, ServiceUpdate

router = APIRouter(prefix="/api/v1/admin", tags=["admin"])


@router.post("/auth/login", response_model=TokenResponse)
async def admin_login(payload: AdminLoginRequest, response: Response) -> TokenResponse:
    credentials = get_configured_admin_credentials()
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Admin authentication is not configured.",
        )

    admin_email, password_hash = credentials
    if payload.email.lower() != admin_email.lower() or not verify_password(
        payload.password,
        password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials.",
        )

    access_token = create_access_token(subject=admin_email, role="admin")
    response.set_cookie(
        key=settings.admin_session_cookie_name,
        value=access_token,
        httponly=True,
        secure=settings.is_production,
        samesite="lax",
        max_age=settings.access_token_expire_minutes * 60,
        path="/",
    )
    return TokenResponse(access_token=access_token)


@router.post("/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
async def admin_logout(response: Response) -> None:
    response.delete_cookie(
        key=settings.admin_session_cookie_name,
        httponly=True,
        secure=settings.is_production,
        samesite="lax",
        path="/",
    )


@router.get("/me", response_model=AdminProfileResponse)
async def read_admin_profile(
    admin_payload: Annotated[dict[str, object], Depends(require_admin)],
) -> AdminProfileResponse:
    return AdminProfileResponse(email=str(admin_payload["sub"]), role=str(admin_payload["role"]))


@router.get("/contact-submissions", response_model=list[ContactSubmissionPublic])
async def read_contact_submissions(
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> list[ContactSubmissionPublic]:
    session = None
    if AsyncSessionLocal is not None:
        session = AsyncSessionLocal()

    try:
        return await list_contact_submissions(session=session)
    finally:
        if session is not None:
            await session.close()


@router.get("/services", response_model=list[ServicePublic])
async def admin_read_services(
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> list[ServicePublic]:
    return list_services()


@router.post("/services", response_model=ServicePublic, status_code=status.HTTP_201_CREATED)
async def admin_create_service(
    payload: ServiceCreate,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> ServicePublic:
    service = create_service(payload)
    if service is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Service already exists.")
    return service


@router.patch("/services/{slug}", response_model=ServicePublic)
async def admin_update_service(
    slug: str,
    payload: ServiceUpdate,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> ServicePublic:
    service = update_service(slug, payload)
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found.")
    return service


@router.delete("/services/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_service(
    slug: str,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> None:
    if not delete_service(slug):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found.")


@router.get("/news", response_model=PaginatedResponse[NewsArticleListItem])
async def admin_read_news(
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> PaginatedResponse[NewsArticleListItem]:
    return list_news_articles(category=None, search=None, page=1, page_size=100)


@router.post("/news", response_model=NewsArticlePublic, status_code=status.HTTP_201_CREATED)
async def admin_create_news_article(
    payload: NewsArticleCreate,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> NewsArticlePublic:
    article = create_news_article(payload)
    if article is None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Article already exists or category is invalid.",
        )
    return article


@router.patch("/news/{slug}", response_model=NewsArticlePublic)
async def admin_update_news_article(
    slug: str,
    payload: NewsArticleUpdate,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> NewsArticlePublic:
    article = update_news_article(slug, payload)
    if article is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found.")
    return article


@router.delete("/news/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_news_article(
    slug: str,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> None:
    if not delete_news_article(slug):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Article not found.")


@router.get("/portfolio", response_model=PaginatedResponse[PortfolioProjectListItem])
async def admin_read_portfolio(
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> PaginatedResponse[PortfolioProjectListItem]:
    return list_portfolio_projects(category=None, page=1, page_size=100)


@router.post(
    "/portfolio",
    response_model=PortfolioProjectPublic,
    status_code=status.HTTP_201_CREATED,
)
async def admin_create_portfolio_project(
    payload: PortfolioProjectCreate,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> PortfolioProjectPublic:
    project = create_portfolio_project(payload)
    if project is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Project already exists.")
    return project


@router.patch("/portfolio/{slug}", response_model=PortfolioProjectPublic)
async def admin_update_portfolio_project(
    slug: str,
    payload: PortfolioProjectUpdate,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> PortfolioProjectPublic:
    project = update_portfolio_project(slug, payload)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
    return project


@router.delete("/portfolio/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_portfolio_project(
    slug: str,
    _: Annotated[dict[str, object], Depends(require_admin)],
) -> None:
    if not delete_portfolio_project(slug):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found.")
