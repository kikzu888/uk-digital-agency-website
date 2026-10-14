# VenusCore frontend visual refresh — 14 October 2026

Status: frontend published on 14 October 2026 to the verified kikzu888 project.
The draft PR remains unmerged; the full dependency-audit CI gate is failing
on development-only findings described below.

## Target and scope

- Owner: `kikzu888`; Vercel account: `kikzu888@gmail.com`.
- Repository: https://github.com/kikzu888/uk-digital-agency-website
- Work branch: `work/venuscore-content-and-enquiries`.
- Vercel team: `team_ffdEeBpL06ZktKqVGrds1NdO` (`kikzu888`).
- Frontend project: `prj_IOgteASI5Y4kp9JrZwCypoSeVFAQ` (`frontend`).
- Public alias: https://frontend-eta-lovat-45.vercel.app/
- Requested release: updated service art, lighter actions and celestial hero.
- Backend deployment, database migrations and external messages are outside this release.

The user explicitly requested publication on 14 October and reiterated that
both GitHub and Vercel must use `kikzu888`. Verify actual authenticated ownership,
not just the local project link. Do not substitute another project on access failure.

## Source and deployment evidence

- Deployed source commit: `637cc9b0a57c4d3d27cbc68da3c908c8662130c6`
  (frontend implementation: `bd0f04c2e614453bb4af67bdc06c944affab8bb0`).
- Review: https://github.com/kikzu888/uk-digital-agency-website/pull/1 (draft).
- CI: https://github.com/kikzu888/uk-digital-agency-website/actions/runs/38624540346
  (backend passed; frontend lint, types, unit/E2E tests and build passed;
  final full NPM audit failed).
- Previous deployment: `dpl_8y6pSspqRaJYPwE9bE376HkeB7A9`,
  https://frontend-7pgaqktr1-kikzu888.vercel.app.
- New deployment: `dpl_BkeCaocdCw9SXJtEhDdWP7KXPFh9`,
  https://frontend-jvaq6emnq-kikzu888.vercel.app, production / Ready.
- Public aliases: https://frontend-eta-lovat-45.vercel.app and
  https://frontend-kikzu888.vercel.app.
- Verified CLI identity `kikzu888-9124` / `kikzu888@gmail.com` and explicit
  `--scope kikzu888`. A stale process-level VERCEL_TOKEN was removed so the
  confirmed device login could be used; no saved credential was committed.
- Built from an isolated git archive of the exact source commit, excluding local
  backend edits and env files. Vercel's default Turbopack build passed (36 pages).
- Set public NEXT_PUBLIC_SITE_URL to https://frontend-eta-lovat-45.vercel.app
  for this deployment's build/runtime. Canonical service URL verified.
- Authenticated deployment check passed before assigning the main alias.
  Public home, services, SEO detail and generated artwork returned HTTP 200.
  CLI assigned the default frontend-kikzu888 alias despite --skip-domain;
  the user's main alias was explicitly assigned after verification.
- Live Chromium verification passed on the main alias at 390, 768 and 1440px:
  home, services and SEO detail had no horizontal overflow or broken images;
  pause/resume and reduced motion passed, with no page errors. Screenshots are
  retained locally in ignored .test-artifacts/visual-refresh/live-mobile-*.png.

## Validation

- ESLint and TypeScript passed for the visual implementation.
- Existing Vitest tests: 5 passed.
- Browser review at 390, 768 and 1440px: home, services and SEO detail render
  without horizontal overflow; service images load in colour.
- Pause/resume, reduced-motion behaviour and absence of page errors verified.
- Isolated Webpack production build: passed, 36 pages.
- Initial Turbopack attempt could not resolve the dependency junction used for
  the visual preview. The clean-install check below resolved this limitation.
- Clean `npm ci`: passed. Default Turbopack production build from the clean
  dependency installation passed (36 pages); the earlier junction limitation
  is specific to the visual preview, not a source build failure.
- Runtime audit (`npm audit --omit=dev --audit-level=high`): 0 vulnerabilities.
- Full audit: 5 high findings in the development-only chain
  `eslint-config-next -> @next/eslint-plugin-next -> fast-glob -> micromatch -> braces`.
  Root advisory: GHSA-vfj7-8cjw-p6xm. Registry latest braces is 3.0.3 and is
  affected. No forced downgrade or silent audit exemption was applied; the
  existing full-audit CI gate remains enabled.
- Unit tests: 5 passed after making the sitemap test independent of shell env.
- Durable Chromium E2E checks: 6 passed, including consultation navigation,
  service detail navigation, form fields, login form, motion controls and mobile art.

## Known limits

Public contact/company details remain provisional. Real PostgreSQL persistence,
notification delivery and booking integration are not certified by visual checks.
Do not infer that frontend publication deploys the pending backend or migration.
The existing public frontend API fallback is http://localhost:8000; no verified
production API URL was configured in this visual release. Contact submission
remains a separate blocker and was not exercised against live data.

## Rollback

If rollback is needed, restore both public aliases to the previous verified URL
https://frontend-7pgaqktr1-kikzu888.vercel.app using explicit --scope kikzu888.
Never select the personal portfolio. No database rollback is involved.

## Related records

- [Changelog](../../CHANGELOG.md)
- [Design and workflow decisions](../../DECISIONS.md)
- [Asset prompts and palette](../visual-refresh-assets.json)
- [Safe development and release boundaries](../safe-development.md)
