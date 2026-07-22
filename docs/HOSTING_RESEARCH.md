# Hosting Research

Research date: 2026-07-22

Prices and plan details can change. Final selection must be checked again against official pricing before purchase.

## Initial Comparison

| Provider | Fit for FastAPI | PostgreSQL | Docker | UK/EU region | Notes |
| --- | --- | --- | --- | --- | --- |
| Render | Good | Managed Postgres | Yes | Frankfurt | Easiest PaaS path for a beginner-friendly backend. |
| Railway | Good | Managed Postgres | Yes | Amsterdam | Simple GitHub deployment and quick environment setup. |
| Fly.io | Good | Managed Postgres | Yes | London and EU app regions; managed Postgres availability varies | Strong for edge/regional apps, more operational judgement needed. |
| DigitalOcean | Good | Managed databases | Yes | London, Amsterdam, Frankfurt | Balanced PaaS/VPS options and predictable pricing. |
| AWS | Excellent | RDS | Yes | London, Ireland | Best mature scaling path, highest setup complexity. |
| Google Cloud | Excellent | Cloud SQL | Yes | London, Belgium, EU regions | Strong serverless container option via Cloud Run, more cloud knowledge needed. |
| Azure | Excellent | Azure Database for PostgreSQL | Yes | UK South, UK West | Strong Microsoft ecosystem fit, moderate-to-high complexity. |
| Hetzner | Good on VPS | Self-managed or managed database options | Yes | Germany, Finland | Best raw value, needs server administration. |
| GoDaddy | Possible on VPS, weak on shared hosting | Not ideal as managed Postgres platform | Possible on VPS | Global data centres | Better as registrar than application platform for this stack. |
| PythonAnywhere | Limited for FastAPI | Database options vary by plan | No standard Docker workflow | EU availability depends on account/product | ASGI support is beta/limited; not first choice for production FastAPI. |

## Recommendations

1. Best simple option for a beginner: Vercel frontend + Render backend + Render Postgres.
2. Best price/features option: Vercel frontend + Railway or DigitalOcean backend + managed PostgreSQL.
3. Best scalable professional option: Vercel frontend + AWS/GCP/Azure backend + managed PostgreSQL, object storage, logs, monitoring, and IaC later.

## Frontend

Vercel is the preferred frontend host because it is the native platform for Next.js, supports GitHub integration, preview deployments, SSL, custom domains, caching, and framework-aware builds.

## GoDaddy Assessment

GoDaddy should not be treated as automatically best for this project. Shared hosting is not a strong match for a FastAPI app that needs a persistent ASGI process, PostgreSQL, and Docker. GoDaddy VPS can run the stack, but it shifts patching, security, deployment, backups, monitoring, and database operations onto us. GoDaddy remains acceptable as a domain registrar.

## Proposed Production Architecture

- Frontend: Vercel
- Backend: Render, Railway, DigitalOcean, or cloud provider container service
- Database: managed PostgreSQL in the same region as backend
- Media: S3-compatible object storage
- Domain: independent registrar or GoDaddy
- Email: provider abstraction, with Resend/Postmark/Amazon SES evaluated before implementation
