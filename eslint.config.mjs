import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
export default defineConfig([
  ...nextVitals,
  { files: ['content/business-truth.ts', 'app/api/**/*.{ts,tsx}'], rules: {
    'no-restricted-imports': ['error', { patterns: [{ group: ['*content/reviews*', '*content/team*', '*content/pricing*', '*content/journal*'], message: 'Prototype data must not enter business-truth APIs.' }] }],
  } },
  // Existing copy punctuation and legacy mount effects remain visible as warnings.
  // Avoid unrelated source churn in this technical sprint; new files retain errors.
  { files: ["app/about/page.tsx", "app/book/BookingFlow.tsx", "app/careers/page.tsx", "app/contact/page.tsx", "app/journal/\\[slug\\]/page.tsx", "app/legal/insurance/page.tsx", "app/legal/privacy/page.tsx", "app/legal/terms/page.tsx", "app/pricing/PricingMatrices.tsx", "app/reviews/ReviewsWall.tsx", "app/reviews/page.tsx", "app/service-areas/\\[city\\]/\\[suburb\\]/page.tsx", "app/service-areas/\\[city\\]/page.tsx", "app/service-areas/page.tsx", "app/team/TeamGrid.tsx", "app/team/page.tsx", "components/sections/home/BecomeCleaner.tsx", "components/sections/home/HomeFAQ.tsx", "components/sections/home/PricingPreview.tsx", "components/sections/home/Process.tsx", "components/sections/home/QuoteEstimatorPreview.tsx", "components/sections/home/Reviews.tsx", "components/sections/home/Services.tsx", "components/sections/service/ServiceDetail.tsx"], rules: { "react/no-unescaped-entities": 'warn' } },
  { files: ["app/book/BookingFlow.tsx", "components/layout/Header.tsx", "components/motion/CountUp.tsx", "components/motion/PageLoader.tsx", "components/sections/NotFoundContent.tsx", "components/sections/home/GrimeToGleam.tsx", "components/ui/Tilt.tsx"], rules: { "react-hooks/set-state-in-effect": 'warn' } },
  globalIgnores(['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**', 'next-env.d.ts']),
])
