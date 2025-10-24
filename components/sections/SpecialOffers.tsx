'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, Zap, Gift } from 'lucide-react'
import Button from '@/components/ui/Button'

const offers = [
  {
    title: 'Carpet Cleaning - 3 Rooms',
    discount: 'Save 30% This Month!',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    features: [
      'Pre-treatment for tough stains',
      'Deep steam extraction',
      'Eco-friendly deodorizing',
      'Fast-dry technology',
    ],
    badge: 'POPULAR',
  },
  {
    title: 'Bond Back Guarantee Package',
    discount: 'Get Your Bond Back - Guaranteed',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80',
    features: [
      'Full kitchen & bathroom deep clean',
      'Carpet steam & stain removal',
      'All surfaces & windows',
      'Oven & appliance cleaning',
    ],
    badge: 'GUARANTEE',
  },
]

export default function SpecialOffers() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="offers" className="py-24 bg-gradient-offer relative overflow-hidden">
      {/* Animated Background Elements */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Gift className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Ripper Deals You Don't Want to Miss!
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Limited-time offers for savvy Aussie homeowners. Premium services at unbeatable prices!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-elegant hover:shadow-royal hover:scale-105 transition-all duration-500 relative">
                {/* Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <div className="bg-gradient-gold text-navy px-4 py-2 rounded-full font-bold text-sm shadow-gold animate-pulse">
                    {offer.badge}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Discount Badge */}
                  <div className="absolute bottom-4 left-4 bg-coral text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                    <Zap className="w-5 h-5 inline mr-2" />
                    {offer.discount}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="font-display font-bold text-3xl text-navy mb-6">
                    {offer.title}
                  </h3>

                  <ul className="space-y-4 mb-8">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-navy/80 text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full shadow-gold text-lg py-5">
                    Book This Offer Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
