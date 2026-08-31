# Environment variables to configure in Vercel

No real values appear in this file, in `.env.example`, or anywhere in the ZIP.
Copy the actual values from your Lovable project (the `.env` file visible in the
Lovable editor / Cloud backend settings) into Vercel -> Settings ->
Environment Variables.

| Variable | Classification | Needed at | Purpose |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | PUBLIC / client-side | BUILD + RUNTIME | Backend API base URL used by the browser client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | PUBLIC / client-side (safe to ship, protected by RLS) | BUILD + RUNTIME | Anon/publishable API key for browser requests |
| `VITE_SUPABASE_PROJECT_ID` | PUBLIC / client-side | BUILD | Backend project identifier (informational) |
| `SUPABASE_URL` | SERVER-SIDE (non-secret) | RUNTIME | Same URL, for SSR, server functions and auth middleware |
| `SUPABASE_PUBLISHABLE_KEY` | SERVER-SIDE (non-secret) | RUNTIME | Publishable key used server-side (enquiry insert, auth middleware) |
| `SUPABASE_PROJECT_ID` | SERVER-SIDE (non-secret) | RUNTIME | Backend project identifier (informational) |
| `LOVABLE_API_KEY` | **SERVER-SIDE SECRET** | RUNTIME | Lovable AI Gateway key for the HAGA AI assistant (`/api/chat`) |
| `SUPABASE_SERVICE_ROLE_KEY` | **SERVER-SIDE SECRET** | RUNTIME (optional) | Only if you later add admin code that bypasses RLS. Not required by current code; on Lovable Cloud this key is not exposed to you, so leave it unset. |

Rules:

- Set every variable for Production, Preview and Development environments.
- `VITE_*` values are inlined into the client bundle at build time — only put
  public values there, and redeploy after changing them.
- Never prefix a secret with `VITE_`. `LOVABLE_API_KEY` must stay server-side.
- Never commit `.env`. Only `.env.example` belongs in Git.

## Where each variable is read

- `src/integrations/supabase/client.ts` — `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (falls back to `SUPABASE_*` during SSR)
- `src/integrations/supabase/auth-middleware.ts` — `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`
- `src/integrations/supabase/client.server.ts` — `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (only when an admin call is made)
- `src/lib/enquiry.functions.ts` — `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`
- `src/routes/api/chat.ts` — `LOVABLE_API_KEY`
