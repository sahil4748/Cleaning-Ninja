import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { PHONE_NUMBER, PHONE_LINK, EMAIL } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-olive-900 text-beige-300 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Logo, About, Socials */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <span className="font-display font-bold text-3xl text-white">
                Cleaning Ninja
              </span>
            </Link>
            <p className="font-body text-beige-300 leading-relaxed max-w-sm">
              Australia's premium cleaning service. We deliver trustworthy, eco-friendly, and thorough cleaning solutions for your home or business.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="text-white hover:text-beige-300 transition-colors duration-200" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-beige-300 transition-colors duration-200" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-beige-300 transition-colors duration-200" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col gap-6">
            <h3 className="font-body font-bold text-white text-lg tracking-wide uppercase">Services</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/services/carpet-cleaning" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">Carpet Cleaning</Link>
              </li>
              <li>
                <Link href="/services/end-of-lease" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">End of Lease</Link>
              </li>
              <li>
                <Link href="/services/upholstery" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">Upholstery</Link>
              </li>
              <li>
                <Link href="/services/commercial" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">Commercial</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-6">
            <h3 className="font-body font-bold text-white text-lg tracking-wide uppercase">Company</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/about" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">About Us</Link>
              </li>
              <li>
                <Link href="/careers" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">Careers</Link>
              </li>
              <li>
                <Link href="/blog" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="font-body text-beige-300 hover:text-white hover:underline transition-all duration-200 underline-offset-4">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="font-body font-bold text-white text-lg tracking-wide uppercase">Contact</h3>
            <ul className="flex flex-col gap-5">
              <li>
                <a href={PHONE_LINK} className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 text-beige-300 mt-0.5 group-hover:text-white transition-colors duration-200" />
                  <span className="font-body text-beige-300 group-hover:text-white group-hover:underline transition-all duration-200 underline-offset-4">{PHONE_NUMBER}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 group">
                  <Mail className="w-5 h-5 text-beige-300 mt-0.5 group-hover:text-white transition-colors duration-200" />
                  <span className="font-body text-beige-300 group-hover:text-white group-hover:underline transition-all duration-200 underline-offset-4">{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-beige-300 mt-0.5" />
                <span className="font-body text-beige-300 leading-snug">
                  123 Clean Street<br />
                  Sydney NSW 2000<br />
                  Australia
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-beige-300/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-beige-300 text-sm">
            © 2024 Cleaning Ninja. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="font-body text-beige-300 text-sm hover:text-white hover:underline transition-all duration-200 underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-body text-beige-300 text-sm hover:text-white hover:underline transition-all duration-200 underline-offset-4">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
