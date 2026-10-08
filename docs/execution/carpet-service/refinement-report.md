# Carpet service refinement — 8 October 2026

Scope: finish and refine `/services/carpet-cleaning` on the existing `codex/service-pages` branch. The owner's current request authorises a feature-branch commit and push after QA. Homepage presentation, backend APIs, provider configuration, noindex and release settings are preserved. The pre-existing `.gitignore` edit is outside this commit.

## Latest follow-up: autoplay and cinematic section transition

The owner requested automatic video playback and a smoother transition into the next section. Eligible desktop, tablet and mobile layouts now play the existing muted, inline film automatically and loop it while visible. Scrolling never seeks the movie. Offscreen and hidden documents pause playback, and returning resumes it unless the visitor explicitly paused. Rotation selects the correct landscape/portrait source while preserving that choice. A blocked autoplay attempt leaves a working Play control; reduced motion, Save-Data, slow connections and media failure retain the poster.

All pinned scroll distance is removed. A single passive scroll update drives a small background drift/scale and soft darkening as the rounded offers section rises naturally over the film. The text and quote actions remain ordinary, accessible content. No animation dependency, new asset or backend change was introduced.

The production build, typecheck, full lint (zero errors, 62 existing warnings) and all 23 unit tests passed. All 42 browser scenarios are verified across Chromium, Firefox and WebKit; exact run accounting and fresh performance samples are recorded in the current [QA report](qa-report.md). The unit suite used `node --import tsx --test tests/unit/*.test.ts` because the sandbox blocks the `tsx` CLI's IPC socket; the same test sources and runtime ran successfully.

Playback handling follows [MDN play promise guidance](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play), [Page Visibility guidance](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), and [WebKit muted inline-video policy](https://webkit.org/blog/6784/new-video-policies-for-ios/), checked through Context7 and official sources. Independent lifecycle review found no blocking issue. Earlier scroll-driven behavior and performance samples below describe commit `4fe7145`, not the current autoplay behavior.

## Previous refinement — changes in 4fe7145

- Desktop hero footage follows native scrolling directly, with one pending seek and no trailing animation clock. Extra hero travel is reduced from 1500–1900px to 640–940px. The title and quote action stay visible, with an explicit pause/resume control.
- Touch, narrow and short viewports use ordinary page flow. The poster is complete immediately; film download and playback begin only when requested. Reduced motion, Save-Data and slow connections retain the poster.
- Hero geometry is established before film loading, so a late decoded frame cannot move the offers or quote form. Media failures preserve a usable static composition. Video sources respond to portrait/landscape changes.
- Quote shortcuts focus and scroll to the form heading, preventing premature mobile keyboard activation. Existing service/package context, durable-acceptance requirements, preserved input and idempotent retry behavior remain intact.
- Simplified the scroll cue, refined hover/focus feedback, filled tablet offer rows and composed the short landscape hero independently. No new dependency or media generation was needed.
- Repaired an existing unit test that assumed the branch was unapproved for release. It now runs the real guards against isolated approved and blocked fixtures without changing operational release settings.

## Workflow and research

UltraCode was not available in the installed skills or tools. Three parallel agents handled bounded research, frontend implementation and QA, followed by an independent motion lifecycle review. MotionDesign / Frontend UI Engineering, UI Audit and Context7 informed the work; the React Best Practices checklist covered the final component changes. The existing identity and the owner's restraint/performance requirements took precedence over generic layout changes or extra motion libraries.

[Aman](https://www.aman.com/) and [Six Senses](https://www.sixsenses.com/en/) informed the combination of cinematic imagery with an immediately accessible primary action. Technical guidance came from [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) via Context7, [web.dev animation performance](https://web.dev/articles/animations-guide), [LCP guidance](https://web.dev/articles/optimize-lcp) and [W3C interaction animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions). These informed implementation choices; they do not establish business claims or visual approval.

## Verification

The final production build passed, followed by:

- Typecheck and strict lint of changed source/tests: pass, zero warnings in scoped files.
- Full repository lint: pass, zero errors and 62 pre-existing warnings.
- Content scanner: zero critical/high findings; 14 existing/advisory medium findings, including CSS/schema identifiers.
- Unit suite: 23/23 pass, including actual local SQL and the isolated release-guard fixtures.
- Service browser matrix: 36/36 pass across Chromium, Firefox and WebKit.
- Existing homepage regression suite: 10/10 pass in Chromium.
- `git diff --check`: pass. Homepage sources, backend, release settings and noindex configuration have no diff.

The browser matrix covers 320/360/390/605/768/844/1024/1440 CSS-pixel widths, short landscape screens, touch tablets, 200% equivalent reflow, keyboard navigation, disclosures, poster/film geometry, decoded forward/reverse seeking, pause/resume, source changes on rotation, offscreen playback pause, reduced motion, Save-Data, slow connections, invalid media, late media readiness, no-JavaScript contact fallback and synthetic quote validation/retry/package/date contracts. Test requests are mocked, with unexpected writes blocked and server database/email providers disabled. No real lead or message was sent.

Independent visual review covered desktop opening and mid-scroll frames, tablet, 320px and 390px mobile, and 844px landscape. Live in-app browser checks confirmed optional film playback, the offers anchor and package-to-form navigation. The landscape review caught and corrected a missing space where a line break is hidden.

At 1440 × 900, measured extra hero travel is 792px. Automated wheel-to-scroll checks took 73ms in Chromium, 137ms in Firefox and 41ms in WebKit in the final parallel test run. Decoded video frames followed target changes in both directions without the former trailing cursor.

An isolated Chromium sample at 4× CPU slowdown recorded desktop LCP 200ms, CLS 0.0196 and 95th-percentile animation-frame interval 16.3ms; mobile LCP 160ms, CLS 0 and 95th-percentile interval 10ms. Mobile made no initial film request. Desktop optional motion still downloads the existing approximately 6.32MB film. The largest observed long task was 95ms in each sample. Network was local, so these are diagnostic samples rather than transferable performance guarantees. See [QA report](qa-report.md) for the full evidence and limitations.

Evidence is local and ignored: `.local-evidence/carpet-service/results.json`, browser-specific screenshots and `scroll-metrics.json`, plus `premium-build.log`, `premium-typecheck.log`, `premium-lint.log` and `premium-targeted-lint.log`. The repeatable service test configuration is `docs/execution/carpet-service/playwright.config.ts`.

These are automated browser/device emulations and local lab samples, not physical-device validation, field Core Web Vitals or business/release approval.
