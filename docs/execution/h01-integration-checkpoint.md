# H-01 INTEGRATION CHECKPOINT

> Historical checkpoint. Superseded captures are preserved only in the ignored local stabilization archive; archive links do not resolve in a fresh clone. See [stabilization inventory](repository-stabilization-inventory.md).

2026-09-27 · rebuild-2026 · temporary visual integration, not visual approval or release.

## 1. Hero implementation

Integrated the exact supplied 5504×3072 H-01 PNG as the desktop hero source. Source and repository copy have identical SHA-256: `5c7871e1b311271575ad1e7b483044e9f47fb350a15852e052f203316b923cff`. Next image optimisation supplies responsive delivery; the original pixels remain available unchanged. Removed the hero's inherited animated duplicate/zoom. Existing mobile poster and lower signature-section image remain separate. No new media generated.

## 2. Files changed in this checkpoint

- `app/homepage.css`: scoped H-01/header layout, typography, CTA and debug mask.
- `components/homepage/Homepage.tsx`: hero-specific class and CTA treatment.
- `components/homepage/NinjaMedia.tsx`: desktop source dimensions, separate lower-section source, static hero and development-only mask.
- `content/media.ts`: H-01 desktop hero source.
- `public/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png`: exact supplied image.
- `tests/homepage.spec.ts`: expected desktop image source updated.
- `tests/h01-checkpoint.spec.ts`: four desktop composition checks and captures.
- `docs/execution/h01-screenshots/`: four clean desktop captures, Cut preview and CTA focus capture.
- This report.

Existing unrelated working-tree edits were preserved. Packages, services, quote form, footer, internal pages, logo assets and global design tokens were not redesigned.

## 3. Typography

Existing Instrument Serif / Manrope font setup retained. Two deliberate headline lines: “Bring your space” / “back to calm.” with restrained italic emphasis on “calm.” Desktop headline scales from approximately 62px at 1366 to 87px at 1920. Copy starts 4.5% from the left and occupies 31% of the frame; it stays inside the dark architectural threshold. Manrope handles the eyebrow, 13px clarification and controls. No copy panel; only a very light left-edge shade on the image.

## 4. Header

Retained original `/logo-mark.png` and `/logo-wordmark.png` pixel assets and existing Brand component. Desktop header is 80px high, solid ivory, with all five requested navigation entries, communication icon and quote control. Removed the desktop communication button's circular border. Existing communication sheet and keyboard behavior retained. No phone number or tel link added.

## 5. CTA

Temporary, hero/header-scoped flat olive treatment: #4d593a with #f7f5ef lettering, 2px corners and a restrained pale olive border. Text contrast 6.87:1; hover #35412b gives 9.92:1. Border-to-fill contrast is 3.43:1. Keyboard focus has an ivory outline with an outer dark ring for separation on either image or header. Hero target is at least 184×52px. This is not a whole-site token change or a claim of complete WCAG certification.

## 6. H-01 crop/position

Centered `object-fit: cover`, `object-position: 50% 50%`, no zoom. Height is the smaller of the native aspect-ratio height and viewport minus 80px, with a 560px floor for intermediate widths. All requested desktop sizes preserve the complete source width.

| Viewport | Hero height | Approximate vertical crop, total |
| --- | --- | --- |
| 1366×768 | 688px | 9.8% |
| 1440×900 | 804px | none |
| 1728×1000 | 920px | 4.6% |
| 1920×1080 | 1000px | 6.7% |

Cropping is shared equally between top and bottom. The left threshold, room reveal, furniture and foreground perspective remain legible. At 1440×900 a small ivory sliver of the following section is visible.

## 7. Ninja Cut static preview

Development server only: open `http://127.0.0.1:8136/?ninja-cut=1`. Remove the parameter and reload to disable. A 5%-opacity stone mask ends at the vertical architectural boundary at 36.3% of image width, with a faint one-pixel edge. This marks one candidate traversal position only. No animation, glow, slash, displaced image or simulated cleaning. Mask is hidden below 768px and excluded from production rendering. Verified default off, debug on, animation none; no browser page errors.

## 8. Responsive observations and validation

All requested desktop viewports show identity, Brisbane, complete headline, clarification and CTA in the first viewport with no horizontal overflow. Existing 320/375/390/430 mobile checks pass and still select `hero-mobile.jpg`. Intermediate 768/1024 widths pass functional composition checks, but their tighter crop is not the primary desktop art-direction approval target.

- Typecheck: passed.
- Lint: passed, 0 errors / 70 existing repository warnings.
- Content check and preview release guard: passed in build; their existing release caveats remain.
- Production build: passed.
- Unit tests: 20 passed.
- Focused Chromium tests: 20 passed, including four new desktop checkpoints, mobile, reduced motion, communication/menu focus behavior and local synthetic form checks.
- Local sampled CLS: 0; not a production performance benchmark.
- Development Cut and focus-state screenshots inspected separately.
- Whitespace diff check: passed.

Checks used isolated local port 8136 with lead/email credentials explicitly disabled. No real leads, emails or calls sent. No full accessibility audit or real-device Safari testing claimed.

## 9. Screenshots

- [1440×900 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1440.png)
- [1366×768 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1366.png)
- [1728×1000 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1728.png)
- [1920×1080 hero](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1920.png)
- [1440 static Cut preview](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/cut-preview-1440.png)
- [1440 CTA focus](../../.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/cta-focus-1440.png)

Full-page capture omitted: lower-page design was outside this checkpoint.

## 10. Specific remaining visual concerns

1. Architectural photography can still suggest interiors/furniture advertising. The real logo and explicit service clarification help; the future signature Cut must establish distinctiveness without becoming spectacle.
2. Olive CTA is legible and interactive but deliberately restrained; its visual prominence is still subject to owner approval.
3. Header logo begins farther right than hero copy on the widest viewport because existing header gutters cap the navigation width. This preserves the current header system but is a visible alignment tradeoff.
4. Intermediate tablet widths crop more than the primary desktop sizes; mobile remains a placeholder and is not an approved H-02 composition.
5. Source PNG is approximately 22MB. Responsive Next optimisation is active, but a release-ready media pipeline/video poster budget remains future work.
6. The static mask only validates an architectural boundary. Traversal timing, direction and final masked states have not been designed or approved.

STOP: no video generation, H-02/H-03/H-04 work, production deployment or merge performed.
