# Security Notes

## Implemented

- FastAPI CORS allow-list through environment configuration
- Backend security headers
- Frontend security headers
- Pydantic validation
- SQLAlchemy model layer and parameterised database access path
- Admin authentication without public registration
- Salted PBKDF2-SHA256 password hashing
- Bearer token protected admin routes
- Contact form honeypot
- Contact endpoint rate limiting
- Hashed IP/User-Agent storage path
- Secrets excluded via `.gitignore`
- Optional analytics scripts load only after consent when configured.

## Admin Frontend Note

The admin frontend now relies on backend-set HTTP-only cookies instead of browser session storage. Before production use, add CSRF protection for unsafe admin mutation requests and consider a refresh-token or server-side session store depending on the chosen hosting architecture.

## Production Requirements

- Set a strong `SECRET_KEY`.
- Store only `ADMIN_PASSWORD_HASH`, never plaintext admin passwords.
- Configure managed PostgreSQL and run Alembic migrations.
- Restrict `BACKEND_CORS_ORIGINS` to production frontend origins.
- Enforce HTTPS at platform or proxy level.
- Replace console email provider with a production provider adapter.
- Add full Content Security Policy once analytics, images and email tools are finalised.
- Enable dependency monitoring in GitHub.
