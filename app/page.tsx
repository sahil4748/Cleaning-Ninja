import Hero from '@/components/sections/home/Hero'
import TrustStrip from '@/components/sections/home/TrustStrip'
import QuoteEstimatorPreview from '@/components/sections/home/QuoteEstimatorPreview'
import Services from '@/components/sections/home/Services'
import PricingPreview from '@/components/sections/home/PricingPreview'
import OurStandard from '@/components/sections/home/OurStandard'
import BeforeAfter from '@/components/sections/home/BeforeAfter'
import Reviews from '@/components/sections/home/Reviews'
import CoverageArea from '@/components/sections/home/CoverageArea'
import Process from '@/components/sections/home/Process'
import BecomeCleaner from '@/components/sections/home/BecomeCleaner'
import HomeFAQ from '@/components/sections/home/HomeFAQ'
import FinalCta from '@/components/sections/home/FinalCta'

/**
 * Cleaning Ninja — homepage.
 *
 * Section sequence locked by the redev plan (§4.3):
 *  1. Hero
 *  2. TrustStrip
 *  3. QuoteEstimatorPreview
 *  4. Services
 *  5. PricingPreview
 *  6. OurStandard
 *  7. BeforeAfter
 *  8. Reviews
 *  9. CoverageArea
 * 10. Process
 * 11. BecomeCleaner
 * 12. HomeFAQ
 * 13. FinalCta
 *
 * Header + Footer + MobileStickyCta are rendered in app/layout.tsx.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <QuoteEstimatorPreview />
      <Services />
      <PricingPreview />
      <OurStandard />
      <BeforeAfter />
      <Reviews />
      <CoverageArea />
      <Process />
      <BecomeCleaner />
      <HomeFAQ />
      <FinalCta />
    </>
  )
}
