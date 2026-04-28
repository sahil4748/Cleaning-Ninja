# Workflow: Build Cleaning Ninja Website

## Trigger
User requests to build or update the Cleaning Ninja website.

## Steps

### 1. Discovery & Planning
- Read all rules in `.agent/rules/`
- Confirm understanding of design direction with user
- Identify current project state (new build or refactor)
- Create task list in agent memory

### 2. Foundation Setup
- Initialize project structure (HTML, CSS, JS folders)
- Set up Tailwind CSS with custom color configuration
- Load Google Fonts (Playfair Display, Inter)
- Create base HTML template with semantic structure

### 3. Global Components
- Build Navbar component (fixed, scroll behavior, mobile menu)
- Build Footer component (4-column layout, social links)
- Implement global animations (fade up, scroll triggers)
- Set up responsive breakpoints

### 4. Section-by-Section Build (in order)
For each section:
- Build HTML structure
- Apply Tailwind classes using design tokens
- Implement section-specific animations
- Add responsive behavior
- Test on mobile, tablet, desktop
- Get user approval before proceeding

Section order:
1. Hero
2. Stats Bar
3. Services Grid
4. Trust Pillars
5. Testimonials
6. Offer Banner
7. Quote Form

### 5. Interactions & Polish
- Implement all hover states
- Add form validation
- Implement mobile menu toggle
- Add smooth scroll behavior
- Test all animations with reduced-motion preference

### 6. Performance & QA
- Optimize images
- Minify CSS/JS
- Run Lighthouse audit
- Fix any accessibility issues
- Cross-browser testing checklist

### 7. Delivery
- Present final build to user
- Provide deployment instructions
- Document any custom components
- Handoff notes for future edits

## Constraints
- NEVER proceed to next section without completing current one
- ALWAYS test responsive behavior before marking complete
- NEVER use colors outside the olive/beige palette
- ALWAYS validate HTML and check contrast ratios
- If stuck, ask user for clarification rather than guessing
