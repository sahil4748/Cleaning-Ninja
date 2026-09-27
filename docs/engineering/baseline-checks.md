# Safe baseline checks

Date: 2026-09-21. Source: rebuild-2026 at approved content commit 7124dda396a39e87d7483ba9a03a093c5dce5251. Isolated local clone, no .env values copied. Host Node 25.9.0 / npm 11.12.1. Existing 8001 server untouched; local production build served on 8126.

| Check | Command/method | Result |
|---|---|---|
| Locked install | npm ci --ignore-scripts --no-audit --no-fund | PASS, 87 packages; lifecycle scripts suppressed, no lockfile mutation |
| Dependency tree | npm ls --depth=0 | Exit 0; @emnapi/runtime@1.10.0 flagged extraneous |
| Typecheck | local tsc --noEmit --incremental false | PASS |
| Lint | npm run lint | FAIL: next lint treated lint as project directory. Next 16 removed this command; no linter setup found |
| Content | npm run check:content | Exit 0; two medium warnings (API TODO and schema identifier false positive); warn-only, misses dummy claims |
| SEO script | local tsx scripts/validate-seo.ts | PASS across 25 source pages; unreliable canonical/schema coverage (see below) |
| Build | NEXT_TELEMETRY_DISABLED=1 npm run build | PASS, compiled 5.3s, TypeScript 4.2s, 98 generated build entries in 704ms |
| Existing E2E first attempt | Existing tests via local port override | Environment blocked: required Chromium not installed |
| Existing E2E after browser install | Same unedited two Chromium tests | 1 PASS prefill; 1 FAIL on stale “You’re booked in.” assertion at line 97, after completing all steps |
| Unit/integration tests | package/source inspection | No separate suite configured |
| Routes | HTTP crawl of generated content paths + /book | 93/93 HTTP 200; sitemap-only /special-offers and /become-a-cleaner HTTP 404 |
| Optional hero manifest | GET /hero/frame.json | 404; still-image fallback expected |
| Generic not-found | GET /foundation-missing-route | 404 |

Playwright 1.60.0 uses one Desktop Chrome project, 60s tests, HTML reporter by default, trace on first retry, CI retries 2. Local override changed only baseURL to 8126, disabled webServer reuse/start, and placed results outside source; test assertions/content were not edited. Installed matching Chromium test runtime. Synthetic existing test data only; forms make no outbound lead calls. Failure snapshot confirms current approved “Thanks. We have your request.” screen and locally generated reference. Passing UI does not prove lead acceptance.

SEO script limitations: treats metadataBase as proof of homepage canonical, automatically marks dynamic metadata properties present, scans imports rather than rendered nested/root schema, and never checks sitemap coverage or truth of claims. It is not an SEO sign-off. The content scanner is warn-only and does not catch current placeholder ABN/reviews/prices.

Raw baseline logs and JSON inventories are exported with the foundation evidence. Browser sampling details appended below. No code repairs or deployments performed.

## Focused browser checks

Chromium 148 via Playwright, local production server; initial agent-browser CLI unavailable. Screenshots inspected at 1440×900 and emulated iPhone 13 (390 CSS-pixel width). Also tested 768px desktop pointer and 390px reduced-motion contexts; each visited /book, /contact, /pricing, /services/carpet-cleaning and /service-areas/sydney/bondi. These five pages had no document-width overflow in sampled widths. This is not a complete accessibility/device test.

- Home rendered meaningful content. Optional /hero/frame.json returned expected 404; first network-idle wait timed out and server recorded timeout errors. Later samples used DOM readiness plus a bounded wait; slow image completion is not proof of a blank page.
- Mobile menu opened with aria-expanded=true; Escape did not close it. Initial immediate post-click checks raced navigation; targeted waits confirmed /services navigation and menu closure in normal and reduced-motion 768px contexts.
- At 768px with fine pointer, body cursor is none while the custom cursor container is display:none: confirmed invisible pointer.
- Desktop home document width measured 2,496px at a 1,440px viewport while body hides overflow-x. Targeted element inspection traces this to the intentional wide ServicesHorizontalTrack. Treat clipping, keyboard reachability and reduced-motion access as risks, not proof of an unintended visible scrollbar.
- Reduced-motion home produced minified React hydration error #418. CountUp initial state depends on media preference and is a candidate cause, not an isolated diagnosis.
- Empty /contact and /careers submissions produced uncaught Zod validation errors and no useful inline error text; no POST request occurred. Resolver 3.10.0 with Zod 4.3.6 warrants compatibility investigation.
- Australia/Sydney booking check selected day 23; sidebar displayed 22 Sept. Local midnight → toISOString date truncation in BookingFlow is the source-level explanation. Slug prefill displayed lowercase bondi rather than the display name.
- JS-disabled inspection confirmed the loader still covers the centre of the page; dismissal requires useEffect. No-JS flow is not supported.

Observed homepage script encoded-body sums at the sampling point: desktop 318,896 bytes; mobile 298,386 bytes. Font response encoded-body sum 75,704 bytes. Single unthrottled samples, partially cached and limited to completed requests, with local compression: not transfer budgets or production performance claims. Observed LCP samples varied 84–2,224ms and are intentionally not used as a score; some content/images had not settled.
