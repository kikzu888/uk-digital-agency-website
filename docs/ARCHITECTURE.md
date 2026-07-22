# Architecture

## Summary

This project will be a separated monorepo:

- `frontend/`: Next.js website for SEO, content pages, forms, and admin UI later.
- `backend/`: FastAPI REST API for content, contact submissions, admin authentication, email notifications, and health checks.
- `docs/`: architecture, deployment, SEO, GDPR, and operating notes.
- `scripts/`: local automation scripts.
- `.github/`: CI, issue templates, PR templates, and code ownership placeholders.

## Frontend

- Next.js App Router
- React
- TypeScript strict mode
- Tailwind CSS
- Metadata API for dynamic SEO
- JSON-LD components for structured data
- Centralised API client
- Form validation with schema validation
- Accessible reusable UI components

## Backend

- FastAPI
- Pydantic settings and schemas
- SQLAlchemy ORM
- Alembic migrations
- PostgreSQL
- Repository and service layers
- Admin authentication with hashed passwords and role-based permissions
- Email provider abstraction
- Rate limiting and secure headers

## API Versioning

All public API routes will be versioned under `/api/v1`.

Planned routes:

- `/health`
- `/ready`
- `/api/v1/services`
- `/api/v1/news`
- `/api/v1/portfolio`
- `/api/v1/contact`
- `/api/v1/newsletter`
- `/api/v1/admin`

## Design System Direction

- Palette:
  - Deep Navy: `#102033`
  - Oxford Blue: `#22324A`
  - British Racing Green: `#0F4D3F`
  - Signal Amber: `#F2B84B`
  - Cloud: `#F7F9FC`
  - Slate: `#5B6675`
- Fonts:
  - Headings: `Inter`
  - Body: `Source Sans 3`
- Logo: project-local `VenusCore` logo under `frontend/public/brand/`.
- Favicon: project-local `VenusCore` mark under `frontend/app/icon.png`.

## Database Model Plan

- `AdminUser`: email, hashed password, role, active status, last login, timestamps.
- `Service`: title, slug, summary, content sections, FAQ, SEO fields, status, timestamps.
- `NewsCategory`: name, slug, description, timestamps.
- `NewsArticle`: title, slug, excerpt, body, author, category, featured image, status, published/updated dates, SEO fields, timestamps.
- `PortfolioProject`: title, slug, description, sector, problem, solution, technologies, results, images, category, status, timestamps.
- `ContactSubmission`: name, surname, company, email, phone, service interest, budget range, message, privacy consent, marketing consent, IP hash, user agent hash, status, timestamps.
- `NewsletterSubscriber`: email, consent, status, source, timestamps.
- `SEOSettings`: route, title, description, canonical URL, Open Graph fields, Twitter fields, structured data overrides, timestamps.

## Sitemap

- `/`
- `/about`
- `/services`
- `/services/digital-marketing`
- `/services/web-development`
- `/services/ai-automation-processes`
- `/services/crm-solutions`
- `/services/cybersecurity-services`
- `/portfolio`
- `/portfolio/[slug]`
- `/news`
- `/news/category/[slug]`
- `/news/[slug]`
- `/contact`
- `/privacy-policy`
- `/cookie-policy`
- `/terms-and-conditions`
- `/accessibility-statement`
- `/admin/login`
- `/admin`
- `/404`

## SEO Plan

- Use UK English, GBP where pricing examples are needed, and UK business terminology.
- Add unique metadata per page.
- Generate `sitemap.xml` and `robots.txt`.
- Add canonical URLs and Open Graph/Twitter metadata.
- Add Organization, ProfessionalService, Service, Article, Breadcrumb, and visible FAQ JSON-LD.
- Keep URL slugs readable and stable.
- Avoid keyword stuffing and duplicate page copy.
- Prepare future expansion for city-specific landing pages.

## Security Plan

- Restrict CORS to configured frontend origins.
- Validate all input with Pydantic and frontend schemas.
- Use SQLAlchemy parameterisation to avoid SQL injection.
- Add rate limiting to public form and auth endpoints.
- Hash admin passwords.
- Store secrets only in environment variables.
- Avoid sensitive data in logs.
- Add secure headers and a production CSP.
- Use HTTPS-only deployment.
- Design cookies as secure, HTTP-only, SameSite where sessions are used.

## GDPR Plan

- Collect only necessary contact fields.
- Store clear privacy consent and optional marketing consent separately.
- Add policy pages as lawyer-review templates.
- Use analytics only after consent if non-essential analytics are enabled.
- Avoid fake addresses, fake clients, fake certifications, and fake testimonials.
