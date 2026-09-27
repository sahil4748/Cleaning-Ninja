# DESKTOP HERO ART-DIRECTION REPORT

> Historical checkpoint. Superseded captures are preserved only in the ignored local stabilization archive; archive links do not resolve in a fresh clone. See [stabilization inventory](repository-stabilization-inventory.md).

2026-09-27 · `rebuild-2026` · local desktop refinement, pending visual approval.

Only `app/homepage.css`, `components/homepage/HomeHeader.tsx`, the focused H-01 test and this report/capture directory changed in this refinement. Existing working-tree work was preserved. Styles are scoped to the header and H-01 at widths of 1200px and above. No media generation, dependency changes, mobile H-02 work, lower-section redesign, deployment or merge.

## 1. Header changes

The initial 88px header overlays H-01 with a transparent background. Navigation sits over the light ceiling; a soft, local ceiling exposure overlay supports charcoal labels without a panel, blur or shadow. At 80px scroll it becomes warm ivory with a restrained 1px divider and the olive quote control. Returning to the top restores transparency. Colour changes take 200ms; reduced motion disables transitions. The passive scroll listener is cleaned up on unmount and checks restored scroll position on mount.

Existing navigation destinations, communication dialog and keyboard behavior remain. At widths below 1200px, the prior solid header presentation remains unchanged.

## 2. Logo treatment

The original mark and wordmark PNGs remain unchanged. Header mark reduced from 40px to 28px wide; wordmark window reduced from 133px to 102px. The approximately 160×48px lockup aligns with the hero's left inset, including at wide desktop sizes. Original Brand structure and footer presentation are retained.

The supplied assets contain opaque ivory backgrounds. A compact ivory backing gives them one clean perimeter on the dark image. This is a deliberate asset constraint and still an approval consideration; no recolouring, transparency extraction or invented logo was used.

## 3. Typography changes

Instrument Serif and Manrope retained, with every supplied word unchanged. Desktop headline is approximately 69px / 73px / 87px / 97px at the four requested widths, with 0.99 line-height. Both headline lines stay within the dark architectural threshold.

Visual comparison with the previous italic treatment favoured upright “calm.”: it makes the whole statement more direct and reduces the fashion-editorial inflection. This is a desktop-only CSS treatment; mobile remains as supplied.

Eyebrow is 11px Manrope. Supporting copy increased from 13px to 16px, with 1.65 line-height, full ivory colour and a controlled 330px maximum width. The hierarchy uses 24px above the headline, 28px below it, then 28px before the CTA.

## 4. CTA changes

Hero quote control is 216×58px minimum, with 13px Manrope, 2px corners, a quiet olive border and more separation between label and arrow. Olive fill and ivory lettering remain. Hover darkens the fill and moves the arrow 3px diagonally over 200ms; no movement of the button body or bounce. The header control uses the same arrow motion at its smaller 44px height.

Existing two-colour keyboard focus treatment is preserved and checked. Reduced motion removes the transition. The hero quote link still navigates to the existing quote section.

## 5. Composition changes

H-01 begins at the top edge beneath navigation. Logo and copy share a bounded left inset; copy width is calculated from the measured architectural threshold at 36.3% of source width, leaving 24px clearance. Content is vertically balanced at 48% of the image height.

No image transform or zoom. Native-ratio height is capped at the viewport height, preserving effectively the full image at all four requested sizes. The existing secondary exploration arrow is hidden on desktop to leave a single hero action; the illustrative-image caption remains.

| Viewport | Hero height, rounded | Ivory visible below hero | Headline |
| --- | ---: | ---: | ---: |
| 1366×768 | 762px | 6px | 69px |
| 1440×900 | 804px | 96px | 73px |
| 1728×1000 | 964px | 36px | 87px |
| 1920×1080 | 1072px | 8px | 97px |

The ivory below H-01 is the existing following section, not additional hero padding. At 1440 this is the cost of preserving the complete image rather than forcing a viewport-filling crop.

Original image SHA-256 remains `5c7871e1b311271575ad1e7b483044e9f47fb350a15852e052f203316b923cff`.

## 6. Cut-preview changes

Development-only `http://127.0.0.1:8136/?ninja-cut=1` retains the opt-in mechanism. The desktop mask now follows the threshold down to the stone reveal, then turns along the oblique plinth geometry. It is mapped in the source image's aspect ratio so centred image cropping and the mask remain aligned.

Stone tint is approximately 3.9% opacity. The prior one-pixel seam is removed. No glow, green seam, displacement, animation or before/after claim. Verified hidden by default and static when enabled. Production checks confirm the preview element is absent. Mobile preview remains hidden.

## 7. Responsive observations and validation

All four requested desktop compositions were visually inspected. Complete headline, service clarification and CTA fit in the first viewport; navigation stays over the lighter ceiling. No horizontal overflow. The strongest hierarchy improvement is the now-readable service sentence and upright headline. The 1920 layout keeps the same logo scale while the headline grows with its architectural space.

Existing 320/375/390/430 mobile and 768/1024 intermediate checks pass. Their prior composition and mobile poster remain unchanged. The new overlay art direction begins at 1200px.

- Typecheck passed.
- Lint passed: 0 errors, 70 existing warnings.
- Content scanner and preview release guard passed during production build; scanner retains four medium findings. Production release remains blocked by existing readiness rules.
- Production build passed.
- Unit tests: 20 passed.
- Focused Chromium suite: 21 passed initially; one quote-form alert-focus assertion failed. That single test passed on an isolated rerun. This is a timing caveat, not a claim of a clean first-run suite. Quote form code was not changed.
- All six H-01 tests passed, including four desktop captures plus ordinary/reduced-motion scroll-state, focus and quote navigation checks.
- Local sampled CLS: 0. No browser page errors observed.
- Development-only preview checked separately. Next.js developer tooling was hidden only for clean captures.
- Whitespace check passed.

The agent-browser CLI was unavailable; installed Playwright Chromium provided browser verification. Checks ran on isolated local port 8136 with database/email delivery credentials disabled. Test data was synthetic; no real leads or messages sent. No real-device Safari or complete accessibility audit is claimed.

## 8. Screenshots

- [1440×900 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1440.png)
- [1366×768 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1366.png)
- [1728×1000 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1728.png)
- [1920×1080 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1920.png)
- [1440×900 Cut preview](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/cut-preview-1440.png)
- [Scrolled header at 1440](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/header-scrolled-1440.png)
- [CTA keyboard focus at 1440](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/cta-focus-1440.png)

## 9. Anything still preventing cinematic approval

1. The photographic subject still carries an interiors association. Stronger service copy and the actual brand improve identification, but owner review must decide whether the campaign now feels sufficiently distinct.
2. The small ivory logo backing remains visible against the dark threshold because it preserves the supplied opaque assets.
3. The 96px reveal of the next section at 1440×900 needs visual acceptance alongside the complete-image composition.
4. Cut geometry is only a static candidate. Traversal, timing and final states are not designed or approved in this task.
5. The approximately 22MB original PNG still relies on responsive Next image optimisation. Final media delivery budgeting remains future work.

STOP. No video generation, Higgsfield calls, mobile H-02 changes, lower-homepage redesign, deployment or merge.
