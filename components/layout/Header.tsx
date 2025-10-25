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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#2d4a3e] shadow-2xl' : 'bg-[#3d5a4a]'}`}>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#c9b382] to-transparent opacity-60"></div>
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-4xl transform group-hover:scale-110 transition-transform">🥷</div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl lg:text-2xl tracking-tight">Cleaning Ninja</span>
              <span className="text-[#c9b382] text-xs font-medium tracking-wider">Premium Australian Service</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            
            <Link href="/" className="text-white/90 hover:text-[#c9b382] transition-colors font-medium text-sm">
              Home
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-white/90 hover:text-[#c9b382] transition-colors font-medium text-sm">
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              
              <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-[#c9b382]/20">
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="block px-5 py-3 text-sm text-[#2d4a3e] hover:bg-[#f5f0e8] hover:text-[#2d4a3e] hover:pl-7 transition-all border-l-3 border-transparent hover:border-[#c9b382]">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#gallery" className="text-white/90 hover:text-[#c9b382] transition-colors font-medium text-sm">
              Gallery
            </Link>

            <Link href="#offers" className="text-white/90 hover:text-[#c9b382] transition-colors font-medium text-sm">
              Special Offers
            </Link>

            <Link href="#become-cleaner" className="flex items-center gap-2 text-white/90 hover:text-[#c9b382] transition-colors font-medium text-sm">
              <UserPlus className="w-4 h-4" />
              <span>Become a Cleaner</span>
            </Link>

            <a href={PHONE_LINK} className="flex items-center gap-2 text-white hover:text-[#c9b382] transition-colors font-semibold text-sm px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Link href="#quote">
              <button className="bg-[#c9b382] hover:bg-[#b89f6f] text-[#2d4a3e] px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:shadow-[#c9b382]/30 transition-all transform hover:scale-105">
                Get Free Quote
              </button>
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white hover:text-[#c9b382] transition-colors">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-3">
            <Link href="/" className="block py-2 text-white hover:text-[#c9b382] transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className="space-y-2 bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-[#c9b382] font-semibold text-xs uppercase tracking-wide">Services</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`} className="block py-2 pl-4 text-white/80 hover:text-[#c9b382] text-sm" onClick={() => setMobileMenuOpen(false)}>
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="#gallery" className="block py-2 text-white hover:text-[#c9b382] transition-colors" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="#offers" className="block py-2 text-white hover:text-[#c9b382] transition-colors" onClick={() => setMobileMenuOpen(false)}>Special Offers</Link>
            <Link href="#become-cleaner" className="block py-2 text-white hover:text-[#c9b382] transition-colors" onClick={() => setMobileMenuOpen(false)}>Become a Cleaner</Link>
            <a href={PHONE_LINK} className="flex items-center gap-2 py-2 text-[#c9b382] font-semibold" onClick={() => setMobileMenuOpen(false)}>
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Link href="#quote" className="block" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-[#c9b382] hover:bg-[#b89f6f] text-[#2d4a3e] py-3 rounded-lg font-bold shadow-lg">
                Get Free Quote
              </button>
            </Link>
          </div>
        )}
      </nav>

      <div className="h-px bg-gradient-to-r from-transparent via-[#c9b382]/20 to-transparent"></div>
    </header>
  )
}