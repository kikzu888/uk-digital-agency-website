# API Overview

Base URL: `http://127.0.0.1:8000`

OpenAPI:

- Swagger UI: `/docs`
- ReDoc: `/redoc`
- OpenAPI JSON: `/openapi.json`

## System

- `GET /health`
- `GET /ready`

## Public Content

- `GET /api/v1/services`
- `GET /api/v1/services/{slug}`
- `GET /api/v1/news`
- `GET /api/v1/news/categories`
- `GET /api/v1/news/{slug}`
- `GET /api/v1/portfolio`
- `GET /api/v1/portfolio/{slug}`

## Contact

- `POST /api/v1/contact`

Contact submissions are validated server-side, rate limited and stored in PostgreSQL when `DATABASE_URL` is configured. In development without PostgreSQL, an in-memory fallback is used.

## Admin

Admin routes accept either a bearer token from `POST /api/v1/admin/auth/login` or the HTTP-only admin session cookie set by that login endpoint.

- `GET /api/v1/admin/me`
- `POST /api/v1/admin/auth/logout`
- `GET /api/v1/admin/contact-submissions`
- `GET /api/v1/admin/services`
- `POST /api/v1/admin/services`
- `PATCH /api/v1/admin/services/{slug}`
- `DELETE /api/v1/admin/services/{slug}`
- `GET /api/v1/admin/news`
- `POST /api/v1/admin/news`
- `PATCH /api/v1/admin/news/{slug}`
- `DELETE /api/v1/admin/news/{slug}`
- `GET /api/v1/admin/portfolio`
- `POST /api/v1/admin/portfolio`
- `PATCH /api/v1/admin/portfolio/{slug}`
- `DELETE /api/v1/admin/portfolio/{slug}`
