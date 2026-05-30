'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * HeroCanvas — Draftly-style hero plate with two rendering paths.
 *
 * Rendering modes (selected at mount):
 *
 *   PLACEHOLDER (default — frames not shipped yet):
 *     - Pexels still photo + scroll-driven CSS parallax
 *     - GPU-only sparkle field
 *
 *   FRAME-SCRUB (production — when /hero/frame.json manifest is present):
 *     - 60 WebP frames on mobile / 400 on desktop
 *     - `<canvas>` drawImage driven by window.scrollY through rAF
 *     - First 30 frames preloaded via injected <link rel="preload">
 *
 * Selection is automatic. The component HEAD-fetches /hero/frame.json on
 * mount; if it returns 200 with a valid manifest the canvas path takes over
 * and the placeholder unmounts. Otherwise the placeholder stays visible and
 * no canvas work is done. This keeps the plumbing live but inert today.
 */

interface FrameManifest {
  /** Total frames in the desktop sequence. Default 400. */
  frames?: number
  /** Total frames in the mobile sequence. Default 60. */
  mobileFrames?: number
  /** Base URL for frame files. Default "/hero/". */
  baseUrl?: string
  /** Frame file extension. Default "webp". */
  extension?: string
  /** Scroll travel as multiplier of viewport height to scrub through full sequence. Default 1.5. */
  scrollRange?: number
  /** Frame index padding width. Default 4 (frame_0001.webp). */
  pad?: number
}

const MANIFEST_URL = '/hero/frame.json'

export function HeroCanvas() {
  const [manifest, setManifest] = useState<FrameManifest | null>(null)
  const [manifestChecked, setManifestChecked] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(MANIFEST_URL, { method: 'GET', cache: 'force-cache' })
      .then(async (r) => {
        if (!r.ok) return null
        try {
          return (await r.json()) as FrameManifest
        } catch {
          return null
        }
      })
      .then((data) => {
        if (cancelled) return
        if (data) setManifest(data)
        setManifestChecked(true)
      })
      .catch(() => {
        if (!cancelled) setManifestChecked(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Mount the canvas only when a manifest is present.
  if (manifestChecked && manifest) {
    return <FrameScrubCanvas manifest={manifest} />
  }

  return <PlaceholderCanvas />
}

/* -------------------------------------------------------------------------- */
/* Placeholder — Pexels still + parallax + sparkle field                       */
/* -------------------------------------------------------------------------- */

function PlaceholderCanvas() {
  const planeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let raf = 0
    const tick = () => {
      const y = window.scrollY
      if (planeRef.current) {
        planeRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0002})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div ref={planeRef} className="absolute inset-0 will-change-transform">
        <Image
          src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/30 to-cream" />
      </div>

      {/* Sparkle field — pure CSS, reduced-motion respected globally */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-olive/70"
            style={{
              top: `${(i * 53) % 100}%`,
              left: `${(i * 37) % 100}%`,
              animation: `sparkleFloat ${6 + (i % 5) * 1.2}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes sparkleFloat {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate3d(-10px, -16px, 0) scale(1.4); opacity: 0.9; }
          100% { transform: translate3d(8px, -22px, 0) scale(0.7); opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Frame-scrub canvas — activates when /hero/frame.json is present             */
/* -------------------------------------------------------------------------- */

function FrameScrubCanvas({ manifest }: { manifest: FrameManifest }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef<number>(-1)
  const rafRef = useRef<number>(0)

  const baseUrl = manifest.baseUrl ?? '/hero/'
  const extension = manifest.extension ?? 'webp'
  const pad = manifest.pad ?? 4

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 640px)').matches

    const frameCount = isMobile
      ? manifest.mobileFrames ?? 60
      : manifest.frames ?? 400
    const scrollRange = manifest.scrollRange ?? 1.5

    const buildSrc = (i: number) => `${baseUrl}frame_${String(i + 1).padStart(pad, '0')}.${extension}`

    // 1. Preload the first 30 frames via <link rel="preload"> so the browser's
    //    preloader prioritises them over later requests.
    const preloadCount = Math.min(30, frameCount)
    const preloadLinks: HTMLLinkElement[] = []
    for (let i = 0; i < preloadCount; i++) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = buildSrc(i)
      // WebP is the assumed default; browsers ignore unknown `imagesrcset`.
      document.head.appendChild(link)
      preloadLinks.push(link)
    }

    // 2. Construct Image objects for every frame. Browsers will dedupe with
    //    the preload tags above.
    const frames: HTMLImageElement[] = []
    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image()
      img.decoding = 'async'
      img.src = buildSrc(i)
      frames.push(img)
    }
    framesRef.current = frames

    // 3. Resize handler — keep the bitmap matched to DPR for sharpness.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const c = canvasRef.current
      const w = wrapperRef.current
      if (!c || !w) return
      const rect = w.getBoundingClientRect()
      c.width = Math.round(rect.width * dpr)
      c.height = Math.round(rect.height * dpr)
      c.style.width = `${rect.width}px`
      c.style.height = `${rect.height}px`
      // Force a redraw at the current frame.
      currentFrameRef.current = -1
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // 4. rAF loop — map window.scrollY to a frame index and drawImage. Reduced
    //    motion: paint the first frame once and skip the loop entirely.
    const paintFrame = (idx: number) => {
      const c = canvasRef.current
      if (!c) return
      const ctx = c.getContext('2d')
      if (!ctx) return
      const img = frames[idx]
      if (!img || !img.complete || img.naturalWidth === 0) return
      const cw = c.width
      const ch = c.height
      const ir = img.width / img.height
      const cr = cw / ch
      let dw = cw
      let dh = ch
      if (cr > ir) {
        dh = cw / ir
      } else {
        dw = ch * ir
      }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      currentFrameRef.current = idx
    }

    if (reducedMotion) {
      // Wait for the first image then paint it, no rAF loop needed.
      const firstImg = frames[0]
      if (firstImg.complete) {
        paintFrame(0)
      } else {
        firstImg.addEventListener('load', () => paintFrame(0), { once: true })
      }
    } else {
      const draw = () => {
        const scrollFraction = Math.min(
          Math.max(window.scrollY / (window.innerHeight * scrollRange), 0),
          1,
        )
        const idx = Math.min(Math.floor(scrollFraction * (frameCount - 1)), frameCount - 1)
        if (idx !== currentFrameRef.current) paintFrame(idx)
        rafRef.current = requestAnimationFrame(draw)
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      preloadLinks.forEach((l) => l.remove())
      framesRef.current = []
    }
  }, [manifest, baseUrl, extension, pad])

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/30 to-cream pointer-events-none" />
    </div>
  )
}
