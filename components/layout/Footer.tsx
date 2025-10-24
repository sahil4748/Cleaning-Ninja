import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react'
import { SERVICES, PHONE_NUMBER, PHONE_LINK, EMAIL, EMAIL_LINK } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🥷</span>
              <span className="font-display font-bold text-xl text-gold">Cleaning Ninja</span>
            </div>
            <p className="text-accent italic mb-4">"Your mess, our mission"</p>
            <div className="space-y-2">
              <a href={PHONE_LINK} className="flex items-center space-x-2 hover:text-gold transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">{PHONE_NUMBER}</span>
              </a>
              <a href={EMAIL_LINK} className="flex items-center space-x-2 hover:text-gold transition-colors">
                <Mail className="w-5 h-5" />
                <span>{EMAIL}</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Servicing all major Australian cities</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors">All Services</Link></li>
              <li><Link href="/special-offers" className="hover:text-gold transition-colors">Special Offers</Link></li>
              <li><Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
              <li><Link href="/become-a-cleaner" className="hover:text-gold transition-colors">Become a Cleaner</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg text-gold mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(service => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="hover:text-gold transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-display font-bold text-lg text-gold mb-4">Connect & Legal</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-gold transition-colors"><Facebook /></a>
              <a href="#" className="hover:text-gold transition-colors"><Instagram /></a>
              <a href="#" className="hover:text-gold transition-colors"><Linkedin /></a>
            </div>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            </ul>
            <p className="mt-4 text-sm text-accent">ABN: 12 345 678 901</p>
            <p className="text-sm text-accent">Fully Licensed & Insured</p>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-8 text-center text-accent">
          <p>© 2025 Cleaning Ninja Australia. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
