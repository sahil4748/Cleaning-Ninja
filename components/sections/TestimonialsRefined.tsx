'use client'

import { motion, Variants } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

const TESTIMONIALS = [
  { name: 'Sarah M.', location: 'Sydney', quote: "Thought I'd lose my bond for sure - these legends had my place looking better than when I moved in! Got the full deposit back, no dramas.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
  { name: 'James T.', location: 'Melbourne', quote: "Our office in the CBD gets a proper clean every fortnight. They're in and out like ninjas - never disrupt the team.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
  { name: 'Emily R.', location: 'Brisbane', quote: "Best investment we made! The tiles in our ensuite haven't looked this good since we built the house. Fair dinkum professionals.", rating: 5, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" },
  { name: 'Michael W.', location: 'Perth', quote: "Needed a last minute clean before an inspection. The team arrived on time, brought everything they needed, and the results were flawless.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" }
]

export default function TestimonialsRefined() {
  return (
    <section className="py-16 md:py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-14 md:mb-16"
        >
          <span className="font-body text-xs md:text-sm font-bold text-olive-700 uppercase tracking-[0.2em] block mb-4">TESTIMONIALS</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-olive-900 font-bold mb-5 max-w-2xl leading-tight">Loved by Aussies</h2>
          <p className="font-body text-beige-700 font-light max-w-lg text-base md:text-lg">Don't just take our word for it. Here's what real homeowners have to say.</p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!bg-olive-900',
              bulletClass: 'swiper-pagination-bullet !bg-olive-300 !opacity-50 hover:!opacity-100 transition-opacity',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="!pb-16"
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="bg-beige-50 border border-beige-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-400 flex flex-col h-full group cursor-grab active:cursor-grabbing">
                  <Quote className="w-7 h-7 text-olive-200 fill-olive-100 mb-5" />
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${j * 40}ms` }} />)}
                  </div>
                  <p className="font-body text-base text-olive-900 leading-relaxed mb-8 flex-grow">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto pt-6 border-t border-beige-200">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-olive-50 shadow-sm" />
                    <div>
                      <span className="font-body font-bold text-olive-900 text-sm block">{t.name}</span>
                      <span className="font-body text-xs text-beige-600">{t.location}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `.swiper-pagination-bullet { width: 10px; height: 10px; } .swiper-pagination-bullet-active { opacity: 1 !important; transform: scale(1.2); }`}} />
    </section>
  )
}
