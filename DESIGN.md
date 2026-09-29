---
name: Cleaning Ninja — Beautifully clean
description: A service-led cleaning opening, warm olive and linen surfaces, and a visible path to a free quote.
colors:
  paper: "#f2efe6"
  ink: "#334338"
  olive: "#e0e3d1"
  sage: "#b6be94"
  rust: "#a84c31"
  line: "rgba(51, 67, 56, 0.22)"
  cream-on-image: "#fffbed"
  service-surface: "#eae8dd"
  commercial-surface: "#ddd8c8"
  muted-olive: "#7a8261"
  form-muted: "#526047"
  field-line: "#84917b"
  field-placeholder: "#58664e"
  field-invalid: "#8c442c"
  field-error: "#823b28"
  submit-hover: "#26332b"
  submit-disabled: "#77806e"
  legal-line: "#c4c9b5"
  legal-body: "#4b5a46"
  legal-action-hover: "#25332b"
  announcement: "#dbe0c8"
  entry-sage: "#dce1c9"
  starter-paper: "#f3f0e6"
  header-action-hover: "#1e3023"
  starter-line: "#87907d"
  starter-placeholder: "#6d7565"
  starter-action-hover: "#243529"
  starter-muted: "#66705e"
  nav-badge: "#dfe4cc"
  nav-badge-ink: "#526044"
  offer-link-hover: "#8f452e"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(72px, 7.4vw, 124px)"
    fontWeight: 400
    lineHeight: 0.89
    letterSpacing: "-0.035em"
  starter-heading:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.025em"
  starter-field:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.4
  starter-label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.6
  starter-submit:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.6
  navigation:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "12px"
    lineHeight: 1.6
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(48px, 5.6vw, 88px)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  introduction:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(55px, 5.8vw, 92px)"
    fontWeight: 400
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  quote-heading:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "clamp(46px, 5vw, 76px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  offer-title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "43px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    lineHeight: 1.25
  field:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  field-label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.6
  submit:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
  legal-display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(56px, 7.2vw, 96px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  legal-body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    lineHeight: 1.85
rounded:
  square: "0"
  action: "2px"
  tag: "30px"
  floating-action: "40px"
  compact-pill: "50px"
  pill: "60px"
  circle: "50%"
spacing:
  field-label-gap: "8px"
  mobile-gutter: "24px"
  narrow-gutter: "20px"
  section-desktop: "118px 5.55%"
  section-tablet: "80px 6%"
  section-mobile: "66px 24px"
  quote-section: "clamp(76px, 10vw, 152px) clamp(24px, 5vw, 88px)"
  quote-mobile: "68px 24px"
  offer-detail: "42px 44px"
  entry-layout: "52px 5.2% 62px"
  starter-panel: "28px 28px 0"
  starter-panel-mobile: "25px 24px 0"
components:
  header-quote:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.navigation}"
    rounded: "{rounded.square}"
    padding: "14px 19px"
  starter-panel:
    backgroundColor: "{colors.starter-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "{spacing.starter-panel}"
  starter-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.starter-field}"
    rounded: "{rounded.square}"
    padding: "2px 0 8px"
    height: "41px"
    width: "100%"
  starter-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.starter-submit}"
    rounded: "{rounded.square}"
    padding: "16px 18px"
    width: "100%"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "7px 8px 7px 25px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "7px 8px 7px 25px"
  button-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.submit}"
    rounded: "{rounded.action}"
    padding: "18px 24px"
    width: "100%"
  button-submit-hover:
    backgroundColor: "{colors.submit-hover}"
  button-submit-disabled:
    backgroundColor: "{colors.submit-disabled}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "11px 0 13px"
    width: "100%"
  offer-choice:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "23px 27px"
    width: "100%"
  offer-choice-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  offer-tag:
    textColor: "{colors.ink}"
    rounded: "{rounded.tag}"
    padding: "6px 12px"
  legal-action:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.action}"
    padding: "13px 20px"
---

# Design System: Cleaning Ninja

## Overview

**Creative North Star: "Beautifully clean"**

The opening makes carpet and upholstery cleaning explicit, places the selected-package offer in view and pairs cleaning-in-progress photography with a compact quote starter. A linen header, dark olive actions and direct service navigation establish the practical path immediately.

The broader page retains its warm residential character: tactile imagery, editorial headings, plain utility text, generous space and fine rules. Services and complete packages precede the cinematic care story; the emotional introduction follows that story.

This is the implemented renewal system for the homepage (`/`), its enquiry flow, and the matching privacy and terms pages (`/legal/privacy`, `/legal/terms`). It records the current code in `components/homepage/renewal`; it does not describe a redesign of unused legacy routes. The frontmatter contains normative values from the implementation, including the opening overrides in `entry.css`.

**Key Characteristics:**

- Linen, light olive and sage surfaces with forest-olive text.
- Cormorant Garamond display typography paired with DM Sans utility text.
- Cleaning-in-progress hero photography, fine separators and mostly unboxed content.
- Direct rectangular quote actions, circular arrow details and square-edged form fields.
- Native scrolling, one cinematic care-story reveal and a responsive crop of the same hero photograph.
- A visible two-step quote path and persistent service/package selection leading to a reviewable email enquiry.

## Colors

The palette is warm and low in saturation, with dark olive providing the structural contrast.

### Primary

- **Forest olive (`ink`)** anchors text, selected offers, dark actions, the story background and footer.
- **Linen (`paper`)** is the principal canvas and the light action surface.

### Secondary

- **Light olive (`olive`)** groups packages, the enquiry and the mobile menu.
- **Sage (`sage`)** gives the closing invitation a distinct field of color.
- **Muted olive (`muted-olive`)** colors the italic emphasis in the introduction.
- **Entry sage** links the hero side column, quote-starter offer strip and five-package preview. **Announcement** and **nav badge** use their own closely related olive tones.

### Tertiary

- **Warm rust (`rust`)** marks homepage focus and carets. The enquiry uses its darker `field-invalid` and `field-error` colors for invalid input and inline messages. Legal focus uses `field-invalid`.

### Neutral

- **Cream on image (`cream-on-image`)** is used for text over shaded photography.
- **Service surface** and **commercial surface** give their sections quiet tonal separation.
- **Line**, **field line** and **legal line** provide context-specific separators. Muted form and legal text keep supporting information subordinate without changing the dominant olive hue.
- **Starter paper**, **starter line**, **starter placeholder** and **starter muted** belong to the compact opening form. Header, starter, full-form and legal actions retain their distinct implemented dark olive hover colors.

## Typography

**Display Font:** Cormorant Garamond, with Georgia and serif fallbacks. **Body Font:** DM Sans, with a sans-serif fallback. The application loads normal and italic Cormorant styles and uses font swapping.

Display typography is light, tightly tracked and expressive; utility typography is direct and compact. Italic emphasis is part of the heading rhythm. The introduction and enquiry headings deliberately begin in DM Sans and use Cormorant for their emphasized line.

The frontmatter records the desktop roles. The hero uses the `display` role for “Carpet & upholstery. Beautifully clean.”; its italic final line is 0.83em. The quote starter uses `starter-heading`. Ordinary section headings use `headline`, with local sizes for individual compositions. The introduction italic is enlarged to 1.29em, and the enquiry italic to 1.14em. Body copy varies by context, with smaller service details, labels and terms. Form controls remain 16px; legal reading text uses the more open `legal-body` role.

The hero scales to 8.1vw at 1199px, 7.7vw with 0.98 leading at 899px, then `clamp(54px, 15.8vw, 85px)` with 0.94 leading at 600px and below. Below 360px it uses 15.5vw; above 1700px it uses 138px. The starter heading is 44px at 1199px, 42px at 600px and 36px below 360px; above 1700px it is 58px. At 600px, introduction text remains 10.8vw and the full enquiry heading 11.5vw. Legal titles retain their separate mobile clamp.

## Layout

The homepage has a full-width canvas and percentage gutters. Standard sections use `section-desktop`, then `section-tablet` at 899px and below and `section-mobile` at 600px and below. Narrow phones reduce standard section gutters to `narrow-gutter`. Above 1700px, standard section vertical padding increases to 150px.

Desktop services, process, commercial content and FAQs use paired columns with differing proportions and open gaps. Services combine a text browser and sticky image. Mobile services place category tabs first, the selected image second, then the service list and help. Process, commercial content and FAQs stack at 600px.

The opening uses `cleaning-hero.webp` (2400 × 1357), showing carpet extraction in a warm living room. Both responsive image sources use this same landscape asset. On desktop the image occupies the left 82% of the hero with an object position of 78% 55%; the quote starter straddles the photograph and the sage side column. The hero uses a flexible main column and a 330–370px starter column, expanding to 405px on very wide screens.

At 600px and below, the hero becomes a 540px image-and-copy block with object position 62% 58%, followed by the quote starter. The starter overlaps the image by 22px and has 16px exterior gutters. The five-package preview is a row on desktop and a two-column set of ruled links on mobile, with the fifth link spanning both columns.

The enquiry uses a 0.9fr/1.1fr layout, stacks at 960px, and becomes a single-column form at 600px. Its desktop field grid has two columns with a 27px row gap and 28px column gap. Legal pages center a 1000px main region with a 700px reading column, retain 24px side gutters and simplify navigation at 700px.

Scrolling remains native. The desktop care-story stage is sticky inside a 190svh section. At widths below 900px, it is a direct, non-sticky scene; at 600px it is 680px tall. OS reduced motion and the footer's global motion control provide a still version with the final message available. The story's film control pauses playback independently without changing this layout.

## Elevation & Depth

Photography, tonal surfaces and fine borders provide most depth. The quote starter is the raised focal panel: its desktop shadow is `0 22px 65px #10190b35`, reducing to `0 15px 35px #19291712` on mobile. The service menu uses `0 24px 45px #15251925`, and the floating mobile quote action uses `0 6px 24px #17251d22`. General content sections and the full offer folio remain unshadowed.

The desktop care-story reveal expands a rounded textile window into a full-width room: the window begins at `inset(10% 21% 10% 21% round 230px)` and ends at a square full frame. Detail fades into room imagery as the final message arrives. Secondary motion consists of restrained hero parallax, once-only content entrances and short control transitions. The story film only plays while eligible and near view; reduced motion, data-saving and slow-connection checks suppress film loading, and hidden-page or off-screen state pauses playback.

## Shapes

Large image and content surfaces are square. The header quote action, mobile opening quote action and starter submit are rectangular. Supporting marketing actions remain pills with an outlined circular arrow; standalone arrow controls are circular. Quote submission and legal actions use the subtle `action` radius, while fields remain square and underlined. Offer tags use a compact pill. The mobile offer index changes from ruled rows to horizontally scrollable pills with proximity snapping.

The shared brand component pairs a folded N monogram with a custom vector Cleaning Ninja wordmark across the header, mobile menu, footer and legal pages. Transparent negative space follows the surrounding olive or linen color. The signature is 204px on desktop and 132–154px on mobile; lettering is outlined and does not depend on font loading.

## Components

### Buttons and links

Light and dark marketing actions share a 56px minimum height and a 40px circular arrow. Hover lifts the action by 3px and rotates its arrow circle by 45 degrees over 0.3 seconds. At 600px, the action minimum becomes 52px and its circle 36px. Text links use a fine underline and open their arrow gap on hover. Homepage keyboard focus uses a 2px rust outline with a 5px offset.

The full-width enquiry submit has a 62px minimum height, a dark olive surface and a direct diagonal arrow. Hover darkens it and moves the arrow by 2px. Disabled submission uses the disabled token and a not-allowed cursor. Its mobile minimum height is 60px. Legal actions use the same quiet rectangular language with a 48px minimum height.

### Navigation

The fixed header is linen with olive content from the start. A 34px olive strip advertises up to 30% off selected packages above a 92px navigation row. After 60px of scrolling, the announcement collapses and the row becomes 78px. At 600px the strip is 31px and the row is 78px, reducing to 70px when scrolled. The dark rectangular “Get a Free Quote” action remains prominent.

“Our services” opens a native disclosure menu with a short editorial introduction and all eleven service links in two columns. Selecting a service opens its matching group and row in the browser; Escape closes the menu and restores focus, and leaving it with focus closes it. At 899px the inline navigation gives way to the full-screen olive menu, including direct service links, focus containment and Escape handling. The floating mobile quote action remains conditional on hero/form visibility and the menu being closed.

### Service browser

Three category tabs organize the services. The selected tab is marked by a two-pixel olive underline; service rows use thin dividers, and the expanded service name grows from 23px to 35px on desktop. Descriptions, inclusions and a quote action sit below the active row. Selection updates the accompanying photograph and carries the chosen service into the enquiry. Category tabs support keyboard navigation, and expanded rows expose their state.

### Selected offers

The five quick links immediately after the hero select a package and jump to its full folio. The nearby offer label preserves “up to” and “selected packages”; conditions remain available in the full section. The services browser and full package folio both appear before the cinematic care story.

The olive offer folio has a ruled index beside the current package details. The selected index item reverses to linen text on dark olive and uses a pressed state. The details show a serif title, a small “Tailored quote” tag, included care, conditions and a quote action. Mobile presents the same choices in a horizontal pill rail above the details. The five implemented selections are 3 bedrooms, 5 bedrooms, 3 rugs, 5-seat fabric lounge and 5-seat leather lounge. Choosing an offer carries its service and package title into the form; the nearby conditions remain visible.

### Quote starter

The hero panel shows “01 / 02”, a serif “Get a Free Quote” heading, a service selector and a suburb/postcode field. Labels are 10px, controls are 16px with 41px height, and the full-width dark action has a 51px minimum height. A sage offer strip closes the panel. Native required-field validation applies before continuing. The next step preserves the service and suburb in the full enquiry and moves focus to the contact name field; it does not send a lead or confirm a booking.

### Enquiry fields and review

Labels sit above transparent, underlined controls with a 48px minimum height. The textarea has a 106px minimum and resizes vertically. Keyboard focus follows the homepage's two-pixel rust outline with a five-pixel offset; focused fields retain an olive bottom border. Invalid fields have a darker rust border and adjacent text errors. Invalid submission focuses the first field requiring attention.

A selected package appears in a ruled summary with a circular 44px remove control. Valid submission opens a review with a serif heading, a ruled definition list, an email action and an edit control. Focus moves to this review. The visible status says the enquiry has not been sent; the email action opens a draft for the visitor to send. Optional information remains explicitly labeled.

### FAQs and legal reading

FAQs are native disclosure rows separated by fine rules, with plus/minus state indicators. Privacy and terms use the same brand and colors in a calm reading layout: serif page title, sans-serif section headings, underlined inline links, a return-home path and a quote action. Both surfaces include a skip link and visible keyboard focus.

### Motion preferences

The cinematic reveal runs only at 900px and above with motion permitted. The story offers “Pause film” and “Play film” controls that affect playback alone. The footer's global motion control affects the complete animated presentation. The operating-system preference disables scroll-triggered motion, CSS animations and transitions. The final care-story content remains available without the reveal. The enquiry and legal surfaces disable transitions and use automatic scroll behavior under reduced motion.

## Do's and Don'ts

### Do:

- **Do** use the current olive, linen and sage roles, with the form and legal state colors preserved.
- **Do** retain Cormorant Garamond for editorial expression and DM Sans for practical information.
- **Do** preserve the cleaning hero’s responsive crop, mobile quote-starter stack and service/offer compositions.
- **Do** keep service and package selection visible through the enquiry review.
- **Do** preserve native scroll, visible keyboard focus and the still reduced-motion version.

### Don't:

- **Don't** replace the open, ruled compositions with repeated shadowed cards.
- **Don't** treat the cinematic desktop reveal as a requirement for mobile or reduced-motion visitors.
- **Don't** present illustrative brand imagery as verified customer work.
- **Don't** turn the enquiry review into a delivery or booking confirmation.
- **Don't** apply this document's implementation claims to unused legacy routes.
