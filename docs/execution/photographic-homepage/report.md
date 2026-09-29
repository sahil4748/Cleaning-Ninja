# Cleaning Ninja — That fresh home feeling

29 September 2026 · rebuild-2026 · starting commit f86d044.

The owner rejected the room model and asked for a photographic hero, retained the Make room for living scroll reveal, and requested a customer-facing experience without internal review labels. This checkpoint follows those decisions. No production, environment, DNS, backend, API, Supabase, dependency or lockfile changes.

## Experience

- Full-bleed photographic opening using the exact existing independent desktop and mobile images, with the headline “That fresh / home feeling.” Outfit is paired with Instrument Serif for the expressive lines; Manrope remains the reading face.
- Navigation overlays the image, then changes to an opaque warm-paper header while scrolling. Quote access, phone, package value and three direct service selections remain visible and functional.
- The hero photograph has subtle scroll-driven depth. No canvas or room-model code is mounted or imported by the homepage.
- Make room for living remains the main cinematic moment. Its aperture opens on native scroll; the headline uses a matching clipped light layer so the letters change colour where they cross the image. Only the original heading is exposed to assistive technology. The film starts after the reveal and retains independent desktop/mobile media and playback controls.
- Existing service gallery, five packages, commercial section, process, FAQ, quote and footer remain connected. The expressive type treatment carries into the service gallery and film.
- Internal prototype, illustrative, draft and demo labels are removed from active customer-facing text, alt text, metadata and linked privacy/terms pages. Filenames and internal content classifications are deliberately unchanged.

## Enquiry behaviour and publication boundary

Form validation and selection prefill remain. Completing the form prepares a reviewable enquiry. A separate Send by email link opens the visitor’s email app with the service, package, name, suburb, phone, optional email and details encoded in the message. The screen explicitly says the enquiry has not yet been sent. There is no simulated delivery, booking or payment confirmation. Tests inspect the link without opening an email app or sending a message.

The displayed phone, numerical prices, discount basis and package inclusions remain owner-authorised design content awaiting business verification. Removal of UI labels is a presentation decision, not proof of these facts. Noindex, canonical business-data separation and production release restrictions remain. Privacy copy now describes the actual email-preparation flow; it does not invent retention periods, storage geography, credentials or guarantees. Business/legal review is still required before publication. [OAIC guidance](https://www.oaic.gov.au/privacy/your-privacy-rights/your-personal-information/what-is-a-privacy-policy) was consulted for plain-language privacy explanations and the distinction between a notice and verified operational practices.

## Assets and loading

Exact paths, sizes and checksums are in [asset-manifest.json](asset-manifest.json). No generation or credit spend.

| Placement | Existing source |
| --- | --- |
| Desktop hero | `public/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png` |
| Mobile hero | `public/homepage/hf_20260928_141125_f8371d19-347d-4146-b77d-d6a2fca54758.png` |
| Desktop reveal | `public/homepage/prototype/carpet-film-desktop.mp4` and `.jpg` poster |
| Mobile reveal | `public/homepage/prototype/carpet-film-mobile.mp4` and `.jpg` poster |
| P-01–P-05, services and commercial | Unchanged from [the previous asset mapping](../immersive-homepage/report.md#active-asset-mapping) |

The hero uses an eager, high-priority responsive picture through Next image optimisation. Source sizes account for cover scaling in tall viewports, preventing an undersized desktop source on portrait tablets. Hero dimensions are reserved. Below-fold images remain lazy; film preload remains none. Reduced motion removes photographic parallax and aperture scrubbing; a still image and explicit film play action remain. No-JavaScript content and contact options remain available.

## Findings

- LAUNCH BLOCKER — fixed: the rejected CAD-like hero is removed from the rendered homepage and replaced by photography.
- LAUNCH BLOCKER — fixed: overlay-header colours could change out of sync. Colour changes are now atomic, and the header height matches its overlap at each breakpoint.
- LAUNCH BLOCKER — fixed: the reveal headline crossed light paper and darker film. A matching aperture mask now changes the type colour at that boundary.
- LAUNCH BLOCKER — fixed: scrolling away while autoplay was starting could incorrectly report Film unavailable. Expected playback interruption and browser autoplay blocking now preserve the poster and play control; actual media errors still show the fallback message.
- LAUNCH BLOCKER — release boundary: verify phone, offers, actual service scope and business/legal practices, and agree the live enquiry integration before publication. This task does not authorise publishing.
- POST-LAUNCH ENHANCEMENT — field performance monitoring and customer-job photography when available. Local CLS and browser tests do not certify real-device Core Web Vitals.

## Verification

- Typecheck, content/release guards and production build: passed.
- Lint: passed with 0 errors and 62 repository warnings, within the configured limit of 70.
- Unit tests: 23 passed.
- Chromium: 26 passed against the final production build. Responsive sweep covers 320, 375, 390, 430, 768, 1024, 1366, 1440 and 1728 pixels, with no horizontal overflow or uncaught page errors in that sweep.
- WebKit and Firefox: 18 focused checks passed, covering mobile/desktop layout, enquiry validation and email draft, hero selections, header contrast state, playback/pause, reduced motion and expected autoplay interruptions.
- Initial CLS assertion passed at or below 0.1. No field LCP/INP claim is made.
- Inspected rendered hero captures at the six requested widths, both film layouts, the opening aperture, packages, services, commercial and enquiry sections. Confirmed active homepage has no canvas or internal review labels.
- `git diff --check` passed. The local production server starts cleanly on port 8136. No test sent a lead or email.

The first acceptance run exposed a too-broad status selector and the false autoplay-error state described above. The enquiry assertion is now scoped to the form; the playback handling was corrected, with two focused interruption cases added and the complete suite rerun. Historical tests for the superseded room-model composition are retained and excluded from these counts.

Evidence is in `screenshots/`; logs remain in `.local-evidence/photographic/`. Full-page images cannot show the scroll transition; use the local preview at http://127.0.0.1:8136/.

## Files changed

- `components/homepage/immersive/PhotographicHero.tsx` and `photographic.css`: photographic composition, typography, header, responsive styles and contrast mask.
- `components/homepage/immersive/Journey.tsx` and `useImmersiveMotion.ts`: matching aperture type and photographic parallax.
- `components/homepage/Homepage.tsx`, `app/page.tsx`: composition, fonts and metadata.
- `components/homepage/prototype/Header.tsx`, `Offers.tsx`, `Quote.tsx`, `Film.tsx`, `Footer.tsx`, `SupportingSections.tsx`, `LegalPage.tsx`; `SurfaceExplorer.tsx`; `content/homepage-prototype.ts`: customer-facing wording and enquiry handoff.
- `app/legal/privacy/page.tsx`, `app/legal/terms/page.tsx`: enquiry/privacy and quote conditions wording.
- `tests/photographic-homepage.spec.ts`, scope/claims documents and this evidence folder.

GSAP responsive cleanup was checked with Context7 against the official matchMedia documentation. The frontend engineering skill was used for implementation and accessibility review. No new visual or legal approval is inferred from passing tests.
