# Universal mobile hero — verification

2026-09-28 · `rebuild-2026` · All requested checks completed locally.

| Check | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run lint` | PASS — 0 errors; existing 70 warnings |
| Content checker | PASS in repository warning mode — 0 critical, 0 high, 5 existing medium findings; also executed by build preflight |
| `npm run test:unit` | PASS — 20 tests |
| `playwright test --config=playwright.mobile-hero.config.ts` | PASS — 45 tests; production-only case intentionally skipped in development |
| `npm run build` | PASS — 100 static pages generated; no deployment |
| Production Playwright gate | PASS — all three mobile parameters ignored; incumbent hero renders |
| `git diff --check` | PASS |
| Protected source/desktop files | No diff in H-01/H-02 assets, media configuration, NinjaMedia, HomeHeader, HeroDesignLab, existing hero-design CSS, app/homepage.css, package manifest or lockfile |

The build was necessary to exercise the production query guard rather than infer its behavior from the source. The study stylesheet is included but inert without its development-only data attribute; production visual/interaction behavior is unchanged.

## Responsive coverage

36 combinations: A/B/C × 320×568, 360×800, 365×780, 375×667, 375×812, 390×844, 393×852, 402×874, 412×915, 415×880, 430×932, 440×956.

Each checks exact copy, two headline lines, first-viewport content, control bounds/non-overlap, minimum hit height, title/support/action separation, horizontal overflow, the H-02 source, absence of video/Cut/overlays, console errors and unexpected motion requests. These are technical assertions; image quality and text-over-image contrast were judged separately from the captures.

Additional checks per study:

- 320×480 and 320×520 short-window stress tests.
- Width boundaries 359/360 and 409/410; height boundary 700/701.
- 393×740 to 393×852 resizing.
- Synthetic 47px top, 34px bottom, 16px side safe insets at 393×740.
- Communication/menu dialogs, Escape focus return, keyboard CTA, both quote anchors, scrolled header, sticky-quote visibility and reduced motion.

Desktop/tablet screenshots are exactly equal between locked D and each study URL at 768×1024, 1366×768, 1440×900 and 1920×1080. The comparison is within the same browser run after fonts/images settle.

Default versus invalid queries have equal hero/header DOM, geometry and computed presentation. Raw default-page screenshot equality initially exposed nondeterministic cached-logo raster differences plus eight antialiased button-corner pixels; the final assertion checks the actual DOM, source attributes, geometry and CSS instead. No application workaround or source asset change was made for that test artifact.

Lower sections have equal markup after removing only empty `style=""` attributes from cloned comparison nodes. Playwright's screenshot caret suppression leaves those empty attributes on existing form fields. Actual page nodes are not normalized or edited by this comparison. The initially failing check was corrected for this specific observed artifact.

## Environment and limits

Local Chromium mobile/touch emulation; CSS pixel viewports. No physical iPhone/Android or native Safari/WebKit toolbar verification. Synthetic inset values are clearly distinguished from device evidence in the report. No automated contrast certification, screen-reader audit, performance certification or production deployment is claimed.

Both development and production suites owned local port 8136 and set `reuseExistingServer: false`. Database/email environment variables were cleared. No test submitted a form or sent a message. The existing `agent-browser` CLI was unavailable; the installed Playwright browser provided the actual visual and functional verification. No new dependencies were installed.

Typecheck, lint and unit/content checks also passed after the applicable test/source edits. Environment permission failures for the initial local listener and tsx IPC were resolved by running the same bounded local commands with the required permissions.

Local detailed logs: `.local-evidence/universal-mobile-hero/{responsive-check,production-check,typecheck,lint,unit-check,content-check,build-check}.txt`. Main captures and the measurement ledger are packaged beside the report; additional full-resolution captures and diagnostic comparisons remain in that local evidence directory.

No commit, push, merge, deployment, media generation or Higgsfield action occurred.
