import { useEffect, useRef } from 'react'
import { MEDIA, heroMedia } from '@/content/media'
import { getImageProps } from 'next/image'

/** Approved H-01/H-02 stills; experimental motion is archived outside the app. */
export default function NinjaMedia({ hero = false }: { hero?: boolean }) {
  const media = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hero || process.env.NODE_ENV !== 'development' || !media.current) return
    const root = media.current
    const params = new URLSearchParams(window.location.search)
    root.dataset.cutPreview = String(params.get('ninja-cut') === '1')
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
