'use client'

/**
 * Centralised GSAP registration.
 *
 * GSAP plugins must be registered exactly once per browser session. Importing
 * `ScrollTrigger` from here guarantees the registerPlugin call is idempotent
 * (`if (!isRegistered)`) and tree-shake-friendly — we never `import * as gsap`.
 *
 * Server-side render: this module is safe to import — the registration is a
 * no-op when `window` is not defined, and ScrollTrigger gracefully no-ops on
 * the server.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

if (typeof window !== 'undefined' && !isRegistered) {
  gsap.registerPlugin(ScrollTrigger)
  isRegistered = true
}

export { gsap, ScrollTrigger }
