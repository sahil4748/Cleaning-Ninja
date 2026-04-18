'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

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
  }
]

export default function TestimonialsRefined() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="w-full bg-beige-100 py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-body text-sm text-olive-500 uppercase tracking-widest font-semibold block mb-3">
            TESTIMONIALS
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-olive-900 font-bold mb-4">
            Loved by Aussies
          </h2>
          <p className="font-body text-beige-700 text-lg leading-relaxed">
            Don't just take our word for it. Here's what real homeowners have to say about our premium cleaning services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-white border border-beige-300 rounded-xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
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
                  className="w-16 h-16 rounded-full object-cover border-2 border-olive-100 shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="font-body font-semibold text-olive-900">
                    {testimonial.name}
                  </span>
                  <span className="font-body text-sm text-beige-700">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  )
}
