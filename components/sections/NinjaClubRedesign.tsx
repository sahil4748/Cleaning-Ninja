'use client'

import { motion } from 'framer-motion'
import { Sparkles, Users, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function NinjaClubRedesign() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm border border-white/10"
          >
            <Sparkles className="w-8 h-8 text-gold" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join the <span className="text-gold">Ninja Club</span>
          </h2>
          <p className="text-lg text-gray-300">
            Whether you&apos;re looking for premium, recurring cleaning services at a discount, or you&apos;re a professional cleaner looking to join our elite team—there&apos;s a place for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Customer Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col relative overflow-hidden group border border-gray-100"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10 flex-grow">
              <h3 className="text-2xl font-bold text-navy mb-4">For Homeowners</h3>
              <p className="text-gray-600 mb-8">
                Become a VIP member to unlock exclusive discounts on recurring cleans, priority booking, and free specialized spot treatments.
              </p>
              <ul className="space-y-3 mb-8">
                {['15% off all recurring cleans', 'Priority scheduling', 'Free annual carpet refresh'].map((benefit, i) => (
                  <li key={i} className="flex items-center text-navy font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="#quote" className="relative z-10 mt-auto">
              <Button className="w-full justify-between group-hover:bg-navy group-hover:text-white">
                <span>Become a Member</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Cleaner Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-accent rounded-3xl p-8 sm:p-10 flex flex-col relative overflow-hidden group border border-gold/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            <Users className="absolute top-6 right-6 w-8 h-8 text-gold/50" />

            <div className="relative z-10 flex-grow">
              <h3 className="text-2xl font-bold text-navy mb-4">For Professionals</h3>
              <p className="text-gray-600 mb-8">
                Are you a meticulous, experienced cleaner? Join our network to access premium clientele, flexible hours, and top-tier rates.
              </p>
              <ul className="space-y-3 mb-8">
                {['Competitive, reliable payouts', 'Flexible scheduling', 'Supportive network & training'].map((benefit, i) => (
                  <li key={i} className="flex items-center text-navy font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link href="/become-a-cleaner" className="relative z-10 mt-auto">
              <Button variant="outline" className="w-full justify-between bg-white hover:bg-gold hover:text-navy hover:border-gold">
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
