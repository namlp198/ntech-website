# ADR-0008 — Isolate the NTECH AI website in an application subtree

- **Status:** Accepted
- **Date:** 2026-09-26
- **Related:** ADR-0001, ADR-0002, ADR-0003, `ntech-website/docs/NTECH-AI-Website-Implementation-Plan.md`

## Context

The website plan describes its target layout as a new repository rooted at `ntech-ai/`.
The implementation request, however, was made in the established NTech/NVision repository,
which already contains a native and managed machine-vision platform, build scripts, and a
Windows CI job. Replacing that repository root with the website scaffold would mix two
independent build graphs and invalidate existing paths.

The plan also leaves the exact supported dependency releases and authentication library
to implementation-time verification.

## Decision

Create the website as an isolated `ntech-website/` application subtree in the existing
capability-oriented monorepo.

- The subtree owns its `package.json`, lockfile, TypeScript/ESLint/Vitest configuration,
  Prisma schema and migrations, Docker development files, and local runbook.
- Its internal structure follows Section 6 of the website plan: App Router composition at
  the edge, business capabilities in `modules`, infrastructure in `lib`, and an independent
  outbox worker boundary.
- Existing NVision CI remains intact. A separate Linux CI job verifies the website.
- Phase 0 uses stable Prisma 7 instead of the Prisma 8 release candidate available on the
  implementation date.
- Better Auth is the authentication framework because it supplies credentials sessions,
  secure cookie handling, a Prisma adapter, and TOTP support. Application RBAC remains an
  explicit domain model and is checked in server-side data-access functions.
- Development uses PostgreSQL 18 in Docker. This is a local-development pin, not a
  production hosting decision.

## Consequences

- The website can be developed and reviewed without refactoring or weakening NVision's
  existing architecture and verification baseline.
- Commands for the website run from `ntech-website/`; repository-wide CI contains separate
  jobs with separate dependency caches.
- Cross-project code sharing is intentionally absent in Phase 0. A future shared package
  requires its own ADR and demonstrated consumer need.
- Production hosting, managed PostgreSQL, object storage, mail, Zalo, payment, company
  identity, pricing, and domain ownership remain undecided external dependencies.

## Alternatives considered

- **Turn the repository root into the Next.js project.** Rejected because it would collide
  with the active NVision monorepo and its build system.
- **Place the website directly in the existing `apps/` tree.** Rejected for Phase 0 because
  the current root build treats `apps/` as NVision product composition; an isolated
  subtree makes ownership and commands unambiguous.
- **Create or deploy a separate remote repository.** Rejected because the request did not
  authorize remote repository creation or production infrastructure changes.

## Amendment — 2026-10-20

The subtree was renamed from `ntech-ai/` to `ntech-website/`, and all website documentation
(plan, ADRs, tasks, handoff) moved into `ntech-website/docs/` so that nothing about the
website lives in the NVision `docs/`, `tasks/`, `handoff/` or `decisions/` folders. The CI
`website` job stays in `.github/workflows/ci.yml` because GitHub only reads workflows there.
