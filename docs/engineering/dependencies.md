# Dependency inventory

Versions from committed lockfile, installed with npm ci --ignore-scripts. Absence of app imports does not prove a build-time tool is unused. No packages removed.

| Package | Declared | Locked | Source imports |
|---|---|---|---|
| @gsap/react | ^2.1.2 | 2.1.2 | components/motion/PinnedScroll.tsx |
| @hookform/resolvers | ^3.10.0 | 3.10.0 | app/contact/ContactForm.tsx, app/careers/ApplicationForm.tsx |
| @lottiefiles/dotlottie-react | ^0.13.0 | 0.13.5 | No application import found; inspect tooling/transitive need |
| @tailwindcss/postcss | ^4.1.15 | 4.2.2 | No application import found; inspect tooling/transitive need |
| @types/node | ^24.9.1 | 24.12.2 | No application import found; inspect tooling/transitive need |
| @types/react | ^19.2.2 | 19.2.14 | No application import found; inspect tooling/transitive need |
| @types/three | ^0.171.0 | 0.171.0 | No application import found; inspect tooling/transitive need |
| autoprefixer | ^10.4.21 | 10.5.0 | No application import found; inspect tooling/transitive need |
| clsx | ^2.1.1 | 2.1.1 | lib/utils.ts |
| framer-motion | ^12.23.24 | 12.38.0 | app/book/BookingFlow.tsx, components/sections/NotFoundContent.tsx, components/sections/home/Hero.tsx, components/sections/home/TrustStrip.tsx, components/sections/home/QuoteEstimatorPreview.tsx, components/sections/home/PricingPreview.tsx, components/sections/home/Reviews.tsx, components/motion/SplitText.tsx, components/motion/Parallax.tsx, components/motion/Stagger.tsx, components/motion/FadeUp.tsx, components/motion/CountUp.tsx, components/motion/PageLoader.tsx, components/motion/MotionProvider.tsx, components/motion/ScaleIn.tsx |
| gsap | ^3.13.0 | 3.15.0 | components/motion/gsap-core.ts |
| lenis | ^1.1.18 | 1.3.23 | components/motion/LenisProvider.tsx |
| lucide-react | ^0.546.0 | 0.546.0 | app/journal/page.tsx, app/journal/[slug]/page.tsx, app/contact/ContactForm.tsx, app/contact/page.tsx, app/service-areas/page.tsx, app/service-areas/[city]/page.tsx, app/service-areas/[city]/[suburb]/page.tsx, app/gallery/GalleryGrid.tsx, app/about/page.tsx, app/careers/ApplicationForm.tsx, app/careers/page.tsx, app/team/TeamGrid.tsx, app/book/BookingFlow.tsx, app/legal/insurance/page.tsx, app/pricing/PricingMatrices.tsx, app/services/page.tsx, app/reviews/ReviewsWall.tsx, app/reviews/page.tsx, components/sections/NotFoundContent.tsx, components/sections/home/Hero.tsx, components/sections/home/TrustStrip.tsx, components/sections/home/BecomeCleaner.tsx, components/sections/home/FinalCta.tsx, components/sections/home/Services.tsx, components/sections/home/QuoteEstimatorPreview.tsx, components/sections/home/PricingPreview.tsx, components/sections/home/Journal.tsx, components/sections/home/BeforeAfter.tsx, components/sections/home/Process.tsx, components/sections/home/CoverageArea.tsx, components/sections/home/OurStandard.tsx, components/sections/home/Reviews.tsx, components/sections/service/ServiceDetail.tsx, components/layout/Header.tsx |
| next | ^16.0.0 | 16.2.4 | app/robots.ts, app/sitemap.ts, app/layout.tsx, app/not-found.tsx, app/journal/page.tsx, app/journal/[slug]/page.tsx, app/contact/page.tsx, app/service-areas/page.tsx, app/service-areas/[city]/page.tsx, app/service-areas/[city]/[suburb]/page.tsx, app/gallery/GalleryGrid.tsx, app/gallery/page.tsx, app/about/page.tsx, app/careers/page.tsx, app/team/TeamGrid.tsx, app/team/page.tsx, app/our-standard/page.tsx, app/book/BookingFlow.tsx, app/book/page.tsx, app/api/quote/route.ts, app/legal/LegalLayout.tsx, app/legal/privacy/page.tsx, app/legal/terms/page.tsx, app/legal/insurance/page.tsx, app/pricing/PricingMatrices.tsx, app/pricing/page.tsx, app/services/page.tsx, app/services/end-of-lease-cleaning/page.tsx, app/services/tile-grout-cleaning/page.tsx, app/services/carpet-cleaning/page.tsx, app/services/leather-cleaning/page.tsx, app/services/upholstery-cleaning/page.tsx, app/reviews/page.tsx, components/sections/NotFoundContent.tsx, components/sections/home/Hero.tsx, components/sections/home/HeroCanvas.tsx, components/sections/home/BecomeCleaner.tsx, components/sections/home/FinalCta.tsx, components/sections/home/HomeFAQ.tsx, components/sections/home/Services.tsx, components/sections/home/QuoteEstimatorPreview.tsx, components/sections/home/PricingPreview.tsx, components/sections/home/Journal.tsx, components/sections/home/GrimeToGleam.tsx, components/sections/home/BeforeAfter.tsx, components/sections/home/CoverageArea.tsx, components/sections/home/OurStandard.tsx, components/sections/service/ServiceDetail.tsx, components/layout/Footer.tsx, components/layout/MobileStickyCta.tsx, components/layout/Header.tsx |
| postcss | ^8.5.6 | 8.5.10 | No application import found; inspect tooling/transitive need |
| react | ^19.2.0 | 19.2.5 | app/contact/ContactForm.tsx, app/gallery/GalleryGrid.tsx, app/careers/ApplicationForm.tsx, app/team/TeamGrid.tsx, app/book/BookingFlow.tsx, app/legal/LegalLayout.tsx, app/pricing/PricingMatrices.tsx, app/reviews/ReviewsWall.tsx, components/ui/Tilt.tsx, components/ui/Card.tsx, components/ui/Container.tsx, components/ui/Cluster.tsx, components/ui/Section.tsx, components/ui/Divider.tsx, components/ui/Accordion.tsx, components/ui/Eyebrow.tsx, components/ui/RadioCard.tsx, components/ui/Heading.tsx, components/ui/Body.tsx, components/ui/Stack.tsx, components/ui/Caption.tsx, components/ui/Button.tsx, components/ui/Checkbox.tsx, components/ui/Select.tsx, components/ui/Textarea.tsx, components/ui/Input.tsx, components/sections/NotFoundContent.tsx, components/sections/home/HeroCanvas.tsx, components/sections/home/Services.tsx, components/sections/home/QuoteEstimatorPreview.tsx, components/sections/home/PricingPreview.tsx, components/sections/home/GrimeToGleam.tsx, components/sections/home/BeforeAfter.tsx, components/sections/home/Process.tsx, components/sections/home/CoverageArea.tsx, components/sections/home/Reviews.tsx, components/layout/MobileStickyCta.tsx, components/layout/Header.tsx, components/motion/SplitText.tsx, components/motion/SparkleCursor.tsx, components/motion/Parallax.tsx, components/motion/LenisProvider.tsx, components/motion/PinnedScroll.tsx, components/motion/Stagger.tsx, components/motion/FadeUp.tsx, components/motion/CountUp.tsx, components/motion/PageLoader.tsx, components/motion/MotionProvider.tsx, components/motion/ScaleIn.tsx |
| react-dom | ^19.2.0 | 19.2.5 | No application import found; inspect tooling/transitive need |
| react-hook-form | ^7.65.0 | 7.72.1 | app/contact/ContactForm.tsx, app/careers/ApplicationForm.tsx |
| tailwind-merge | ^3.3.1 | 3.5.0 | lib/utils.ts |
| tailwindcss | ^4.1.15 | 4.2.2 | No application import found; inspect tooling/transitive need |
| three | ^0.171.0 | 0.171.0 | No application import found; inspect tooling/transitive need |
| typescript | ^5.9.3 | 5.9.3 | No application import found; inspect tooling/transitive need |
| zod | ^4.1.12 | 4.3.6 | app/contact/ContactForm.tsx, app/careers/ApplicationForm.tsx |
| @playwright/test | ^1.60.0 | 1.60.0 | No application import found; inspect tooling/transitive need |
| prettier | ^3.6.2 | 3.8.3 | No application import found; inspect tooling/transitive need |
| prettier-plugin-tailwindcss | ^0.7.1 | 0.7.2 | No application import found; inspect tooling/transitive need |
| tsx | ^4.19.2 | 4.22.3 | No application import found; inspect tooling/transitive need |

## Unreferenced component candidates

Static relative/alias import scan found no incoming imports for the following. This is a deletion-review shortlist, not proof of runtime dead code or deletion authorization.

- components/ui/Card.tsx
- components/ui/Divider.tsx
- components/ui/RadioCard.tsx
- components/ui/Checkbox.tsx
- components/sections/home/Journal.tsx
- components/motion/ScaleIn.tsx

three / @types/three and dotlottie are installed without application imports. R3F/drei absent. GSAP and Framer Motion both active; Lenis adds separate scroll scheduling. Build/type packages are mixed into dependencies. No bundle analyzer, linter package/config or unit-test runner was found.
