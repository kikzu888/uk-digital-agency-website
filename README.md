# Company Name Digital Agency Website

Production-ready monorepo for a UK-focused digital agency website.

## Planned Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: Python, FastAPI, Pydantic, SQLAlchemy, Alembic
- Database: PostgreSQL
- API: REST under `/api/v1`
- Deployment target: Vercel for frontend, managed Python hosting for backend, managed PostgreSQL for database

## Current Status

Stages 1-7 are implemented for the current scaffold: architecture, backend, frontend, core pages, News, Portfolio, Contact, minimal admin API, SEO foundations, security foundations, tests, CI and deployment documentation.

Known limits:

- Docker files are present, but Docker execution has not been verified because Docker CLI is not available in this environment.
- PostgreSQL integration is configured, but local runtime verification used the development memory fallback because PostgreSQL is not running here.
- Policy pages are templates and require legal review before publication.
- Analytics is disabled by default and only loads after explicit consent when configured.
- The admin frontend uses HTTP-only cookies. Add CSRF protection before exposing admin mutation endpoints in production.

## Local Development

Backend:

```bash
cd backend
python -m pip install -e ".[dev]"
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Generate an admin password hash:

```bash
cd backend
python scripts/generate_admin_password_hash.py
```

Put the generated value in `ADMIN_PASSWORD_HASH`. Do not store the plaintext password.

Frontend:

```bash
cd frontend
$env:NODE_OPTIONS="--use-system-ca"
npm install
npm run dev
```

Docker:

```bash
cp .env.example .env
docker compose up --build
```

The current environment does not have Docker CLI available, so Docker execution has not been verified locally.

## Checks

Backend:

```bash
cd backend
python -m ruff check .
python -m black --check .
python -m mypy app
python -m pytest
```

Frontend:

```bash
cd frontend
$env:NODE_OPTIONS="--use-system-ca"
npm run typecheck
npm run lint
npm run test
npm run e2e
npm run build
```

Run all local checks from PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check.ps1
```

## Key Documents

- [Project notebook](PROJECT_NOTEBOOK.md)
- [Tasks](TASKS.md)
- [Decisions](DECISIONS.md)
- [Agent notes](AGENTS.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Hosting research](docs/HOSTING_RESEARCH.md)
- [API](docs/API.md)
- [Deployment](docs/DEPLOYMENT.md)
- [SEO](docs/SEO.md)
- [Security](docs/SECURITY.md)
- [Environment variables](docs/ENVIRONMENT.md)
- [Branching strategy](docs/BRANCHING.md)
- [Monitoring](docs/MONITORING.md)
- [Domain and branding](docs/DOMAIN_BRANDING.md)
