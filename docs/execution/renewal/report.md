# Cleaning Ninja — Room to breathe

29 September 2026 · Local implementation on `rebuild-2026`

The active public homepage has a completely new visual identity and implementation. Light olive and beige anchor a photographic, editorial design with an original Ninja mark, Cormorant Garamond and DM Sans, generous material-led compositions, and a distinct portrait mobile hero. A native-scroll GSAP sequence moves from the close-up of a fibre to the feeling of a whole room. The final room includes a restrained five-second atmosphere film. Mobile receives a direct composition; reduced motion, data saving and no-JavaScript states remain usable.

The customer journey includes all eleven reference service categories, interactive material/service selection, five selectable packages, a practical three-step process, commercial care, FAQs, and a one-screen enquiry with validation, retained edits and package context. Privacy and offer-condition pages use the same new identity. Older internal routes and prior local design experiments are outside this new public navigation and were not removed or silently rewritten.

## Content and offers

The owner explicitly requested adoption of Blue Sky's services, pricing and deals. Live research found five packages with up to 30% off and no published dollar prices. The implementation therefore uses sourced package scopes, inclusions, size limits, offer non-combination and minimum-charge exclusions, with personalised quotes. It does not invent numerical rates. Competitor contact details, reviews, years in business, credentials and guarantees were not transferred.

Sources: [current offers](https://blueskycarpetcleaning.com.au/specials/), [conditions](https://blueskycarpetcleaning.com.au/terms-and-conditions/), and the detailed business-sources.md record. Website copy is newly written. Source adoption is an owner decision, not independent verification of Cleaning Ninja's operating history.

## Original media

Six Higgsfield stills and one five-second film were created and visually inspected. Confirmed total: **76.5 credits**, with no credit purchases. The portrait hero is separately composed. The source film used HEVC; the shipped version is browser-compatible H.264, 1920 × 1080, 24 fps, silent, 5.0417 seconds and 1,521,521 bytes. Browser checks confirm decoding and advancing playback. Film pause/resume is independent of scroll choreography, so pausing does not move the page. Off-screen and hidden-page playback pauses.

Exact prompts, source URLs, model settings, job IDs, costs, processing and asset hashes are recorded in asset-manifest.json. All six raster provenance sidecars pass the metadata scan. Generated imagery is editorial brand imagery, not evidence of actual customer work.

## Enquiry behaviour

The form prepares a reviewable email draft addressed to contact@cleaningninja.co. A separate “Send by email” action opens the visitor's email app. The interface explicitly says the enquiry has not been sent and no booking is confirmed. Service/package selections carry through, field errors identify how to recover, and edits preserve input. Browser tests inspect the draft without activating it and block mutation requests. No real leads or messages were sent.

## Verification

| Check | Final result |
| --- | --- |
| Typecheck | Passed; final production build also completed its TypeScript check |
| Production build | Passed |
| Existing unit tests | 23 passed |
| New production browser tests | 23 passed |
| Lint | Passed within existing threshold; 0 errors and 62 existing warnings; no renewal-file warnings |
| Content scanner | 0 critical, 0 high, 10 medium warnings in warn-only mode; three new findings are CSS `color` false positives |
| Automated accessibility | Zero detected WCAG 2 A/AA and 2.1 AA violations at 390px and 1440px |
| Responsive widths | 320, 390, 430, 768, 1024, 1366, 1440 and 1920px; no horizontal overflow |
| Video | H.264 decoding, playback advancement, pause/resume without page movement, offscreen pause, reduced-motion and data-saving behaviour verified |
| No JavaScript | Hero, static care scene and direct email remain usable |
| Independent visual review | Prior findings resolved; corrected candidate accepted within reviewed scope |
| Whitespace | git diff --check passed |

The correction pass resolved inherited heading/button colors, parallax image spill, mobile offer discoverability, form text-size specificity, and movie codec compatibility. The first browser run also exposed a test expectation for a service that had moved category; the expectation was corrected to the final catalogue. Historical intermediate failures are preserved in this chat's working evidence; final results above are current. The final screenshot metrics contain no browser page errors, failed responses or missing visible images. Device coverage is browser viewport emulation, not physical-device certification.

## Preview and boundaries

Preview: http://127.0.0.1:8140 . This isolated local server uses the production build and has lead/email transport disabled. Port 8136 was already occupied by the prior preview, so it was not reused.

The active route is app/page.tsx → components/homepage/renewal/Homepage.tsx. Reusable design tokens are in DESIGN.md and .impeccable/design.json. Existing backend contracts, noindex and production release guards remain intact. Pre-existing local changes and prior candidate directories were retained. No commit, push, merge, public deployment, DNS, mailbox or environment-file change was made.
