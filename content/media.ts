export const MEDIA = {
  hero: {
    desktop: { poster: '/homepage/hf_20260927_084053_c4d57005-0833-4641-8846-09f8f6cd3cb8.png', video: '/homepage/h03-desktop-3e804515.mp4' },
    mobile: { poster: '/homepage/hf_20260928_141125_f8371d19-347d-4146-b77d-d6a2fca54758.png', video: '/homepage/hf_20260929_060509_51d77e97-b0bc-4cc4-a2c7-b08c143f2a85.mp4' },
  },
  images: {
    package5: '/homepage/packages/p-05-060ebece-01da-49bc-88d1-967107a2bff8.webp',
    package4: '/homepage/packages/p-04-82434806-ce85-4141-9548-2dd42e671185.webp',
    package3: '/homepage/packages/p-03-977231f3-8fa3-4a09-bcfa-a0549a7bc974.webp',
    package2: '/homepage/packages/p-02-49e771be-249d-40bc-9d1e-80381f9e1d14.webp',
    package1: '/homepage/packages/p-01-05ac7bf1-788d-40aa-93aa-0a5f5233e637.webp',
    interior: '/homepage/hero-desktop.jpg', mobileInterior: '/homepage/hero-mobile.jpg',
    carpet: '/homepage/carpet.jpg', tile: '/homepage/tile.jpg', leather: '/homepage/leather.jpg',
  },
} as const
export type MediaKey = keyof typeof MEDIA.images
export function resolveMedia(key?: string | null): string {
  return key && Object.hasOwn(MEDIA.images, key) ? MEDIA.images[key as MediaKey] : MEDIA.hero.desktop.poster
}
export function heroMedia(device: 'desktop' | 'mobile') { return MEDIA.hero[device] }
