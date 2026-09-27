'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

/** Homepage-only entry; hidden until the original CTA has passed the header. */
export default function HomeStickyQuote() {
  const [pastHero, setPastHero] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.home-hero .h01-quote')
    const form = document.getElementById('quote')
    const heroObserver = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom <= 72)
    }, { rootMargin: '-72px 0px 0px 0px' })
    const formObserver = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting))
    if (hero) heroObserver.observe(hero)
    if (form) formObserver.observe(form)
    const viewport = window.visualViewport
    const resize = () => setKeyboardOpen(Boolean(viewport && viewport.height < window.innerHeight * .8))
    viewport?.addEventListener('resize', resize)
    return () => {
      heroObserver.disconnect()
      formObserver.disconnect()
      viewport?.removeEventListener('resize', resize)
    }
  }, [])
  return <a href="#quote" className="home-button home-sticky-quote" hidden={!pastHero || formVisible || keyboardOpen}>Get a Quote<ArrowUpRight size={18} /></a>
}
