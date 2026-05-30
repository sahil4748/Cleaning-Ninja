# Cleaning Ninja Structural Audit

> **Audit date:** 2026-05-30
> **Auditor scope:** Pre-refactor structural verification of the Next.js 16 / React 19 / Tailwind v4 codebase.
> **Project root audited:** `C:\Users\Sahil_Khan\Downloads\Cleaning-Ninja-main\Cleaning-Ninja-main` (the *nested* folder — the outer folder is just a wrapper containing `research/` and a duplicate copy).
>
> ### ⚠️ Headline finding — READ FIRST
> **The audit brief you were handed is stale.** It describes a pre-refactor state that no longer exists. Almost every "known bug" in the brief has **already been fixed** in the current tree, and several files/dependencies the brief assumes (`swiper`, `react-hot-toast`, `react-intersection-observer`, `lib/constants.ts`, `TrustBar.tsx`, `QuoteFormSection.tsx`, `NinjaClubRedesign.tsx`, `FloatingCTA.tsx`, `src/`) **do not exist in this repo at all.**
>
> This document reports **verified reality**, not the brief's assumptions. Each claim below was checked against source.

---

## 1. Confirmed Critical Bugs

**Net result: 0 of the 5 reported "known bugs" are still present. All were already remediated.** Details with proof:

| # | Reported bug | Verdict | Evidence |
|---|---|---|---|
| 3.1 | `BeforeAfter.tsx` ~line 105 has hardcoded `w-[400px] sm:w-[500px]…` on the before-image layer | ❌ **NOT PRESENT (already fixed)** | [`BeforeAfter.tsx:140-145`](components/sections/home/BeforeAfter.tsx#L140) now uses a full-bleed layer revealed via `clipPath: inset(0 ${100 - position}% 0 0)`. An inline code comment even documents the fix: *"Fixes the audit bug where the inner div used hard pixel widths that broke at lg:grid-cols-4."* No pixel widths remain. |
| 3.2 | `Container.tsx` defines `wide = 1440px` but uses `max-w-7xl` (1280px) | ❌ **NOT PRESENT** | [`Container.tsx:20-26`](components/ui/Container.tsx#L20): `wide` correctly maps to `max-w-[1440px]`. `max-w-7xl` is only used by the **`editorial`** variant (the default), where 1280px is intended. The token and the class agree. |
| 3.3 | `Header.tsx` uses its own `max-w-[1440px]` instead of `Container`, causing misalignment | ⚠️ **PARTIALLY TRUE, but NOT a bug** | [`Header.tsx:37`](components/layout/Header.tsx#L37) does use a bare `max-w-[1440px]` div rather than `<Container width="wide">`. **However, the values are identical**: same `max-w-[1440px]` and same padding ramp `px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20` as the `wide` container. There is **no misalignment**. This is a cosmetic DRY/consistency nit, not a layout defect. |
| 3.4 | `Tilt.tsx` lacks a `(hover: hover)` / `matchMedia` touch guard | ❌ **NOT PRESENT (already fixed)** | [`Tilt.tsx:41`](components/ui/Tilt.tsx#L41): `window.matchMedia('(hover: hover) and (pointer: fine)').matches` gates tilt, **plus** a `prefers-reduced-motion` guard and a `disabled` prop. Touch devices get a flat card. |
| 3.5 | Sections break the design system with `!text-[…]` overrides on `Heading` | ✅ **CONFIRMED — this one is real** | See §4. The `Heading` primitive explicitly forbids this ([`Heading.tsx:29`](components/ui/Heading.tsx#L29) — *"sections must not !text-[] override"*), yet ~20 files do exactly that. This is the **one genuine design-system defect** the brief flagged. |

**Bottom line for Phase A:** there is no urgent rendering/layout bug to fix before writing new code. The only legitimate cleanup target in this section is the systemic `!text-[…]` override pattern (§4), which is a refactor-quality issue, not a breakage.

---

## 2. Dead Dependencies (Safe to Uninstall)

The brief asked about `swiper`, `react-hot-toast`, `react-intersection-observer` — **none of these are in `package.json`**, so there is nothing to uninstall for them. They were never installed.

The **actual** dead dependencies (declared in [`package.json`](package.json) but with **zero imports** anywhere in `app/`, `components/`, or `lib/`):

| Package | Status | Proof |
|---|---|---|
| `three` (`^0.171.0`) | 🗑️ **DEAD** | No `from 'three'` / `import * as THREE` anywhere in source. The "canvas" sections ([`HeroCanvas.tsx`](components/sections/home/HeroCanvas.tsx), [`GrimeToGleam.tsx`](components/sections/home/GrimeToGleam.tsx)) use the 2D Canvas API, not three.js. |
| `@types/three` (`^0.171.0`) | 🗑️ **DEAD** | Type package for the above unused `three`. Remove together. |
| `@lottiefiles/dotlottie-react` (`^0.13.0`) | 🗑️ **DEAD** | No `lottie` / `dotlottie` import anywhere in source. |

**All other declared dependencies are live** — verified in use: `@gsap/react` ([PinnedScroll.tsx:3](components/motion/PinnedScroll.tsx#L3)), `gsap`, `lenis`, `framer-motion`, `react-hook-form`, `@hookform/resolvers`, `zod`, `clsx`, `tailwind-merge`, `lucide-react`, `next`, `react`, `react-dom`, plus the build chain (`tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`, `typescript`, `@types/node`, `@types/react`). Dev deps `@playwright/test`, `prettier`, `prettier-plugin-tailwindcss`, `tsx` are all wired to scripts/config.

---

## 3. Orphaned Files (Safe to Delete)

The brief's four named orphan candidates (`TrustBar.tsx`, `QuoteFormSection.tsx`, `NinjaClubRedesign.tsx`, `FloatingCTA.tsx`) **do not exist** in this repo. The **actual** orphans (file exists, exports a component, but is imported by nothing — verified by grepping every `@/components/...` and relative import):

| File | Why it's orphaned |
|---|---|
| [`components/ui/Card.tsx`](components/ui/Card.tsx) | Defined + exported; never imported. (The only "Card" hits in source are an unrelated copy string and a comment.) |
| [`components/ui/Checkbox.tsx`](components/ui/Checkbox.tsx) | Form primitive; never imported. Booking/contact/careers forms use `Input`/`Select`/`Textarea` only. |
| [`components/ui/Divider.tsx`](components/ui/Divider.tsx) | Never imported. (BeforeAfter's "Vertical Divider Line" is hand-rolled, not this component.) |
| [`components/ui/RadioCard.tsx`](components/ui/RadioCard.tsx) | Never imported. |
| [`components/motion/ScaleIn.tsx`](components/motion/ScaleIn.tsx) | Motion wrapper; never imported. |
| [`components/sections/home/Journal.tsx`](components/sections/home/Journal.tsx) | A homepage "Journal" section that is **not** in [`app/page.tsx`](app/page.tsx)'s 13-section sequence and is imported nowhere. The `/journal` route uses `content/journal.ts` directly, not this component. |

**Not orphaned (verified live, despite not appearing in `page.tsx`):**
- `HeroCanvas.tsx` → imported by [`Hero.tsx:13`](components/sections/home/Hero.tsx#L13).
- `GrimeToGleam.tsx` → lazy-loaded via `dynamic()` in [`OurStandard.tsx:21`](components/sections/home/OurStandard.tsx#L21).
- `gsap-core.ts` → imported by [`PinnedScroll.tsx:5`](components/motion/PinnedScroll.tsx#L5).
- All other `home/` sections, all `motion/` providers, `seo/JsonLd`, and the remaining `ui/` primitives are imported.

> ⚠️ **Judgment call:** the four `ui/` orphans (`Card`, `Checkbox`, `Divider`, `RadioCard`) are *design-system primitives*. They may be intentionally kept as a component-library surface for upcoming pages (the booking flow could plausibly want `RadioCard`/`Checkbox`). **Deleting them is safe today** but consider whether Phase A introduces forms that should *adopt* them instead. `Journal.tsx` and `ScaleIn.tsx` have no such future-use argument — delete with confidence.

---

## 4. Design System Drift

### 4a. `!text-[…]` overrides on `Heading` — the real systemic issue
The [`Heading`](components/ui/Heading.tsx) primitive is the single source of truth for type sizing (clamp-driven CSS vars), and its own header comment states *"sections must not `!text-[]` override."* **This contract is violated in ~20 files.** Representative offenders (file → line):

- Page heroes (a copy-pasted pattern repeated across nearly every route):
  - [`app/services/page.tsx:78`](app/services/page.tsx#L78) `!text-[44px] sm:!text-[56px] lg:!text-[68px]`
  - [`app/about/page.tsx:98`](app/about/page.tsx#L98), [`app/contact/page.tsx:75`](app/contact/page.tsx#L75), [`app/careers/page.tsx:101`](app/careers/page.tsx#L101), [`app/pricing/page.tsx:111`](app/pricing/page.tsx#L111), [`app/reviews/page.tsx:79`](app/reviews/page.tsx#L79), [`app/gallery/page.tsx:70`](app/gallery/page.tsx#L70), [`app/journal/page.tsx:74`](app/journal/page.tsx#L74), [`app/team/page.tsx:71`](app/team/page.tsx#L71), [`app/book/page.tsx:53`](app/book/page.tsx#L53)
  - [`app/service-areas/page.tsx:79`](app/service-areas/page.tsx#L79) + `[city]/page.tsx:119` + `[city]/[suburb]/page.tsx:137`
  - [`app/legal/LegalLayout.tsx:70`](app/legal/LegalLayout.tsx#L70), [`app/journal/[slug]/page.tsx:98`](app/journal/[slug]/page.tsx#L98)
- Section-level:
  - [`components/sections/service/ServiceDetail.tsx`](components/sections/service/ServiceDetail.tsx) — lines 91, 102, 441, 560 (multiple sizes)
  - [`components/sections/home/Journal.tsx`](components/sections/home/Journal.tsx) — lines 65, 74, 119 (and this file is itself orphaned, §3)
  - [`components/sections/NotFoundContent.tsx:87`](components/sections/NotFoundContent.tsx#L87)
- Body copy also bypasses the `Body` scale with `!text-[17px] sm:!text-[19px]` sub-headers in every page hero listed above.

**Impact:** the responsive `clamp()` type scale in [`globals.css:100-105`](app/globals.css#L100) is effectively dead for headings — sizes are re-hardcoded per page, so the design system can't be tuned centrally. **This is the highest-value refactor target.** Recommended fix: add the missing display variants to `Heading` (or map these page-hero sizes to `display-xl`/`display-lg`) and strip the `!text-[…]` classes.

### 4b. Public assets — present, but not the names the brief assumed
The brief asked for `favicon.ico`, `apple-touch-icon.png`, `og-image.jpg`. **None of those exact files exist** — and that's fine, because the app references **SVG** equivalents, which DO exist and DO match the code:

| Referenced in `layout.tsx` | File on disk | Status |
|---|---|---|
| `/favicon.svg` ([layout.tsx:58-61](app/layout.tsx#L58)) | `public/favicon.svg` | ✅ exists |
| `/og-image.svg` ([layout.tsx:73-85](app/layout.tsx#L73)) | `public/og-image.svg` | ✅ exists |
| `apple` icon → `/favicon.svg` | (reuses favicon.svg) | ✅ resolves |

- **No broken asset references.** Every icon/OG URL in metadata points to a file that exists.
- `public/images/` exists but is **empty** — harmless, but a candidate for removal or population. All gallery/before-after imagery is loaded from remote hosts (Pexels), not local.
- Minor SEO note (not a break): the OG image is an SVG. Some social scrapers (older Facebook/LinkedIn crawlers) don't render SVG OG images — consider exporting a 1200×630 PNG/JPG for `og-image` before launch. Not a Phase-A blocker.

### 4c. Design tokens (for reference) — `app/globals.css` `@theme` block
- **Colors:** `--color-cream #F5F0E8`, `--color-olive #6B7C3A`, `--color-olive-deep #4A5628`, `--color-charcoal #2C2C2C`, plus semantic surfaces (`surface`, `surface-muted`, `text`, `text-inverse`, `primary`, `border*`), charcoal/olive variants, form semantics (`success/warning/error`), and a large block of **legacy aliases** (`ink`, `graphite`, `bone`, `ivory`, `champagne`, `emerald-deep`, `olive-50…900`, `beige-50…900`) remapped onto the locked 4-color palette. The legacy aliases are themselves a cleanup candidate once consumers are migrated.
- **Typography tokens:** `--font-display` (Plus Jakarta Sans, drop-in for Satoshi), `--font-body` (Inter), `--font-mono`; legacy `--font-fraunces` aliased to display. Type scale: `--type-display-xxl/xl/lg-size`, `--type-h1/h2/h3-size`, all `clamp()`-based ([globals.css:100-105](app/globals.css#L100)) — **the scale that §4a's overrides bypass.**
- Also defined: radius scale, z-index scale, motion easings/durations, container/gutter tokens (`--container-max: 1440px`).

### 4d. `next.config.js` image domains
[`next.config.js`](next.config.js) whitelists three `remotePatterns`: `images.unsplash.com`, `media.giphy.com`, `images.pexels.com`. **Only `images.pexels.com` is actually used** (e.g. [`BeforeAfter.tsx:46`](components/sections/home/BeforeAfter.tsx#L46)). `unsplash` and `giphy` appear to be unused leftovers — safe to remove to tighten the allowlist (low priority).

---

## 5. Current Route Map

Single root layout (`app/layout.tsx`) — **no nested layouts.** All routes are substantively implemented (real content/forms); **no empty or stub `page.tsx` files were found.** `LegalLayout.tsx`, `BookingFlow.tsx`, `ContactForm.tsx`, `ApplicationForm.tsx`, `GalleryGrid.tsx`, `ReviewsWall.tsx`, `PricingMatrices.tsx`, `TeamGrid.tsx` are **client components co-located with routes**, not routes themselves.

```
app/
├─ layout.tsx                 ← root layout (Header/Footer/MobileStickyCta + providers)
├─ page.tsx                   → /                      (13-section homepage)
├─ not-found.tsx              → 404                     (renders NotFoundContent)
├─ robots.ts                  → /robots.txt            (special route)
├─ sitemap.ts                 → /sitemap.xml           (special route)
├─ api/
│  └─ quote/route.ts          → POST /api/quote        (API route handler)
├─ about/page.tsx             → /about
├─ book/
│  ├─ page.tsx                → /book
│  └─ BookingFlow.tsx         (client component)
├─ careers/
│  ├─ page.tsx                → /careers
│  └─ ApplicationForm.tsx     (client component)
├─ contact/
│  ├─ page.tsx                → /contact
│  └─ ContactForm.tsx         (client component)
├─ gallery/
│  ├─ page.tsx                → /gallery
│  └─ GalleryGrid.tsx         (client component)
├─ journal/
│  ├─ page.tsx                → /journal
│  └─ [slug]/page.tsx         → /journal/:slug         (dynamic)
├─ legal/
│  ├─ LegalLayout.tsx         (shared client wrapper — NOT a route)
│  ├─ insurance/page.tsx      → /legal/insurance
│  ├─ privacy/page.tsx        → /legal/privacy
│  └─ terms/page.tsx          → /legal/terms
├─ our-standard/page.tsx      → /our-standard
├─ pricing/
│  ├─ page.tsx                → /pricing
│  └─ PricingMatrices.tsx     (client component)
├─ reviews/
│  ├─ page.tsx                → /reviews
│  └─ ReviewsWall.tsx         (client component)
├─ service-areas/
│  ├─ page.tsx                → /service-areas
│  └─ [city]/
│     ├─ page.tsx             → /service-areas/:city            (dynamic)
│     └─ [suburb]/page.tsx    → /service-areas/:city/:suburb    (dynamic)
├─ services/
│  ├─ page.tsx                → /services
│  ├─ carpet-cleaning/page.tsx          → /services/carpet-cleaning
│  ├─ end-of-lease-cleaning/page.tsx    → /services/end-of-lease-cleaning
│  ├─ leather-cleaning/page.tsx         → /services/leather-cleaning
│  ├─ tile-grout-cleaning/page.tsx      → /services/tile-grout-cleaning
│  └─ upholstery-cleaning/page.tsx      → /services/upholstery-cleaning
└─ team/
   ├─ page.tsx                → /team
   └─ TeamGrid.tsx            (client component)
```

**Route summary:** 24 user-facing routes (incl. 3 dynamic segments) + `robots`/`sitemap`/`api/quote`. No stubs, no dead routes detected.

---

## 6. EXECUTION CHECKLIST (Copy-paste ready for Phase A)

> Run from the **nested** project root: `C:\Users\Sahil_Khan\Downloads\Cleaning-Ninja-main\Cleaning-Ninja-main`.
> ⚠️ This project is **not a git repo** (`git` is an empty file, no `.git/`). **There is no version-control safety net** — `git init && git add -A && git commit` BEFORE running any deletion below, or take a folder backup.

```powershell
# 0. SAFETY FIRST — initialize version control before deleting anything
git init ; git add -A ; git commit -m "snapshot before Day-1 cleanup"

# 1. Uninstall the 3 dead dependencies (three + its types + lottie)
npm uninstall three @types/three @lottiefiles/dotlottie-react

# 2. Delete confirmed orphaned files (no imports anywhere)
Remove-Item components\sections\home\Journal.tsx
Remove-Item components\motion\ScaleIn.tsx
Remove-Item components\ui\Card.tsx
Remove-Item components\ui\Checkbox.tsx
Remove-Item components\ui\Divider.tsx
Remove-Item components\ui\RadioCard.tsx

# 3. (Optional) remove the empty local images dir — all imagery is remote (Pexels)
Remove-Item public\images -Recurse -Force

# 4. Verify nothing broke after removals
npm run build
npx tsc --noEmit       # type-check
npm run test:e2e       # Playwright smoke (optional)
```

**Bash/macOS equivalent for steps 2–3:**
```bash
rm components/sections/home/Journal.tsx \
   components/motion/ScaleIn.tsx \
   components/ui/Card.tsx components/ui/Checkbox.tsx \
   components/ui/Divider.tsx components/ui/RadioCard.tsx
rm -rf public/images
```

### Manual edits (do NOT script — require code review)
5. **`next.config.js`** — remove the unused `images.unsplash.com` and `media.giphy.com` `remotePatterns`; keep only `images.pexels.com`.
6. **`Heading` design-system fix (the big one, §4a)** — add proper display variants to [`components/ui/Heading.tsx`](components/ui/Heading.tsx) (or map to existing `display-xl`/`display-lg`), then strip the ~20 `!text-[…]` heading overrides and `!text-[17px]/[19px]` body overrides from the page heroes and `ServiceDetail.tsx`. This restores the central `clamp()` type scale. Best done as its own focused PR.
7. **`Header.tsx` (optional consistency nit, §3.3)** — swap the bare `max-w-[1440px]` wrapper at [`Header.tsx:37`](components/layout/Header.tsx#L37) for `<Container width="wide">` so the header inherits the container contract. **Cosmetic only — values already match; no visual change.**
8. **(Pre-launch SEO, not Phase A)** — export a 1200×630 PNG/JPG `og-image` to complement the SVG for social scrapers (§4b).

### Items in the original brief that need NO action (already correct / non-existent)
- ❌ `BeforeAfter` hardcoded widths — **already fixed** (clip-path).
- ❌ `Container` wide/max-w-7xl mismatch — **never existed**; tokens are correct.
- ❌ `Tilt` touch guard — **already present**.
- ❌ Uninstall `swiper` / `react-hot-toast` / `react-intersection-observer` — **not installed; nothing to do**.
- ❌ Delete `lib/constants.ts`, `TrustBar`, `QuoteFormSection`, `NinjaClubRedesign`, `FloatingCTA` — **none of these files exist**.
- ❌ Missing `favicon.ico` / `apple-touch-icon.png` / `og-image.jpg` — **not missing**; SVG equivalents exist and are correctly referenced.
