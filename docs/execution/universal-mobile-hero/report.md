# UNIVERSAL MOBILE HERO ART DIRECTION REPORT

2026-09-28 · `rebuild-2026` · Development-only · Owner review pending

**Recommendation: C — H-02 SHOULD BE REPLACED.** H-02 can support a usable responsive hero. It does not support the exceptional, universally cinematic mobile system requested here through art direction alone. The room is already cropped in the source; making it more prominent enlarges its traditional furniture and reduces the foreground. This conclusion is about the static image, without assuming future motion will help.

## 1. H-02 source diagnosis

Inspected the exact 3072 × 5504 source before implementing the studies: `public/homepage/hf_20260927_092222_11c8acc0-5d6c-4011-8c6e-e296ed798105.png`.

The near door, blue-black wall, stone console, chair/window and floor provide genuine layered depth. The cool foreground and warm room create useful visual tension. However, roughly two-thirds of the source width belongs to dark foreground/wall; the unobstructed deeper room begins around 76% across the image. These are visual landmark estimates, not a segmentation measurement. The right edge already truncates the room and window.

The frame is narrow and threshold-heavy. The traditional timber window, radiator and armchair become stronger stylistic signals when magnified. The image has cinematic lighting but limited narrative information: it can easily become an atmospheric background behind interface content. Its strongest depth cues are the console and diagonal floor; cropping them to amplify the room is a costly trade.

**Critical answer:** enough information for a consistent, functional responsive system; insufficient information for an exceptional cinematic system across compact, standard and tall phones under the current restrictions. Neither previous expenditure nor hypothetical H-04 improves the still.

Source SHA-256: `e6d526e625fac745945e45c60f5f5ec8587546b29410da61e0cee5c0d2a8bfdd`. The file was not edited.

## 2. Responsive composition diagnosis

Exactly three opt-in studies exist: `?mobile-hero=a`, `?mobile-hero=b`, `?mobile-hero=c`. Each uses D's unchanged semantic content and typography. At 768px and above these URLs render locked D, including its existing tablet treatment. Valid mobile parameters take precedence over conflicting hero-design/motion/Cut parameters, so this remains a static comparison.

The system uses two compression conditions and one modest large-screen adjustment:

- **Compact/compressed:** width below 360px or viewport height at most 700px. Smaller type, shorter copy/action spacing and a wider relative support column.
- **Standard:** 360–409px with sufficient height. Fluid title size and inset; stepped text territory for A; narrower copy for B; separate upper/lower registers for C.
- **Large:** 410px and wider with sufficient height. Same composition, slightly increased A/B copy-to-action spacing. No model-specific layout.

An initial width-specific headline-position jump was removed. Title placement now follows fluid viewport rules. The 700px transition changes copy sizing/spacing and alignment, not the image or available controls. The 409/410px transition adds only 4px to A/B action spacing.

The original centered cover crop is not equally persuasive at all heights. At 393 × 852, source-coordinate projection places the inner room edge at approximately 81.5% of the screen under centered cover, versus 71% under right-aligned cover. This is why right registration is useful. It preserves the same right edge; it cannot reveal missing room content.

## 3. Study A — Threshold Drama

Full-height, right-aligned cover; upright two-line Instrument Serif title around 23svh; stepped second line, support and CTA. The dark wall carries the information while the warm room remains open on the right. No image overlay, filter or additional blur.

This is the most coherent conversion composition. It avoids the deepest centered-crop tunnel effect and has the clearest relationship between message and action. Its limitation is that the text still reads as a compact web-content group over a photograph. On compact/short phones, the bright reflected patch in the near door intersects the first headline letters and supporting copy. On larger phones, the broad wall remains more prominent than the destination room.

Static cinematic gate: **compact — weak; standard — controlled but not exceptional; large/tall — coherent, still wall-dominant.**

## 4. Study B — Room Reveal

Right-aligned cover enlarged 14%, with transform origin at the right edge and 72% down the image. A slightly smaller, unstepped headline and narrower support column leave more territory for the room.

This produces the strongest room reveal of the three, especially at 393–440px. At 393 × 852 the estimated inner-room edge moves from 71% to 67% of viewport width. That is a useful but limited gain. The stronger chair, radiator and timber trim make the room feel more traditional, while some of the near-door context disappears.

At 320 × 568 the CTA reaches into the console region. At 360 × 800, the narrower body column needs more lines, recovering some of the stacked-content feeling. The first line of the headline approaches the threshold jamb on standard phones. It remains readable in the reviewed captures but has little room for additional expressive scale.

Static cinematic gate: **compact — compromised; standard — stronger depth, restricted typography; large/tall — stronger reveal, source style remains limiting.**

## 5. Study C — Editorial Portrait

Right-aligned full-height cover; a larger stepped headline in the upper register; support and CTA held near the lower left. The lower register moves with a clamped viewport rule, preserving bottom clearance rather than stretching one fixed pixel layout.

This is the most deliberate poster relationship. The architecture has an uninterrupted interval between headline and action, and the console remains visible. However, that interval mainly exposes the dark wall. At 393 × 852, approximately 369px separate the title's bottom from the support's top; at 440 × 956, approximately 418px. That is empty architectural surface, not additional storytelling. The compact version is tighter, but the headline still crosses the foreground reflection.

Static cinematic gate: **compact — poster-like but contrast-compromised; standard — intentional, underfilled; large/tall — excessive empty wall.** A distinctive layout alone does not make this source sufficiently compelling.

## 6. Compact-phone findings

320 × 568 and the short 375 × 667 reference were inspected, as were reduced 320 × 480/520 viewports. All studies retain two headline lines, supporting copy and a visible primary action. No horizontal overflow or control overlap was found in the tested range.

At 320 × 568, headline size is approximately 36px, body copy 13px, and the hero CTA is 48px high. CTA bottoms are approximately 360px (A), 362px (B) and 520px (C). C is the closest to the bottom but retains 48px clearance. The source's broad foreground reflection is the main visual weakness; B also crowds the console with its action.

A/B compress into similar layouts on short screens. Their distinction survives primarily in the crop. C retains its separated registers, but the available architecture cannot give its compact version the same expansive impression as a larger phone.

## 7. Standard-phone findings

Validated 360 × 800, 365 × 780, 375 × 812, 390 × 844, 393 × 852 and 402 × 874. The additional 365px reference prevents treating a named iPhone width as the composition's only target.

At 393 × 852, A/B/C title sizes are approximately 46/44/48px. All copy remains in the first viewport. Right alignment is clearly more useful than centered cover. A provides the clearest reading sequence; B uses more of the room; C has the strongest editorial separation but the largest unproductive gap. At 360px, B's body wrapping is noticeably denser than at 393px. None collapses mechanically, but none removes the source limitation.

## 8. Large/tall-phone findings

Validated 412 × 915, 415 × 880, 430 × 932 and 440 × 956. The 415px intermediate reference also changes the aspect ratio rather than merely repeating a taller version of the same width.

At 440 × 956, A/B/C title sizes are approximately 52/50/54px. The image retains its floor and console; the room reads more easily than with centered cover. B has the widest reveal. C's headline and action are both accessible, yet their separation exaggerates the empty wall. Extra height does not create a richer image.

The tallest required screen is 956px; this report does not claim an unlimited height guarantee.

## 9. Typography observations

Instrument Serif and Manrope are unchanged. All locked wording is preserved exactly. The headline stays on two lines at every required reference. A and C retain controlled stepped alignment; B removes the step to reserve room territory. Support is 13px/1.6 in the compressed family and 14px/1.65 otherwise.

No new shadows were used to conceal contrast problems; the study overrides also remove the inherited hero text shadows. The thin serif strokes over the near-door reflection are visibly less secure at compact/short aspect ratios. Geometric visibility is not a text-over-photograph contrast certification. Enlarging the headline further would increase its collision with the doorway.

## 10. Header observations

All four functions remain: existing logo/home link, communication sheet, Get Quote and menu. The logo assets and their existing wordmark crop are unchanged. The D mobile scale transform is removed only within these studies so that the actual logo link retains a 44px hit height.

The shared study header has a 76px base height plus any top safe inset; all controls have at least 44px hit height. Action gaps range from 4–6px. Every required width, including 320/360/375/390/393/402/412/430/440, passed non-overlap and viewport-bounds checks. At 320px the header is dense and its ivory-backed logo remains a conspicuous rectangle, but no function is removed. The header occupies a greater share of a compact viewport, as expected.

Communication/menu opening, closing, Escape focus return, keyboard access, both quote anchors and the scrolled header state were exercised. Tests did not call a phone number or submit a lead.

## 11. Media-fit findings

[Controlled media-fit sheet](media-fit.png): six temporary CSS comparisons on the same B study, not additional public study routes.

| Fit | Result |
|---|---|
| Centered cover | Narrowest useful room reveal on tall screens; excessive dark-wall dominance |
| Right-aligned cover | Best preservation of the source's existing room edge; used by A/C |
| Contain | Preserves the entire source, but introduces conspicuous top/bottom bands and reduces immersion |
| Right-aligned 1.14 scale | Widens the room's screen share; used by B; magnifies traditional details and loses foreground context |
| Scale plus −3% vertical translation | Moves furniture upward, sacrifices floor context; adds no missing room information |
| Shorter 84% media container, bottom-aligned | Less cover crop but a prominent top seam/band; weakens the full-viewport image |

All comparisons use the same H-02 source and existing image pipeline. No edited asset, generated pixels, broad dark overlay, image filter or blur was introduced.

## 12. Safe-area / dynamic viewport observations

The hero uses `100svh` for a stable composition when browser toolbars change. `dvh` is deliberately not used for continuous reflow: it would move the poster's two registers as browser chrome expands/collapses. A 480px minimum with inset-aware content clearance prevents collapse at unusually short heights; below the tested 480px viewport, first-viewport completeness is not promised and scrolling may be needed.

Top/left/right safe-area values feed header spacing; top/bottom values feed hero placement and clearance. The existing site does not opt into `viewport-fit=cover`; native browsers may therefore manage the unsafe area themselves and report zero CSS insets. No global viewport metadata was changed.

Tests resized between short and tall viewports and injected **synthetic** 47px top, 34px bottom and 16px side inset values at 393 × 740. These checks passed. They are not a simulation of an actual Safari toolbar/notch. Chromium touch/mobile emulation was used; native iOS Safari, Android browser chrome, text scaling and physical-device safe areas remain unverified. No claim of real-device certification is made.

## 13. Responsive failure audit

“Works” below means mechanically usable, not that it passes the cinematic quality gate.

| Study | Smallest width / shortest tested viewport | Largest required viewport | Weak family or transition | Header / CTA | Image / text collision |
|---|---|---|---|---|---|
| A | 320px; 480px-high stress test. Required 320 × 568 passes. | 440 × 956 retains all content and foreground depth | Compact reflection; large wall dominance. 700/701px changes copy treatment; no overlap. | No header overlap or CTA clipping; compact header remains dense. | Serif/body cross the reflected door patch on short frames; warm room remains peripheral. |
| B | 320px; 480px-high stress test. Required 320 × 568 passes. | 440 × 956 gives the widest room reveal | 360 × 800 has denser support wrapping; magnification weakens foreground context in every family. | No CTA clipping; compact action approaches/covers console territory. | Headline approaches jamb; crop amplifies chair/radiator/window instead of revealing new architecture. |
| C | 320px; 480px-high stress test. Required 320 × 568 passes. | 440 × 956 retains CTA with roughly 109px bottom clearance | Large/tall empty interval is the principal artistic failure; short version has much less breathing room. | No header overlap or CTA clipping. Closest required CTA is 48px above bottom at 320 × 568. | Compact headline crosses reflection; lower copy lies over door/baseboard texture; tall wall lacks sufficient detail. |

Boundary probes: 359/360px, 409/410px and 700/701px. Additional dynamic-height probes: 320 × 480, 320 × 520, 393 × 740 and return to 393 × 852. No hidden overflow fixes or removed controls were used. The initial width-based title jump was corrected, not omitted from the audit.

The 480px checks establish only a tested lower bound, not the absolute shortest possible screen. No study passes the requested exceptional-static-cinema gate across all three families.

## 14. Lower-page owner feedback recorded

Owner feedback is preserved in `docs/product/owner-decisions.md`:

- Package/deal area remains visually unfinished.
- Service presentation remains unapproved.
- Lower-page typography and spacing are not final.
- Current lower homepage rhythm is not representative of final quality.

No lower section was redesigned. Lower-section DOM equality is covered by the focused suite.

## 15. Screenshots / contact sheets

Primary sheets: [COMPACT · 320 × 568](comparison-320.png), [STANDARD · 393 × 852](comparison-393.png), [LARGE · 440 × 956](comparison-440.png).

| Primary reference | A — Threshold Drama | B — Room Reveal | C — Editorial Portrait |
|---|---|---|---|
| 320 × 568 | [A](a-320x568.png) | [B](b-320x568.png) | [C](c-320x568.png) |
| 375 × 812 | [A](a-375x812.png) | [B](b-375x812.png) | [C](c-375x812.png) |
| 393 × 852 | [A](a-393x852.png) | [B](b-393x852.png) | [C](c-393x852.png) |
| 412 × 915 | [A](a-412x915.png) | [B](b-412x915.png) | [C](c-412x915.png) |
| 440 × 956 | [A](a-440x956.png) | [B](b-440x956.png) | [C](c-440x956.png) |

All twelve sizes per study: [A matrix](matrix-a.png), [B matrix](matrix-b.png), [C matrix](matrix-c.png). [Measured bounds and media settings](measurements.json). Full-resolution secondary captures and synthetic-inset captures are retained locally in `.local-evidence/universal-mobile-hero/`.

## 16. Technical checks

Final check results are recorded in [verification](verification.md). Tests use an isolated local port 8136, refuse unknown-server reuse, and clear application database/email credentials. No real leads or messages were sent.

Desktop D, the default hero, lower-section implementation, media sources and H-03 implementation remain unchanged. Development-only activation is guarded by `NODE_ENV`; production-query rejection is checked against a local production build. The new CSS is scoped to the study attribute and widths below 768px.

## 17. Recommendation

**C — H-02 SHOULD BE REPLACED.**

The limiting factor is the source composition: a large dark threshold, a room already cropped at the right edge, and a traditional destination that becomes more dominant when zoomed. Responsive art direction improves usability and can establish a recognizable family, but it cannot supply the missing architecture or make the tall poster's empty wall compelling.

This is not a request to generate anything now. No study is activated by default or marked owner-approved. H-01 desktop static/H-02 mobile static remain the production baseline; H-03 is preserved and inactive; H-04 does not exist. No commit, push, deployment or merge was performed. Stop at this report.
