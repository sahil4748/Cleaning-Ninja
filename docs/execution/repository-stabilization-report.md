# REPOSITORY STABILIZATION REPORT

2026-09-27 · `rebuild-2026` · local Node 25.9.0, Next.js 16.2.4. No redesign, generation, H-04, deployment, main merge or DNS/email changes.

## 1. Initial change count

196 files: 48 modified, 148 untracked, zero staged. Initial HEAD `7124dda396a39e87d7483ba9a03a093c5dce5251`. Inspected status, diff/stat, empty cached diff, expanded untracked list, source/tests/reports and binary sizes/hashes. The large lockfile delta adds 357 package entries for existing lint, SQL and testing work; the only changed version among previously present packages is `@hookform/resolvers` 3.10.0 → 5.2.2. No dependency upgrades were made during stabilization.

## 2. Categorized inventory

The [complete file inventory](repository-stabilization-inventory.md) assigns all 196 paths exactly once and records each binary's bytes, SHA-256 and disposition.

| Category | Count |
|---|---:|
| A. Production-intended code | 60 |
| B. Production-intended config/content | 25 |
| C. Approved final media | 2 |
| D. Tests | 12 |
| E. Project documentation | 46 |
| F. QA/screenshot evidence | 12 |
| G. Development experiments | 6 |
| H. Superseded/generated evidence | 33 |
| I. Unknown | 0 |

Production-intended does not mean release-ready. Existing platform/business config, service/package contracts, durable lead/outbox persistence, email transport/recovery, responsive homepage, typography/header/CTAs and major-Australian-cities hero copy are preserved. Brisbane remains the primary market, not an exclusive coverage claim.

## 3. Cleanup and documentation

No unique asset was deleted. Moved 33 superseded PNG captures and two experimental MP4s to ignored `.local-evidence/stabilization-2026-09-27/`, preserving original relative paths. Historical reports remain because they record distinct decisions; their archived capture links and scope are marked explicitly. Current phase and owner decisions supersede earlier stop instructions. Older readiness/operations documents now point to implemented lead operations. Stale release-blocker wording now distinguishes completed architecture from pending activation; the production guard remains closed.

H-02 tests no longer overwrite historical screenshots: new captures go into `test-results/`. Existing ignored dependencies, build outputs, browser reports and macOS metadata were not committed.

## 4. Large-media decisions

Decimal MB; exact per-file bytes/hashes are in the inventory. No byte-identical duplicate binary groups were found.

| Asset/group | Bytes | Decision |
|---|---:|---|
| Approved H-01 PNG, 5504×3072 | 22,743,529 | Keep original unchanged |
| Approved H-02 PNG, 3072×5504 | 21,108,020 | Keep original unchanged |
| H-03 raw MP4 | 4,744,955 | Local archive; excluded from Git/public |
| H-03 retimed MP4 | 5,505,164 | Local archive; excluded from Git/public |
| H-03 comparison sheet | 2,704,720 | Keep compact visual evaluation evidence |
| Two final H-01 captures | 2,448,386 | Keep approved static baseline evidence |
| 33 superseded PNG captures | 40,440,386 | Local archive; exclude from Git |
| All initial binaries | 102,791,753 | Reviewed |
| Retained checkpoint binaries | 52,101,248 | Includes approved originals and selected QA |

50,690,505 bytes avoided in Git history. After cleanup, all 54 initial binary SHA-256 hashes still matched, including archived files. The five small JPGs remain referenced by lower homepage/service/package compositions; they are not redundant copies of the hero sources. H-02 responsive, focus, header, sticky and static Cut evidence remains. No Git LFS, recompression, generation or infrastructure introduced.

## 5. H-03 disposition

Neither variant is production-approved. Both MP4s are outside `public`. Removed motion effect, shared preview URLs and motion CSS from the app. Raw/retimed query parameters have no implementation in development or production. H-01/H-02 stills and the development-only static Cut preview remain.

[Experiment evidence](../../experiments/h03/README.md) includes inactive `.txt` snapshots of the comparison component, CSS, tests and config; the historical evaluation, contact sheet and frame map remain tracked. The offline retime script reads/writes only in the ignored local archive and was not run. Core Playwright no longer discovers the inactive motion experiment suite; two active regressions check static behavior and missing public MP4 endpoints.

## 6. Build issue findings

The H-03 report's previous Turbopack error, `next/font/google queries have exactly one entry` for Plus Jakarta Sans, remains recorded as a historical failure. It did not reproduce in this checkpoint:

1. Normal `npm run build`, unchanged font/config/dependencies: PASS.
2. After cleanup, moved the generated `.next` directory aside and ran normal `npm run build` with a fresh Next cache: PASS, all 99 pages generated.

Most consistent with **B: transient/local tooling state**, but exact historical cause is unproven. Current source/config is not shown to be defective. No font replacement, bundler switch, dependency upgrade or speculative fix was necessary. Webpack was not run because default builds passed. The historical webpack pass is not represented as a current run.

The first sandboxed invocation stopped before Next at a tsx IPC `listen EPERM`; executing the same normal command outside that restriction passed. This is separate from the historical font resolver error. Google font resolution still depends on build-environment access; runtime is not pinned. Context7 consulted [official Turbopack documentation](https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/08-turbopack.mdx) for default bundler/fallback behavior. Its canary documentation is guidance, not proof of a fix in installed 16.2.4.

## 7. Verification results

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, 0 errors / 70 existing warnings (at configured ceiling) |
| `npm run test:unit` | PASS, 20 tests, no skips |
| `npm run check:content` | PASS in warn-only mode; 5 medium findings, 0 high/critical |
| `npm run build` | PASS with existing cache and fresh cache; 99 generated pages |
| Webpack fallback | Not needed; not run |
| `npm run test:e2e -- --workers=2` | PASS, 42 Chromium tests, no skips |
| `git diff --check` | PASS |

The first browser attempt failed before tests with EADDRINUSE on 8136. Identified the listener as a Next.js server from this exact repository, stopped it, and reran with Playwright-owned port 8136, reuse disabled and all lead/email credentials blank. No unknown server was reused. Synthetic local SQL and browser fixtures do not establish real database provisioning or email delivery. Content findings are CSS `color`, two disabled “Coming soon” labels and two schema `organization` IDs; scanner success is not comprehensive content approval. Browser coverage includes all 93 content route responses, noindex/schema checks, forms, H-01/H-02 responsive composition and H-03 exclusion. The server log also emitted one `TimeoutError` during the passing browser run; its ignored stack did not identify the failing request. No browser assertion failed, but this is not an error-free server-log baseline and should be investigated if reproducible. No physical-device or Safari certification.

## 8–10. Commits, push and final status

| Commit | Scope |
|---|---|
| `1a8c518` | Platform/readiness and durable lead operations, 98 files |
| `8714c4d` | Responsive homepage and approved H-01/H-02 heroes/evidence, 42 files |
| `9141671` | Lead safety and responsive static hero tests, 12 files |
| `a055fe5` | H-03 separation, redundant evidence archive and authority/inventory, 14 files |
| Report commit | `docs: record repository stabilization verification and checkpoint` (this file) |

`git push origin rebuild-2026` succeeded, creating the remote branch through `a055fe5`. No existing remote rebuild branch was present at the pre-push check. No force push, squash, main rewrite or merge occurred. At that point the only uncommitted file was this report; it is delivered as the fifth additive commit followed by another normal push. Its self-referential hash is intentionally omitted here; the session closeout records its identity and final remote/status verification. Branch checks throughout returned `rebuild-2026`.

The first four commits include all implementation, tests, inventory and cleanup. Historical screenshot hard-break whitespace was normalized before commit; aggregate `git diff 7124dda --check` passes. No MP4 is tracked. Port 8136 was free after the task-owned test server exited.

## 11. Intentional local-only files

The inventory enumerates **every one of the 35 archive files** at its final local path and explains why it is excluded. These are ignored leftovers, not remote backups. No source work should remain uncommitted. Routine ignored `node_modules/`, `.next/`, `next-env.d.ts`, `test-results/`, `playwright-report/` and three `.DS_Store` files remain generated local state. The former build cache was moved to `/tmp/cn-stabilization-next-before-clean-build` for the fresh-cache investigation; logs are `/tmp/cn-*.log`, outside the repository and not permanent artifacts.

## 12. Remaining blockers

No reproducible current build failure. Existing launch blockers remain: provisioned database/migration/backups/access; verified authenticated email sender/transport; recovery scheduler, monitoring and operational ownership; authorised delivery/concurrency checks; retention/privacy/legal approval; unresolved internal-page claims/pricing/proof and exact city/suburb eligibility; canonical ownership/equity review; runtime pinning; full homepage/release approval. Earlier lead operations reported dependency audit findings; this checkpoint does not claim a fresh security audit or remediation. Large approved source PNGs remain intentionally preserved; optimized image delivery is not a measured production performance guarantee.

Homepage metadata and some lower-section copy retain the earlier Brisbane focus; the approved hero explicitly states major Australian cities. No broader content redesign was undertaken. Future content review should reconcile the wider coverage wording across metadata and enquiry geography without inferring specific location eligibility.

## 13. Recommended next action

Review this checkpoint and select a separately authorised next sprint. Preserve the static H-01/H-02 base. No H-03 regeneration, H-04, service/booking/AI development, deployment or merge was started. Stop.
