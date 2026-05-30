'use client'

import { useState, useRef, MouseEvent, HTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TiltProps extends HTMLAttributes<HTMLDivElement> {
  maxRotation?: number
  scale?: number
  perspective?: number
  glareOpacity?: number
  /** Disable tilt entirely if the consumer wants flat behaviour. */
  disabled?: boolean
}

/**
 * Tilt — premium 3D mouse-interactive card wrapper.
 *
 * - Gates on `(hover: hover) and (pointer: fine)` so touch devices never get
 *   the tilt (matches the audit fix in the plan).
 * - Adds a subtle olive glow alongside the cream glare to match brand.
 * - Respects `prefers-reduced-motion` by zeroing the rotation.
 */
export default function Tilt({
  children,
  className,
  maxRotation = 8,
  scale = 1.015,
  perspective = 1200,
  glareOpacity = 0.22,
  disabled = false,
  ...props
}: TiltProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const [canTilt, setCanTilt] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setCanTilt(supportsHover && !prefersReducedMotion && !disabled)
  }, [disabled])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canTilt) return
    const el = elementRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const factorX = y / rect.height - 0.5
    const factorY = x / rect.width - 0.5

    setRotation({
      x: factorX * -maxRotation,
      y: factorY * maxRotation,
    })

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseEnter = () => canTilt && setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setRotation({ x: 0, y: 0 })
    setGlarePosition({ x: 50, y: 50 })
  }

  const transformStyle = isHovering && canTilt
    ? `perspective(${perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${scale}, ${scale}, ${scale})`
    : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`

  const glareStyle = {
    background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(245, 240, 232, ${glareOpacity}) 0%, transparent 60%)`,
    opacity: isHovering && canTilt ? 1 : 0,
  }

  const oliveGlowStyle = {
    boxShadow: isHovering && canTilt
      ? `0 24px 64px -24px rgba(107, 124, 58, 0.32), 0 4px 16px -4px rgba(44, 44, 44, 0.12)`
      : '0 0 0 0 rgba(0,0,0,0)',
    transition: 'box-shadow 400ms cubic-bezier(0.65, 0.05, 0.36, 1)',
  }

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative transition-transform duration-300 ease-out select-none will-change-transform rounded-[4px]',
        className,
      )}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        ...oliveGlowStyle,
      }}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 ease-out rounded-[4px] mix-blend-overlay"
        style={glareStyle}
      />
      <div style={{ transform: 'translateZ(12px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  )
}
