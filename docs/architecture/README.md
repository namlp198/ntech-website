# Website architecture

The website is a capability-oriented modular monolith. Next.js App Router is the
composition and delivery edge; business rules live in `modules/`; infrastructure adapters
live in `lib/`; durable data contracts live in Prisma; background delivery starts at the
transactional outbox boundary in `worker/`.

```text
app/                    routes, server-rendered pages, API handlers
components/             reusable UI, shop, and admin presentation
modules/                catalog, content, orders, quotes, auth, analytics, notifications
lib/                    database, security, storage, validation infrastructure
prisma/                 schema, reviewed migrations, explicit Owner seed command
worker/                  outbox processing composition root
tests/                   unit, integration, and future end-to-end suites
infra/                   Docker development and future deployment assets
```

Rules:

1. `app/` may compose modules and components; it does not own business rules.
2. `modules/` may depend on `lib/` but never on `app/` or `components/`.
3. Every admin mutation and data query must call a server-side authorization guard. A
   hidden UI control is not authorization.
4. PostgreSQL stores timestamps in UTC. Presentation uses `Asia/Ho_Chi_Minh` only at the
   formatting boundary.
5. VND amounts are integers (`BigInt` in Prisma), never floating point.
6. Integrations are adapters and remain disabled until approved credentials exist.
7. Demo content must carry an explicit `Dữ liệu demo` label and must not be presented as
   real company, product, price, inventory, certification, or partner data.

`docs/decisions/` records the dependency decisions (ADR-0008) and the move to a standalone
repository (ADR-0009).

