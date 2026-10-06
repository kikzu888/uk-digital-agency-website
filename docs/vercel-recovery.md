# Vercel source recovery — 7 October 2026

This is a source recovery and local development preparation, not a deployment.
The recovery branch is `sync/vercel-source`, based on GitHub `main` commit
`b8d78a6e772113494e75704a802a7af1e9976300` (Replace VenusCore logo asset).

## Production references

| Project | Production deployment inspected | Public alias |
| --- | --- | --- |
| frontend | [8Sprs5b3XBT5k4wfEjoygrjh9DUo](https://vercel.com/kikzu888/frontend/8Sprs5b3XBT5k4wfEjoygrjh9DUo) | <https://frontend-eta-lovat-45.vercel.app/> |
| backend | [HdhQsBTAfFkP53DCib1wS4L8J6ru](https://vercel.com/kikzu888/backend/HdhQsBTAfFkP53DCib1wS4L8J6ru) | <https://backend-five-indol-35.vercel.app/> |

Both deployments reported the same Git commit, but their uploaded source roots
were individual applications. The current Git connections point at this monorepo,
and both Vercel project Root Directory inputs were observed empty. This must be
resolved and tested in isolated previews before the next release from GitHub.
Production project settings were not changed during recovery.

## Comparison and recovered changes

103 text files were recovered/read from the two deployment Source viewers,
including a visibly empty `.gitkeep`. Compared with the saved GitHub commit:

- 98 match after removing carriage returns and terminal newline characters.
- Four files were missing in GitHub: `frontend/.vercelignore`,
  `backend/.vercelignore`, `backend/requirements.txt`, `backend/vercel.json`.
- `backend/pyproject.toml` differed only by an additional deployment section:

  ```toml
  [tool.vercel]
  entrypoint = "app.main:app"
  ```

Those four files and the entrypoint section have been restored. The recovered
backend function duration remains 60 seconds. `requirements.txt` contains the
same dependency declarations as `pyproject.toml`; it is not a version lockfile.
Application code, page content, API handlers and tests were not changed.

All 17 public PNG assets, including `/icon.png`, were downloaded from the live
frontend alias and match the GitHub files by SHA-256. These are served asset
checks, rather than a claim that every Vercel build output is reproducible.

One deployed file, `backend/migrations/script.py.mako`, remains unverified:
Vercel displayed “Unsupported Preview”, and both supported browser download
attempts timed out. Its existing GitHub version is retained unchanged in the
repository and full Git backup. Both `.dockerignore` files exist in GitHub but
were absent from the deployment trees; neither was removed. The deployed
`.pytest_cache` directory is generated cache and was deliberately not recovered.

## Safeguards added on the recovery branch

- Branch rules in root and application `vercel.json` files disable automatic Git
  deployments for `sync/*` and `work/*`. The original backend Vercel settings are
  retained alongside those rules.
- A local pre-push hook rejects direct production-branch pushes. It has been
  enabled and tested in this checkout. This is not GitHub branch protection.
- Windows launchers bind to loopback, use a local API and temporary memory data,
  refuse existing app environment files, clear admin/provider credentials and
  use console email.
- `.vercel`, Python package metadata and local Playwright configuration are
  ignored by Git; the shared example secret meets the existing validation rule.
- Existing CI now runs on `sync/**` and `work/**`, with read-only repository
  permissions. It contains no deployment or migration step. Audit checks remain
  enabled.

See [safe development](safe-development.md) for commands and the release boundary.

## Validation

| Check | Result |
| --- | --- |
| Frontend ESLint and TypeScript | Passed |
| Frontend unit tests | 5 passed |
| Next.js production build with localhost API | Passed; 27 pages generated |
| Existing Chromium page tests on isolated port 3211 | 4 passed |
| Backend pytest, database unset and console email | 22 passed |
| Backend Black | 47 files unchanged |
| Backend Mypy | Passed; 38 source files |
| Recovered dependency list / Vercel entrypoint | Consistent |
| Git bundle integrity | Complete history verified |
| Local push guard | Production branch rejected; recovery branch permitted |
| Backend Ruff on this Windows host | Blocked by Windows Application Control; CI must verify |
| Frontend dependency audit | Failed: 3 moderate, 10 high, 1 critical advisory |

The existing Next.js version is included in the critical audit result. Dependency
remediation on a separate work branch and passing CI are prerequisites to a
release. No automatic dependency fix, major version change, or production update
was performed as part of source recovery.

Local Python testing used Python 3.12.14 and the currently resolved declared
dependencies. Windows blocked SQLAlchemy's optional native extension; the same
SQLAlchemy 2.1.3 version was installed using its
[official pure Python build option](https://docs.sqlalchemy.org/en/20/intro.html#installing-manually-from-the-source-distribution).
Windows security settings were not changed. Pytest reports a Starlette/httpx
deprecation warning. The Next.js build warns about the enclosing workspace's
additional lockfile; it still builds successfully. These observations are not
claims about the exact dependencies installed in the older Vercel builds.

## Backup scope

The local sibling directory `../agency-backup` contains the complete original
Git history bundle, recovered Vercel text, served assets, comparison manifests
and the dependency audit. The archive is outside this repository and is not
committed. Manifests include SHA-256 hashes and exact baseline/deployment IDs.

This backs up code and public assets. It does not back up database contents,
production environment secrets, provider configuration or private uploads.
No database was exported, altered or migrated. Do not treat source recovery as a
database restore plan or as approval to merge into `main`.
