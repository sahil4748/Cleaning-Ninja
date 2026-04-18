import { PHONE_NUMBER, PHONE_LINK } from '@/lib/constants'
import { Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function HeroRedesign() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-navy">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=90"
          alt="Professional cleaning service"
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-gold"></span>
            <span className="text-sm font-medium tracking-wide uppercase">Australia's Premium Cleaning Service</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Spotless Results, <br />
            <span className="text-gold">Guaranteed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
            Professional carpet, upholstery, and end-of-lease cleaning. Fully insured, eco-friendly, and trusted by over 5,000 Australian families.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="#quote" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Get Your Free Quote
              </Button>
            </Link>
            <a href={PHONE_LINK} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-navy">
                <Phone className="w-5 h-5 mr-2" />
                Call {PHONE_NUMBER}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
