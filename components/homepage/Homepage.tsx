'use client'

import { COMMUNICATION, FEATURES } from '@/content/features'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { approvedHomepageReviews, homeServices, homepageFaq, packages } from '@/content/homepage'
import HomeHeader, { Brand } from './HomeHeader'
import QuoteForm, { type QuoteContext } from './QuoteForm'
import NinjaMedia from './NinjaMedia'
import HomeStickyQuote from './HomeStickyQuote'

function Proof() {
  if (!FEATURES.reviews || !approvedHomepageReviews.length) return null
  return <section className="home-section home-proof" aria-labelledby="proof-title"><p className="home-eyebrow">IN THEIR WORDS</p><h2 id="proof-title">A little more calm.</h2>{approvedHomepageReviews.map(review => <figure key={review.id}><blockquote>{review.quote}</blockquote><figcaption><a href={review.sourceUrl}>{review.attribution}</a></figcaption></figure>)}</section>
}

export default function Homepage() {
  const [context, setContext] = useState<QuoteContext>({ service: '', suburb: '', packageName: '' })
  const [activeService, setActiveService] = useState(0)
  const rail = useRef<HTMLDivElement>(null)
  const signature = useRef<HTMLElement>(null)
  const [cut, setCut] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setCut(true); observer.disconnect() }
    }, { threshold: 0.3 })
    if (signature.current) observer.observe(signature.current)
    return () => observer.disconnect()
  }, [])
  function select(service: string, packageName = '') {
    setContext(previous => ({ ...previous, service, packageName }))
    document.getElementById('quote')?.scrollIntoView({ behavior: 'instant' })
    requestAnimationFrame(() => document.getElementById('quote-service')?.focus({ preventScroll: true }))
  }
  const service = homeServices[activeService]
  return <div className="home-prototype">
    <HomeHeader />
    <main id="home-main" tabIndex={-1}>
      <section className="home-hero home-hero-h01" aria-labelledby="hero-title">
        <NinjaMedia hero />
        <div className="home-hero-copy"><p className="home-eyebrow">CLEANING NINJA</p>
          <h1 id="hero-title">Bring your space<br />back to <em>calm.</em></h1>
          <p className="home-hero-description">Cleaning services across major Australian cities, with a simple quote-first process.</p>
          <a href="#quote" className="home-button h01-quote">Get a Quote<ArrowUpRight size={18} /></a>
        </div>
        <div className="home-hero-bottom"><span>A LITTLE LESS NOISE. A LITTLE MORE LIFE.</span><a href="#packages" aria-label="Explore selected packages"><ArrowDown size={20} /></a><span className="home-media-caption">Illustrative interior</span></div>
      </section>
      <section id="packages" className="home-section home-packages" aria-labelledby="packages-title">
        <div className="home-section-heading"><div><p className="home-eyebrow">01 / A PLACE TO START</p><h2 id="packages-title">Selected Packages</h2></div><div className="home-section-intro"><p>A few familiar spaces.<br />One simple starting point.</p><div className="home-rail-controls"><button className="home-icon-button" aria-label="Previous packages" onClick={() => rail.current?.scrollBy({ left: -rail.current.clientWidth * 0.7, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowLeft size={20} /></button><button className="home-icon-button" aria-label="Next packages" onClick={() => rail.current?.scrollBy({ left: rail.current.clientWidth * 0.7, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><ArrowRight size={20} /></button></div></div></div>
        <div ref={rail} className="home-package-rail" tabIndex={0} role="region" aria-label="Selected packages, scroll for more">
          {packages.map((item, index) => <article className="home-package" key={item.name}><div className={`home-package-image home-package-image-${index}`}><Image src={item.image} alt="Illustrative home interior" fill sizes="(max-width: 767px) 85vw, 38vw" /><span>0{index + 1}</span></div><div className="home-package-info"><h3>{item.name}</h3><p>{item.detail}</p><button onClick={() => select(item.service, item.name)}>Enquire about package<ArrowUpRight size={18} /></button></div></article>)}
        </div><p className="home-small-note">Quoted for your space. Pricing, inclusions and suitability confirmed on enquiry. Images are illustrative.</p>
      </section>
      <section id="services" className="home-section home-services" aria-labelledby="services-title">
        <div className="home-section-heading"><div><p className="home-eyebrow">02 / ROOM FOR EVERYDAY LIFE</p><h2 id="services-title">A fresh start,<br /><em>where you need it.</em></h2></div><p>Start with your space.<br />We’ll start with your enquiry.</p></div>
        <div className="home-service-desktop"><div className="home-service-index" aria-label="Select a service">{homeServices.map((item, index) => <button aria-pressed={index === activeService} aria-controls="active-service" onClick={() => setActiveService(index)} key={item.slug}><span>{String(index + 1).padStart(2, '0')}</span>{item.name}<ArrowUpRight size={18} /></button>)}</div>
          <div id="active-service" className="home-service-feature"><div className="home-service-photo"><Image src={service.image} alt="Illustrative interior, not a completed Cleaning Ninja job" fill sizes="55vw" /></div><div className="home-service-caption"><h3>{service.name}</h3><button className="home-text-link" onClick={() => select(service.slug)}>Quote this service<ArrowUpRight size={18} /></button><a href={service.href}>Explore service</a></div></div>
        </div>
        <div className="home-service-mobile">{homeServices.map((item, index) => <article key={item.slug}><div className="home-service-photo"><Image src={item.image} alt="Illustrative home interior" fill sizes="90vw" /></div><p className="home-eyebrow">{String(index + 1).padStart(2, '0')}</p><h3>{item.name}</h3><div><button className="home-text-link" onClick={() => select(item.slug)}>Quote this service<ArrowUpRight size={16} /></button><a href={item.href}>Explore</a></div></article>)}</div>
      </section>
      <section ref={signature} className={`home-signature ninja-cut ${cut ? 'is-resolved' : ''}`} aria-labelledby="signature-title">
        <NinjaMedia /><div className="home-signature-copy"><p className="home-eyebrow">THE NINJA CUT</p><h2 id="signature-title">Less noise.<br /><em>More room to breathe.</em></h2><p>A shift in perspective.<br />Back to the feeling of home.</p></div><span className="home-signature-note">AN ILLUSTRATIVE STUDY IN CALM</span>
      </section>
      <section className="home-section home-why" aria-labelledby="why-title"><div><p className="home-eyebrow">03 / THE CLEANING NINJA WAY</p><h2 id="why-title">A considered start.<br /><em>A clearer next step.</em></h2></div><div className="home-why-points"><article><span>01</span><h3>Your space comes first.</h3><p>Tell us what needs attention, in your own words.</p></article><article><span>02</span><h3>A quote before a commitment.</h3><p>Begin with an enquiry about scope and pricing.</p></article><article><span>03</span><h3>Room for your routine.</h3><p>Share a preferred time for your request. Availability is confirmed separately.</p></article></div></section>
      <section id="how-it-works" className="home-section home-how" aria-labelledby="how-title"><p className="home-eyebrow">04 / KEEP IT SIMPLE</p><h2 id="how-title">From your first hello.</h2><ol>{[['Tell us about your space', 'Choose a service and share your suburb and details.'], ['Discuss your quote', 'Confirm scope, pricing and whether your location can be serviced.'], ['Agree the next step', 'A booking and time are confirmed separately from your enquiry.']].map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
      <Proof />
      <section id="brisbane" className="home-section home-brisbane" aria-labelledby="brisbane-title"><div><p className="home-eyebrow"><MapPin size={15} /> BRISBANE / YOUR NEIGHBOURHOOD</p><h2 id="brisbane-title">A little closer<br /><em>to home.</em></h2></div><div><p>Brisbane is where we begin.<br />Tell us where your space is.</p><label htmlFor="area-suburb">Your suburb or address</label><input id="area-suburb" autoComplete="street-address" maxLength={300} placeholder="Enter your suburb or address" value={context.suburb} onChange={event => setContext({ ...context, suburb: event.target.value })} /><a href="#quote" className="home-text-link">Add to my quote<ArrowUpRight size={18} /></a><p className="home-small-note">Coverage is checked as part of your enquiry.</p></div></section>
      <section id="faq" className="home-section home-faq" aria-labelledby="faq-title"><div><p className="home-eyebrow">05 / GOOD TO KNOW</p><h2 id="faq-title">A little clarity.</h2></div><div>{homepageFaq.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section id="quote" className="home-section home-quote" aria-labelledby="quote-title"><div className="home-quote-intro"><p className="home-eyebrow">06 / YOUR RESET STARTS HERE</p><h2 id="quote-title">Tell us about<br /><em>your space.</em></h2><p>Just the essentials.<br />One form. A clearer starting point.</p><a className="home-email" href={COMMUNICATION.email.href}>{COMMUNICATION.email.address}</a></div><QuoteForm context={context} onChange={setContext} /></section>
      <section className="home-final" aria-labelledby="final-title"><p className="home-eyebrow">CLEANING NINJA · BRISBANE</p><h2 id="final-title">Come home to <em>calm.</em></h2><a href="#quote" className="home-button home-button-light">Get a Quote<ArrowUpRight size={18} /></a></section>
    </main>
    <HomeStickyQuote />
    <footer className="home-footer"><Brand /><p>A little less noise.<br />A little more life.</p><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#quote">Get a Quote</a><a href={COMMUNICATION.email.href}>Email us</a><a href="/legal/privacy">Privacy</a><a href="/legal/terms">Terms</a></nav><div className="home-footer-bottom"><span>© {new Date().getFullYear()} Cleaning Ninja</span><span>BRISBANE, AUSTRALIA</span></div></footer>
  </div>
}
