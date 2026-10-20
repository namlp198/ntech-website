# NTECH AI Website

Phase 0 foundation for the NTECH AI company, technical catalog, content, commerce, and
admin website. This subtree is not deployed and contains only clearly labelled demo UI
content.

Everything related to the website lives in this folder. Its documentation is in `docs/`:

- [Implementation plan](docs/NTECH-AI-Website-Implementation-Plan.md)
- [Architecture notes](docs/architecture/README.md)
- [Local runbook](docs/runbook/local-development.md)
- [Decisions](docs/decisions/) — ADR-0008 records why the website is an isolated subtree
- [Active task](docs/tasks/active.md) and [Phase 0 issues](docs/tasks/phase-0.md)
- [Latest handoff](docs/handoff/latest.md)

The repository-root `docs/`, `tasks/`, `handoff/` and `decisions/` belong to NVision. The
only website file outside this folder is the `website` job in `.github/workflows/ci.yml`,
because GitHub Actions reads workflows only from the repository root.

Common commands:

```powershell
pnpm install --frozen-lockfile
pnpm db:generate
pnpm db:validate
pnpm check
```

