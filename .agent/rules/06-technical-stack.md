# Technical Stack & Constraints

## Core Stack
- HTML5 semantic markup
- Tailwind CSS v3.4+ (via CDN or build)
- Vanilla JavaScript (ES6+ modules)
- No React/Vue/Angular unless explicitly requested

## CSS Framework
- Tailwind CSS with custom design tokens
- Custom config extending theme colors (olive, beige scale)
- Plugins: @tailwindcss/forms, @tailwindcss/typography
- No arbitrary values - use design system tokens only

## Animation Libraries
- Primary: GSAP 3.x with ScrollTrigger plugin
- Fallback: Intersection Observer API + CSS transitions
- Optional: Lottie for complex icon animations only

## Icons
- Lucide icons (consistent, clean line style)
- Size: 24px default, 48px for feature icons
- Stroke width: 1.5px
- Color: inherit from parent (Olive Green 500 default)

## Images
- Format: WebP with JPEG fallback
- Max width: 1920px for hero, 800px for cards
- Lazy loading: native loading="lazy" + blur-up placeholder
- Optimization: ImageKit or Cloudinary if available

## Fonts
- Google Fonts: Playfair Display (400, 600, 700), Inter (400, 500, 600)
- Font display: swap
- Preload critical fonts

## Performance Budget
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total page weight: < 500KB (excluding images)
- JavaScript: < 100KB gzipped
- CSS: < 50KB gzipped

## Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML (header, nav, main, section, article, footer)
- ARIA labels for interactive elements
- Focus visible states
- Keyboard navigation support
- prefers-reduced-motion respect

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- No IE11 support

## File Organization
```
project/
├── index.html
├── css/
│   ├── tailwind.config.js
│   ├── input.css
│   └── output.css
├── js/
│   ├── main.js
│   ├── animations.js
│   └── components/
├── assets/
│   ├── images/
│   ├── fonts/
│   └── icons/
└── .agent/ (rules - do not modify)
```

## Build Commands (if using build tools)
- Development: `npm run dev` (Vite recommended)
- Build: `npm run build`
- Preview: `npm run preview`
