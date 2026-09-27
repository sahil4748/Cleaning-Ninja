import { SERVICE_CATALOGUE } from './service-catalogue'
import { PACKAGES } from './packages'
import { resolveMedia } from './media'
import { FEATURES } from './features'
export const homeServices = SERVICE_CATALOGUE.filter(service => service.enabled).map(service => ({ ...service, image: resolveMedia(service.cardMediaKey) }))
export const packages = FEATURES.packages ? PACKAGES.filter(item => item.enabled).map(item => ({ ...item, image: resolveMedia(item.mediaKey) })) : []
export const homepageFaq = [
  ['How do I get a quote?', 'Choose a service or package, then share your suburb and a few details in the form below. Pricing and scope are discussed as part of your quote.'],
  ['Can I request a preferred date?', 'Yes. Add a preferred date and time to your enquiry. This is a request, not a confirmed booking or an indication of availability.'],
  ['Do you service my Brisbane suburb?', 'Enter your suburb or address with your request so coverage can be checked. A Brisbane location does not automatically confirm service eligibility.'],
  ['Are package prices fixed?', 'The selected packages are starting points for your enquiry. Pricing, inclusions and suitability need to be confirmed in your quote.'],
]
// No placeholder review content is imported. Publish only after evidence approval.
export type ApprovedReview = { id: string; quote: string; attribution: string; sourceUrl: string; approved: true }
export const approvedHomepageReviews: ApprovedReview[] = []
