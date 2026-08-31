# Environment variables used by this project

This document explains the environment variables referenced by the project, whether each is secret or public, where to set it, and how to obtain its value.

IMPORTANT: Do NOT commit real secret values to the repository. Never put server-only secrets in VITE_* variables.

---

## Supabase

VITE_SUPABASE_URL
- Description: Public Supabase project URL used by client-side code (safe to expose).
- Secret/Public: Public
- Where to set: GitHub Pages build environment or GitHub Actions build step (as a build-time env). Use `VITE_` prefix only for intentionally public values.
- How to obtain: Supabase project dashboard → API → Project URL

VITE_SUPABASE_PUBLISHABLE_KEY
- Description: Supabase anon/publishable key used by client-side SDK.
- Secret/Public: Public (only publishable/anon key)
- Where to set: GitHub Pages build environment or GitHub Actions build step.
- How to obtain: Supabase project dashboard → API → anon/public key

SUPABASE_URL
- Description: Supabase project URL (server-side fallback). Usually same as VITE_SUPABASE_URL.
- Secret/Public: Public
- Where to set: Azure App Service application settings (server runtime) and GitHub Actions for server workflows.
- How to obtain: Supabase dashboard → API → Project URL

SUPABASE_PUBLISHABLE_KEY
- Description: Supabase anon/publishable key (server fallback if needed).
- Secret/Public: Public
- Where to set: Azure App Service (if server-side code needs it) and GitHub Actions for build.
- How to obtain: Supabase dashboard → API → anon/public key

SUPABASE_SERVICE_ROLE_KEY
- Description: Service role key with admin privileges (bypasses RLS). Server-only secret used by server functions for admin tasks and by migration scripts.
- Secret/Public: Secret — DO NOT expose to client.
- Where to set: GitHub Actions Secrets (for CI tasks) and Azure App Service application settings (server runtime).
- How to obtain: Supabase dashboard → Settings → API → Service Role Key

---

## OpenAI / AI

AI_PROVIDER
- Description: Selects the AI provider used by server routes. Example values: `openai`.
- Secret/Public: Public
- Where to set: Azure App Service (server runtime) and/or GitHub Actions deployment workflow.
- How to obtain: Set to `openai` to enable the OpenAI adapter.

OPENAI_API_KEY
- Description: OpenAI secret API key used server-side to call OpenAI APIs.
- Secret/Public: Secret — server-only.
- Where to set: GitHub Actions Secrets and Azure App Service application settings. Never set as `VITE_OPENAI_API_KEY` or any `VITE_` variable.
- How to obtain: OpenAI dashboard → API keys (or your organization's secret manager).

AI_MODEL
- Description: Model identifier to request from OpenAI (e.g. `gpt-4o`, `gpt-4o-mini`). The server adapter will default to a safe model if not provided.
- Secret/Public: Public
- Where to set: Azure App Service and/or GitHub Actions build/deploy time.

AI_API_BASE_URL
- Description: Optional base URL for OpenAI-compatible endpoints (useful for enterprise proxies or Azure OpenAI endpoints).
- Secret/Public: Public (the URL) — API key remains secret.
- Where to set: Azure App Service and GitHub Actions as needed.

---

## CI/CD & Deployment

AZURE_CREDENTIALS
- Description: JSON service principal used by GitHub Actions to deploy to Azure App Service.
- Secret/Public: Secret
- Where to set: GitHub Actions Secrets only. Do not store in repo files.
- How to obtain: Create a service principal and grant it rights to the App Service resource. See docs/GITHUB_DEPLOYMENT.md for step-by-step.

NODE_ENV
- Description: Typical Node runtime environment (development|production).
- Secret/Public: Public
- Where to set: Azure App Service and GitHub Actions build environment.

VITE_PUBLIC_URL
- Description: Public base URL for the frontend (only used at build time if required).
- Secret/Public: Public
- Where to set: GitHub Pages build environment or GitHub Actions.

---

## Email / Observability / Optional

EMAIL_PROVIDER
EMAIL_SMTP_HOST
EMAIL_SMTP_PORT
EMAIL_SMTP_USER
EMAIL_SMTP_PASSWORD
- Description: SMTP/email provider configuration if the app sends email.
- Secret/Public: SMTP password is a secret. Host and port are public-ish.
- Where to set: GitHub Actions and Azure App Service.

SENTRY_DSN
- Description: Application monitoring DSN for Sentry (optional).
- Secret/Public: Secret (DSN is sensitive for event ingestion control).
- Where to set: GitHub Actions and Azure App Service.

---

## Migration / Target Supabase (optional)

TARGET_SUPABASE_URL
TARGET_SUPABASE_PUBLISHABLE_KEY
TARGET_SUPABASE_SERVICE_ROLE_KEY
- Description: Used by migration scripts when migrating data to an independent Supabase project.
- Secret/Public: TARGET_SUPABASE_SERVICE_ROLE_KEY is secret.
- Where to set: GitHub Actions Secrets when you are ready to run migration workflows.

---

## Security notes
- NEVER put server-only secrets in `VITE_*` variables. Anything prefixed with `VITE_` is embedded into client bundles.
- Store long-lived secrets in Azure App Service application settings and GitHub Actions Secrets only.
- Do not commit `.env` to the repository. Use `.env.example` (already present) for variable names only.
- Inventory and migration workflows are manual and should only be run with appropriate read-only credentials for exports or service-role keys for controlled imports.

