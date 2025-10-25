import { Metadata } from 'next'
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Droplets,
  Wind,
  Sparkles,
  Phone,
  Shield,
  Award,
  TrendingUp
} from 'lucide-react'
import Button from '@/components/ui/Button'
import QuoteFormSection from '@/components/sections/QuoteFormSection'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Professional Carpet Cleaning Services Australia | Steam Cleaning Experts',
  description: 'Learn how to steam clean carpets professionally or hire our expert team. Deep cleaning that removes stains, odours & allergens. Free quotes across Australia.',
  keywords: 'carpet cleaning, steam cleaning carpets, how to clean carpets, professional carpet cleaners, carpet cleaning near me',
}

export default function CarpetCleaningPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
            alt="Professional carpet cleaning"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <nav className="text-gold mb-4 text-sm">
              <Link href="/" className="hover:underline">Home</Link> &gt; <Link href="/services" className="hover:underline">Services</Link> &gt; Carpet Cleaning
            </nav>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Professional Carpet <span className="text-gold">Steam Cleaning</span> Services
            </h1>
            <p className="text-xl text-accent mb-8 max-w-3xl mx-auto">
              Deep steam extraction that removes 99% of stains, odours, and allergens. Fast-dry technology, eco-friendly products, and guaranteed results across Australia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-gold-lg">
                <Link href="#quote">Get Free Quote Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-navy">
                Call 1300 000 123
                <Phone className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Professional Cleaning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <span className="text-gold font-elegant text-sm tracking-wider uppercase mb-4 block">
                  Professional Service
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mb-6">
                  Why Choose Professional Carpet Cleaning?
                </h2>
                <p className="text-navy/70 text-lg mb-6">
                  While DIY steam cleaning is possible, professional carpet cleaning delivers superior results with specialized equipment, expertise, and guaranteed outcomes.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Droplets, text: 'Industrial-grade steam extraction (200°C+ heat)', subtext: 'Home units typically reach only 60-80°C' },
                    { icon: Clock, text: 'Fast-dry technology: 2-4 hours vs 12-24 hours', subtext: 'Prevents mildew and mold growth' },
                    { icon: Shield, text: '99% dirt, allergen & bacteria removal', subtext: 'Proven results vs 60-70% with DIY' },
                    { icon: Award, text: 'Pre-treatment of tough stains', subtext: 'Professional-grade solutions not available retail' },
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className="flex items-start space-x-4 bg-accent/50 rounded-xl p-4">
                        <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-navy" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy">{item.text}</p>
                          <p className="text-sm text-navy/60">{item.subtext}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                  alt="Professional carpet cleaning in action"
                  className="rounded-2xl shadow-royal"
                />
                <div className="absolute -bottom-6 -left-6 bg-gradient-gold text-navy px-6 py-4 rounded-xl shadow-gold-lg">
                  <p className="font-bold text-2xl">$199+</p>
                  <p className="text-sm">Starting Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How To Steam Clean Carpets (DIY Guide) */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold font-elegant text-sm tracking-wider uppercase mb-4 block">
                Educational Guide
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy mb-6">
                How to Steam Clean Carpets: <span className="text-gold">Complete Guide</span>
              </h2>
              <p className="text-xl text-navy/70 max-w-3xl mx-auto">
                Thinking of DIY carpet cleaning? Here's the professional process we follow — and what you need to know if attempting it yourself.
              </p>
            </div>

            <div className="bg-coral/10 border-l-4 border-coral rounded-r-xl p-6 mb-12">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-navy mb-2">⚠️ Important Note:</p>
                  <p className="text-navy/80">
                    DIY carpet cleaning can be effective for light maintenance, but <strong>improper technique can damage carpets, cause mildew, or leave residue.</strong> Professional equipment and expertise ensure better results and protect your investment.
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Process - continuing in next part due to length */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-elegant border-l-4 border-gold">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center font-bold text-xl text-navy">
                    1
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy">
                    Prepare the Area
                  </h3>
                </div>
                <div className="space-y-4 ml-15">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Remove furniture and clutter from the carpeted area</p>
                      <p className="text-navy/60 text-sm">Tip: Take photos before moving furniture to remember placement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Vacuum thoroughly to pick up dirt, dust, and debris</p>
                      <p className="text-navy/60 text-sm">This step is CRITICAL — steam cleaning pushes surface dirt deeper if not vacuumed first</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Pre-treat stains with carpet cleaner or mild detergent</p>
                      <p className="text-navy/60 text-sm">Let sit for 10-15 minutes before steam cleaning</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-elegant border-l-4 border-blue-500">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy flex items-center">
                    <Droplets className="w-6 h-6 mr-2 text-blue-500" />
                    Prepare the Steam Cleaner
                  </h3>
                </div>
                <div className="space-y-4 ml-15">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Fill water tank with hot water per manufacturer instructions</p>
                      <p className="text-navy/60 text-sm">Professional tip: Hotter water = better cleaning, but don't exceed machine limits</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Add carpet cleaning solution if required</p>
                      <p className="text-navy/60 text-sm">⚠️ WARNING: Use ONLY carpet-specific solution — NOT regular detergent</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-elegant border-l-4 border-green-500">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-green-500" />
                    Steam Clean the Carpet
                  </h3>
                </div>
                <div className="space-y-4 ml-15">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Start at far corner and work toward exit</p>
                      <p className="text-navy/60 text-sm">Avoid stepping on wet carpet</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Use forward/backward technique: release steam forward, extract backward</p>
                      <p className="text-navy/60 text-sm">Move slowly — about 1 foot per 3-5 seconds</p>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900 mb-1">⚠️ CRITICAL: Avoid Over-Wetting!</p>
                        <p className="text-red-800 text-sm">Too much moisture can damage carpet backing and cause mildew</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-elegant border-l-4 border-purple-500">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy flex items-center">
                    <Wind className="w-6 h-6 mr-2 text-purple-500" />
                    Dry the Carpet
                  </h3>
                </div>
                <div className="space-y-4 ml-15">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Open windows or turn on fans/AC to speed drying</p>
                      <p className="text-navy/60 text-sm">Good airflow is ESSENTIAL to prevent mildew</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy font-medium">Avoid walking on carpet until completely dry</p>
                      <p className="text-navy/60 text-sm">Typical drying: 6-12 hours (DIY) vs 2-4 hours (professional)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mt-12">
              <h3 className="font-display font-bold text-2xl text-red-900 mb-6 flex items-center">
                <AlertCircle className="w-8 h-8 mr-3" />
                Common DIY Mistakes (And How We Avoid Them)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    mistake: 'Using too much water/solution',
                    consequence: 'Mildew, long dry times',
                    professional: 'Moisture meters for exact amounts'
                  },
                  {
                    mistake: 'Not vacuuming first',
                    consequence: 'Dirt pushed deeper',
                    professional: 'Industrial pre-vacuuming'
                  },
                  {
                    mistake: 'Wrong cleaning solution',
                    consequence: 'Residue attracts dirt',
                    professional: 'pH-balanced formulas'
                  },
                  {
                    mistake: 'Moving too fast',
                    consequence: 'Incomplete cleaning',
                    professional: 'Proven pace protocols'
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4">
                    <p className="font-semibold text-red-900 mb-2">❌ {item.mistake}</p>
                    <p className="text-red-700 text-sm mb-2">Result: {item.consequence}</p>
                    <p className="text-green-700 text-sm">✅ Professional: {item.professional}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hire Professionals CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
              Save Time, Money & <span className="text-gold">Your Carpets</span>
            </h2>
            <p className="text-xl text-accent mb-8">
              DIY equipment rental costs $50-100 per day, plus solution, time, and effort. Professional service starts at just $199 with guaranteed results.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: TrendingUp, title: 'Better Results', desc: '99% vs 60-70% dirt removal' },
                { icon: Clock, title: 'Faster Drying', desc: '2-4 hours vs 12-24 hours' },
                { icon: Shield, title: 'No Risk', desc: 'Insured, guaranteed, no damage' },
              ].map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <Icon className="w-12 h-12 text-gold mx-auto mb-4" />
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-accent/80">{item.desc}</p>
                  </div>
                )
              })}
            </div>
            <Button size="lg" className="bg-gradient-gold text-navy hover:shadow-gold-lg text-xl py-6 px-10">
              <Link href="#quote">Get Professional Quote - From $199</Link>
              <Sparkles className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy mb-4">
                Transparent Pricing
              </h2>
              <p className="text-xl text-navy/70">No hidden fees. Upfront quotes. Guaranteed results.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Basic Package', rooms: '3 Rooms', price: '$199', features: ['Pre-vacuuming', 'Steam extraction', 'Stain treatment'] },
                { name: 'Standard Package', rooms: '5 Rooms + Hallway', price: '$349', features: ['Everything in Basic', 'Deodorizing', 'Speed drying'], popular: true },
                { name: 'Premium Package', rooms: 'Whole House', price: '$599+', features: ['Everything in Standard', 'Scotchgard protection', 'Furniture moving'] },
              ].map((pkg, index) => (
                <div key={index} className={`rounded-2xl p-8 ${pkg.popular ? 'bg-gradient-gold shadow-gold-lg scale-105' : 'bg-accent'} relative`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coral text-white px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="font-bold text-xl text-navy mb-2">{pkg.name}</h3>
                  <p className="text-navy/60 mb-4">{pkg.rooms}</p>
                  <p className="text-4xl font-bold text-navy mb-6">{pkg.price}</p>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-navy">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${pkg.popular ? 'bg-navy text-gold' : ''}`}>
                    <Link href="#quote">Book Now</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How long does professional carpet cleaning take?',
                  a: 'For an average 3-bedroom home, expect 1.5-3 hours. This includes pre-treatment, cleaning, and post-treatment. We work efficiently to minimize disruption.'
                },
                {
                  q: 'How soon can I walk on carpets after cleaning?',
                  a: 'With our fast-dry technology, carpets are dry to touch in 2-4 hours. We recommend waiting 4-6 hours before replacing furniture. This is much faster than DIY methods (12-24 hours).'
                },
                {
                  q: 'Will carpet cleaning remove all stains?',
                  a: 'We remove 95%+ of common stains. However, some permanent stains (bleach, old pet stains, dye transfer) cannot be fully removed. We always do pre-inspection and set realistic expectations.'
                },
                {
                  q: 'Is professional cleaning safe for kids and pets?',
                  a: 'Absolutely! We use eco-friendly, non-toxic cleaning solutions that are safe once dry. Our products are certified by Australian standards.'
                },
                {
                  q: 'How often should carpets be professionally cleaned?',
                  a: 'High-traffic homes with kids/pets: Every 6 months | Average homes: Every 12 months | Low-traffic areas: Every 18-24 months. Regular cleaning extends carpet life by 3-5 years.'
                },
              ].map((faq, index) => (
                <details key={index} className="bg-white rounded-xl p-6 shadow-elegant group">
                  <summary className="font-semibold text-lg text-navy cursor-pointer flex items-center justify-between">
                    {faq.q}
                    <span className="text-gold group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="text-navy/70 mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Form */}
      <QuoteFormSection />
    </div>
  )
}
