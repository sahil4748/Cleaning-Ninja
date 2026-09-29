# Durable lead + email operations

Current Supabase migration, runtime choice and outstanding activation evidence: [Supabase activation](../operations/supabase-activation.md). The record below describes the original implementation checkpoint.

2026-09-27 · rebuild-2026. Implementation complete; production activation blocked on configuration and operational checks. Homepage visuals remain UNAPPROVED. No deployment, DNS change, live email or real lead test was performed.

## Infrastructure and choice

The prior canonical Zod schema, lead service, booking state policy, notification interface and homepage client were retained. Repository dependencies and available local environment names showed no database, CRM, SMTP client, transactional-email credentials or existing persistence infrastructure. No local environment files were found. Remote Vercel secrets/infrastructure were not inspected; their state remains unknown. The owner-confirmed mailbox is not an application transport.

Implemented managed-PostgreSQL-compatible storage using `pg`, without an ORM, a separate queue service or filesystem persistence. One database transaction stores the canonical lead and its email outbox rows. Resend REST is the selected optional transport; it is not activated merely by mailbox existence. No provider account was created. PGlite is a development-only embedded PostgreSQL engine used to execute the migration and transaction SQL with synthetic fixtures.

## Lead lifecycle and storage

`POST /api/quote` bounds the streamed body to 16 KiB, rejects a populated honeypot, validates the canonical strict schema and requires a UUID v4 `Idempotency-Key`. The service validates again, normalises canonical fields and assigns initial request state. The persistence adapter locks the attempt key, checks existing acceptance, applies database-backed rate limits, then inserts the lead and outbox in one transaction. Only COMMIT permits an accepted result. A lost COMMIT response is safely recovered by retrying the unchanged payload/key.

`db/migrations/001_leads.sql` creates:

- `leads`: random UUID reference, unique attempt key, normalised payload fingerprint, server creation/update timestamps, request status, canonical JSONB payload. Payload retains source/page, service/package, name/phone/optional email, suburb/address, description, date/time/timezone preference, attribution and explicitly consented conversation summary. No parallel channel-specific schema.
- `lead_notifications`: one internal job and, only for a supplied email, one acknowledgement job. Includes attempts, lease, next attempt, frozen message, provider reference, safe error category and update timestamp.
- `lead_rate_limits`: short-lived keyed identifiers and counters, cleaned during subsequent accepted attempts.

JSONB contains the existing versioned canonical contract; status and lifecycle metadata are indexed/relational where operationally useful. No arbitrary request headers, raw IPs, transcripts, credentials or client-provided timestamps are stored. A reference is a random UUID, not a database sequence; there is no public lead retrieval endpoint.

## Request and booking status

Stored states support draft, quote_requested, quote_acknowledged, booking_requested, availability_pending and cancelled. `booking_confirmed` is reserved in the status vocabulary but currently forbidden by a separate database CHECK constraint and existing transition policy. Initial booking intent becomes booking_requested only. Future authorised scheduling work must deliberately replace that CHECK and require trusted availability/confirmation evidence. No current route can confirm a booking. Lead state does not represent email delivery.

## Notification and acknowledgement lifecycle

The same transaction creates pending jobs before public acceptance. After commit, the request attempts up to two jobs; a protected recovery endpoint drains four jobs per invocation. Nothing depends on unawaited work after a serverless response. Node runtime, small pool (3 connections per instance), connection/query timeouts, 8-second provider timeout and 60-second route duration are explicit. A provider's pooled connection URL is recommended; confirm deployed runtime/plan supports the duration and connection budget.

Jobs progress pending → processing → provider_accepted. Failed jobs return to pending with exponential delay (60 seconds up to one hour). A two-minute lease plus `FOR UPDATE SKIP LOCKED` prevents concurrent workers claiming the same active job. Interrupted processing becomes eligible again. Eight unsuccessful attempts or 23 hours since the first attempt requires human review. The first provider request body is durably frozen before sending, so later template/sender edits do not change an idempotent retry.

Provider idempotency key is derived from the outbox UUID. Resend keys expire after 24 hours; automatic recovery stops at 23 hours to avoid a blind duplicate after expiry. A crash after provider acceptance but before the database update is recovered using the same key. There is no exactly-once inbox-delivery claim. `provider_accepted` means the provider returned a nonempty message ID; delivery, bounce and complaint status require future webhook/monitoring integration or provider-dashboard review.

Internal plain-text email goes ONLY to contact@cleaningninja.co and contains the reference, UTC submission timestamp, source/intent, service/package, contact details, address, description, requested schedule/timezone, source page, attribution and consented conversation summary when present. Other historic recipient candidates are not used.

Customer email is optional and independent. The Cleaning Ninja sender must be authenticated through Resend; reply-to is contact@cleaningninja.co. The acknowledgement confirms receipt, includes the reference, explicitly says this is not a confirmed booking and makes no response-time promise. Plain-text templates avoid HTML injection. Header recipients are fixed configuration or validated email fields; descriptions and names never enter headers.

## API and failure behaviour

| Situation | HTTP / lead outcome | Notification / UI |
| --- | --- | --- |
| Valid, committed, email accepted | 201 accepted + stable durableId | Provider acceptance recorded; UI confirms receipt |
| Committed, internal email fails or is unconfigured | 201 accepted | Lead remains; outbox pending/retryable; no false email-delivery claim |
| Persistence unavailable, credentials missing, transaction fails | 503 unavailable | No success; fields remain; retry enabled |
| Customer acknowledgement fails | 201 accepted | Independent job retries; internal notification is unaffected |
| Identical key + normalised payload retry | 201 same durableId | No new lead/jobs; due pending jobs may be retried |
| Same key + changed payload | 409 conflict | No overwrite; UI retains data |
| Invalid schema/key or populated honeypot | 400 invalid | No persistence; field messages never echo values |
| Body over 16 KiB | 413 invalid | No persistence |
| Rate exceeded | 429 rate-limited | No lead or outbox inserted |
| Network response lost | Outcome uncertain | Fields and attempt key retained; unchanged retry resolves acceptance |

The homepage uses one in-memory key per normalised payload and a synchronous submission lock. Double clicks are blocked immediately, accepted submit is disabled, unchanged retries reuse the key, and edited submissions receive a new key. No PII or key is saved in local/session storage; a page reload starts a new attempt, so deduplication does not cover manually re-entered submissions after reload. Other future clients must retain/pass the key for their entire attempt.

Success copy: “We've received your request. Your quote request has been sent to Cleaning Ninja. This is not a confirmed booking.” Here “sent” means durable acceptance by the Cleaning Ninja application, not delivery to the mailbox. Explicit failure says “Your request wasn't sent. Your details remain in the form.” Network ambiguity uses “We could not confirm receipt” to avoid incorrectly denying an already committed request.

## Abuse baseline

Strict fields/lengths, 16 KiB streaming cap, UUID attempt keys, hidden honeypot, five new leads per normalised phone per UTC hour and 100 new leads globally per UTC hour. Counters are transactional/shared across instances; idempotent replays bypass new-lead quotas. Phone buckets use HMAC with an independent secret and expire after two hours (physical cleanup on later submissions). No raw IP trust assumptions. Timing heuristics and CAPTCHA were not added because of autofill/accessibility false positives.

This is a lightweight baseline, not comprehensive DDoS protection: varied phones can consume the global quota, and invalid requests reach validation before any database limit. Tune limits from operational evidence and configure provider edge protections separately if abuse warrants it. Such infrastructure changes are not part of this sprint.

## Privacy, logging and access

No payload/phone/address/description is logged. Exceptions return safe categories; notification last_error records only delivery_attempt_failed or retry_window_exhausted. Idle database failures log a fixed category only. SQL is parameterised. Credentials stay server-side. Recovery route uses a constant-time bearer-secret check and exposes counts/status only, never lead content. No public listing/admin endpoint exists.

Database administrators and provider dashboards contain personal data; restrict access to authorised lead operators. Provision encrypted storage/backups and verified TLS. Use separate preview and production databases/keys; never use production recipients for automated tests. Agree a retention/deletion policy before launch, including outbox message snapshots, provider-held messages and backups. Lead deletion cascades to notifications. Legal/privacy copy and retention remain operational approval work, not silently approved here.

## Environment variables

All names are server-only, with empty placeholders in `.env.example`. Never prefix with NEXT_PUBLIC.

| Name | Classification | Requirement |
| --- | --- | --- |
| LEAD_DATABASE_URL | Required for persistence | Managed PostgreSQL connection URL, appropriate region, verified TLS (e.g. provider-supported verify-full), pooled endpoint where needed |
| LEAD_RATE_LIMIT_SECRET | Required for persistence | Independent cryptographically random secret, minimum 32 characters; stable across instances |
| RESEND_API_KEY | Required for email | Restricted sending API key from the configured Resend account |
| LEAD_EMAIL_FROM | Required for email | Bare provider-verified sender email; rendered as Cleaning Ninja &lt;address&gt; |
| LEAD_WORKER_SECRET | Required for automatic recovery | Independent random secret, minimum 32 characters; scheduler sends Authorization: Bearer value |
| VERCEL_ENV | Existing platform-managed | Existing release guard continues blocking unapproved production |
| NODE_ENV | Framework-managed | No test bypass changes persistence or success rules |
| CI / TZ | Existing optional test settings | Playwright CI policy / timezone fixtures |

No runtime test-mode variable or fallback memory store can activate simulated success. PGlite and injected fake senders are test-only imports, not application modes.

## Manual activation and operational recovery

1. Provision or identify an approved managed PostgreSQL database. Back up an existing target first. Apply `db/migrations/001_leads.sql` once through an authorised SQL console/migration runner. Do not use serverless local disk. Use a separate migration-owner role; runtime role needs SELECT/INSERT/UPDATE/DELETE on these three tables and no schema ownership/DDL.
2. Set persistence variables separately per deployment environment. Confirm TLS certificate validation, backup/restore, region, runtime version and provider connection limits. No schema migration runs automatically at app startup.
3. Configure Resend application transport and set RESEND_API_KEY and LEAD_EMAIL_FROM. Existing Titan/GoDaddy mailbox credentials are not Resend credentials. Verify the sender/domain in the provider. If provider verification needs DNS records, obtain separate authorised DNS work; inspect existing records, preserve MX/SPF/DMARC and never add duplicate SPF. This sprint made no DNS change.
4. Set LEAD_WORKER_SECRET. Configure an authenticated scheduler to POST `/api/internal/lead-notifications` every minute, with the bearer header, no request body. No scheduler was provisioned and no unauthenticated GET/cron endpoint exists. Missing email config returns not-configured and leaves jobs pending; database failures return 503. Monitor scheduler responses.
5. Operators must monitor pending age, review_required jobs, provider dashboard bounces and new unhandled leads. Example safe monitoring SQL: `SELECT status, count(*), min(updated_at) FROM lead_notifications GROUP BY status;` Lead work queue: `SELECT id, status, created_at FROM leads ORDER BY created_at;` Fetch contact details only through protected operator access when needed.
6. For ordinary pending jobs, restore configuration/provider service and invoke the protected endpoint; the original job/key is reused. Do not reset accepted jobs. For review_required jobs, inspect provider history by stored provider_id and key `lead-<outbox UUID>`; resolve whether a send occurred. If accepted, reconcile status/provider ID. If still uncertain, handle the lead manually; never blindly reset the retry window. A deliberate new message after confirmed non-delivery requires an operator-managed new job identity and audit record in a later recovery tooling sprint. Current unique lead/kind constraint prevents accidental replacement jobs.
7. Before production enablement, run an authorised staging end-to-end test with controlled test recipients: browser → API → deployed database → provider → receipt, plus outage and scheduled recovery. Current tests do not certify hosted concurrency, TLS, actual inbox delivery or scheduler operation.

## Future channels

Homepage, service-page, package, booking-flow, ai-chat, ai-voice and callback use the same LeadSchema, createLeadService boundary and PostgreSQL adapter. Existing quote-form/phone sources remain compatible. Source metadata is caller attribution, not authentication. Future AI/voice callers require authenticated tool gating and explicit summary consent; no raw audio/transcripts are introduced. No new UI or lead endpoint for these channels was built. Existing legacy acquisition forms remain unavailable pending separately authorised migration.

## Files and verification

New: `.env.example`, `db/migrations/001_leads.sql`, `lib/platform/lead-store.ts`, `lib/platform/email.ts`, `app/api/internal/lead-notifications/route.ts`, `tests/unit/lead-operations.test.ts`, `tests/unit/isolated-environment.ts`, this document.

Updated in this sprint: `lib/lead-contract.ts`, `lib/platform/{lead-service,lead-client,notifications}.ts`, `app/api/quote/route.ts`, `components/homepage/QuoteForm.tsx`, `package.json`, `package-lock.json`, `tests/{homepage,platform}.spec.ts`, `tests/unit/{readiness,platform}.test.ts`, `playwright.config.ts`, `docs/product/owner-decisions.md`, `docs/execution/current-phase.md`. Pre-existing unrelated dirty work was preserved.

Validation results are recorded in the final sprint report below. Existing platform/readiness unit coverage includes all canonical sources, invalid service/package, optional fields and booking separation. New SQL coverage exercises migration, atomic lead/outbox rollback, persisted context, duplicate/conflict, rate limits, internal/ack failures, successful recovery with the same keys, retry expiry and database confirmation denial. Email transport tests use injected local responses only. Browser accepted-response fixtures test rendering, not actual provider delivery.

## Production blockers and next sprint

Database provisioning/migration/access/backup checks; authenticated email transport and sender verification; recovery scheduler, monitoring and operational ownership; authorised staging delivery/recovery/concurrency verification; retention/privacy approval; runtime pinning. Dependency installation reports seven audit findings (1 low, 1 moderate, 4 high, 1 critical); no broad dependency remediation was attempted in this scoped sprint. Prior release blockers remain, including unapproved homepage design and unverified internal-page content. Production release guard stays active.

Recommended next sprint: controlled staging activation and operational acceptance (including protected lead handling/recovery tools, monitoring and delivery evidence). No final booking UI, AI chat/voice, visual redesign or production release is implied.

Documentation references used: [node-postgres transactions](https://node-postgres.com/features/transactions), [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [PGlite API](https://pglite.dev/docs/api).

## Final validation — Durable Lead + Email Report

- Typecheck: passed (`npm run typecheck`).
- Lint: passed, 0 errors and 70 existing warnings (`npm run lint`).
- Unit tests: 20 passed (`npm run test:unit`), including actual PostgreSQL SQL through the embedded test engine.
- Playwright: 27 passed (`npm run test:e2e`) against an isolated production server on port 8136, reuse disabled. The first run exposed an ambiguous new test selector; it was scoped to the quote form and the complete rerun passed.
- Production build: passed (`npm run build`), 99 generated pages including framework/metadata routes.
- Content check: passed in existing warn-only mode, four existing medium warnings; release check remains preview-only.
- `git diff --check`: passed.

No hosted database, actual provider delivery, scheduler activation or multi-instance load/concurrency test was claimed. Browser success rendering used an explicitly synthetic response fixture; durable acceptance/outbox behaviour was verified separately against embedded PostgreSQL. Automated test environments explicitly clear live service credentials. Existing files modified during earlier sprints remain uncommitted and were preserved.
