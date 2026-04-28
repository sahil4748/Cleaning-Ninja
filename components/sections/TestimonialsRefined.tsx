'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Sydney',
    quote: "Thought I'd lose my bond for sure - these legends had my place looking better than when I moved in! Got the full deposit back, no dramas.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: 'James T.',
    location: 'Melbourne',
    quote: "Our office in the CBD gets a proper clean every fortnight. They're in and out like ninjas - never disrupt the team.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: 'Emily R.',
    location: 'Brisbane',
    quote: "Best investment we made! The tiles in our ensuite haven't looked this good since we built the house. Fair dinkum professionals.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: 'Michael W.',
    location: 'Perth',
    quote: "Needed a last minute clean before an inspection. The team arrived on time, brought everything they needed, and the results were flawless.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  }
]

export default function TestimonialsRefined() {
  return (
    <section className="section bg-beige-50 overflow-hidden">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm md:text-base text-olive-700 uppercase tracking-[0.2em] font-medium block mb-4"
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-olive-900 font-bold mb-6"
          >
            Loved by Aussies
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-beige-700 text-lg md:text-xl font-light leading-relaxed"
          >
            Don't just take our word for it. Here's what real homeowners have to say about our premium cleaning services.
          </motion.p>
        </div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative px-4 sm:px-0"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!bg-olive-900',
              bulletClass: 'swiper-pagination-bullet !bg-olive-300 !opacity-50 hover:!opacity-100 transition-opacity',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="!pb-16"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="bg-white border border-beige-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-grab active:cursor-grabbing">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="font-display text-lg text-olive-900 italic leading-relaxed mb-8 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-olive-50 shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-body font-bold text-olive-900">
                        {testimonial.name}
                      </span>
                      <span className="font-body text-sm text-beige-700 font-medium">
                        {testimonial.location}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}} />
    </section>
  )
}
