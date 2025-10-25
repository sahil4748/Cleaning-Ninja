import { Metadata } from 'next'
import Button from '@/components/ui/Button'
import QuoteFormSection from '@/components/sections/QuoteFormSection'

export const metadata: Metadata = {
  title: 'Leather Cleaning & Restoration | Cleaning Ninja Australia',
  description: 'Specialist leather furniture cleaning and conditioning. Restore, protect, and maintain your leather furniture.',
}

export default function LeatherCleaningPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-5xl mb-6">
            Leather Cleaning & <span className="text-gold">Restoration</span>
          </h1>
          <p className="text-xl text-accent mb-8 max-w-3xl mx-auto">
            Specialist leather care and conditioning for all furniture types. Professional cleaning, restoration, and protection services.
          </p>
          <Button size="lg">Get Free Quote</Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🪑</div>
            <h2 className="font-display font-bold text-3xl text-navy mb-4">
              Detailed Content Coming Soon
            </h2>
            <p className="text-xl text-navy/70 mb-8">
              Expert leather care information is being prepared. Get a free quote for your leather furniture today!
            </p>
            <div className="bg-accent rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-navy mb-4">Our Services:</h3>
              <ul className="text-left text-lg text-navy/80 space-y-2 max-w-md mx-auto">
                <li>✓ Deep leather cleaning</li>
                <li>✓ Conditioning & protection</li>
                <li>✓ Color restoration</li>
                <li>✓ Crack repair</li>
                <li>✓ Stain removal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </div>
  )
}
