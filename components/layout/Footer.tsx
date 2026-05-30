import Link from 'next/link'
import Container from '@/components/ui/Container'
import Stack from '@/components/ui/Stack'
import Body from '@/components/ui/Body'
import Eyebrow from '@/components/ui/Eyebrow'
import Caption from '@/components/ui/Caption'
import Button from '@/components/ui/Button'
import {
  FOOTER_SERVICES,
  FOOTER_AREAS,
  FOOTER_COMPANY,
  FOOTER_LEGAL,
  BUSINESS,
} from '@/content/navigation'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal-deep text-cream">
      <div aria-hidden="true" className="h-px w-full bg-olive/40" />

      <Container width="wide">
        <div className="grid grid-cols-2 gap-y-12 py-20 md:grid-cols-12 md:gap-10 lg:py-28">
          <div className="col-span-2 md:col-span-4">
            <Stack gap="6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-olive">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 6h14M5 12h14M5 18h7" className="text-cream" />
                  </svg>
                </span>
                <span className="font-display text-[28px] font-bold leading-none tracking-[-0.02em] text-cream">
                  Cleaning <span className="text-olive">Ninja</span>
                </span>
              </div>
              <Body variant="body-l" className="text-cream/75" measure>
                Flat-rate cleans across Sydney, Melbourne, Brisbane, Perth, Adelaide and the Gold
                Coast. ABN-verified, fully insured, bond-back guaranteed.
              </Body>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button as={Link} href="/book" variant="primary-dark" size="md" data-magnetic>
                  See my price
                </Button>
                <Button as="a" href={`tel:${BUSINESS.phoneRaw}`} variant="secondary-dark" size="md">
                  {BUSINESS.phone}
                </Button>
              </div>
            </Stack>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <Stack gap="4">
              <Eyebrow tone="champagne" withRule>
                Services
              </Eyebrow>
              <ul className="flex flex-col gap-3">
                {FOOTER_SERVICES.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-[14px] text-cream/80 transition-colors duration-200 hover:text-olive"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Stack>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Stack gap="4">
              <Eyebrow tone="champagne" withRule>
                Areas
              </Eyebrow>
              <ul className="flex flex-col gap-3">
                {FOOTER_AREAS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-[14px] text-cream/80 transition-colors duration-200 hover:text-olive"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Stack>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Stack gap="4">
              <Eyebrow tone="champagne" withRule>
                Company
              </Eyebrow>
              <ul className="flex flex-col gap-3">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-[14px] text-cream/80 transition-colors duration-200 hover:text-olive"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Stack>
          </div>
        </div>

        {/* Trust band */}
        <div className="border-t border-border-dark py-8">
          <ul className="grid grid-cols-2 gap-3 text-[12px] text-cream/70 sm:grid-cols-3 md:grid-cols-5">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-cream/50 uppercase tracking-[0.12em]">ABN</span>
              <span className="font-mono text-cream">{BUSINESS.abn}</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="uppercase tracking-[0.12em] text-cream/50">Public Liability</span>
              <span className="text-cream">{BUSINESS.publicLiability} · {BUSINESS.insurer}</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="uppercase tracking-[0.12em] text-cream/50">Police-checked</span>
              <span className="text-cream">{BUSINESS.policeCheck}</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="uppercase tracking-[0.12em] text-cream/50">NDIS Provider</span>
              <span className="font-mono text-cream">{BUSINESS.ndisProvider}</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="uppercase tracking-[0.12em] text-cream/50">Rating</span>
              <span className="text-cream">{BUSINESS.rating}★ · {BUSINESS.reviewCount.toLocaleString('en-AU')} reviews</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-border-dark py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Caption className="text-cream/55">
              © {year} Cleaning Ninja. Six cities. All rights reserved.
            </Caption>
            <ul className="flex flex-wrap gap-4">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-[12px] text-cream/55 transition-colors duration-200 hover:text-olive"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
