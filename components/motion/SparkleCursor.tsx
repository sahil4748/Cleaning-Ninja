'use client'

import { useEffect, useRef } from 'react'

/**
 * Magnetic sparkle cursor — desktop only, gated on
 * `(hover: hover) and (pointer: fine)` AND `prefers-reduced-motion: no-preference`.
 * The OS cursor is hidden via a body-level class so the browser falls back
 * gracefully if JS fails.
 *
 * Architecture:
 *   - One dot tracks the mouse with a 0.22 lerp (~60 fps).
 *   - 8 sparkle nodes in a ring buffer trail behind the dot via a 700ms
 *     keyframe (`sparkleTrail` in globals.css).
 *   - When the cursor hovers a `[data-magnetic]` element AND falls within
 *     SNAP_RADIUS px of its centre, the dot eases toward the element centre
 *     at SNAP_STRENGTH; otherwise the cursor follows the raw mouse position.
 *   - Outside the snap radius the magnetic flag is dropped so the cursor
 *     never lags awkwardly when grazing a large card edge.
 *
 * Tuning notes (Phase C):
 *   - Removed `transform` from the dot's CSS transition — every JS-driven
 *     frame was being double-eased, producing visible jitter on fast moves.
 *   - Added SNAP_RADIUS gate (was unconditional snap on any magnetic hover).
 *   - Snap strength raised from 0.25 → 0.32 for a more "sticky" feel without
 *     overshoot. Dot lerp tightened from 0.22 → 0.25 for snappier following.
 */

const SNAP_RADIUS = 56 // px from element centre. Smaller = subtler magnet.
const SNAP_STRENGTH = 0.32 // 0..1 — how far the cursor pulls toward centre.
const DOT_LERP = 0.25 // higher = snappier follow.
const SPARKLE_INTERVAL = 60 // ms between trail dots.

export function SparkleCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const sparkleRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reducedMotion) return

    document.body.classList.add('has-sparkle-cursor')

    const dot = dotRef.current
    const sparkles = sparkleRefs.current
    if (!dot) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let dotX = mouseX
    let dotY = mouseY
    let sparkleIdx = 0
    let lastSparkleAt = 0
    let isOverMagnetic = false
    let snapX = 0
    let snapY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      const el = e.target as HTMLElement | null
      const magnetic = el?.closest('[data-magnetic]') as HTMLElement | null
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.hypot(mouseX - cx, mouseY - cy)
        // Only engage the magnet within SNAP_RADIUS — otherwise large cards
        // drag the cursor too far from the actual pointer.
        if (dist < SNAP_RADIUS) {
          isOverMagnetic = true
          snapX = cx
          snapY = cy
          return
        }
      }
      isOverMagnetic = false
    }

    const handleMouseLeave = () => {
      dot.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      dot.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    let rafId: number
    const animate = (t: number) => {
      const targetX = isOverMagnetic ? mouseX + (snapX - mouseX) * SNAP_STRENGTH : mouseX
      const targetY = isOverMagnetic ? mouseY + (snapY - mouseY) * SNAP_STRENGTH : mouseY

      dotX += (targetX - dotX) * DOT_LERP
      dotY += (targetY - dotY) * DOT_LERP

      const scale = isOverMagnetic ? 1.6 : 1
      dot.style.transform = `translate3d(${dotX - 8}px, ${dotY - 8}px, 0) scale(${scale})`

      if (t - lastSparkleAt > SPARKLE_INTERVAL && sparkles.length > 0) {
        const sparkle = sparkles[sparkleIdx % sparkles.length]
        if (sparkle) {
          const jitterX = (Math.random() - 0.5) * 24
          const jitterY = (Math.random() - 0.5) * 24
          sparkle.style.setProperty('--tx', `${jitterX}px`)
          sparkle.style.setProperty('--ty', `${jitterY + 12}px`)
          sparkle.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`
          sparkle.style.animation = 'none'
          // Reflow then re-apply animation so it restarts cleanly.
          void sparkle.offsetWidth
          sparkle.style.animation = 'sparkleTrail 700ms ease-out forwards'
        }
        sparkleIdx++
        lastSparkleAt = t
      }

      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.body.classList.remove('has-sparkle-cursor')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden lg:block"
    >
      <div
        ref={dotRef}
        // Only opacity transitions. Transform is JS-driven so any CSS
        // transition on it would double-ease and jitter.
        className="absolute left-0 top-0 h-4 w-4 rounded-full bg-olive shadow-[0_0_20px_4px_rgba(107,124,58,0.45)] transition-opacity duration-150 ease-out will-change-transform"
        style={{ mixBlendMode: 'difference' }}
      />
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) sparkleRefs.current[i] = el
          }}
          className="absolute left-0 top-0 h-2 w-2 rounded-full bg-olive-soft opacity-0 will-change-transform"
        />
      ))}
    </div>
  )
}
