# Supabase activation

2026-09-29 · `rebuild-2026` · base `541660d` · **local application-to-Supabase activation verified; email and deployment remain separate**.

The final continuation below is the current verification checkpoint. Earlier configuration follow-ups are historical troubleshooting records.

## Database

Connected MCP verified **Cleaning Ninja**, project `tadxezdtnhabnfaiieto`, region `ap-south-1`, healthy PostgreSQL 17.6. No public application tables or migration history existed before this sprint.

Applied the repository's `db/migrations/001_leads.sql` through Supabase `apply_migration`, recorded as `20260929034327_cleaning_ninja_001_leads`. The only schema addition was enabling RLS on its three public tables before first application. No replacement model, SDK or public access policy was added. Do not reapply it to this project; check migration history and the actual schema first on any other target.

Direct catalog inspection verified `leads`, `lead_notifications`, `lead_rate_limits`, all six indexes, UUID keys, unique idempotency key, unique lead/kind outbox identity, cascading foreign key, status checks, pending defaults and timestamp columns. At the initial checkpoint all three tables were empty. The successful hosted verification below supersedes that checkpoint.

RLS is enabled with no policies, intentionally denying browser roles. `anon` and `authenticated` have neither superuser nor bypass-RLS privileges. Supabase's default table grants remain subject to RLS. The security advisor returned only three informational [RLS enabled without policy notices](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), expected for these server-only tables. The migration owner is `postgres`; an ordinary runtime role requires explicitly scoped access policies as well as grants. Do not grant public access to make the application work.

## Runtime configuration

Keep the existing Node.js route and `pg.Pool` abstraction (`max: 3`, 10-second idle timeout). Choose the dashboard's **Supavisor session pooler, port 5432**, for compatibility with the existing driver's startup `statement_timeout`. Queries are unnamed and locks are transaction-scoped, but transaction mode does not preserve session settings. Moving to port 6543 requires deliberate timeout handling and hosted verification. Direct connections would require suitable network/IPv6 reachability and consume dedicated connections. Session pooling still requires a deployment concurrency/connection-budget check before release.

Sources: [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [session timeouts](https://supabase.com/docs/guides/database/postgres/timeouts). The local application now connects to hosted Supabase with verified TLS. A deployed Vercel runtime has not been verified.

Configure locally in ignored `.env.local`; later configure the corresponding server-only variables in the intended Vercel project's environment settings. This sprint did not change Vercel or deploy.

| Variable | Required value |
| --- | --- |
| `LEAD_DATABASE_URL` | This project's dashboard-issued session-pooler PostgreSQL URI, actual database password correctly URL-encoded, port 5432, `sslmode=verify-full`; install the provider CA if needed, never disable certificate validation |
| `LEAD_RATE_LIMIT_SECRET` | Independent cryptographically random value of at least 32 characters, stable across instances |
| `LEAD_WORKER_SECRET` | Separate cryptographically random value of at least 32 characters for authenticated recovery |

All three were absent at the initial verification. The local configuration follow-up below records the current state. MCP authorization does not supply the application's database password. Do not paste or commit credentials, use `NEXT_PUBLIC` names, or substitute a Supabase API key for a PostgreSQL password.

## Verification and remaining gate

- Server validation now enforces service and description for homepage/package enquiries, alongside name, phone and suburb/address. Other channel contracts remain compatible. Email and booking date/time remain optional; no automatic city attribution was added.
- Typecheck, production build and content checks passed. Lint: zero errors, 70 existing warnings. Build content scan retains four existing medium warnings.
- All 23 unit tests passed. They verify real embedded PostgreSQL transactions, lead/outbox rollback, duplicate/conflicting keys, separate enquiries, five-per-phone rate limits, retry selection and recovery. These are **not hosted Supabase lifecycle evidence**.
- Four focused Playwright checks passed on isolated port 8136 with live credentials disabled: actual unavailable API, input retention, required fields, and browser retry behavior. Accepted browser responses in retry tests are fixtures, not proof of persistence.
- Browser artifact scan: 33 JavaScript files, no server-secret variable names, PostgreSQL URI markers or database adapter error marker. Application logs use safe categories; no lead payload logging was added. Database settings showed DDL logging only, duration logging off, error parameter logging off. No hosted application request was available to inspect.
- Build and browser startup initially hit sandbox `EPERM`; approved elevated reruns passed. Browser runner emitted only the existing colour-environment warnings. The public changelog download initially hit an automatic-review usage limit, then succeeded on an approved retry. Its PostgreSQL 17.11 breaking-change entry concerns extension/custom-operator features absent from this lead schema. Current connection docs were retrieved through Context7.

The initial hosted-verification gate described here is now satisfied by the successful run below. Full email delivery/retry verification and deployed-runtime readiness remain separate gates.

## Email and recovery boundary

Leave `RESEND_API_KEY` and `LEAD_EMAIL_FROM` unset. The protected `POST /api/internal/lead-notifications` endpoint returns `not-configured` before claiming jobs when email is absent. Embedded SQL tests exercise due selection, leases, retry backoff and expiry using injected senders; synthetic provider acceptance exists only in the isolated test database. No hosted job was marked accepted or delivered.

The next separately authorised email sprint needs a verified sender, restricted provider key, controlled recipients, actual provider/receipt evidence, worker scheduling, monitoring and operational ownership. No email, scheduler, DNS, deployment, merge or cinematic changes were made here.

## Local configuration follow-up — 2026-09-29

Configured `.env.local` on `rebuild-2026` with the supplied project session-pooler endpoint, port 5432 and `sslmode=verify-full`. The supplied URI contained only a password placeholder, so no authenticated connection was attempted. Replace that placeholder locally with the percent-encoded database password; do not put it in chat or Git. The URI is not operational until that value is supplied.

Generated independent 32-byte cryptographically random values for `LEAD_RATE_LIMIT_SECRET` and `LEAD_WORKER_SECRET` (64 hexadecimal characters each). Verified owner-only file mode `0600`, an applicable Git ignore rule, and absence from the Git index. Values were never printed. Email configuration remains absent from this file.

Current verification: production build and typecheck passed; 23/23 unit tests and 4/4 focused Chromium checks passed. Browser tests ran on isolated port 8136 with database and email variables explicitly disabled. Accepted responses in retry tests remain fixtures. Lint passed with 0 errors and 70 existing warnings. Content scan passed in warning-only mode with **five** medium findings (the earlier report recorded four). Browser/server test output contained colour-environment warnings. Scanned all 33 generated browser JavaScript files for the configured values, server-secret variable names, PostgreSQL URI marker and database connection error marker: zero matches. `git diff --check` passed.

Hosted connectivity/TLS, application persistence, replay/conflict handling, hosted rate limits and recovery remain unverified pending the actual database password. No migration was reapplied, hosted enquiry submitted, email sent, commit/push performed, or deployment made in this follow-up.

## Password and TLS follow-up — 2026-09-29

The owner confirmed surrounding password brackets were placeholders; they had already been removed locally when the next attempt began. Percent-encoded the raw password without displaying it. Endpoint, role, port, database and TLS-mode validation all pass. Initial TLS verification failed with `SELF_SIGNED_CERT_IN_CHAIN`; installed the provider CA in ignored `.local-evidence/supabase/prod-ca-2021.crt` and referenced its absolute path through `sslrootcert`, retaining `sslmode=verify-full`. The CA download URL was verified against Supabase's official Studio `hooks/custom-content/custom-content.json` source. Certificate-file SHA-256: `700723581420dd1ac98fd7e9ac529f0ef210eadcaf87fc868a3ad7d114c2f3b7`.

The next connection passed certificate validation but failed PostgreSQL authentication with `28P01`. Database password correction is required; no hosted application enquiry or migration was attempted. The local CA path is machine-specific and is not a deployment configuration. No certificate verification was disabled. Existing generated secrets remain unchanged, and `.env.local` remains ignored with mode `0600`.

## Configuration repair and authentication recheck — 2026-09-29

The next owner edit removed the `LEAD_DATABASE_URL` assignment and placed the supplied URI in the rate-limit entry. Reconstructed the three-variable file from the supplied endpoint/password, safely percent-encoded the password, retained the worker secret, and regenerated the overwritten rate-limit secret using 32 random bytes. No successful hosted application submission had occurred before this secret replacement. Retained `sslmode=verify-full` and the installed provider CA.

All structural configuration checks now pass. A fresh connection again reached PostgreSQL authentication and returned `28P01`: the supplied password is still rejected. No hosted enquiry was submitted. The password helper remains available for hidden entry of the raw database password. `.env.local` is still ignored, absent from the Git index and restricted to mode `0600`.

The owner subsequently supplied a complete URI. Saved its already-encoded password without double encoding, retained verified TLS and the CA path, and preserved both generated application secrets. All URI checks passed, but the fresh PostgreSQL connection still returned `28P01`. Database authentication remains blocked; hosted enquiry verification has not started. Because the credential was supplied in chat, it should be rotated through the project dashboard and re-entered locally with the hidden-input helper.

## Successful hosted verification — 2026-09-29

Authentication subsequently succeeded with the saved configuration without another agent-side credential edit. Earlier `28P01` responses do not prove that the supplied password was wrong: Supabase documents short-lived Supavisor credential caching after password rotation. That is a plausible explanation for the later transient failures, not a confirmed root cause for every earlier attempt. Earlier malformed environment entries and password encoding were separate confirmed problems.

- Verified client-to-pooler TLS 1.3 with certificate authorization true, `sslmode=verify-full` and the official provider CA. An authenticated query returned the intended `postgres` database and role. `pg_stat_ssl` on the backend reported false; this describes the provider's pooler-to-database session, not the validated client TLS socket, and no claim about that internal transport is made.
- Started the production build locally on isolated port 8136, with application database credentials active and email variables explicitly disabled. Submitted an actual homepage form in Chromium with synthetic name, phone, suburb and description. `/api/quote` returned 201 with a durable ID; the browser displayed receipt and disabled repeat submission.
- Verified normalized fields, service, consent/source context and no inferred city. Direct MCP inspection independently confirmed the stored lead and pending outbox.
- Same-key replay returned the same durable ID; a changed payload returned 409. Concurrent requests with a second key produced a single separate booking request, preserving requested date/time and timezone without confirming a booking. Optional email created an acknowledgement outbox entry.
- Five same-phone enquiries were accepted; the sixth returned 429. Replay of an existing key remained accepted after the rate limit. This is bounded per-phone rate-limit evidence, not a global-load/concurrency benchmark.
- Recovery without authorization returned 401. With the actual worker secret, recovery returned `not-configured`, processed zero jobs and left every notification pending with zero attempts and no provider IDs. No email was sent; provider delivery and retry recovery remain covered only by the earlier isolated tests.
- All 18 live assertions passed. Application server output contained no credentials or synthetic payload, no database connection error and no colour warnings for this run.
- Inspected five synthetic leads and six pending notifications through MCP, then deleted only the five matching test IDs plus run-marker predicate. Cascading cleanup removed their six notifications. MCP verified zero remaining leads and notifications. Two synthetic rate buckets remain and become eligible for expiry cleanup after two hours.

Synthetic run: `synthetic-activation-fd7cb2b8-875d-4cf3-8650-bce04c8e46f2`. Full synthetic evidence is stored locally in ignored `.local-evidence/supabase/hosted-verification-2026-09-29.json`; it contains no credentials. Earlier build/typecheck, 23 unit tests and four isolated browser tests remain the current code validation because this continuation changed configuration and documentation only.

No migration reapplication, email activation, deployment, merge, commit or push was performed. `.env.local` remains owner-only, ignored and absent from the Git index. The CA path is local to this machine. Rotate the database password before release because it was disclosed in chat; use the hidden-input helper and allow for pooler cache propagation when rechecking. Deployment still requires its own secure configuration, connection budget and runtime verification.

Reference: [Supavisor password rotation cache behavior](https://supabase.com/docs/guides/troubleshooting/supavisor-error-password-authentication-failed-after-password-rotation).

## Final activation continuation — 2026-09-29

- Fresh connection passed certificate validation with TLS 1.3 through the configured session pooler. No migration or runtime architecture change was needed in this continuation.
- Actual Chromium homepage form → local production `/api/quote` → hosted PostgreSQL returned 201. Direct MCP inspection confirmed the normalized canonical lead, `quote_requested` status and pending internal outbox; city remained absent.
- Hosted replay retained the same ID; changed same-key payload returned 409; concurrent same-key requests produced one separate `booking_requested` enquiry. Its optional email produced an additional acknowledgement job. Five accepted enquiries produced exactly six outbox jobs.
- Both national and international phone formats shared the database quota. The sixth enquiry returned 429; replay still returned the original ID. The stored phone bucket counted five, excluding replay, conflict and rejected attempts.
- Malformed JSON, missing description and honeypot returned 400 without receipt. A separate local production process pointed at an unavailable loopback database returned 503 through the real browser form, preserved input and displayed no receipt.
- Recovery authorization checks passed. With email absent, the actual endpoint returned `not-configured`, processed zero and left jobs untouched. An isolated harness then invoked the existing worker against one hosted synthetic lead with a test-only sender that always throws before any external transport. It selected the due job, froze its message, recorded one attempt, kept `pending` with a safe error category and scheduled backoff. An immediate second invocation did not reselect the future job. No provider request, provider ID or accepted/delivered status was created; runtime email configuration stayed unset.
- All 23 hosted harness checks passed. Fresh typecheck, lint (0 errors, 70 known warnings), 23 unit tests, production build and four focused Playwright tests passed. Build content scan remained warning-only with five existing medium findings. Browser regression output had colour-environment warnings.
- Scanned all 33 browser JavaScript files for actual configured secret values, server-secret names and connection URI markers: zero matches. Hosted application logs contained no credentials, synthetic contact/description data or database connection errors. `.env.local` stayed ignored, untracked and mode `0600`; its machine-local CA path is not a Vercel deployment configuration.
- Independent MCP verification preceded cleanup. Removed only the five exact test IDs matching this run marker; cascade removed six outbox jobs. MCP confirmed zero remaining leads/notifications and zero provider-accepted jobs. Three rate buckets, including earlier test buckets, remain subject to the existing two-hour expiry cleanup.

Run marker: `synthetic-final-92a305d8-2594-4e9a-a953-16350292379e`. Local evidence: ignored `.local-evidence/supabase/activation-final.json`. Schema/access protection, server validation, regression tests and operational configuration guidance form the single activation commit. Homepage/cinematic files, dependencies, email configuration, deployment and main are unchanged. Database activation has no remaining blocker; email delivery, scheduling and deployed-runtime checks remain separately authorised work.
