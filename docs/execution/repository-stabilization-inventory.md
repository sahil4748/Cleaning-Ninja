# Repository stabilization — initial inventory

2026-09-27. Captured before cleanup on `rebuild-2026`: **196 files (48 modified, 148 untracked), zero staged**. Each file appears exactly once below. Production-intended means preserved implementation, not release approval.

- A. PRODUCTION-INTENDED CODE: 60
- B. PRODUCTION-INTENDED CONFIG / CONTENT: 25
- C. APPROVED FINAL MEDIA: 2
- D. TESTS: 12
- E. PROJECT DOCUMENTATION: 46
- F. QA / SCREENSHOT EVIDENCE: 12
- G. DEVELOPMENT-ONLY EXPERIMENTS: 6
- H. TEMPORARY / GENERATED / REDUNDANT FILES: 33
- I. UNKNOWN / REQUIRES REVIEW: 0

## Cleanup decision before mutation

No unique media will be deleted. Move rejected MP4s and superseded captures to ignored `.local-evidence/stabilization-2026-09-27/`, preserving their original relative paths. The table records every affected file and binary hash. Keep H-01/H-02 original PNGs, both final desktop screenshots, all H-02 evidence and the H-03 comparison sheet/frame map. Preserve historical narrative reports; annotate their archived captures. Remove H-03 runtime integration and shared media entries, retain experiment source as non-executable text under `experiments/h03/`; preserve retime recipe with local-only paths. No experiment will be served from `public`. Existing H-01/H-02 opt-in static development Cut remains.

| Category | Initial path | Bytes | Disposition and reason | SHA-256 (binary only) |
|---|---|---:|---|---|
| B | `.env.example` | 520 | Keep: Preserve existing checkpoint work |
| E | `AGENTS.md` | 3,061 | Keep: Preserve existing checkpoint work |
| A | `app/api/internal/lead-notifications/route.ts` | 841 | Keep: Preserve existing checkpoint work |
| A | `app/api/quote/route.ts` | 2,182 | Keep: Preserve existing checkpoint work |
| A | `app/book/BookingFlow.tsx` | 36,018 | Keep: Preserve existing checkpoint work |
| A | `app/careers/ApplicationForm.tsx` | 3,567 | Keep: Preserve existing checkpoint work |
| A | `app/contact/ContactForm.tsx` | 3,443 | Keep: Preserve existing checkpoint work |
| A | `app/contact/page.tsx` | 8,808 | Keep: Preserve existing checkpoint work |
| A | `app/globals.css` | 10,633 | Keep: Preserve existing checkpoint work |
| A | `app/homepage.css` | 32,772 | Keep: Preserve existing checkpoint work |
| A | `app/layout.tsx` | 2,955 | Keep: Preserve existing checkpoint work |
| A | `app/legal/privacy/page.tsx` | 4,923 | Keep: Preserve existing checkpoint work |
| A | `app/legal/terms/page.tsx` | 4,919 | Keep: Preserve existing checkpoint work |
| A | `app/page.tsx` | 1,196 | Keep: Preserve existing checkpoint work |
| A | `app/reviews/page.tsx` | 7,066 | Keep: Preserve existing checkpoint work |
| A | `app/robots.ts` | 232 | Keep: Preserve existing checkpoint work |
| A | `app/services/carpet-cleaning/page.tsx` | 1,254 | Keep: Preserve existing checkpoint work |
| A | `app/services/end-of-lease-cleaning/page.tsx` | 1,222 | Keep: Preserve existing checkpoint work |
| A | `app/services/leather-cleaning/page.tsx` | 1,476 | Keep: Preserve existing checkpoint work |
| A | `app/services/tile-grout-cleaning/page.tsx` | 1,324 | Keep: Preserve existing checkpoint work |
| A | `app/services/upholstery-cleaning/page.tsx` | 1,270 | Keep: Preserve existing checkpoint work |
| A | `app/sitemap.ts` | 390 | Keep: Preserve existing checkpoint work |
| A | `components/homepage/HomeHeader.tsx` | 4,357 | Keep: Preserve existing checkpoint work |
| A | `components/homepage/HomeStickyQuote.tsx` | 1,412 | Keep: Preserve existing checkpoint work |
| A | `components/homepage/Homepage.tsx` | 10,583 | Keep: Preserve existing checkpoint work |
| A | `components/homepage/NinjaMedia.tsx` | 4,570 | Keep: Preserve existing checkpoint work |
| A | `components/homepage/QuoteForm.tsx` | 7,383 | Keep: Preserve existing checkpoint work |
| A | `components/layout/Footer.tsx` | 6,112 | Keep: Preserve existing checkpoint work |
| A | `components/layout/LegacyShell.tsx` | 727 | Keep: Preserve existing checkpoint work |
| A | `components/layout/SiteShell.tsx` | 470 | Keep: Preserve existing checkpoint work |
| A | `components/motion/CountUp.tsx` | 1,797 | Keep: Preserve existing checkpoint work |
| A | `components/motion/FadeUp.tsx` | 1,768 | Keep: Preserve existing checkpoint work |
| A | `components/motion/PageLoader.tsx` | 2,260 | Keep: Preserve existing checkpoint work |
| A | `components/motion/Parallax.tsx` | 1,497 | Keep: Preserve existing checkpoint work |
| A | `components/motion/ScaleIn.tsx` | 1,695 | Keep: Preserve existing checkpoint work |
| A | `components/motion/SparkleCursor.tsx` | 6,073 | Keep: Preserve existing checkpoint work |
| A | `components/motion/SplitText.tsx` | 3,100 | Keep: Preserve existing checkpoint work |
| A | `components/motion/Stagger.tsx` | 2,113 | Keep: Preserve existing checkpoint work |
| A | `components/sections/NotFoundContent.tsx` | 14,677 | Keep: Preserve existing checkpoint work |
| A | `components/sections/home/FinalCta.tsx` | 4,554 | Keep: Preserve existing checkpoint work |
| A | `components/sections/home/Hero.tsx` | 5,133 | Keep: Preserve existing checkpoint work |
| A | `components/sections/home/HomeFAQ.tsx` | 3,209 | Keep: Preserve existing checkpoint work |
| A | `components/sections/home/QuoteEstimatorPreview.tsx` | 19,074 | Keep: Preserve existing checkpoint work |
| A | `components/sections/home/Reviews.tsx` | 7,520 | Keep: Preserve existing checkpoint work |
| A | `components/sections/home/TrustStrip.tsx` | 2,634 | Keep: Preserve existing checkpoint work |
| A | `components/seo/JsonLd.tsx` | 462 | Keep: Preserve existing checkpoint work |
| B | `content/business-config.ts` | 991 | Keep: Preserve existing checkpoint work |
| B | `content/business-truth.ts` | 718 | Keep: Preserve existing checkpoint work |
| B | `content/faq.ts` | 2,304 | Keep: Preserve existing checkpoint work |
| B | `content/features.ts` | 1,204 | Keep: Preserve existing checkpoint work |
| B | `content/homepage.ts` | 1,475 | Keep: Preserve existing checkpoint work |
| B | `content/journal.ts` | 4,147 | Keep: Preserve existing checkpoint work |
| B | `content/knowledge.ts` | 1,070 | Keep: Preserve existing checkpoint work |
| B | `content/media.ts` | 998 | Keep: Preserve existing checkpoint work |
| B | `content/navigation.ts` | 2,124 | Keep: Preserve existing checkpoint work |
| B | `content/packages.ts` | 1,331 | Keep: Preserve existing checkpoint work |
| B | `content/release-readiness.json` | 572 | Keep: Preserve existing checkpoint work |
| B | `content/reviews.ts` | 1,227 | Keep: Preserve existing checkpoint work |
| B | `content/service-catalogue.ts` | 3,353 | Keep: Preserve existing checkpoint work |
| B | `content/services.ts` | 7,146 | Keep: Preserve existing checkpoint work |
| B | `content/team.ts` | 4,532 | Keep: Preserve existing checkpoint work |
| A | `db/migrations/001_leads.sql` | 1,321 | Keep: Preserve existing checkpoint work |
| E | `docs/ai/assistant-scope.md` | 703 | Keep: Preserve existing checkpoint work |
| E | `docs/ai/knowledge-policy.md` | 1,109 | Keep: Preserve existing checkpoint work |
| E | `docs/ai/voice-agent-scope.md` | 663 | Keep: Preserve existing checkpoint work |
| E | `docs/architecture/lead-operations.md` | 18,157 | Keep: Preserve existing checkpoint work |
| E | `docs/architecture/platform-architecture.md` | 15,902 | Keep: Preserve existing checkpoint work |
| E | `docs/design/asset-manifest.md` | 13,294 | Keep: Preserve existing checkpoint work |
| E | `docs/design/cinematic-direction.md` | 691 | Keep: Preserve existing checkpoint work |
| E | `docs/design/design-system.md` | 1,748 | Keep: Preserve existing checkpoint work |
| E | `docs/design/hero-concepts.md` | 1,032 | Keep: Preserve existing checkpoint work |
| E | `docs/design/motion-system.md` | 1,645 | Keep: Preserve existing checkpoint work |
| H | `docs/design/prototype-evidence/desktop-1440.png` | 1,289,511 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `551f554db881cdf0a928212c190cf058556d6ba1232fb938b7cdcef45a5629f3`
| H | `docs/design/prototype-evidence/mobile-320-short.png` | 161,566 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `0a019c549ebb01aa814c364f363078d675afdf17a76225312c8cac67963100f9`
| H | `docs/design/prototype-evidence/mobile-390.png` | 242,829 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `89857d1c2e23eea9351ab4d6a2c44a5ebf2c297769a8e3e8f0bbe6e7855a63ed`
| E | `docs/design/references.md` | 953 | Keep: Preserve existing checkpoint work |
| E | `docs/design/responsive-rules.md` | 2,058 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/architecture.md` | 1,762 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/baseline-checks.md` | 5,536 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/dependencies.md` | 8,050 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/deployment.md` | 1,457 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/integrations.md` | 1,467 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/performance-budget.md` | 2,629 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/route-seo-inventory.md` | 85,051 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/system-classification.md` | 2,847 | Keep: Preserve existing checkpoint work |
| E | `docs/engineering/technical-readiness.md` | 3,444 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/current-phase.md` | 1,035 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/decisions.md` | 2,365 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/desktop-hero-art-direction-report.md` | 8,053 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/foundation-report.md` | 15,287 | Keep: Preserve existing checkpoint work |
| H | `docs/execution/h01-art-direction-screenshots/cta-focus-1440.png` | 949,159 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `58b3dc0ddb63f0e99b143e31dd59298530b6d5a2c39d962f6e13b15dde01d6df`
| H | `docs/execution/h01-art-direction-screenshots/cut-preview-1440.png` | 950,108 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `ca612a8daaa176552007c5b6da6199803d2f2e550ad3a7737bdf03311e0bd33d`
| H | `docs/execution/h01-art-direction-screenshots/header-scrolled-1440.png` | 807,850 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `6baf988ebad0bcaee1599aeb3f76c0904319397664562037f897aff97f148a1c`
| H | `docs/execution/h01-art-direction-screenshots/hero-1366.png` | 892,528 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `0e9da59b1ba8beb04368f87061a28cfa445910974c9861ad587e70ddccb839f0`
| H | `docs/execution/h01-art-direction-screenshots/hero-1440.png` | 949,569 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `56958c9cc83f092bd727db0ef0fa893f7e81a7468da22a2a2beba3c6e35e8959`
| H | `docs/execution/h01-art-direction-screenshots/hero-1728.png` | 1,252,627 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `253442f2f200a25f6b22de6ec640f0cd4ceb1d01629948f69ef18950a7e2c00f`
| H | `docs/execution/h01-art-direction-screenshots/hero-1920.png` | 1,399,581 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `0b504d0ea6aa14bbc4094e071c9f936e35c139586ec03a0dc47f06efd47b4837`
| E | `docs/execution/h01-final-static-cleanup.md` | 2,253 | Keep: Preserve existing checkpoint work |
| F | `docs/execution/h01-final-static-screenshots/hero-1440.png` | 1,049,814 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `9e7c770bf9f0d63d005edc1751c190bb0b818ff9fcbab84f6f4e6007976881ad`
| F | `docs/execution/h01-final-static-screenshots/hero-1920.png` | 1,398,572 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `0f55f2301cc04c69b6b1c18d2ff06a9745dbe3764bdd7c8c45478653dddc8a15`
| E | `docs/execution/h01-integration-checkpoint.md` | 6,824 | Keep: Preserve existing checkpoint work |
| H | `docs/execution/h01-screenshots/cta-focus-1440.png` | 925,131 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `4ba8026ad3e36a8537c6c2894f742cc18ecdaf7af510ba8b7cba81359986cac1`
| H | `docs/execution/h01-screenshots/cut-preview-1440.png` | 923,769 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `160fcb9bdf50071b13127f8889c29ecce59ceaf975aef05373fd6c2c0aca2a0b`
| H | `docs/execution/h01-screenshots/hero-1366.png` | 827,759 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `5285d21cfc6b7d2a357d63b8099ee88770f2b6319a41264a596b57f216b6b827`
| H | `docs/execution/h01-screenshots/hero-1440.png` | 924,772 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `bed1b049c0ed3a74dce023dd72d9aa5105582a7ffbfd114a7136fe5fee6471ef`
| H | `docs/execution/h01-screenshots/hero-1728.png` | 1,190,098 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `107af7c7f2ce743a847f1ea59533de48c5172fa720105e142ae188c0fa5304b1`
| H | `docs/execution/h01-screenshots/hero-1920.png` | 1,311,317 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `e02d50c2994ea9133014c19d0f9041b86a55677cad57166202443127a476b6a7`
| E | `docs/execution/h02-mobile-integration-report.md` | 10,627 | Keep: Preserve existing checkpoint work |
| F | `docs/execution/h02-screenshots/cta-focus-375.png` | 235,662 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `b44ecd67f5ac0b138cfcf9cb352edbbae7bf26913506f4a796d2666b56343733`
| F | `docs/execution/h02-screenshots/cut-preview-375.png` | 236,791 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `3a178ae016730cda998baa53cea6c1bb2e5863d1b95960f420f8f0a75be8307a`
| E | `docs/execution/h02-screenshots/development-check.txt` | 117 | Keep: Preserve existing checkpoint work |
| F | `docs/execution/h02-screenshots/header-scrolled-375.png` | 219,393 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `7d68e06f913311c3f8caacb69a89c60b8a5b027665d30d7be7c396a2d3880be1`
| F | `docs/execution/h02-screenshots/hero-320.png` | 169,920 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `7672f33f79f8eb5b3aafb60b9e87f06d45dcc612abfb3b818992869646f0222c`
| F | `docs/execution/h02-screenshots/hero-375.png` | 236,327 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `650aac99172203c1207be13ee1c6eb4e381a50c1d6370edc98a4d3a7b7e59cb8`
| F | `docs/execution/h02-screenshots/hero-390.png` | 248,362 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `13d3cfd8b0397a97e74cff9bc8056985f5073712d4f684b512917e58a6bcdbcc`
| F | `docs/execution/h02-screenshots/hero-430.png` | 277,960 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `10a55774021f6a958a1d77ba3f4ecb181e56ee91065bdf9e6aed9ef0195a11e0`
| F | `docs/execution/h02-screenshots/hero-768.png` | 564,519 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `6b3f2162f260ab1a521e48edb1ca93b91dedad4b0df0bd3d6be46d7a20ebdf7c`
| F | `docs/execution/h02-screenshots/sticky-375.png` | 185,633 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `f4ed325ff496c8db0fe176351eefec8a3548ebe1946fed77cc146305e0f89d54`
| E | `docs/execution/h03-motion-integration-report.md` | 14,105 | Keep: Preserve existing checkpoint work |
| F | `docs/execution/h03-screenshots/comparison-contact-sheet.png` | 2,704,720 | Keep: Final static, responsive, accessibility or comparison evidence | SHA256 `bd1a2157e6e88806795315ce27c02ec8b2bb67b8c587aff48afb69815e9f05fb`
| G | `docs/execution/h03-screenshots/frame-map.json` | 8,691 | Keep: Compact experiment frame mapping |
| H | `docs/execution/h03-screenshots/h01-fallback-1440.png` | 1,051,641 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `d92bc757ab027b31e1adfbbfb46942150277b17fb12c5918a583a1acbc309d33`
| H | `docs/execution/h03-screenshots/raw-1366-end.png` | 1,280,231 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `efdd58ac6d730cbdb706c3fdfe778067c1069bd9918e0b4e4b9ee6c7baf78eb8`
| H | `docs/execution/h03-screenshots/raw-1440-1s.png` | 1,284,727 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `5716a971f608e997af8bfe0152ce81799cc278135527dfde1d44ca50c2e83477`
| H | `docs/execution/h03-screenshots/raw-1440-4s.png` | 1,442,386 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `cec3eb63dd5fba4e6c9bb9927e326a19ef4fbe2fda3f506f8be258cdca520a0c`
| H | `docs/execution/h03-screenshots/raw-1440-end.png` | 1,520,668 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `b7bc8683242646cf550d9620ad6b4f49a76b69f21a771b5f882402f278ae3c1e`
| H | `docs/execution/h03-screenshots/raw-1440-middle.png` | 1,350,020 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `04b66c10c5ae6f7194bed2bd61acc6819e4e209b2ff8fc680dff1b1e3a3a559f`
| H | `docs/execution/h03-screenshots/raw-1440-start.png` | 1,193,811 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `e833d064811da47cba2c9b8d20bf5cb9d4b2218da67c9f5613407eb6ec39904c`
| H | `docs/execution/h03-screenshots/raw-1728-end.png` | 1,860,183 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `33cb61a6bf4af7d0208f1e22a47271dd1eb054b9e785eee376322b9679d465c6`
| H | `docs/execution/h03-screenshots/raw-1920-end.png` | 2,246,360 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `81f7c9a67b833b5af13099be4b0081759f53294f89e44f394f5ada428513d5f7`
| H | `docs/execution/h03-screenshots/retimed-1366-end.png` | 1,297,978 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `57b92de3cbc26a29dcb425eb6c63582b5acfe4b60c4e4bd39a84a4edd4f157f0`
| H | `docs/execution/h03-screenshots/retimed-1440-1s.png` | 1,282,962 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `0ad98c3afc19476c71dc7bffd2608ea5fdd9fc55b4e184efb3c64700224d9c36`
| H | `docs/execution/h03-screenshots/retimed-1440-4s.png` | 1,526,008 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `7b8aad620dae0acec77e094aff90b671ac5786f2aaee0c747bb688e731fdb2b8`
| H | `docs/execution/h03-screenshots/retimed-1440-end.png` | 1,540,050 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `e8b3c08216cb0fed71ed698c422cd4f57c0963eb0e7dad87b114dda39a8adf10`
| H | `docs/execution/h03-screenshots/retimed-1440-middle.png` | 1,416,484 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `25c7357c08a08e38bcc6b56e9322440452b488fdb812c68718fa7b239194c51e`
| H | `docs/execution/h03-screenshots/retimed-1440-start.png` | 980,412 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `40d906946f407cdde6862789d74c7813a9e4eec54a542ee6d32cf6aab57e6bf0`
| H | `docs/execution/h03-screenshots/retimed-1728-end.png` | 1,884,780 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `1d06cf351637c0c0d7357dc8befb309a7778b64a05cc9f854817adfc9204d505`
| H | `docs/execution/h03-screenshots/retimed-1920-end.png` | 2,283,511 | Local archive: Superseded captures or individual frames; preserve locally, retain final stills and H-03 comparison sheet in Git | SHA256 `bbfcc8ba630dc469c16bf40a7294313ff558def07d9a7ecd5adf5d963e514c0d`
| E | `docs/execution/homepage-prototype-report.md` | 14,565 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/qa-checklist.md` | 1,728 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/roadmap.md` | 884 | Keep: Preserve existing checkpoint work |
| E | `docs/execution/technical-readiness-report.md` | 10,270 | Keep: Preserve existing checkpoint work |
| E | `docs/operations/analytics-events.md` | 1,035 | Keep: Preserve existing checkpoint work |
| E | `docs/operations/dns-email.md` | 882 | Keep: Preserve existing checkpoint work |
| E | `docs/operations/lead-handling.md` | 2,685 | Keep: Preserve existing checkpoint work |
| E | `docs/operations/privacy-data-map.md` | 1,640 | Keep: Preserve existing checkpoint work |
| E | `docs/product/claims-register.md` | 8,441 | Keep: Preserve existing checkpoint work |
| E | `docs/product/content-inventory.md` | 4,566 | Keep: Preserve existing checkpoint work |
| E | `docs/product/content-rules.md` | 1,353 | Keep: Preserve existing checkpoint work |
| E | `docs/product/owner-decisions.md` | 9,486 | Keep: Preserve existing checkpoint work |
| E | `docs/product/scope.md` | 643 | Keep: Preserve existing checkpoint work |
| E | `docs/product/verified-business-facts.md` | 1,218 | Keep: Preserve existing checkpoint work |
| E | `docs/product/vision.md` | 789 | Keep: Preserve existing checkpoint work |
| B | `eslint.config.mjs` | 1,963 | Keep: Preserve existing checkpoint work |
| A | `lib/calendar-date.ts` | 404 | Keep: Preserve existing checkpoint work |
| A | `lib/lead-contract.ts` | 3,110 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/assistant.ts` | 1,496 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/booking.ts` | 1,156 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/email.ts` | 2,748 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/lead-client.ts` | 944 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/lead-service.ts` | 2,723 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/lead-store.ts` | 3,574 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/metadata.ts` | 870 | Keep: Preserve existing checkpoint work |
| A | `lib/platform/notifications.ts` | 3,441 | Keep: Preserve existing checkpoint work |
| A | `lib/route-inventory.ts` | 605 | Keep: Preserve existing checkpoint work |
| A | `lib/schema.ts` | 1,626 | Keep: Preserve existing checkpoint work |
| A | `lib/site-config.ts` | 490 | Keep: Preserve existing checkpoint work |
| A | `lib/use-reduced-motion.ts` | 590 | Keep: Preserve existing checkpoint work |
| B | `next.config.js` | 783 | Keep: Preserve existing checkpoint work |
| B | `package-lock.json` | 273,803 | Keep: Preserve existing checkpoint work |
| B | `package.json` | 1,610 | Keep: Preserve existing checkpoint work |
| D | `playwright.config.ts` | 1,640 | Keep: Preserve existing checkpoint work |
| G | `playwright.h03.config.ts` | 407 | Separate: Archive experiment source; move videos outside public and exclude binaries from Git |
| B | `public/homepage/carpet.jpg` | 165,182 | Keep: Referenced illustrative homepage/service media | SHA256 `d249da05871fdb77a0cfe1e1577ff4ec4fba6e21c81cf7ac5954c7af2f6acd8f`
| G | `public/homepage/h03-desktop-raw.mp4` | 4,744,955 | Separate: Archive experiment source; move videos outside public and exclude binaries from Git | SHA256 `3e8045159b95c6a1ea80550f9feb75475f9405ac9c4bda01c3dbfd55a3514b61`
| G | `public/homepage/h03-desktop-retimed.mp4` | 5,505,164 | Separate: Archive experiment source; move videos outside public and exclude binaries from Git | SHA256 `4120bade54a9b671fb04d0bcb056df89cf6d8c1fe50301fd89ea4016f3a9027e`
| B | `public/homepage/hero-desktop.jpg` | 313,320 | Keep: Referenced illustrative homepage/service media | SHA256 `d1a33440bff0f635b95d5f38f8d79ca1601cd617360acd324c623b0ef127007b`
| B | `public/homepage/hero-mobile.jpg` | 83,916 | Keep: Referenced illustrative homepage/service media | SHA256 `86eb865955ccb6da47894ba91c7a7a484278bbcb3ee8d6b8bb6e40cc9e2e3791`
| C | `public/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png` | 22,743,529 | Keep: Approved H-01/H-02 source | SHA256 `5c7871e1b311271575ad1e7b483044e9f47fb350a15852e052f203316b923cff`
| C | `public/homepage/hf_20260927_092222_11c8acc0-5d6c-4011-8c6e-e296ed798105.png` | 21,108,020 | Keep: Approved H-01/H-02 source | SHA256 `e6d526e625fac745945e45c60f5f5ec8587546b29410da61e0cee5c0d2a8bfdd`
| B | `public/homepage/leather.jpg` | 87,418 | Keep: Referenced illustrative homepage/service media | SHA256 `6849c786b7b1831c2964694e9767ded161814761acb7f66628bdb50f55eb7bc6`
| B | `public/homepage/tile.jpg` | 72,190 | Keep: Referenced illustrative homepage/service media | SHA256 `f1a2bd09cc8d110a5904a73ace80055337df95b8bd87f7ef261fd6efd1b54d74`
| A | `scripts/check-release.ts` | 450 | Keep: Preserve existing checkpoint work |
| G | `scripts/retime-h03.py` | 2,070 | Separate: Archive experiment source; move videos outside public and exclude binaries from Git |
| D | `tests/booking-flow.spec.ts` | 4,860 | Keep: Preserve existing checkpoint work |
| D | `tests/h01-checkpoint.spec.ts` | 2,823 | Keep: Preserve existing checkpoint work |
| D | `tests/h02-checkpoint.spec.ts` | 5,385 | Keep: Preserve existing checkpoint work |
| G | `tests/h03-checkpoint.spec.ts` | 5,984 | Separate: Archive experiment source; move videos outside public and exclude binaries from Git |
| D | `tests/homepage.spec.ts` | 10,341 | Keep: Preserve existing checkpoint work |
| D | `tests/platform.spec.ts` | 3,228 | Keep: Preserve existing checkpoint work |
| D | `tests/readiness.spec.ts` | 4,532 | Keep: Preserve existing checkpoint work |
| D | `tests/unit/isolated-environment.ts` | 226 | Keep: Preserve existing checkpoint work |
| D | `tests/unit/lead-operations.test.ts` | 8,222 | Keep: Preserve existing checkpoint work |
| D | `tests/unit/placeholder-reviews.ts` | 4,777 | Keep: Preserve existing checkpoint work |
| D | `tests/unit/platform.test.ts` | 7,371 | Keep: Preserve existing checkpoint work |
| D | `tests/unit/readiness.test.ts` | 4,585 | Keep: Preserve existing checkpoint work |

## Intentional local-only files after cleanup

All files below are ignored, unchanged in content and intentionally uncommitted; they are preserved experiments or superseded evidence. They are not included in the remote checkpoint.

- `.local-evidence/stabilization-2026-09-27/docs/design/prototype-evidence/desktop-1440.png` — 1,289,511 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/design/prototype-evidence/mobile-320-short.png` — 161,566 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/design/prototype-evidence/mobile-390.png` — 242,829 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/cta-focus-1440.png` — 949,159 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/cut-preview-1440.png` — 950,108 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/header-scrolled-1440.png` — 807,850 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1366.png` — 892,528 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1440.png` — 949,569 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1728.png` — 1,252,627 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-art-direction-screenshots/hero-1920.png` — 1,399,581 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/cta-focus-1440.png` — 925,131 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/cut-preview-1440.png` — 923,769 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1366.png` — 827,759 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1440.png` — 924,772 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1728.png` — 1,190,098 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h01-screenshots/hero-1920.png` — 1,311,317 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/h01-fallback-1440.png` — 1,051,641 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1366-end.png` — 1,280,231 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-1s.png` — 1,284,727 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-4s.png` — 1,442,386 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-end.png` — 1,520,668 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-middle.png` — 1,350,020 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1440-start.png` — 1,193,811 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1728-end.png` — 1,860,183 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/raw-1920-end.png` — 2,246,360 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1366-end.png` — 1,297,978 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-1s.png` — 1,282,962 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-4s.png` — 1,526,008 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-end.png` — 1,540,050 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-middle.png` — 1,416,484 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1440-start.png` — 980,412 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1728-end.png` — 1,884,780 bytes.
- `.local-evidence/stabilization-2026-09-27/docs/execution/h03-screenshots/retimed-1920-end.png` — 2,283,511 bytes.
- `.local-evidence/stabilization-2026-09-27/public/homepage/h03-desktop-raw.mp4` — 4,744,955 bytes.
- `.local-evidence/stabilization-2026-09-27/public/homepage/h03-desktop-retimed.mp4` — 5,505,164 bytes.

## Checkpoint-created or adjusted files

- `.gitignore`: excludes the local evidence archive.
- `experiments/h03/README.md`, `NinjaMedia.tsx.txt`, `motion.css.txt`, `h03-checkpoint.spec.ts.txt`, `playwright.h03.config.ts.txt`: inactive source/evaluation evidence, category G.
- `docs/execution/repository-stabilization-inventory.md` and `repository-stabilization-report.md`: checkpoint audit/report, category E.
- `tests/h01-checkpoint.spec.ts`: adds raw/retimed query and 404 regression checks.
- `tests/h02-checkpoint.spec.ts`: writes fresh captures into ignored test results.
- `components/homepage/NinjaMedia.tsx`, `app/homepage.css`, `content/media.ts`: remove only H-03 runtime and media entries.
- `scripts/retime-h03.py`: output stays local-only; no retime performed.
- Current phase, owner decisions, AGENTS and historical-report annotations: clarify present authority and archived evidence.
- `content/release-readiness.json`: correct stale implementation wording while retaining all production blockers.
