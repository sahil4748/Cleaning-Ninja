import { Metadata } from 'next'
import Button from '@/components/ui/Button'
import QuoteFormSection from '@/components/sections/QuoteFormSection'

export const metadata: Metadata = {
  title: 'Tile & Grout Cleaning Services | Cleaning Ninja Australia',
  description: 'Professional tile and grout cleaning. Deep cleaning that makes your tiles shine and grout look brand new.',
}

export default function TileGroutCleaningPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-5xl mb-6">
            Tile & Grout <span className="text-gold">Cleaning Services</span>
          </h1>
          <p className="text-xl text-accent mb-8 max-w-3xl mx-auto">
            Deep cleaning that makes your tiles shine and grout look brand new. Remove years of built-up grime, mold, and stains.
          </p>
          <Button size="lg">Get Free Quote</Button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="font-display font-bold text-3xl text-navy mb-4">
              Detailed Content Coming Soon
            </h2>
            <p className="text-xl text-navy/70 mb-8">
              Comprehensive tile and grout cleaning information is being prepared. Contact us now for a free assessment!
            </p>
            <div className="bg-accent rounded-2xl p-8">
              <h3 className="font-bold text-2xl text-navy mb-4">Areas We Clean:</h3>
              <ul className="text-left text-lg text-navy/80 space-y-2 max-w-md mx-auto">
                <li>✓ Bathroom tiles & grout</li>
                <li>✓ Kitchen floors</li>
                <li>✓ Outdoor patio tiles</li>
                <li>✓ Pool surrounds</li>
                <li>✓ Commercial spaces</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <QuoteFormSection />
    </div>
  )
}
