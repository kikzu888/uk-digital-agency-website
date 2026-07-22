from typing import Annotated

from fastapi import APIRouter, HTTPException, Query

from app.repositories.demo_content import get_portfolio_project, list_portfolio_projects
from app.schemas.common import PaginatedResponse
from app.schemas.portfolio import PortfolioProjectListItem, PortfolioProjectPublic

router = APIRouter(prefix="/api/v1/portfolio", tags=["portfolio"])


@router.get("", response_model=PaginatedResponse[PortfolioProjectListItem])
async def read_portfolio_projects(
    category: Annotated[str | None, Query(max_length=120)] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=50)] = 10,
) -> PaginatedResponse[PortfolioProjectListItem]:
    return list_portfolio_projects(category=category, page=page, page_size=page_size)


@router.get("/{slug}", response_model=PortfolioProjectPublic)
async def read_portfolio_project(slug: str) -> PortfolioProjectPublic:
    project = get_portfolio_project(slug)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found.")
    return project
