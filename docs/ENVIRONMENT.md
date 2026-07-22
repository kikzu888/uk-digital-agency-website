# Environment Variables

Use `.env.example` as the template. Do not commit `.env` or real secrets.

## Shared

- `APP_ENV`: `development`, `staging` or `production`.
- `SITE_URL`: public frontend URL.
- `API_URL`: public backend URL.

## Backend

- `BACKEND_CORS_ORIGINS`: comma-separated allowed frontend origins.
- `DATABASE_URL`: PostgreSQL connection string, using `postgresql+asyncpg://`.
- `SECRET_KEY`: strong random value, at least 32 characters outside placeholder use.
- `ACCESS_TOKEN_EXPIRE_MINUTES`: admin access token lifetime.
- `REFRESH_TOKEN_EXPIRE_DAYS`: reserved for future refresh token support.
- `RATE_LIMIT_PER_MINUTE`: public request rate limit per client key.
- `ADMIN_EMAIL`: initial admin email.
- `ADMIN_PASSWORD_HASH`: generated with `python scripts/generate_admin_password_hash.py`.

## Email

- `EMAIL_PROVIDER`: currently `console`; production adapters can be added for Resend, Postmark or Amazon SES.
- `EMAIL_FROM`: sender address.
- `ADMIN_NOTIFICATION_EMAIL`: admin notification recipient.
- `RESEND_API_KEY`: reserved.
- `POSTMARK_SERVER_TOKEN`: reserved.
- `AWS_SES_REGION`: reserved.
- `AWS_ACCESS_KEY_ID`: reserved.
- `AWS_SECRET_ACCESS_KEY`: reserved.

## Frontend

- `NEXT_PUBLIC_SITE_URL`: browser-visible frontend URL.
- `NEXT_PUBLIC_API_URL`: browser-visible backend URL.
- `NEXT_PUBLIC_COMPANY_NAME`: placeholder company name.
- `NEXT_PUBLIC_COMPANY_PHONE`: placeholder UK phone number.
- `NEXT_PUBLIC_COMPANY_EMAIL`: placeholder business email.
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`: `none` by default, `ga4` when enabled after consent/legal review.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: GA4 measurement ID, only used when provider is `ga4`.
