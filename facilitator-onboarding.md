# Facilitator Onboarding — Patterns Denver 2026
**June 11 · Zero Hour Cafe · Denver**
Facilitators: Amber Atkins · Angie Stevenson · Aaron Stone · Nate Wearin

This guide gets you from "I know the concept" to "I've run the thing." Complete your section before the June 10 prep call. Estimated time: 30–45 minutes depending on your role.

---

## The Full Picture (5-minute read)

### What participants are walking into

14 design system practitioners from 10+ enterprise orgs (Intuit, USAA, Aetna, M&T Bank, and more). This group skews more advanced than Minneapolis — they're not asking whether AI matters, they're asking who's accountable when it generates the experience and how their orgs will get there.

Their anxiety is the starting material. The morning surfaces it. The afternoon works with it.

### The arc

| Block | Time | What's happening |
|---|---|---|
| Arrivals + coffee | 11:00–11:30 AM | People find their seat |
| Storytelling | 11:30 AM–12:30 PM | Amber, Aaron, Nate share their stories |
| Lunch | 12:30–1:00 PM | |
| Sandbox kickoff | 1:00–1:30 PM | Pairs form, prompts handed out |
| Outdoor break | 1:30–1:45 PM | Short reset |
| Sandboxing | 1:45–3:45 PM | Two tracks running, facilitators rotate |
| Playback + gallery | 3:45–5:00 PM | Pairs present, gallery wall goes live |

### The two afternoon tracks

**Curious-but-new** (8–9 participants) — Angie is the primary support person here.
- Tool: Claude Code knowledge base sandbox (`main` branch of the repo)
- What they do: Drop design system docs into `raw/`, run `/setup`, run `/ingest all`, ask `/query` questions
- Pre-scaffolded, constrained, guided by `WORKSHOP.md` and `prompt-templates.md`
- The prompt that anchors it: *"I want to see if AI can help me with ___."*

**Advanced** (4–5 participants) — Aaron is the technical resolver here.
- Tool: CongaLine by Crux Digital (`advanced` branch)
- What they do: Deploy an isolated AI agent fleet using Docker, run governance/policy prompts
- Open-ended, minimal scaffolding, participants bring their own challenge
- Participants likely include: Scott Johns (Intuit), Julian Hartnett (Maxio), Rachael Greene (SageSure)

### The gallery wall

All pairs submit to `patterns-denver-2026.netlify.app` — a 4-field form (pair names, starting sentence, what they built, what surprised them). Submissions go live immediately and are displayed during the 3:45 PM playback.

---

## Your Dry Run

Find your role below. Complete the checklist before June 10.

---

### Amber — Host / Room Manager

*You've already run most of this. Your dry run is a review pass, not a first-time run.*

- [ ] Open `facilitator-runofshow.html` in a browser — confirm the pairing map (7 pairs) and timing blocks still reflect reality
- [ ] Read `amber-enable-story.md` — time your short version (target: 90 seconds)
- [ ] Submit a test entry to `patterns-denver-2026.netlify.app` — confirm the form works and the success message appears
- [ ] Start a fresh Claude Code session in the repo (`claude`) and run the full curious-but-new flow: `/setup` → `/ingest all` → `/query What are the documentation gaps in this design system?`

**Bring to June 10:** Any blockers, final story timing, decision on participant cheat sheet (print? who writes?)

---

### Angie — Co-host / Curious-but-new track lead

*Your job is to be the person the curious-but-new participants ask first. Run the sandbox cold — exactly as a participant would.*

- [ ] Clone the repo fresh:
  ```
  git clone https://github.com/theambermeister-324/patterns-denver.git
  cd patterns-denver
  ```
- [ ] Open it in Claude Code:
  ```
  claude
  ```
- [ ] Run `/setup` — watch what happens. Note any friction or confusion points.
- [ ] Run `/ingest all` — Claude reads `raw/sample-design-system.md` and organizes the wiki
- [ ] Run `/query What are the documentation gaps in this design system?`
- [ ] Pick one more prompt from `prompt-templates.md` and run it
- [ ] Submit a test entry to `patterns-denver-2026.netlify.app`
- [ ] Read `WORKSHOP.md` and `prompt-templates.md` end-to-end — these are what participants will have in their hands

**Bring to June 10:** What confused you? Where would a nervous participant get stuck? What do you need from Amber during the 1:45–3:45 sandboxing block?

---

### Aaron — CongaLine technical resolver / Advanced track lead

*Two jobs: (1) get the advanced branch participant-ready, (2) understand the curious-but-new track so you know what the other 9 people are doing.*

**Advanced track setup:**
- [ ] Check out the `advanced` branch:
  ```
  git checkout advanced
  ```
- [ ] Read `ADVANCED.md` — this is the participant-facing guide. Flag anything that's wrong or missing.
- [ ] Drop your config files into `conga/`:
  - `demo.yaml`
  - `demo.env.example`
  - `conga-policy.yaml.example`
- [ ] Run the dry run script in `conga/DRY-RUN.md` (5 steps, ~20 minutes total)
- [ ] Review your CongaLine origin story framing in `facilitator-runofshow.html` — confirm it's accurate

**Curious-but-new walkthrough (so you understand the other track):**
- [ ] Check out `main` branch and run Angie's steps above (clone → `/setup` → `/ingest all` → `/query`)

**Bring to June 10:** Config files committed to `advanced` branch, dry run results (pass/fail + blockers), your story timing (~5 min), anything participants will need that isn't in `ADVANCED.md`

---

### Nate — Strategic counterweight / "Should we" story

*Your role in the morning is the human judgment counterweight — the "should we" to Aaron's "here's what we built." You're also floating support during the afternoon sandbox.*

- [ ] Read `WORKSHOP.md` — the participant-facing overview (5 min)
- [ ] Open `facilitator-runofshow.html` — read the morning storytelling section; note where your story lands (after Aaron, before sandbox kickoff)
- [ ] Run the curious-but-new track (clone → `/setup` → `/ingest all` → `/query`) — you'll likely be coaching people through this in the afternoon
- [ ] Read `prompt-templates.md` — especially "When you're stuck" — these are the rescue prompts you'll use when pairs get frozen
- [ ] Draft or outline your story (target: ~5 min). It should answer: *"Here's a moment where I had to decide whether AI should be doing this at all — and what I learned from that."*

**Bring to June 10:** Story draft or talking points, questions about where you float during the 1:45–3:45 block

---

## What to Bring to the June 10 Prep Call

Everyone comes with these four things:

1. **Dry run status** — Did the flow work? What broke or surprised you?
2. **Your story** — Roughly timed. Amber: Enable story (90 sec). Aaron: CongaLine/OpenClaw origin (~5 min). Nate: should-we story (~5 min). Angie: TBD.
3. **Open questions** — Anything unresolved about your role or the day-of logistics
4. **One thing you'd change** — From running it. This is the useful input.

The June 10 call agenda:
- Status check: 10 minutes
- Story run-throughs: 15 minutes
- Open questions: 10 minutes
- Done

---

## Quick Links

| Resource | Where to find it |
|---|---|
| Gallery wall | `patterns-denver-2026.netlify.app` |
| Venue | Zero Hour Cafe, 3459 Ringsby Ct, Denver CO 80216 |
| Repo | `github.com/theambermeister-324/patterns-denver` |
| Run-of-show | `facilitator-runofshow.html` (open in browser) |
| Participant guide | `WORKSHOP.md` |
| Prompt templates | `prompt-templates.md` |
| Amber's story | `amber-enable-story.md` |
| Advanced track guide | `ADVANCED.md` (on `advanced` branch) |
| CongaLine dry run | `conga/DRY-RUN.md` (on `advanced` branch) |

---

*Questions before June 10? Slack Amber.*
