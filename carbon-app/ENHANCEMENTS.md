# Workshop experience enhancements — what shipped

Implements the LLM Council's Tier 0–3 roadmap (`council-report-20260612-workshop-experience.html`).
Everything below is live in the Carbon app unless marked **⏳ needs backend/secret**.

## Tier 0 — guide rails ✅
- **Progress store** (`src/store.ts`) — localStorage-backed; nothing leaves the browser without consent.
- **Progress strip** in the shell on day-of pages — "N of 5 done" + milestone dots.
- **Persisted Setup checklist** + **"your sentence" capture**; sentence **pins** atop Playbook, Prompts, Readiness.
- **Copy-✓ tracking** on every `CodeSnippet`; copying a prompt marks the Prompts milestone.
- **Playbook rails**: per-step time estimate, "✎ fill in YOUR part", "✓ Expected:" output, and a "Didn't work?" inline fix.
- **Agenda** (time-boxed) on Setup; **"Stuck?"** help button on every page (quick fixes + raise-a-hand + cloud fallback).
- **Pacing**: "done early?" bonus in the Playbook accordion + milestone buttons.

## Tier 1 — conversion core ✅
- **Readiness check** (`src/pages/ReadinessPage.tsx`) — 5-question self-assessment → score /100 + archetype (Builder/Adopter/Optimizer/Transformer) + tailored gap.
- **Identity thread**: sentence → readiness score → PCRI, persisted across pages.
- **In-room CTA**: "Start the PCRI" right on the result (the highest-intent moment), not deferred.
- **Consent + privacy first-class**: opt-in before any follow-up; explicit "your data stays in this browser."

## Tier 2 — compounding
- ✅ **Shareable summary**: "Copy a shareable summary" on the result (clipboard).
- ✅ **Static OG/Twitter card** in `index.html`; **re-skin config** (`src/config.ts`) = workshop-in-a-box.
- ✅ **Native Supabase gallery** scaffolding (`src/lib/supabase.ts`, `src/pages/GalleryPage.tsx`) — env-gated, dynamic-imported. **⏳ needs secret:** set `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` in Netlify env and create the `gallery_submissions` table (schema in `supabase.ts`). Until then it gracefully shows the live link-out.
- **⏳ needs backend — per-result dynamic OG images**: add a Netlify Edge Function (satori/`@vercel/og`-style) keyed on score+archetype. Static card ships now.
- **⏳ needs backend — 48h follow-up email**: consent + email are captured client-side; wire a Supabase Edge Function + email provider (e.g. Resend) to actually send.

## Tier 3 — resilience
- ✅ **Offline support**: runtime-caching service worker (`public/sw.js`, registered in `main.tsx`, prod-only) — app works offline after first load (conference-wifi insurance).
- ✅ **Cloud fallback**: `.devcontainer/devcontainer.json` (repo root) + a Codespaces link on Setup and in the Stuck? modal — a locked-down laptop runs the whole workshop in the cloud.
- **⏳ optional — PWA install**: add maskable icons + a web manifest for installability (offline precache already works).
- **⏳ needs backend — live facilitator dashboard**: milestones are per-browser today; a facilitator view needs Supabase Realtime aggregating a `sessions` table.

## Re-skinning for another event (workshop-in-a-box)
Edit `src/config.ts` (name, dates, URLs, agenda) and `src/content.ts` (page copy). No component changes.

## Tests
`npx playwright install chromium` once, then `npm test` — Playwright + axe across 8 routes (desktop +
mobile), WCAG 2.2 AA. All green.
