# Branching Strategy

## Branches

- `main`: production-ready branch.
- `develop`: integration branch for upcoming releases.
- `feature/<short-name>`: scoped feature work.
- `fix/<short-name>`: bug fixes.
- `docs/<short-name>`: documentation-only changes.

## Pull Requests

Every pull request should:

- Keep changes scoped.
- Pass backend checks.
- Pass frontend checks.
- Avoid secrets, `.env`, build artefacts and generated caches.
- Mark demo content as placeholder.

## Commit Message Style

Use concise imperative messages:

- `Add contact submission API`
- `Fix sitemap route coverage`
- `Document deployment environment variables`
