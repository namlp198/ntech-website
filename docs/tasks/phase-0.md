# NTECH AI Website — Phase 0 Issues

## Scope

Bootstrap the `ntech-website/` website application described by
`ntech-website/docs/NTECH-AI-Website-Implementation-Plan.md`, without deploying it or publishing
unverified business data.

## Issues

### WEB-001 — Repository and toolchain foundation

- [x] Create an isolated Next.js App Router + TypeScript application in `ntech-website/`.
- [x] Pin runtime and package-manager versions and include the lockfile.
- [x] Add ESLint, strict TypeScript, Vitest, and production build scripts.
- [x] Extend CI without changing the existing NVision verification job.

### WEB-002 — Modular-monolith boundaries

- [x] Create `modules/{catalog,content,orders,quotes,auth,analytics,notifications}`.
- [x] Create `components/{ui,shop,admin}`, shared `lib`, `worker`, and test folders.
- [x] Add architecture documentation and import-boundary checks.

### WEB-003 — PostgreSQL and Prisma foundation

- [x] Define the Phase 0 schema for auth/RBAC and the planned core entities.
- [x] Add the initial repeatable SQL migration and database indexes.
- [x] Configure a single reusable Prisma client through the PostgreSQL adapter.
- [x] Add a PostgreSQL development service and health check.

### WEB-004 — Admin authentication and RBAC foundation

- [x] Configure Better Auth credentials sessions with secure cookie defaults.
- [x] Include TOTP enrollment/challenge and enforce enrollment for Owner/Admin.
- [x] Implement server-side session and permission checks.
- [x] Protect the admin shell and provide a sign-in flow.
- [x] Test RBAC matrix, MFA policy, and module boundaries.

### WEB-005 — Safe initial Owner seed

- [x] Require Owner email, name, and password from environment at invocation time.
- [x] Reject placeholder/weak credentials and production execution without explicit acknowledgement.
- [x] Make the seed idempotent without logging the password.
- [x] Do not add a default account or credential to source control.

### WEB-006 — Design-system foundation

- [x] Define semantic color, spacing, radius, shadow, and typography tokens.
- [x] Add accessible Button, Form, ProductCard, DataTable, StatusBadge, Modal, and EmptyState primitives.
- [x] Add a clearly labelled demo-only landing/admin experience.

### WEB-007 — Local development and operations documentation

- [x] Add `.env.example` with placeholders only.
- [x] Add Docker development services for app and PostgreSQL.
- [x] Document install, database migration, seed, test, build, and local run commands.
- [x] Record real external dependencies and deliberately disabled integrations.

### WEB-008 — Verification and handoff

- [x] Run lint, typecheck, unit tests, migration validation, and production build.
- [x] Attempt the repository check and record the pre-existing toolchain blocker.
- [x] Update project context and latest handoff with results and remaining dependencies.

## Verification notes

- `prisma validate`: passed.
- Better Auth 1.7.6 CLI schema generation: passed and used to align auth/TOTP fields.
- ESLint: passed with zero warnings.
- TypeScript: passed with strict checking and no emit.
- Vitest: 3 files, 7 tests passed.
- Next.js production build: passed; 9 routes generated.
- Docker Compose config: passed. Container startup was blocked because the local Docker
  Desktop Linux daemon is stopped, so migration replay on the disposable container remains
  an environment follow-up rather than a code failure.
- Root `scripts/check.ps1`: restore passed outside the sandbox, then CMake failed because
  the configured Visual Studio 2022 Community instance is absent.

## Out of scope

- Production deployment, DNS/domain changes, provider credentials, real catalog prices,
  unverified company details, payment/Zalo/email integrations, and public launch.
