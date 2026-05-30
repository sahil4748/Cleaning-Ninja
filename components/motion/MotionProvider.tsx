'use client'

import { ReactNode } from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'

/**
 * Site-wide motion wrapper.
 *
 * - LazyMotion + domAnimation keeps the motion bundle small by tree-shaking
 *   unused features.
 * - MotionConfig enforces blueprint defaults: long ease-out, 500ms duration.
 * - `reducedMotion="user"` means we respect the user's OS preference. Each
 *   motion primitive ALSO uses `useReducedMotion()` to swap to instant
 *   reveals where needed.
 *
 * NOT used: `strict` mode — legacy section files still use `motion.*` directly
 * and would break. Phase 2 rewrites will move to `m.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
