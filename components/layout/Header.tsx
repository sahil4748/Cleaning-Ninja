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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#2d4a3e]/98 backdrop-blur-lg shadow-2xl' : 'bg-[#3d5a4a]/95 backdrop-blur-md'}`}>
      {/* Top elegant border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c9b382]/60 to-transparent"></div>
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          
          {/* Logo Section - 3D Effect, No White Background */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group relative z-10">
            {/* 3D Ninja Logo with Shadow Effects */}
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-[#c9b382]/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Ninja emoji - 3D with multiple shadows */}
              <div 
                className="text-4xl sm:text-5xl relative transform group-hover:scale-110 transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(201,179,130,0.3))',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                🥷
              </div>
            </div>
            
            {/* Brand Text - Premium Typography with Effects */}
            <div className="flex flex-col">
              <span 
                className="text-white font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl tracking-tight leading-tight"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.1)'
                }}
              >
                Cleaning Ninja
              </span>
              <span 
                className="text-[#c9b382] text-[10px] sm:text-xs font-medium tracking-wider uppercase"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                Premium Australian Service
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Centered & Properly Spaced */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            
            <Link href="/" className="text-white/90 hover:text-[#c9b382] transition-all duration-300 font-medium text-sm xl:text-base px-2">
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-white/90 hover:text-[#c9b382] transition-all duration-300 font-medium text-sm xl:text-base px-2">
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              
              <div className="absolute top-full left-0 mt-3 w-64 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-[#c9b382]/20 overflow-hidden">
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block px-5 py-3 text-sm text-[#2d4a3e] hover:bg-[#f5f0e8] hover:text-[#2d4a3e] hover:pl-7 transition-all duration-200 font-medium"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#gallery" className="text-white/90 hover:text-[#c9b382] transition-all duration-300 font-medium text-sm xl:text-base px-2">
              Gallery
            </Link>

            <Link href="#offers" className="text-white/90 hover:text-[#c9b382] transition-all duration-300 font-medium text-sm xl:text-base px-2 whitespace-nowrap">
              Special Offers
            </Link>

            <Link href="#become-cleaner" className="flex items-center gap-2 text-white/90 hover:text-[#c9b382] transition-all duration-300 font-medium text-sm xl:text-base px-2 whitespace-nowrap">
              <UserPlus className="w-4 h-4" />
              <span className="hidden xl:inline">Become a Cleaner</span>
              <span className="xl:hidden">Join Us</span>
            </Link>

            {/* Phone Number */}
            
              href={PHONE_LINK}
              className="flex items-center gap-2 text-white hover:text-[#c9b382] transition-all duration-300 font-bold text-sm px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="whitespace-nowrap">{PHONE_NUMBER}</span>
            </a>

            {/* Premium CTA Button - Elegant Styling */}
            <Link href="#quote">
              <button className="bg-white hover:bg-[#f5f0e8] text-[#2d4a3e] px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-[#c9b382]/30 whitespace-nowrap">
                Get Free Quote
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button - Better Styling */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-white hover:text-[#c9b382] transition-colors rounded-lg hover:bg-white/10 border border-white/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Improved Layout */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 py-4 space-y-3 max-h-[calc(100vh-88px)] overflow-y-auto">
            <Link 
              href="/" 
              className="block py-2.5 px-4 text-white hover:text-[#c9b382] hover:bg-white/5 rounded-lg transition-all font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Services */}
            <div className="space-y-1 bg-white/5 rounded-lg p-3 border border-white/10">
              <p className="text-[#c9b382] font-bold text-xs uppercase tracking-wider mb-2 px-2">Services</p>
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="block py-2 px-4 text-white/90 hover:text-[#c9b382] hover:bg-white/5 rounded text-sm transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            
            <Link 
              href="#gallery" 
              className="block py-2.5 px-4 text-white hover:text-[#c9b382] hover:bg-white/5 rounded-lg transition-all font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            
            <Link 
              href="#offers" 
              className="block py-2.5 px-4 text-white hover:text-[#c9b382] hover:bg-white/5 rounded-lg transition-all font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Special Offers
            </Link>

            <Link 
              href="#become-cleaner" 
              className="flex items-center gap-2 py-2.5 px-4 text-white hover:text-[#c9b382] hover:bg-white/5 rounded-lg transition-all font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Become a Cleaner</span>
            </Link>
            
            <a 
              href={PHONE_LINK} 
              className="flex items-center gap-2 py-2.5 px-4 text-[#c9b382] font-bold bg-white/5 rounded-lg border border-[#c9b382]/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
            
            <Link href="#quote" className="block px-4 pt-2" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-white text-[#2d4a3e] py-3.5 rounded-lg font-bold shadow-lg border-2 border-[#c9b382]/30">
                Get Free Quote
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Bottom elegant border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c9b382]/30 to-transparent"></div>
    </header>
  )
}