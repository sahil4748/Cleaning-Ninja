import { redirect } from 'next/navigation'

/**
 * /our-standard is consolidated into /about as part of the Phase B redev.
 * Keep the route for any inbound links and 308 to /about.
 */
export default function OurStandardRedirect() {
  redirect('/about')
}
