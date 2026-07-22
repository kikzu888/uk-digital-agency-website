"""initial content models

Revision ID: 202607220001
Revises:
Create Date: 2026-07-22 04:30:00
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "202607220001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "services",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=160), nullable=False),
        sa.Column("slug", sa.String(length=180), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("content", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("seo_title", sa.String(length=220), nullable=True),
        sa.Column("seo_description", sa.String(length=320), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_services_slug"), "services", ["slug"], unique=True)

    op.create_table(
        "news_categories",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("slug", sa.String(length=140), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_index(op.f("ix_news_categories_slug"), "news_categories", ["slug"], unique=True)

    op.create_table(
        "portfolio_projects",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=220), nullable=False),
        sa.Column("slug", sa.String(length=240), nullable=False),
        sa.Column("short_description", sa.Text(), nullable=False),
        sa.Column("client_sector", sa.String(length=160), nullable=False),
        sa.Column("business_problem", sa.Text(), nullable=False),
        sa.Column("solution", sa.Text(), nullable=False),
        sa.Column("technologies", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("results", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("images", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("category", sa.String(length=120), nullable=False),
        sa.Column("is_placeholder", sa.Boolean(), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("seo_title", sa.String(length=220), nullable=True),
        sa.Column("seo_description", sa.String(length=320), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_portfolio_projects_slug"), "portfolio_projects", ["slug"], unique=True)

    op.create_table(
        "contact_submissions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(length=120), nullable=False),
        sa.Column("last_name", sa.String(length=120), nullable=False),
        sa.Column("company_name", sa.String(length=180), nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("phone", sa.String(length=80), nullable=False),
        sa.Column("preferred_service", sa.String(length=160), nullable=False),
        sa.Column("budget_range", sa.String(length=80), nullable=False),
        sa.Column("project_description", sa.Text(), nullable=False),
        sa.Column("privacy_consent", sa.Boolean(), nullable=False),
        sa.Column("marketing_consent", sa.Boolean(), nullable=False),
        sa.Column("ip_hash", sa.String(length=128), nullable=True),
        sa.Column("user_agent_hash", sa.String(length=128), nullable=True),
        sa.Column("status", sa.String(length=40), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_table(
        "newsletter_subscribers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("consent", sa.Boolean(), nullable=False),
        sa.Column("status", sa.String(length=40), nullable=False),
        sa.Column("source", sa.String(length=120), nullable=True),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_newsletter_subscribers_email"), "newsletter_subscribers", ["email"], unique=True
    )

    op.create_table(
        "seo_settings",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("route", sa.String(length=240), nullable=False),
        sa.Column("title", sa.String(length=220), nullable=False),
        sa.Column("description", sa.String(length=320), nullable=False),
        sa.Column("canonical_url", sa.String(length=500), nullable=True),
        sa.Column("open_graph", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("twitter", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("structured_data", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_seo_settings_route"), "seo_settings", ["route"], unique=True)

    op.create_table(
        "news_articles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=220), nullable=False),
        sa.Column("slug", sa.String(length=240), nullable=False),
        sa.Column("excerpt", sa.Text(), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("author", sa.String(length=120), nullable=False),
        sa.Column("featured_image", sa.String(length=500), nullable=True),
        sa.Column("status", sa.String(length=30), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("revised_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("seo_title", sa.String(length=220), nullable=True),
        sa.Column("seo_description", sa.String(length=320), nullable=True),
        sa.Column("category_id", sa.Integer(), nullable=False),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.ForeignKeyConstraint(["category_id"], ["news_categories.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_news_articles_slug"), "news_articles", ["slug"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_news_articles_slug"), table_name="news_articles")
    op.drop_table("news_articles")
    op.drop_index(op.f("ix_seo_settings_route"), table_name="seo_settings")
    op.drop_table("seo_settings")
    op.drop_index(op.f("ix_newsletter_subscribers_email"), table_name="newsletter_subscribers")
    op.drop_table("newsletter_subscribers")
    op.drop_table("contact_submissions")
    op.drop_index(op.f("ix_portfolio_projects_slug"), table_name="portfolio_projects")
    op.drop_table("portfolio_projects")
    op.drop_index(op.f("ix_news_categories_slug"), table_name="news_categories")
    op.drop_table("news_categories")
    op.drop_index(op.f("ix_services_slug"), table_name="services")
    op.drop_table("services")
