from collections.abc import Sequence
from datetime import UTC, datetime
from math import ceil

from app.schemas.common import PaginatedResponse, PaginationMeta
from app.schemas.news import (
    NewsArticleCreate,
    NewsArticleListItem,
    NewsArticlePublic,
    NewsArticleUpdate,
    NewsCategoryPublic,
)
from app.schemas.portfolio import (
    PortfolioProjectCreate,
    PortfolioProjectListItem,
    PortfolioProjectPublic,
    PortfolioProjectUpdate,
)
from app.schemas.services import FAQItem, ServiceCreate, ServicePublic, ServiceUpdate


def paginate[T](items: Sequence[T], page: int, page_size: int) -> PaginatedResponse[T]:
    total = len(items)
    total_pages = ceil(total / page_size) if total else 0
    start = (page - 1) * page_size
    end = start + page_size
    return PaginatedResponse(
        items=list(items[start:end]),
        meta=PaginationMeta(page=page, page_size=page_size, total=total, total_pages=total_pages),
    )


services_seed = [
    ServicePublic(
        slug="digital-marketing",
        title="Digital Marketing",
        summary=(
            "Focused campaigns, search visibility and conversion improvements for UK companies."
        ),
        problems=["Low-quality enquiries", "Unclear attribution", "Traffic that does not convert"],
        benefits=[
            "Cleaner acquisition strategy",
            "Better qualified leads",
            "More confidence in spend",
        ],
        process=["Audit", "Strategy", "Campaign setup", "Optimisation", "Reporting"],
        faqs=[
            FAQItem(
                question="Can you support our existing team?",
                answer="Yes, we can support strategy, execution or technical delivery.",
            ),
            FAQItem(
                question="Do you guarantee rankings?",
                answer="No. We focus on sustainable improvements and transparent reporting.",
            ),
        ],
    ),
    ServicePublic(
        slug="web-development",
        title="Web Development",
        summary="Fast, secure and SEO-ready websites built around clear business goals.",
        problems=["Slow website", "Poor mobile experience", "Weak technical SEO"],
        benefits=["Improved user experience", "Stronger foundations", "Room for future growth"],
        process=["Discovery", "UX planning", "Build", "Content integration", "Launch"],
        faqs=[
            FAQItem(
                question="Will it be responsive?",
                answer="Yes. Pages are planned and tested for mobile, tablet and desktop.",
            ),
            FAQItem(
                question="Can you support after launch?",
                answer="Yes. Support can cover updates, monitoring and new features.",
            ),
        ],
    ),
    ServicePublic(
        slug="ai-automation-processes",
        title="AI Automation Processes",
        summary=(
            "Practical automation for repetitive business workflows where AI creates real value."
        ),
        problems=["Manual admin", "Repeated data entry", "Inconsistent follow-up"],
        benefits=["Less repetitive work", "Faster responses", "More consistent processes"],
        process=["Workflow mapping", "Risk review", "Prototype", "Integration", "Monitoring"],
        faqs=[
            FAQItem(
                question="Do you automate everything?",
                answer="No. We use AI only where it is reliable and appropriate.",
            ),
            FAQItem(
                question="Can it connect to current tools?",
                answer="Usually, after API, data and security review.",
            ),
        ],
    ),
    ServicePublic(
        slug="crm-solutions",
        title="CRM Solutions",
        summary=(
            "CRM setup and improvement for cleaner leads, customer records and sales visibility."
        ),
        problems=["Lost leads", "No clear pipeline", "Poor data hygiene"],
        benefits=["Cleaner records", "Reliable follow-up", "Better pipeline visibility"],
        process=["Requirements", "Data model", "Configuration", "Migration", "Training"],
        faqs=[
            FAQItem(
                question="Can you improve our current CRM?",
                answer="Yes. We audit before recommending replacement.",
            ),
            FAQItem(
                question="Which CRM is best?",
                answer="It depends on process, budget and integration needs.",
            ),
        ],
    ),
    ServicePublic(
        slug="cybersecurity-services",
        title="Cybersecurity Services",
        summary="Baseline security improvements for SME websites, cloud systems and processes.",
        problems=["Weak access controls", "Unclear data processes", "Limited monitoring"],
        benefits=["Reduced risk", "Better trust", "Clearer responsibilities"],
        process=["Assessment", "Prioritisation", "Remediation", "Policy support", "Review"],
        faqs=[
            FAQItem(
                question="Do you provide penetration testing?",
                answer="We can scope testing and connect specialists where required.",
            ),
            FAQItem(
                question="Can you start with basics?",
                answer="Yes. We prioritise practical controls first.",
            ),
        ],
    ),
]

categories_seed = [
    NewsCategoryPublic(
        name="Digital Marketing",
        slug="digital-marketing",
        description="UK-focused digital marketing insights.",
    ),
    NewsCategoryPublic(
        name="Web Development",
        slug="web-development",
        description="Technical website planning and performance.",
    ),
    NewsCategoryPublic(
        name="Artificial Intelligence",
        slug="artificial-intelligence",
        description="Practical AI for business operations.",
    ),
    NewsCategoryPublic(
        name="Cybersecurity",
        slug="cybersecurity",
        description="Security guidance for growing companies.",
    ),
]

_published = datetime(2026, 7, 1, 9, 0, tzinfo=UTC)
_revised = datetime(2026, 7, 15, 9, 0, tzinfo=UTC)

news_seed = [
    NewsArticlePublic(
        title="How UK SMEs can plan a practical digital roadmap",
        slug="uk-sme-digital-roadmap",
        excerpt=(
            "A practical approach to prioritising website, marketing, CRM, automation and "
            "security work."
        ),
        body=(
            "This placeholder article outlines a staged roadmap for UK SMEs. It is demo "
            "content for structure, SEO metadata and editorial workflow validation."
        ),
        author="VenusCore Editorial",
        published_at=_published,
        revised_at=_revised,
        category=categories_seed[0],
        featured_image=None,
        status="published",
        related_articles=[],
    ),
    NewsArticlePublic(
        title="What to check before rebuilding a business website",
        slug="business-website-rebuild-checklist",
        excerpt="Key planning areas before investing in a new website build.",
        body=(
            "This placeholder article covers goals, content, analytics, redirects, "
            "accessibility, performance and maintainability."
        ),
        author="VenusCore Editorial",
        published_at=datetime(2026, 7, 5, 9, 0, tzinfo=UTC),
        revised_at=_revised,
        category=categories_seed[1],
        featured_image=None,
        status="published",
        related_articles=[],
    ),
    NewsArticlePublic(
        title="Where AI automation makes sense for service businesses",
        slug="ai-automation-service-businesses",
        excerpt="A responsible way to decide which workflows should be automated.",
        body=(
            "This placeholder article explains how to assess repeatability, risk, data access "
            "and human review before adding AI automation."
        ),
        author="VenusCore Editorial",
        published_at=datetime(2026, 7, 8, 9, 0, tzinfo=UTC),
        revised_at=_revised,
        category=categories_seed[2],
        featured_image=None,
        status="published",
        related_articles=[],
    ),
]


def refresh_related_articles() -> None:
    for article in news_seed:
        article.related_articles = [
            NewsArticleListItem.model_validate(item)
            for item in news_seed
            if item.slug != article.slug
        ][:2]


refresh_related_articles()

portfolio_seed = [
    PortfolioProjectPublic(
        title="Placeholder CRM and website workflow",
        slug="placeholder-crm-website-workflow",
        short_description="Demo case study format for a joined-up website and CRM workflow.",
        client_sector="Placeholder sector",
        business_problem=(
            "Placeholder business problem showing where real client context will appear."
        ),
        solution="Placeholder solution describing the proposed technical and operational approach.",
        technologies=["Next.js", "FastAPI", "PostgreSQL", "CRM integration"],
        results=["Placeholder result format only", "No real client statistics claimed"],
        images=["https://placehold.co/1200x800/png"],
        category="Web Development",
        is_placeholder=True,
    ),
    PortfolioProjectPublic(
        title="Placeholder automation discovery project",
        slug="placeholder-automation-discovery-project",
        short_description="Demo case study format for workflow mapping and automation planning.",
        client_sector="Placeholder sector",
        business_problem="Placeholder manual workflow challenge.",
        solution="Placeholder automation roadmap and governance approach.",
        technologies=["AI workflow tools", "API integration", "Secure process design"],
        results=[
            "Placeholder outcome only",
            "Requires replacement with verified client-approved results",
        ],
        images=["https://placehold.co/1200x800/png"],
        category="AI Automation",
        is_placeholder=True,
    ),
]


def list_services() -> list[ServicePublic]:
    return services_seed


def get_service(slug: str) -> ServicePublic | None:
    return next((service for service in services_seed if service.slug == slug), None)


def create_service(payload: ServiceCreate) -> ServicePublic | None:
    if get_service(payload.slug) is not None:
        return None
    service = ServicePublic.model_validate(payload.model_dump())
    services_seed.append(service)
    return service


def update_service(slug: str, payload: ServiceUpdate) -> ServicePublic | None:
    service = get_service(slug)
    if service is None:
        return None

    updated = service.model_copy(update=payload.model_dump(exclude_unset=True))
    index = services_seed.index(service)
    services_seed[index] = updated
    return updated


def delete_service(slug: str) -> bool:
    service = get_service(slug)
    if service is None:
        return False
    services_seed.remove(service)
    return True


def list_news_categories() -> list[NewsCategoryPublic]:
    return categories_seed


def list_news_articles(
    *,
    category: str | None,
    search: str | None,
    page: int,
    page_size: int,
) -> PaginatedResponse[NewsArticleListItem]:
    filtered: list[NewsArticlePublic] = list(news_seed)
    if category:
        filtered = [item for item in filtered if item.category.slug == category]
    if search:
        term = search.casefold()
        filtered = [
            item
            for item in filtered
            if term in item.title.casefold() or term in item.excerpt.casefold()
        ]
    return paginate(filtered, page, page_size)


def get_news_article(slug: str) -> NewsArticlePublic | None:
    return next((article for article in news_seed if article.slug == slug), None)


def get_news_category(slug: str) -> NewsCategoryPublic | None:
    return next((category for category in categories_seed if category.slug == slug), None)


def create_news_article(payload: NewsArticleCreate) -> NewsArticlePublic | None:
    if get_news_article(payload.slug) is not None:
        return None
    category = get_news_category(payload.category_slug)
    if category is None:
        return None

    now = datetime.now(UTC)
    article = NewsArticlePublic(
        title=payload.title,
        slug=payload.slug,
        excerpt=payload.excerpt,
        body=payload.body,
        author=payload.author,
        published_at=now,
        revised_at=now,
        category=category,
        featured_image=payload.featured_image,
        status=payload.status,
        related_articles=[],
    )
    news_seed.append(article)
    refresh_related_articles()
    return article


def update_news_article(slug: str, payload: NewsArticleUpdate) -> NewsArticlePublic | None:
    article = get_news_article(slug)
    if article is None:
        return None

    update_data = payload.model_dump(exclude_unset=True)
    category_slug = update_data.pop("category_slug", None)
    if category_slug is not None:
        category = get_news_category(str(category_slug))
        if category is None:
            return None
        update_data["category"] = category
    update_data["revised_at"] = datetime.now(UTC)

    updated = article.model_copy(update=update_data)
    index = news_seed.index(article)
    news_seed[index] = updated
    refresh_related_articles()
    return updated


def delete_news_article(slug: str) -> bool:
    article = get_news_article(slug)
    if article is None:
        return False
    news_seed.remove(article)
    refresh_related_articles()
    return True


def list_portfolio_projects(
    *,
    category: str | None,
    page: int,
    page_size: int,
) -> PaginatedResponse[PortfolioProjectListItem]:
    filtered: list[PortfolioProjectListItem] = list(portfolio_seed)
    if category:
        filtered = [item for item in filtered if item.category.casefold() == category.casefold()]
    return paginate(filtered, page, page_size)


def get_portfolio_project(slug: str) -> PortfolioProjectPublic | None:
    return next((project for project in portfolio_seed if project.slug == slug), None)


def create_portfolio_project(payload: PortfolioProjectCreate) -> PortfolioProjectPublic | None:
    if get_portfolio_project(payload.slug) is not None:
        return None
    project = PortfolioProjectPublic.model_validate(payload.model_dump())
    portfolio_seed.append(project)
    return project


def update_portfolio_project(
    slug: str,
    payload: PortfolioProjectUpdate,
) -> PortfolioProjectPublic | None:
    project = get_portfolio_project(slug)
    if project is None:
        return None

    updated = project.model_copy(update=payload.model_dump(exclude_unset=True))
    index = portfolio_seed.index(project)
    portfolio_seed[index] = updated
    return updated


def delete_portfolio_project(slug: str) -> bool:
    project = get_portfolio_project(slug)
    if project is None:
        return False
    portfolio_seed.remove(project)
    return True
