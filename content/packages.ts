import type { MediaKey } from './media'
export interface Package {
  id: string; name: string; service: string; mediaKey: MediaKey; detail: string
  enabled: boolean; price: number | null; discount: number | null; terms: string | null
  expiry: string | null; eligibility: string | null; commercialEnabled: boolean
}
const concepts = [
  { name: '3-bedroom carpet', service: 'carpet-cleaning', mediaKey: 'package1', detail: 'A reset for the rooms you return to.' },
  { name: '5-bedroom carpet', service: 'carpet-cleaning', mediaKey: 'package2', detail: 'Room to room. One simple enquiry.' },
  { name: '3 rugs', service: 'carpet-cleaning', mediaKey: 'package3', detail: 'For the pieces that bring a room together.' },
  { name: '5-seat fabric lounge', service: 'upholstery-cleaning', mediaKey: 'package4', detail: 'Make space for your everyday.' },
  { name: '5-seat leather lounge', service: 'leather-cleaning', mediaKey: 'package5', detail: 'A little attention for your favourite seat.' },
] as const
export const PACKAGES: readonly Package[] = concepts.map(item => ({
  ...item, id: item.name.replaceAll(' ', '-'), enabled: true,
  price: null, discount: null, terms: null, expiry: null, eligibility: null, commercialEnabled: false,
}))
export function getPackage(id: string) { return PACKAGES.find(item => item.id === id) }
