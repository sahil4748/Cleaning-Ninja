import { useEffect, useRef } from 'react'
import { MEDIA, heroMedia } from '@/content/media'
import { getImageProps } from 'next/image'

/** H-03 is opt-in development media; H-01/H-02 remain the production base. */
export default function NinjaMedia({ hero = false }: { hero?: boolean }) {
  const media = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hero || process.env.NODE_ENV !== 'development' || !media.current) return
    const root = media.current
    const params = new URLSearchParams(window.location.search)
    const variant = params.get('hero-motion')
    const comparing = variant === 'masked' || variant === 'masked-retimed'
    root.dataset.cutPreview = String(!comparing && params.get('ninja-cut') === '1')
    if (!comparing) return
    const desktopMotion = window.matchMedia('(min-width: 1200px) and (prefers-reduced-motion: no-preference)')
    const poster = root.querySelector('img')!
    const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection
    let dispose = () => {}
    let cancelled = false
    let engaged = false
    async function sync() {
      dispose()
      let active = true
      let video: HTMLVideoElement | undefined
      dispose = () => {
        active = false
        if (video) { video.pause(); video.removeAttribute('src'); video.load(); video.remove() }
        delete root.dataset.motion
      }
      if (!engaged || document.readyState !== 'complete' || !desktopMotion.matches || connection?.saveData || !CSS.supports('mask-image', 'linear-gradient(black, transparent)')) return
      // The responsive H-01 image paints independently, before any video request.
      try { await poster.decode() } catch { return }
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
      if (!active || cancelled) return
      video = document.createElement('video')
      video.className = 'h03-motion h03-masked'
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      video.autoplay = false
      video.preload = 'none'
      video.poster = poster.currentSrc
      video.setAttribute('aria-hidden', 'true')
      video.tabIndex = -1
      video.addEventListener('playing', () => {
        const reveal = () => { if (active && video) video.dataset.ready = 'true' }
        if ('requestVideoFrameCallback' in video!) video!.requestVideoFrameCallback(reveal)
        else reveal()
      }, { once: true })
      video.addEventListener('error', () => { if (video) delete video.dataset.ready })
      video.src = `/api/dev/h03?variant=${variant === 'masked-retimed' ? 'retimed' : 'raw'}`
      root.insertBefore(video, root.querySelector('.ninja-shade'))
      root.dataset.motion = variant!
      // Rejection leaves H-01 visible; do not bypass browser autoplay policy.
      void video.play().catch(() => { if (video) delete video.dataset.ready })
    }
    const start = () => { void sync() }
    // A trusted interaction closes initial LCP measurement before motion enters.
    const engage = (event: Event) => {
      if (!event.isTrusted || engaged) return
      engaged = true
      start()
    }
    window.addEventListener('pointerdown', engage)
    window.addEventListener('keydown', engage)
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })
    desktopMotion.addEventListener('change', start)
    connection?.addEventListener('change', start)
    return () => {
      cancelled = true
      window.removeEventListener('pointerdown', engage)
      window.removeEventListener('keydown', engage)
      window.removeEventListener('load', start)
      desktopMotion.removeEventListener('change', start)
      connection?.removeEventListener('change', start)
      dispose()
    }
  }, [hero])
  const common = { alt: '', sizes: '100vw', loading: hero ? 'eager' as const : 'lazy' as const, fetchPriority: hero ? 'high' as const : 'auto' as const }
  const { props: desktop } = getImageProps({ ...common, src: hero ? heroMedia('desktop').poster : MEDIA.images.interior, width: hero ? 5504 : 1920, height: hero ? 3072 : 1264 })
  const { props: mobile } = getImageProps({ ...common, src: hero ? heroMedia('mobile').poster : MEDIA.images.mobileInterior, width: hero ? 3072 : 1000, height: hero ? 5504 : 648 })
  return <div ref={media} className="ninja-media" aria-hidden="true" data-media-slots="H-01 H-02 H-03 H-04">
    <picture className="ninja-resolved"><source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      {/* getImageProps supplies responsive optimisation without loading both compositions. */}
      <img {...mobile} alt="" />
    </picture>
    {!hero && <div className="ninja-unresolved"><picture><source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      <img {...mobile} alt="" />
    </picture></div>}
    <div className="ninja-shade" />
    {hero && process.env.NODE_ENV === 'development' && <div className="h01-cut-preview" data-preview="static architectural boundary" />}
    {hero && process.env.NODE_ENV === 'development' && <div className="h02-cut-preview" data-preview="static portrait architectural boundary" />}
  </div>
}
