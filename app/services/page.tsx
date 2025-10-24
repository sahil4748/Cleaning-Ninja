import { SERVICES } from '@/lib/constants'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Our Cleaning Services | Cleaning Ninja Australia',
  description: 'Professional cleaning services across Australia - Carpet, Upholstery, Tile & Grout, Leather, and End of Lease Cleaning',
}

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-6">
            Our Professional Cleaning Services
          </h1>
          <p className="text-xl text-accent max-w-3xl mx-auto">
            From carpet care to end of lease cleaning, we've got your home or business covered with Australia's most trusted cleaning services.
          </p>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-gold transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.fallback}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display font-bold text-2xl text-navy mb-3 group-hover:text-gold transition-colors">
                    {service.name}
                  </h2>
                  <p className="text-navy-light mb-6">{service.description}</p>
                  <Link href={`/services/${service.slug}`}>
                    <Button className="w-full">Learn More</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
