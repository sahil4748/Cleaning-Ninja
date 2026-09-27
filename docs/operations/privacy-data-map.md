> Historical phase record. Current scope is in [current phase](../execution/current-phase.md); implemented durable storage/email and activation limitations are in [lead operations](../architecture/lead-operations.md). Statements below about missing persistence or unpublished branch describe the earlier checkpoint.

# Current readiness override — 2026-09-22

See lead-handling.md. Requests are not persisted or acknowledged. The quote API no longer logs bodies and fails closed. Contact/careers/book retain input on not-sent outcomes. Historic observations below describe the foundation baseline only.

# Observed privacy/data map

| Entry | Fields | Current handling | Gap |
|---|---|---|---|
| /book | service, size, city, suburb, date/time, cleaner, name, email, phone, address, notes | React state; local random reference | No persistence/delivery; notes encourage access codes |
| /contact | name, email, optional phone, city, topic, message | RHF state; timer; reset | No delivery; data lost after simulated success |
| /careers | name, email, phone, city, experience, about | RHF state; timer; reset | No delivery; hiring/access/retention owner unknown |
| /api/quote POST | arbitrary JSON body | console.log of entire body; success response | Unvalidated public sink; log exposure, no rate limiting/auth or durable store |
| Media/fonts | image requests and build-time font fetch | Next image optimisation/local emitted fonts | Upstream rights, caching and deployment logs unknown |

No application cookies, local/session storage, payment fields, database or real analytics integration found. Framework/platform logs can still exist; their access and retention were not inspected. Existing privacy copy claims analytics, processors and retention behavior not evidenced by code. This is a technical map, not legal validation. Use synthetic data only for local checks. Future data minimisation, consent, processors and retention need owner review.
