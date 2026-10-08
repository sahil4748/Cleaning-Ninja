# Carpet service refinement — QA evidence

Date: 8 October 2026. Route: `/services/carpet-cleaning`.

## Result

The final production build passed all **36 service-page browser checks** across Chromium, Firefox and WebKit, with zero skipped, flaky or unexpected results. All **10 existing homepage regression checks** passed in Chromium. No blocking UI defect remains in the tested scope.

The service tests block every unmocked non-GET/HEAD request. Quote submissions use synthetic values and intercepted responses; these checks do not establish live database or email delivery. The local server on port 8136 had provider credentials explicitly disabled. No deployed environment was tested.

## Browser and interaction coverage

- Viewports: 320 × 568, 360 × 800, 390 × 844, 605 × 720, 768 × 1024, 844 × 390, 1024 × 600, 1024 × 900 and 1440 × 900. A separate 1024 × 1366 touch/coarse-pointer case verifies unpinned tablet behavior.
- Desktop native wheel scrolling, forward and reverse decoded film frames, bounded scroll distance, pause/resume and direct offers navigation.
- Mobile film loading only after explicit Play, pause, portrait-to-landscape source replacement and no pinned scroll interval.
- Reduced motion, Save Data, simulated 2G, unavailable film and JavaScript-disabled poster/contact fallback.
- Delayed film loading followed by immediate quote navigation; decoded media does not move the focused quote heading away.
- Persistent header quote access, visible form-heading focus without premature input focus, keyboard traversal, skip link, offer conditions and native method disclosures.
- Field validation, error associations, input preservation on failure, submission locking, idempotent retry, non-default package attribution, package removal, requested date and reset behavior.
- Metadata, canonical, noindex/nofollow, service/breadcrumb structured data, direct media responses, console and hydration errors, responsive overflow and a 640 CSS-pixel reflow check equivalent to the layout width at 200% zoom in a 1280px window.

The tests use desktop browser engines and emulated viewport/touch settings. This is not physical-device certification or a screen-reader audit. macOS WebKit uses Option-Tab for links when Safari full keyboard access is off; the test follows Playwright's upstream focus tests for that platform behavior.

## Local performance sample

An isolated Chromium sample used a local production server, 4× synthetic CPU slowdown and 100 animation frames during native scrolling. There was no network throttling. These are lab observations, not field Core Web Vitals or physical-device frame-rate guarantees.

| Sample | Initial LCP | Total CLS | 95th percentile frame interval | Largest long task | Initial film requests |
| --- | ---: | ---: | ---: | ---: | --- |
| Desktop 1440 × 900 | 200 ms | 0.0196 | 16.3 ms | 95 ms | Desktop film, approximately 6.32 MB transferred |
| Mobile emulation 390 × 844 | 160 ms | 0 | 10.0 ms | 95 ms | None |

All three engines measured a 792px desktop scroll interval at 1440 × 900, versus the prior implementation's 1620px at that height. Narrow, touch and short-view layouts have no extra pinned interval. Automated wheel-to-observed-scroll samples were 73ms in Chromium, 137ms in Firefox and 41ms in WebKit; polling overhead and local scheduling are included. Decoded footage passed the two-second convergence limit in both directions instead of following a separately rate-limited cursor.

## UIAudit assessment

Implementation integrity: **pass**. The refinement retains the current page's teal/copper system and photographic service narrative, uses native scrolling, adds explicit motion controls and preserves quote semantics. The bundled detector reported zero hard anti-patterns. Its advisory palette/type-ramp findings compare this service page against the older homepage `DESIGN.md`; they are documentation drift, not verified contrast defects or authorization to redesign the page.

| Dimension | Score / 4 | Evidence and limits |
| --- | ---: | --- |
| Accessibility | 3 | Keyboard, focus, motion preferences and validation pass; no full assistive-technology audit. |
| Performance | 3 | No new animation dependency, no touch autoplay download, passive native scrolling and stable local samples; desktop film remains a 6.32 MB transfer. |
| Responsive design | 4 | Portrait, tablet, narrow desktop, landscape, touch and reflow checks pass. |
| Theming | 3 | Consistent existing page tokens; homepage design documentation does not describe this page's full palette. |
| Implementation integrity | 4 | Product-specific content/interaction retained; detector and functional checks pass. |
| Total | **17 / 20** | **Good; no open P0, P1 or P2 finding in this scope.** |

Verified normal-text contrast examples: teal on paper 4.99:1, teal on linen 4.56:1, muted text on linen 6.27:1 and ivory on copper 5.37:1. Photographic overlays were visually inspected rather than treated as a single flat-color contrast measurement.

Resolved defects include the delayed second animation clock, excessive touch pinning, scroll geometry dependent on film decoding, rotation retaining the wrong film source, focus entering the mobile keyboard too early, short-landscape spacing and cramped tablet offer distribution. The root review also corrected adjacent sentences joining when a landscape line break is hidden. Final browser captures and interactive review passed after that change.

## Reproduction and evidence

After a successful production build, run:

```sh
npx playwright test --config docs/execution/carpet-service/playwright.config.ts
```

The config starts an isolated port-8136 production server with providers disabled and refuses to reuse an unknown server. `CARPET_QA_EXTERNAL_SERVER=1` is only for the task-owned server that has already been started with those safeguards.

Ignored local evidence is in `.local-evidence/carpet-service/`: final `results.json`, per-browser screenshots and `scroll-metrics.json`, `performance.json` and its script, plus the temporary homepage regression configuration. Final service run: 36 passed in 58.1s. Homepage run: 10 passed in 18.6s. Test/config lint and `git diff --check` passed.

Initial test development corrected three harness assumptions: sampling before native smooth scrolling settled, Playwright excluding `noscript` from text selectors, and macOS WebKit's default keyboard traversal. Final no-JavaScript coverage asserts the actual accessible email link. These were not suppressed runtime errors or waived product failures.
