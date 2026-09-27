// Never let automated fixtures contact a deployed store or a real mailbox.
for (const key of ['LEAD_DATABASE_URL', 'RESEND_API_KEY', 'LEAD_EMAIL_FROM', 'LEAD_WORKER_SECRET', 'LEAD_RATE_LIMIT_SECRET']) delete process.env[key]
