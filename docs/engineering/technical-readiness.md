> Historical phase record. Current scope is in [current phase](../execution/current-phase.md); implemented durable storage/email and activation limitations are in [lead operations](../architecture/lead-operations.md). Statements below about missing persistence or unpublished branch describe the earlier checkpoint.

# Technical readiness implementation

2026-09-22. Current authority: ../product/owner-decisions.md. Foundation audit files remain historical evidence; this document and ../execution/technical-readiness-report.md describe the repaired state.

- Canonical origin: lib/site-config.ts; existing .com.au retained. .co is TARGET_PENDING_EQUITY_CHECK. No domain/redirect/DNS work.
- Route inventory: lib/route-inventory.ts represents 93 existing routes including city/suburb and journal routes. Sitemap has no 404-only entries and no fabricated lastModified. Inventory does not certify location/article eligibility for launch.
- Rebuild exclusion: root noindex/nofollow metadata, robots disallow, and X-Robots-Tag on all routes. These are crawler directives, not access control. Production-target Next configuration and prebuild guard reject known blockers; check:release deliberately exits 1 until a separately approved release clears them.
- Proof: business-truth.ts contains only public allowlisted facts. Schema builders omit ratings/reviews/people/identifiers/offers, unverified local offices, article authors and FAQ claims. Preview data remains source-labelled. JSON-LD escapes script delimiters and filters null builders. No business-truth API exists; restricted imports and unit checks protect the future boundary.
- Forms: Zod-compatible resolver 5.2.2 fixes uncaught validation failures. Explicit empty dropdown defaults prevent silent selection. Error IDs, aria-invalid and field alerts remain intact. Not-sent alerts retain values. No persistence exists and no customer request bodies are logged.
- Dates: calendarDate/parseCalendarDate round-trip local date-only strings; no UTC truncation of selected dates. Booking date/time is a preference only.
- Motion: useSyncExternalStore provides identical server/initial client media snapshots; CountUp starts deterministically. This removes the Parallax markup mismatch and preference-dependent initial style drift without suppressing hydration warnings. Native cursor is hidden only at the same desktop/pointer/motion eligibility as its replacement.
- Tooling: ESLint CLI replaces removed next lint. Existing punctuation and mount-effect findings remain warnings in explicit legacy-file overrides; 70-warning ceiling prevents a growing warning baseline. New files retain strict rules. ESLint 9.39.5 is compatible with the installed Next 16.2.4 plugin peers but npm marks it deprecated; upgrading the broader lint plugin stack is deferred. Locked npm ci passes. Only the resolver and lint tooling were deliberately changed; no framework upgrade or broad dependency cleanup.
- Browser tests start their own production server on local 8136 and refuse reuse. Tests use synthetic data only. Existing seven-step flow is regression-tested as a prototype, not the approved future one-step UX.

Current source changes contain no homepage layout, typography, spacing, service order, imagery or review UI redesign. Visible changes are identity corrections, preferred-time wording, request/error semantics and configurable follow-up wording. Reduced-motion behavior and pointer eligibility are technical repairs.

Verification references: React useSyncExternalStore getServerSnapshot, Next ESLint CLI/flat config and React Hook Form Zod resolver documentation were fetched through Context7. Live performance, genuine media provenance, Search Console and deployed environment settings were not certified.
