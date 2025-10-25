'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#2d4a3e] shadow-lg' : 'bg-[#3d5a4a]'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-4xl">🥷</span>
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-bold text-xl">Cleaning Ninja</span>
              <span className="text-[#c9b382] text-xs">Premium Australian Service</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-white/90 hover:text-[#c9b382] transition-colors">Home</Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white/90 hover:text-[#c9b382] transition-colors">
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f5f0e8] hover:text-[#2d4a3e]"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#offers" className="text-white/90 hover:text-[#c9b382] transition-colors">Special Offers</Link>
            <Link href="#gallery" className="text-white/90 hover:text-[#c9b382] transition-colors">Gallery</Link>

            {/* Phone */}
            <a href={PHONE_LINK} className="flex items-center gap-2 text-white hover:text-[#c9b382] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="font-semibold">{PHONE_NUMBER}</span>
            </a>

            {/* CTA Button */}
            <Link href="#quote" className="bg-[#c9b382] hover:bg-[#b89f6f] text-[#2d4a3e] px-6 py-2.5 rounded-lg font-bold transition-colors">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-4">
            <Link href="/" className="block py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className="space-y-2">
              <p className="text-[#c9b382] font-semibold text-sm">Services</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`} className="block py-2 pl-4 text-white/80" onClick={() => setMobileMenuOpen(false)}>
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="#offers" className="block py-2 text-white" onClick={() => setMobileMenuOpen(false)}>Special Offers</Link>
            <a href={PHONE_LINK} className="flex items-center gap-2 py-2 text-[#c9b382] font-semibold">
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Link href="#quote" className="block">
              <button className="w-full bg-[#c9b382] text-[#2d4a3e] py-2.5 rounded-lg font-bold">Get a Quote</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}