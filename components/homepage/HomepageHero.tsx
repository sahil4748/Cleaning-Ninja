import { getImageProps } from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { heroMedia } from '@/content/media'
import './hero-design-lab.css'

/** Locked D desktop composition, with an independently composed phone source. */
export default function HomepageHero() {
  const common = { alt: '', sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const }
  const { props: desktop } = getImageProps({ ...common, src: heroMedia('desktop').poster, width: 5504, height: 3072 })
  const { props: mobile } = getImageProps({ ...common, src: heroMedia('mobile').poster, width: 3072, height: 5504 })
  return <section className="home-hero home-hero-h01 hero-lab hero-lab-d candidate-hero" aria-labelledby="hero-title">
    <div className="ninja-media" aria-hidden="true"><picture className="ninja-resolved">
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      <img {...mobile} alt="" />
    </picture></div>
    <p className="lab-eyebrow">CLEANING NINJA</p>
    <h1 id="hero-title" className="lab-title"><span className="lab-line lab-line-1">Bring your space </span><span className="lab-line lab-line-2">back to calm.</span></h1>
    <div className="lab-details"><p className="home-hero-description lab-description">Cleaning services across major Australian cities, with a simple quote-first process.</p><a href="#quote" className="home-button h01-quote lab-quote">Get a Quote<ArrowUpRight size={18} aria-hidden="true" /></a></div>
  </section>
}
