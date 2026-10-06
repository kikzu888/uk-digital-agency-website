# Safe development and release boundary

This repository contains the VenusCore agency project. It is separate from the
Valeri portfolio. The recovery branch is `sync/vercel-source`; create subsequent
local work branches with `git switch -c work/<short-name>` from that branch.

## Local isolation

Use Node.js 24 and Python 3.12 or newer. From the repository root:

```powershell
git config core.hooksPath .githooks
git config push.default simple
python -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -e './backend[dev]'
cd frontend
npm ci
cd ..
```

Open two PowerShell terminals at the repository root:

```powershell
powershell -NoProfile -File scripts/local-backend.ps1
```

```powershell
powershell -NoProfile -File scripts/local-frontend.ps1
```

Open <http://localhost:3210>. The API runs at <http://127.0.0.1:8010>.
Both servers bind to the local machine. The backend has no database URL, uses
temporary in-memory data, generates a temporary signing secret, and prints email
notifications to the console. Data disappears on restart. Admin credentials are
cleared; the unit tests set their own temporary credentials.

The launchers refuse existing application `.env` files, so a production config
cannot silently be loaded. They change environment variables only inside the
child PowerShell process. Do not dot-source them into another session. Keep
production credentials in Vercel; do not pull production environment files into
this checkout. The root `.env.example` is a Docker-oriented example, not the
configuration for these isolated launchers.

## Checks

```powershell
powershell -NoProfile -File scripts/local-backend.ps1 -Test
cd backend
.venv/Scripts/python.exe -m ruff check .
.venv/Scripts/python.exe -m black --check .
.venv/Scripts/python.exe -m mypy app
cd ../frontend
npm run lint
npm run typecheck
npm test
npm run build
```

The original Playwright configuration uses port 3100 and reuses an existing
server. Check that it belongs to this project before using `npm run e2e`, or use
an ignored local configuration with an unused port and `reuseExistingServer:
false`. Never point mutating tests at the live API.

## Git and Vercel safeguards

- The enabled local pre-push hook rejects pushes to `main`, `master` and
  `production`. Other clones must enable it with the command above. It is a local
  guard, not server-side branch protection, and does not prevent a GitHub merge.
- Root, frontend and backend Vercel configurations disable automatic Git
  deployments for `sync/*` and `work/*`. This covers the currently empty Vercel
  Root Directory and the future app-specific roots. Keep those rules while
  developing. They do not block manual CLI deployments or protect other branches.
- Push only the intended work branch, using an explicit refspec. Review a pull
  request before merging. Do not run `vercel`, `vercel --prod`, a promotion, or a
  database migration as part of ordinary local development.

Vercel documents these branch rules under
[git.deploymentEnabled](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled).

## Before the first release from GitHub

The recovered frontend lockfile currently reports 14 advisories (3 moderate,
10 high, 1 critical) in `npm audit`, including Next.js. Keep this source recovery
separate from dependency remediation: update supported packages on a `work/*`
branch, rerun all checks, and resolve the audit before any preview or production
release. Do not use `npm audit fix --force` without reviewing its version changes.
The audit step in CI remains enabled and is expected to block this baseline.

1. Prepare separate preview projects with Root Directory `frontend` and
   `backend`. The existing production projects were observed with both roots
   empty; changing their settings alone is not a release validation.
2. Give previews a separate test database (or explicitly accept temporary demo
   data), console/test email, separate auth secrets and localhost/preview CORS.
   Set the frontend preview API URL to the backend preview, never the live API.
3. Review database migrations and obtain a database backup plus a tested restore
   procedure before applying any migration. A Git bundle only backs up code.
4. Verify public pages, contact submission, login/logout and admin CRUD against
   the isolated preview. Resolve the existing admin CSRF limitation described in
   README before exposing new admin mutations.
5. Review the exact commit and production environment configuration, record the
   current frontend and backend deployment IDs, then explicitly approve a
   coordinated release. Keep the previous deployments available for rollback.

The recovery itself does not change project settings, domains, production
environment variables, the database, or the production aliases. See the
[recovery report](vercel-recovery.md) for evidence and remaining limits.
