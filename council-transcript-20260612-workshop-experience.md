# LLM Council Transcript — Workshop app experience enhancements

**Date:** 2026-06-12 · **Counciled by:** Amber Atkins

## Question
Recommend enhancements to make the Patterns Denver 2026 workshop companion web app best-in-class,
benchmarked to high-quality hands-on / sandbox workshop offerings. Context: afternoon *in-person*
workshop where design-system practitioners use **Claude Code in their own terminal on their own
docs**; the app is a Carbon SPA + Supabase, currently a mostly-static 7-page companion (Home, Setup,
Playbook, Prompts, Gallery, Next steps, Feedback). Knapsack's deeper goal: make practitioners *feel*
their docs aren't AI-ready → convert to a PCRI assessment + follow-up.

---

## Advisor responses

### The Contrarian
The app confuses "informational companion" with "sandbox," and it will fail live when 30 unmanaged
laptops run `/setup` (Node drift, corp proxies, no-admin, expired Claude auth). Best-in-class
workshops (Instruqt, Qwiklabs, Codespaces) ship a pre-provisioned/browser environment — you need a
hosted fallback so a broken laptop isn't a broken attendee. No notion of progress/correctness
(GitHub Skills & freeCodeCamp validate each step; Qwiklabs scores) — add self-checkpoints + a
facilitator dashboard of room progress. The "sentence" (I want AI to help me with ___) is the actual
product and is collected nowhere measurable. Missing entirely: offline/degraded mode (conference
wifi dies; Anthropic cookbooks run locally for this reason), a time-boxed agenda, and a "stuck →
raise a flag → human" path. You've built a beautiful table of contents; a workshop needs guide rails.

### The First Principles Thinker
Strip the frame. This is **instrumentation for a conversion event, not an LMS**. The exemplars
everyone reaches for (Instruqt/Katacoda/Qwiklabs) solve sandbox *provisioning* — a problem you don't
have. The attendee's own terminal on their own docs is your *unfair advantage*, not a gap; copying
embedded-terminal polish optimizes the wrong thing. What actually serves the goal: (1) **make the gap
measurable in the room** — a "readiness score" from running Claude against their *own* docs; an
unexpected number ("your tokens are 34% queryable") is the conversion — the Stripe move of showing
*their* data. (2) Bind **sentence → score → follow-up as one thread/identity** across all 7 pages —
the real product is a funnel, not pages. (3) The Gallery is the social-proof engine — rank by
"biggest gap found," not prettiest output. Cut gamification, badges, embedded terminals. Success
metric: **% of attendees who start a PCRI within 72h** — build backward from that.

### The Expansionist
You're sitting on a distribution asset and treating it like a handout. (1) **The Gallery is the
product** — make every submission a permanent, shareable artifact with its own URL + OG image ("I
audited my design system at Patterns Denver — here's what Claude found"). Mint *findings*, not
badges; each attendee becomes a billboard to their team. (2) "Bring your sentence → leave with a
result" is a repeatable funnel — content's already decoupled, so the real asset is
**workshop-in-a-box**: re-skinnable/re-deployable per conference, lunch-and-learn, enterprise offsite.
(3) **Post-event compounding** is where the money is: email each attendee their result 48h later +
one-click "run this on your real repo" + PCRI CTA; the Slack cohort becomes a standing community
Knapsack owns. Build now: per-result permalinks, OG images, sentence+email capture, a re-skin config
layer. This isn't a companion app — it's Knapsack's top-of-funnel demand engine disguised as a workshop.

### The Outsider
The hands-on happens in a terminal, but the website is where people get lost. (1) **The terminal is
the scary part and the site pretends it isn't** — add a screenshot/10-sec GIF of exactly what the
terminal should look like after each command, including success. (2) **Copy-paste will betray someone
in the first 5 minutes** — commands needing their filename/folder/sentence error when pasted raw;
every command needs a "fill in YOUR part" callout + a "what if it didn't work" line right under it.
(3) **Nothing says where I am / how far** — add a progress trail ("Step 2 of 4") + time estimates.
(4) The Setup sentence is the best idea here and it vanishes — pin it to the top of Playbook &
Prompts so my own goal stares back at me. (5) The Gallery is the secret weapon — a tiny live counter
("14 things made so far") on every page pulls stragglers forward. (6) Missing a **panic button** —
one "Stuck? raise your hand / common fixes" link on every page. Never a dead end.

### The Executor
Ranked by effort, all shippable on Vite+Carbon+Supabase. **Quick wins (a weekend each, pure
frontend):** (1) persist the Setup checklist in `localStorage` (Carbon `Checkbox` by item id) —
highest impact-per-line; (2) a global progress indicator (`ProgressIndicator`) off the same state;
(3) copy-tracking "copied ✓" per `CodeSnippet` (onClick already wired); (4) per-page mark-complete +
deep links. **Mid bet (a week):** (5) pull the Supabase gallery + survey **natively into Carbon**
(`supabase-js` already in the org) — kills the jarring link-out; the live wall is the social-proof
moment. **A trap — don't:** an in-browser terminal / real sandbox (WebContainers, hosted VMs). The
whole point is Claude Code on *their* machine and *their* docs; a fake terminal is a month-plus of
infra, breaks the premise, and adds failures you'll debug live. Ship 1–4 by next workshop; do 5 the
week after.

---

## Peer review highlights
Anonymization map: A = Outsider, B = Expansionist, C = Executor, D = Contrarian, E = First Principles.

- **Strongest (unanimous): E (First Principles).** The only response that refuses the framing trap —
  reframes the app as conversion instrumentation, ties everything to a hard metric (% PCRI within
  72h), and lands the sharpest single idea: a **readiness score on the attendee's own docs** is the
  conversion. B (Expansionist) a close, complementary second (permalinks, OG, post-event funnel).
- **Biggest blind spot (unanimous): D (Contrarian).** Technically sharp on live-ops risk but
  **misreads the premise** — wants a hosted sandbox/Codespaces fallback for a workshop whose whole
  value is BYO-terminal on real docs. C and E both flag this as the trap. (D's *non-infra* points —
  wifi/offline, time-box, raise-a-flag, facilitator visibility — remain valid as right-sized rails.)
- **What ALL FIVE missed (peer round):**
  1. **Consent / privacy / data handling.** Attendees point Claude at *proprietary employer* docs,
     then a score/findings get captured, emailed, and minted as public URLs into a sales motion.
     Nobody addressed what's stored, ownership, confidentiality, or opt-in — a legal/trust landmine
     that *gates* whether the funnel is even usable.
  2. **The in-room live conversion play.** Everyone deferred conversion to a 48–72h email. The
     highest-intent moment is *in the room* the instant someone sees a bad score — needs a "book your
     PCRI now / talk to us" path + warm AE handoff while the surprise is fresh.
  3. **Mixed-skill pacing.** No path for the ~30% who finish early (bonus track) or fall behind
     (a clear "minimum done = X").

---

## Chairman's verdict

### Where the council agrees
- The app today is a **table of contents**, not an experience; the missing layer is **guide rails**
  (where am I, am I stuck, did it work).
- It should be understood as **conversion instrumentation** for an in-room "felt gap" → PCRI, not an LMS.
- The **Gallery** is the underused engine (social proof in-room, distribution after).
- **Don't build an in-browser terminal/hosted sandbox** — BYO-terminal-on-own-docs is the advantage.

### Where the council clashes
**Reliability vs. premise.** Contrarian wants a hosted environment so a broken laptop ≠ broken
attendee; First Principles/Executor say that breaks the whole value prop. Resolution: keep BYO, but
add a *right-sized* fallback (pre-seeded repo / Codespaces link + offline-capable pages), not a
rebuilt sandbox.

### Blind spots caught
Consent/privacy on proprietary docs (gates the funnel); in-room live conversion (not just a 48h
email); mixed-skill pacing.

### Recommendation — a prioritized roadmap
- **Tier 0 — guide rails (next workshop, ~weekends):** persistent progress + "you are here"
  (localStorage checklist, `ProgressIndicator`, copy-✓); anti-stuck rails on Playbook (per-command
  "fill in YOUR part", expected-output screenshot/GIF, inline "didn't work?", a persistent "Stuck?"
  affordance); pin "your sentence" across Playbook + Prompts; offline-capable pages + a time-boxed
  agenda + a done-early/falling-behind path.
- **Tier 1 — the conversion core (the actual point):** an in-room **AI-readiness score** on their own
  docs; bind **sentence → score → PCRI** as one consented identity thread; an **in-room** "start your
  PCRI / talk to us" path; **consent + privacy** first-class (opt-in before any capture; local-by-
  default) — this gates everything.
- **Tier 2 — compounding:** Gallery as permanent shareable artifacts (permalinks + OG, ranked by
  "biggest gap found", live counter); bring Supabase gallery/survey natively into Carbon; 48h
  follow-up email; workshop-in-a-box re-skin/config layer.
- **Tier 3 — resilience (right-sized, not a rebuild):** pre-seeded repo / Codespaces fallback;
  optional facilitator view of room progress (piggyback Supabase).

### The one thing to do first
Define the success metric (**% who start a PCRI within 72h**) and instrument the single thread
**sentence → readiness score → PCRI, with explicit consent.** Every other enhancement either serves
that thread or is polish.
