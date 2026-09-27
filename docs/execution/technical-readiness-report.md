# TECHNICAL READINESS REPORT

22 September 2026 · rebuild-2026 · local checkout /Users/arsh/Downloads/Cleaning-Ninja

**Ready for Creative Intelligence / homepage architecture, with the technical uncertainties in this sprint resolved or explicitly bounded. Not ready for production launch.** No design phase was started.

## 1. Owner truth incorporated

Added product/owner-decisions.md as the dated current authority. Updated the claims register to distinguish VERIFIED, OWNER-APPROVED, PLACEHOLDER, PENDING and PROHIBITED. Incorporated Brisbane priority, retained services, quote-first/future mixed pricing, planned packages, one-screen lead direction, notification recipients, conditional acknowledgement, configurable usually-24–48-hour follow-up, absent phone, pending ABN/NDIS, genuine-team requirement and pending domain equity check. Historical Foundation Report remains preserved.

## 2. Files changed

Application changes are confined to identity/proof/schema, submission failure handling, confirmed validation/date/motion/cursor defects, canonical/sitemap/indexing and tooling/tests. New shared modules: content/business-truth.ts, content/release-readiness.json, lib/lead-contract.ts, lib/calendar-date.ts, lib/use-reduced-motion.ts, lib/site-config.ts and lib/route-inventory.ts. New guard: scripts/check-release.ts. New tests: tests/readiness.spec.ts and tests/unit/readiness.test.ts. See the exact file manifest below.

Foundation AGENTS.md and docs were already uncommitted when this sprint began. They were preserved and updated in place where current authority changed. Changes remain local and uncommitted on rebuild-2026; no push, merge or deployment.

## 3. Baseline defects fixed

- Contact/careers: upgraded the incompatible Zod resolver, exposed accessible field errors, trimmed required text, set explicit empty dropdown defaults and retained entered values after not-sent outcomes.
- Booking E2E: replaced the obsolete confirmed-booking assertion with the actual fail-safe contract; preserved service/location prefill and seven-step prototype regression coverage.
- Australia/Sydney date offset: local calendar date formatting/parsing replaces UTC ISO truncation, including summary rendering. Unit checks also cover DST dates and a negative-offset timezone.
- Reduced-motion hydration: deterministic initial counter value and a shared media-query subscription with matching server/initial-client snapshots. Development diagnosis confirmed the Parallax DOM branch and preference-dependent styles; development recheck reported no hydration errors and production browser regression passed.
- 768px hidden cursor: native cursor suppression now requires the same desktop width, fine pointer, hover and motion conditions as the custom cursor.

## 4. Lead-contract status

Typed, runtime-validated schema v1 supports website, AI chat, web voice and phone voice with quote/booking/callback/contact intent. Required: name, phone, suburb/address. Optional: email, description, service/context, city and booking-only date/time preference with Australian time zone. No availability/booking-confirmation field is accepted.

No persistence is implemented. Valid quote API requests return 503, invalid data 400, oversized bodies 413; no customer bodies are logged. Contact/careers/book do not simulate success or clear input. Removed timer-based receipts and random booking references. Existing forms are not migrated to the final one-step UX in this sprint. Operations/lead-handling.md recommends later storage/transaction/outbox options without selecting a CRM or provider. No notifications or acknowledgements were sent.

## 5. Placeholder/proof safeguards

Prototype reviews/ratings, staff and articles are explicitly marked in source. Structured data uses an explicit business-facts allowlist: no review/rating, employee/author, ABN/NDIS, insurance/guarantee, price/availability offer or unsupported local-business proof. Unverified FAQ and article schema are withheld. JSON-LD filters null builders and escapes script delimiters. No business-truth API exists; prototype data is excluded from its designated fact module and restricted at API import boundaries.

Public fake phone/ABN/NDIS values were removed; contact links use the authoritative email when no phone exists. Existing review visuals were not redesigned. Residual preview claims, stock people/job imagery, dummy pricing and editorial still require removal or genuine evidence before launch. The release manifest, explicit release check, production prebuild and production-target Next configuration all block the current content from release. This is a guard, not permission to promote a preview artifact.

## 6. SEO readiness changes

Canonical host centralised and existing .com.au identity preserved. cleaningninja.co is recorded as TARGET_PENDING_EQUITY_CHECK; no migration, redirects, DNS or Search Console changes. Homepage canonical added. Sitemap now represents all 93 actual content routes, excludes the two 404 entries and contains no fabricated lastModified dates. Route inventory is not approval to launch every city/suburb/article page.

Rebuild pages have noindex/nofollow metadata; all routes carry X-Robots-Tag; robots disallows crawling. Preview indexing controls do not replace deployment access protection or a later production SEO approval.

## 7. Test/build results

| Check | Result |
|---|---|
| Locked npm ci (scripts disabled) | PASS |
| npm run typecheck | PASS |
| npm run lint | PASS: 0 errors, 70 visible legacy warnings; explicit warning ceiling |
| npm run build | PASS: production compilation/type validation/static generation |
| npm run test:unit | PASS: 7/7 |
| npm run test:e2e | PASS: 8/8 Chromium focused regressions, final run 11.8 seconds |
| Route/schema/indexing crawl inside E2E | PASS: 93/93 return 200; old sitemap-only paths return 404; no placeholder tel links or unsupported proof in schema |
| Release guard negative tests | PASS: explicit release and production-target configuration correctly fail |
| git diff --check | PASS |

No application redesign occurred: homepage section order, component composition, typography, palette, media and layout classes were preserved. The single CSS change concerns cursor eligibility. Visible identity/error/request wording changes are technical/truth corrections.

Limitations: this is focused Chromium regression coverage, not full mobile/tablet/device accessibility or performance sign-off. Existing remote image requests produced timeout logs; they did not fail the focused assertions. ESLint 9 is compatible with the existing Next lint plugin peers but deprecated by npm; broader plugin-stack upgrade is deferred. Legacy punctuation/mount-effect warnings are documented rather than hidden or broadly refactored. The older warn-only content scanner/heuristic SEO scanner are not release approval; dedicated tests and guards cover this sprint's risks.

## 8. Remaining launch blockers

Durable lead storage, idempotency, spam/rate limiting, notification retry and acknowledgement delivery; genuine reviews/team/job evidence or removal; approved prices/offers/commercial/privacy/legal terms; real phone and pending identity/NDIS decisions or approved omission; city/suburb eligibility and canonical-domain equity/ownership investigation; deployed environment/access/indexing configuration; approved homepage and full accessibility/performance/SEO/release QA. Explicit production approval is still required.

## 9. Items deliberately deferred

Visual design/homepage redesign, cinematic media/Higgsfield, finished booking or one-step form UI, CRM/provider selection and provisioning, persistence and messages, AI/voice integration, genuine staff/media production, domain migration/redirects/DNS, broad dependency cleanup and unrelated lint/UX debt. No main merge or production deployment.

## 10. Readiness decision

**Yes — ready to enter Creative Intelligence / homepage architecture when separately instructed.** Owner direction is recorded, the listed runtime defects pass regression checks, and unsupported proof/submission behavior cannot be mistaken for production readiness. Launch blockers remain explicit. Stop here; no next phase started.

## File manifest

- `AGENTS.md`
- `app/api/quote/route.ts`
- `app/book/BookingFlow.tsx`
- `app/careers/ApplicationForm.tsx`
- `app/contact/ContactForm.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `app/layout.tsx`
- `app/legal/privacy/page.tsx`
- `app/legal/terms/page.tsx`
- `app/page.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `components/layout/Footer.tsx`
- `components/motion/CountUp.tsx`
- `components/motion/FadeUp.tsx`
- `components/motion/PageLoader.tsx`
- `components/motion/Parallax.tsx`
- `components/motion/ScaleIn.tsx`
- `components/motion/SparkleCursor.tsx`
- `components/motion/SplitText.tsx`
- `components/motion/Stagger.tsx`
- `components/sections/NotFoundContent.tsx`
- `components/sections/home/FinalCta.tsx`
- `components/sections/home/Hero.tsx`
- `components/sections/home/HomeFAQ.tsx`
- `components/sections/home/QuoteEstimatorPreview.tsx`
- `components/sections/home/TrustStrip.tsx`
- `components/seo/JsonLd.tsx`
- `content/business-truth.ts`
- `content/faq.ts`
- `content/journal.ts`
- `content/navigation.ts`
- `content/release-readiness.json`
- `content/reviews.ts`
- `content/team.ts`
- `docs/ai/knowledge-policy.md`
- `docs/engineering/technical-readiness.md`
- `docs/execution/current-phase.md`
- `docs/execution/decisions.md`
- `docs/execution/qa-checklist.md`
- `docs/execution/technical-readiness-report.md`
- `docs/operations/dns-email.md`
- `docs/operations/lead-handling.md`
- `docs/operations/privacy-data-map.md`
- `docs/product/claims-register.md`
- `docs/product/content-inventory.md`
- `docs/product/content-rules.md`
- `docs/product/owner-decisions.md`
- `docs/product/scope.md`
- `docs/product/verified-business-facts.md`
- `eslint.config.mjs`
- `lib/calendar-date.ts`
- `lib/lead-contract.ts`
- `lib/route-inventory.ts`
- `lib/schema.ts`
- `lib/site-config.ts`
- `lib/use-reduced-motion.ts`
- `next.config.js`
- `package-lock.json`
- `package.json`
- `playwright.config.ts`
- `scripts/check-release.ts`
- `tests/booking-flow.spec.ts`
- `tests/readiness.spec.ts`
- `tests/unit/readiness.test.ts`
