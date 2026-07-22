from datetime import UTC, datetime
from enum import StrEnum

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class ContentStatus(StrEnum):
    draft = "draft"
    published = "published"
    archived = "archived"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        server_default=func.now(),
        onupdate=lambda: datetime.now(UTC),
        nullable=False,
    )


class AdminUser(Base, TimestampMixin):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(40), default="admin", nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))


class Service(Base, TimestampMixin):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    slug: Mapped[str] = mapped_column(String(180), unique=True, index=True, nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    content: Mapped[dict[str, object]] = mapped_column(JSONB, default=dict, nullable=False)
    status: Mapped[str] = mapped_column(
        String(30), default=ContentStatus.draft.value, nullable=False
    )
    seo_title: Mapped[str | None] = mapped_column(String(220))
    seo_description: Mapped[str | None] = mapped_column(String(320))


class NewsCategory(Base, TimestampMixin):
    __tablename__ = "news_categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(140), unique=True, index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text)

    articles: Mapped[list["NewsArticle"]] = relationship(back_populates="category")


class NewsArticle(Base, TimestampMixin):
    __tablename__ = "news_articles"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    slug: Mapped[str] = mapped_column(String(240), unique=True, index=True, nullable=False)
    excerpt: Mapped[str] = mapped_column(Text, nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    author: Mapped[str] = mapped_column(String(120), nullable=False)
    featured_image: Mapped[str | None] = mapped_column(String(500))
    status: Mapped[str] = mapped_column(
        String(30), default=ContentStatus.draft.value, nullable=False
    )
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revised_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    seo_title: Mapped[str | None] = mapped_column(String(220))
    seo_description: Mapped[str | None] = mapped_column(String(320))
    category_id: Mapped[int] = mapped_column(ForeignKey("news_categories.id"), nullable=False)

    category: Mapped[NewsCategory] = relationship(back_populates="articles")


class PortfolioProject(Base, TimestampMixin):
    __tablename__ = "portfolio_projects"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    slug: Mapped[str] = mapped_column(String(240), unique=True, index=True, nullable=False)
    short_description: Mapped[str] = mapped_column(Text, nullable=False)
    client_sector: Mapped[str] = mapped_column(String(160), nullable=False)
    business_problem: Mapped[str] = mapped_column(Text, nullable=False)
    solution: Mapped[str] = mapped_column(Text, nullable=False)
    technologies: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
    results: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
    images: Mapped[list[str]] = mapped_column(JSONB, default=list, nullable=False)
    category: Mapped[str] = mapped_column(String(120), nullable=False)
    is_placeholder: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    status: Mapped[str] = mapped_column(
        String(30), default=ContentStatus.draft.value, nullable=False
    )
    seo_title: Mapped[str | None] = mapped_column(String(220))
    seo_description: Mapped[str | None] = mapped_column(String(320))


class ContactSubmission(Base, TimestampMixin):
    __tablename__ = "contact_submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    company_name: Mapped[str] = mapped_column(String(180), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    phone: Mapped[str] = mapped_column(String(80), nullable=False)
    preferred_service: Mapped[str] = mapped_column(String(160), nullable=False)
    budget_range: Mapped[str] = mapped_column(String(80), nullable=False)
    project_description: Mapped[str] = mapped_column(Text, nullable=False)
    privacy_consent: Mapped[bool] = mapped_column(Boolean, nullable=False)
    marketing_consent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    ip_hash: Mapped[str | None] = mapped_column(String(128))
    user_agent_hash: Mapped[str | None] = mapped_column(String(128))
    status: Mapped[str] = mapped_column(String(40), default="new", nullable=False)


class NewsletterSubscriber(Base, TimestampMixin):
    __tablename__ = "newsletter_subscribers"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    consent: Mapped[bool] = mapped_column(Boolean, nullable=False)
    status: Mapped[str] = mapped_column(String(40), default="subscribed", nullable=False)
    source: Mapped[str | None] = mapped_column(String(120))


class SEOSettings(Base, TimestampMixin):
    __tablename__ = "seo_settings"

    id: Mapped[int] = mapped_column(primary_key=True)
    route: Mapped[str] = mapped_column(String(240), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(220), nullable=False)
    description: Mapped[str] = mapped_column(String(320), nullable=False)
    canonical_url: Mapped[str | None] = mapped_column(String(500))
    open_graph: Mapped[dict[str, object]] = mapped_column(JSONB, default=dict, nullable=False)
    twitter: Mapped[dict[str, object]] = mapped_column(JSONB, default=dict, nullable=False)
    structured_data: Mapped[dict[str, object]] = mapped_column(JSONB, default=dict, nullable=False)
