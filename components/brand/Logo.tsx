/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from 'react'

/**
 * Cleaning Ninja logo (outlined SVGs in /public/branding), used unmodified.
 * - tone="light": for white, beige and light surfaces.
 * - tone="dark": for dark, photographic, teal and overlay surfaces.
 * - tone="auto": renders both; the caller's CSS shows one by ancestor state, so the
 *   supplied files are swapped, never recoloured.
 * - compact: below 480px the tagline-free lockup is used, below 360px the CN mark.
 */
type Tone = 'light' | 'dark' | 'auto'

const FULL = { light: '/branding/logo-light.svg', dark: '/branding/logo-dark.svg' }
const COMPACT = { light: '/branding/logo-compact-light.svg', dark: '/branding/logo-compact-dark.svg' }
const MARK = '/branding/logo-mark-primary.svg'

export function Logo({
  tone = 'light',
  height = 44,
  compact = true,
  className = '',
}: {
  tone?: Tone
  height?: number
  compact?: boolean
  className?: string
}) {
  const style = { '--cn-logo-h': `${height}px` } as CSSProperties
  const tones = tone === 'auto' ? (['light', 'dark'] as const) : ([tone] as const)
  return (
    <span
      role="img"
      aria-label="Cleaning Ninja"
      className={`cn-logo${compact ? ' cn-logo--compact' : ''} ${className}`.trim()}
      style={style}
    >
      {tones.map((t) => (
        <span key={t} className={`cn-logo-tone cn-logo-tone--${t}`} aria-hidden="true">
          <img className="cn-logo-full" src={FULL[t]} alt="" width={1856} height={409} />
          {compact && (
            <>
              <img className="cn-logo-lockup" src={COMPACT[t]} alt="" width={1862} height={409} />
              <img className="cn-logo-mark" src={MARK} alt="" width={439} height={409} />
            </>
          )}
        </span>
      ))}
    </span>
  )
}
