# Existing design system

Source: `app/globals.css`, `components/ui/*`, `app/layout.tsx`. Existing implementation inventory; selected future typography is recorded below. No application changes in this decision update.

| Token | Existing value |
|---|---|
| cream | #F5F0E8 |
| olive | #6B7C3A |
| olive-deep | #4A5628 |
| charcoal | #2C2C2C |
| surface-muted | #EFE8DA |
| olive-soft / pale | #8B9C5A / #E8EEDF |
| container / gutters | 1440px; 16/24/80px |
| radius scale | 2/4/8/12px plus pill |
| display XXL | clamp(64px, 8vw, 120px) |

Tailwind v4 `@theme`, semantic surfaces, form states, type/radius/z-index tokens and CSS base layer. Legacy ink/bone/champagne/beige aliases point at the current palette. Many route pages override Heading sizing inline, weakening the token contract.

Plus Jakarta Sans display and Inter body loaded via next/font/google; JetBrains Mono only a fallback name, no shipped file found. Satoshi/Fraunces references are historical intentions/aliases, not installed fonts. UI primitives include Button, Heading, Body, Container, Section, Stack, Cluster, Accordion and labelled form controls.

Direction: preserve/refine olive; consolidate aliases and contrast only in a later authorized phase. Owner-selected typography (2026-09-23): **open-source first, Instrument Serif + Manrope**. Font roles, weights, scale and responsive usage await design validation; current application fonts remain as inventoried above. Exact future palette, spacing and components remain undecided. Older blueprint mandates conflict with the owner’s current direction.

Package prototype label (owner, 2026-09-23): **Selected Packages**. Discount messaging stays secondary until commercially locked; no live offer terms are approved.
