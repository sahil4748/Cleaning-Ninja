# HOMEPAGE PROTOTYPE REPORT

> Historical implementation report. Its three prototype captures now live only under `.local-evidence/stabilization-2026-09-27/docs/design/prototype-evidence/`; see [inventory](repository-stabilization-inventory.md). Final H-01/H-02 evidence supersedes those captures.

2026-09-27 · `rebuild-2026` · local implementation, uncommitted. Direction: **THE QUIET RESET × ORDER IN MOTION / THE NINJA CUT**.

## 1. Implementation summary

Implemented the complete homepage prototype in the requested order: navigation, hero, selected packages, services, signature, why, process, evidence-gated proof, Brisbane context, FAQ, one-step quote, final CTA/footer. Hero and signature are the visual peaks; lower sections settle into restrained editorial layouts. Existing routes and internal-page presentation are preserved through a separate legacy shell.

The Foundation, current owner decisions/Business Truth, claims register and Technical Readiness Report were read. The named Creative Intelligence Sprint and Homepage Architecture + Prototype Specification were absent from the checkout and nearby Downloads search; their location was requested. This implementation uses the detailed new owner brief as authority and does not claim conformance to unseen documents. No creative-strategy exercise was reopened.

## 2. Files changed in this sprint

This list excludes the substantial readiness changes already present on entry. They remain uncommitted and preserved.

- `app/page.tsx`: new homepage, Instrument Serif/Manrope and homepage-specific truthful metadata.
- `app/homepage.css`: scoped semantic colours, typography/layout tokens, responsive compositions, controls and cut motion.
- `app/layout.tsx`: delegate presentation to route-aware shell; retain global SEO/indexing and legacy font setup.
- `components/layout/SiteShell.tsx`, `LegacyShell.tsx`: homepage isolation, existing internal shell and motion retained for internal routes only.
- `components/homepage/Homepage.tsx`: sections, package/service/area context, proof gate and footer.
- `components/homepage/HomeHeader.tsx`: real logo assets, desktop/mobile navigation, communication/menu dialogs and focus management.
- `components/homepage/NinjaMedia.tsx`: responsive image art direction, layered cut surfaces and reserved media-slot contract.
- `components/homepage/QuoteForm.tsx`: validated one-step form and durable-acceptance response checks.
- `content/homepage.ts`: allowlisted catalogue fields, package concepts, cautious FAQ and empty approved-review collection.
- `public/homepage/{hero-desktop,hero-mobile,carpet,tile,leather}.jpg`: five local copies of existing catalogue stock sources; 722,026 bytes total before image optimisation.
- `tests/homepage.spec.ts`: focused homepage interactions, responsive, motion, media and local performance checks.
- `docs/design/prototype-evidence/*.png`: three preserved desktop/mobile review captures.
- `AGENTS.md`, `docs/product/owner-decisions.md`, `docs/execution/current-phase.md`: new owner-authorised homepage scope recorded; historic readiness reports preserved.
- `docs/design/asset-manifest.md`: H-01–H-04 production brief and temporary image provenance.
- `docs/execution/homepage-prototype-report.md`: this report.

Original logo files, service routes, lead API/schema, package dependencies and lockfile were not changed during this sprint.

## 3. Desktop composition

Full-width architectural imagery under live HTML typography, asymmetric interior depth, restrained contrast scrim and no beige text panel. Desktop headline remains two lines at the principal review widths. Ivory dominates the page; stone distinguishes services/Brisbane, olive is concentrated in actions, the selected service and final CTA. Instrument Serif supplies display/italic emphasis; Manrope supplies interface/body text.

Packages form a substantial horizontal editorial rail. Services use a ten-item index with an active image and distinct enquiry/explore actions. The 768px layout retains the desktop media source but uses compact navigation; full navigation appears from 1024px.

## 4. Mobile composition

Separate photo/source selection in a portrait hero slot, separate text sizing/placement and 72px compact header. The mobile image is not a crop of the desktop image. Its current stock source is landscape, so the production replacement must be independently composed portrait media.

Packages use touch-native horizontal snap. All ten services are stacked image-led blocks. Lower sections use their own single-column rhythm; quote fields become one column at 320px, with two-column grouping where space permits. Tested first-viewport CTA visibility, including a 320 × 568 short viewport. Full-page mobile service inventory is intentionally long; final source diversity will improve the repeated-image rhythm.

## 5. Header/call architecture

Uses the unchanged `logo-mark.png` and `logo-wordmark.png`. The latter is a square full lockup, so CSS frames its existing lettering beside the separate original mark. No redrawn or substitute logo.

Desktop includes all requested navigation, call/voice entry and Get a Quote. Mobile includes logo, call entry, Get Quote and menu. Native modal dialogs provide semantics, Escape handling/inert background, explicit keyboard focus wrap and return to trigger. The communication sheet displays Call Cleaning Ninja, future AI Voice and callback options, plus quote/email paths. No fabricated number or `tel:` target. The isolated communication component can later receive a verified call action, voice action and callback action.

## 6. Ninja Cut implementation

Two local-image layers: a slightly offset/scaled unresolved image is bounded by a narrow diagonal polygon, which recedes in a finite 1.8-second CSS clip-path transition. The resolved surface settles over 2 seconds. The hero begins once on load; signature begins once on intersection. Copy/CTA do not animate or wait for media.

No new animation dependency, WebGL, canvas, scroll pinning, scroll interception, loader, custom cursor or decorative looping on the homepage. Reduced motion immediately hides the unresolved layer and disables all homepage animations/transitions. No dirt-clean comparison or before/after slider.

## 7. Packages

All five approved concepts: 3-bedroom carpet, 5-bedroom carpet, 3 rugs, 5-seat fabric lounge, 5-seat leather lounge. No price, percentage discount, urgency or invented eligibility. Choosing one selects the service and attaches removable package context to the same quote form, retaining personal/description/address input. Package context is serialised into the existing description field; no incompatible API field is added.

## 8. Services

All ten owner-approved retained services are drawn from the existing catalogue. Only slug/name/route are reused, excluding legacy prices, inclusions and trust claims. Desktop selection changes active media; mobile presents each service directly. Enquiry prefills the form. Existing five detailed service routes remain; auxiliary Explore actions use the existing services hub because dedicated routes do not exist.

## 9. Quote UX

One form: service, suburb/address, description, name, phone, optional email and preferred date/time. Name/phone/suburb are required by the readiness contract; service defaults to “Help me choose”; description remains optional. Accessible validation focuses the first invalid field in display order.

POST JSON uses `LeadSchema` and `/api/quote`. A date preference maps to the existing `booking` intent with `Australia/Brisbane`; UI explicitly says it is only a request. Without a date the intent is `quote`. Time without date is rejected. The form uses POST even without interception, avoiding personal details in a GET URL; JavaScript is required for the JSON submission interaction.

Persistence is still unavailable: the real API responds 503 and the UI says not sent, preserving all values. Network/timeout uncertainty is stated without claiming receipt. Even HTTP 200 with an “accepted” string is rejected without a non-empty durable ID. No synthetic success is provided and no notification or real lead was sent. Input is retained in mounted form state, not saved across reloads or navigation.

## 10. Responsive results

Chromium checks cover 320, 375, 390, 430, 768, 1024, 1366, 1440, 1728 and 1920px, plus 320 × 568. Assertions include first-screen hero CTA, header controls, single H1, no document horizontal overflow throughout the page, and hidden placeholder proof. Intentional package overflow is contained in the local scroll rail.

Generated evidence: `test-results/homepage-{width}.png`, `test-results/homepage-viewport-{width}.png`, and the short-mobile screenshot. Desktop/mobile full-page and viewport screenshots were visually reviewed. Selected review captures are preserved in `docs/design/prototype-evidence/{desktop-1440,mobile-390,mobile-320-short}.png`. Chromium emulation is not physical iOS/Android or Safari sign-off.

## 11. Accessibility results

Semantic header/navigation/main/sections/footer, one H1 and orderly headings; native controls and disclosure FAQ; skip link; visible focus; explicit labels, required/optional cues and field error descriptions. Verified dialog keyboard entry, Shift+Tab wrapping, Escape and trigger focus restoration, mobile menu links, FAQ keyboard use and service-to-form focus. Standalone tested mobile controls meet 44 × 44px targets. Reduced motion is immediate and contains no hidden-reading dependency.

No hydration/page exceptions in responsive runs. No fake review/rating, unsupported trust badge, phone number or proof schema is added. Review architecture returns no public section while approved content is empty. Full assistive-technology, automated axe, contrast-over-final-video and real-device audits remain outstanding; do not represent focused checks as complete WCAG certification.

## 12. Performance observations

No new dependency. Hero art direction uses Next `getImageProps`/`picture` so only the matching responsive source is fetched; lower images are lazy, image containers reserve space, and stock files are local rather than runtime remote requests. Legacy loader/cursor/Lenis/Motion shell is not mounted on the homepage.

One unthrottled local Chromium production-build sample recorded LCP around 0.07 seconds, CLS 0, and approximately 294KB JavaScript transfer. These are warm local observations, not a mobile-network benchmark or field result. Existing root legacy font preloads remain a potential optimisation for a later broader shell cleanup. LCP ≤2.5s and INP ≤200ms are **not certified**; no production RUM/INP data exists. CLS met the local ≤0.1 check. Re-evaluate after production posters/video and on a protected preview with realistic network/CPU conditions.

## 13. Test/build results

- `npm run typecheck`: PASS.
- `npm run lint`: PASS, 0 errors and the unchanged ceiling of 70 legacy warnings; no new-file warnings.
- `npm run test:unit`: PASS, 7/7 readiness tests.
- `npm run check:content`: PASS in existing warning mode; requested future communication labels produce one “Coming soon” warning, alongside two existing `organization` schema warnings. No high/critical findings.
- `npm run build`: PASS, production compilation/typecheck and 98 generated pages; production-release guard remains active.
- `npm run test:e2e -- --workers=2`: PASS, **24/24 Chromium tests in 33.3 seconds**. Includes eight existing readiness/booking regressions and sixteen homepage tests; the existing crawl still covers all 93 content routes.
- `git diff --check`: PASS.

Tests used a separately started production server at 127.0.0.1:8136 with `reuseExistingServer: false` and synthetic inputs only. The agent-browser CLI was unavailable; requested browser checks were performed with the installed Playwright Chromium runner and screenshots instead.

## 14. Remaining visual issues

Temporary stock imagery does not yet achieve the final bespoke cinematic depth or low-detail text-safe staging. Mobile uses an independent photo in the portrait slot, but still needs a true portrait production composition. Signature currently reuses hero stock; auxiliary services repeat generic interiors and carpet/rug cards repeat a source. No image is represented as genuine Cleaning Ninja evidence. Media rights/appropriateness and final crop checks remain required before publication.

The provisional original logo has a warm baked background; CSS framing retains those original pixels. No redesign was attempted. Actual reviews are intentionally absent, so the proof section occupies no space until approved evidence exists. Missing creative source documents must be reconciled before treating the implementation as exact compliance with them.

## 15. Exact Higgsfield asset requirements

The full production brief is in `docs/design/asset-manifest.md`, including rendered dimensions, safe regions, depth, lens/camera constraints, first/end frames, duration, loop rules, fallbacks and byte budgets for every slot.

| Slot | Master/delivery | Text-safe zone | Duration / loop | Delivery budget |
|---|---|---|---|---|
| H-01 desktop poster | 2560 × 1600, 16:10; responsive derivatives | left x6–56%, y15–72% | Static / none | ≤250KB at 1920, ≤400KB at 2560 |
| H-02 mobile poster | independent 1080 × 1920, 9:16 | x6–94%, y7–49% | Static / none | ≤140KB at 750, ≤200KB at 1080 |
| H-03 desktop video | 1920 × 1200 delivery | Match H-01 | ~4s, once, final ≥1s still | ≤2.5MB, 24fps, no audio |
| H-04 mobile video | 720 × 1280 delivery; 1080 × 1920 master | Match H-02 | ~3s, once, final ≥1s still | ≤1.2MB, 24fps, no audio |

Video starts slightly compositionally unresolved and ends precisely on its corresponding calm poster. Architectural diagonal only: no blade/glow/energy, magical cleaning or before/after claim. Posters remain for reduced motion/constrained connections. Neither video slot currently downloads or renders a video. No generation was requested.

## 16. Preview/deployment recommendation

**Ready for local prototype review: final QA is green.** Review desktop/mobile composition and the cut mechanic, then reconcile any missing approved specifications and approve/adjust the asset brief. A later private, access-protected, noindex preview is appropriate only when separately requested; no deployment occurred here.

Not production-ready: durable lead storage/notifications, final media/rights, missing business evidence, existing internal-page launch blockers, operational/legal/domain review and production performance/accessibility QA remain. Do not clear release guards merely to publish this prototype. No main merge, production deployment, DNS/email changes, internal-page redesign or Higgsfield generation. Stop after this report.
