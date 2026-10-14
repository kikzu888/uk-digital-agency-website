# Decisions

## 2026-10-14 - Service art and action colours

Context: green service imagery conflicted with VenusCore's palette. A grayscale
filter removed the conflict but also removed the colour the owner wanted.

Decision: replace service artwork with seven original lavender, periwinkle and
peach illustrations; retain full colour. Use shared `.venus-button` tokens with
a light lavender surface and dark plum text, including hover/focus/disabled states.

Reason: a coherent original palette addresses the mismatch without desaturating
the site. A shared style makes future button changes consistent and reviewable.

Consequences: originals remain available; optimised WebP assets live in
`frontend/public/images/venus-*-v2.webp`. Generation prompts and palette are in
`docs/visual-refresh-assets.json`. Artwork is decorative illustration, not client
evidence. Project photographs and founder attribution remain distinct.

## 2026-10-14 - Contained celestial motion

Decision: render a proportionate CSS star field, planet and orbital motion in
`frontend/components/CosmicScene.tsx`, with pause/resume and reduced-motion support.

Reason: the owner requested space/star animation. Keeping it beside the hero
copy preserves reading contrast and avoids a heavy WebGL or animation dependency.

Consequences: the component owns only its pause state. Deterministic star positions
avoid hydration drift. Browser checks cover motion controls and reduced motion.

## 2026-10-14 - Change history and release traceability

Decision: retain the existing changelog, decision log, task list and notebook,
with a short README guide and one record per release under `docs/releases/`.

Reason: the owner needs to see when, what and why changes happened. One giant
activity log or comments on every line would make the code harder to understand.

Consequences: small descriptive commits capture implementation; changelog entries
capture visible outcomes; decisions capture rationale; release records connect
verified source to a deployment. Pending and completed publication are explicit.
Every remote write must first verify the `kikzu888` repository/team and project.

## 2026-07-22 - Architecture

Decision: Use a separated monorepo with `frontend/` and `backend/`.

Reason: The project needs SEO-focused frontend rendering and a Python API backend. A separated monorepo keeps deployment independent while allowing shared documentation, CI, and Docker orchestration.

## 2026-07-22 - Frontend Stack

Decision: Use Next.js with React, TypeScript, and Tailwind CSS.

Reason: Next.js is well suited for SEO, static generation, server rendering, dynamic metadata, image optimisation, and high Core Web Vitals performance.

## 2026-07-22 - Backend Stack

Decision: Use FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL, and Uvicorn/Gunicorn.

Reason: This matches the requirement, supports typed API contracts, OpenAPI documentation, clean validation, migrations, and production ASGI deployment.

## 2026-07-22 - Email Provider Abstraction

Decision: Implement an email service interface first, with provider adapters later.

Reason: Contact notifications should not depend directly on one vendor. Recommended initial providers to evaluate are Resend, Postmark, and Amazon SES.

## 2026-07-22 - Hosting Direction

Decision: Prefer Vercel for frontend. For backend, shortlist Render, Railway, DigitalOcean, and AWS/GCP/Azure depending on budget and scaling needs.

Reason: Frontend and backend have different operational requirements. Keeping them separate gives better SEO/frontend performance and simpler backend scaling.

## 2026-07-22 - Admin Password Hashing

Decision: Use a standard-library PBKDF2-SHA256 password hash format for the initial admin authentication layer.

Reason: The local environment exposed a `passlib` and `bcrypt` compatibility failure with current bcrypt behaviour. PBKDF2 via Python's standard library avoids that dependency risk while still storing only salted password hashes.

## 2026-07-23 - Admin Session Handling

Decision: Use backend-set HTTP-only cookies for the admin browser session while keeping bearer tokens available for API clients.

Reason: The admin frontend should not persist access tokens in browser storage. HTTP-only cookies reduce token exposure from client-side script access and give a cleaner path to production session hardening.
