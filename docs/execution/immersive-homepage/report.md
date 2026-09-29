# Cleaning Ninja — Life happens. We reset.

29 September 2026 · rebuild-2026 · starting commit 793cb29.

The owner granted full frontend creative authority and explicitly rejected preservation of the previous layout, interactions and unapproved logo. This checkpoint creates one new visual and interaction direction. It remains a local, noindex frontend prototype; backend, production and canonical business data are untouched.

## Creative direction and references

“Life happens. We reset.” presents cleaning as making room for everyday living. A small explorable home becomes a bridge from brand to service. The typography is Outfit with Manrope for reading and controls; olive, warm paper, timber and pale citron connect the room, film, offers and identity. A new circular cut symbol replaces the previous N mark. It is a design candidate, not an approved identity.

- [Lusion](https://lusion.co/): observed large typography surrounding a dimensional interactive scene, with restrained interface controls. Purpose: motion and physical depth integrated into the brand, not an ornamental background.
- [Bruno Simon](https://bruno-simon.com/): an explorable 3D world with visible controls and quality options. Purpose: make interaction discoverable; retain direct DOM access to information and enquiry rather than making customers play a game to convert.
- [Unseen World](https://unseen.co/world/) and [Symphony of Vines](https://symphonyofvines.unseen.co/): spatial exploration and authored visual chapters. Purpose: an expanding photographic aperture and a coherent change of scale while scrolling.
- [Blue Sky Carpet Cleaning](https://blueskycarpetcleaning.com.au/): service and offer completeness only. No visual replication, competitor testimonials, copied policy or unverified credentials.

Implementation documentation was checked through Context7 against official Three.js renderer documentation and GSAP matchMedia/ScrollTrigger documentation. The frontend engineering and React best-practices skill checklists were applied.

## What changed

- Original procedural Three.js room: rounded plinth, timber floor, textured carpet, modular sofa, pillows, fluted table, ceramic objects, chair, lamp and olive tree. Pointer response, room-layer separation, service-linked focus and an explicit pause control.
- A five-second cleaning film is revealed through a scroll-driven aperture. The film starts when the aperture has opened sufficiently; it does not play through while hidden. The page uses native scrolling, not scroll hijacking.
- A browsable photographic service gallery starts with carpet cleaning, supports buttons, keyboard and horizontal touch scrolling, and feeds the chosen service into the quote form.
- Five offers become a single ticket-like composition with prices, inclusions, conditions and quote prefill preserved.
- Panoramic commercial section, layered process cards, revised FAQ/form styling and a large typographic ending complete the visual system.
- New identity applied to header, footer, mobile menu, legal layouts and favicon.

Existing sample prices, up-to-30% presentation, placeholder phone 123456789 and explicit frontend-only confirmation remain isolated prototype content. Original draft legal text is retained. No lead is sent during the demo.

## Media and performance decisions

No new media generation or paid credits in this checkpoint. The 3D room is original local code and textures; no external 3D model or runtime asset host. Existing 17.75-credit desktop/mobile films and commercial image from the previous checkpoint are reused. P-01–P-05 package images are retained. Exact source mapping remains in ../complete-prototype/report.md and ../step-b-media/report.md.

The room code loads separately after hydration. Reduced-motion and Save-Data start with the photographic fallback and an optional 3D action. Renderer pixel ratio is capped at 1.6, shadow maps at 1024, and rendering stops offscreen or in a hidden document. Pause stops ambient rendering. Disposal removes listeners, observers, animation frames, geometry, materials and textures. WebGL unavailability, module failure or context loss preserves the still image and quote access.

The fallback uses independent approved desktop/mobile posters. Below-fold imagery is lazy. The cleaning films retain independent 16:9/9:16 sources, muted inline playback, posters, user playback controls, no loop and offscreen pause. Reduced motion removes scroll scrubbing and sticky process stacking. No-JavaScript still exposes the hero, offers, services and contact options; the demo form cannot accidentally submit.

### Active asset mapping

Paths below are relative to the repository. Image identifiers resolve in `content/media.ts`; service and package assignments remain in `content/homepage-prototype.ts`.

| Surface | Asset |
| --- | --- |
| Interactive hero | `components/homepage/immersive/room-scene.ts` |
| Desktop fallback | `public/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png` |
| Mobile fallback | `public/homepage/hf_20260928_141125_f8371d19-347d-4146-b77d-d6a2fca54758.png` |
| Desktop film and poster | `public/homepage/prototype/carpet-film-desktop.mp4` and `.jpg` |
| Mobile film and poster | `public/homepage/prototype/carpet-film-mobile.mp4` and `.jpg` |
| P-01 / three rooms / carpet service | `public/homepage/packages/p-01-05ac7bf1-788d-40aa-93aa-0a5f5233e637.webp` |
| P-02 / five rooms / end-of-lease service | `public/homepage/packages/p-02-49e771be-249d-40bc-9d1e-80381f9e1d14.webp` |
| P-03 / three rugs / rug service | `public/homepage/packages/p-03-977231f3-8fa3-4a09-bcfa-a0549a7bc974.webp` |
| P-04 / fabric lounge / upholstery service | `public/homepage/packages/p-04-82434806-ce85-4141-9548-2dd42e671185.webp` |
| P-05 / leather lounge / leather service | `public/homepage/packages/p-05-060ebece-01da-49bc-88d1-967107a2bff8.webp` |
| Tile service | `public/homepage/tile.jpg` |
| Commercial service and panoramic section | `public/homepage/prototype/commercial.webp` |

The original H-04 video remains in the repository but is not active in this new composition. The owner subsequently authorised replacement of the earlier hero and motion direction.

## Review findings

- LAUNCH BLOCKER — fixed during review: the initial desktop room ran below the opening viewport and the phone headline wrapped too far. Room scale and typography were adjusted independently by breakpoint.
- LAUNCH BLOCKER — fixed during review: the film could finish while its aperture was still small. Autoplay is now gated by the reveal progress.
- LAUNCH BLOCKER — fixed during review: the mobile quote bar covered the film controls. The controls now clear the bar and device safe area. Reveal progress no longer recreates the video loading lifecycle or resets a deliberate pause.
- LAUNCH BLOCKER — carried prototype boundary: actual phone, offers, operational service scope, legal approval and live enquiry integration are required before publishing. No production readiness is claimed.
- POST-LAUNCH ENHANCEMENT — physical-device GPU profiling and replacing illustrative scenes with documented real jobs after business evidence exists. Local browser checks do not certify field Core Web Vitals or every mobile GPU.

## Verification

- Typecheck: passed. Production build: passed, including content and preview-release guards.
- Lint: passed with 0 errors and 62 repository warnings, below the configured 70-warning limit. This is not a zero-warning repository.
- Unit tests: 23 passed.
- Final Chromium acceptance suite: 27 passed against the production build. Includes widths 320, 375, 390, 430, 768, 1024, 1366, 1440 and 1728; no horizontal overflow or uncaught page errors in that sweep.
- WebKit and Firefox focused acceptance: 14 passed. Includes mobile/desktop layout, film source and pause controls, form validation, 3D controls and reduced-motion fallback.
- Checked all five package selections, service/commercial enquiry prefills, menu focus/Escape, mobile quote bar, demo validation and preservation of form values, legal drafts/noindex, no-JavaScript content, film failure, Save-Data, WebGL failure and context loss. Demo tests made no lead POST.
- Initial-layout CLS assertion passed at or below 0.1 in the local test; no field LCP/INP or physical-device GPU claim is made.
- `git diff --check`: passed. Production preview server shows a clean startup. No dependency installation or lockfile change.

The earlier test runs exposed the film lifecycle and mobile-control defects listed above; final results were rerun after those fixes. Older homepage suites describe superseded compositions and are not included in these counts. Detailed local logs are under `.local-evidence/immersive/`.

Screenshots include the six requested viewport widths and desktop/mobile cinema, offers, services, commercial and enquiry views. Full-page captures cannot reproduce the sticky/scroll choreography; use the running preview to evaluate the experience.

## Files

- components/homepage/immersive/: scene, hero, film journey, service explorer, motion orchestration and visual system.
- components/homepage/Homepage.tsx: new composition.
- components/homepage/prototype/Brand.tsx, Film.tsx, LegalPage.tsx: shared identity, film reveal gating and legal styling.
- app/page.tsx: typography.
- public/homepage/prototype/ninja-mark.svg: new favicon.
- tests/immersive-homepage.spec.ts: responsive and interaction acceptance.
- Scope documents and this evidence folder.

Preview: http://127.0.0.1:8136/. No push, merge, deployment, DNS or environment-file change.
