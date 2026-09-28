# H-03 MASKED SALVAGE REPORT

2026-09-28 · `rebuild-2026` · development experiment only.

**Recommendation: B. MASKED H-03 NEEDS SMALL CODE REFINEMENT.** The static threshold solves the disappearing copy-safe territory. The room reveal is useful and the architectural mask avoids a generic split-screen. The plinth join still exposes a small overlapping/sliding edge during travel; this is not yet a seamless, approved production composition. Retiming does not fix that spatial mismatch. Keep raw as the comparison baseline and H-01/H-02 as the defaults. No regeneration is recommended or authorised by this report.

## 1. Compositing approach

The approved responsive H-01 picture remains the base. One decorative, muted, inline H-03 video sits above it, below the unchanged shading and DOM content. A fixed CSS mask reveals the room and retains the original threshold/plinth beneath. No Cut animation, loop, glow, coloured edge, wipe, WebGL, new media, or lower-page/header redesign.

Exact sources verified:

- H-01: `public/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png`.
- Raw: `.local-evidence/stabilization-2026-09-27/public/homepage/h03-desktop-raw.mp4`, 4,744,955 bytes, SHA-256 `3e8045159b95c6a1ea80550f9feb75475f9405ac9c4bda01c3dbfd55a3514b61`.
- Existing retime: same archive directory, `h03-desktop-retimed.mp4`, 5,505,164 bytes, SHA-256 `4120bade54a9b671fb04d0bcb056df89cf6d8c1fe50301fd89ea4016f3a9027e`.

Neither MP4 was changed or copied into public assets. `/api/dev/h03?variant=raw|retimed` reads only those two archive names, supports byte ranges and returns 404 outside development or when the file is absent. The production route trace contains no archived MP4. A fresh clone needs the original local archive; there is no substitute download.

## 2. Mask geometry

Uses the inverse of the existing H-01 Cut polygon in source coordinates:

```text
static territory: (0,0) → (36.3%,0) → (36.3%,73.6%)
→ (59.3%,67.8%) → (59.3%,81%) → (24%,100%) → (0,100%)
```

Thus the near-vertical threshold turns along the oblique stone top, down the plinth end and back along its lower diagonal. A CSS `mask-image` with an inline SVG silhouette supplies a fixed Gaussian edge feather: sigma 1.2 units on a 1000-unit source width, approximately 1.6–2.3 screen pixels across these sizes. This is a small edge blend, not scene blur or a broad crossfade.

The mask/video plane uses H-01's 5504:3072 ratio and centred cover coordinates. At 1440×900 it expands to approximately 1612.5×900 and clips horizontally. H-03's 1920:1080 frames fill that plane, a roughly 0.78% aspect adjustment to align normalised source geometry; no re-encoding. The global video's max-width constraint is explicitly disabled for this plane so the taller composition has no uncovered top/bottom bands.

## 3. Raw versus retimed

| Variant | Result |
| --- | --- |
| Raw | Preferred baseline. Copy remains fixed; the room has a restrained early reveal and greater late displacement. It still stops while suggesting travel. |
| Existing retime | Same readability and final composition; reaches the boundary mismatch earlier and holds the final position. Existing repeated source frames remain a cadence limitation. No material spatial improvement. |

Both full five-second sequences were exercised. No new retime, interpolation, compression or media generation. The old retime's source-frame mapping remains documented in the historical H-03 report; no new smoothness certification is inferred from screenshot sampling.

## 4. Typography, CTA and header

The eyebrow, two-line headline, approved supporting sentence and CTA remain actual DOM, unchanged. At 1440×900 the rectangle `(60,200,395,450)` covering the displayed typography/CTA region is byte-identical across all ten timestamp captures (five raw, five retimed). This compares the new development captures with each other, not a different browser/build's screenshot.

The dark threshold remains behind the entire text through 0, 1, 2.5, 4 and 5 seconds. All four sizes retain readable headline/body and a clear CTA. Existing overlay nav remains readable over the light ceiling, including the endpoint. The logo backing and scrolled-header behavior are unchanged; production header regressions pass. This is visual review, not a complete pixel-level contrast certification.

## 5. Seam visibility

- The vertical boundary largely reads as the near architectural wall occluding the moving room. It is positioned at the existing threshold, not halfway across the viewport.
- The diagonal foreground prevents a simple rectangular split. The scene retains useful depth and coherent room geometry.
- At native size, especially around the middle of travel, a narrow moving hearth/base edge emerges alongside the retained plinth. Its attachment and perspective shift independently of the static foreground. The endpoint is more convincing than the transition.
- H-01 to H-03 room-detail changes at playback start remain; these sources are close, not pixel-identical. Feathering cannot remove a displaced object or repair camera geometry.

A limited next refinement would adjust the plinth-tip/lower-diagonal coverage and recheck the full timeline. Do not widen the feather across furniture or animate the Cut to hide it. This report stops at the requested evaluation; no claim that a small refinement is guaranteed to remove all parallax mismatch.

## 6. Performance, loading and fallbacks

**Important experimental behavior: open the opt-in URL, let the still load, then click the room or press a key once to start.** Playback does not start on an untouched page. Reload to reset; playback ends without looping.

An initial load-triggered implementation was measured, not assumed safe: Chromium promoted VIDEO to LCP even though its request followed poster decoding. The final preview therefore requires a trusted pointer/key interaction as well as window load, poster decode and two animation frames before attaching the source. This keeps motion outside initial LCP in the measured runs. It is an explicit interaction-start tradeoff, not a claim that `preload="none"` alone protects LCP. Automatic entry motion would require revisiting this constraint before any production integration.

Final local Chromium samples, with automated interaction:

| Variant / width | Poster response end | Window load end | First video request | CLS |
| --- | ---: | ---: | ---: | ---: |
| Raw / 1366 | 120ms | 357ms | 564ms | 0 |
| Raw / 1440 | 83ms | 238ms | 394ms | 0 |
| Raw / 1728 | 88ms | 238ms | 418ms | 0 |
| Raw / 1920 | 81ms | 238ms | 410ms | 0 |
| Retimed / 1366 | 78ms | 222ms | 381ms | 0 |
| Retimed / 1440 | 59ms | 207ms | 382ms | 0 |
| Retimed / 1728 | 73ms | 229ms | 391ms | 0 |
| Retimed / 1920 | 70ms | 228ms | 395ms | 0 |

Times are relative to navigation, from warm local development runs; they are not production speed estimates. Final LCP entries were IMG or H1, never VIDEO. Hero bounding boxes remain identical at all five timestamps; uninterrupted raw playback also recorded CLS 0.

Approximate compositing implications: one full 1080p video still needs decoding even though part is masked. A 1920×1080 RGBA surface is about 7.9MiB; an 8-bit mask of that size is about 2MiB. Actual GPU allocation includes implementation-dependent decoder buffers, scaling and DPR; these are arithmetic estimates, not a GPU profile. The static mask may require an offscreen compositing surface. No animated mask, blur over the live room, or JavaScript frame loop was introduced. Chromium showed no mask failure or page error in the final matrix. Safari/WebKit and Firefox were not tested (their Playwright binaries are absent); cross-browser and hardware power/frame-budget certification remain open.

Fallbacks verified:

- Default route and untouched opt-in preview: no video request.
- Mobile 390px and tablet 1024px: no video request even after interaction; existing still selection preserved. All widths below 1200px are gated out.
- Reduced motion and browser-exposed Save-Data: no video request; runtime reduced motion removes the video.
- Missing/failed media and rejected `play()`: H-01 remains visible.
- Unsupported CSS mask: creation is gated out; this support branch was reviewed, not exercised in a legacy browser.
- Production opt-in route: no video; archive endpoint 404. Existing public raw/retimed MP4 URLs remain 404.

The local route buffers a 4.7–5.5MB file per request and is deliberately a development facility, not production delivery infrastructure. No final compression.

Implementation reference fetched through Context7: [Next.js video guidance](https://nextjs.org/docs/app/guides/videos). Browser measurements govern the LCP conclusion above.

## 7. Responsive results and verification

| Viewport | Existing hero height | Result |
| --- | ---: | --- |
| 1366×768 | ~762.4px | Copy/nav/CTA clear; architectural join needs refinement; no shift. |
| 1440×900 | 900px | Taller centred crop preserved; all five timestamps captured; no shift. |
| 1728×1000 | ~964.5px | Copy/nav/CTA clear; same plinth limitation; no shift. |
| 1920×1080 | ~1071.6px | Copy/nav/CTA clear; plinth overlap remains visible at native size; no shift. |

- Typecheck passed.
- Lint passed: zero errors, 70 existing warnings.
- Content check passed with existing warning findings.
- Default `npm run build` passed with Turbopack; no webpack fallback needed. Release guard remains in force.
- Unit tests: 20 passed.
- Development masked Chromium suite: 16 passed; production-only check skipped.
- Production H-01/H-02/homepage/masked regression suite: 32 passed; 16 development cases skipped.
- Local agent-browser check: page loaded, meaningful controls rendered, no framework error overlay. Matrix captured no page errors.

Tests use local endpoints with lead/email credentials disabled. No real leads/messages sent. Earlier intermediate failures (video width limit, VIDEO LCP, autoplay attribute bypassing the mocked play rejection, and interaction before hydration in the test) were corrected and the final affected matrix rerun.

## 8. Screenshots and review

Evidence stays in the ignored local directory, not production assets or Git binary history. Links require this workspace/archive.

- [Raw versus retimed contact sheet](../../.local-evidence/h03-masked-2026-09-28/comparison-contact-sheet.png)
- [Four-size raw endpoint sheet](../../.local-evidence/h03-masked-2026-09-28/responsive-contact-sheet.png)
- [Default H-01 at 1440](../../.local-evidence/h03-masked-2026-09-28/h01-default-1440.png)

| 1440×900 | 0s | 1s | 2.5s | 4s | 5s |
| --- | --- | --- | --- | --- | --- |
| Raw | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-1440-0s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-1440-1s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-1440-2.5s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-1440-4s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-1440-5s.png) |
| Retimed | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-retimed-1440-0s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-retimed-1440-1s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-retimed-1440-2.5s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-retimed-1440-4s.png) | [Frame](../../.local-evidence/h03-masked-2026-09-28/masked-retimed-1440-5s.png) |

Development switches:

- `http://127.0.0.1:8136/?hero-motion=masked` — raw.
- `http://127.0.0.1:8136/?hero-motion=masked-retimed` — existing retime.

Both disable the old static Cut debug overlay if its query parameter is also supplied. First click/key after loading starts the experiment; no added UI or content. `playwright.h03-masked.config.ts` targets an independently started, task-owned development server on port 8136. Production tests use the standard configuration and `H03_PRODUCTION=1`.

## 9. Recommendation and stop

**B. MASKED H-03 NEEDS SMALL CODE REFINEMENT.** Salvage is credible enough to retain this development experiment. Readability is solved; foreground continuity and the interaction-start compromise remain review items. Prefer raw; do not create another retime or regenerate automatically.

H-01 desktop and H-02 mobile remain production/default media. No Higgsfield calls, new media, H-04, final Ninja Cut animation, homepage/lower-section redesign, deployment, merge, commit or push performed. Stop at this report.
