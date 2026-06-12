# Backlog — Patterns Denver Carbon app

Deferred work, captured so it can be picked up cold. The app is shipped + UAT-accepted
(2026-06-12); none of the below blocks that. See `ENHANCEMENTS.md` for what's already done.

## Deferred features (need a backend, a secret, or a venue)

### 1. Native Supabase gallery + survey  _(needs a secret — ~15 min once provided)_
The submission wall + survey are scaffolded and env-gated (`src/lib/supabase.ts`,
`src/pages/GalleryPage.tsx`, dynamic import). They activate the moment two Netlify env vars are set:
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, plus a `gallery_submissions` table (schema in
`supabase.ts`; anon insert+select RLS). Until then the app gracefully links out to the live original.

### 2. Per-result dynamic OG images  _(needs an edge function)_
A static OG card ships in `index.html`. For per-result share cards (score + archetype), add a Netlify
Edge Function (satori / `@vercel/og`-style) that renders an image keyed on the readiness result.

### 3. 48-hour follow-up email  _(needs an email backend)_
Consent + email are already captured client-side on the Readiness result (opt-in, local-by-default).
To actually send: a Supabase Edge Function + an email provider (e.g. Resend) reading consented rows.

### 4. Live facilitator dashboard  _(needs shared backend state)_
Milestones/scores are per-browser (localStorage) today. A facilitator view of room progress needs
Supabase Realtime aggregating a `sessions` table the client writes to (gated by consent).

### 5. Design-system switcher  _(the big one — wait for a venue)_
The headline demo: render the same `content.ts` through a second design system (Material / Fluent /
Polaris) with a live toggle — proving "AI builds idiomatic output in any DS." Content is already
decoupled from the Carbon presentation layer, so the lift is a second renderer + a theme switch.
Build it *for* a specific venue (talk, prospect, launch) so it's tuned to that audience.

## Manual QA passes (automation is Chromium-only; compat risk assessed low)
- Real **screen-reader** spot-check (VoiceOver / NVDA) on Home + Playbook + Readiness — confirm
  reading order and that route changes are announced. (Accessibility-tree audit already passed; the
  one finding — heading-level skips — was fixed 2026-06-12.)
- **Safari + Firefox** visual/interaction eyeball. (Code scan found no high-risk CSS/JS; only
  `navigator.clipboard`, which is supported over HTTPS and wrapped in try/catch.)

## Recently resolved (2026-06-12)
- Heading hierarchy normalized to `<h2>` for content-block titles (no more h1→h3 skips). Suite green.
