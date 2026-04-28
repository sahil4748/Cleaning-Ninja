# Component Library Specifications

## Layout Components

### Navbar
- Fixed top, z-index 50
- Background: transparent initially, White with shadow on scroll
- Transition: background 300ms, shadow 300ms
- Height: 80px (mobile: 64px)
- Logo left, nav links center, CTA button right
- Mobile: hamburger menu, slide-in drawer

### Hero Section
- Full viewport height (100vh), min-height 600px
- Background: image with dark overlay (rgba(45, 55, 25, 0.4))
- Content: left-aligned, max-width 640px
- Eyebrow text: Caption style, Olive Green 300 or Beige 300
- Headline: H1, White
- Subheadline: Body Large, White/Beige 100
- CTAs: Primary + Ghost buttons, horizontal stack
- Scroll indicator: subtle bounce animation at bottom

### Stats Bar
- Background: Olive Green 700 or Beige 100
- 3-4 stats in horizontal row (mobile: 2x2 grid)
- Number: H2 size, Olive Green 900 or White
- Label: Small, Olive Green 500 or Beige 700
- Divider: 1px vertical line between stats (mobile: none)

### Section Header
- Centered, max-width 640px
- Eyebrow: Caption, Olive Green 500
- Headline: H2, Olive Green 900
- Subheadline: Body Large, Beige 700
- Margin bottom: 64px

### Service Cards Grid
- 3-4 columns (mobile: 1, tablet: 2)
- Gap: 24px
- Each card: icon (48px, Olive Green 500), H4 title, body description, "Learn More" link

### Trust Pillars
- 4 columns (mobile: 2x2, tablet: 2)
- Icon + title + description
- No cards - clean icon layout with generous spacing

### Testimonial Section
- Background: Beige 100 or Olive Green 100
- Large quote text (H3 size, italic)
- Avatar (64px circle), name, location, star rating
- Navigation dots or arrows

### Offer Banner
- Background: Olive Green 700
- Text: White, centered
- Headline + subheadline + CTA button
- Optional: decorative pattern or subtle texture

### Quote Form
- Background: White or Cream
- Card layout with shadow
- Form fields: Name, Email, Phone, Service Type (dropdown), Message
- Submit button: Primary, full width on mobile
- Trust badges below form (secure, fast response, no spam)

### Footer
- Background: Olive Green 900
- Text: White/Beige 300
- 4 columns: Logo+about, Services, Company, Contact
- Social icons: White, hover Olive Green 300
- Bottom bar: copyright, privacy, terms

## Interactive Components

### Accordion (FAQ)
- Border bottom: 1px Beige 300
- Question: H4, Olive Green 900
- Answer: Body, Beige 700, max-height animation
- Icon: chevron, rotate 180deg on open
- Duration: 300ms

### Modal/Popup
- Backdrop: rgba(0,0,0,0.5), blur 4px
- Content: White, 16px radius, max-width 560px
- Entrance: scale(0.95) to scale(1), fade in
- Exit: reverse
- Close button: top right, X icon

### Toast/Notification
- Position: top right (mobile: top center)
- Background: Olive Green 900 or White
- Text: White or Olive Green 900
- Icon: check, error, or info
- Slide in from right, auto-dismiss 5s
