# Repository architecture

Next.js 16.2.4 / React 19.2.5 / TypeScript 5.9.3 from package-lock.json. npm lockfile v3. Local validation used Node 25.9.0 and npm 11.12.1; engines/packageManager/runtime-version file absent. Production Node version unknown.

| Area | Implementation |
|---|---|
| Routing | App Router; 21 fixed content routes, 6 journal, 6 city, 60 suburb routes = 93 |
| Layout | app/layout.tsx → organisation schema, motion/Lenis, loader/cursor, Header, main, Footer, mobile CTA |
| Page rendering | Static/SSG except /book (searchParams); /api/quote dynamic POST |
| UI | components/ui, layout, motion, sections/home, sections/service, seo |
| Content | typed TS modules: navigation, services, pricing, coverage, reviews, team, FAQ, journal |
| Styling | Tailwind 4.2.2, CSS @theme, PostCSS; no CMS |
| State | local React state/memo/effects; RHF on contact/careers; no global store |
| Validation | RHF + Zod on contact/careers, handwritten booking validation; no server validation |
| Persistence | no database, ORM, durable storage, queue or auth found |
| Backend | app/api/quote/route.ts logs request body and returns success; no callers found in forms |
| Server actions | none found |
| SEO | metadata exports, lib/schema.ts + JsonLd, sitemap.ts, robots.ts |
| Tooling | content scanner/prebuild, SEO scanner, logo script, two Playwright tests |

Root is a single application, not a monorepo. @/* maps to root. LegalLayout is a shared component, not a nested route layout. Dynamic routes enumerate static params and reject invalid content with notFound(). No middleware/proxy, redirects or rewrites found. Dependency details and unused-component candidates are in dependencies.md. Full rendered route inventory in route-seo-inventory.md.
