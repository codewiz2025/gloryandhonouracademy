# Deploying this frontend to Vercel (backend stays on Lovable Cloud)

Architecture after deployment:

```
Browser -> Vercel (TanStack Start SSR + server functions)
                -> Lovable Cloud (auth, database, storage, RLS)
                -> Lovable AI Gateway (HAGA AI assistant, via /api/chat)
```

Nothing about the backend changes. The app talks to it over HTTPS using the same
project URL and keys it uses today.

## 1. Push the code

Unzip, `git init`, commit, push to GitHub/GitLab. `.gitignore` already excludes
`.env`, `node_modules`, and build output.

## 2. Import into Vercel

New Project -> import the repo. Framework preset: **Other** (do NOT pick Next.js).

| Setting | Value |
| --- | --- |
| Install command | `bun install` (a `bun.lock` is included) or `npm install` |
| Build command | `npm run build` |
| Output directory | leave EMPTY (auto-detected) |
| Node.js version | 22.x |
| Root directory | repository root |

Why output directory is empty: the build emits Vercel's Build Output API v3 at
`.vercel/output` (via the nitro `vercel` preset in `vite.config.ts`). Vercel
detects it automatically. Setting `dist` or `.output` here breaks the deploy.

## 3. Environment variables

Add every variable listed in `ENV_VARS.md` in Vercel -> Settings -> Environment
Variables, for **Production, Preview and Development**. Values come from your
Lovable project (Cloud/backend settings, or the `.env` file in the Lovable
editor). Never commit them.

`VITE_*` variables are read at **build time**, so after changing any of them you
must redeploy for the change to take effect.

## 4. Routing / rewrites

None needed. This is an SSR app, not a static SPA: nitro emits a server function
plus static assets and wires the routing itself. Do **not** add a
`vercel.json` with `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`
— that would break SSR and the `/api/chat` endpoint.

## 5. CORS

Nothing to configure. Browser calls to the backend go to the Lovable Cloud
domain, whose API already allows any origin with the publishable key; server
functions and `/api/chat` run same-origin on Vercel.

## 6. Auth redirect URLs (only if you add sign-in later)

The current site has no login screen. If you add auth, add your Vercel domain
(and any custom domain) to the backend's allowed redirect URLs / site URL in the
Lovable Cloud auth settings, and add the same domains to any OAuth provider.

## 7. Custom domain

Vercel -> Settings -> Domains -> add domain, then point DNS:
`A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` (Vercel shows the exact
records). TLS is issued automatically. Set one domain as primary and redirect the
other.

## 8. Local development

```sh
cp .env.example .env   # fill in real values
npm install
npm run dev            # http://localhost:3000
npm run build          # production build (same as Vercel runs)
```

## 9. Things to watch after the move

- **`VITE_*` vars missing at build time** — the app throws
  "Missing Supabase environment variable(s)". Add them and redeploy.
- **`LOVABLE_API_KEY` missing** — the site works, but the HAGA AI chat returns
  "AI is not configured" (500). This key is issued by Lovable; it is only valid
  for the Lovable AI Gateway.
- **AI gateway quota/billing** — the assistant depends on your Lovable AI credits,
  independent of where the frontend is hosted.
- **Lovable editor telemetry** — `src/lib/lovable-error-reporting.ts` calls
  optional `window.__lovable*` hooks. Off Lovable they are simply no-ops; safe to
  keep or delete.
- **Preview auth bridge** — `src/integrations/supabase/previewAuthStorage.ts`
  only activates on Lovable preview hostnames; inert on Vercel.
- **Backend edits** — schema, RLS and secrets are still managed in the Lovable
  project. Editing the frontend in Lovable after this export will not update the
  Vercel repo unless you keep them synced through GitHub.
- **Enquiry emails** — enquiries are stored in the database; there is no
  transactional email sender configured, which is unchanged by this migration.
