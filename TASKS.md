# Tasks

## Stage 1 - Analysis and Planning

- [x] Review existing workspace structure.
- [x] Confirm no existing project files need to be removed.
- [x] Define recommended architecture.
- [x] Define technology stack.
- [x] Define project folder structure.
- [x] Plan database models.
- [x] Plan sitemap and page structure.
- [x] Plan SEO, security, GDPR, and accessibility foundations.
- [x] Create initial hosting comparison.

## Stage 2 - Project Setup

- [x] Create frontend Next.js project.
- [x] Create backend FastAPI project.
- [x] Add PostgreSQL configuration.
- [x] Add Docker configuration.
- [x] Add environment configuration.
- [x] Implement `/health` and `/ready`.
- [x] Verify frontend install/build before moving to Stage 3.
- [x] Verify backend linting, formatting, typing, and health test.

## Stage 3 - Core Pages

- [x] Build layout, navigation, and footer.
- [x] Build Home page.
- [x] Build About page.
- [x] Build Services page and service sections.
- [x] Build Contact page and validation.
- [x] Verify frontend linting, type checking, and build after Stage 3.

## Stage 4 - Content Systems

- [x] Build News models, API, and pages.
- [x] Build Portfolio models, API, and pages.
- [x] Add seed data marked as placeholder content.
- [x] Add API tests for services, news, and portfolio.
- [x] Verify backend and frontend checks after Stage 4.

## Stage 5 - Admin

- [x] Add admin authentication.
- [x] Add role-based permissions.
- [x] Add minimal admin CRUD API.
- [x] Add contact submission management.

## Stage 6 - SEO, Security, GDPR

- [x] Add sitemap, robots, metadata, JSON-LD, breadcrumbs, and 404.
- [x] Add security headers, CORS, rate limiting, and CSP plan.
- [x] Add Privacy Policy, Cookie Policy, Terms, and Accessibility Statement templates.

## Stage 7 - Testing and Deployment Prep

- [x] Add backend tests.
- [x] Add frontend tests.
- [x] Add E2E tests.
- [x] Add GitHub Actions CI.
- [x] Add deployment documentation.
# VenusCore continuation audit - 8 October 2026

## Frontend publication - 8 October 2026

At the user's explicit request, using the approved kikzu888 account, the existing
alias `https://frontend-eta-lovat-45.vercel.app` was assigned to ready production
deployment `dpl_FsrjFrEcobtG7nHQWBzRXA4YEF83` (frontend-ak9vj8vb1-kikzu888.vercel.app).
Public contact HTML confirms multi-service/unsure selection and removal of surname,
budget and website URL inputs. Previous deployment: `8Sprs5b3XBT5k4wfEjoygrjh9DUo`.
Backend was not deployed or migrated. Production enquiry persistence/delivery
remains pending the original developer's database/configuration clarification.

Presentation decision: prioritise countries -> sectors -> projects, rather than
company names. `WorkExplorer` now provides country counts and sector filtering on
the homepage and portfolio catalogue. Cards lead with location, sector and role;
project names follow. Countries are project locations, never agency office claims.
Lint/TypeScript passed; Canada filter confirmed to return two relevant projects.

## Implemented request journeys

Real-work content update: all ten portfolio projects are now used by frontend
listing/detail routes via `frontend/lib/realWork.ts`, with local image copies,
founder attribution, role and project location. Original demo entries remain
preserved separately as `demoPortfolioProjects`. Frontend build generated 35 pages;
lint and TypeScript passed. Contact/footer expose both portfolio WhatsApp contacts,
with London as provisional location. Backend portfolio demo content still needs
alignment before API-driven publishing/admin management; browser enquiry and
responsive verification are still pending. No agency deployment was performed.

- Homepage value proposition and equal consultation/project/audit CTAs wired.
- Contact form reads intent from the CTA URL and allows switching intent; optional
  company/phone/budget, request-specific context, pending state and confirmations.
- API schema, memory/SQL repository and admin response preserve enquiry intent,
  website URL, audit area, timeline and preferred time. Admin lists the context.
- Migration `202610080001` prepared; not run against any database.
- Backend tests: 24 passed, including free consultation without budget and audit
  context persistence/invalid intent rejection. Frontend build passed; lint and
  TypeScript passed. Browser end-to-end/real PostgreSQL verification still pending.
- Black formatter blocked locally by Windows Application Control; formatting
  validation in CI remains necessary. Production and external email are unchanged.

## User decisions and pre-launch contact review

Content and enquiry outline is now saved in `frontend/lib/strategy.ts` on branch
`work/venuscore-content-and-enquiries`. This is an implementation input, not a
claim that the new routes/forms are wired or published. Next: implement enquiry
intent end-to-end (schema/model/migration/repository/admin/frontend), then wire
the homepage copy and CTAs. Audit website URL is conditional on the audit area;
never collect passwords in enquiry forms. Booking requests are not confirmations.

- Temporary contact source: `../production-portfolio/`.
- WhatsApp: +971 58 596 8787 and +995 555 10 20 35.
- LinkedIn: https://www.linkedin.com/in/valeri-gviniashvili/
- Facebook: https://www.facebook.com/valeridigitalcreator
- Portfolio reference: https://valeri-portfolio-sigma.vercel.app/
- Temporary location label: `London`. Not a verified office/registered address.
- LAUNCH BLOCKER: confirm and update public contacts, actual location/address and
  company registration details before publication. Portfolio source currently has
  no public email field; account email must not automatically become public email.
- Consultation and audit: free. Duration/platform remain to be determined; use
  request-based scheduling until the booking process is confirmed.
- No public service prices or pricing tables. Any budget question is optional
  project qualification, not an advertised price or a requirement for free audits.
- Service scope: paid media/lead generation, websites/SEO, CRM, WhatsApp Marketing,
  Email Marketing and AI workflow/process automation. Cybersecurity capability
  remains unconfirmed; do not silently include it in the final offer.
- Use all ten portfolio projects: BIG Estate, IOKA, Eagle Hills Tbilisi, CanaStruct,
  CanaWelding, Laduchi Consult, Kraft Rohbau, Kraftbouw, Gilani Mobility and Handy.
  Preserve real roles/results and distinguish founder experience from agency work.

Approved direction: VenusCore for UK SMEs across sectors; consultation, project
enquiry and audit request have equal priority. Portfolio work is separate.

## Current verification

- Source review: frontend routes/content/forms, API client, contact storage/email
  flow, authentication, development isolation and release documentation.
- Frontend ESLint and TypeScript passed; Vitest: 5 passed in 2 files.
- Isolated backend pytest: 22 passed. Deprecation and cache-write warnings remain.
- Current `npm audit --json`: 0 vulnerabilities reported for this local checkout.
  This supersedes the old 14-advisory baseline for this audit only; it does not
  establish deployed versions, CI status or reproducibility from a clean install.
- No live form submissions, emails, production settings changes or deployment.
- Production database, booking integration, email delivery, browser layout and
  current deployment configuration are not yet verified in this phase.

## Prioritised implementation backlog

P0 - reliable delivery and release configuration:
- Confirm agency GitHub/Vercel ownership and permissions using only the approved
  user profile. Read existing deployment settings before selecting release targets.
- Verify clean lockfile install and production build; rerun CI on the work branch.
- Validate frontend/backend roots and separate previews with test-only resources.
- Keep production database requirement enforced; test real database persistence,
  migrations, backup and restore in an isolated environment.
- Resolve cookie-auth admin CSRF protection before exposing mutations.
- Separate contact persistence from notification failure: current handler saves
  first and sends email second; a provider failure can return an error after the
  enquiry has been stored, encouraging duplicate submissions on retry.
- Verify serverless rate limiting across instances (current in-process limiter),
  spam protection, allowed origins and credentials.

P1 - conversion and marketing content:
- Add three explicit enquiry intents: consultation, project and audit, preserved
  from CTA through form validation, database/admin and response confirmation.
- Consultation: requested discussion topic and scheduling preference; do not claim
  a confirmed booking without an actual scheduling integration.
- Project: scope, business goal, timing and budget. Audit: site URL and concern.
- Reduce required form friction: current form requires phone, company, budget,
  service and 20-character description for every request; add pending-submit state,
  disable duplicates, accessible error relationships and success announcements.
- Replace generic technology-first homepage messaging with business problems,
  delivered services, evidence and three equally clear next actions.
- Organise services around acquisition, websites/SEO and CRM/automation. Validate
  delivery capability before retaining the cybersecurity service offer.
- Replace placeholder case studies with verified personal work; distinguish the
  founder's previous experience from engagements contracted by VenusCore.
- Case structure: problem, role, delivery, evidence, outcome. Spend figures must
  retain their actual currency and period; do not imply revenue or monthly spend.
- Replace demo news with useful reviewed content or keep it out of the public
  release. Confirm business contact details and policy content before launch.

P2 - quality, SEO and measurement:
- Check all pages and enquiry paths at desktop/mobile widths, image framing,
  keyboard navigation, loading/error/empty states and accessibility.
- Verify metadata, canonical URLs, sitemap, robots and structured data. Current
  robots allows indexing and falls back to localhost for sitemap when unset;
  previews should discourage indexing and production URLs must be correct.
- Define measurement for each of the three enquiry intents; implement analytics
  in accordance with actual consent settings. Verify no personal form data leaks
  into analytics events.
- Release only after isolated end-to-end enquiry/admin checks, content review,
  passing CI, explicit production target verification and rollback preparation.

## Proposed page structure and content order

Home: clear value proposition -> three enquiry choices -> service groups -> real
work -> delivery process -> founder experience -> FAQs -> three enquiry choices.
Services: acquisition / websites & SEO / CRM & automation with scoped deliverables.
Work: verified cases from the user's portfolio, with accurate authorship context.
About: real experience, working approach and delivery responsibilities.
Contact: the three distinct request paths; shared privacy information and contact.
Insights: publish only completed, reviewed articles. Policy pages: final business
details and reviewed wording before release.

Next work package: create a `work/*` branch from recovery; validate clean technical
baseline, prepare the enquiry-intent schema and homepage/service content outline.


## Visual refresh ? 14 October 2026

- Replaced grayscale service treatment with seven original generated lavender/periwinkle/peach illustrations. Originals preserved; optimised WebP copies and prompts recorded in docs/visual-refresh-assets.json.
- Shared lavender CTA style with plum text; lighter selected project filters.
- Added contained celestial hero: drifting/twinkling stars, orbiting satellite, occasional shooting star, planet, pause/resume and reduced-motion support.
- Verified local /, /services and /services/seo at 390, 768 and 1440px: no horizontal overflow, images decoded, no page errors. Pause/resume and reduced-motion assertions passed. Screenshots in ignored .test-artifacts/visual-refresh/.
- ESLint and TypeScript passed; Vitest 5/5 passed. Isolated production build with --webpack passed (36 pages). Default Turbopack build blocked by dependency junction outside its root; no claim of clean-install reproducibility.
- Local preview uses an isolated copy without env files and a loopback API target. No live form submission. Changes remain local; Vercel kikzu888 access previously returned 403.
