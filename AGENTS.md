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
