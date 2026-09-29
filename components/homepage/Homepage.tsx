'use client'

import Image from 'next/image'
import { COMMUNICATION, FEATURES } from '@/content/features'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { approvedHomepageReviews, homepageFaq, packages } from '@/content/homepage'
import HomeHeader, { Brand } from './HomeHeader'
import QuoteForm, { type QuoteContext } from './QuoteForm'
import HomeStickyQuote from './HomeStickyQuote'
import HomepageHero from './HomepageHero'
import ServiceIndex from './ServiceIndex'
import './homepage-finish.css'

function Proof() {
  return <aside id="proof" className="home-proof" aria-labelledby="proof-title">
    {FEATURES.reviews && approvedHomepageReviews.length ? <><h3 id="proof-title">In their words.</h3>{approvedHomepageReviews.map(review => <figure key={review.id}><blockquote>{review.quote}</blockquote><figcaption><a href={review.sourceUrl}>{review.attribution}</a></figcaption></figure>)}</> : <>
      <h3 id="proof-title">Clarity before commitment.</h3>
      <p>Your enquiry starts the conversation. Scope, pricing and availability are confirmed separately.</p>
      <a href={COMMUNICATION.email.href} className="home-text-link">Talk to Cleaning Ninja<ArrowUpRight size={18} aria-hidden="true" /></a>
    </>}
  </aside>
}

export default function Homepage() {
  const [context, setContext] = useState<QuoteContext>({ service: '', suburb: '', packageName: '' })
  const signature = useRef<HTMLElement>(null)
  useEffect(() => {
    const section = signature.current!
    section.dataset.cutState = 'waiting'
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { section.dataset.cutState = 'running'; observer.disconnect() }
    }, { threshold: 0.25 })
    if (signature.current) observer.observe(signature.current)
    return () => observer.disconnect()
  }, [])
  function select(service: string, packageName = '') {
    setContext(previous => ({ ...previous, service, packageName }))
    document.getElementById('quote')?.scrollIntoView({ behavior: 'instant' })
    requestAnimationFrame(() => document.getElementById('quote-service')?.focus({ preventScroll: true }))
  }
  return <div className="home-prototype home-candidate" data-hero-design="service-led">
    <HomeHeader />
    <main id="home-main" tabIndex={-1}>
      <HomepageHero />
      <div className="home-editorial-body">
        <section id="packages" className="home-section home-packages" aria-labelledby="packages-title">
          <div className="home-package-heading"><h2 id="packages-title">Selected <em>packages.</em></h2><p>Useful starting points.<br />A quote shaped around your space.</p></div>
          <div className="home-package-index">{packages.map((item, index) => <article className="home-package" key={item.id}>
            <span className="home-index-number" aria-hidden="true">0{index + 1}</span><div className="home-package-photo"><Image src={item.image} alt="" width={1280} height={1600} sizes="(max-width: 767px) calc(100vw - 48px), 22vw" /></div><div className="home-package-copy"><h3>{item.name}</h3><p>{item.detail}</p></div>
            <button aria-label={`Enquire about ${item.name}`} onClick={() => select(item.service, item.name)}><span>Enquire</span><ArrowUpRight size={24} aria-hidden="true" /></button>
          </article>)}</div>
          <p className="home-small-note">Pricing, inclusions and suitability confirmed on enquiry.</p>
        </section>
        <section id="services" className="home-section home-services" aria-labelledby="services-title">
          <div className="home-service-heading"><h2 id="services-title">Every space.<br /><em>Its own starting point.</em></h2><p className="home-kicker">TEN SERVICES<br /> SELECT TO EXPLORE ↓</p></div>
          <ServiceIndex onQuote={select} />
        </section>
        <section ref={signature} id="ninja-cut" className="home-signature is-resolved" aria-labelledby="signature-title">
          <div className="home-cut-architecture" aria-hidden="true"><div className="home-cut-noise"><span>Less.</span><span>Less.</span><span>Less.</span></div><div className="home-cut-plane" /></div>
          <div className="home-signature-copy"><span className="home-kicker">THE NINJA CUT</span><h2 id="signature-title"><span>Less noise.</span><em>More calm.</em></h2><p>A little less noise.<br />A little more room to breathe.</p></div>
          <div className="home-cut-baseline" aria-hidden="true"><span>01 — 02</span><span>A CHANGE OF PACE</span></div>
        </section>
        <section id="why" className="home-section home-journey" aria-labelledby="why-title">
          <div className="home-journey-intro"><p className="home-kicker">THE CLEANING NINJA APPROACH</p><h2 id="why-title">Your space first.<br /><em>Then a clear plan.</em></h2><p>A direct enquiry. A quote before commitment.<br />A considered next step.</p></div>
          <div id="how-it-works" className="home-process" aria-label="How it works"><ol>{[['Tell us what you need', 'Choose a service. Share your suburb and a few details about your space.'], ['Receive a quote / next step', 'Discuss scope, pricing and whether your location can be serviced.'], ['Arrange the service', 'Agree the details and a suitable time. Booking is confirmed separately.']].map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></div>
          <Proof />
        </section>
      </div>
      <div className="home-finale">
        <section id="coverage" className="home-section home-coverage" aria-labelledby="coverage-title">
          <p className="home-kicker">OUR REACH / AUSTRALIA</p><h2 id="coverage-title">Major cities.<br /><em>Your corner of the world.</em></h2>
          <div className="home-coverage-bottom"><p>Brisbane is a primary market.<br />Our reach extends to other major Australian cities, too.</p><div><label htmlFor="area-suburb">Your suburb or address</label><div className="home-area-field"><input id="area-suburb" autoComplete="street-address" maxLength={300} placeholder="Where is your space?" value={context.suburb} onChange={event => setContext({ ...context, suburb: event.target.value })} /><a href="#quote" aria-label="Add to my quote"><ArrowUpRight size={24} aria-hidden="true" /></a></div><p className="home-small-note">Share your location so service coverage can be checked.</p></div></div>
        </section>
        <section id="faq" className="home-section home-faq" aria-labelledby="faq-title"><h2 id="faq-title">A little clarity.</h2><div>{homepageFaq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
        <section id="quote" className="home-section home-quote" aria-labelledby="quote-title"><div className="home-quote-intro"><p className="home-kicker">THE NEXT CHAPTER</p><h2 id="quote-title">Let’s make<br /><em>room for calm.</em></h2><p>Tell us what you need.<br />Let’s start with a quote.</p><a className="home-email" href={COMMUNICATION.email.href}>{COMMUNICATION.email.address}</a><span className="home-quote-rule" aria-hidden="true">↗</span></div><QuoteForm context={context} onChange={setContext} /></section>
        <div className="home-final"><p>Come home to <em>calm.</em></p><a href="#quote" aria-label="Back to quote">YOUR NEXT CHAPTER<ArrowUpRight size={22} aria-hidden="true" /></a></div>
      </div>
    </main>
    <HomeStickyQuote />
    <footer className="home-footer"><div className="home-footer-top"><Brand /><a className="home-email" href={COMMUNICATION.email.href}>{COMMUNICATION.email.address}</a></div><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#packages">Packages</a><a href="#coverage">Service areas</a><a href="#quote">Get a Quote</a><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a></nav><div className="home-footer-bottom"><span>© {new Date().getFullYear()} Cleaning Ninja</span><span>AUSTRALIA</span><span>Interior imagery is illustrative.</span></div></footer>
  </div>
}
