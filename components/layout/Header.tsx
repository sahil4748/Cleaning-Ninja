'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-r from-primary via-navy to-primary shadow-royal border-b-2 border-gold/30 backdrop-blur-xl'
          : 'bg-gradient-to-r from-primary/95 via-navy/95 to-primary/95 backdrop-blur-md'
      }`}
    >
      {/* Premium Top Border Animation */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent animate-shimmer" />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* LOGO SECTION - PREMIUM & ROYAL */}
          <Link href="/" className="flex items-center space-x-4 group relative z-10">
            {/* Animated Background Glow */}
            <div className="absolute -inset-4 bg-gradient-gold opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 rounded-full" />

            {/* Ninja Icon with Advanced Animation */}
            <div className="relative">
              {/* Rotating ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 scale-150 group-hover:scale-[2] group-hover:border-gold/50 transition-all duration-700" />

              {/* Ninja emoji with 3D effect */}
              <div className="text-5xl transform group-hover:scale-125 group-hover:rotate-[360deg] transition-all duration-1000 ease-out filter drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]">
                🥷
              </div>

              {/* Orbiting sparkles */}
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <div className="absolute bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow animation-delay-300">
                <Sparkles className="w-3 h-3 text-gold" />
              </div>
            </div>

            {/* Brand Name - NEXT TO LOGO */}
            <div className="flex flex-col relative">
              {/* Main Brand Name */}
              <div className="flex items-baseline space-x-3">
                <h1 className="font-display font-bold text-2xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent group-hover:from-gold group-hover:via-white group-hover:to-gold transition-all duration-700 transform group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                  Cleaning Ninja
                </h1>

                {/* Premium Badge - Animated */}
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold bg-gradient-gold text-primary rounded-full shadow-gold animate-pulse-subtle">
                    <Sparkles className="w-3 h-3 mr-1" />
                    PREMIUM
                  </span>
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs lg:text-sm text-gold/90 font-elegant tracking-wider group-hover:tracking-widest transition-all duration-500 group-hover:text-gold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                Premium Australian Service
              </p>

              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-gold to-transparent group-hover:w-full transition-all duration-700" />
            </div>

            {/* Shine sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white/90 hover:text-gold transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white/90 hover:text-gold transition-colors font-medium">
                <span>Services</span>
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-64 bg-gradient-to-b from-primary to-navy rounded-xl shadow-royal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-2 border-gold/20 overflow-hidden backdrop-blur-xl">
                {/* Gold top border */}
                <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block px-6 py-3 text-white/90 hover:bg-gold/10 hover:text-gold transition-all duration-300 hover:pl-8 border-l-2 border-transparent hover:border-gold"
                    >
                      <span className="flex items-center">
                        <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-gold">→</span>
                        {service.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="#offers"
              className="text-white/90 hover:text-gold transition-all duration-300 font-medium relative group"
            >
              Special Offers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            <Link
              href="#gallery"
              className="text-white/90 hover:text-gold transition-all duration-300 font-medium relative group"
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300" />
            </Link>

            <a
              href={PHONE_LINK}
              className="flex items-center space-x-2 text-white/90 hover:text-gold transition-all duration-300 font-semibold px-4 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-gold/30 group"
            >
              <Phone className="w-5 h-5 group-hover:animate-bounce" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Button size="md" className="shadow-gold animate-pulse-subtle hover:animate-none bg-gradient-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300">
              <Link href="#quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors border border-gold/30"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t border-gold/20 mt-2 animate-slide-up bg-gradient-to-b from-primary/95 to-navy/95 backdrop-blur-xl rounded-b-xl">
            <Link
              href="/"
              className="block py-2 text-white/90 hover:text-gold transition-colors px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div className="space-y-2 bg-white/5 rounded-lg p-3 mx-4 border border-gold/10">
              <p className="text-gold font-semibold text-sm uppercase tracking-wider px-2 flex items-center">
                <ChevronDown className="w-4 h-4 mr-1" />
                Services
              </p>
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="block py-2 pl-6 text-white/80 hover:text-gold transition-colors hover:pl-8 border-l-2 border-transparent hover:border-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  → {service.name}
                </Link>
              ))}
            </div>

            <Link
              href="#offers"
              className="block py-2 text-white/90 hover:text-gold transition-colors px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Special Offers
            </Link>

            <a
              href={PHONE_LINK}
              className="block py-2 text-gold font-semibold px-4 flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <div className="px-4">
              <Button className="w-full bg-gradient-gold" onClick={() => setMobileMenuOpen(false)}>
                <Link href="#quote" className="w-full">Get a Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </header>
  )
}
