import { Metadata } from 'next'
import Button from '@/components/ui/Button'
import QuoteFormSection from '@/components/sections/QuoteFormSection'

export const metadata: Metadata = {
  title: 'End of Lease Cleaning | Bond Back Guarantee | Cleaning Ninja',
  description: 'Get your bond back guaranteed! Professional end of lease cleaning across Australia. REA-approved checklist.',
}

export default function EndOfLeaseCleaningPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-5xl mb-6">
            End of Lease Cleaning - <span className="text-gold">Bond Back Guarantee</span>
          </h1>
          <p className="text-xl text-accent mb-8 max-w-3xl mx-auto">
            Get your full bond back with our comprehensive exit cleaning service. REA-approved checklist. We'll return for free if needed!
          </p>
          <Button size="lg">Get Free Quote</Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🏠</div>
            <h2 className="font-display font-bold text-3xl text-navy mb-4">
              Detailed Content Coming Soon
            </h2>
            <p className="text-xl text-navy/70 mb-8">
              Complete bond cleaning information is being prepared. Book now to secure your moving date!
            </p>
            <div className="bg-accent rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-navy mb-4">Included in Service:</h3>
              <ul className="text-left text-lg text-navy/80 space-y-2 max-w-md mx-auto">
                <li>✓ Full property deep clean</li>
                <li>✓ Carpet steam cleaning</li>
                <li>✓ Oven & appliances</li>
                <li>✓ Windows & blinds</li>
                <li>✓ Bond back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </div>
  )
}
