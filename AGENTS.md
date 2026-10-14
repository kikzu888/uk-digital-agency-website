# AGENTS.md

## Working Rules

- Release target verification (14 October 2026): before every push, confirm
  `origin` is `https://github.com/kikzu888/uk-digital-agency-website.git`.
  Before every Vercel deployment or promotion, explicitly select `kikzu888`
  and verify project `frontend` / `prj_IOgteASI5Y4kp9JrZwCypoSeVFAQ`, team
  `team_ffdEeBpL06ZktKqVGrds1NdO`. A local link or default account alone is
  insufficient. Stop if authenticated ownership differs; never fall back to
  the personal portfolio or another account. Use `kikzu888@gmail.com` for
  agency Vercel authentication.
- Keep meaningful changes in CHANGELOG.md, their rationale in DECISIONS.md,
  remaining actions in TASKS.md, and verification/release evidence in
  PROJECT_NOTEBOOK.md or a linked release record. Never mark a pending release
  as deployed. Keep commit messages scoped and descriptive.

- Current phase (8 October 2026): agency work resumed. Brand: VenusCore.
  Audience: UK SMEs across sectors. Consultation, project enquiries and audit
  requests have equal business priority. See TASKS.md for the current audit.
- Use only the user's `valerigvinia@gmail.com` profile for project account work.
  Do not use the excluded BI account/profile or send it updates. This preference
  is not permission to send email or other external messages.
- Subsequent explicit authorisation: agency hosting/deployment is performed in
  `kikzu888@gmail.com` / Vercel scope `kikzu888`; this overrides the earlier
  single-profile restriction for agency work. The excluded BI profile remains
  excluded. Do not switch agency deployment to the personal portfolio project.
- Approved content decisions (8 October 2026): use the portfolio's WhatsApp and
  social contacts temporarily. Display only `London` as a provisional location;
  do not imply a verified office or registered address. Updating and confirming
  contact/location details is a mandatory pre-launch task.
- Include WhatsApp Marketing, Email Marketing and AI workflow automation alongside
  paid media, websites/SEO and CRM. Consultation and audit are free. Do not display
  service prices or pricing tables. Use all ten real portfolio projects, clearly
  attributed to the founder's experience where appropriate.

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

Update — 8 October 2026: The user paused agency work to return to the personal
portfolio. Read `../WORK-STATUS.md` for completed recovery work, remaining agency
tasks and the active portfolio checkout (`../production-portfolio/`). Agency
content implementation has not started. Resume agency work only when requested.

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
