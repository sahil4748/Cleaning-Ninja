import { Star, ShieldCheck, Leaf } from 'lucide-react'

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-6 relative z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 md:gap-24">
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-semibold text-navy text-sm sm:text-base">4.9/5 on Google</span>
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-gold" />
            <span className="font-semibold text-navy text-sm sm:text-base">Fully Insured & Police Checked</span>
          </div>

          <div className="hidden md:block w-px h-8 bg-gray-200"></div>

          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="font-semibold text-navy text-sm sm:text-base">Eco-Friendly Products</span>
          </div>

        </div>
      </div>
    </div>
  )
}
