'use client'

import { COMMUNICATION, FEATURES } from '@/content/features'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { approvedHomepageReviews, homeServices, homepageFaq, packages } from '@/content/homepage'
import HomeHeader, { Brand } from './HomeHeader'
import QuoteForm, { type QuoteContext } from './QuoteForm'
import HomeStickyQuote from './HomeStickyQuote'
import HomepageHero from './HomepageHero'
import { MEDIA } from '@/content/media'
import './homepage-finish.css'

function Proof() {
  return <section id="proof" className="home-section home-proof" aria-labelledby="proof-title">
    {FEATURES.reviews && approvedHomepageReviews.length ? <><h2 id="proof-title">In their words.</h2>{approvedHomepageReviews.map(review => <figure key={review.id}><blockquote>{review.quote}</blockquote><figcaption><a href={review.sourceUrl}>{review.attribution}</a></figcaption></figure>)}</> : <>
      <h2 id="proof-title">Clarity comes<br /><em>before commitment.</em></h2>
      <div className="home-proof-detail"><p>Start with a conversation about your space, the service you need and your location.</p><p>Your enquiry is the starting point. Scope, pricing and availability are confirmed separately.</p><a href={COMMUNICATION.email.href} className="home-text-link">Talk to Cleaning Ninja<ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </>}
  </section>
}

export default function Homepage() {
  const [context, setContext] = useState<QuoteContext>({ service: '', suburb: '', packageName: '' })
  const [activeService, setActiveService] = useState(0)
  const signature = useRef<HTMLElement>(null)
  const [cut, setCut] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setCut(true); observer.disconnect() }
    }, { threshold: 0.25 })
    if (signature.current) observer.observe(signature.current)
    return () => observer.disconnect()
  }, [])
  function select(service: string, packageName = '') {
    setContext(previous => ({ ...previous, service, packageName }))
    document.getElementById('quote')?.scrollIntoView({ behavior: 'instant' })
    requestAnimationFrame(() => document.getElementById('quote-service')?.focus({ preventScroll: true }))
  }
  function exploreService(index: number) {
    setActiveService(index)
    if (window.matchMedia('(max-width: 767px)').matches) requestAnimationFrame(() => {
      document.getElementById('active-service')?.scrollIntoView({ behavior: 'instant', block: 'start' })
      document.getElementById('active-service-title')?.focus({ preventScroll: true })
    })
  }
  const service = homeServices[activeService]
  return <div className="home-prototype home-candidate" data-hero-design="d">
    <HomeHeader />
    <main id="home-main" tabIndex={-1}>
      <HomepageHero />
      <section id="packages" className="home-section home-packages" aria-labelledby="packages-title">
        <div className="home-section-heading"><h2 id="packages-title">Selected<br /><em>Packages</em></h2><p>Useful starting points.<br />A quote shaped around your space.</p></div>
        <div className="home-package-layout"><figure className="home-package-plate"><Image src={MEDIA.hero.desktop.poster} alt="Illustrative living room with a rug, lounge and natural materials" fill sizes="(max-width: 767px) 90vw, 34vw" /><figcaption>A LITTLE ATTENTION. A DIFFERENT FEELING.</figcaption></figure>
          <div className="home-package-index">{packages.map((item, index) => <article className="home-package" key={item.id}><span className="home-index-number">0{index + 1}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><button aria-label={`Enquire about ${item.name}`} onClick={() => select(item.service, item.name)}><span>Enquire</span><ArrowUpRight size={21} aria-hidden="true" /></button></article>)}<p className="home-small-note">Pricing, inclusions and suitability confirmed on enquiry.</p></div>
        </div>
      </section>
      <section id="services" className="home-section home-services" aria-labelledby="services-title">
        <div className="home-section-heading"><h2 id="services-title">Every space.<br /><em>Its own starting point.</em></h2><p>Explore our cleaning services.<br />Select one to make it yours.</p></div>
        <div className="home-service-system"><div className="home-service-index" aria-label="Select a service">{homeServices.map((item, index) => <button aria-pressed={index === activeService} aria-controls="active-service" onClick={() => exploreService(index)} key={item.slug}><span>{String(index + 1).padStart(2, '0')}</span>{item.name}<ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
          <div id="active-service" className="home-service-feature"><div className="home-service-photo"><Image src={activeService === 2 || activeService === 4 ? MEDIA.hero.mobile.poster : MEDIA.hero.desktop.poster} alt="Illustrative interior" fill sizes="(max-width: 767px) 90vw, 48vw" /></div><div className="home-service-caption"><h3 id="active-service-title" tabIndex={-1} aria-live="polite">{service.name}</h3><p>{service.description}</p><div><button className="home-text-link" onClick={() => select(service.slug)}>Quote this service<ArrowUpRight size={18} aria-hidden="true" /></button><a href={service.href}>Explore service</a></div></div></div>
        </div>
      </section>
      <section ref={signature} id="ninja-cut" className={`home-signature ${cut ? 'is-resolved' : ''}`} aria-labelledby="signature-title">
        <div className="home-cut-frame" aria-hidden="true"><Image src={MEDIA.hero.desktop.poster} alt="" fill sizes="(max-width: 767px) 100vw, 70vw" /><div className="home-cut-noise"><span>Noise.</span><span>Rush.</span><span>Repeat.</span></div></div>
        <div className="home-signature-copy"><span className="home-cut-label">THE NINJA CUT</span><h2 id="signature-title">Less noise.<br /><em>More calm.</em></h2><p>Precision passes through.<br />Room to breathe remains.</p></div><div className="home-cut-baseline"><span>PRECISION</span><span>CONTROL</span><span>CALM</span></div>
      </section>
      <section id="why" className="home-section home-why" aria-labelledby="why-title"><div><h2 id="why-title">Why<br /><em>Cleaning Ninja?</em></h2><p className="home-why-intro">A considered start.<br />A clearer next step.</p></div><div className="home-why-points"><article><h3>Your space comes first.</h3><p>Choose from our service range and tell us what needs attention, in your own words.</p></article><article><h3>A quote before a commitment.</h3><p>Begin with an enquiry about scope and pricing. No booking is confirmed by submitting a form.</p></article><article><h3>A direct line to the next step.</h3><p>Use the quote form or email Cleaning Ninja to discuss your request.</p></article></div></section>
      <section id="how-it-works" className="home-section home-how" aria-labelledby="how-title"><div className="home-section-heading"><h2 id="how-title">Simple from<br /><em>the first hello.</em></h2><p>Three steps.<br />One clear way forward.</p></div><ol>{[['Tell us what you need', 'Choose a service. Share your suburb and a few details about your space.'], ['Receive a quote / next step', 'Discuss scope, pricing and whether your location can be serviced.'], ['Arrange the service', 'Agree the details and a suitable time. Booking is confirmed separately.']].map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
      <Proof />
      <section id="coverage" className="home-section home-coverage" aria-labelledby="coverage-title"><div><h2 id="coverage-title">A little closer<br /><em>to your everyday.</em></h2><p className="home-coverage-reach">Across major Australian cities.</p></div><div><p>Brisbane is a primary market. Our reach extends to other major Australian cities, too.</p><label htmlFor="area-suburb">Your suburb or address</label><input id="area-suburb" autoComplete="street-address" maxLength={300} placeholder="Where is your space?" value={context.suburb} onChange={event => setContext({ ...context, suburb: event.target.value })} /><a href="#quote" className="home-text-link">Add to my quote<ArrowUpRight size={18} aria-hidden="true" /></a><p className="home-small-note">Share your location so service coverage can be checked.</p></div></section>
      <section id="faq" className="home-section home-faq" aria-labelledby="faq-title"><div><h2 id="faq-title">A little<br /><em>clarity.</em></h2></div><div>{homepageFaq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section id="quote" className="home-section home-quote" aria-labelledby="quote-title"><div className="home-quote-intro"><h2 id="quote-title">Your space.<br /><em>Your next chapter.</em></h2><p>Tell us what you need.<br />Let’s start with a quote.</p><a className="home-email" href={COMMUNICATION.email.href}>{COMMUNICATION.email.address}</a><span className="home-quote-rule" aria-hidden="true" /></div><QuoteForm context={context} onChange={setContext} /></section>
      <section className="home-final" aria-labelledby="final-title"><h2 id="final-title">Come home<br />to <em>calm.</em></h2><a href="#quote" className="home-button home-button-light">Get a Quote<ArrowUpRight size={18} aria-hidden="true" /></a><p>A little less noise. A little more life.</p></section>
    </main>
    <HomeStickyQuote />
    <footer className="home-footer"><div className="home-footer-top"><Brand /><a className="home-email" href={COMMUNICATION.email.href}>{COMMUNICATION.email.address}</a></div><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#packages">Packages</a><a href="#coverage">Service areas</a><a href="#quote">Get a Quote</a><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a></nav><div className="home-footer-bottom"><span>© {new Date().getFullYear()} Cleaning Ninja</span><span>AUSTRALIA</span><span>Interior imagery is illustrative.</span></div></footer>
  </div>
}
