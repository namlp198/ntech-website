# NTECH AI Website

Phase 0 foundation for the NTECH AI company, technical catalog, content, commerce, and
admin website. It is not deployed and contains only clearly labelled demo UI content.

Documentation lives in `docs/`:

- [Implementation plan](docs/NTECH-AI-Website-Implementation-Plan.md)
- [Architecture notes](docs/architecture/README.md)
- [Local runbook](docs/runbook/local-development.md)
- [Decisions](docs/decisions/) — ADR-0008 (foundation choices), ADR-0009 (standalone repository)
- [Active task](docs/tasks/active.md) and [Phase 0 issues](docs/tasks/phase-0.md)
- [Latest handoff](docs/handoff/latest.md)

Common commands:

```powershell
pnpm install --frozen-lockfile
pnpm db:generate
pnpm db:validate
pnpm check
```

