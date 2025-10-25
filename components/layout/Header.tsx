'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-elegant border-b border-gold/20'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Animated and Perfect */}
          <Link href="/" className="flex items-center space-x-3 group relative">
            {/* Animated Ninja Icon */}
            <div className="relative">
              <div className="text-5xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out filter group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                🥷
              </div>
              {/* Floating sparkle effect on hover */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xl animate-ping">✨</span>
              </div>
            </div>

            {/* Brand Text */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-2xl lg:text-3xl bg-gradient-royal bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                  Cleaning Ninja
                </span>
                {/* Premium badge that appears on hover */}
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 text-gold text-xs font-bold px-2 py-0.5 bg-gold/10 rounded-full border border-gold/20">
                  PRO
                </span>
              </div>
              <p className="text-xs text-gold font-elegant tracking-wide group-hover:tracking-wider transition-all duration-300">
                Premium Australian Service
              </p>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-navy hover:text-gold transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </Link>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-navy hover:text-gold transition-colors font-medium">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-royal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gold/20">
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="block px-6 py-3 text-navy hover:bg-accent hover:text-gold transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#offers" className="text-navy hover:text-gold transition-colors font-medium relative group">
              Special Offers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </Link>

            <Link href="#gallery" className="text-navy hover:text-gold transition-colors font-medium relative group">
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
            </Link>

            <a
              href={PHONE_LINK}
              className="flex items-center space-x-2 text-navy hover:text-gold transition-all font-semibold px-4 py-2 rounded-lg hover:bg-accent group"
            >
              <Phone className="w-5 h-5 group-hover:animate-bounce" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Button size="md" className="shadow-gold">
              <Link href="#quote">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-navy hover:bg-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t border-gold/20 mt-2 animate-slide-up">
            <Link href="/" className="block py-2 text-navy hover:text-gold transition-colors">Home</Link>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-navy/70 px-2">Services</p>
              {SERVICES.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="block py-2 pl-4 text-navy hover:text-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="#offers" className="block py-2 text-navy hover:text-gold transition-colors">Special Offers</Link>
            <a href={PHONE_LINK} className="block py-2 text-gold font-semibold">{PHONE_NUMBER}</a>
            <Button className="w-full">Get a Quote</Button>
          </div>
        )}
      </nav>
    </header>
  )
}
