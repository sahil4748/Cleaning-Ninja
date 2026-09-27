# Responsive baseline and requirements

Existing composition: shared layout, Tailwind sm/md/lg/xl breakpoints; fixed header 64px below lg and 80px above; desktop navigation at lg; bottom Quote bar below lg after scrollY > 600, with safe-area padding. Main reserves bottom space on smaller screens. Tables intentionally scroll horizontally at min-width 720px. Services/cards collapse across breakpoints. Booking summary follows the form on mobile and sticks on desktop.

Risks: 64px minimum hero type and 100vh hero can push CTAs below the fold; hidden body overflow may conceal layout spill; small carousel dots; long table content; sticky CTA on /book can compete with step controls. Cursor effect gates on pointer preference but its DOM hides below lg, potentially hiding the native cursor on small desktop windows. Mobile nav lacks explicit Escape/focus management. Date conversion uses UTC serialization of local midnight; inspect AU timezone behavior before launch.

Owner requirement: mobile is independently composed, not a shrunken desktop scene. Future QA: 320/375/390/768/1024/1440 widths, landscape, 200% zoom, keyboard, touch, software keyboard, safe areas and reduced motion. These are proposed acceptance checks, not a claim of full device certification. Recorded browser evidence is in baseline-checks.md.

Confirmed local findings: 768px desktop pointer invisible; Escape leaves menu open; 1440px homepage document overflow measured at 2496px; reduced-motion hydration error; booking day 23 became day 22 in Australia/Sydney. Representative other routes had matching viewport/document widths at 390/768/1440. Screenshot/render sampling does not certify mobile Safari.

The large desktop home scrollWidth comes from the intentional horizontal services rail, not a general overflow on every page. Body overflow masking and disabled pinning in reduced motion need a keyboard/static fallback review. Services already has distinct mobile bento and desktop rail markup; the future independent-mobile requirement applies to the complete experience.
