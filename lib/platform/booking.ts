/** Confirmation requires a future trusted availability integration. No transition to confirmed exists here. */
export type RequestState = 'draft' | 'quote_requested' | 'quote_acknowledged' | 'booking_requested' | 'availability_pending' | 'cancelled'
export type BookingState = RequestState | 'booking_confirmed'
export interface ConfirmedBooking { state: 'booking_confirmed'; bookingId: string; availabilityReference: string; confirmedAt: string }
const transitions: Record<RequestState, readonly RequestState[]> = {
  draft: ['quote_requested', 'booking_requested', 'cancelled'],
  quote_requested: ['quote_acknowledged', 'cancelled'],
  quote_acknowledged: ['booking_requested', 'cancelled'],
  booking_requested: ['availability_pending', 'cancelled'],
  availability_pending: ['cancelled'], cancelled: [],
}
export function canTransition(from: RequestState, to: BookingState) { return (transitions[from] as readonly string[]).includes(to) }
export function initialRequestState(intent: 'quote' | 'booking' | 'contact' | 'callback'): RequestState {
  return intent === 'booking' ? 'booking_requested' : intent === 'quote' ? 'quote_requested' : 'draft'
}
