import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import SpecialOffers from '@/components/sections/SpecialOffers'
import NinjaClub from '@/components/sections/NinjaClub'
import Testimonials from '@/components/sections/Testimonials'
import QuoteFormSection from '@/components/sections/QuoteFormSection'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <SpecialOffers />
      <NinjaClub />
      <Testimonials />
      <QuoteFormSection />
    </>
  )
}
