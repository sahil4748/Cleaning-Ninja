> Historical phase record. Current scope is in [current phase](../execution/current-phase.md); implemented durable storage/email and activation limitations are in [lead operations](../architecture/lead-operations.md). Statements below about missing persistence or unpublished branch describe the earlier checkpoint.

# Deployment baseline — no deployment performed

Owner baseline: main is live at `72bb70e6e37d224396fc57dc0a2bf92f125838e9`; approved content at `7124dda396a39e87d7483ba9a03a093c5dce5251`; rebuild-2026 intentionally descends from it. Preserve content cleanup. No merge, push or production mutation performed.

Local authoritative checkout: /Users/arsh/Downloads/Cleaning-Ninja. Initial status clean on rebuild-2026 at approved content commit. Remote rebuild-2026 was not available during attempted clone; baseline audit instead used an isolated local clone. Do not assume the branch is published.

Scripts: dev/start run Next on port 8001; build invokes next build after check:content; test:e2e invokes Playwright. No vercel.json, GitHub Actions workflow, runtime pin or packageManager field in tracked files. next.config.js contains remote image patterns only. .vercel is ignored; project IDs, dashboard environment, preview protection, deployment hooks and production Node version were not inspected.

Audit production server used isolated port 8126 because 8001 was occupied. No existing server was stopped. No preview deployed. Historical DEPLOYMENT.md includes obsolete main-push and DNS instructions: do not execute them. DNS is Vercel and Titan email DNS is already configured per owner.

Future release requires verified leads/claims/SEO, passing QA, explicit release approval and recorded rollback target. This sprint does not authorize release.
