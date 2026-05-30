/**
 * Cleaning Ninja — transparent flat-rate pricing.
 *
 * The competitive differentiator. Maid2Match-style on-page matrix.
 * Prices in AUD, GST included. Melbourne is 15% cheaper than Sydney; Adelaide is 20% cheaper.
 *
 * NOTE: dummy data for now per the redev plan; real backend integration deferred.
 */

export type PropertySize = '1br1ba' | '2br1ba' | '2br2ba' | '3br2ba' | '4br2ba' | '5br3ba'

export interface PriceRow {
  size: PropertySize
  label: string
  /** AUD prices keyed by city slug. */
  prices: Record<string, number>
}

export const REGULAR_CLEAN_MATRIX: PriceRow[] = [
  {
    size: '1br1ba',
    label: '1 bed, 1 bath',
    prices: { sydney: 139, melbourne: 129, brisbane: 125, perth: 129, adelaide: 119, 'gold-coast': 129 },
  },
  {
    size: '2br1ba',
    label: '2 bed, 1 bath',
    prices: { sydney: 169, melbourne: 159, brisbane: 155, perth: 159, adelaide: 145, 'gold-coast': 155 },
  },
  {
    size: '2br2ba',
    label: '2 bed, 2 bath',
    prices: { sydney: 189, melbourne: 175, brisbane: 175, perth: 179, adelaide: 159, 'gold-coast': 175 },
  },
  {
    size: '3br2ba',
    label: '3 bed, 2 bath',
    prices: { sydney: 229, melbourne: 209, brisbane: 199, perth: 215, adelaide: 189, 'gold-coast': 205 },
  },
  {
    size: '4br2ba',
    label: '4 bed, 2 bath',
    prices: { sydney: 289, melbourne: 265, brisbane: 249, perth: 269, adelaide: 235, 'gold-coast': 255 },
  },
  {
    size: '5br3ba',
    label: '5 bed, 3 bath',
    prices: { sydney: 359, melbourne: 329, brisbane: 309, perth: 339, adelaide: 289, 'gold-coast': 319 },
  },
]

export const END_OF_LEASE_MATRIX: PriceRow[] = [
  {
    size: '1br1ba',
    label: '1 bed, 1 bath',
    prices: { sydney: 295, melbourne: 269, brisbane: 245, perth: 265, adelaide: 225, 'gold-coast': 255 },
  },
  {
    size: '2br1ba',
    label: '2 bed, 1 bath',
    prices: { sydney: 365, melbourne: 335, brisbane: 305, perth: 329, adelaide: 285, 'gold-coast': 319 },
  },
  {
    size: '2br2ba',
    label: '2 bed, 2 bath',
    prices: { sydney: 425, melbourne: 389, brisbane: 355, perth: 379, adelaide: 329, 'gold-coast': 369 },
  },
  {
    size: '3br2ba',
    label: '3 bed, 2 bath',
    prices: { sydney: 525, melbourne: 479, brisbane: 435, perth: 465, adelaide: 399, 'gold-coast': 449 },
  },
  {
    size: '4br2ba',
    label: '4 bed, 2 bath',
    prices: { sydney: 675, melbourne: 619, brisbane: 559, perth: 595, adelaide: 515, 'gold-coast': 579 },
  },
  {
    size: '5br3ba',
    label: '5 bed, 3 bath',
    prices: { sydney: 875, melbourne: 799, brisbane: 729, perth: 769, adelaide: 669, 'gold-coast': 749 },
  },
]

export const CARPET_MATRIX = [
  { rooms: 1, label: '1 room', price: 49 },
  { rooms: 2, label: '2 rooms', price: 89 },
  { rooms: 3, label: '3 rooms', price: 119 },
  { rooms: 4, label: '4 rooms', price: 149 },
  { rooms: 5, label: '5 rooms', price: 179 },
  { rooms: 6, label: '6+ rooms', price: 199 },
]

export const UPHOLSTERY_MATRIX = [
  { type: '1-seater', label: '1-seater', price: 65 },
  { type: '2-seater', label: '2-seater', price: 99 },
  { type: '3-seater', label: '3-seater', price: 129 },
  { type: '4-seater', label: '4-seater + chaise', price: 169 },
  { type: 'sectional', label: 'Sectional / corner', price: 219 },
  { type: 'mattress-q', label: 'Queen mattress', price: 89 },
]

export const TILE_GROUT_MATRIX = [
  { area: '0-10', label: 'Up to 10 m²', price: 99 },
  { area: '11-25', label: '11–25 m²', price: 199 },
  { area: '26-50', label: '26–50 m²', price: 349 },
  { area: '51-100', label: '51–100 m²', price: 549 },
  { area: 'sealing', label: 'Grout sealing (add-on)', price: 4 },
]

export const PRICING_TABS = [
  { id: 'regular', label: 'Regular clean', matrix: REGULAR_CLEAN_MATRIX },
  { id: 'eol', label: 'End-of-lease', matrix: END_OF_LEASE_MATRIX },
] as const
