# AGENTS.md

You are working in the NTECH AI website repository (Next.js, TypeScript, Prisma, PostgreSQL).

## Read first

1. `README.md`
2. `docs/tasks/active.md`
3. `docs/handoff/latest.md`
4. `docs/decisions/`
5. `docs/architecture/README.md`

## Rules

- Keep business logic in `modules/`; App Router files only compose.
- Do not change architecture without adding an ADR in `docs/decisions/`.
- Make small, reviewable changes; do not mix unrelated changes.
- Never commit secrets; `.env` stays local, `.env.example` holds placeholders only.
- Never present demo content as real company, product, price or partner data.
- Run `pnpm check` before the final summary, or explain why it could not run.
- Update `docs/handoff/latest.md` before ending a session.
