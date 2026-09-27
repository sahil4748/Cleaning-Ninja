# H-03 MOTION INTEGRATION REPORT

> Historical checkpoint. Superseded captures are preserved only in the ignored local stabilization archive; archive links do not resolve in a fresh clone. See [stabilization inventory](repository-stabilization-inventory.md).

> Stabilization update: live comparison logic and public MP4s were removed; source snapshots and local archive details are in [experiment disposition](../../experiments/h03/README.md). URLs and commands below describe the historical evaluation.

2026-09-27 · `rebuild-2026` · development comparison only; no production motion approval or release.

**Recommendation: C. H-03 REQUIRES REGENERATION for the existing locked hero composition.** Retiming improves the settling trajectory but cannot preserve the dark area behind the DOM text. Keep H-01 as the desktop base. This recommendation does not authorise or trigger generation.

## 1. Raw H-03 observations

Copied the exact supplied `hf_20260927_094554_979265c6-0d56-46f6-a4db-c79a577593b5.mp4` to `public/homepage/h03-desktop-raw.mp4`. Both SHA-256 values are `3e8045159b95c6a1ea80550f9feb75475f9405ac9c4bda01c3dbfd55a3514b61`. The original download and repository copy are unchanged. The clip has 121 frames, lasts 5.041667 seconds and contains one video stream, no audio.

Integrated only as an opt-in development source. The default page and production build still use H-01/H-02 stills. Desktop motion is gated at 1200px, matching the actual desktop header/composition; tablet also stays static. All typography, navigation, logo and CTA remain DOM content above the media.

## 2. Scene continuity

The shot retains the room, fireplace, stone foreground, sofa, table, chair and warm daylight throughout the sampled sequence. The forward reveal/parallax feels spatially connected, with no hard scene cut observed. This is illustrative media, not evidence of a completed job.

The H-01 poster and H-03 first frame are close but not pixel-identical: furniture/textile detail and small edge positions settle when the generated footage replaces the still. Compare the [poster](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/h01-fallback-1440.png) with the [raw first frame](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-start.png). There is no deliberate transition effect, black gap or fade to blank; the image stays underneath until a video frame is presented. Do not describe the handoff as a perfectly invisible match.

## 3. Camera motion

The raw sequence starts restrained and covers substantially more foreground/threshold displacement later. It ends while the composition still suggests forward travel rather than an intentional settled hold. The large dark architectural region retreats almost entirely from behind the headline.

The retimed sequence advances through more of the source early and gradually approaches its end. It stops on the original last frame at 4.375 seconds and holds for 0.667 seconds. This addresses temporal intent, but not spatial composition.

## 4. Typography-safe review

Checked the actual DOM geometry at 0, 1, 2.5, 4 and 5 seconds in both variants at all four requested sizes. Visually inspected the five-time sequence at 1440×900 and final compositions at the other three sizes. Screenshots are evidence of visual judgement, not a pixel-by-pixel WCAG contrast certification.

| Time | Raw | Retimed |
| --- | --- | --- |
| 0.0s | Headline, eyebrow and supporting copy have strong separation against the dark threshold. | Same first source frame; same separation. |
| 1.0s | Dark area still protects most copy. | Reveal is further advanced; threshold approaches the right-hand headline letters. |
| 2.5s | At 1440px the reveal reaches “space”; supporting text is largely still against darker material. | Bright window/glass is already behind headline and supporting text; substantially weaker separation. |
| 4.0s | Bright glass/window and architectural edges compete with both white text blocks. | Nearly final; weak separation persists. |
| Final | Headline and small supporting copy cross glass, foliage and bright window edges. Not approved as a typography-safe final hero. | Same composition and failure, held longer. |

The eyebrow remains more legible than the longer text blocks, though its background changes from dark threshold to timber. The solid olive CTA and its lettering remain distinct throughout; their internal contrast does not depend on the video. Header identity is protected by the existing ivory logo treatment; navigation remains readable against the existing light ceiling treatment in the inspected frames. Neither control group solves the body-copy issue.

**No new shadow, gradient or black panel was applied.** Existing desktop ceiling/left-edge treatments are unchanged. A tiny shadow might sharpen glyph edges, but would not restore the broad dark copy region lost in this shot. A materially stronger backing treatment would be a separate design decision, outside this checkpoint.

## 5. Retiming method

Used the full FFmpeg 7.1.1 binaries already bundled with Android Studio, extracted to a temporary directory. No package installation, runtime dependency, AI, optical flow or interpolation.

Reproducible script: [`scripts/retime-h03.py`](../../scripts/retime-h03.py). Run from the repository with `FFMPEG=/path/to/existing/ffmpeg python3 scripts/retime-h03.py`.

Decode the source to temporary native-size YUV420 frames. For output frame `n` (0–120), use:

```text
t = n / 24
u = min(t / 4.375, 1)
source_frame = floor(120 × (1 − (1 − u)^2.2))
```

Encode selected original frames at constant 24fps with the available OpenH264 encoder, 12Mbps requested preview bitrate and MP4 fast-start. Frame selection preserves the first and final frames, ordering, dimensions and crop. No colour filter, scene change, artificial blur or geometry processing. Ordinary lossy re-encoding means pixel equality is not claimed. Temporary decoded media is removed automatically.

| Output time | Source frame | Source time |
| --- | --- | --- |
| 0.0s | 0 | 0.0s |
| 1.0s | 52 | 2.167s |
| 1.5s | 72 | 3.0s |
| 2.5s | 101 | 4.208s |
| 3.5s | 116 | 4.833s |
| 4.0s | 119 | 4.958s |
| 4.375–5.042s | 120 | 5.0s |

The exact [frame map](h03-screenshots/frame-map.json) records 80 unique source frames in 121 output frames. Without interpolation, slowing a 24fps source requires duplicates. The penultimate source frame lasts 11 output frames (0.458s) before the final hold. Thus the preview achieves near-stillness through increasingly sparse updates, not newly captured smooth slow motion. **A constant 24fps file is not proof of judder-free movement; this preview is not approved as production-smooth.**

## 6. Raw versus retimed

Raw preserves the original cadence and postpones the most serious copy interference, but accelerates into its ending. Retimed gives a clearer early reveal and a definite hold, but introduces repeated-frame cadence and reaches the unsafe text background sooner. Both finish on the same scene. Temporal salvage alone cannot satisfy the locked composition and readability requirements.

Development URLs (isolated local development server left running on port 8136 for review):

- `http://127.0.0.1:8136/?hero-motion=raw`
- `http://127.0.0.1:8136/?hero-motion=retimed`

Reload to restart/compare. No parameter means the usual still. Production ignores both parameters. The development Ninja Cut mask is disabled whenever either comparison parameter is active, including if `ninja-cut=1` is also present. No Cut animation implemented.

## 7. Performance and file information

| Property | Raw | Retimed preview |
| --- | --- | --- |
| Bytes | 4,744,955 | 5,505,164 |
| Decimal MB | 4.745 | 5.505 |
| Dimensions | 1920×1080 | 1920×1080 |
| Codec | H.264/AVC High | H.264/AVC Constrained Baseline |
| Pixel format | YUV420p | YUV420p |
| Rate / frames | 24fps / 121 | 24fps / 121 |
| Duration | 5.041667s | 5.041667s |
| Audio | None | None |

The preview encode is for evaluation, not final production compression. It is about 16% larger than the original.

H-01 retains its existing responsive image optimisation, eager loading and high fetch priority. The video source is attached only after page load, successful poster decode and two animation frames. The persistent picture supplies fallback even on error. Video uses `preload="none"`, muted inline autoplay, no controls and no loop. An autoplay request will still fetch video when permitted; `preload="none"` alone is not a bandwidth guarantee. The delayed source assignment prevents the MP4 from becoming a prerequisite for the initial image render.

Recommend **none**, rather than metadata, for a future approved hero using this poster-first pattern. Metadata provides no needed layout information here: dimensions are known and the media is absolutely positioned. Reduced motion, mobile, the default still page and browser-exposed Save-Data generate no video requests. Autoplay rejection and failed media load retain H-01. Changing to reduced motion during playback removes the video. Playback ends on its last frame without looping.

Local sampled CLS was 0 through autoplay and completion. No hero box movement was measured at the five checkpoints. These are local Chromium checks, not production LCP, network-budget or Safari/real-device certification. The poster-to-video detail change noted above remains a visual continuity limitation.

Implementation references retrieved through Context7: [Next.js video guidance](https://nextjs.org/docs/app/guides/videos) and [FFmpeg frame-rate/filter documentation](https://ffmpeg.org/ffmpeg-all.html). Final remapping uses explicit frame selection to guarantee both endpoints.

## 8. Responsive results and validation

The actual current CSS includes later H-01 refinements and an overlay header; it differs from the older H-01 integration report. Existing geometry was preserved.

| Viewport | Actual hero height | H-03 centred cover crop | Result |
| --- | --- | --- | --- |
| 1366×768 | 762.41px | Approximately 0.8% vertical total | No overflow or shift; final text background fails visual approval. |
| 1440×900 | 900px | 10% horizontal total | Taller existing composition preserved; final text background fails visual approval. |
| 1728×1000 | 964.45px | Approximately 0.8% vertical total | No overflow or shift; final text background fails visual approval. |
| 1920×1080 | 1071.63px | Approximately 0.8% vertical total | No overflow or shift; final text background fails visual approval. |

Both variants use unchanged centred `object-fit: cover`. All four retain header, full headline, supporting copy and CTA within the viewport. The final frame fits geometrically, but the architectural boundary no longer supports the text. H-02/mobile composition and lower-page visuals were untouched.

- Typecheck: passed.
- Lint: passed, 0 errors / 70 existing warnings.
- Content scan and preview release guard: passed with the existing warning-only content findings and production release blockers preserved.
- Default `npm run build`: failed in Turbopack's Google-font resolver (`next/font/google queries have exactly one entry`, Plus Jakarta Sans). No font/configuration repair was made in this bounded task.
- `npm run build -- --webpack`: passed, including all 99 generated pages. This is a local validation fallback, not a permanent script/configuration change.
- Unit tests: 20 passed.
- Development H-03 Chromium suite: 15 passed; 1 production-only test intentionally skipped. Includes eight variant/viewport cases, six fallback cases and playback/reduced-motion lifecycle with sampled CLS 0.
- Production Chromium regression suite: 30 passed; 15 development-only cases intentionally skipped. Covers H-01/H-02, homepage/mobile interactions, local synthetic form failure handling, and production ignoring motion parameters.
- Whitespace diff check: passed.

Browser/server execution required macOS sandbox escalation for local sockets; checks then completed. No real leads, messages or emails sent. All local server configurations explicitly disabled lead/email credentials. Existing H-02 screenshot artifacts were restored after regression captures to preserve that checkpoint.

Changed for this task: `components/homepage/NinjaMedia.tsx`, three hero-scoped CSS rules in `app/homepage.css`, preview source entries in `content/media.ts`, the two H-03 MP4s, `scripts/retime-h03.py`, `tests/h03-checkpoint.spec.ts`, `playwright.h03.config.ts`, this report/captures, and the scope records in current-phase/owner-decisions. Unrelated pre-existing working-tree changes were preserved.

## 9. Captures

All captures show the real DOM typography. Development tool badge hidden for clean capture only. [Comparison sheet](h03-screenshots/comparison-contact-sheet.png): raw top row, retimed bottom row; columns 0, 1, 2.5, 4 and 5 seconds.

| Variant | Start | 1 second | Middle (2.5s) | 4 seconds | Final full hero |
| --- | --- | --- | --- | --- | --- |
| Raw, 1440×900 | [Start](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-start.png) | [1s](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-1s.png) | [Middle](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-middle.png) | [4s](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-4s.png) | [End](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-end.png) |
| Retimed, 1440×900 | [Start](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-start.png) | [1s](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-1s.png) | [Middle](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-middle.png) | [4s](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-4s.png) | [End](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-end.png) |

Additional final states: [raw 1366](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1366-end.png), [retimed 1366](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1366-end.png), [raw 1728](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1728-end.png), [retimed 1728](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1728-end.png), [raw 1920](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1920-end.png), [retimed 1920](../../.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1920-end.png).

## 10. Recommendation

**C. H-03 REQUIRES REGENERATION**, if full-shot motion must fit the current unchanged hero. Neither raw nor retimed is recommended for production approval. The deciding failure is the disappearing dark copy region; retiming also cannot promise smooth slow motion from the available 24fps samples without the prohibited interpolation.

Keep H-01/H-02 as the default stills. A future authorised motion brief should constrain the left threshold throughout the shot and settle the camera before the final hold. Do not spend another credit automatically. A shorter early-only extract would abandon the requested full-shot/final composition and has not been substituted silently.

STOP: no Higgsfield calls, AI generation, H-04 work, Ninja Cut animation, new shadow/gradient, lower-page redesign, deployment or merge.
