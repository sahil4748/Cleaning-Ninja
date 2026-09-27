> Historical foundation inventory. Current owner decisions are in owner-decisions.md; retained services are now active for planning, Brisbane is primary, and technical-readiness.md under docs/engineering records runtime repairs. Prices, exact coverage and proof remain unverified.

# Existing business/content inventory

Source inventory only. Unless verified-business-facts.md says VERIFIED, these strings are not confirmed business facts. Preserve approved source during foundation.

## Services

| Service | Slug | Displayed starting price | Detail route |
|---|---|---:|---|
| End-of-Lease Clean | end-of-lease-cleaning | AUD 295 | /services/end-of-lease-cleaning |
| Carpet Steam Clean | carpet-cleaning | AUD 49/room | /services/carpet-cleaning |
| Upholstery Care | upholstery-cleaning | AUD 89 | /services/upholstery-cleaning |
| Tile & Grout | tile-grout-cleaning | AUD 9/m² | /services/tile-grout-cleaning |
| Leather Care | leather-cleaning | AUD 149 | /services/leather-cleaning |
| Pressure Washing | pressure-washing | AUD 189 | No dedicated page; booking catalogue |
| Window Cleaning | window-cleaning | AUD 89 | No dedicated page; booking catalogue |
| Oven Deep Clean | oven-cleaning | AUD 99 | No dedicated page; booking catalogue |
| Airbnb Turnaround | airbnb-turnaround | AUD 119 | No dedicated page; booking catalogue |
| Regular Home Clean | regular-home | AUD 129 | No dedicated page; booking catalogue |

All listed inclusions, methods and duration bands (1–8 hours by service) require business confirmation. Catalogue also mentions commercial/strata, post-build and NDIS enquiries without dedicated service routes. Price data differs by catalogue, matrices and local benchmarks. No verified promotional offer or discount found; PricingPreview is a matrix, not an approved deal.

## Service areas

- Sydney (`sydney`): Bondi, Surry Hills, Newtown, Manly, Parramatta, Chatswood, Mosman, Marrickville, Paddington, Randwick.
- Melbourne (`melbourne`): Carlton, Fitzroy, Richmond, St Kilda, South Yarra, Brunswick, Brighton, Footscray, Hawthorn, Toorak.
- Brisbane (`brisbane`): New Farm, Paddington, West End, Toowong, Bulimba, Hamilton, Kelvin Grove, Indooroopilly, The Gap, Carindale.
- Perth (`perth`): Cottesloe, Subiaco, Fremantle, Joondalup, Scarborough, Leederville, Mount Hawthorn, Mosman Park, Claremont, Nedlands.
- Adelaide (`adelaide`): North Adelaide, Glenelg, Norwood, Unley, Prospect, Burnside, Henley Beach, Mile End, Stepney, Walkerville.
- Gold Coast (`gold-coast`): Burleigh Heads, Mermaid Beach, Broadbeach, Main Beach, Palm Beach, Coolangatta, Surfers Paradise, Robina, Currumbin, Bundall.

## Reviews, team and editorial

- 12 explicitly dummy review records, mostly five stars, hardcoded aggregate count 1,247. No live feed/API. Reviews appear on home, reviews and location pages and in structured data.
- Eight named team profiles with roles, city/suburb coverage, tenure and specialties; photos explicitly Pexels stock. Names/biographies unverified.
- Six journal slugs: end-of-lease-cleaning-sydney-2026; end-of-lease-cleaning-qld-tenants; eco-cleaning-products-that-actually-work; ndis-cleaning-explained; airbnb-host-clean-between-guests-checklist; carpet-care-how-often-is-too-often. Bodies explicitly unfinished placeholders.
- Homepage BeforeAfter has four simulated pairs; gallery has twelve simulated records. Source uses filtered versions of the same stock image.

## Contact and booking

- Owner-approved email: contact@cleaningninja.co (VERIFIED). Application still uses hello@cleaningninja.com.au; commented API example also names quotes@cleaningninja.co and hello@cleaningninja.co, neither an implemented sender/recipient.
- Display phone 1300 NINJAS, dial target 1300646527 (NEEDS_VERIFICATION). Six placeholder city phones are enumerated in claims register. Schema converts the 1300 number into +611300646527; international reachability is unverified.
- Booking: service → size → city/suburb → preferred date/time → cleaner → details → confirmation. Local estimate and reference only.
- Homepage estimator: service/property/city → /book query; property is passed but ignored by booking page. City and service defaults exist; suburb landing links use slugs while test uses display text.
- Contact and careers: client validation then simulated submission, no endpoint. No verified working online lead delivery.
- ABN, NDIS, credentials, guarantees, response times, eco claims and legal promises are classified in claims register. No verified operating hours or physical offices supplied.
