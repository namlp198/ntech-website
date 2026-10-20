# Local development runbook

## Required tools

- Node.js 22.18+ (Node.js 24 LTS is recommended)
- pnpm 11.25.0 through Corepack or an equivalent pinned installation
- Docker Desktop with Docker Compose for the local PostgreSQL service

No email, Zalo, object-storage, payment, production hosting, domain, or real company data
is required for Phase 0.

## First run

From `ntech-website/`:

```powershell
Copy-Item .env.example .env
```

Replace every `CHANGE_ME` value. Generate `BETTER_AUTH_SECRET` with at least 32 random
bytes; do not copy the example text into a deployed environment.

```powershell
pnpm install --frozen-lockfile
docker compose --env-file .env -f infra/compose.dev.yml up -d postgres
pnpm db:generate
pnpm db:deploy
pnpm dev
```

Open `http://localhost:3000`. The development landing page is explicitly labelled as
demo data. The health endpoint is `GET /api/health`.

## Create or repair the initial Owner

There is no default admin account. Set these only in the current shell and run the seed
explicitly:

```powershell
$env:SEED_OWNER_EMAIL = "<real-owner-email>"
$env:SEED_OWNER_NAME = "<real-owner-name>"
$env:SEED_OWNER_PASSWORD = "<unique-secret-at-least-14-characters>"
pnpm db:seed-owner
Remove-Item Env:SEED_OWNER_EMAIL,Env:SEED_OWNER_NAME,Env:SEED_OWNER_PASSWORD
```

The command rejects common placeholders and weak passwords, does not print the password,
and is idempotent for the Owner role. In production it additionally requires the operator
to set `ALLOW_PRODUCTION_OWNER_SEED=true` for that invocation. Phase 0 does not execute a
production seed.

After first sign-in, Owner/Admin accounts are redirected to TOTP enrollment before the
admin shell is available. Save the generated recovery codes securely; they are not logged.

## Quality gate

```powershell
pnpm db:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Or run `pnpm check` after `pnpm db:generate`. CI executes the same application checks with
non-secret build-only environment values and does not contact a production database.

## Stop local services

```powershell
docker compose --env-file .env -f infra/compose.dev.yml down
```

Add `--volumes` only when intentionally discarding the local development database.

## Real dependencies still missing

- Approved legal company identity, logo/brand colors, contact details, policies, and domain ownership
- Reviewed product/SKU/media/datasheet/price/tax/warranty/stock data
- Production hosting, PostgreSQL, private object storage/CDN, TLS, backup and restore targets
- Verified email domain/provider configuration (SPF, DKIM, DMARC)
- Approved Zalo OA/app permissions, templates, webhook rules, and credentials
- Payment merchant/sandbox credentials if online payment is later selected
- Legal/accounting approval and launch sign-off
