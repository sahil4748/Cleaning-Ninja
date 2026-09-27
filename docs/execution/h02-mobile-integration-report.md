# H-02 MOBILE INTEGRATION REPORT

2026-09-27 · `rebuild-2026` · mobile visual checkpoint, pending owner approval. No release.

## 1. Media integration

Integrated the exact supplied `hf_20260927_092222_11c8acc0-5d6c-4011-8c6e-e296ed798105.png`, 3072×5504, into the hero below 768px. Original and repository copy share SHA-256 `e6d526e625fac745945e45c60f5f5ec8587546b29410da61e0cee5c0d2a8bfdd`. The source is unchanged: no generation, retouching, filter, image shade or additional zoom. Next `getImageProps`/`picture` delivers responsive derivatives of the selected source.

Desktop retains H-01 and its locked styling/crop. Its checksum remains `5c7871e1b311271575ad1e7b483044e9f47fb350a15852e052f203316b923cff`. The shared hero eyebrow and description use the owner's corrected wording on both mobile and desktop. The lower signature section explicitly retains its previous mobile and desktop images.

Application files: `app/homepage.css`, `components/homepage/Homepage.tsx`, `components/homepage/NinjaMedia.tsx`, new `components/homepage/HomeStickyQuote.tsx`, `content/media.ts`, and the exact H-02 PNG. Tests and current authority documents were updated. Existing unrelated working-tree edits were preserved. Original logo files, lower-section design, internal pages, lead processing and dependencies were unchanged.

## 2. Header treatment

72px fixed transparent overlay at the top. Original logo mark and wordmark sit within one compact ivory backing; neither asset was redrawn or altered. Communication, Get Quote and menu remain available. The menu uses a small dark square backing at the top because the 320px crop puts it over the pale room. No glass, giant capsule or shadow around the header.

At 80px scroll the header becomes warm ivory with dark controls and a fine divider; returning to the top restores the overlay. Reduced motion disables the transition. The communication dialog preserves the unavailable-phone explanation; there is no fake number or tel link. Header links/buttons meet the existing 44px touch-target checks; Get Quote is 48px high.

## 3. Typography treatment

Instrument Serif headline, Manrope eyebrow/body/UI. The exact requested words are retained:

> CLEANING NINJA
>
> Bring your space<br>
> back to calm.
>
> Cleaning services across major Australian cities, with a simple quote-first process.
>
> Get a Quote

Headline sizes at 320/375/390/430 are approximately 38/42/44/48px, with two lines at all four references. Upright “calm.” relates to the final desktop treatment. Copy is left aligned at 20px on 320 and 24px otherwise, in the dark foreground and wall territory. Body is 12px at 320, 13px otherwise, with 1.75 line-height. A restrained dark text shadow supports the soft foreground reflections without shading the whole image or adding a text panel.

## 4. CTA treatment

184×52px hero control, flat olive `#4d593a`, ivory text, 2px corners, pale olive border and simple arrow. Text contrast is approximately 6.87:1; hover/pressed dark olive `#35412b` gives approximately 9.92:1. Focus uses an ivory outline with an outer dark ring. This describes the control colours, not a full accessibility certification.

The homepage previously had no mounted sticky CTA. A homepage-only control now implements the specified behavior: hidden while the original remains visible below the fixed header, available after it passes above that area, hidden when the quote section enters the viewport, and suppressed for open dialogs and focused inputs/selects/textareas. Visual-viewport contraction also suppresses it for keyboard space. Hidden controls are removed from keyboard navigation through `hidden`/`display:none`. It is a compact bottom-right quote button with safe-area clearance, without a banner, animation or promotional copy. Internal-page CTA behavior is unchanged.

## 5. Crop/position

Centred `object-fit: cover`, `object-position: 50% 50%`, no transform. Hero fills `100svh` with a 568px minimum. The dark threshold, portrait depth, central wall, warm room at the right and foreground floor remain visible. Cropping is shared equally between opposing edges.

| Viewport | Hero height | Total horizontal crop | Total vertical crop |
| --- | --- | --- | --- |
| 320×568 | 568px | none | 0.93% |
| 375×812 | 812px | 17.26% | none |
| 390×844 | 844px | 17.21% | none |
| 430×932 | 932px | 17.34% | none |

These are cover-fit crops, not an added zoom. The primary 375/390 compositions retain approximately 83% of source width and its full height.

## 6. Ninja Cut preview

Development only: `http://127.0.0.1:8136/?ninja-cut=1`. Remove the query and reload to disable. The local verification server was stopped after capture.

A static stone mask at approximately 5% opacity follows the near-vertical wall edge, then the oblique foreground threshold. Geometry stays in source-image coordinates and follows the centred cover crop. No stroke, glow, green seam, slash, animation, displaced duplicate or before/after claim. H-02's mask is hidden at 768px and above; the established H-01 preview remains independent.

Verified default off, opt-in on, reduced-motion static, tablet hidden and query-removal off. Production tests confirm the H-02 preview element is absent. This is a candidate route only, not approval of traversal timing or a finished motion treatment.

## 7. 320/375/390/430 results

| Viewport | Headline | Hero CTA top–bottom | Result |
| --- | --- | --- | --- |
| 320×568 | 2 lines | 347–399px | Complete copy and CTA visible; most compressed composition |
| 375×812 | 2 lines | 433–485px | Clear text territory, depth and room reveal |
| 390×844 | 2 lines | 444–496px | Balanced portrait composition; full CTA visible |
| 430×932 | 2 lines | 474–526px | More breathing room and foreground depth |

No horizontal overflow at the requested widths. Header usability, menu, communication dialog, focus trapping/return, hero focus, reduced motion and sticky-CTA lifecycle passed. The sticky control stays hidden for both dialog types, focused fields and visible quote section; it restores correctly when returning through the page. No browser page errors or fabricated tel links.

Validation completed:

- Typecheck passed.
- Lint passed: 0 errors / 70 existing warnings.
- Content check and preview release guard passed as part of the production build; existing release blockers remain.
- Production build passed after the final CSS adjustments.
- Unit tests: 20 passed.
- Focused production Chromium tests: 29 passed, covering H-02, four desktop H-01 compositions, desktop header behavior and existing homepage interactions/forms.
- Development-only Cut and additional state captures passed separately and were visually inspected.
- Whitespace diff check passed. React review checked effect cleanup, deterministic initial hidden state, scoped rendering and preservation of responsive media sources.

Checks used isolated local port 8136, synthetic/local form checks and explicitly empty database/email credentials. No real lead, email or call was sent. Real-device Safari, physical soft-keyboard behavior and a complete accessibility audit are not claimed; keyboard/focus behavior was checked in Chromium. No production performance claim is made.

## 8. Tablet observation

768×1024 deliberately retains H-01, its solid ivory 80px header and established 560px hero, rather than stretching H-02 across a tablet. The portrait candidate's narrow reveal would lose its intended balance in that wider shape. The tablet supporting paragraph is limited to 260px to keep the longer corrected wording away from the bright window. H-02's mask and sticky control are disabled at this breakpoint.

The two-line title and CTA fit comfortably. The H-01 crop is substantially tighter than desktop, and the next section is visible beneath the hero. This is a usable tablet reference, not approval of a new tablet campaign frame. Desktop styles at 1024px and above were not changed.

## 9. Screenshots

- [375×812 hero](h02-screenshots/hero-375.png)
- [390×844 hero](h02-screenshots/hero-390.png)
- [430×932 hero](h02-screenshots/hero-430.png)
- [320×568 hero](h02-screenshots/hero-320.png)
- [375 static Cut preview](h02-screenshots/cut-preview-375.png)
- [768×1024 tablet](h02-screenshots/hero-768.png)
- [375 CTA keyboard focus](h02-screenshots/cta-focus-375.png)
- [375 scrolled header](h02-screenshots/header-scrolled-375.png)
- [375 sticky quote state](h02-screenshots/sticky-375.png)

Hero captures use the production build. Cut/focus/scrolled/sticky captures use development with developer tooling hidden for capture. Existing H-01 report screenshots were preserved; fresh desktop regression captures go to `test-results/`.

## 10. Visual concerns

1. H-02's deeper room is visibly more traditional than H-01: timber trim, chair and radiator retain that character. The shared dark-to-warm architectural transition, serif/sans hierarchy and olive control make them sufficiently related as a campaign pair, though they do not imply one continuous room.
2. The unchanged ivory logo backing remains conspicuous against the dark image. The compact perimeter is the cleanest existing-asset treatment here. A genuine transparent brand master remains a future logo task; no replacement or damaged extraction was introduced.
3. At 320px the soft reflection crosses the left edge of the text, and copy reaches closer to the doorway. Text-shadow support improves separation; the 375/390 art direction is stronger.
4. As with H-01, architecture alone can suggest interiors advertising. The real identity and explicit cleaning-service description help; the Cut is only a subtle static exploration, not a finished distinguishing motion treatment.
5. The original PNG is 21,108,020 bytes (approximately 21.1MB). Responsive optimisation is active, but release media budgeting and real-device/network performance work remain separate.
6. The approved coverage sentence is broad. Exact city/suburb eligibility remains subject to enquiry; this checkpoint does not verify every existing location page.

## 11. Recommendation: APPROVE H-02

Recommend approving this exact H-02 frame as the mobile static hero base. At 375 and 390 the UI preserves an intimate dark threshold, readable message and a distinct warm room reveal; the CTA is immediately available. The traditional room character is compatible enough with H-01, with the logo backing documented as a separate asset limitation.

This recommendation is for owner visual approval of the mobile static base only. No H-03/H-04, generated media, lower-section redesign, deployment or merge performed. STOP.
