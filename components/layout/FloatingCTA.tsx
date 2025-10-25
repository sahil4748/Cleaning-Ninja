'use client'

import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHONE_LINK } from '@/lib/constants'

export default function FloatingCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          href={PHONE_LINK}
          className="fixed bottom-8 right-8 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 bg-gold rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Main Button */}
          <div className="relative w-16 h-16 bg-gradient-gold rounded-full shadow-gold-lg flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Phone className="w-8 h-8 text-navy" />
            </motion.div>
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-navy text-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="font-semibold">Call Now!</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-navy border-b-8 border-b-transparent" />
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
