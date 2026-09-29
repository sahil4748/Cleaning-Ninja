# Locked execution step B — approved media integration

2026-09-29 · `rebuild-2026` · starting HEAD `6d0cff5` · initially clean tree.

Integrated approved media into the existing cinematic homepage. Desktop H-01/H-03 assets, mask, typography and geometry remain unchanged. No business copy, service catalogue, commercial data, backend, Supabase, DNS, environment files or production configuration changed. No generation, deployment, push or merge.

## Exact asset mapping

Package source files are in `/Users/arsh/Downloads/archive/`. P-01 also exists in Downloads with identical bytes. Each web delivery image is a 1280 × 1600 WebP derived from the exact 2560 × 3200 PNG at quality 90, with no crop, compositing or generation. All five portraits are shown in full. Original SHA-256, exact path, delivery path and byte size are in [asset-manifest.json](asset-manifest.json).

| Asset | Exact source filename | Homepage use | Delivery |
|---|---|---|---|
| H-04 | `hf_20260929_060509_51d77e97-b0bc-4cc4-a2c7-b08c143f2a85.mp4` | Phone hero only, below 768px | Same filename under `public/homepage/`, byte-identical to Downloads |
| P-01 | `hf_20260929_052950_05ac7bf1-788d-40aa-93aa-0a5f5233e637.png` | 3-bedroom carpet | `public/homepage/packages/p-01-05ac7bf1-788d-40aa-93aa-0a5f5233e637.webp` |
| P-02 | `hf_20260929_053423_49e771be-249d-40bc-9d1e-80381f9e1d14.png` | 5-bedroom carpet | `public/homepage/packages/p-02-49e771be-249d-40bc-9d1e-80381f9e1d14.webp` |
| P-03 | `hf_20260929_053557_977231f3-8fa3-4a09-bcfa-a0549a7bc974.png` | 3 rugs | `public/homepage/packages/p-03-977231f3-8fa3-4a09-bcfa-a0549a7bc974.webp` |
| P-04 | `hf_20260929_053729_82434806-ce85-4141-9548-2dd42e671185.png` | 5-seat fabric lounge | `public/homepage/packages/p-04-82434806-ce85-4141-9548-2dd42e671185.webp` |
| P-05 | `hf_20260929_053907_060ebece-01da-49bc-88d1-967107a2bff8.png` | 5-seat leather lounge | `public/homepage/packages/p-05-060ebece-01da-49bc-88d1-967107a2bff8.webp` |

H-04: H.264, 720 × 1280 (9:16), 24fps, 121 frames, 5.041667 seconds, no audio stream, 2,318,202 bytes. SHA-256: `bb153edfd229068a25afdb2eb3e135f33e552e3a73032aa9407f3015842fcd32`.

### Feedback-preview service provenance

The referenced conversation identifies feedback preview as branch `phase-1-content-preview`, commit `7124dda396a39e87d7483ba9a03a093c5dce5251`. Its `components/sections/home/Services.tsx` renders `service.image` from `content/services.ts`. Those exact five Pexels identities are documented as local copies in `docs/design/asset-manifest.md` (prototype asset ledger). Reused the existing files and existing `SERVICE_CATALOGUE.cardMediaKey` mappings; did not substitute unrelated similarly named Downloads files or restore legacy claims/prices.

| Service | Existing local file | Preview source identity |
|---|---|---|
| End-of-Lease Clean | `public/homepage/hero-desktop.jpg` | Pexels 1643383 |
| Carpet Steam Clean | `public/homepage/carpet.jpg` | Pexels 4176298 |
| Upholstery Care | `public/homepage/hero-mobile.jpg` | Pexels 276566 |
| Tile & Grout | `public/homepage/tile.jpg` | Pexels 7641000 |
| Leather Care | `public/homepage/leather.jpg` | Pexels 6480707 |
| Five auxiliary services | `public/homepage/hero-desktop.jpg` | Existing generic interior mapping; preview had no distinct auxiliary images |

The illustrative-imagery footer remains. No imagery is presented as a genuine job, result or testimonial.

## Loading and responsive behavior

- Server-rendered responsive poster remains eager/high priority. Phones retain the exact `hf_20260928_141125_f8371d19-347d-4146-b77d-d6a2fca54758.png` poster. Tablet uses H-01. Neither poster nor video changes hero layout dimensions.
- H-04 is created only below 768px after window load, poster decode, two paint opportunities and visibility. It uses the independent portrait source and phone poster crop alignment, without the desktop mask or stretched desktop plane.
- 768–1199px remains static. At 1200px+, existing masked H-03 remains active. Breakpoint switches remove the old video before selecting the correct device asset.
- Video `preload=none`, muted, inline, decorative, no loop. A single brief shot settles at approximately 4.8s and holds the last displayed frame. Hidden/offscreen pauses; returning does not restart a completed shot.
- Reduced motion, Save-Data, 2G and no JavaScript make no video request. Denied autoplay, failed requests and slow video preserve the complete poster and quote link. No automatic retry.
- Packages and service images use lazy `next/image`, responsive sizes and reserved geometry. Package portraits reserve 4:5; the corrected phone service photo reserves 3:2. Existing quote prefills, service index, keyboard controls, form behavior and copy remain.

## Verification

- Typecheck: PASS.
- Lint: PASS under existing threshold; **0 errors, 70 existing warnings**, not warning-free.
- Content check and production build: PASS. Existing content/readiness warnings remain and the production release guard stays blocked; build success is not production approval.
- Unit tests: **23/23 PASS**.
- Focused Chromium tests: **60/60 PASS** across homepage, cinematic lifecycle, approved media and release compatibility suites. Includes additional widths 320–1920, quote prefills, synthetic backend-unavailable handling, keyboard focus, mobile menu and FAQ.
- H-04 WebKit and Firefox smoke checks: PASS for 720 × 1280 playback, visible quote action, one-shot pause and live reduced-motion removal; no page errors.
- Visual matrix: 375 × 812, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768, 1440 × 900. Full page, hero, package and service captures examined. [Machine observations](visual-results.json): no page/console errors, horizontal overflow or broken loaded images at all six sizes.
- H-04 timeline inspected at 0, 1, 2.5 and 4.8s; headline and CTA remain readable. Local mobile/desktop hero CLS = **0**; video request starts after initial page load. This is local browser evidence, not a field CWV or physical-device claim.
- Desktop hero/header/CTA geometry remains equal to the locked fixture. Lower-page absolute positions are intentionally no longer compared with the image-free fixture because the requested imagery adds reserved height.
- First test runs caught two obsolete assertions (empty H-04 and media-free lower sections); updated them to the requested asset contract. The first temporary runner config had an incorrect relative import; corrected before the successful run.
- `agent-browser` is unavailable locally; installed Playwright performed the requested actual browser verification. No dependencies installed.
- Local preview: `http://127.0.0.1:8136`, production build on an isolated owned server. Database/email credentials are cleared only in the test process environment; `.env.local` was not changed. Synthetic form tests sent no real notifications.
- Server log contains no unhandled error. Expected unavailable-lead responses are test behavior. Logs and original PNG captures remain under ignored `.local-evidence/step-b/`.

## Visual findings

- **LAUNCH BLOCKER — fixed:** inherited 470px service-photo height caused excessive portrait cropping on phone layouts. Explicit automatic height now reserves a 3:2 phone photo; regression checks cover all ten service selections.
- **LAUNCH BLOCKER — none remaining within this media-integration scope:** hero/CTA readability, correct device source, fallback, full package framing, service selection, layout containment and quote prefills passed the rendered checks.
- **POST-LAUNCH ENHANCEMENT:** five auxiliary services still share the existing generic interior image. Retained as instructed; no replacement or new imagery generated.

## Screenshots

| Width | Hero | Full page | Packages | Services |
|---|---|---|---|---|
| 375 | [Hero](screenshots/hero-375.jpg) | [Full](screenshots/full-375.jpg) | [Packages](screenshots/packages-375.jpg) | [Services](screenshots/services-375.jpg) |
| 390 | [Hero](screenshots/hero-390.jpg) | [Full](screenshots/full-390.jpg) | [Packages](screenshots/packages-390.jpg) | [Services](screenshots/services-390.jpg) |
| 430 | [Hero](screenshots/hero-430.jpg) | [Full](screenshots/full-430.jpg) | [Packages](screenshots/packages-430.jpg) | [Services](screenshots/services-430.jpg) |
| 768 | [Hero](screenshots/hero-768.jpg) | [Full](screenshots/full-768.jpg) | [Packages](screenshots/packages-768.jpg) | [Services](screenshots/services-768.jpg) |
| 1024 | [Hero](screenshots/hero-1024.jpg) | [Full](screenshots/full-1024.jpg) | [Packages](screenshots/packages-1024.jpg) | [Services](screenshots/services-1024.jpg) |
| 1440 | [Hero](screenshots/hero-1440.jpg) | [Full](screenshots/full-1440.jpg) | [Packages](screenshots/packages-1440.jpg) | [Services](screenshots/services-1440.jpg) |

[H-04 timeline](screenshots/h04-timeline.jpg). Committed JPEG captures are compressed viewing copies; original PNGs remain in local evidence.

## Files changed

- `components/homepage/Homepage.tsx`, `ServiceIndex.tsx`, `homepage-finish.css`, `useHeroMotion.ts`: media rendering, responsive integration and lifecycle.
- `content/media.ts`, `content/packages.ts`: exact source mappings, unchanged commercial data.
- `public/homepage/hf_20260929_060509_51d77e97-b0bc-4cc4-a2c7-b08c143f2a85.mp4` and five `public/homepage/packages/*.webp` delivery files.
- `tests/approved-media.spec.ts`, `cinematic-homepage.spec.ts`, `homepage.spec.ts`, `unit/platform.test.ts`: new lifecycle/media coverage and updated superseded expectations.
- `AGENTS.md`, `docs/execution/current-phase.md`, `docs/product/owner-decisions.md`: current bounded authority.
- This report, source manifest, visual observations and screenshots under `docs/execution/step-b-media/`.

Implementation reference: Next.js current [Image documentation](https://nextjs.org/docs/app/api-reference/components/image), retrieved through Context7 for art direction, sizes, intrinsic geometry and lazy loading.
