# FOUNDATION REPORT — Cleaning Ninja 2026

21 September 2026 · rebuild-2026 · audited commit `7124dda396a39e87d7483ba9a03a093c5dce5251`.

**Foundation audit and documentation completed. The application builds, but is not ready for a rebuild launch: online lead delivery is simulated, business proof contains dummy data, and SEO has conflicting hosts and sitemap gaps.** Application code/content were preserved. No production, main merge, deployment, DNS/email changes, Higgsfield or homepage implementation.

## 1. Stack

Next.js 16.2.4, React/React DOM 19.2.5, TypeScript 5.9.3, Tailwind 4.2.2, npm lockfile v3. Local Node 25.9.0 / npm 11.12.1; no runtime/package-manager pin. Motion 12.38.0, GSAP 3.15.0, Lenis 1.3.23, RHF 7.72.1, Zod 4.3.6/resolvers 3.10.0. Three 0.171.0 and dotlottie installed without app imports; no R3F/drei. [Dependency inventory](../engineering/dependencies.md).

## 2. Repository architecture

Single App Router app. One root layout owns shared navigation, footer, mobile CTA, global motion/scroll/cursor/loader and Organization JSON-LD. Typed content modules drive most service/location/pricing/review/team data. Shared ServiceDetail and LegalLayout components; local React state, no global store/database/CMS/auth. One POST route, no server actions. [Architecture](../engineering/architecture.md).

Authoritative local checkout is `/Users/arsh/Downloads/Cleaning-Ninja`; it was clean on rebuild-2026 at the approved content commit. Remote branch was unavailable; audit used an isolated local clone. Supplied main/content ancestry facts were accepted without re-audit.

## 3. Route map

**93 content routes**, all HTTP 200 locally: 21 fixed, 6 journal articles, 6 city pages and 60 suburb pages. Fixed routes: /, /about, /book, /careers, /contact, /gallery, /journal, /legal/insurance, /legal/privacy, /legal/terms, /our-standard, /pricing, /reviews, /service-areas, /services, five /services/* pages, /team. Plus /api/quote, /robots.txt, /sitemap.xml and not-found handling.

[Complete route/SEO inventory](../engineering/route-seo-inventory.md) records every resolved path, purpose, title, description, H1, canonical, robots, schema, sitemap membership and important internal links. No route was removed or redirected.

## 4. Build/test baseline

Locked install, typecheck and production build pass. npm ls exits 0 with one extraneous package. Lint fails because its next lint command is obsolete. Content check exits 0 with two warnings; SEO script reports a pass but misses important defects. Existing Chromium suite: **1 pass / 1 fail**, with failure caused by stale pre-cleanup success wording after completing the booking steps. No unit suite configured. Focused browser checks additionally confirmed broken empty-form validation, a Sydney booking date offset, an invisible cursor at 768px, an oversized desktop service rail requiring fallback review, and a reduced-motion hydration error. [Commands, results and limitations](../engineering/baseline-checks.md).

## 5. SEO baseline

Root metadata/schema use cleaningninja.com.au; sitemap/robots use cleaningninja.co. Homepage has no canonical; the other 92 resolved page canonicals use .com.au. All current content pages render index/follow. Sitemap has 11 URLs: nine valid content paths and two 404s (/special-offers, /become-a-cleaner), omitting 84 current routes. lastModified is generated from current time, not editorial updates.

Root Organization schema includes unverified ABN/contact/social/rating data; location LocalBusiness and review schema propagate dummy proof. Service/FAQ/Article/Breadcrumb schemas exist, but pricing, article content and some underlying claims are unverified. Root social metadata can remain generic on pages without overrides. Search Console/indexing/backlinks and real canonical-domain ownership strategy were not checked. Nothing changed.

## 6. Verified business/content inventory

Owner-verified: Cleaning Ninja is an established operating business; business email contact@cleaningninja.co; GoDaddy Professional Email powered by Titan; DNS at Vercel with email records already configured. Preserve/refine olive and approved content simplification.

Source inventory: five detailed services (end-of-lease, carpet, upholstery, tile/grout, leather) plus five auxiliary services (pressure washing, windows, oven, Airbnb turnaround, regular home). Six cities/60 suburbs, twelve dummy reviews, eight unverified staff profiles and six unfinished articles. Prices/offers/coverage are not verified business facts. [Content inventory](../product/content-inventory.md), [verified facts](../product/verified-business-facts.md).

## 7. Claims requiring verification

Thirty claim groups are classified VERIFIED, NEEDS_VERIFICATION or DO_NOT_REUSE in the [claims register](../product/claims-register.md). Priorities: real phone/ABN/NDIS identity, actual territories/services, approved prices/guarantees, genuine reviews/job images, team identity, eco/safety evidence and commercial/legal terms. Explicit dummy pricing/reviews, filtered-stock before/after proof, city phone placeholders, stock staff portraits and simulated receipt must not carry forward as facts. Cleaned cautious wording must not be replaced with stronger old promises.

## 8. KEEP / REFINE / REPLACE / REMOVE / INVESTIGATE matrix

| System | Classification | Reason |
|---|---|---|
| Deployment | KEEP / INVESTIGATE | Retain existing release separation; Vercel dashboard/runtime/preview settings unknown. No deployment. |
| Routing | KEEP | 93 current content paths render; preserve slugs, query prefill and unknown-route 404 behavior. |
| SEO | REFINE | Canonical host differs from sitemap/robots; homepage canonical absent; sitemap incomplete/stale; schema claims unsupported. |
| Content architecture | REFINE | Typed central content modules are useful; local page constants and duplicated prices/claims drift. |
| Design system | REFINE | Olive tokens/primitives exist; legacy aliases and inline overrides conflict; future exact design not approved. |
| Header | REFINE | Clear nav/quote entry; mobile Escape/focus and small-window behavior need work. |
| Hero | REPLACE (later) | Current guarantee/rating proof and dormant sequence plumbing unsuitable as approved flagship foundation; no implementation now. |
| Offers | INVESTIGATE | No implemented deal section or verified offer; stale /special-offers sitemap path. |
| Services | REFINE | Five detailed pages plus five auxiliary catalogue entries; preserve taxonomy pending owner scope confirmation. |
| Booking | REPLACE delivery / REFINE flow | Useful step state and prefill; simulated receipt, no availability, ignored property parameter and date risks. |
| Forms | REPLACE submission / REFINE controls | Labelled reusable controls exist; contact/careers only simulate success; validate resolver/runtime behavior. |
| Animations | REFINE | Reduced-motion groundwork exists; overlapping libraries, loader, cursor and persistent loops add cost. |
| 3D | INVESTIGATE | No active WebGL/R3F. three installed but unimported; keep future use evidence-gated. |
| Analytics | INVESTIGATE | No application instrumentation; privacy copy says otherwise; define consent and true conversion first. |
| Email application integration | REPLACE stub | Logging-only quote API; no sender. Titan mailbox/DNS remains protected. |
| Service pages | KEEP routes / REFINE | Shared ServiceDetail supports content reuse; prices/inclusions/schema require verification. |
| Location pages | KEEP routes / REFINE | 66 generated city/suburb pages; repeated templates, synthetic proof, benchmark drift and no sitemap coverage. |
| Footer | REFINE | Useful service/location/legal links; unsupported identity/rating/contact data. |
| Dummy proof and unused candidates | REMOVE from future reuse / INVESTIGATE deletion | Dummy reviews, stock before/after proof, dummy prices must not migrate as facts; six unreferenced components and unused packages need later removal review. |

## 9. UX issues

Homepage order: Hero → TrustStrip → three-question estimator → Services → PricingPreview → OurStandard → BeforeAfter → Reviews → CoverageArea → Process → BecomeCleaner → FAQ → FinalCta. No genuine offer/deal section exists. Hero uses image/parallax/split copy and unverified proof; “Watch a clean” opens a photo gallery. Services use a desktop GSAP-pinned horizontal card rail, a mobile bento grid and detail pages. Both layouts remain in the component tree. Long page includes repeated quote CTAs and synthetic trust material.

Seven-step booking asks for a cleaner and schedule without real availability. Estimator property choice is discarded by /book. Contact/careers success discards input. Mobile nav has a disclosure button, but Escape does not close it and explicit focus management is absent. Review carousel automatically changes every six seconds without a pause control. Placeholder insurance downloads link to #. Loader blocks first view; without JS it cannot dismiss. See browser evidence for confirmed behavior versus source risks.

## 10. Responsive risks

Shared desktop/mobile layout rather than independent composition; 64px minimum hero display type, 100vh sizing, wide scrollable pricing tables and fixed header/bottom CTA need device/zoom testing. At 768px with a desktop pointer, the native cursor is hidden and the custom cursor container is also hidden (confirmed). Desktop home measured 2,496px document width in a 1,440px viewport, traced to its intentional service rail; reduced motion disables the rail animation without changing desktop markup, creating an offscreen-content access risk. Reduced-motion mode produced a React hydration error. Booking summary follows the form on mobile; sticky quote entry may compete with booking progression. Reduced-motion support exists but does not eliminate review autoplay or dormant frame preloads. Browser observations are recorded in baseline-checks.md; real Safari/Android, keyboard overlays and 200% zoom remain unverified.

## 11. Performance baseline

All-route build: 31 JS chunks, 1,599,216 raw bytes / 487,131 summed gzip bytes; 11 WOFF2 files totalling 277,856 bytes. These are artifacts, not homepage transfer sizes. Eight local brand assets; 43 remote Pexels image URLs. No shipped video, actual frame sequence, active WebGL or third-party analytics script found. Motion/GSAP/Lenis overlap and perpetual animation loops are the main source risks. Image-related loading timeouts occurred locally. No Lighthouse/RUM/production performance score claimed. [Baseline and proposed budgets](../engineering/performance-budget.md).

## 12. Analytics status

No analytics SDK/tag/events found in source; privacy copy nevertheless claims Google Analytics. Dashboard-injected analytics and existing conversion history are unknown. Proposed event names are documented, not implemented. A conversion must mean durable backend acceptance, never current timer-based success. [Event plan](../operations/analytics-events.md).

## 13. Lead/form architecture

Booking uses React state, handwritten step validation, static slots/prices/team and a random local reference. Contact/careers use RHF/Zod and an 800ms timer. None posts a lead. Empty contact/careers submissions throw validation errors without useful field messages. In the Australia/Sydney timezone, selecting day 23 displayed 22 Sept in the booking summary. /api/quote accepts arbitrary JSON, logs the whole body and returns success; no server validation, delivery, persistence or abuse controls found. No CRM/calendar/payment integration. Data categories and retention unknowns are mapped in [privacy-data-map.md](../operations/privacy-data-map.md).

## 14. Existing email integration status

**No implemented application email delivery.** Resend is a commented example, not an installed sender; RESEND_API_KEY appears only in that example/historical docs. No Titan/SMTP client found. Application contact is hello@cleaningninja.com.au, conflicting with owner-verified contact@cleaningninja.co. Mailbox/DNS setup is accepted as supplied and was untouched. [Integration inventory](../engineering/integrations.md), [protected email baseline](../operations/dns-email.md).

## 15. Functionality that must not regress

Preserve approved simplified content and existing routes; service/location discovery; query-based service/city/suburb defaults; step/back validation and summary; contact field labels/errors; gallery/review filters and accessible comparison controls; responsive navigation, sticky CTA safe areas and reduced-motion fallback; metadata/schema infrastructure and 404 handling. Preserve useful interaction contracts while replacing simulated delivery later. Do not preserve misleading receipt/availability/identity claims as functional requirements.

## 16. Technical debt

Obsolete lint command; no separate unit tests/CI/runtime pin; stale E2E wording; permissive scanners giving false confidence; mock submission API; mixed runtime/dev dependency grouping; unused three/dotlottie candidates; six unreferenced component candidates (Card, Divider, RadioCard, Checkbox, home Journal, ScaleIn). Legacy palette aliases, inconsistent heading overrides, conflicting historical instructions and duplicate pricing/claims across files. No removals/repairs performed.

## 17. Risks

Highest: lost leads masked by success and reuse of fabricated business proof. Next: contradictory domains/schema/sitemap, unreviewed legal promises and public request-body logging. Motion, remote assets, date/time conversion and small-window cursor behavior present UX/reliability risk. Known dummy data and privacy text are not legal/operational validation. Build success must not be read as release approval.

## 18. Documentation created

Updated root AGENTS.md and populated every requested docs/product, docs/design, docs/engineering, docs/ai, docs/operations and docs/execution file. Added full route/SEO inventory, content inventory, dependency inventory, baseline checks, system classification and this report. Hero concepts and references record the brief/status/approval requirements without starting visual design. All unknowns are explicitly marked. A complete portable documentation/evidence copy accompanies the report.

## 19. Remaining unknowns

Real phone/entity/ABN/NDIS/insurance; actual catalogue/coverage/prices/offers/staff/reviews/job assets; canonical host strategy; mailbox deliverability; lead owner, CRM and operational SLA; production runtime/environment names, Vercel project/preview settings; dashboard analytics/Search Console; media rights; privacy/retention/legal approval; real-device accessibility and production field performance. No secrets were printed or copied.

## 20. Recommended next phase

Obtain business evidence and an approved lead-handling contract; authorize focused technical readiness fixes for forms, SEO consistency and lint/test tooling. Then prepare the homepage storyboard/layout approval package for **IMMACULATE TRANSITION**, with independently composed mobile, performance budget and static/reduced-motion fallback. Do not implement the homepage or generate Higgsfield media until the relevant approval and instruction.

**Stop here. No visual design or implementation has started.**
