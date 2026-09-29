# Cleaning Ninja 2026 — repository instructions

Work only on `rebuild-2026`. Current scope: owner-requested homepage correction, one section at a time, starting with header/hero; see docs/execution/current-phase.md. Preserve completed Supabase work, approved source assets and lead architecture. Latest owner feedback supersedes the previous visual composition lock. Do not redesign internal pages, regenerate imagery, deploy, push, merge to main, or change DNS/email/environment configuration.

## Baseline and authority

- `main` is live production at `72bb70e6e37d224396fc57dc0a2bf92f125838e9` (owner-provided baseline).
- Approved content branch: `phase-1-content-preview`, commit `7124dda396a39e87d7483ba9a03a093c5dce5251`; main + 2, zero behind (owner-provided; do not rediscover).
- `rebuild-2026` intentionally starts from that content branch. Preserve its simplification; differences from live are not defects.
- Owner instructions and this 2026 knowledge system take precedence over conflicting `BRAND_BLUEPRINT.md`, `.agent/rules/*`, old deployment guides and historical plans. Keep those files as history; never execute their deployment/DNS recipes automatically.
- Start with `docs/product/owner-decisions.md`, `docs/execution/current-phase.md`, `docs/product/content-rules.md`, and `docs/execution/foundation-report.md`.

## Product rules

Established operating business; flagship rebuild. IMMACULATE TRANSITION: visual noise → precision → calm. Premium, cinematic, clean, warm, calm, precise, memorable, conversion-focused. Preserve/refine olive identity. Mobile is independently composed. Homepage is the first major approval gate. No Higgsfield generation before storyboard/layout approval and fresh authorization.

## Evidence and safety

Only VERIFIED facts and explicitly scoped OWNER-APPROVED decisions may inform public copy or AI answers; see docs/product/owner-decisions.md. Repository strings are not business verification. Never invent services, locations, credentials, prices, reviews, guarantees or availability. Read `docs/product/claims-register.md`. Do not silently restore removed claims. Never print secret values; document environment variable names only. Use synthetic data and local endpoints for checks; never send real leads or messages as tests.

## Engineering

Next.js App Router, TypeScript, npm lockfile. Runtime version is not pinned. Run typecheck, lint, content check, production build, unit tests and focused Playwright checks. Use isolated local port 8136, never reuse an unknown server. Current readiness implementation and caveats live in `docs/engineering/technical-readiness.md`; historical browser baseline is in `docs/engineering/baseline-checks.md`. Do not mistake simulated form success for delivery.

For library/framework/SDK/API/CLI/cloud documentation, use Context7: first resolve-library-id (unless exact ID supplied), then query-docs scoped to one concept. Prefer exact/version matches and authoritative sources. Do not use it for general code review or business-logic analysis.

Work in bounded homepage checkpoints. Internal-page work or release still requires a new instruction.
