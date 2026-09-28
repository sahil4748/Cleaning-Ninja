# D HERO CHECKPOINT REPORT

28 September 2026 · `rebuild-2026` · Desktop direction preservation checkpoint.

## Owner decision state

- **Desktop:** D — Precision with Expression is OWNER-APPROVED and locked as the current static art-direction foundation, including the completed one-row desktop header. Direction approval does not activate D in production.
- **Mobile:** H-02/D is **NOT owner-approved as final**. D typography/layout is retained only as a working baseline. The owner reports inadequate visual/cinematic strength, especially at an iPhone 16-class viewport. Dedicated iPhone/mobile art direction and a separate H-02 media/composition review remain required. Technical regression passes and prior preservation approvals are not final mobile visual approval.
- **Cinematic:** the H-03 masked desktop experiment remains preserved, unchanged and inactive in production. H-04 has not been generated.
- **Default:** H-01 desktop static and H-02 mobile static remain unchanged. A/B/C/D design routes are opt-in and development-only. No production D activation.

The current decision is recorded prominently in [owner decisions](../product/owner-decisions.md) and [current phase](current-phase.md). Each earlier art-direction report now carries a current-state notice so its historical recommendations cannot be mistaken for mobile approval.

## Reviewed commit scope

One logical checkpoint preserves only the completed Hero Art Direction Lab, D synthesis, desktop header micro-refinement and associated evidence:

| Files | Scope |
| --- | --- |
| `components/homepage/Homepage.tsx` | Development-only design selection, scoped root attribute, conditional lab rendering and sticky-quote observer remount |
| `components/homepage/HeroDesignLab.tsx` | Static H-01/H-02 compositions A/B/C/D with locked wording |
| `components/homepage/hero-design-lab.css` | Scoped studies, D synthesis and final one-row desktop overlay |
| `playwright.hero-design.config.ts` | Isolated local development server and synthetic test environment |
| `tests/hero-design.spec.ts` | Responsive, static-media, content, header, interaction and default/lower-section regression checks |
| `docs/product/owner-decisions.md`, `docs/execution/current-phase.md` | Explicit desktop approval / mobile pending / cinematic inactive distinction and checkpoint authorisation |
| `docs/execution/hero-art-direction/` | Initial report, six primary captures and two comparison sheets |
| `docs/execution/hero-synthesis/` | Synthesis report and A/B/D review evidence |
| `docs/execution/d-micro-refinement/` | Refined-D report, desktop/mobile before/after captures and header close review |
| This report | Checkpoint boundary and validation record |

The three evidence directories contain **23 PNG review artifacts**. They are screenshots/contact sheets, not new source media. Raw logs, temporary scripts and expanded captures remain in ignored `.local-evidence/`; no environment values or operational secrets are included.

No change to H-01/H-02 source files, `content/media.ts`, `NinjaMedia.tsx`, H-03 routes/masks/playback, shared `HomeHeader.tsx`, existing `app/homepage.css`, dependencies or lower-page design/content. The existing default hero markup remains in the unchanged fallback branch. No business claims were added.

## Fresh checkpoint validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed: 0 errors, 70 existing warnings |
| `npm run test:unit` | 20 passed; synthetic/local services |
| `npm run build` | Passed, including content/prebuild checks; existing warning-mode findings and release restrictions remain |
| `playwright test --config=playwright.hero-design.config.ts` | **37 passed** in one run |
| Production browser isolation | **10/10 cases passed**: default plus A/B/C/D at 1440×900 and 390×844 |
| `git diff --check` | Passed |

The focused suite covers all four studies at the eight requested viewport sizes, mobile dialogs and focus, reduced motion, quote navigation, sticky-quote lifecycle, D's one-row desktop header, exact wording, media selection, no overflow/overlap and unchanged lower-section markup. Conflicting experiment parameters still produce no H-03/MP4 request or Cut preview inside the lab. No leads or messages were submitted.

For the production build, every parameterised screenshot was byte-identical to the default screenshot at its viewport. No lab component, design attribute, video or browser error appeared. This verifies that the checkpoint does not activate D or other studies in production.

These are engineering checks, **not mobile art-direction approval** and not an iPhone hardware/Safari visual sign-off.

## Git checkpoint boundary

The owner authorises one commit with message `feat: checkpoint D hero art direction`, followed by a normal `git push origin rebuild-2026`. The pre-checkpoint local HEAD and remote branch both matched `86cb84b81095f7c5c363b3e52070904a1ae5ad7c`.

This file records the scope and validation included in that commit. The resulting commit hash, push outcome, remote-HEAD equality and clean working-tree verification are supplied in the final checkpoint handoff; they are checked after committing and pushing so this record does not require a second commit.

No mobile redesign, H-04 generation, Higgsfield, H-02/H-03 changes, lower-page work, production activation, deployment or merge. Stop after the checkpoint handoff; the dedicated mobile sprint remains a separate task.
