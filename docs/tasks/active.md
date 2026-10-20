# Active Task

## Current Task

NTECH AI website Phase 0 foundation on `codex/ntech-ai-phase-0`.

## Goal

Bootstrap the website described by `ntech-website/docs/NTECH-AI-Website-Implementation-Plan.md` as an
isolated Next.js modular monolith with PostgreSQL/Prisma, admin authentication, RBAC,
design tokens, development infrastructure, CI, safe Owner seeding, and local documentation.

## Outcome

- Phase 0 implementation is complete in `ntech-website/`.
- ADR-0008 records the intentional website subtree and pinned foundation choices.
- The implementation checklist and its verification notes are in
  `ntech-website/docs/tasks/phase-0.md`.
- Website gate is green: Prisma validation, ESLint, strict TypeScript, 7 unit tests, and
  Next.js production build.
- Docker Compose configuration renders successfully. Live migration replay was not run
  because Docker Desktop's Linux daemon is stopped on this workstation.
- The repository-wide NVision gate was attempted. Restore succeeds outside the sandbox,
  but native configure stops because its configured Visual Studio 2022 Community instance
  is not installed at the expected path. This is unrelated to the website changes.

## Next Actions

1. Start Docker Desktop and run the initial migration twice against the disposable dev DB.
2. Review Phase 0 and merge the feature branch when approved.
3. Obtain approved brand/company/catalog inputs before Phase 1 public content work.
4. Continue the NVision M4 track independently from this website subtree.
