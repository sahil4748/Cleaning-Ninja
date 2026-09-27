# Existing motion and future constraints

Active: Framer Motion provider/reveals/staggers/split text/counters, CSS sparkles, GSAP ScrollTrigger comparison sliders, desktop Lenis, magnetic custom cursor, 1.1-second loader plus 0.4-second fade, parallax and a CSS/SVG grime wipe. Global MotionConfig respects user reduced-motion preferences; CSS reduces duration. Lenis gates at 1024px with fine pointer and no reduced motion.

Risks: multiple continuous requestAnimationFrame loops; cursor forces layout periodically; reviews auto-advance every six seconds without pause/reduced-motion gating; loader initially overlays content; motion libraries overlap. LazyMotion coexists with motion.* usage. Dynamic import of GrimeToGleam is not proof of deferral until after LCP.

HeroCanvas is a 2D canvas option, not WebGL: missing manifest currently selects a Pexels still with parallax. If activated, it constructs 60 mobile/400 desktop images and preloads 30, including under reduced motion. Do not activate it during foundation.

Owner escalation order: CSS → Motion → lightweight animation → cinematic media → selective WebGL/R3F only where justified. Future acceptance: readable static fallback, no interaction delay, reduced-motion equivalence, cleanup and offscreen suspension. No new motion specification approved.

Services uses a GSAP-pinned horizontal card rail at lg+ and a separate bento grid below lg. Reduced motion disables pinning but does not switch desktop markup to the mobile grid; offscreen-card access is a source-confirmed risk. Both responsive variants are mounted in the tree, with display classes selecting visibility.
