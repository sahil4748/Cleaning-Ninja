'use client'

import { ReactNode, useEffect } from 'react'

/**
 * Lenis smooth scroll, desktop only. iOS keeps native momentum.
 *
 * Gated on `(hover: hover) and (pointer: fine)` and `prefers-reduced-motion: no-preference`.
 * Lenis is dynamically imported to keep the initial bundle small.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches

    if (!supportsHover || reducedMotion || !desktop) return

    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null
    let rafId: number | null = null

    let cancelled = false

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
      }) as unknown as { destroy: () => void; raf: (t: number) => void }

      document.documentElement.classList.add('lenis', 'lenis-smooth')

      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      if (rafId !== null) cancelAnimationFrame(rafId)
      lenis?.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [])

  return <>{children}</>
}
