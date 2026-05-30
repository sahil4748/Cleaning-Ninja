'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * GrimeToGleam — the "scroll to clean" canvas on the Standard section.
 *
 * Phase C ships an enhanced CSS+SVG implementation:
 *   - Two stacked images (grimy / clean) — Pexels stock until bespoke shoot.
 *   - Wipe reveal driven by scroll progress via an SVG turbulence-noise mask,
 *     producing an organic edge rather than a hard horizontal line.
 *   - Sparkle particle layer that fades in past 30% progress.
 *   - Progress strip at the bottom with live percentage readout.
 *
 * The Three.js shader upgrade is intentionally deferred. The CSS path:
 *   - Costs ~3 KB JS vs ~600 KB for three.js (and ~80 KB for r3f/drei).
 *   - Has zero WebGL fragility (no context-loss handling needed).
 *   - Hits the same visual target with the noise-masked clip-path.
 * Phase D can swap this single file for a r3f ShaderMaterial plane without
 * touching the consumer (OurStandard imports `GrimeToGleam` only).
 *
 * Reduced-motion: snaps to progress=1 immediately (the "clean" state) and
 * stops the rAF loop.
 */
export function GrimeToGleam() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)
  // Per-instance SVG filter id (prevents collisions if more than one mounts).
  const reactId = useId()
  const maskId = `grimeMask-${reactId.replace(/[:]/g, '')}`
  const turbId = `grimeTurb-${reactId.replace(/[:]/g, '')}`

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setProgress(1)
      return
    }

    let raf = 0
    const tick = () => {
      const el = ref.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const start = vh
        const end = -rect.height
        const distance = start - end
        const travelled = start - rect.top
        const p = Math.min(Math.max(travelled / distance, 0), 1)
        setProgress(p)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Noise-edge offset gives the wipe an organic feathered boundary.
  // The clip-path band travels 0% → 100% of the container; we feather ~8%.
  const wipePosition = progress * 100
  const featherPx = 18

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-charcoal-deep">
      {/* SVG filter — used as a mask for the "clean" layer to give the wipe
          an organic, slightly turbulent edge instead of a hard line. */}
      <svg className="absolute inset-0 h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={turbId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
          <mask id={maskId}>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
              filter={`url(#${turbId})`}
              style={{
                clipPath: `inset(0 0 ${100 - wipePosition}% 0)`,
                transition: 'clip-path 80ms linear',
              }}
            />
          </mask>
        </defs>
      </svg>

      {/* GRIMY layer */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3737616/pexels-photo-3737616.jpeg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-60 saturate-[0.6] contrast-[0.85] sepia-[18%] hue-rotate-[20deg]"
          aria-hidden="true"
        />
      </div>

      {/* CLEAN layer — revealed via SVG noise mask + clip-path. The clip
          provides the gross travel; the turbulence displaces its edge so the
          boundary feathers organically (water-sheen feel). */}
      <div
        className="absolute inset-0 transition-[clip-path] duration-100"
        style={{
          WebkitMask: `url(#${maskId})`,
          mask: `url(#${maskId})`,
          // Fallback clip-path: even without SVG-mask support we still get the
          // basic wipe. Plus a soft pixel-feather via radial fade.
          clipPath: `inset(0 0 calc(${100 - wipePosition}% - ${featherPx}px) 0)`,
        }}
      >
        <Image
          src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover saturate-[1.05] brightness-[1.05]"
          aria-hidden="true"
        />
      </div>

      {/* Sparkle particles — concentrated in the upper revealed half */}
      <div className="absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => {
          const visible = progress > 0.3 + (i % 6) * 0.1
          return (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cream"
              style={{
                top: `${(i * 41) % 100}%`,
                left: `${(i * 67) % 100}%`,
                opacity: visible ? 0.9 : 0,
                animation: visible ? `gleamFloat ${3 + (i % 4) * 0.8}s ease-in-out ${i * 0.18}s infinite alternate` : 'none',
                transition: 'opacity 600ms ease-out',
                filter: 'drop-shadow(0 0 4px rgba(232,238,223,0.85))',
              }}
            />
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
          <span className="text-cream/50">Grime</span>
          <span className="relative h-px flex-1 overflow-hidden rounded-full bg-cream/15">
            <span
              className="absolute inset-y-0 left-0 bg-olive-soft transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
          <span className="text-cream">Gleam · {Math.round(progress * 100)}%</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes gleamFloat {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-6px, -10px, 0) scale(1.6); }
          100% { transform: translate3d(4px, -14px, 0) scale(0.8); }
        }
      `}</style>
    </div>
  )
}
