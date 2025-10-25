'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  DollarSign,
  Target,
  Zap,
  RotateCcw,
  Phone as PhoneIcon,
  Shield,
  Crown,
  Star
} from 'lucide-react'
import Button from '@/components/ui/Button'

const benefits = [
  {
    icon: DollarSign,
    text: 'Save $40+ Per Service',
    detail: 'Up to 12 bookings annually',
    color: 'text-green-500'
  },
  {
    icon: Target,
    text: 'Multi-Surface Expertise',
    detail: 'Not just carpets, everything!',
    color: 'text-blue-500'
  },
  {
    icon: Zap,
    text: 'Priority Ninja Access',
    detail: '24-48hr guaranteed booking',
    color: 'text-yellow-500'
  },
  {
    icon: RotateCcw,
    text: 'Flexible Credits',
    detail: 'Use when you need, rollover unused',
    color: 'text-purple-500'
  },
  {
    icon: PhoneIcon,
    text: 'VIP Member Support',
    detail: 'Direct line to our team',
    color: 'text-pink-500'
  },
  {
    icon: Shield,
    text: 'Satisfaction Guarantee',
    detail: 'We\'ll come back if not happy',
    color: 'text-red-500'
  },
]

const comparisons = [
  {
    feature: 'Multi-method approach',
    traditional: 'Single steam cleaning',
    club: true
  },
  {
    feature: 'Year-round savings',
    traditional: 'One-off expensive services',
    club: true
  },
  {
    feature: 'Priority booking',
    traditional: 'Waiting weeks for availability',
    club: true
  },
  {
    feature: 'Guaranteed results',
    traditional: 'Hit-and-miss outcomes',
    club: true
  },
]

export default function NinjaClub() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      {/* Floating Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          <Star className="w-4 h-4 fill-current" />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-royal">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Happy family in clean home"
                className="w-full h-full object-cover"
              />
              {/* Gold Border Animation */}
              <div className="absolute inset-0 border-4 border-gold rounded-3xl animate-glow" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-gradient-gold text-navy px-8 py-4 rounded-2xl shadow-gold-lg"
            >
              <div className="flex items-center space-x-2">
                <Crown className="w-6 h-6" />
                <div>
                  <p className="font-bold text-lg">2,400+</p>
                  <p className="text-sm">Happy Members</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-5xl animate-float">🥷</div>
              <div>
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-gold">
                  Join the Ninja Club
                </h2>
                <p className="text-accent font-elegant text-lg">Exclusive Membership Program</p>
              </div>
            </div>

            <p className="text-2xl text-white mb-8 font-medium">
              Smarter Than Steam Cleaning - Better Value, Better Results
            </p>

            {/* Comparison Box */}
            <div className="bg-primary-dark/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gold/30">
              <h3 className="font-bold text-gold text-xl mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2" />
                Why Choose Ninja Club Over Traditional Cleaning?
              </h3>
              <div className="space-y-4">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-gold rounded-full flex items-center justify-center mt-1">
                      <span className="text-navy font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{item.feature}</p>
                      <p className="text-accent/70 text-sm">vs {item.traditional}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-gold/50 transition-all"
                  >
                    <Icon className={`w-6 h-6 ${benefit.color} flex-shrink-0 mt-1`} />
                    <div>
                      <p className="text-white font-semibold">{benefit.text}</p>
                      <p className="text-accent/70 text-sm">{benefit.detail}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Pricing & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6 }}
              className="bg-gradient-gold rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-navy/70 text-sm font-medium">Starting from just</p>
                  <p className="text-4xl font-bold text-navy">$99<span className="text-lg">/year</span></p>
                </div>
                <div className="text-right">
                  <p className="text-navy/70 text-sm">Save up to</p>
                  <p className="text-3xl font-bold text-navy">$500+</p>
                </div>
              </div>
              <p className="text-navy/80 font-medium mb-4">
                🔥 Over 2,400 Aussie families trust Ninja Club
              </p>
            </motion.div>

            <Button size="lg" className="w-full bg-white text-primary hover:bg-gold hover:text-navy text-lg py-6 shadow-gold-lg">
              Join Ninja Club Now
              <Crown className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
