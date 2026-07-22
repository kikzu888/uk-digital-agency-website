# Deployment Guide

## Recommended Architecture

- Frontend: Vercel
- Backend: Render, Railway, DigitalOcean, Fly.io or a major cloud container service
- Database: managed PostgreSQL in the same region as the backend
- Media: cloud object storage
- Domain: `.co.uk` primary for UK market, with `.uk` and `.com` redirected where practical

## Environment Variables

Use `.env.example` as the source of required variable names. Never commit `.env`.

Important production values:

- `APP_ENV=production`
- `SITE_URL`
- `API_URL`
- `BACKEND_CORS_ORIGINS`
- `DATABASE_URL`
- `SECRET_KEY`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `EMAIL_PROVIDER`
- `EMAIL_FROM`
- `ADMIN_NOTIFICATION_EMAIL`

Generate an admin password hash:

```bash
cd backend
python scripts/generate_admin_password_hash.py
```

## Backend Deployment

Install and run:

```bash
cd backend
python -m pip install -e .
python -m alembic upgrade head
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

For production process management use the hosting provider's ASGI/container runner. HTTPS should be enforced by the platform or reverse proxy.

## Frontend Deployment

```bash
cd frontend
npm ci
npm run build
npm run start
```

On Vercel, set the project root to `frontend/` and configure:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_COMPANY_NAME`
- `NEXT_PUBLIC_COMPANY_PHONE`
- `NEXT_PUBLIC_COMPANY_EMAIL`

## GitHub Repository Setup

This machine currently has a Git repository rooted at `C:/Users/kikzu`, which is too broad for this project. Create a separate repository from the project directory:

```bash
cd C:\Users\kikzu\PycharmProjects\PythonProject5
git init
git add .
git commit -m "Initial production-ready agency website scaffold"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Do not run `git add` from `C:/Users/kikzu`.
