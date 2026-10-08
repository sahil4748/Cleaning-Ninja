# Carpet service autoplay refinement — QA evidence

Date: 8 October 2026. Route: `/services/carpet-cleaning`.

## Result

All **42 service-page browser scenarios** are verified across Chromium, Firefox and WebKit. The full matrix passed 41 cases and exposed one Firefox test-harness assumption: Firefox renders `playsinline` without exposing the `playsInline` JavaScript property. That assertion was corrected to inspect the HTML attribute; the affected autoplay/scroll scenario then passed in all three engines. No application error was waived and no blocking UI defect remains in the tested scope.

The **10 existing homepage regression checks** passed during the preceding refinement. They were not repeated for this follow-up because only the carpet page's media/motion behavior changed. The root agent separately verified the updated production build, typecheck, lint and 23 unit checks.

The service tests block every unmocked non-GET/HEAD request. Quote submissions use synthetic values and intercepted responses; these checks do not establish live database or email delivery. The task-owned server on port 8136 had provider credentials explicitly disabled. No deployed environment was tested.

## Browser and interaction coverage

- Viewports: 320 × 568, 360 × 800, 390 × 844, 605 × 720, 768 × 1024, 844 × 390, 1024 × 600, 1024 × 900 and 1440 × 900. A separate 1024 × 1366 touch/coarse-pointer case verifies tablet behavior.
- Muted, inline, looping autoplay begins without a click; decoded frames advance while the visitor is stationary.
- Native wheel scrolling moves the hero and offers directly with the document. All devices have zero added pinned scroll distance; scrolling does not seek the movie timeline.
- Desktop, mobile and tablet screenshots include the hero and full page; desktop/mobile/tablet captures also show the transition into the overlapping offers section.
- Manual pause persists across scrolling, leaving/re-entering the hero, visibility changes and rotation. Rotation selects the correct portrait or landscape source.
- Real offscreen IntersectionObserver behavior pauses and resumes eligible autoplay. Deterministic Page Visibility values plus `visibilitychange` exercise hidden-document pause/resume; this is explicitly simulated because headless tabs do not reliably become background tabs.
- A delayed initial native `play()` promise resolves after leaving/re-entering the hero and starting a newer attempt; stale completion must not block or pause playback.
- A synthetic autoplay-policy rejection produces a manual Play control; user playback still works and quote access remains available.
- Reduced motion, Save Data, simulated 2G, unavailable film and JavaScript-disabled poster/contact fallback. Changing to reduced motion while the page is open removes the film and motion control.
- Delayed film loading followed by immediate quote navigation; decoded media does not move the focused quote heading away.
- Persistent header quote access, visible form-heading focus without premature input focus, keyboard traversal, skip link, offer conditions and native method disclosures.
- Field validation, error associations, input preservation on failure, submission locking, idempotent retry, non-default package attribution, package removal, requested date and reset behavior.
- Metadata, canonical, noindex/nofollow, service/breadcrumb structured data, direct media responses, console and hydration errors, responsive overflow and a 640 CSS-pixel reflow check equivalent to the layout width at 200% zoom in a 1280px window.

The tests use desktop browser engines and emulated viewport/touch settings. This is not physical-device certification or a screen-reader audit. macOS WebKit uses Option-Tab for links when Safari full keyboard access is off; the test follows Playwright's upstream focus tests for that platform behavior.

## Updated local performance sample

A fresh isolated Chromium sample used the updated production build on a local server, 4× synthetic CPU slowdown and 100 animation frames during native scrolling. There was no network throttling. These are lab observations, not field Core Web Vitals or physical-device frame-rate guarantees, and are not a controlled before/after benchmark.

| Sample | Initial LCP | Total CLS | 95th percentile frame interval | Largest long task | Initial film transfer |
| --- | ---: | ---: | ---: | ---: | --- |
| Desktop 1440 × 900 | 412 ms | 0.000023 | 9.3 ms | 157 ms | Approximately 6.32 MB |
| Mobile emulation 390 × 844 | 188 ms | 0 | 9.2 ms | 99 ms | Approximately 2.72 MB |

Mobile now intentionally loads its film for autoplay. The prior report's zero initial mobile-film request observation described the superseded click-to-play behavior and does not apply to this version. Reduced-motion, Save Data and simulated 2G checks still verified zero film requests.

All three engines verified **zero extra hero scroll distance**. Automated wheel-to-observed-scroll samples were 124ms in Chromium, 119ms in Firefox and 45ms in WebKit; polling overhead and local scheduling are included. Native document movement, autoplay progression and the visual handoff are independent, so wheel input does not wait for media seeking.

## UIAudit assessment

Implementation integrity: **pass**. The refinement retains the current page's teal/copper system and photographic service narrative, uses native scrolling, exposes explicit film controls and preserves quote semantics. The bundled detector found no hard anti-patterns. Its advisory palette/type-ramp findings compare this service page against the older homepage `DESIGN.md`; they are documentation drift, not verified contrast defects or authorization to redesign the page.

| Dimension | Score / 4 | Evidence and limits |
| --- | ---: | --- |
| Accessibility | 3 | Keyboard, focus, motion preferences, pause controls and validation pass; no full assistive-technology audit. |
| Performance | 3 | No new animation dependency, visibility-aware playback, passive native scrolling and bounded visual effects; autoplay transfers 6.32 MB desktop or 2.72 MB mobile media. |
| Responsive design | 4 | Portrait, tablet, narrow desktop, landscape, touch and reflow checks pass. |
| Theming | 3 | Consistent existing page tokens; homepage design documentation does not describe this page's full palette. |
| Implementation integrity | 4 | Product-specific content/interaction retained; detector and functional checks pass. |
| Total | **17 / 20** | **Good; no open P0, P1 or P2 finding in this scope.** |

Verified normal-text contrast examples remain teal on paper 4.99:1, teal on linen 4.56:1, muted text on linen 6.27:1 and ivory on copper 5.37:1. Photographic overlays were visually inspected rather than treated as a single flat-color contrast measurement.

## Reproduction and evidence

After a successful production build, run:

```sh
npx playwright test --config docs/execution/carpet-service/playwright.config.ts
```

The config starts an isolated port-8136 production server with providers disabled and refuses to reuse an unknown server. `CARPET_QA_EXTERNAL_SERVER=1` is only for a task-owned server already started with those safeguards.

Ignored evidence is in `.local-evidence/carpet-service/`: `autoplay-matrix-initial.json` preserves the full 42-case attempt and its single harness mismatch; `results.json` records the successful three-engine confirmation. Per-browser folders contain current screenshots and `scroll-metrics.json`; `performance.json` contains the refreshed sample. `autoplay-transition.webm` shows stationary autoplay followed by native scrolling into the offers. Test lint and `git diff --check` passed.

Earlier harness corrections are retained: wait for native smooth scrolling to settle, assert the accessible email link because Playwright text selectors exclude `noscript`, and use macOS WebKit's default full-link keyboard traversal. None suppressed application errors or changed the tested business behavior.
