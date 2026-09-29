import { getImageProps } from 'next/image'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { heroMedia } from '@/content/media'
import useHeroMotion from './useHeroMotion'
import './homepage-hero.css'

/** Independent portrait and landscape media, with a readable first frame. */
export default function HomepageHero() {
  const media = useHeroMotion()
  // Cover expands the landscape plane beyond a narrow viewport. Request enough pixels.
  const desktopSizes = '(min-width: 1614px) 100vw, 1614px'
  const common = { alt: '', sizes: 'max(100vw, 56.25vh)', loading: 'eager' as const, fetchPriority: 'high' as const }
  const { props: desktop } = getImageProps({ ...common, src: heroMedia('desktop').poster, sizes: desktopSizes, width: 5504, height: 3072 })
  const { props: mobile } = getImageProps({ ...common, src: heroMedia('mobile').poster, width: 3072, height: 5504 })
  return <section className="home-hero home-hero-h01 service-led-hero" aria-labelledby="hero-title">
    <div ref={media} className="ninja-media" aria-hidden="true" data-media-slots="H-01 H-03 H-04"><picture className="ninja-resolved">
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes={desktopSizes} />
      <img {...mobile} alt="" />
    </picture></div>
    <div className="hero-message">
      <h1 id="hero-title"><span>Cleaner carpets. </span><em>A fresher home.</em></h1>
      <p>Carpet, rug and upholstery cleaning.<br />Care for the spaces you live in.</p>
      <div className="hero-actions"><a href="#quote" className="home-button h01-quote lab-quote">Get a Quote<ArrowUpRight size={18} aria-hidden="true" /></a><a href="#services" className="hero-service-link">Explore services<ArrowUpRight size={17} aria-hidden="true" /></a></div>
    </div>
    <a href="#packages" className="hero-next"><span>Find a package for your home</span><ArrowDown size={20} aria-hidden="true" /></a>
  </section>
}
