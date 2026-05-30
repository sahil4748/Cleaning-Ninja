'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * Squeegee page loader — 1.1s vertical sweep across the viewport, revealing
 * the page. Capped at 1.5s total to never become friction. Skipped entirely
 * when prefers-reduced-motion is set.
 */
export function PageLoader() {
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setDone(true)
      return
    }

    let mounted = true
    const timer = setTimeout(() => {
      if (mounted) setDone(true)
    }, 1100)

    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [reduced])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal text-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-[55%] bg-olive"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.9, ease: [0.65, 0.05, 0.36, 1] }}
          />
          <motion.div
            className="relative font-display font-bold tracking-[-0.03em] text-[clamp(40px,7vw,88px)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.65, 0.05, 0.36, 1] }}
          >
            Cleaning <span className="text-olive">Ninja</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
