# Decisions

## 2026-07-22 - Architecture

Decision: Use a separated monorepo with `frontend/` and `backend/`.

Reason: The project needs SEO-focused frontend rendering and a Python API backend. A separated monorepo keeps deployment independent while allowing shared documentation, CI, and Docker orchestration.

## 2026-07-22 - Frontend Stack

Decision: Use Next.js with React, TypeScript, and Tailwind CSS.

Reason: Next.js is well suited for SEO, static generation, server rendering, dynamic metadata, image optimisation, and high Core Web Vitals performance.

## 2026-07-22 - Backend Stack

Decision: Use FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL, and Uvicorn/Gunicorn.

Reason: This matches the requirement, supports typed API contracts, OpenAPI documentation, clean validation, migrations, and production ASGI deployment.

## 2026-07-22 - Email Provider Abstraction

Decision: Implement an email service interface first, with provider adapters later.

Reason: Contact notifications should not depend directly on one vendor. Recommended initial providers to evaluate are Resend, Postmark, and Amazon SES.

## 2026-07-22 - Hosting Direction

Decision: Prefer Vercel for frontend. For backend, shortlist Render, Railway, DigitalOcean, and AWS/GCP/Azure depending on budget and scaling needs.

Reason: Frontend and backend have different operational requirements. Keeping them separate gives better SEO/frontend performance and simpler backend scaling.

## 2026-07-22 - Admin Password Hashing

Decision: Use a standard-library PBKDF2-SHA256 password hash format for the initial admin authentication layer.

Reason: The local environment exposed a `passlib` and `bcrypt` compatibility failure with current bcrypt behaviour. PBKDF2 via Python's standard library avoids that dependency risk while still storing only salted password hashes.

## 2026-07-23 - Admin Session Handling

Decision: Use backend-set HTTP-only cookies for the admin browser session while keeping bearer tokens available for API clients.

Reason: The admin frontend should not persist access tokens in browser storage. HTTP-only cookies reduce token exposure from client-side script access and give a cleaner path to production session hardening.
