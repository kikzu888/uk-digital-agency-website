# AGENTS.md

## Working Rules

- Do not delete existing files without explicit approval.
- Do not commit secrets, `.env`, API keys, database dumps, build artefacts, virtual environments, or `node_modules`.
- Keep frontend and backend separated.
- Use UK English for all public-facing website copy.
- Use placeholder business details until real company details are supplied:
  - Company Name
  - Company Logo
  - UK Phone Number
  - Business Email
  - UK Business Address
  - Company Registration Number
- Mark demo portfolio data and testimonials clearly as placeholders.
- Do not present legal policy templates as legal advice.
- Run tests before claiming they pass.

## Implementation Preferences

- Backend code belongs under `backend/app/` using API, core, models, schemas, services, repositories, db, and utils layers.
- Frontend code belongs under `frontend/` using reusable components, centralised API access, schema validation, and strict TypeScript.
- Use environment variables for secrets and provider credentials.
- Keep dependencies purposeful and limited.

## Saved continuation — 7 October 2026

The user asked to save the current state and continue the content work in a
future session. The next requested phase is to populate this agency website
using the user's portfolio as the source for their real work, skills and services.

- Agency website: https://frontend-eta-lovat-45.vercel.app/
- User's correct portfolio: https://valeri-portfolio-sigma.vercel.app/
- Agency repository: https://github.com/kikzu888/uk-digital-agency-website
- Saved recovery branch: `sync/vercel-source`.

The portfolio and the agency site are separate projects. The portfolio is the
content reference for the future agency work. Read the actual portfolio content
when that phase begins; do not invent projects, clients, qualifications or results.
Keep unspecified business details as placeholders under the existing rules above.

The current live agency site has not been redeployed during recovery. Review
`docs/vercel-recovery.md` and `docs/safe-development.md` before continuing, including
the outstanding dependency audit and the isolated preview requirements. Develop
the next phase on a `work/*` branch; publishing is a separate release step after
the content and technical checks are complete.
