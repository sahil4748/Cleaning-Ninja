'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { homeServices } from '@/content/homepage'

/** One descriptive plane on desktop; the selected entry opens in place on touch. */
export default function ServiceIndex({ onQuote }: { onQuote: (service: string) => void }) {
  const [active, setActive] = useState(0)
  function explore(index: number) {
    setActive(index)
    if (window.matchMedia('(max-width: 767px)').matches) requestAnimationFrame(() => {
      document.getElementById('active-service-title')?.focus({ preventScroll: true })
      document.getElementById('active-service')?.scrollIntoView({ behavior: 'instant', block: 'nearest' })
    })
  }
  return <div className="home-service-system">
    <div className="home-service-index" aria-label="Select a service">
      {homeServices.map((service, index) => <div className="home-service-entry" key={service.slug}>
        <button className="home-service-trigger" aria-pressed={active === index} aria-controls={active === index ? 'active-service' : undefined}
          onPointerEnter={event => { if (event.pointerType === 'mouse' && window.matchMedia('(min-width: 768px)').matches) setActive(index) }}
          onClick={() => explore(index)}>
          <span>{String(index + 1).padStart(2, '0')}</span>{service.name}<ArrowUpRight size={18} aria-hidden="true" />
        </button>
        {active === index && <div id="active-service" className="home-service-feature">
          <span className="home-service-folio" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div className="home-service-caption">
            <p className="home-kicker">THE SERVICE INDEX / {String(index + 1).padStart(2, '0')}</p>
            <h3 id="active-service-title" tabIndex={-1}>{service.name}</h3>
            <p>{service.description}</p>
            <div className="home-service-actions"><button className="home-text-link" onClick={() => onQuote(service.slug)}>Quote this service<ArrowUpRight size={18} aria-hidden="true" /></button><a href={service.href}>Explore service</a></div>
          </div>
        </div>}
      </div>)}
    </div>
  </div>
}
