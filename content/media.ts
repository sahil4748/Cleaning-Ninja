export const MEDIA = {
  hero: {
    desktop: { poster: '/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png', video: '/homepage/h03-desktop-3e804515.mp4' },
    mobile: { poster: '/homepage/hf_20260928_141125_f8371d19-347d-4146-b77d-d6a2fca54758.png', video: null as string | null },
  },
  images: {
    interior: '/homepage/hero-desktop.jpg', mobileInterior: '/homepage/hero-mobile.jpg',
    carpet: '/homepage/carpet.jpg', tile: '/homepage/tile.jpg', leather: '/homepage/leather.jpg',
  },
} as const
export type MediaKey = keyof typeof MEDIA.images
export function resolveMedia(key?: string | null): string {
  return key && Object.hasOwn(MEDIA.images, key) ? MEDIA.images[key as MediaKey] : MEDIA.hero.desktop.poster
}
export function heroMedia(device: 'desktop' | 'mobile') { return MEDIA.hero[device] }
