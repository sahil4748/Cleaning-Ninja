'use client'

import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import { PHONE_LINK } from '@/lib/constants'

export default function FloatingCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={PHONE_LINK}
      className={`fixed bottom-8 right-8 z-40 bg-gradient-gold text-navy p-4 rounded-full shadow-gold hover:scale-110 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6 animate-pulse" />
    </a>
  )
}
