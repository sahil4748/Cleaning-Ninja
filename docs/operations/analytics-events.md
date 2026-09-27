# Analytics status and proposed events

Observed: no analytics dependency, script or tracked custom events found. Privacy page nevertheless claims Google Analytics usage. Vercel dashboard-injected analytics and historical reporting are unknown. No analytics was enabled or changed.

Proposed event contract, not implemented or approved:

| Event | Trigger | Allowed context |
|---|---|---|
| quote_start | User begins quote | route, service slug |
| quote_step_complete | Valid step advances | step name, service slug |
| lead_submit_attempt | Submit starts | form type, route |
| lead_accepted | Server durably accepts lead | form type, non-identifying status |
| lead_submit_failed | Acceptance fails | bounded error code |
| contact_action | Email/phone action | channel, route |

Never send names, email, phone, address, free text, access codes or URL query values containing personal data. Define consent/retention and reliable server acceptance before counting conversions. Current simulated success must not fire lead_accepted.
