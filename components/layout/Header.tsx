'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, UserPlus } from 'lucide-react'
import { PHONE_NUMBER, PHONE_LINK, SERVICES } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-2xl' : 'bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95'}`}>
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-4xl">🥷</div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl lg:text-2xl">Cleaning Ninja</span>
              <span className="text-yellow-400 text-xs font-medium">Premium Australian Service</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            
            <Link href="/" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-sm">
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-white/90 hover:text-yellow-400 transition-colors font-medium text-sm">
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="block px-5 py-3 text-sm text-blue-900 hover:bg-yellow-50">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#gallery" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-sm">
              Gallery
            </Link>

            <Link href="#offers" className="text-white/90 hover:text-yellow-400 transition-colors font-medium text-sm">
              Special Offers
            </Link>

            <Link href="#become-cleaner" className="flex items-center gap-2 text-white/90 hover:text-yellow-400 transition-colors font-medium text-sm">
              <UserPlus className="w-4 h-4" />
              <span>Become a Cleaner</span>
            </Link>

            <a href={PHONE_LINK} className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors font-bold text-sm px-4 py-2 rounded-lg bg-white/5">
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Link href="#quote">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg">
                Get Free Quote
              </button>
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-3">
            <Link href="/" className="block py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className="space-y-2 bg-white/5 rounded-lg p-3">
              <p className="text-yellow-400 font-semibold text-xs">Services</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`} className="block py-2 pl-4 text-white/80 text-sm" onClick={() => setMobileMenuOpen(false)}>
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="#gallery" className="block py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="#offers" className="block py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Special Offers</Link>
            <Link href="#become-cleaner" className="block py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Become a Cleaner</Link>
            <a href={PHONE_LINK} className="flex items-center gap-2 py-2 text-yellow-400 font-semibold">
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Link href="#quote" className="block">
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 py-3 rounded-lg font-bold shadow-lg">
                Get Free Quote
              </button>
            </Link>
          </div>
        )}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
    </header>
  )
}