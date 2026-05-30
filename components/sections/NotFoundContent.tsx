'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw, Home, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Eyebrow from '@/components/ui/Eyebrow'
import Heading from '@/components/ui/Heading'
import Body from '@/components/ui/Body'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// Dust particle interface
interface Dust {
  id: number
  x: number
  y: number
  scale: number
}

export default function NotFoundContent() {
  const [animationPhase, setAnimationPhase] = useState<'shuriken' | 'transforming' | 'mop' | 'sweeping'>('shuriken')
  const [dustParticles, setDustParticles] = useState<Dust[]>([])
  const [sweptCount, setSweptCount] = useState(0)
  const reduced = useReducedMotion()

  // Generate dust particles on mount
  useEffect(() => {
    const particles: Dust[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      // Distribute dust on the right side of the canvas
      x: 60 + Math.random() * 120,
      y: -50 + Math.random() * 140,
      scale: 0.5 + Math.random() * 0.8,
    }))
    setDustParticles(particles)
  }, [])

  const triggerTransformation = () => {
    if (animationPhase !== 'shuriken') return
    setAnimationPhase('transforming')

    setTimeout(() => {
      setAnimationPhase('mop')
      // Trigger sweep shortly after morph is complete
      setTimeout(() => {
        setAnimationPhase('sweeping')
        // Sweeping removes dust particles one by one in a sweeping timeline
        setTimeout(() => {
          setDustParticles([])
          setSweptCount((c) => c + 1)
          setAnimationPhase('shuriken')
        }, 1800)
      }, 1000)
    }, 1200)
  }

  // Auto trigger animation on mount after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerTransformation()
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-cream py-16 lg:py-24 overflow-hidden">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Content panel */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <Stack gap="6">
              <div className="inline-flex">
                <span className="bg-olive/10 text-olive-deep text-[11px] font-mono font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-[4px] flex items-center gap-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-olive animate-ping" />
                  ERROR CODE · 404
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-display text-[96px] font-extrabold leading-none tracking-[-0.04em] text-olive/20 sm:text-[120px] lg:text-[144px]">
                  404
                </span>
                <Heading as="h1" variant="display-xl" className="!text-[36px] sm:!text-[48px] lg:!text-[56px] leading-[1.05] tracking-[-0.03em] -mt-10">
                  This page went <span className="text-olive">ninja-vanish.</span>
                </Heading>
              </div>

              <Body variant="body-l" className="text-charcoal/72 max-w-[46ch] leading-relaxed">
                Our cleaners are exceptionally precise, but it seems they swept this URL clean off the server! No worries — let&apos;s get you back to a spotless space.
              </Body>

              <div className="h-px w-full bg-border" />

              {/* Recovery CTA group */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  as={Link}
                  href="/book"
                  variant="primary-light"
                  size="lg"
                  className="bg-olive border-olive text-cream hover:bg-olive-deep hover:border-olive-deep shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  See my price (60 sec)
                  <ArrowRight className="h-4 w-4" />
                </Button>
                
                <Button
                  as={Link}
                  href="/"
                  variant="secondary-light"
                  size="lg"
                  className="border-charcoal text-charcoal hover:bg-charcoal hover:text-cream font-semibold"
                >
                  <Home className="h-4 w-4" />
                  Back to home
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[14px]">
                <Link
                  href="/services"
                  className="font-body font-semibold text-charcoal/75 hover:text-olive hover:underline underline-offset-4 transition-colors"
                >
                  Our services
                </Link>
                <Link
                  href="/pricing"
                  className="font-body font-semibold text-charcoal/75 hover:text-olive hover:underline underline-offset-4 transition-colors"
                >
                  Transparent pricing
                </Link>
                <Link
                  href="/reviews"
                  className="font-body font-semibold text-charcoal/75 hover:text-olive hover:underline underline-offset-4 transition-colors"
                >
                  Customer reviews
                </Link>
              </div>
            </Stack>
          </div>

          {/* Playful Interactive Shuriken-to-Mop Animation Panel */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl border border-border/80 bg-surface-muted p-8 flex flex-col items-center justify-center shadow-lg group overflow-hidden">
              
              {/* Background HUD decorations */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-charcoal/30 tracking-wider">
                NINJA_CLEAN_ENGINE_v2.6
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-charcoal/30 tracking-wider flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-olive-soft" />
                STATUS: {animationPhase.toUpperCase()}
              </div>

              {/* Score card of dust particles swept */}
              <div className="absolute top-4 right-4 font-mono text-[10px] text-charcoal/50 bg-cream px-2 py-0.5 rounded-[3px] border border-border/50 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-olive" />
                <span>Sweeps: {sweptCount}</span>
              </div>

              {/* Main Animation Container */}
              <div className="relative h-[240px] w-full flex items-center justify-center">
                
                {/* Dust particles (rendered on the right half, swept away in sweeping phase) */}
                <AnimatePresence>
                  {dustParticles.map((dust) => (
                    <motion.div
                      key={dust.id}
                      className="absolute h-2.5 w-2.5 rounded-full bg-charcoal/15 border border-charcoal/5"
                      style={{
                        left: `calc(50% + ${dust.x}px)`,
                        top: `calc(50% + ${dust.y}px)`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: dust.scale, opacity: 1 }}
                      exit={{ 
                        scale: 0, 
                        opacity: 0,
                        x: dust.x + 80, // fly away to the right
                        y: dust.y - 40,
                        transition: { duration: 0.3 }
                      }}
                    />
                  ))}
                </AnimatePresence>

                {/* Sparkling feedback on sweeps */}
                {animationPhase === 'sweeping' && (
                  <motion.div
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-olive-soft/40"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="h-10 w-10 animate-pulse" />
                  </motion.div>
                )}

                {/* Animated Shuriken / Mop */}
                <motion.div
                  className="relative cursor-pointer z-10"
                  onClick={triggerTransformation}
                  animate={
                    animationPhase === 'shuriken'
                      ? { rotate: [0, 360], scale: 1 }
                      : animationPhase === 'transforming'
                        ? { rotate: 0, scale: 1.05 }
                        : animationPhase === 'sweeping'
                          ? { 
                              x: [0, 110, -30, 110, 0], 
                              rotate: [0, 12, -15, 12, 0],
                              y: [0, -10, 15, -10, 0]
                            }
                          : { rotate: 0, scale: 1 }
                  }
                  transition={
                    animationPhase === 'shuriken'
                      ? { repeat: Infinity, duration: 4, ease: 'linear' }
                      : animationPhase === 'sweeping'
                        ? { duration: 1.8, ease: 'easeInOut' }
                        : { duration: 0.6, ease: 'easeOut' }
                  }
                >
                  {/* The Mop Handle (appears in transforming phase) */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[16px] w-[5px] bg-[#8B7355] origin-bottom rounded-t-full"
                    initial={{ height: 0 }}
                    animate={
                      animationPhase === 'shuriken'
                        ? { height: 0, y: 0 }
                        : { height: 110, y: -16 }
                    }
                    transition={{ duration: 0.8, ease: 'backOut' }}
                  />

                  {/* The Shuriken / Mop Head Junction */}
                  <svg
                    viewBox="0 0 100 100"
                    className="h-24 w-24 text-olive transition-colors duration-300 drop-shadow-md"
                    fill="currentColor"
                  >
                    {/* Sharp 4-point Shuriken Star design */}
                    <path
                      d="M50 0 C50 35, 35 50, 0 50 C35 50, 50 65, 50 100 C50 65, 65 50, 100 50 C65 50, 50 35, 50 0 Z"
                      className={cn(
                        "transition-colors duration-500",
                        animationPhase === 'shuriken' ? "text-charcoal-soft" : "text-olive"
                      )}
                    />
                    {/* Inner steel ring/hole */}
                    <circle cx="50" cy="50" r="11" className="fill-cream" />
                    <circle cx="50" cy="50" r="7" className="fill-charcoal-deep" />
                  </svg>

                  {/* Mop Strands (appears in transforming phase) */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-[78px] flex flex-col items-center origin-top"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={
                      animationPhase === 'shuriken'
                        ? { opacity: 0, scaleY: 0 }
                        : { opacity: 1, scaleY: 1 }
                    }
                    transition={{ duration: 0.6, ease: 'anticipate', delay: 0.2 }}
                  >
                    {/* Mop base connector */}
                    <div className="h-3 w-10 bg-olive-deep rounded-full shadow-sm" />
                    
                    {/* Hanging cotton threads */}
                    <div className="flex gap-0.5 justify-center mt-[-2px]">
                      {Array.from({ length: 9 }).map((_, idx) => (
                        <motion.div
                          key={idx}
                          className="w-[3px] bg-cream border-r border-charcoal/10 rounded-b-full shadow-inner"
                          style={{
                            height: idx === 4 ? '36px' : idx === 3 || idx === 5 ? '34px' : idx === 2 || idx === 6 ? '30px' : '26px'
                          }}
                          animate={
                            animationPhase === 'sweeping'
                              ? { rotate: [-10, 15, -12, 10, 0] }
                              : {}
                          }
                          transition={{ duration: 1.8, ease: 'easeInOut' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

              </div>

              {/* Hint button to trigger manual animation */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={triggerTransformation}
                  disabled={animationPhase !== 'shuriken'}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-[13px] font-semibold transition-all duration-300 shadow-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive",
                    animationPhase === 'shuriken'
                      ? "bg-cream border-border text-charcoal hover:border-olive hover:text-olive cursor-pointer"
                      : "bg-olive/5 border-olive/10 text-olive-deep opacity-60 cursor-not-allowed"
                  )}
                >
                  <RotateCcw className={cn("h-3.5 w-3.5", animationPhase === 'transforming' && "animate-spin")} />
                  <span>
                    {animationPhase === 'shuriken' && "Spin & sweep grime"}
                    {animationPhase === 'transforming' && "Morphing equipment..."}
                    {animationPhase === 'mop' && "Ready to mop!"}
                    {animationPhase === 'sweeping' && "Sweeping URL clean..."}
                  </span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  )
}
