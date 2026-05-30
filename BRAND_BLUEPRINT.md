# Cleaning Ninja — Brand & Design Blueprint

**Status:** Locked. Phase 1 in progress.
**Supersedes:** `.agent/rules/01-brand-identity.md` through `06-technical-stack.md`, and `AGENTS.md` — those files are retained as historical reference only.

This document is the single source of truth for the Cleaning Ninja redesign. Any conflict between this file and an older document is resolved in favour of this file.

---

## 1. Positioning

**Brand promise:** *Cleaning, considered.* A higher standard, lightly worn — delivered with precision, restraint, and quiet excellence.

**One-line positioning:** In your home for an hour. Invisible by morning. Perfect by the time you notice.

**Audience:** Premium Australian homes and businesses across South-East Queensland (Brisbane, Gold Coast, Sunshine Coast at launch).

---

## 2. What "Ninja" means

| Quality | Expression in the brand |
| --- | --- |
| Precision | Tight, documented process. Explicit inclusions. Named techniques. |
| Stealth | We leave nothing behind. No streaks, no smell, no disruption. |
| Discipline | Identical uniforms. Identical reports. Identical standards. |
| Mastery | Specialist tools per surface. Fibre-specific care. |
| Restraint | Quiet palette. Quiet copy. No discount banners. |
| Speed | On time. Faster than expected. Response in hours. |
| Silent excellence | The work speaks. We don't ask for praise. |

### What "Ninja" must NEVER become

- Cartoon ninja mascots
- Throwing-star icons, swords, masks, samurai imagery
- "We strike fast!" / "Ninja-quick!" copy
- Black-and-red gamer aesthetics
- Bouncy, playful motion
- Manga/anime visual references
- Childish pun-based microcopy

---

## 3. Visual direction (LOCKED)

### Colour palette

Token names are the actual CSS custom properties defined in `app/globals.css` `@theme`.

| Token | Hex | Role |
| --- | --- | --- |
| `--color-ink` | `#0E1116` | Primary text, headlines on light surfaces |
| `--color-graphite` | `#1A1F26` | Primary dark surface (hero, footer, dark sections) |
| `--color-graphite-soft` | `#232A33` | Secondary dark surface, dark cards |
| `--color-bone` | `#F6F1E8` | Primary light surface |
| `--color-bone-soft` | `#EFE8DB` | Secondary light surface, light cards |
| `--color-ivory` | `#FBF8F2` | Page background (default body bg) |
| `--color-champagne` | `#C9A96A` | Brand accent — typographic only, NEVER primary CTAs |
| `--color-champagne-soft` | `#E2C895` | Champagne hover/active state |
| `--color-emerald-deep` | `#1F3A33` | Optional secondary accent |
| `--color-line` | `rgba(14,17,22,0.08)` | Dividers on light surface |
| `--color-line-dark` | `rgba(246,241,232,0.08)` | Dividers on dark surface |
| `--color-success` | `#3B6E55` | Form success only |
| `--color-warning` | `#8C6A2A` | Form warning only |
| `--color-error` | `#8C2A2A` | Form error only |

**Banned colours:**
- Teal, bright green, sky blue, royal navy, gold (the legacy navy/gold and olive/beige palettes are deprecated).
- Champagne is **never** used as a button background.

### Typography

| Role | Font | Weights | Notes |
| --- | --- | --- | --- |
| Display | Fraunces (variable serif) | 400, 500, 600 | H1–H2 + display pull-quotes only |
| Text | Inter (variable grotesk) | 400, 500, 600 | Everything else |

- Fonts loaded via `next/font/google` (no external CSS `@import`).
- All eyebrows: `0.14em` letter-spacing, uppercase, Inter 500, 12px.
- No drop shadows on type.
- No exclamation marks in editorial copy.
- No emoji in editorial copy.

### Motion

- Default duration: 400–500ms.
- Default easing: `--ease-out-long` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Reveals only — **no bounce, no spring, no overshoot, no infinite pulse, no auto-rotating carousels**.
- `prefers-reduced-motion` respected site-wide via `useReducedMotion()` in JS and the base rule in `globals.css`.

### Buttons

Variants (the only allowed variants):

- `primary-light` — ink bg on light surface
- `primary-dark` — bone bg on dark surface
- `secondary-light` — outlined ink on light
- `secondary-dark` — outlined bone on dark
- `quiet-link` — text with bottom border, inline editorial CTAs

Rules:
- No drop shadows. No gradients. No hover scale. No bouncy motion.
- Corner radius: 4px (`--radius-md`).
- Heights: 52px desktop / 48px mobile.

### Cards

- No drop shadows.
- 1px border + token-driven background contrast only.
- Light cards: `bg-bone-soft` + `border-line`.
- Dark cards: `bg-graphite-soft` + `border-line-dark`.
- Hover (when interactive): border colour shifts to `--color-champagne` — no lift, no scale.

### Forms

- Bottom-border-only inputs (1px line, thickens to 1.5px on focus).
- Labels above inputs in eyebrow style — never placeholder-only.
- Helper/error text below.
- Validate on blur (not on every keystroke).

---

## 4. Voice and content rules

### Australian English

- `colour`, `favourite`, `organise`, `optimise`, `behaviour`, `programme`, `centre`, `fibre`.
- Dates: `26 May 2026`, not `5/26/2026`.

### Words to use

Verbs: care for, restore, extract, refresh, prepare, treat, condition, seal, document, deliver, follow up, return, re-clean, complete, finish, schedule, confirm, attend.

Nouns: standard, method, equipment, technique, surface, fibre, finish, care, visit, programme, schedule, follow-up, response, range, home.

### Words banned in editorial copy

- `Premium` / `Professional` / `Expert` (as bare adjectives — show, don't claim).
- `Hospital-grade`, `Military-grade`, `Industrial-strength`.
- `Award-winning`, `Best in...`, `World-class`, `Cutting-edge`, `State-of-the-art`.
- `Cheap`, `Affordable`, `Budget`, `Discount`.
- `Limited time`, `Hurry`, `Only N left`, `Today only`.
- `Fair dinkum`, `No dramas`, `Legends`, `Mate`, `G'day` (in brand voice — slang acceptable inside real reviews only).
- `Eco-friendly` (without certification).
- `Trusted by thousands` / `5,000+ families` / any unsourced customer count.
- Exclamation marks in brand copy. Emoji in brand copy.

### Primary CTA

The single primary CTA across the site: **`Build My Quote`**. Consistent text, consistent placement, consistent variant.

### Review / claim rules

- No fabricated reviews. No fabricated platform attributions. No fabricated aggregate ratings.
- No fake business credentials (ABN, certifications, insurance values) until they are real.
- Trust strip claims must be either currently true OR phrased as a forward commitment.

---

## 5. Reviews handling (locked behaviour)

The `<ReviewsSection mode>` component (built in Phase 4) has three modes:

| Mode | When | What renders |
| --- | --- | --- |
| `live` | Real Google Business Profile / ProductReview reviews connected via API | Real review cards + source badge + aggregate rating |
| `static` | Client-provided reviews with recorded consent | Static cards, NO source badge, NO aggregate rating |
| `placeholder` | No real reviews exist yet | Editorial "Voices in progress" panel — no fake cards, no fake stars, no fake platform |

Mode is set via `NEXT_PUBLIC_REVIEWS_MODE` and is enforced at build time. Default at launch: `placeholder`.

---

## 6. Before & After handling (locked behaviour)

- Filterable gallery. Drag slider per tile (not a carousel).
- Image requirements: 4:3, identical lighting/framing/white balance.
- Designed placeholder tiles for services without real images yet. No stock substitution.
- Captions are descriptive only — no fabricated outcomes.

---

## 7. SEO architecture

- 6 service hubs (`/services/[slug]`).
- 3 city hubs (`/service-areas/[city]`).
- Programmatic `/services/[service]/[city]/[suburb]` pages — 35 suburbs × 3 priority services at launch.
- Schema markup: `Organization`, `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`.
- `AggregateRating` and `Review` schema only when real reviews are live.

---

## 8. Phase 1 deliverables (this phase)

1. Design tokens in `app/globals.css`.
2. Font setup via `next/font` in `app/layout.tsx`.
3. This file (`BRAND_BLUEPRINT.md`) and `.agent/rules/00-SUPERSEDED.md`.
4. Layout primitives — `Container`, `Section`, `Stack`, `Cluster`, `Divider`.
5. Typography primitives — `Eyebrow`, `Heading`, `Body`, `Caption`.
6. `Button` + `Card` rewrites with blueprint variants.
7. Form primitives — `Input`, `Select`, `Textarea`, `RadioCard`, `Checkbox`, `Accordion`.
8. Motion primitives — `MotionProvider`, `FadeUp`, `ScaleIn`, `Stagger`, `Parallax`.
9. `/__tokens` internal preview page (env-gated).
10. `scripts/check-banned-content.ts` banned-content scanner (warn-only in Phase 1).

Homepage is NOT redesigned in Phase 1. Legacy files are NOT deleted in Phase 1.

---

## 9. Out of scope for Phase 1

- Homepage section rebuild → Phase 2.
- Reviews and Before/After systems → Phase 3.
- Service page template → Phase 4.
- Quote flow → Phase 5.
- SEO routes (city, suburb, journal, legal) → Phase 6.
- Performance + motion polish → Phase 7.
- QA and launch → Phase 8.

---

## 10. Supersession

This document supersedes:

- `AGENTS.md` (root) — kept for history only.
- `.agent/rules/01-brand-identity.md`
- `.agent/rules/02-design-system.md`
- `.agent/rules/03-animation-specs.md`
- `.agent/rules/04-component-library.md`
- `.agent/rules/05-content-guidelines.md`
- `.agent/rules/06-technical-stack.md`

Those files are retained as historical context. They do not bind current work.
