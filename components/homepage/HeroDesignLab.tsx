import { getImageProps } from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { heroMedia } from '@/content/media'
import './hero-design-lab.css'

export type HeroDesign = 'a' | 'b' | 'c' | 'd'

/** Development studies only. Deliberately has no motion/Cut experiment lifecycle. */
export default function HeroDesignLab({ direction }: { direction: HeroDesign }) {
  const common = { alt: '', sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const }
  const { props: desktop } = getImageProps({ ...common, src: heroMedia('desktop').poster, width: 5504, height: 3072 })
  const { props: mobile } = getImageProps({ ...common, src: heroMedia('mobile').poster, width: 3072, height: 5504 })
  const lines = direction === 'a' ? ['Bring your', 'space', 'back to calm.']
    : direction === 'b' ? ['Bring your', 'space back', 'to calm.']
    : ['Bring your space', 'back to calm.']

  return <section className={`home-hero home-hero-h01 hero-lab hero-lab-${direction}`} aria-labelledby="hero-title">
    <div className="ninja-media" aria-hidden="true">
      <picture className="ninja-resolved">
        <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
        <img {...mobile} alt="" />
      </picture>
    </div>
    <p className="lab-eyebrow">CLEANING NINJA</p>
    <h1 id="hero-title" className="lab-title">{lines.map((line, index) => <span key={line} className={`lab-line lab-line-${index + 1}`}>{line}{index < lines.length - 1 ? ' ' : ''}</span>)}</h1>
    {direction === 'd' ? <div className="lab-details">
      <p className="home-hero-description lab-description">Cleaning services across major Australian cities, with a simple quote-first process.</p>
      <a href="#quote" className="home-button h01-quote lab-quote">Get a Quote<ArrowUpRight size={18} aria-hidden="true" /></a>
    </div> : <>
      <p className="home-hero-description lab-description">Cleaning services across major Australian cities, with a simple quote-first process.</p>
      <a href="#quote" className="home-button h01-quote lab-quote">Get a Quote<ArrowUpRight size={18} aria-hidden="true" /></a>
    </>}
  </section>
}
