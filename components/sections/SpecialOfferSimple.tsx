import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function SpecialOfferSimple() {
  return (
    <section className="py-20 bg-navy text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 text-center">
          <span className="inline-block bg-gold text-navy text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Limited Time Offer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Get $50 Off Your First Clean
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the Cleaning Ninja difference. Book any service over $150 and claim your exclusive first-time customer discount today.
          </p>
          <Link href="#quote">
            <Button size="lg" className="px-10">
              Claim This Offer
            </Button>
          </Link>
          <p className="text-sm text-gray-400 mt-6">
            *Terms and conditions apply. Valid for new customers only.
          </p>
        </div>
      </div>
    </section>
  )
}
