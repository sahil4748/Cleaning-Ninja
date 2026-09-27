# QA checklist

Foundation completion evidence: see engineering/baseline-checks.md and execution/foundation-report.md. Documentation alone does not establish launch readiness.

- [x] Start from clean rebuild-2026 at approved content baseline.
- [x] Inspect routes, metadata, forms, dependencies, media, claims and operating constraints.
- [x] Run locked dependency validation, typecheck, content scanner, SEO script and production build.
- [x] Inventory rendered content routes and stale sitemap entries.
- [x] Record existing smoke outcome without changing production code or approved wording.
- [x] Write knowledge files and mark unknowns; protect secret values.
- [ ] Repair lint tooling in an authorized phase.
- [ ] Verify phone, services/areas, prices, reviews, credentials and legal terms with business evidence.
- [ ] Implement/test real durable lead acceptance, failure paths, abuse controls and application notification.
- [ ] Reconcile domain/canonical/sitemap/schema after approval; preserve route continuity.
- [ ] Verify real-device touch, keyboard, focus, zoom, contrast and reduced-motion behavior.
- [ ] Establish representative throttled performance measurements and real conversion tracking.
- [ ] Approve homepage layout/storyboard before build/media work.
- [ ] Obtain explicit production release approval; preserve DNS/email baseline.

## Technical readiness — 2026-09-22

See technical-readiness-report.md for scoped verification. Lint tooling repaired; owner decisions incorporated; quote endpoint fails closed; schema/sitemap/noindex repaired; validation/date/hydration/cursor checks pass. Real persistence, genuine content, full accessibility/performance QA and production approval remain unchecked.
