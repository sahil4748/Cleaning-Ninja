# Animation Specifications

## Philosophy
- Smooth, subtle, professional - never gimmicky
- Purposeful: every animation guides attention or provides feedback
- Performance-first: use transform and opacity only, avoid layout thrashing
- Respect prefers-reduced-motion

## Global Easing
- Default: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- Entrance: `cubic-bezier(0, 0, 0.2, 1)` (decelerate)
- Exit: `cubic-bezier(0.4, 0, 1, 1)` (accelerate)
- Bounce (subtle): `cubic-bezier(0.34, 1.56, 0.64, 1)`

## Global Durations
- Micro (hover, focus): 150ms
- Small (buttons, toggles): 200ms
- Medium (cards, modals): 300ms
- Large (page transitions, sections): 500ms
- Stagger delay: 100ms between items

## Page Load Sequence
1. Navbar fades in (0ms, duration 300ms)
2. Hero content staggers in (200ms delay, 100ms stagger):
   - Eyebrow text first
   - Headline second
   - Subheadline third
   - CTA buttons fourth
3. Hero image scales from 1.05 to 1.0 (500ms, ease-out)
4. Stats bar slides up (400ms delay)

## Scroll Animations (Intersection Observer)
- Threshold: 0.2 (trigger when 20% visible)
- Root margin: 0px

### Fade Up (default for sections)
- Initial: opacity 0, translateY(30px)
- Final: opacity 1, translateY(0)
- Duration: 500ms
- Easing: ease-out

### Fade In (for images)
- Initial: opacity 0
- Final: opacity 1
- Duration: 600ms
- Easing: ease-out

### Slide In Left (for alternating layouts)
- Initial: opacity 0, translateX(-40px)
- Final: opacity 1, translateX(0)
- Duration: 500ms

### Slide In Right
- Initial: opacity 0, translateX(40px)
- Final: opacity 1, translateX(0)
- Duration: 500ms

### Scale Up (for cards, features)
- Initial: opacity 0, scale(0.95)
- Final: opacity 1, scale(1)
- Duration: 400ms
- Easing: bounce (subtle)

### Stagger Children (for grids, lists)
- Parent triggers when first child visible
- Each child: fade up with 100ms delay between
- Max stagger: 600ms total (cap at 6 items)

## Hover Animations

### Buttons
- Transform: translateY(-2px)
- Shadow: increase to next level
- Duration: 200ms
- Active state: translateY(0), shadow decrease

### Cards
- Transform: translateY(-4px)
- Shadow: elevated shadow
- Duration: 300ms
- Image inside: scale(1.05) with overflow hidden

### Links
- Underline grows from left to right (scaleX 0 to 1, transform-origin left)
- Duration: 200ms

### Navigation Links
- Color transition to Olive Green 700
- Duration: 150ms

## Specific Component Animations

### Hero Image
- Subtle parallax on scroll: translateY at 0.3x scroll speed
- Optional: gentle Ken Burns effect (slow zoom 1.0 to 1.05 over 20s)

### Stats Counter
- Count up from 0 to final number when scrolled into view
- Duration: 2000ms
- Easing: ease-out
- Format: comma-separated, no decimal for integers

### Testimonial Cards
- Auto-rotate every 5 seconds (if carousel)
- Transition: fade + slide horizontal
- Duration: 500ms
- Pause on hover

### Service Cards
- Icon: subtle bounce on hover (scale 1.0 to 1.1, back to 1.0)
- Arrow appears on hover (translateX 0 to 4px)

### Mobile Menu
- Slide in from right
- Duration: 300ms
- Backdrop fade: 200ms
- Body scroll lock

## Loading States
- Skeleton screens: shimmer animation (gradient sweep left to right)
- Duration: 1.5s, infinite
- Background: Beige 300 to Beige 100 to Beige 300

## Reduced Motion
- If `prefers-reduced-motion: reduce`:
  - Disable all transforms and opacity transitions
  - Instant state changes only
  - Keep essential feedback (button hover color change)
