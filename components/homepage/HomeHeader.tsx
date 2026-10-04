'use client'

import { COMMUNICATION } from '@/content/features'
import { Logo } from '@/components/brand/Logo'
import Link from 'next/link'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Menu, MessageCircle, X, ArrowUpRight } from 'lucide-react'

const links = [['Services', '#services'], ['Packages', '#packages'], ['How It Works', '#how-it-works'], ['Service Areas', '#coverage'], ['FAQ', '#faq']]

export function Brand() {
  return <Link href="/" className="home-brand" aria-label="Cleaning Ninja home">
    <Logo tone="light" height={44} />
  </Link>
}

function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return
  const elements = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex="0"]')
  const first = elements[0]
  const last = elements[elements.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}

export default function HomeHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY >= 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const call = useRef<HTMLDialogElement>(null)
  const menu = useRef<HTMLDialogElement>(null)
  return <>
    <a href="#home-main" className="home-skip">Skip to content</a>
    <header className="home-header" data-scrolled={scrolled}>
      <Brand />
      <nav aria-label="Main navigation" className="home-desktop-nav">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="home-header-actions">
        <button className="home-icon-button" aria-label="Call and communication options" aria-haspopup="dialog" onClick={event => { event.currentTarget.focus({ preventScroll: true }); call.current?.showModal() }}><MessageCircle size={19} /></button>
        <a href="#quote" className="home-button home-header-quote"><span className="home-quote-long">Get a Quote</span><span className="home-quote-short">Get Quote</span><ArrowUpRight size={16} /></a>
        <button className="home-icon-button home-menu-trigger" aria-label="Open menu" aria-haspopup="dialog" onClick={event => { event.currentTarget.focus({ preventScroll: true }); menu.current?.showModal() }}><Menu size={21} /></button>
      </div>
    </header>
    <dialog onKeyDown={trapDialogFocus} ref={call} className="home-dialog home-call-sheet" aria-labelledby="call-title" onClick={event => { if (event.target === event.currentTarget) call.current?.close() }}>
      <div className="home-dialog-inner">
        <button autoFocus className="home-icon-button home-dialog-close" aria-label="Close communication options" onClick={() => call.current?.close()}><X /></button>
        <p className="home-eyebrow">LET’S TALK</p><h2 id="call-title">Talk to Cleaning Ninja</h2>
        <p>{COMMUNICATION.phone.href ? <a href={COMMUNICATION.phone.href}>Call Cleaning Ninja</a> : 'Tell us what you need through our quote form or email us directly.'}</p>
        <a href="#quote" className="home-button" onClick={() => call.current?.close()}>Get a Quote <ArrowUpRight size={16} /></a>
        <a className="home-email" href={COMMUNICATION.email.href}>{COMMUNICATION.email.address}</a>
      </div>
    </dialog>
    <dialog onKeyDown={trapDialogFocus} ref={menu} className="home-dialog home-menu-sheet" aria-labelledby="menu-title">
      <div className="home-dialog-inner"><button autoFocus className="home-icon-button home-dialog-close" aria-label="Close menu" onClick={() => menu.current?.close()}><X /></button>
        <p className="home-eyebrow" id="menu-title">EXPLORE CLEANING NINJA</p>
        <nav aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => menu.current?.close()}>{label}<ArrowUpRight size={20} /></a>)}</nav>
      </div>
    </dialog>
  </>
}
