# Project Notebook

## 2026-07-22

### Completed

- Reviewed the existing workspace.
- Found only a sample `main.py`, `.idea/`, and `.venv/`.
- Created the initial monorepo folder structure.
- Added Stage 1 planning documents.
- Added `.gitignore` to protect `.env`, virtual environments, build output, caches, and local IDE files.
- Created the initial FastAPI backend scaffold.
- Added `/health` and `/ready` endpoints.
- Added initial Next.js frontend scaffold.
- Added `.env.example`, backend/frontend Dockerfiles, and `docker-compose.yml`.
- Added Alembic baseline configuration.
- Verified backend with Ruff, Black check, mypy, and pytest.
- Resolved npm certificate verification failures by running npm with `NODE_OPTIONS=--use-system-ca`.
- Verified frontend install, linting, type checking, and production build.
- Added shared frontend layout, navigation, footer, Home, About, Services, service detail pages, and Contact page.
- Added frontend contact form validation with spam honeypot placeholder.
- Generated and copied a project-bound hero image to `frontend/public/images/digital-agency-hero.png`.
- Started the frontend development server at `http://localhost:3000`.
- Added SQLAlchemy content models and an initial Alembic migration for Services, News, Portfolio, Contact submissions, Newsletter subscribers, and SEO settings.
- Added versioned public API endpoints for `/api/v1/services`, `/api/v1/news`, and `/api/v1/portfolio`.
- Added placeholder seed content for News and Portfolio, clearly marked as demo/placeholder content.
- Added News list/detail frontend pages with categories, search and pagination structure.
- Added Portfolio list/detail frontend pages with placeholder case study labels.
- Added API tests for services, news and portfolio.
- Added initial admin authentication endpoints under `/api/v1/admin`.
- Added `AdminUser` database model and migration.
- Added salted PBKDF2-SHA256 password hashing using Python standard library.
- Added admin login/profile tests.
- Added contact submission API with backend validation, honeypot handling, rate limiting, IP/User-Agent hashing, email provider abstraction, and database-backed storage path.
- Added development memory fallback for contact submissions when PostgreSQL is not configured. Production requires database configuration.
- Connected the frontend Contact form to `/api/v1/contact`.
- Added protected admin contact submission listing endpoint.
- Added admin password hash generation script.
- Started backend development server at `http://127.0.0.1:8000`.
- Verified live `/api/v1/contact` submission returned `CONTACT-1`.
- Added protected admin CRUD endpoints for Services, News and Portfolio demo content.
- Added admin CRUD API tests.
- Added `robots.txt`, `sitemap.xml`, global ProfessionalService JSON-LD and custom 404 page.
- Added Privacy Policy, Cookie Policy, Terms and Accessibility Statement templates requiring legal review.
- Added frontend security headers via Next.js configuration.
- Added GitHub Actions CI workflow.
- Added PR template, issue templates and CODEOWNERS placeholder.
- Added frontend Vitest tests for content and sitemap contracts.
- Added Playwright E2E smoke tests for Home, Services and Contact.
- Added backend security header test.
- Added API, deployment, SEO and security documentation.
- Added environment, branching, monitoring and domain strategy documentation.
- Added local verification scripts for PowerShell and POSIX shells.
- Updated Playwright E2E to use port `3100` to avoid conflicts with the local dev server on `3000`.
- PowerShell script execution is restricted on this machine; use `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check.ps1` for local checks.
- Added Resend and Postmark email provider adapters behind the existing email abstraction.
- Added optional analytics consent component. Analytics remains disabled by default unless explicitly configured.
- Added minimal admin frontend: `/admin/login` and `/admin` contact submissions dashboard.
- Added Admin Login E2E smoke coverage.
- Replaced frontend admin sessionStorage token handling with backend-set HTTP-only admin session cookies.

### Remaining

- Docker execution must be checked in an environment where Docker CLI is installed.
- Contact form backend persistence, rate limiting, email notifications, and database storage remain for later backend stages.
- Docker execution remains unverified because Docker CLI is not available in this environment.
- Replace placeholder company details when real business information is available.
- Decide final hosting provider before deployment.

### Issues Found

- Existing `main.py` is a PyCharm sample file and is not yet part of the planned backend structure.
- `npm install` initially failed because Node/npm could not verify the registry certificate chain: `UNABLE_TO_VERIFY_LEAF_SIGNATURE`.
- Docker CLI is not installed or not available on PATH in this environment.

### Fixes Applied

- No existing files were modified or deleted.
- New project planning files were added.
- Fixed backend Python packaging so only `app*` is included in the editable install.
- Fixed backend lint, formatting, and typing issues found during verification.
- Added readiness behaviour test for the no-database-configured state.
- Used `NODE_OPTIONS=--use-system-ca` for npm commands so Node uses the Windows system certificate store.
- Excluded generated Next.js build files from ESLint.
- Disabled the ESLint triple-slash rule for Next's generated `next-env.d.ts` pattern.
- Replaced `passlib`/`bcrypt` hashing with standard-library PBKDF2-SHA256 after local bcrypt compatibility failure.
- Added `ADMIN_PASSWORD_HASH`; plaintext admin passwords must not be stored.

### Commands To Run Later

```bash
cd backend
python -m pip install -e ".[dev]"
python -m ruff check .
python -m black --check .
python -m mypy app
python -m pytest
```

Latest backend verification result:

- `python -m ruff check .`: passed
- `python -m black --check .`: passed
- `python -m mypy app`: passed
- `python -m pytest`: 22 passed, 1 dependency deprecation warning

Latest frontend verification result:

- `npm install` with `NODE_OPTIONS=--use-system-ca`: passed
- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run test`: 5 passed
- `npm run e2e`: 4 passed
- `npm run build`: passed
- Local frontend dev server: running at `http://localhost:3000`
- Local backend dev server: running at `http://127.0.0.1:8000`

```bash
cd frontend
npm install
npm run typecheck
npm run lint
npm run build
```

```bash
docker compose up --build
```

### Deployment Status

Not deployed. No domain, hosting, or production deployment has been purchased or created.
