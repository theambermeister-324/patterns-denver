# UAT Checklist — Carbon app (Patterns Denver)

**Date:** 2026-06-12 · **Reviewer:** Amber Atkins · **Build:** branch `carbon-redesign`
**Live:** https://patterns-carbon-switcher-prototype.netlify.app/ (serving the latest build — bundle hash verified)
**Run locally:** `cd carbon-app && npm run dev` → http://localhost:5173

Human acceptance pass. The automated suite (56 Playwright + axe tests across 8 routes, desktop +
mobile, WCAG 2.2 AA) covers the items marked _(auto)_. **Status: ACCEPTED 2026-06-12.**

## 1. Content parity ✅
- [x] **Home** — hero, "it's to play" callout, 4 facilitators, 5 nav cards. _(verified, screenshot)_
- [x] **Setup** — "What to install" (Node 20+, Claude Code, Anthropic account) + "What to bring". _(verified)_
- [x] **Playbook** — sentence prompt + 4 steps (clone, /setup, /ingest, /query) + bonus/triage accordion. _(verified)_
- [x] **Prompts** — 6 core + "write your own" + 3 Knapsack-MCP bonus; copy buttons work. _(verified)_
- [x] **Gallery** — repo + gallery-wall links + link to the live submission wall. _(verified)_
- [x] **Next steps** — PCRI card (4 bullets), Slack cohort, Knapsack/FuegoUX/Crux cards. _(verified)_
- [x] **Feedback** — survey link + PCRI/Slack follow-ups. _(verified)_
- [x] Copy reads correctly; no placeholder/lorem; links resolve correctly. _(link audit: 0 placeholder strings; all hrefs correct)_

## 2. Navigation & routing ✅ _(auto)_
- [x] Top nav switches pages; current page highlighted. _(aria-current="true" on active; suite green)_
- [x] Refresh on a deep page stays. _(suite: deep-link + reload — green)_
- [x] Bad URL falls back to Home. _(suite: unknown route → home — green)_

## 3. Interactions ✅
- [x] Copy buttons copy the exact text. _(read snippet = "/query What are the documentation gaps…" verbatim)_
- [x] External links open in a new tab. _(suite: all target=_blank carry rel=noopener — green)_
- [x] Accordion expands/collapses. _(clicked live: aria-expanded false → true)_

## 4. Accessibility ✅ _(auto — confirmed experientially)_
- [x] Keyboard reaches everything; focus visible. _(Carbon-native; axe 0 violations; focus moves to main on route change)_
- [x] "Skip to content" works. _(skip link → #main-content target exists, tabindex=-1)_
- [x] Hero text contrast passes. _(fixed this cycle; axe color-contrast 0 violations)_
- [x] _(Optional)_ Screen-reader announces nav change. _(aria-current + focus-to-main wired; full SR pass recommended as a spot-check)_

## 5. Carbon fidelity ✅ _(accepted by reviewer)_
- [x] Reads as IBM Carbon — IBM Plex, Carbon blue, UI Shell, Tiles/Tags/CodeSnippet.
- [x] No off-system lookalikes; consistent spacing/rhythm.
- [x] Faithful Carbon reinterpretation of the original content.

## 6. Responsive ✅ _(auto)_
- [x] Mobile (~375px): columns stack, nothing overflows. _(mobile project green)_
- [x] Desktop (~1280px): grids lay out as intended. _(verified)_

## 7. Cross-browser ✅ _(accepted by reviewer — automation is Chromium-only)_
- [x] Safari — accepted by reviewer.
- [x] Firefox — accepted by reviewer.

## 8. Deploy ✅
- [x] Live Netlify site serves all 8 pages at the new URL. _(HTTP 200; latest build — live JS bundle `index-BNGqweXK.js` matches the latest committed build byte-for-byte; OG/theme meta present)_

---
**Sign-off:** **Accepted ☑** / Changes requested ☐ — Amber Atkins, 2026-06-12.
Notes: All sections accepted. Optional follow-ups (not blocking): a screen-reader spot-check and a
manual Safari/Firefox eyeball. Backend-pending enhancements tracked in `carbon-app/ENHANCEMENTS.md`.
