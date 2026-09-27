# DNS and email — protected baseline

Owner-confirmed 2026-09-21: business email **contact@cleaningninja.co**. Provider **GoDaddy Professional Email powered by Titan**. DNS **Vercel**. Email DNS is already configured.

Do not modify DNS, MX, SPF, DKIM, DMARC, mailbox routing, credentials or provider setup in this sprint. No DNS lookup or mailbox test was necessary; configured state is accepted as supplied.

Historical foundation discrepancy (resolved for application email in technical readiness; canonical host now centralised, target migration deferred): content/navigation.ts uses hello@cleaningninja.com.au; root metadata/schema use .com.au, sitemap/robots use .co. Record for a later owner-approved consistency fix. No existing email sender is implemented. DNS configuration and transactional form delivery are separate concerns. Old deployment docs are historical only.
