from typing import Annotated

from fastapi import APIRouter, HTTPException, Query

from app.repositories.demo_content import (
    get_news_article,
    list_news_articles,
    list_news_categories,
)
from app.schemas.common import PaginatedResponse
from app.schemas.news import NewsArticleListItem, NewsArticlePublic, NewsCategoryPublic

router = APIRouter(prefix="/api/v1/news", tags=["news"])


@router.get("", response_model=PaginatedResponse[NewsArticleListItem])
async def read_news_articles(
    category: Annotated[str | None, Query(max_length=140)] = None,
    search: Annotated[str | None, Query(max_length=120)] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    page_size: Annotated[int, Query(ge=1, le=50)] = 10,
) -> PaginatedResponse[NewsArticleListItem]:
    return list_news_articles(category=category, search=search, page=page, page_size=page_size)


@router.get("/categories", response_model=list[NewsCategoryPublic])
async def read_news_categories() -> list[NewsCategoryPublic]:
    return list_news_categories()


@router.get("/{slug}", response_model=NewsArticlePublic)
async def read_news_article(slug: str) -> NewsArticlePublic:
    article = get_news_article(slug)
    if article is None:
        raise HTTPException(status_code=404, detail="Article not found.")
    return article
