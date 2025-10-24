'use client'

import { motion } from 'framer-motion'
import { Shield, Leaf, Calendar, CheckCircle, Sparkles, ArrowDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Main Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=90"
          alt="Professional cleaning service"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-dark" />

        {/* Animated Gold Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center space-x-2 bg-gradient-gold text-navy px-6 py-2 rounded-full mb-8 shadow-gold"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-elegant font-semibold">Australia's Premium Cleaning Service</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-display font-black text-5xl sm:text-6xl lg:text-7xl mb-6 text-white leading-tight"
          >
            Fair Dinkum
            <span className="block bg-gradient-gold bg-clip-text text-transparent mt-2">
              Professional Cleaning
            </span>
            <span className="block text-accent mt-2">Across Australia</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl sm:text-2xl mb-4 text-white font-medium max-w-4xl mx-auto"
          >
            From carpet stains to grimy tiles — our certified cleaners deliver
            <span className="text-gold font-bold"> eco-friendly, thorough cleaning</span> that'll
            make your home or office sparkle like new.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-lg mb-10 text-accent max-w-3xl mx-auto"
          >
            Whether it's your family home in Sydney or your office in Melbourne, we've got you
            covered with Australia's most trusted cleaning services. <span className="text-gold">No worries, no mess left behind.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="text-lg shadow-gold-lg">
              <Link href="#quote">Get Your Free Quote Today</Link>
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-navy">
              <Link href="#services">See Our Services</Link>
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Shield, text: '100% Australian Owned & Operated', color: 'text-gold' },
              { icon: Leaf, text: 'Eco-Friendly Products', color: 'text-green-400' },
              { icon: Calendar, text: '7 Days a Week Service', color: 'text-blue-400' },
              { icon: CheckCircle, text: 'Fully Insured & Bonded', color: 'text-gold' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group"
              >
                <badge.icon className={`w-8 h-8 ${badge.color} group-hover:scale-110 transition-transform`} />
                <p className="text-sm font-medium text-white text-center">{badge.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown className="w-8 h-8 text-gold animate-bounce" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
