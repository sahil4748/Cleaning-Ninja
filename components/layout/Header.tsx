'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { PHONE_NUMBER, PHONE_LINK, SERVICES } from '@/lib/constants'

const NAV_LINKS = [
  { name: 'Services', href: '#services', isDropdown: true },
  { name: 'About', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' }
]

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out bg-white/95 backdrop-blur-md border-b border-beige-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <nav className="max-w-[1100px] mx-auto px-8 w-full h-16 md:h-20 flex items-center justify-between">
          
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display font-bold text-xl lg:text-3xl text-olive-900 transition-all duration-300">
            Cleaning Ninja
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              link.isDropdown ? (
                <div key={link.name} className="relative group">
                  <button className="flex items-center gap-1 font-body font-medium text-beige-900 transition-colors duration-300 hover:text-olive-700">
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-6 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 border border-beige-300 overflow-hidden">
                    {SERVICES.map((service) => (
                      <Link 
                        key={service.id} 
                        href={`/services/${service.slug}`} 
                        className="block px-5 py-3 text-sm font-body text-beige-900 hover:bg-beige-100 hover:text-olive-900 transition-colors duration-200"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="font-body font-medium text-beige-900 transition-colors duration-300 hover:text-olive-700"
                >
                  {link.name}
                </Link>
              )
            ))}

            {/* Phone & CTA */}
            <div className="flex items-center gap-6 ml-4">
              <a href={PHONE_LINK} className="flex items-center gap-2 font-body font-semibold text-olive-900 hover:text-olive-700 transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <Link href="#quote">
                <button className="bg-olive-700 text-white font-body font-semibold px-6 py-2.5 rounded-lg hover:bg-olive-900 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md ease-out">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-3 -mr-2 text-olive-900 hover:bg-beige-100 rounded-md transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-[280px] bg-beige-100 z-50 transform transition-transform duration-300 ease-out lg:hidden shadow-2xl flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-end">
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="p-3 text-olive-900 hover:bg-beige-300 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 px-6 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <div key={link.name}>
                {link.isDropdown ? (
                  <div className="flex flex-col gap-3">
                    <span className="font-body font-bold text-olive-900 text-lg">{link.name}</span>
                    <div className="pl-4 flex flex-col gap-3 border-l-2 border-beige-300">
                      {SERVICES.map((service) => (
                        <Link 
                          key={service.id} 
                          href={`/services/${service.slug}`}
                          className="font-body text-beige-900 hover:text-olive-700 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={link.href}
                    className="font-body font-bold text-olive-900 text-lg hover:text-olive-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto py-8 border-t border-beige-300 flex flex-col gap-4">
            <a 
              href={PHONE_LINK} 
              className="flex items-center justify-center gap-2 font-body font-semibold text-olive-900 py-3 bg-white rounded-lg border border-beige-300 transition-colors hover:bg-beige-50"
            >
              <Phone className="w-5 h-5" />
              <span>{PHONE_NUMBER}</span>
            </a>
            <Link href="#quote" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <button className="w-full bg-olive-700 text-white font-body font-bold py-3.5 rounded-lg hover:bg-olive-900 transition-colors shadow-md">
                Get Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}