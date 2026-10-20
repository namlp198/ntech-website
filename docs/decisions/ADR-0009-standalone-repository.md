# ADR-0009 — Move the NTECH AI website into its own repository

- **Status:** Accepted
- **Date:** 2026-10-20
- **Supersedes:** the placement decision of ADR-0008
- **Related:** ADR-0008, `docs/NTECH-AI-Website-Implementation-Plan.md`

## Context

ADR-0008 placed the website as an isolated subtree inside the NTech/NVision repository.
In practice the two share no code, toolchain, build graph, runtime platform, deployment
target or release cadence. The repository-level AI workflow files (handoff, active task,
context) are single-project, and the website Phase 0 work overwrote the NVision handoff.
Every pull request also ran both CI jobs regardless of what changed.

## Decision

The website is its own repository, `ntech-website`, rooted at the Next.js application.
History was preserved with `git subtree split` from the NTech repository.

- The repository owns its CI (`.github/workflows/ci.yml`), agent instructions, and all
  documentation under `docs/` (plan, architecture, runbook, decisions, tasks, handoff).
- Nothing in the build or tests refers to a parent directory.
- The remaining parts of ADR-0008 stand: Prisma 7, Better Auth with application-owned RBAC,
  and PostgreSQL 18 for local development.

## Consequences

- The standalone layout now matches the implementation plan's original assumption.
- Website and NVision evolve, review and deploy independently.
- A future shared contract with NVision (for example a license entitlement format) is
  exchanged as a versioned contract between repositories, not as shared source.
