# Changelog

## 2026-10-14 - Compact service and portfolio cards

- Changed service and portfolio grids to three columns from 1024px, two from
  768px and one on phones to reduce oversized desktop cards.
- Equalised card heights, image frames, title space and action alignment;
  reduced service padding and heading sizes. Homepage portfolio preview shows
  one complete row of three projects; all ten remain on the portfolio page.
- Updated responsive image sizes. ESLint, TypeScript and browser layout checks
  passed at 390, 768, 1024 and 1440px for both pages.

## 2026-10-14 - Published: VenusCore visual refresh

Published to the verified `kikzu888/frontend` Vercel project at
https://frontend-eta-lovat-45.vercel.app/; see [the release record](docs/releases/2026-10-14-visual-refresh.md)
for deployment evidence, rollback and the outstanding API/audit limitations.

### Changed

- Replaced grayscale service illustrations with seven original coloured WebP
  images in lavender, periwinkle and peach.
- Lightened action buttons and selected location filters; kept clear text and
  keyboard focus states.
- Replaced the boxed hero graphic with a proportionate celestial scene containing
  drifting stars, orbital motion and pause/resume controls. Reduced motion is honoured.
- Formatted the homepage, work explorer, enquiry form and animation source for
  readability. Updated browser smoke tests to match the approved content.
- Documented change-history responsibilities and strict `kikzu888` release targets.

### Source baseline included

The work branch also records previously uncommitted frontend content from the
8 October work: ten founder-attributed projects, country/sector browsing, six
approved service areas and consultation/project/audit enquiry choices. This
describes the source baseline, not a new claim that backend storage or delivery
has been deployed. Backend changes and database migration remain separate.

## 0.1.0 - Unreleased

- Added Stage 1 planning documentation.
- Added Stage 2 initial frontend and backend scaffold.
- Added Docker and environment configuration placeholders.
- Added backend health and readiness endpoints.
- Added News and Portfolio content models, API endpoints, placeholder seed content, frontend pages, and tests.
- Added initial admin authentication model, login endpoint, protected profile endpoint, and tests.
- Added contact submission API, frontend submission integration, rate limiting, email abstraction, protected admin contact listing, and tests.
- Added protected admin CRUD API for Services, News and Portfolio demo content.
- Added sitemap, robots, JSON-LD, policy pages, custom 404 page, and frontend security headers.
- Added CI workflow, GitHub templates, frontend tests, backend security header test, and deployment/API/SEO/security documentation.
- Added Playwright E2E smoke tests.
- Added environment, branching, monitoring, domain strategy docs and local check scripts.
- Added Resend/Postmark email provider adapters and optional consent-gated analytics structure.
- Added minimal admin frontend login and contact submissions dashboard.
- Replaced admin frontend token storage with HTTP-only cookie session handling.
