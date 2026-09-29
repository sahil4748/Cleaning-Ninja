# Header and hero correction — 29 September 2026

The owner rejected the Step B visual result and requested Australian cleaning-site research followed by one correction at a time. This checkpoint addresses the first screen; it is not whole-homepage sign-off.

## Reference purposes

- [Blue Sky Carpet Cleaning](https://blueskycarpetcleaning.com.au/): service-first headline, carpet-cleaning priority, visible commercial category and offers with actual inclusions. Extract clarity and ordering, not visual styling or business claims.
- [Electrodry](https://www.electrodry.com.au/): direct service navigation, clear booking action and local specials. Extract action hierarchy; do not borrow proprietary methods or claims.

## Implemented

- Carpet-led headline and two short supporting lines replace the abstract opening and narrow 110px copy column.
- One aligned content group and a continuous ivory header replace competing overlays and staggered absolute positions.
- Hero links directly to quote, services and the following package section. Removed the empty editorial handoff between hero and packages.
- Removed the added desktop wipe and mobile dissolve. Exact H-01/H-03/H-04 assets and the desktop architectural mask remain; this does not repair or regenerate source footage.
- Carpet cleaning is first and selected initially in the homepage service index. Catalogue identifiers and lead contract unchanged.
- Responsive source selection, reserved media space, reduced-motion, slow-network and failed-playback fallback retained.

## Findings / remaining scope

- LAUNCH BLOCKER — fixed: mobile supporting text occupied an unnecessarily narrow column, with excessive wrapping and poor first-screen hierarchy.
- LAUNCH BLOCKER — fixed: the hero lacked a direct onward link into the immediately following package section; carpet cleaning opened second despite being the primary service.
- LAUNCH BLOCKER — next checkpoint: packages do not yet explain an actionable offer, inclusions or value. Existing five images preserved.
- LAUNCH BLOCKER — next checkpoint: commercial services absent. Owner has requested their inclusion; exact scope is awaiting clarification.
- LAUNCH BLOCKER — owner review pending: underlying footage was rejected. This pass removes added presentation effects but does not claim that CSS fixes source-video quality.

No production deployment, push, DNS, environment file, backend or generated-media changes.

## Verification

- Typecheck, content/release prebuild checks, production build and 23 unit tests passed.
- Lint passed with the existing 70 warnings, zero errors.
- 56 focused browser tests passed: responsive layout, quote/context flow, communication/menu keyboard behavior, static/reduced-motion/network failure fallbacks and video lifecycle.
- After fixing the landscape source-size hint, all six requested viewport checks passed again.
- Visual review: 375, 390, 430, 768, 1024 and 1440px. No clipped hero copy, header collisions or sideways overflow. Desktop mask and dedicated phone source retained. Tablet poster softness found and corrected. Local measured CLS was zero; this is not a field-performance guarantee.
- ShapeUI source detector reported a missing-src warning for the Next.js getImageProps spread. Actual decoded images and browser source checks confirm this is a false positive.

Screenshots: [375](hero-375.png), [390](hero-390.png), [430](hero-430.png), [768](hero-768.png), [1024](hero-1024.png), [1440](hero-1440.png).

Files: HomepageHero.tsx, new homepage-hero.css, Homepage.tsx, content/homepage.ts; three existing browser test files updated for the owner-requested hierarchy. AGENTS.md, owner decisions and current phase record the new scope. Asset paths remain in [Step B mapping](../step-b-media/report.md).

Preview: http://127.0.0.1:8136/ (local production build, no deployment).
