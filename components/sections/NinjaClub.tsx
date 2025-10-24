'use client'

import { motion } from 'framer-motion'
import { DollarSign, Target, Zap, RotateCcw, Phone as PhoneIcon, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

const benefits = [
  { icon: DollarSign, text: 'Save $40+ Per Service - Up to 12 bookings annually' },
  { icon: Target, text: 'Multi-Surface Expertise - Not just carpets, everything!' },
  { icon: Zap, text: 'Priority Ninja Access - 24-48hr guaranteed booking' },
  { icon: RotateCcw, text: 'Flexible Credits - Use when you need, rollover what you don\'t' },
  { icon: PhoneIcon, text: 'VIP Member Support - Direct line to our team' },
  { icon: Shield, text: 'Satisfaction Guarantee - We\'ll come back if you\'re not happy' },
]

export default function NinjaClub() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Happy family in clean home"
              className="rounded-2xl shadow-elegant"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🥷</span>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-gold">
                Join the Ninja Club Subscription
              </h2>
            </div>

            <p className="text-xl text-accent mb-8">
              Smarter Than Steam Cleaning - Better Value, Better Results
            </p>

            <div className="bg-primary-dark rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gold text-xl mb-4">
                Why Choose Ninja Club Over Traditional Steam Cleaning?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-gold">✓</span>
                  <span><strong>Multi-method approach</strong> vs single steam cleaning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold">✓</span>
                  <span><strong>Year-round savings</strong> vs one-off expensive services</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold">✓</span>
                  <span><strong>Priority booking</strong> vs waiting weeks for availability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-gold">✓</span>
                  <span><strong>Guaranteed results</strong> vs hit-and-miss outcomes</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                    <p className="text-accent">{benefit.text}</p>
                  </div>
                )
              })}
            </div>

            <div className="mb-6">
              <p className="text-2xl font-bold text-gold mb-2">Starting from just $99/year</p>
              <p className="text-accent">🔥 Over 2,400 Aussie families trust Ninja Club</p>
            </div>

            <Link href="#quote">
              <Button size="lg" className="w-full sm:w-auto">Join Ninja Club Now</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
