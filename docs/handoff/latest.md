# Latest Handoff

## Date

2026-10-20 (relocation); Phase 0 work 2026-09-26

## Branch

`codex/ntech-ai-phase-0`, created from `develop`. No production deployment, remote push,
domain change, or provider configuration was performed.

## Completed

### 2026-10-20 — relocation into `ntech-website/`

- Renamed `ntech-ai/` to `ntech-website/`; the CI `website` job now runs there.
- Moved the plan, ADR-0008, the Phase 0 issue list, and the website task/handoff notes into
  `ntech-website/docs/`. The root NVision `handoff/latest.md`, `tasks/active.md`,
  `docs/00_CONTEXT.md` and `decisions/0000_INDEX.md` were restored to their NVision content.

### 2026-09-26 — Phase 0

Implemented Phase 0 from `ntech-website/docs/NTECH-AI-Website-Implementation-Plan.md` in the isolated
`ntech-website/` subtree. ADR-0008 records this placement because the current repository already
hosts the active NVision platform.

- Next.js 16 App Router, React 19, strict TypeScript, Tailwind 4, ESLint and Vitest with
  exact package versions and a committed pnpm lockfile.
- Modular-monolith folders for catalog, content, orders, quotes, auth, analytics, and
  notifications, with an automated boundary test preventing modules from importing UI or
  App Router composition.
- Prisma 7 PostgreSQL schema for Better Auth, RBAC, catalog, content, orders, quotes/leads,
  outbox/notifications, analytics, audit, settings, and license entitlements. VND amounts
  use integer `BigInt`; the initial migration contains the required keys and indexes.
- Better Auth email/password sessions, secure-cookie production defaults, TOTP enrollment
  and challenge pages, mandatory TOTP enrollment for Owner/Admin before the protected admin
  shell, and server-side permission checks backed by `Role`/`Permission` joins.
- Explicit Owner seed requiring environment-only credentials, password/placeholder checks,
  production acknowledgement, credential-account verification, idempotent role assignment,
  no secret logging, and explicit `.env` loading before auth/database initialization.
- Semantic design tokens and Button, FormField, ProductCard, DataTable, StatusBadge, Modal,
  EmptyState, admin shell, and a development landing page. Every placeholder is marked as
  demo; no real-looking company facts, price, stock, certification, or partner data exists.
- `.env.example`, PostgreSQL 18 Docker Compose service with health check, development app
  image, health endpoint, outbox boundary stub, architecture notes, and local runbook.
- Existing Windows NVision CI job remains unchanged; a separate Linux website job installs
  from lockfile, generates/validates Prisma, lints, typechecks, tests, and builds.

## Verification

- `pnpm install --frozen-lockfile`: passed; supply-chain policy passed and dependency build
  scripts are explicitly allowlisted.
- `pnpm db:validate`: passed.
- Better Auth 1.7.6 CLI schema generation: passed; the generated auth schema was reviewed
  against the application schema before regenerating the migration.
- `pnpm lint`: passed with zero warnings.
- `pnpm typecheck`: passed.
- `pnpm test`: 3 files and 7 tests passed.
- `pnpm build`: passed; static public/login/error pages and dynamic admin/auth routes were
  generated successfully.
- `docker compose -f infra/compose.dev.yml config`: passed.
- Docker container startup could not be tested because the Docker Desktop Linux daemon is
  stopped (`dockerDesktopLinuxEngine` pipe absent). Consequently, applying the initial
  migration twice against the disposable container remains a local environment follow-up.
- Root `scripts/check.ps1 -Configuration Release` was attempted. In the sandbox it could
  not read the user NuGet config; outside the sandbox restore passed, then native CMake
  configure failed because the configured Visual Studio 2022 Community instance does not
  exist at `C:/Program Files/Microsoft Visual Studio/2022/Community`. Website checks are
  unaffected and green.

## Real dependencies still missing

- Approved legal company identity, logo/brand tokens, contact details, policies, and proof
  of domain ownership.
- Reviewed catalog/SKU/media/datasheet/price/tax/warranty/stock inputs.
- Production hosting, managed PostgreSQL, private object storage/CDN, TLS, secrets, backup,
  restore, monitoring, and RPO/RTO approval.
- Verified transactional email domain/provider configuration.
- Approved Zalo OA/app rights, templates, webhook contract, and credentials.
- Payment merchant/sandbox credentials if online payment is selected later.
- Legal/accounting review and explicit staging/production launch approval.

## Next Actions

1. Start Docker Desktop and run `pnpm db:deploy` twice against the disposable dev database.
2. Review the Phase 0 branch and migration before merge.
3. Supply approved brand/company/catalog inputs before Phase 1.
4. Repair or reconfigure the separate NVision Visual Studio generator before relying on the
   repository-wide native gate from this workstation.
