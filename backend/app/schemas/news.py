from datetime import datetime

from pydantic import BaseModel, HttpUrl


class NewsCategoryPublic(BaseModel):
    name: str
    slug: str
    description: str


class NewsArticleListItem(BaseModel):
    title: str
    slug: str
    excerpt: str
    author: str
    published_at: datetime
    revised_at: datetime
    category: NewsCategoryPublic
    featured_image: HttpUrl | None = None
    status: str


class NewsArticlePublic(NewsArticleListItem):
    body: str
    related_articles: list[NewsArticleListItem]


class NewsArticleCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    body: str
    author: str
    category_slug: str
    status: str = "draft"
    featured_image: HttpUrl | None = None


class NewsArticleUpdate(BaseModel):
    title: str | None = None
    excerpt: str | None = None
    body: str | None = None
    author: str | None = None
    category_slug: str | None = None
    status: str | None = None
    featured_image: HttpUrl | None = None
