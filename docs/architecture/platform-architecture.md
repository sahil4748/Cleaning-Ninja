# Platform Architecture Report

Historical sprint snapshot. Current persistence and notification implementation is documented in [lead operations](lead-operations.md).

2026-09-27 · rebuild-2026 · functional scaffold only; homepage visual design NOT approved.

## 1. Architecture overview and audit

App Router remains intact: 93 content routes, one bounded quote API, local React form state. Existing substantial uncommitted homepage/readiness work was present at sprint start and preserved. No production/main changes, deployment, provider setup or message sending.

The audit inspected app routes, shared/homepage components, services, pricing, coverage, reviews, team, navigation, quote state/schema/API, configuration, environment references, schema/metadata and release controls. Findings:

- `content/services.ts` combined approved taxonomy with unverified prices, methods, durations and inclusions. Five detailed routes repeated prices and six-city assertions in metadata. Canonical taxonomy now has a clean module; existing service identity and metadata consume it.
- Homepage package concepts duplicated commercial-direction names. Names and enquiry copy now derive from one package catalogue; live commercial fields remain null.
- Homepage image paths were positional and duplicated; now resolved through typed slots, preserving all selected images.
- Phone/communication states and mailbox strings were scattered. Configuration now controls header channels and navigation identity; legacy fail-closed forms use one unavailable message.
- Quote API already validated size/fields and returned 503. It now calls the replaceable lead service. Homepage package context was buried in description; now has a validated package ID and source attribution.
- Booking uses a legacy seven-step local state, static prices, cleaner choices and time labels. It remains explicitly unavailable; those preview values do not enter the new lead/domain or assistant knowledge. Contact lacks the canonical required phone/address; careers is recruitment, not an acquisition lead. Neither is silently coerced into the lead model.
- Placeholder reviews were reachable through location pages, reviews UI and footer aggregates. Runtime review data is now empty; historical examples live only in test fixtures. Review page has an unavailable state; no fabricated aggregate remains in navigation.
- No durable store, CRM, application email sender, availability provider, AI model, telephony provider, persistent conversation store or external feature platform exists. No browser local/session storage is used for customer data.
- Remaining legacy pricing matrices, location assertions, service methods, staff/gallery/editorial claims and legal copy are preview debt, not approved business truth. They remain release blockers and are excluded from canonical assistant sources. This sprint did not redesign or fully sanitise internal-page bodies.

## 2. Sources of truth

| Source | Authority / consumers |
| --- | --- |
| `content/business-config.ts` | Typed owner-confirmed identity and current modes |
| `content/knowledge.ts` | Evidence/status/scope registry; publication selector |
| `content/service-catalogue.ts` | Ten approved service identities; homepage, legacy identity projection, metadata, leads, assistant |
| `content/packages.ts` | Five enquiry concepts; homepage, validation, assistant |
| `content/media.ts` | Independent hero posters/videos and named card/media keys |
| `content/features.ts` | Typed capabilities and contact channel projection |
| `lib/site-config.ts` | Active canonical origin, target status and noindex |
| `lib/lead-contract.ts` | Runtime validation and inferred shared lead type |
| `lib/platform/*` | Lead transport/service, persistence/notification interfaces, booking states, assistant policy, metadata |
| `content/services.ts`, `pricing.ts`, `coverage.ts` | Legacy preview details only; never new business-fact sources |

## 3. Business configuration

Cleaning Ninja; target canonicalDomain `cleaningninja.co`; configured operational mailbox `contact@cleaningninja.co`; publicPhone null; phone, AI voice and callback disabled. Brisbane is the owner-approved primary market, with coverage pending. Quote enabled; booking request-only; reviews verified-only; package enquiry concepts visible. No price, credential, phone or coverage value was invented.

Target domain does not replace active canonical origin `https://cleaningninja.com.au`. Ownership/equity checks remain required before migration. Existing noindex and release guard remain.

## 4. Service model

Ten entries contain id, slug, name, shortName, summary, description, category, quoteLabel, seoTitle/Description, hero/card media keys, enabled, quoteEnabled, bookingEnabled, coveragePolicy and href. Canonical descriptions describe enquiry/checking scope only. All support quote enquiry; none enables booking. Coverage is check-on-enquiry. Five existing detailed routes retain their paths; auxiliary entries link to `/services`, with no invented routes.

Legacy detailed service objects obtain names from this catalogue. Their historical commercial/detail fields are not canonical; future pages must import the catalogue directly, adding only evidenced detail. Footer service links and homepage options derive from the catalogue.

## 5. Package model

3-bedroom carpet, 5-bedroom carpet, 3 rugs, 5-seat fabric lounge, 5-seat leather lounge. Stable IDs, service relationship, detail, mediaKey and enquiry visibility. Price, discount, terms, expiry and eligibility are null; commercialEnabled is false. No percentage or binding offer is presented by this catalogue. Lead validation rejects unknown packages and mismatched service/package selections.

## 6. Lead lifecycle

`LeadSchema` is a strict, bounded v1 request envelope. Required name, Australian phone and suburb/address; optional email, service, package, description, city, booking date/time/timezone, sourcePage, UTM attribution, consent notice metadata and consented conversation summary. leadSource supports homepage, service-page, package, quote-form, booking-flow, ai-chat, ai-voice, phone and callback. Legacy v1 callers default to quote-form; new callers supply attribution. Attribution describes caller context, not an authenticated trust claim.

Homepage keeps data in component/form memory. `submitLead` client transport calls `/api/quote`; route bounds body at 16 KiB and validates; service revalidates, assigns server createdAt and request state; persistence adapter runs; only a nonempty durable ID permits accepted response. A future adapter must guarantee the ID represents durable storage. No client-supplied timestamp or confirmed state is accepted. Storage failures never notify or report success. The UI preserves input on 400/503/network failure and rejects accepted responses lacking a durable ID.

Notification runs only after persistence. Failure cannot reverse acceptance and cause accidental resubmission; future production integration must use an outbox/retry mechanism. Current persistence returns unavailable and notifications return not-configured. No real leads were submitted. Server interfaces must remain outside client components; client imports only transport and type/schema/config modules.

Legacy booking/contact/careers retain their explicitly unavailable behavior and shared failure message; they require a separately authorised form migration to meet the new capture requirements. No missing data is fabricated to submit them.

## 7. Booking lifecycle

States: draft, quote_requested, quote_acknowledged, booking_requested, availability_pending, booking_confirmed, cancelled. Transition policy separates quotation from booking intent. Quote acknowledgement can lead to a booking request; booking request can lead to pending availability. No implemented transition allows booking_confirmed. A future confirmed record requires booking ID, provider availability reference and server confirmation timestamp, behind trusted scheduling logic. A requested date does not establish a booking.

## 8. AI/voice boundaries

Assistant knowledge references the same business config, clean service catalogue and package array; fact retrieval applies publication rules. Lookup functions, shared lead service, handoff interface, tool permissions and logging policy exist without a model or provider. Lead capture tools are disabled; no public AI endpoint exists. AI chat, voice and callback integrations must authenticate/gate their tool calls and use the shared lead service when authorised. No separate price/coverage/proof prompts or facts.

No raw transcript persistence, cross-session browser storage or recording. Summaries require explicit consent; retention is pending. No email sending, phone calling or booking confirmation permission. Handoff is an interface, not a queued message claim. Future tools must not treat caller-provided channel/source metadata as authorisation.

## 9. Business truth rules

Facts support verified, pending, placeholder, do-not-publish and scoped owner-approved decisions, plus evidence source and scope. Publication permits non-null verified facts and scoped owner-approved decisions only. Brisbane market context never implies suburb coverage. Services/package concepts are owner-approved enquiry taxonomy, not guaranteed operations or offers. Changing status requires dated owner evidence; the selector cannot independently verify evidence.

Runtime reviews are empty, historical fixtures are test-only, homepage proof remains empty, and schema never emits unverified review/local-business proof. Feature flags cannot verify a claim. Release remains blocked by the existing readiness guard.

## 10. Media architecture

`hero.desktop.poster`, `hero.desktop.video`, `hero.mobile.poster`, `hero.mobile.video` support independent art direction. Videos are null, existing JPG posters preserved. Catalogue and package media keys resolve through the image map; unknown/null keys fall back to the desktop poster. No generated media or visual changes. Later approved asset replacement updates slots, with separate implementation/QA needed to enable video and motion. Media remains illustrative, never job evidence.

## 11. Feature flags and communications

aiChat=false, aiVoice=false, phoneCalling=false, callback=false, booking=false, reviews=false, packages=true, cinematicHero=false, advancedMotion=false. Booking flag represents future booking capability; request-only intent/date capture remains valid. Cinematic/advanced flags reserve future video/advanced effects; existing scaffold CSS motion remains unchanged. Reviews are also evidence-gated; merely enabling a flag supplies no review data.

Header uses email/phone/voice/callback configuration. Phone href is null unless enabled with a supplied number. Enabling an operational feature requires its integration and verified data; flags alone are not implementation. No external flag service.

## 12. SEO and environment/config requirements

Service metadata now uses catalogue and business identity, preserves canonical origin and noindex, and only adds location context when explicitly verified and SEO-enabled. No new city/suburb routes or migration. Existing sitemap retains 93 routes. Organization schema uses the central identity projection.

No new environment variables, secrets or dependencies. Existing runtime references: VERCEL_ENV (release block), CI (test policy), TZ (test-only date checks). NODE_ENV is managed by the framework. Historical RESEND_API_KEY examples are not implemented configuration. Environment file values were not printed. Runtime version remains unpinned (local Node 25.9.0 observed). Future provider-specific credential names are intentionally undecided; keep credentials and private notification recipients server-side, never NEXT_PUBLIC variables.

The existing mailbox is operational per owner. NOTIFICATION_CONFIG records it; sender is null and app delivery not-configured. No additional sender addresses or booking confirmation email assumed. No DNS/mailbox changes.

## 13. Future integrations and known blockers

Durable persistence/CRM, idempotency, abuse/rate controls, notification outbox/provider, ownership and retry monitoring; operational recipient approval and privacy/retention policy; scheduling/availability and cancellation authority; consented AI/voice tools and handoff; verified coverage, commercial terms, service detail, genuine reviews and media rights; domain equity check; runtime pinning. Legacy internal preview pricing/coverage/staff/gallery/legal claims still block release. No durability, outbound delivery or confirmed booking is claimed by this implementation.

## 14. Recommended next implementation sprint

Authorise lead persistence and operational handoff first: choose storage, idempotency and abuse controls; define access, retention and lead owner; implement a durable adapter and notification outbox; test with synthetic data/local sinks; then migrate legacy acquisition forms to the canonical contract. Email provider activation and real notifications need separate authorisation. Service-page visual implementation should follow design and business-content approval. Homepage visual approval remains outstanding.

## 15. Validation

Results recorded after completion below. Unit coverage checks service/package integrity, config safety, disabled phone, publication filtering, empty public reviews, lead sources/context, booking separation, persistence/notification ordering, assistant canonical references and media fallbacks. Browser regression checks run on isolated port 8136 with server reuse disabled. Only synthetic input and local endpoints are used.

## Sprint file inventory

New: `content/{business-config,features,knowledge,media,packages,service-catalogue}.ts`; `lib/platform/{assistant,booking,lead-client,lead-service,metadata,notifications}.ts`; `tests/platform.spec.ts`; `tests/unit/{platform.test,placeholder-reviews}.ts`; this report.

Updated: `content/{business-truth,homepage,navigation,reviews,services}.ts`; `lib/{lead-contract,site-config}.ts`; `app/api/quote/route.ts`; five `app/services/*/page.tsx` files; `app/reviews/page.tsx`; `app/book/BookingFlow.tsx`, `app/contact/ContactForm.tsx`, `app/careers/ApplicationForm.tsx`; `components/homepage/{HomeHeader,Homepage,NinjaMedia,QuoteForm}.tsx`; `components/layout/Footer.tsx`; legacy `components/sections/home/{Hero,Reviews}.tsx`; `tests/unit/readiness.test.ts`; `docs/product/owner-decisions.md`; `docs/execution/current-phase.md`.

Other dirty files predated this sprint. No CSS, font, CTA colour, hero art direction, dependency or deployment configuration changes were made in this sprint.

Validation completed:

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass on final source |
| `npm run lint` | Pass: 0 errors, 70 warnings under existing warning budget |
| `npm run test:unit` | 16 passed; repeated after notification wiring with `node --import tsx --test tests/unit/*.test.ts`, also 16 passed |
| `npm run check:content` via build | Pass in existing warn-only mode: four medium warnings (two unavailable channel labels, two schema organisation identifiers) |
| `npm run build` | Pass on final source; 98 generated pages including framework/metadata routes |
| Full Playwright suite | 26 passed, isolated local production server on 8136 |
| Final focused homepage/platform Playwright | 18 passed after last mailbox-config wiring |
| `git diff --check` | Pass |

The initial sandboxed npm unit invocation hit a local tsx IPC EPERM; the authorised rerun passed. No failed assertions remain. Local browser observations are regression evidence, not production performance certification. Production release remains blocked as expected. No final booking UI, AI/voice, outbound email, Higgsfield media, deployment or merge was performed. Sprint stopped at this report.
