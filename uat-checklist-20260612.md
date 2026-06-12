# UAT Checklist — Carbon app (Patterns Denver)

**Date:** 2026-06-12 · **Reviewer:** Amber Atkins · **Build:** branch `carbon-redesign`
**How to run locally:** `cd carbon-app && npm run dev` → http://localhost:5173

This is the **human acceptance** pass — the automated suite already covers a11y + functional
(50/50 green). Tick each item; note anything that fails. Items marked _(auto)_ are also covered by
the test suite and listed here for completeness.

## 1. Content parity (vs the original 7 pages)
- [ ] **Home** — hero, "it's to play" callout, 4 facilitators, 5 nav cards all present.
- [ ] **Setup** — "What to install" (Node 20+, Claude Code, Anthropic account) + "What to bring" checklists.
- [ ] **Playbook** — the sentence prompt + 4 steps (clone, /setup, /ingest, /query) with commands + the bonus/triage accordion.
- [ ] **Prompts** — 6 core prompts + "write your own" + 3 Knapsack-MCP bonus prompts; copy buttons work.
- [ ] **Gallery** — repo + gallery-wall links + a link to the live submission wall.
- [ ] **Next steps** — PCRI card (4 bullets), Denver cohort/Slack, + Knapsack/FuegoUX/Crux partner cards.
- [ ] **Feedback** — link to the survey + PCRI/Slack follow-ups.
- [ ] Copy reads correctly; no placeholder/lorem text; links point where expected.

## 2. Navigation & routing _(auto)_
- [ ] Top nav switches pages; the current page is highlighted.
- [ ] Refreshing on a deep page (e.g. `#/prompts`) stays on that page.
- [ ] A bad URL (`#/nonsense`) falls back to Home.

## 3. Interactions
- [ ] Prompt/command **copy buttons** copy the exact text. _(auto: presence)_
- [ ] External links (PCRI, Slack, partners, survey) open in a **new tab**. _(auto: rel/target)_
- [ ] Accordion (Playbook bonus/triage) expands/collapses.

## 4. Accessibility _(auto — confirm experientially)_
- [ ] Keyboard only: Tab reaches every link/button; focus is always visible.
- [ ] "Skip to content" works (Tab from page load).
- [ ] Text is readable — hero text on blue passes contrast (was fixed this cycle).
- [ ] _(Optional)_ Screen-reader spot-check: nav changes announce the new page.

## 5. Carbon fidelity (the point of the experiment)
- [ ] Reads as **IBM Carbon** — IBM Plex type, Carbon blue, UI Shell header, Tiles/Tags/CodeSnippet.
- [ ] No off-system/hand-rolled lookalikes; spacing/rhythm feels consistent.
- [ ] Redesign is a faithful reinterpretation of the original content (not a 1:1 copy, not missing content).

## 6. Responsive _(auto)_
- [ ] Mobile (~375px): columns stack, nothing overflows, hero/cards/steps readable.
- [ ] Desktop (~1280px): grids lay out as intended.

## 7. Cross-browser (manual — automation is Chromium-only)
- [ ] Safari — visual + interactions OK.
- [ ] Firefox — visual + interactions OK.

## 8. Deploy
- [ ] The new Netlify site (Git auto-build of `carbon-redesign`) serves all 7 pages at the new URL.

---
**Sign-off:** _Accepted ☐  /  Changes requested ☐_ — notes:
