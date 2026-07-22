# Analytics and Monitoring Plan

## Search

- Google Search Console should be connected after the production domain is live.
- Submit `sitemap.xml`.
- Monitor indexing, Core Web Vitals and coverage issues.

## Analytics

Recommended options:

- Privacy-friendly: Plausible or Fathom.
- Mainstream: Google Analytics 4, only with correct cookie/consent handling where required.

Microsoft Clarity should only be enabled after consent requirements are implemented and reviewed.

## Implemented Consent Structure

The frontend includes an optional analytics consent component. It stays inactive by default:

- `NEXT_PUBLIC_ANALYTICS_PROVIDER=none`

To enable Google Analytics 4 after review:

- `NEXT_PUBLIC_ANALYTICS_PROVIDER=ga4`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

Analytics scripts load only after the visitor accepts optional analytics.

## Backend Monitoring

Implemented:

- `GET /health`
- `GET /ready`

Recommended production additions:

- Sentry or equivalent error tracking.
- UptimeRobot, Better Stack or provider-native uptime checks.
- Structured JSON logging.
- Alerting for 5xx rates, database connection failures and email delivery failures.

## Logs

Do not log:

- Plaintext passwords
- API keys
- Full access tokens
- Sensitive contact form payloads beyond operationally necessary metadata
