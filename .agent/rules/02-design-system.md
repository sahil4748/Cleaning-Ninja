# Design System - Olive + Beige Premium Palette

## Color Palette

### Primary Colors
- Olive Green 900: `#3D4A1E` (headings, dark accents)
- Olive Green 700: `#5A6B2F` (primary buttons, CTAs)
- Olive Green 500: `#7A8450` (secondary buttons, links)
- Olive Green 300: `#A8B58A` (borders, subtle accents)
- Olive Green 100: `#E8ECE0` (light backgrounds, tags)

### Neutral Colors (Beige/Cream)
- Beige 900: `#8C7B64` (body text on light backgrounds)
- Beige 700: `#B5A48E` (secondary text, captions)
- Beige 500: `#D4C5B0` (borders, dividers)
- Beige 300: `#E8DFD5` (card backgrounds, alternate sections)
- Beige 100: `#F5F1EB` (page background, section backgrounds)
- Cream: `#FAF8F5` (card backgrounds, elevated surfaces)
- White: `#FFFFFF` (pure white for contrast sections)

### Semantic Colors
- Success: `#5A6B2F` (same as olive 700)
- Error: `#C45B4A` (warm red, use sparingly)
- Warning: `#D4A03D` (warm amber)
- Info: `#7A8450` (olive 500)

## Typography

### Font Families
- Headings: `Playfair Display` or `Cormorant Garamond` (elegant serif)
- Body: `Inter` or `DM Sans` (clean sans-serif)
- Fallback: system-ui, -apple-system, sans-serif

### Type Scale
- Hero H1: 56px/64px (mobile: 36px/44px), weight 600, letter-spacing -0.02em
- H2: 42px/52px (mobile: 28px/36px), weight 600, letter-spacing -0.01em
- H3: 28px/36px (mobile: 22px/28px), weight 600
- H4: 22px/28px (mobile: 18px/24px), weight 600
- Body Large: 18px/28px, weight 400
- Body: 16px/26px, weight 400
- Small: 14px/20px, weight 400
- Caption: 12px/16px, weight 500, uppercase, letter-spacing 0.05em

### Typography Rules
- Headings: Olive Green 900 or White (on dark backgrounds)
- Body text: Beige 900
- Links: Olive Green 500, underline on hover
- Max line length: 65 characters for readability
- Minimum contrast ratio: 4.5:1 for body, 3:1 for large text

## Spacing System
- Base unit: 4px
- Section padding: 80px vertical (mobile: 48px)
- Content max-width: 1280px, centered
- Grid gap: 24px (mobile: 16px)
- Card padding: 32px (mobile: 24px)
- Component spacing: 16px, 24px, 32px, 48px, 64px

## Border Radius
- Small (buttons, inputs): 8px
- Medium (cards): 12px
- Large (sections, modals): 16px
- Full (pills, badges): 9999px

## Shadows
- Card: `0 4px 20px rgba(61, 74, 30, 0.08)`
- Elevated: `0 8px 30px rgba(61, 74, 30, 0.12)`
- Hover: `0 12px 40px rgba(61, 74, 30, 0.16)`

## Component Primitives

### Buttons
- Primary: Olive Green 700 background, White text, 8px radius, 16px 32px padding
- Primary Hover: Olive Green 900 background, translateY(-2px), shadow increase
- Secondary: Transparent, Olive Green 700 border, Olive Green 700 text
- Secondary Hover: Olive Green 100 background
- Ghost: Transparent, White text (for dark backgrounds)
- Ghost Hover: White background, Olive Green 900 text

### Cards
- Background: Cream `#FAF8F5` or White
- Border: 1px solid Beige 300 `#E8DFD5`
- Border radius: 12px
- Padding: 32px
- Shadow: Card shadow (see above)
- Hover: translateY(-4px), Elevated shadow

### Inputs
- Background: White
- Border: 1px solid Beige 500 `#D4C5B0`
- Border radius: 8px
- Padding: 12px 16px
- Focus: Border Olive Green 500, ring 2px Olive Green 100
- Placeholder: Beige 700

### Badges/Tags
- Background: Olive Green 100
- Text: Olive Green 700
- Padding: 4px 12px
- Border radius: 9999px
- Font: Caption style
