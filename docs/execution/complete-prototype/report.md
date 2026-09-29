# Cleaning Ninja — complete frontend prototype

29 September 2026 · branch rebuild-2026 · starting commit b450c1e.

The owner authorised a complete frontend prototype, a new identity, generated cinematic assets, clearly presented sample offers/prices and the placeholder phone 123456789. This supersedes the earlier one-section-at-a-time and no-generation limits. Backend, environment configuration and production remain untouched.

## The experience

A new N monogram and compact wordmark; phone and free-quote actions; an up-to-30% promotional treatment; architectural hero; five selectable offers with example AUD prices, inclusions and expandable conditions; new landscape/portrait cleaning films with playback controls; carpet-first services; commercial cleaning; a three-step process; area enquiry; useful FAQs; a short form with validation, retained entries and an explicit demo result; mobile sticky call/quote controls; matching privacy and terms pages.

The form is intentionally frontend-only and does not POST or create a booking. Existing lead APIs, Supabase work and prior functional QuoteForm remain intact. Placeholder content lives in content/homepage-prototype.ts, not in the canonical booking catalogue, business configuration or structured pricing data.

## Research and editorial decisions

- [Blue Sky homepage](https://blueskycarpetcleaning.com.au/): phone prominence, repeated free-quote actions, carpet priority and understandable offers. Its homepage publishes an up-to-30% promotion and inclusions, but no fixed package price. Therefore the numerical prices here are our explicitly labelled design examples, not copied or verified rates.
- [Blue Sky specials](https://blueskycarpetcleaning.com.au/specials/) and [commercial services](https://blueskycarpetcleaning.com.au/services/commercial-cleaning/): the relationship between service scope and enquiry. Cleaning Ninja copy is original; competitor testimonials, credentials, operating hours, guarantees, claims and policies are not transplanted.
- [Electrodry](https://www.electrodry.com.au/): clear action hierarchy and offer discovery.
- [OAIC guidance](https://www.oaic.gov.au/privacy/your-privacy-rights/your-personal-information/what-is-a-privacy-policy): a business-specific privacy explanation. The original draft identifies the current demo behaviour and unverified operational details; it does not claim completed legal approval.

## Art direction

Warm ivory, olive, timber and pale green accents. Instrument Serif provides a confident editorial scale; Manrope carries service information and controls. One aligned hero message, photographic package selection, full-width service film and a commercial split composition create distinct sections. Removed the old tall numbered package ledger, ornamental Ninja Cut, narrow copy columns and fragmented logo crops.

## Generated assets and budget

Higgsfield project 393ed518-2ab0-4000-9fe9-c0ddbfe87e03. Exactly three generations, no retries or variants. Account balance 900 → 882.25 confirms **17.75 credits spent**.

| Asset | Model / job | Website use |
| --- | --- | --- |
| Landscape film | Kling 3.0 Pro · b3fad178-9270-4e55-b6d8-93c557e9a12d · 8.75 credits | /homepage/prototype/carpet-film-desktop.mp4 |
| Portrait film | Kling 3.0 Pro · 2d4c25ac-39c6-4953-9fef-c79749690105 · 8.75 credits | /homepage/prototype/carpet-film-mobile.mp4 |
| Office interior | GPT Image 2.5 · e333f95c-447b-4667-b774-7e1f5515e3fe · 0.25 credits | /homepage/prototype/commercial.webp |

The films are silent, about five seconds, separately framed at 16:9 and 9:16. Local delivery encodes preserve timing, with H.264 fast-start, approximately 1.6MB desktop and 1.2MB phone. Posters are extracted first frames. No before/after result is claimed. Hero retains the existing approved H-01 and mobile architectural posters with a five-second CSS camera settle; rejected H-03/H-04 playback is not used in this prototype.

P-01 through P-05 remain the previously approved package image derivatives. Their exact provenance remains in [Step B](../step-b-media/report.md). The N monogram is an original SVG and the wordmark is live type.

## Media behaviour

Hero sources are eager and high-priority; landscape sizes account for the cover crop. Below-fold pictures are lazy. Film sources attach only on intersection; desktop never receives the portrait source. Hidden/offscreen playback pauses, reduced motion and Save-Data suppress automatic loading, errors retain the poster, and play/pause controls remain available. Films do not loop. Content remains visible without animation. Form controls are disabled before hydration to prevent a no-JavaScript demo submission.

## Review findings

- LAUNCH BLOCKER — fixed: old global heading colour made the first line dark on cinematic backgrounds. Explicit inherited colour now protects hero, film and commercial headings.
- LAUNCH BLOCKER — fixed: validation error text changed the phone field’s accessible name. The stable label now remains available through invalid, corrected and submitted states.
- LAUNCH BLOCKER — fixed: the hero offer arrow extended outside its panel at 1024px. The panel now reserves space for its text and icon; a responsive assertion checks containment.
- LAUNCH BLOCKER — before a live launch: replace 123456789, approve real prices/promotion terms, confirm proposed service scope, review legal documents, reconnect the intended live form and obtain deployment approval. The prototype is explicitly noindex and release-blocked.
- POST-LAUNCH ENHANCEMENT — publish genuine customer reviews and documented job imagery when evidence is available. No fabricated proof was used to fill these sections.

## Verification

Production build and content preflight passed. Typecheck passed. Lint passed with zero errors and 62 existing warnings. All 23 backend unit tests passed.

The dedicated prototype browser suite passes 21 Chromium checks, with 10 additional WebKit/Firefox checks covering mobile/desktop layout, form validation and film playback. Tests cover all five offer selections and quote prefill, commercial/service selection, menu focus and Escape, invalid/corrected phone input, retained enquiry edits, no real lead POST, separate video aspect ratios, offscreen pause, reduced-motion/Save-Data/error fallbacks, legal routes/noindex, no-JavaScript fallback and layout shift below 0.1 in the measured run. Firefox does not expose the playsInline property; the portable check verifies the rendered playsinline attribute while independently asserting muted playback and dimensions.

Responsive checks ran at 320, 375, 390, 430, 768, 1024, 1366, 1440 and 1728px. Actual rendered hero/full-page captures for 375, 390, 430, 768, 1024 and 1440px are in screenshots/, with additional offer, service, commercial and form captures. Visual review corrected the heading contrast and offer-arrow defects above. No remaining clipping or horizontal page overflow was found at these widths. These are browser-engine checks, not physical-device or field Core Web Vitals certification.

Historical homepage/media suites encode the superseded baseline and were not treated as acceptance for this redesign. This report does not claim the entire repository E2E suite passed. This is frontend prototype acceptance, not production readiness or a guarantee of subjective design approval.

## Changed files

- `app/page.tsx`, `components/homepage/Homepage.tsx`: new homepage entry and composition.
- `components/homepage/prototype/`: scoped brand, header, hero, offers, services, film, supporting sections, quote, footer, legal layout and styles.
- `content/homepage-prototype.ts`: isolated sample phone, prices, inclusions, service copy and FAQs.
- `app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`, `components/layout/SiteShell.tsx`: original matching legal drafts and shell routing.
- `public/homepage/prototype/`: two films, two posters, commercial interior and SVG mark; hashes in asset-manifest.json.
- `tests/complete-prototype.spec.ts`: the new frontend acceptance suite.
- `AGENTS.md`, `docs/execution/current-phase.md`, `docs/product/owner-decisions.md`, `docs/product/claims-register.md`, `content/release-readiness.json`: scope, placeholder classifications and release boundary.
- This report, asset manifest and screenshots: review evidence.

Local preview: http://127.0.0.1:8136/. No merge, push, deployment, DNS change, environment-file edit or production action was performed.
