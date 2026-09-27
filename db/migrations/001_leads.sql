BEGIN;
CREATE TABLE IF NOT EXISTS leads (
 id uuid PRIMARY KEY,
 idempotency_key uuid NOT NULL UNIQUE,
 payload_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 status text NOT NULL CHECK (status IN ('draft','quote_requested','quote_acknowledged','booking_requested','availability_pending','booking_confirmed','cancelled')),
 payload jsonb NOT NULL,
 CHECK (status <> 'booking_confirmed')
);
CREATE TABLE IF NOT EXISTS lead_notifications (
 id uuid PRIMARY KEY,
 lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
 kind text NOT NULL CHECK (kind IN ('internal','acknowledgement')),
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','processing','provider_accepted','review_required')),
 attempts integer NOT NULL DEFAULT 0,
 next_attempt_at timestamptz NOT NULL DEFAULT now(),
 first_attempt_at timestamptz,
 lease_token uuid,
 message jsonb,
 provider_id text,
 last_error text,
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (lead_id,kind)
);
CREATE INDEX IF NOT EXISTS lead_notifications_due ON lead_notifications(next_attempt_at) WHERE status IN ('pending','processing');
CREATE TABLE IF NOT EXISTS lead_rate_limits (
 bucket text PRIMARY KEY, count integer NOT NULL, expires_at timestamptz NOT NULL
);
COMMIT;
