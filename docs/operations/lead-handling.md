> Historical phase record. Current scope is in [current phase](../execution/current-phase.md); implemented durable storage/email and activation limitations are in [lead operations](../architecture/lead-operations.md). Statements below about missing persistence or unpublished branch describe the earlier checkpoint.

# Lead handling foundation

2026-09-22. Authority: ../product/owner-decisions.md. No CRM, durable storage, email delivery, acknowledgement, calendar or payment provider has been implemented.

`lib/lead-contract.ts` defines schema v1 for website, AI chat, web voice and phone voice; quote/booking/callback/contact intent; required name, phone and suburb/address; optional email, description, service and city; booking-only preferred calendar date/time plus Australian IANA time zone. Preference is not an availability claim. Service should be context-prefilled or a lightweight selection, not a qualification gate. Future form is one screen/one step. Careers recruitment remains a separate purpose/contract.

`POST /api/quote` validates and limits request bodies, returns 400 for invalid data, 413 for excessive size and 503 for valid-but-unaccepted data. It never reports receipt or logs customer bodies. Existing contact, careers and booking prototypes retain values and explain that nothing was sent. No conversion/acknowledgement on these failures.

## Recommended later implementation

Evaluate managed relational storage (preferred when lead history, deduplication and an outbox need transactions) against a durable managed document store (simpler flexible records, but verify transaction/idempotency semantics). A durable queue can buffer work but needs a deliberate authoritative record/retention design; email/mailboxes must not be the database. No vendor or CRM selected and no service provisioned.

Acceptance sequence: validate/minimise → enforce abuse controls → idempotently commit lead and notification work → return durable record ID → retry notifications independently. Distinguish durable acceptance from email delivery. Add server-issued timestamps, deduplication/idempotency, least-privilege access, retention/deletion policy, redacted observability, retry/dead-letter handling and provider outage tests in that sprint.

Business recipients (server configuration only): contact@cleaningninja.co; vtsaima@gmail.com; sk509716@gmail.com. No messages sent. Automatic acknowledgement recommended only after durable commit and only on an available contact channel, saying “We've received your request.” No booking confirmation without scheduling confirmation. Human follow-up usually 24–48 hours, configurable; not guaranteed. Phone control must later support ordinary call + AI voice once a genuine number exists.

Release dependencies: approved privacy/legal text, storage region/retention/access decisions, spam/rate limiting, delivery/retry verification, monitoring and actual one-step UX. Current form layouts are prototypes, not the agreed final flow.
