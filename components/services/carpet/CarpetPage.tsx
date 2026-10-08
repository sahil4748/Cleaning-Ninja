"use client";

import { ArrowDown, ArrowUpRight, Check, ChevronDown, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { offers, services } from "@/components/homepage/renewal/content";
import { getService } from "@/content/service-catalogue";
import { BUSINESS_CONFIG } from "@/content/business-config";
import Film from "./Film";
import QuoteForm from "./QuoteForm";
import { carpetCare, carpetMethods, carpetOverview } from "./content";
import { useCarpetMotion } from "./useCarpetMotion";
import "./carpet.css";

const defaultSelection = { service: "carpet-cleaning", serviceName: "Carpet cleaning", packageName: "" };

export default function CarpetPage() {
  const [selection, setSelection] = useState(defaultSelection);
  const [resetKey, setResetKey] = useState(0);
  const [sending, setSending] = useState(false);
  const [sticky, setSticky] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const opening = useRef<HTMLDivElement>(null);
  const quote = useRef<HTMLElement>(null);
  const [terms, setTerms] = useState(false);
  const motion = useCarpetMotion(opening);

  useEffect(() => {
    let heroVisible = true;
    let quoteVisible = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero.current) heroVisible = entry.isIntersecting;
        if (entry.target === quote.current) quoteVisible = entry.isIntersecting;
      });
      setSticky(!heroVisible && !quoteVisible);
    }, { threshold: 0.08 });
    if (hero.current) observer.observe(hero.current);
    if (quote.current) observer.observe(quote.current);
    return () => observer.disconnect();
  }, []);

  function requestQuote(offer?: typeof offers[number]) {
    if (sending) return;
    if (offer) setSelection({
      service: getService(offer.service)?.quoteEnabled ? offer.service : "carpet-cleaning",
      serviceName: services.find((service) => service.id === offer.service)?.name ?? "Carpet cleaning",
      packageName: offer.title,
    });
    setResetKey((value) => value + 1);
    const target = document.getElementById("cp-form-title");
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  return (
    <div className="cp-page">
      <a href="#cp-main" className="cp-skip">Skip to content</a>
      <header className="cp-nav">
        <Link href="/" prefetch={false} aria-label="Cleaning Ninja home" className="cp-logo"><Logo tone="light" height={40} /></Link>
        <nav aria-label="Main navigation"><Link href="/" prefetch={false}>Home</Link><Link href="/#services" prefetch={false}>Our services</Link></nav>
        <button type="button" className="cp-button cp-button-small" disabled={sending} onClick={() => requestQuote()}>Get a Free Quote <ArrowUpRight size={17} aria-hidden="true" /></button>
      </header>

      <main id="cp-main">
        <div className="cp-opening" ref={opening}>
        <section className="cp-hero" aria-labelledby="cp-title" ref={hero}>
          <Film mode={motion.mode} active={motion.active} onToggle={motion.toggle} />
          <div className="cp-hero-shade" aria-hidden="true" />
          <div className="cp-breadcrumb"><Link href="/" prefetch={false}>Home</Link><span aria-hidden="true">/</span><span>Carpet cleaning</span></div>
          <div className="cp-hero-message">
            <p className="cp-hero-eyebrow">Professional carpet care</p>
            <h1 id="cp-title"><span>Carpet</span><em>cleaning.</em></h1>
            <p className="cp-hero-summary">Steam cleaning. Stain treatment.<br />{" "}Carpet care.</p>
            <button type="button" className="cp-button cp-hero-quote" disabled={sending} onClick={() => requestQuote()}>Get a Free Quote <ArrowUpRight size={20} aria-hidden="true" /></button>
          </div>
          <a className="cp-scroll-cue" href="#cp-offers" aria-label="Explore carpet cleaning offers and care">
            <span className="cp-scroll-copy">Explore the care<span>Offers, methods &amp; a fresh start</span></span>
            <span className="cp-scroll-arrow" aria-hidden="true"><ArrowDown size={23} strokeWidth={1.5} /></span>
          </a>
        </section>
        </div>

        <section id="cp-offers" className="cp-offers cp-section" aria-labelledby="cp-offers-title">
          <div className="cp-section-head"><h2 id="cp-offers-title">Special <em>offers.</em></h2><p>Up to <strong>30% off</strong><br />selected packages.</p></div>
          <div className="cp-offer-grid">
            {offers.map((offer, index) => <article className={`cp-offer${index < 2 ? " cp-offer-carpet" : ""}`} key={offer.id}>
              <h3>{offer.title}{index < 2 && <span>carpet cleaning</span>}</h3>
              <ul>{offer.includes.map((item) => <li key={item}><Check size={13} aria-hidden="true" />{item}</li>)}</ul>
              <button type="button" disabled={sending} onClick={() => requestQuote(offer)} aria-label={`Get a Free Quote for ${offer.title}`}>Get a Free Quote <ArrowUpRight size={18} aria-hidden="true" /></button>
            </article>)}
          </div>
          <div className="cp-offer-note"><p>Tailored pricing, confirmed with your quote.</p><button type="button" onClick={() => setTerms((value) => !value)} aria-expanded={terms} aria-controls="cp-offer-terms">Offer conditions <ChevronDown size={15} aria-hidden="true" /></button></div>
          <div id="cp-offer-terms" className="cp-offer-terms" hidden={!terms}>
            <p>{offers[0].terms}</p><p>Rugs larger than 12 m² may require a revised quote. Fabric and leather treatments depend on the material and condition.</p>
          </div>
        </section>

        <section className="cp-overview cp-section" aria-labelledby="cp-overview-title">
          <h2 id="cp-overview-title">A fresh start<br /><em>underfoot.</em></h2>
          <div><p className="cp-overview-copy">{carpetOverview}</p><a className="cp-text-link" href="#cp-methods">Explore the cleaning methods <ArrowDown size={17} aria-hidden="true" /></a></div>
        </section>

        <section id="cp-methods" className="cp-method-section cp-section" aria-labelledby="cp-methods-title">
          <figure className="cp-method-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/carpet-cleaning/poster-mobile.webp" alt="Close view of an extraction wand making a careful pass over carpet" width="720" height="1280" loading="lazy" decoding="async" />
            <figcaption>Care in every pass.</figcaption>
          </figure>
          <div className="cp-method-copy"><h2 id="cp-methods-title">The right care.<br /><em>For your carpet.</em></h2>
            <div className="cp-methods">{carpetMethods.map((method, index) => <details key={method.title} open={index === 0}>
              <summary>{method.title}<span aria-hidden="true" className="cp-plus" /></summary><p>{method.text}</p>
            </details>)}</div>
          </div>
        </section>

        <section className="cp-care cp-section" aria-labelledby="cp-care-title">
          <h2 id="cp-care-title">Care starts with<br /><em>understanding.</em></h2>
          <ul>{carpetCare.map((item) => <li key={item}><Check size={20} strokeWidth={1.5} aria-hidden="true" /><span>{item}</span></li>)}</ul>
        </section>

        <section id="quote" className="cp-quote cp-section" aria-labelledby="cp-quote-title" ref={quote}>
          <div className="cp-quote-intro"><h2 id="cp-quote-title">Get a<br /><em>Free Quote.</em></h2>
            <p>Tell us about your rooms, carpet and areas of concern.</p>
            <a href={`mailto:${BUSINESS_CONFIG.primaryEmail}`} className="cp-contact"><Mail size={18} aria-hidden="true" />{BUSINESS_CONFIG.primaryEmail}</a>
            <p className="cp-quote-note">Your request starts a conversation. Scope, price and any appointment are confirmed with you.</p>
          </div>
          <QuoteForm selection={selection} onReset={() => setSelection(defaultSelection)} resetKey={resetKey} onBusyChange={setSending} />
        </section>
      </main>

      <footer className="cp-footer">
        <div className="cp-footer-main"><Link href="/" prefetch={false} aria-label="Cleaning Ninja home"><Logo tone="dark" height={44} /></Link><p>Order, restored.<br />Room for living.</p><a href={`mailto:${BUSINESS_CONFIG.primaryEmail}`}>{BUSINESS_CONFIG.primaryEmail}<ArrowUpRight size={16} aria-hidden="true" /></a></div>
        <div className="cp-footer-bottom"><span>© {new Date().getFullYear()} Cleaning Ninja</span><nav aria-label="Footer navigation"><Link href="/legal/privacy" prefetch={false}>Privacy</Link><Link href="/legal/terms" prefetch={false}>Terms</Link><Link href="/#services" prefetch={false}>All services</Link></nav></div>
      </footer>
      <div className="cp-sticky" hidden={!sticky}><button type="button" className="cp-button" disabled={sending} onClick={() => requestQuote()}>Get a Free Quote<ArrowUpRight size={19} aria-hidden="true" /></button></div>
    </div>
  );
}
