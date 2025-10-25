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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/98 backdrop-blur-md shadow-lg' : 'bg-primary/95 backdrop-blur-sm'}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🥷</div>
            <div className="hidden sm:flex flex-col">
              <span className="text-white font-display font-bold text-xl lg:text-2xl leading-tight">Cleaning Ninja</span>
              <span className="text-gold text-xs font-medium tracking-wide">Premium Australian Service</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white/90 hover:text-gold transition-colors text-sm font-medium">Home</Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-white/90 hover:text-gold transition-colors text-sm font-medium">
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2">
                  {SERVICES.map((service) => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="block px-4 py-2 text-sm text-navy hover:bg-accent hover:text-gold transition-colors">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="#offers" className="text-white/90 hover:text-gold transition-colors text-sm font-medium">Special Offers</Link>
            <Link href="#gallery" className="text-white/90 hover:text-gold transition-colors text-sm font-medium">Gallery</Link>

            <a href={PHONE_LINK} className="flex items-center gap-2 text-white hover:text-gold transition-colors font-semibold">
              <Phone className="w-4 h-4" />
              <span className="text-sm">{PHONE_NUMBER}</span>
            </a>

            <Link href="#quote">
              <Button size="md" className="bg-gold hover:bg-gold/90 text-navy font-bold">Get a Quote</Button>
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-white hover:text-gold transition-colors">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 space-y-4">
            <Link href="/" className="block py-2 text-white hover:text-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div className="space-y-2">
              <p className="text-gold font-semibold text-sm uppercase tracking-wide mb-2">Services</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`} className="block py-2 pl-4 text-white/80 hover:text-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="#offers" className="block py-2 text-white hover:text-gold transition-colors" onClick={() => setMobileMenuOpen(false)}>Special Offers</Link>
            <a href={PHONE_LINK} className="flex items-center gap-2 py-2 text-gold font-semibold" onClick={() => setMobileMenuOpen(false)}>
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Link href="#quote" className="block" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gold hover:bg-gold/90 text-navy font-bold">Get a Quote</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}