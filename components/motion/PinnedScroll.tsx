'use client'

import { useGSAP } from '@gsap/react'
import { type RefObject } from 'react'
import { gsap, ScrollTrigger } from './gsap-core'

/**
 * Pinned-scroll matchMedia keys.
 *
 * The blueprint locks pinned animations to lg+ AND prefers-reduced-motion:
 * no-preference (per audit point §6.3.GSAP). Below lg we never pin.
 */
export const MQ_PIN = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
export const MQ_NO_PIN = '(max-width: 1023px), (prefers-reduced-motion: reduce)'

/** Return type allows an optional cleanup for non-GSAP side effects. */
export type GsapMatchMediaCallback = () => void | (() => void)

/**
 * `useGsapMatchMedia` — a thin wrapper around `useGSAP` + `gsap.matchMedia` that
 * enforces the pinned-scroll gating policy. The `pinned` callback only runs
 * when the viewport is lg+ AND the user has not requested reduced motion.
 *
 * Any `gsap.to`, `gsap.from`, or `ScrollTrigger.create` calls inside `pinned`
 * are automatically scoped to the matchMedia context — GSAP reverts them when
 * the breakpoint exits or when the component unmounts. Use the optional
 * cleanup return for any non-GSAP teardown (event listeners, observers).
 */
export function useGsapMatchMedia(
  scope: RefObject<HTMLElement | null>,
  pinned: GsapMatchMediaCallback,
  deps: ReadonlyArray<unknown> = [],
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ_PIN, () => {
        const cleanup = pinned()
        return () => {
          if (typeof cleanup === 'function') cleanup()
        }
      })
      return () => {
        mm.revert()
      }
    },
    { scope, dependencies: [...deps] },
  )
}

export { gsap, ScrollTrigger }
