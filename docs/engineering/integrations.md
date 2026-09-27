> Historical phase record. Current scope is in [current phase](../execution/current-phase.md); implemented durable storage/email and activation limitations are in [lead operations](../architecture/lead-operations.md). Statements below about missing persistence or unpublished branch describe the earlier checkpoint.

# Integration inventory

| Integration | Observed state |
|---|---|
| Email application delivery | Not implemented. Resend example is commented in /api/quote; resend not installed. No SMTP/Titan API client found. |
| Business mailbox | contact@cleaningninja.co on GoDaddy Professional Email/Titan, owner-confirmed; no mailbox access tested. |
| Booking/calendar/payment | Local choices and simulated reference; no external scheduling, payment or availability client. |
| Contact/careers | Client-side timer followed by success; no network/durable handoff. |
| CRM/database/storage | No implementation found. |
| Analytics | No SDK, tag, measurement ID or event dispatcher found in tracked application source. Dashboard-injected configuration unknown. |
| Media | Next image optimizer permits Pexels, Unsplash, Giphy; actual asset references inventory provided separately. |
| Fonts | Google fonts fetched at build through next/font and emitted as local WOFF2. |
| Maps/reviews/social | Hardcoded schema URLs/data; not API integrations. |
| AI/chat/voice | None found. |

Environment NAMES only: `CI` used by Playwright; `RESEND_API_KEY` appears only in commented example/historical deployment docs. `NEXT_TELEMETRY_DISABLED` used only by this local audit. No tracked .env template found. Untracked local/deployed values were not opened, printed or copied. External deployment environment names remain unknown. DNS setup does not implement application email delivery.
