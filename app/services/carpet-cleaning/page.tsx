import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import QuoteForm from '@/components/forms/QuoteForm'
import Link from 'next/link'

export const metadata = {
  title: 'Professional Carpet Cleaning Services | Cleaning Ninja',
  description: 'Deep steam carpet cleaning that removes stains, odours, and allergens. Fast-dry technology. Book now!',
}

export default function CarpetCleaningPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <nav className="text-gold mb-4 text-sm">
              <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/services" className="hover:underline">Services</Link> &gt; <span>Carpet Cleaning</span>
            </nav>
            <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
              Professional Carpet Cleaning Services
            </h1>
            <p className="text-xl text-accent mb-8">
              Deep steam cleaning that removes stains, odours, and allergens from your carpets
            </p>
            <Link href="#quote">
              <Button size="lg">Get Free Quote</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Carpet cleaning"
              className="rounded-2xl shadow-elegant"
            />
            <div>
              <h2 className="font-display font-bold text-3xl text-navy mb-6">
                Why Choose Our Carpet Cleaning?
              </h2>
              <div className="space-y-4">
                {[
                  'Deep steam extraction removes 99% of dirt & allergens',
                  'Fast-dry technology (2-4 hours vs 24 hours)',
                  'Pet stain & odour specialist treatment',
                  'Eco-friendly, child & pet safe products',
                  'Upfront pricing, no hidden costs',
                  '100% satisfaction guarantee'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-navy-light text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-4xl text-navy text-center mb-12">
            Our Carpet Cleaning Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Pre-Inspection', desc: 'Assessment of carpet condition and stains' },
              { step: '2', title: 'Deep Clean', desc: 'Hot water extraction with pre-treatment' },
              { step: '3', title: 'Final Touch', desc: 'Deodorizing and fast-dry protection' }
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-8 text-center shadow-elegant">
                <div className="w-16 h-16 bg-gold text-navy rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-xl text-navy mb-2">{item.title}</h3>
                <p className="text-navy-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="font-display font-bold text-4xl text-navy text-center mb-12">
            Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Basic', rooms: '3 rooms', price: '$199' },
              { name: 'Standard', rooms: '5 rooms + hallway', price: '$349' },
              { name: 'Premium', rooms: 'Whole house', price: 'Custom' }
            ].map((pkg) => (
              <div key={pkg.name} className="bg-accent rounded-xl p-6 text-center border-2 border-transparent hover:border-gold transition-colors">
                <h3 className="font-bold text-xl text-navy mb-2">{pkg.name}</h3>
                <p className="text-navy-light mb-4">{pkg.rooms}</p>
                <p className="text-3xl font-bold text-gold mb-4">{pkg.price}</p>
                <Link href="#quote">
                  <Button variant="outline" className="w-full">Get Quote</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-white rounded-2xl p-8">
            <h2 className="font-display font-bold text-3xl text-navy text-center mb-6">
              Ready to Transform Your Carpets?
            </h2>
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  )
}
