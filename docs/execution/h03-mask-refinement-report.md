# H-03 MASK REFINEMENT REPORT

2026-09-28 · `rebuild-2026` · raw H-03 only · development visual refinement.

**Recommendation: A. APPROVE H-03 MASKED COMPOSITION** for the next owner visual gate. The lower-return adjustment hides the displaced stone/base edge in the requested samples and preserves the room reveal. This is a recommendation, not recorded owner approval, production-motion approval or release authorisation.

## 1. Previous defect

The previous mask returned directly from `(59.3%,81%)` to `(24%,100%)`. During the camera move, the raw video's lower stone face and bright base strip extended below that return. The retained H-01 face then appeared stacked above a second moving face.

At the requested sampling resolution the mismatch is faint at 1s, clear by 2–2.5s, and especially obvious at 4–5s. This identifies its onset within those samples, not an exact first offending source-frame number. The upper threshold and text-safe territory were already successful and remain unchanged.

## 2. Geometry changes made

Only the lower return of the CSS mask changed:

- Kept the original threshold, top diagonal, plinth tip and tip's lower endpoint.
- Added one control point at `(54.8%,88.15%)`.
- Moved the bottom return from `(24%,100%)` to `(43.5%,100%)`.
- Kept Gaussian feather sigma at 1.2 source-mask units, approximately 1.6–2.3 screen pixels across the tested sizes.

The added strip retains the H-01 base, contact shadow and a small adjacent floor region over the displaced moving base. Static coverage increases from approximately **39.69% to 41.68% of the source plane**, an increase of **1.99 percentage points**. This does not turn half of the room into a static panel.

A trial extending the right tip by 0.5 percentage points exposed a small unwanted static sliver beside the tip. That extension was discarded; the final tip is unchanged. No broad blending, new shading or image manipulation was used.

Runtime change in this refinement: the encoded mask path and its explanatory comment in `app/homepage.css` only. `NinjaMedia.tsx`, media delivery, interaction-start behavior, typography, header, CTA and lower sections were not edited in this refinement. Pre-existing uncommitted salvage work remains in the workspace.

## 3. Final mask coordinates

Static H-01 territory, in source percentages:

```text
(0,0)
→ (36.3,0)
→ (36.3,73.6)
→ (59.3,67.8)
→ (59.3,81)
→ (54.8,88.15)
→ (43.5,100)
→ (0,100)
```

The actual inverse CSS mask uses a `1000 × 558.14` viewBox. Its unchanged rounded upper values and final lower values are:

```text
M363 -20 H1020 V580 H435 V558.14
L548 492 L593 452.09 V378.42 L363 410.79 Z
```

The added point's exact percentage Y is `492 / 558.14 × 100`, approximately 88.150%. Mask size, source-plane alignment and centred crop behavior are unchanged. The mask remains static throughout playback.

## 4. Seam result across the raw timeline

All captures include the actual unchanged DOM at 1440×900.

| Time | Lower join result |
| --- | --- |
| 0s | Single foreground face/base; no extra tip sliver. Existing source handoff detail differences remain. |
| 1s | Early exposed base strip is covered; the near stone face reads as one foreground object. |
| 2s | The moving lower face stays hidden rather than emerging beneath the static wood/stone. |
| 2.5s | Previously conspicuous doubled face is removed; plinth-tip silhouette remains intact. |
| 3s | Lower return continues to cover the displaced base as the room advances. |
| 4s | No second stone face or sliding blue/dark base strip in the inspected image. |
| 5s | Single retained base/contact shadow; room and rug continue behind it. No duplicated stone endpoint. |

The revised boundary reads primarily as foreground occlusion/contact shadow, rather than a second architectural edge. No obvious split-screen, broad blur, ghosted stone, coloured line or animated mask was introduced. The room's table, seating, windows and rug retain the original raw movement; the clip duration, frames and timing are unchanged.

## 5. Responsive and layout result

| Viewport | Captures | Result |
| --- | --- | --- |
| 1440×900 | 0, 1, 2, 2.5, 3, 4, 5s | Double-edge hidden throughout the sampled timeline; room reveal retained. |
| 1366×768 | 5s | Same clean stone silhouette and lower occlusion. |
| 1728×1000 | 5s | No duplicated plinth endpoint; useful room depth retained. |
| 1920×1080 | 5s | Native-size inspection confirms a single stone face/base. |

Automated Playwright/Chromium assertions passed for all four sizes: hero and copy bounding boxes unchanged, **CLS 0**, no page errors. At 1440, the `(60,200,395,450)` typography/CTA pixel region is byte-identical to the pre-refinement baseline at every requested time. No DOM copy, typography, CTA or header changes.

Required repository checks passed: typecheck, lint (0 errors / 70 existing warnings), content check (existing warning findings), production build using the default Turbopack command, and all 20 unit tests. Focused browser verification covered the raw-only requested timeline/endpoints. This refinement did not rerun retimed comparisons or claim new Safari/Firefox coverage.

## 6. Remaining visual mismatch and scope

At close inspection, a small floor-tone/texture discontinuity can still be found below the retained contact shadow late in the clip, particularly around 3–5s. It is substantially less conspicuous than the removed second stone face; at normal hero viewing size I do not judge it to read as an obvious architectural seam. This is not a claim of pixel-perfect registration between two different camera states. The contact-shadow/floor region is the area to scrutinise in owner review.

The existing still-to-first-frame room-detail change and raw clip's late travel/stop remain unchanged. This task does not approve those temporal characteristics for production.

Interaction-start remains exactly as before: load the development URL, then click the room or press a key to play. No autoplay/LCP work, new dependency, WebGL, canvas or application JS frame loop. H-01 remains the desktop default, H-02 remains mobile, and all existing motion fallback gates are unchanged. Raw source bytes were not modified. No retime created or refined.

## 7. Screenshots and contact sheets

Evidence is local and ignored, outside production assets and Git binary history:

- [Lower join: previous versus refined](../../.local-evidence/h03-mask-refinement-2026-09-28/join-before-after.png)
- [Seven-frame timeline](../../.local-evidence/h03-mask-refinement-2026-09-28/timeline-contact-sheet.png)
- [Four desktop endpoints](../../.local-evidence/h03-mask-refinement-2026-09-28/responsive-contact-sheet.png)
- [Verification measurements](../../.local-evidence/h03-mask-refinement-2026-09-28/verification.json)

1440×900 frames: [0s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-0s.png), [1s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-1s.png), [2s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-2s.png), [2.5s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-2.5s.png), [3s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-3s.png), [4s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-4s.png), [5s](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1440-5s.png).

Other endpoints: [1366×768](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1366-5s.png), [1728×1000](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1728-5s.png), [1920×1080](../../.local-evidence/h03-mask-refinement-2026-09-28/final-1920-5s.png).

The local evidence directory also preserves baseline/candidate images and the capture, verification and contact-sheet scripts. It requires the current workspace and original H-03 archive; these are not fresh-clone assets.

Review URL: `http://127.0.0.1:8136/?hero-motion=masked`. Click the room or press a key after loading; reload to replay.

## 8. Recommendation and stop

**A. APPROVE H-03 MASKED COMPOSITION** for owner visual review. The specific duplicated/sliding plinth defect is resolved in the inspected samples using only a local geometry adjustment. The small residual floor texture mismatch is disclosed above and visible in the detailed evidence.

No Higgsfield, new media, H-04, Ninja Cut animation, redesign, deployment, merge, commit or push. Stop at this report; production-motion integration remains a separate decision.
