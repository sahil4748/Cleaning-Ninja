# H-03 MASKED CHECKPOINT REPORT

2026-09-28 · `rebuild-2026` · owner-approved visual composition, development experiment only.

## Preserved scope

Reviewed `git status`, `git diff --stat` and `git diff`, plus the untracked route, tests and reports. All checkpoint changes belong to masked salvage/refinement and associated development logic/documentation. No unrelated working-tree changes were found.

Files included in the single checkpoint commit:

- `app/homepage.css` — approved architectural mask and scoped rendering.
- `components/homepage/NinjaMedia.tsx` — opt-in development composition, existing interaction-start and fallback lifecycle.
- `app/api/dev/h03/route.ts` — development-only local archive delivery; production 404.
- `playwright.h03-masked.config.ts` — focused development test configuration.
- `tests/h03-masked.spec.ts` — timeline, responsive, fallback and production-isolation checks.
- `docs/execution/h03-masked-salvage-report.md` — initial experiment report.
- `docs/execution/h03-mask-refinement-report.md` — final refinement report and evidence links.
- `docs/execution/h03-masked-checkpoint-report.md` — this checkpoint record.
- `docs/execution/current-phase.md` — current owner-authorised checkpoint and stop.
- `docs/product/owner-decisions.md` — dated owner visual approval and commit/push authorisation.
- `experiments/h03/README.md` — archive/runtime distinction and current checkpoint references.

Checkpoint-only test adjustments preserve the existing implementation: seven requested timeline positions, fresh captures under ignored `test-results/h03-masked` instead of overwriting dated evidence, and explicit production checks for both masked switches on desktop/mobile and both raw/retimed media endpoints. No visual or playback implementation change in this checkpoint.

## Approved geometry

Preserved without alteration:

```text
(0,0) → (36.3,0) → (36.3,73.6) → (59.3,67.8)
→ (59.3,81) → (54.8,88.15) → (43.5,100) → (0,100)
```

The existing SVG representation retains its documented coordinate rounding and feather sigma 1.2. See the refinement report for source-space conversion and the disclosed minor floor-tone mismatch. The owner confirms this composition has passed the current owner/technical visual gate; production motion is not authorised.

## Checks completed

| Check | Result |
| --- | --- |
| Typecheck | Passed |
| Lint | Passed, 0 errors / 70 existing warnings |
| Unit tests | 20 passed |
| Production build | Passed with default Turbopack; content check and release guard ran through prebuild |
| Development masked regressions | 16 passed, 1 production-only case skipped |
| Production H-01/H-02/masked regressions | 16 passed, 16 development-only cases skipped |
| Whitespace diff check | Passed |

Development checks used the existing task-owned server on isolated port 8136. It was stopped before the standard Playwright configuration started its isolated production server on that port. Lead/email credentials were disabled. No real leads or messages were sent. Production tests covered both `hero-motion=masked` and `hero-motion=masked-retimed` at desktop and mobile widths after interaction.

## Production/default isolation

- H-01 remains the default desktop still and H-02 the mobile still; verified image source identities in production.
- H-03 requires development mode, an explicit query, desktop/no-reduced-motion eligibility, no browser-exposed Save-Data and the existing interaction-start path.
- Production ignores both masked query modes, creates no hero video and sends no H-03 media request.
- `/api/dev/h03?variant=raw` and `variant=retimed` return 404 in production.
- `/homepage/h03-desktop-raw.mp4` and `h03-desktop-retimed.mp4` return 404; no H-03 MP4 exists in public assets.
- The production route dependency trace contains no archived MP4/local-evidence entries.
- Raw source hash remains `3e8045159b95c6a1ea80550f9feb75475f9405ac9c4bda01c3dbfd55a3514b61`.
- MP4s and dated screenshots remain in the ignored local archive, not in the commit. They are required to reproduce the development experiment and are not backed up by this branch push.
- No deployment configuration, dependency, typography/layout, header/CTA, autoplay/LCP, Ninja Cut animation or lower-section change. No generation, Higgsfield or H-04.

## Commit and push receipt

Authorised message: `feat: preserve masked H-03 cinematic composition experiment`.

The commit hash, normal `git push origin rebuild-2026` result and final clean-status verification are returned in the accompanying final checkpoint response after this report is committed. This avoids a self-referential commit hash or an additional documentation-only commit.

Stop after that receipt. No deployment or merge; the next hero art-direction sprint requires a new instruction.
