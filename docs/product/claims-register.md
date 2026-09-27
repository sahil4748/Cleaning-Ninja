# Claims register

Updated 2026-09-22. See owner-decisions.md for current authority. VERIFIED = established evidence; OWNER-APPROVED = owner planning/operating decision; PLACEHOLDER = preview only; PENDING = unconfirmed; PROHIBITED = cannot be asserted as fact. Historic source locations below describe audit evidence, not current runtime output.

| ID | Claim/content | Class | Evidence/location | Required action or limit |
|---|---|---|---|---|
| C01 | Business name, operating status, business email, Titan provider, Vercel DNS | VERIFIED | Owner brief 2026-09-21 | Owner-supplied; no independent mailbox/registry check |
| C02 | Five primary and five auxiliary services | OWNER-APPROVED | content/services.ts | All retained services active for planning; inclusions, exclusions, capacity and pricing still pending |
| C03 | Six cities and 60 listed suburbs; Australia-wide hero wording | PENDING | content/coverage.ts; Hero.tsx | Confirm coverage/capacity per location; six metros do not establish Australia-wide coverage |
| C04 | Starting service prices $295/$49/$89/$9 per m²/$149; auxiliary $189/$89/$99/$119/$129 | PENDING | content/services.ts | Obtain current approved price list and units/minimums; do not infer from code |
| C05 | Pricing matrices and claims of real binding GST-inclusive booking prices | PROHIBITED | content/pricing.ts explicitly calls data dummy; pricing page/FAQ/terms claim real prices | Replace only with approved business data in later phase |
| C06 | City benchmark prices $485/$420/$365/$395/$345/$380 | PENDING | content/coverage.ts versus END_OF_LEASE_MATRIX | City 3BR benchmark conflicts with matrix 3BR2BA; verify scope and amount |
| C07 | Twelve reviews attributed to named cleaners, customers, suburbs and dates | PLACEHOLDER | content/reviews.ts explicitly calls them real-feeling dummy data | Require original authorised review source; none verified |
| C08 | 4.9 rating and 1,247 Google reviews / aggregateRating | PLACEHOLDER | BUSINESS; reviewStats; lib/schema.ts | Hardcoded aggregates tied to dummy review set; not verified Google evidence |
| C09 | City cleansCompleted totals | PROHIBITED | content/coverage.ts explicitly labels dummy data | Do not revive metrics removed from visible content |
| C10 | ABN 12 345 678 901 and ABR-verified claims | PROHIBITED | BUSINESS, FAQ, TrustStrip, Hero, Footer, contact/schema | Placeholder-pattern identifier with no evidence; never label verified |
| C11 | NDIS provider 401 234 567 and direct plan invoicing | PROHIBITED | BUSINESS and legal/terms | Unsubstantiated placeholder-pattern registration; requires real evidence |
| C12 | Main phone 1300 NINJAS / 1300646527 | PENDING | content/navigation.ts | Owner must confirm ownership and correct dial/display mapping |
| C13 | City phone numbers 02 8000 0001, 03 9000 0002, 07 3000 0003, 08 6000 0004, 08 7000 0005, 07 5000 0006 | PROHIBITED | app/contact/page.tsx explicitly calls these placeholders | Do not call them for testing; replace only with owner evidence |
| C14 | hello@cleaningninja.com.au public contact | PROHIBITED | content/navigation.ts | Conflicts with owner-confirmed contact@cleaningninja.co; app unchanged in audit |
| C15 | Stock portraits as named Cleaning Ninja staff | PLACEHOLDER | content/team.ts explicitly describes Pexels portraits pending real photos | Obtain actual photos and consent |
| C16 | Staff names, roles, tenure, specialties, local roster and founder story | PENDING | content/team.ts, about/team/careers/journal pages | Obtain owner-approved roster and biographies |
| C17 | Before/after and gallery portrayed as actual jobs/outcomes | PROHIBITED | BeforeAfter.tsx and GalleryGrid.tsx reuse one photo with beforeFilter | Require authentic paired job images and consent |
| C18 | Bond back / on-time guarantee / 72-hour re-clean | PENDING | Hero; PricingPreview; city pages | Conflicts with cleaned terms describing seven-day scope review; need approved guarantee wording/conditions |
| C19 | Same cleaner every visit, senior matching, equipment supplied | PENDING | OurStandard, FAQ, BookingFlow | Confirm operations capability and exceptions |
| C20 | Eco-certified products, named products, no toxic surfactants, manufacturer-safe care | PENDING | OurStandard, services, our-standard page | Require product evidence and approved limitations |
| C21 | 90-second flow; one-business-day replies | PENDING | book/contact/journal/form success | No measured completion/SLA evidence; delivery not implemented |
| C22 | Booking received/recorded, application received and enquiry success | PROHIBITED | BookingFlow/ContactForm/ApplicationForm | UI-only timer; must not imply durable receipt |
| C23 | Available dates/time slots and named cleaner assignment | PROHIBITED | BookingFlow.tsx static slots/local state | No availability or assignment backend; display as requests only after approved redesign |
| C24 | Cancellation 24h free, 50%/100% penalties; 14-day damage notice | PENDING | legal/terms and insurance | Draft commercial/legal terms require business/legal review |
| C25 | Insurance/Workers Compensation certification and downloads | PENDING | legal/insurance | Current cautious verification copy must be preserved; PDFs are placeholders |
| C26 | Google Analytics, Stripe/payment processor references, data sharing/retention assurances | PENDING | legal/privacy | Application source does not substantiate claimed processor/analytics behavior |
| C27 | Article bodies, studies, quantified market comparisons, author expertise | PROHIBITED | content/journal.ts and journal/[slug] | Explicit placeholder articles; no underlying study/source evidence |
| C28 | Above-award pay and hiring conditions | PENDING | careers page | Owner-approved recruitment terms needed |
| C29 | Facebook/Instagram/LinkedIn/Google Maps identity URLs | PENDING | lib/schema.ts | Ownership/actual Google profile unknown; cid=cleaningninja is not verified evidence |
| C30 | Offers, discount eligibility, expiry and savings | PENDING | No live offer section; /special-offers only stale sitemap entry | Owner-approved package direction only; exact terms pending; not a live offer |

Verification owner: business owner (individual assignee not supplied). Evidence can include approved catalogue/rate card, actual service coverage, registry/insurance documents, authentic reviews, staff/job media consent and written operational policies. Record evidence date/scope before reclassification. Audit did not validate legal obligations, insurance or NDIS status externally.

## Current decision overrides and enforcement

| Subject | Class | Current treatment |
|---|---|---|
| Brisbane primary market | OWNER-APPROVED | Other city/suburb SEO eligibility PENDING; no LocalBusiness schema |
| Quote-first; future fixed/mixed pricing | OWNER-APPROVED | No price/availability offers in schema |
| Up to 30% package concept | OWNER-APPROVED | Configurable direction; actual commercial terms PENDING |
| Public phone, ABN, NDIS status/number | PENDING | No invented values; public identifiers omitted; no placeholder tel links |
| Insurance, guarantees, police checks, training, eco/safety proof | PROHIBITED | No current authorisation; excluded from schema; residual prototype copy blocks release |
| Reviews/ratings, staff and editorial | PLACEHOLDER | Source marked; excluded from business-truth module and factual schema; release guard blocks production |
| “Request received” without durable acceptance | PROHIBITED | API returns 503; forms preserve input and report not sent |
| One-screen required name/phone/suburb-address capture | OWNER-APPROVED | Shared typed contract; future UI implementation deferred |
| Usually 24–48h human follow-up | OWNER-APPROVED | Configurable working SLA, not guaranteed |
| Target cleaningninja.co | OWNER-APPROVED | TARGET_PENDING_EQUITY_CHECK; migration deferred |

No classification establishes genuine customer reviews, staff identity, registry status or proof. Old ABN/NDIS/phone strings above are an audit trail, not reusable data.

### H-02 owner correction — 2026-09-27

C03 scope override: owner confirms service across major Australian cities, with Brisbane the primary/strongest market rather than an exclusive area. The exact hero sentence in owner-decisions.md is OWNER-APPROVED. Specific six-city/60-suburb eligibility and “Australia-wide” coverage remain PENDING; this correction does not approve either claim.
