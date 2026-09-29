import { useEffect, useRef } from 'react'
import { heroMedia } from '@/content/media'

/** The complete, server-rendered poster is independent of this enhancement. */
export default function useHeroMotion() {
  const media = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = media.current!
    const poster = root.querySelector('img')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = matchMedia('(min-width: 1200px)')
    const phone = matchMedia('(max-width: 767px)')
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean; effectiveType?: string } }).connection
    let disposed = false
    let presented = false
    let visible = false
    const attempted = new Set<string>()
    let device: 'desktop' | 'mobile' | undefined
    let video: HTMLVideoElement | undefined
    let stopTimer: ReturnType<typeof setTimeout> | undefined
    let frame: number | undefined
    const stop = () => {
      clearTimeout(stopTimer)
      video?.pause()
    }
    const remove = () => {
      stop()
      if (video) {
        if (frame !== undefined) video.cancelVideoFrameCallback(frame)
        video.removeAttribute('src')
        video.load()
        video.remove()
        video = undefined
      }
      delete root.dataset.cinema
    }
    const fail = () => { remove(); root.dataset.cinema = 'poster' }
    const play = () => {
      if (!video || video.ended || video.currentTime >= 4.8) return
      const current = video
      void current.play().catch(() => { if (video === current) fail() })
    }
    const sync = () => {
      const constrained = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')
      if (disposed) return
      const target = phone.matches ? 'mobile' : desktop.matches ? 'desktop' : undefined
      if (reduced.matches || constrained || target !== device) remove()
      device = target
      if (reduced.matches || constrained) { delete root.dataset.settle; return }
      if (!presented || !visible || document.hidden) { stop(); return }
      // Portrait motion only on phones; tablet keeps the existing H-01 still.
      if (!device) return
      if (device === 'desktop' && (!CSS.supports('width', '1cqh') || !CSS.supports('mask-image', 'linear-gradient(black, transparent)'))) return
      if (video) { play(); return }
      if (attempted.has(device)) return
      attempted.add(device)
      video = document.createElement('video')
      video.className = device === 'mobile' ? 'h04-motion' : 'h03-motion h03-masked'
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.preload = 'none'
      video.poster = poster.currentSrc
      video.setAttribute('aria-hidden', 'true')
      video.tabIndex = -1
      const current = video
      video.addEventListener('error', () => { if (video === current) fail() })
      video.addEventListener('playing', () => {
        const reveal = () => {
          if (video !== current || disposed) return
          video.dataset.ready = 'true'
          root.dataset.cinema = 'playing'
        }
        if (video && 'requestVideoFrameCallback' in video) frame = video.requestVideoFrameCallback(reveal)
        else reveal()
        // One brief shot, no loop or ongoing distraction requiring a play control.
        clearTimeout(stopTimer)
        stopTimer = setTimeout(() => { stop(); root.dataset.cinema = 'calm' }, Math.max(0, 4800 - (video?.currentTime ?? 0) * 1000))
      })
      video.src = heroMedia(device).video!
      root.append(video)
      root.dataset.cinema = 'loading'
      play()
    }
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.1)
      sync()
    }, { threshold: 0.1 })
    observer.observe(root)
    const present = async () => {
      try { await poster.decode() } catch { return }
      // Load + decode + two paint opportunities. No click, idle timeout, or video preload.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        presented = true
        sync()
      }))
    }
    if (document.readyState === 'complete') void present()
    else window.addEventListener('load', present, { once: true })
    for (const query of [reduced, desktop, phone]) query.addEventListener('change', sync)
    connection?.addEventListener('change', sync)
    document.addEventListener('visibilitychange', sync)
    return () => {
      disposed = true
      observer.disconnect()
      window.removeEventListener('load', present)
      for (const query of [reduced, desktop, phone]) query.removeEventListener('change', sync)
      connection?.removeEventListener('change', sync)
      document.removeEventListener('visibilitychange', sync)
      remove()
    }
  }, [])
  return media
}
