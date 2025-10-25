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
    <header className={scrolled ? 'header-scrolled' : 'header-top'}>
      <div className="border-line"></div>
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="text-4xl sm:text-5xl logo-ninja">🥷</div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl xl:text-3xl logo-text">
                Cleaning Ninja
              </span>
              <span className="text-sm tagline">
                Premium Australian Service
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            
            <Link href="/" className="nav-link">Home</Link>

            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <div className="dropdown">
                {SERVICES.map((service) => (
                  <Link key={service.id} href={`/services/${service.slug}`} className="dropdown-item">
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="#gallery" className="nav-link">Gallery</Link>
            <Link href="#offers" className="nav-link">Special Offers</Link>
            <Link href="#become-cleaner" className="nav-link flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              <span>Become a Cleaner</span>
            </Link>

            <a href={PHONE_LINK} className="phone-button">
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>

            <Link href="#quote">
              <button className="cta-button">Get Free Quote</button>
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden mobile-menu-btn">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link href="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            
            <div className="mobile-services">
              <p className="mobile-services-title">Services</p>
              {SERVICES.map((service) => (
                <Link key={service.id} href={`/services/${service.slug}`} className="mobile-service-item" onClick={() => setMobileMenuOpen(false)}>
                  {service.name}
                </Link>
              ))}
            </div>
            
            <Link href="#gallery" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="#offers" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Special Offers</Link>
            <Link href="#become-cleaner" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Become a Cleaner</Link>
            
            <a href={PHONE_LINK} className="mobile-phone">
              <Phone className="w-4 h-4" />
              <span>{PHONE_NUMBER}</span>
            </a>
            
            <Link href="#quote" onClick={() => setMobileMenuOpen(false)}>
              <button className="mobile-cta">Get Free Quote</button>
            </Link>
          </div>
        )}
      </nav>

      <div className="border-line-bottom"></div>

      <style jsx>{`
        .header-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(61, 90, 74, 0.95);
          backdrop-filter: blur(12px);
        }
        .header-scrolled {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: rgba(45, 74, 62, 0.98);
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .border-line {
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(201,179,130,0.6), transparent);
        }
        .border-line-bottom {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(201,179,130,0.3), transparent);
        }
        .logo-ninja {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(201,179,130,0.3));
        }
        .logo-text {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .tagline {
          color: #c9b382;
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .nav-link {
          color: rgba(255,255,255,0.9);
          font-weight: 500;
          font-size: 14px;
          padding: 0 8px;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: #c9b382;
        }
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 12px;
          width: 256px;
          background: rgba(255,255,255,0.98);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s;
        }
        .relative.group:hover .dropdown {
          opacity: 1;
          visibility: visible;
        }
        .dropdown-item {
          display: block;
          padding: 12px 20px;
          font-size: 14px;
          color: #2d4a3e;
          transition: all 0.2s;
        }
        .dropdown-item:hover {
          background: #f5f0e8;
          padding-left: 28px;
        }
        .phone-button {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
          font-weight: bold;
          font-size: 14px;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s;
        }
        .phone-button:hover {
          background: rgba(255,255,255,0.1);
          color: #c9b382;
        }
        .cta-button {
          background: white;
          color: #2d4a3e;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 14px;
          border: 2px solid rgba(201,179,130,0.3);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: all 0.3s;
        }
        .cta-button:hover {
          background: #f5f0e8;
          transform: scale(1.05);
        }
        .mobile-menu-btn {
          padding: 10px;
          color: white;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .mobile-menu {
          border-top: 1px solid rgba(255,255,255,0.2);
          padding: 16px 0;
        }
        .mobile-link {
          display: block;
          padding: 10px 16px;
          color: white;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s;
        }
        .mobile-link:hover {
          background: rgba(255,255,255,0.05);
          color: #c9b382;
        }
        .mobile-services {
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 12px;
          margin: 8px 16px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .mobile-services-title {
          color: #c9b382;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 8px;
          padding: 0 8px;
        }
        .mobile-service-item {
          display: block;
          padding: 8px 16px;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .mobile-service-item:hover {
          background: rgba(255,255,255,0.05);
          color: #c9b382;
        }
        .mobile-phone {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          color: #c9b382;
          font-weight: bold;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          margin: 8px 16px;
          border: 1px solid rgba(201,179,130,0.3);
        }
        .mobile-cta {
          width: 100%;
          background: white;
          color: #2d4a3e;
          padding: 14px;
          border-radius: 8px;
          font-weight: bold;
          border: 2px solid rgba(201,179,130,0.3);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          margin: 8px 16px;
          width: calc(100% - 32px);
        }
      `}</style>
    </header>
  )
}