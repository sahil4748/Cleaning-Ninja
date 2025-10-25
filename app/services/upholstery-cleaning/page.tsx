import { Metadata } from 'next'
import Button from '@/components/ui/Button'
import QuoteFormSection from '@/components/sections/QuoteFormSection'

export const metadata: Metadata = {
  title: 'Upholstery Cleaning Services | Cleaning Ninja Australia',
  description: 'Professional upholstery cleaning services across Australia. Restore your furniture to like-new condition.',
}

export default function UpholsteryCleaningPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-5xl mb-6">
            Upholstery <span className="text-gold">Cleaning Services</span>
          </h1>
          <p className="text-xl text-accent mb-8 max-w-3xl mx-auto">
            Restore your furniture to like-new condition with specialized treatments. Professional cleaning for lounges, chairs, and fabric furniture.
          </p>
          <Button size="lg">Get Free Quote</Button>
        </div>
      </section>

      {/* Content Coming Soon */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🛋️</div>
            <h2 className="font-display font-bold text-3xl text-navy mb-4">
              Detailed Content Coming Soon
            </h2>
            <p className="text-xl text-navy/70 mb-8">
              We're preparing comprehensive information about our upholstery cleaning services. In the meantime, get in touch for a free quote!
            </p>
            <div className="bg-accent rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-navy mb-4">What We Clean:</h3>
              <ul className="text-left text-lg text-navy/80 space-y-2 max-w-md mx-auto">
                <li>✓ Fabric lounges & sofas</li>
                <li>✓ Armchairs & recliners</li>
                <li>✓ Dining chairs</li>
                <li>✓ Office furniture</li>
                <li>✓ Outdoor cushions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </div>
  )
}
