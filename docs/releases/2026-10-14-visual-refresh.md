# VenusCore frontend visual refresh — 14 October 2026

Status: source and history uploaded to the kikzu888 work branch; Vercel
publication pending agency authentication and the unresolved full-audit gate.

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

- Source commit: `bd0f04c2e614453bb4af67bdc06c944affab8bb0`.
- Review: https://github.com/kikzu888/uk-digital-agency-website/pull/1 (draft).
- CI: https://github.com/kikzu888/uk-digital-agency-website/actions/runs/38624540346
  (backend passed; frontend was still running when this record was written).
- Previous deployment: pending authenticated verification; the 8 October notebook
  records `dpl_FsrjFrEcobtG7nHQWBzRXA4YEF83`, which must not be assumed current.
- New deployment ID and URL: pending.
- Production verification: pending.

## Validation

- ESLint and TypeScript passed for the visual implementation.
- Existing Vitest tests: 5 passed.
- Browser review at 390, 768 and 1440px: home, services and SEO detail render
  without horizontal overflow; service images load in colour.
- Pause/resume, reduced-motion behaviour and absence of page errors verified.
- Isolated Webpack production build: passed, 36 pages.
- Initial Turbopack attempt could not resolve the dependency junction used for
  the visual preview. A separate clean install is being validated for release.
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

## Rollback

Record the authenticated previous production deployment before publishing. If
verification fails, restore that deployment in the same `kikzu888/frontend`
project; never select the personal portfolio. No database rollback is involved.

## Related records

- [Changelog](../../CHANGELOG.md)
- [Design and workflow decisions](../../DECISIONS.md)
- [Asset prompts and palette](../visual-refresh-assets.json)
- [Safe development and release boundaries](../safe-development.md)
