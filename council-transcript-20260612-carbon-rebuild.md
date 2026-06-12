# LLM Council Transcript — Rebuild Patterns Denver site in Carbon (POC)

**Date:** 2026-06-12
**Counciled by:** Amber Atkins

## Original question

Pressure-test the plan to rebuild the Patterns Denver 2026 workshop site (currently hand-written
static HTML) using IBM's Carbon Design System. POC scope: home page only, as a standalone Vite +
React + TypeScript + `@carbon/react` v11 app in a `carbon-app/` subfolder, redesigned (not 1:1
ported), deployed to a new separate Netlify URL. Is this the right approach/scope/stack for proving
"can AI rebuild our site in Carbon"? Risks or better alternatives?

## Framed question

Should Amber (at Knapsack, a design-system platform company) proceed with a POC that rebuilds the
home page of the Patterns Denver workshop site in IBM Carbon — new standalone Vite/React/TS
`@carbon/react` app in a subfolder, redesigned (not ported), deployed to a new Netlify URL — to
test/demo the thesis "Can AI rebuild our site in Carbon?" for a design-systems audience?

---

## Advisor responses

### The Contrarian
You're testing the wrong thesis, and the test is rigged to lie to you. The thesis is "AI + design
systems," but the POC measures "can AI scaffold a Vite/React/Carbon app and style one page" — that
just proves npm works. The sellable claim is *governance*: AI that respects tokens, reuses approved
components, doesn't drift. A one-page greenfield build can't fail that test because there's nothing
to drift from. The "redesign, not 1:1 port" choice destroys your evidence: looks great → "you let it
freelance"; looks off → can't tell if AI failed or Carbon just doesn't suit your content. Result is
unfalsifiable. Carbon idiomaticity is where this dies publicly — a room of DS practitioners will spot
non-Carbon spacing, a misused Tile, wrong type tokens. AI is good at "looks Carbon-ish," bad at "is
Carbon-correct." One wrong `$spacing-05` and your story becomes "AI fakes design systems," damaging
what Knapsack sells. Tech stack is gratuitous risk: Dart Sass + Carbon v11 + Vite has real friction;
debug build config during the demo and the takeaway is "AI is slow." Fix: pick 1:1 port, define
"idiomatic Carbon" pass/fail criteria *before* building, have a Carbon expert grade it.

### The First Principles Thinker
You already know AI *can* rebuild it mechanically. The real question is: "Can Knapsack credibly tell
customers AI + a design system produces idiomatic, on-brand output faster than humans?" That's the
thesis you sell — design the POC to test *that*, not a Netlify deploy. A greenfield app in a clean
subfolder is the easy case: no legacy, no governance tension. Your customers have messy existing
systems. Strip it to what's worth measuring: (1) Fidelity — real Carbon components/tokens, or
Carbon-ish hand-rolled CSS? Hardcoded hex where a token belongs = thesis failed. (2) Speed with
honesty — log wall-clock and intervention count. (3) Constraint adherence — what did the AI do when
Carbon lacked a component? Improvise off-system, or flag it? That moment is the whole demo. Home page
only is right — but pick the section with the *most awkward* Carbon fit, not the cleanest. Test where
it breaks. Prove only "AI made a pretty Carbon homepage" and you've built a screenshot, not evidence.

### The Expansionist
This isn't a website rebuild — it's a repeatable productized motion. The artifact you're worried
about is the least valuable output. The valuable thing is the *transcript*: proof AI can stand up a
foreign, opinionated enterprise design system (Carbon) from scratch, idiomatically, in an afternoon.
That recording is a sales asset, a conference talk, a wedge into every company with a real design
system — Knapsack's buyer base. Don't stop at the home page. If Carbon works, the same harness
rebuilds the site in Material, Fluent, Polaris, Atlassian, Spectrum — a live "design-system switcher"
that makes a room of practitioners gasp, because each is locked into one system and assumes migration
is a death march. Bigger: once you've done it twice, you've found the real product surface —
AI-assisted design-system *migration*, a six-figure enterprise line item. Capture everything:
time-to-first-render, token usage, where Claude nailed conventions vs. guessed. Those metrics ARE the
thesis, quantified. One home page in `carbon-app/` is the right first keystroke — just build it so the
second design system is trivial to add.

### The Outsider
You said you want to test "can AI rebuild OUR website," but the plan says "redesign it, don't copy
it." Different tests. If the new page looks like a generic IBM product instead of your event, you've
learned AI can make an IBM-flavored page — not that it can rebuild *your* site. It's a workshop event
site (Setup, Prompts, Gallery, Feedback) — friendly, human stuff. Carbon is the suit-and-tie look for
enterprise dashboards. Why dress a fun event in IBM's corporate uniform? If the site gets
worse-looking to a normal visitor, that's a cost. The demo math worries me: one page out of seven,
redesigned so you can't compare it to the original, on a brand-new URL nobody visits — that's a single
screenshot. Honest headline: "AI built one new page in a corporate style," not "AI rebuilt our site."
What I'd want to see: rebuild the home page to look *like the current one*, side by side, same
URL-feel. That answers the real question and makes a far more convincing demo. Don't let the
scaffolding become the story.

### The Executor
Mostly buildable in an afternoon, but three friction points will eat your time. **Carbon + Vite Sass
is the #1 time-sink:** `@use '@carbon/react'` fails out of the box. Use Dart Sass (`sass-embedded` is
fastest) and configure Vite's `css.preprocessorOptions.scss.loadPaths: ['node_modules']`. Set
`quietDeps: true` and `silenceDeprecations` or Carbon's own Sass deprecation warnings drown the
terminal. Budget the first 30 min here. **IBM Plex — skip Google Fonts;** `npm i @ibm/plex` and import
the CSS — one less CDN to fail mid-demo. **Netlify subfolder is trivial:** `netlify.toml` in
`carbon-app/` with base/command/publish, set base dir in the UI once. **Hero band:** Carbon has no
hero component — build it with a full-width grid row + heading type tokens + a Button; don't fight it.
**Fastest path:** scaffold vite react-ts, fix Sass config FIRST, verify one Carbon `Button` renders
styled, *then* build the page. Verify-the-pipeline-before-you-build saves you from debugging layout and
Sass simultaneously.

---

## Peer review highlights

Anonymization map: A = First Principles, B = Outsider, C = Contrarian, D = Executor, E = Expansionist.

- **Strongest (unanimous): Response C (Contrarian).** Lands the cleanest logical kill — "redesign,
  not 1:1 port" makes the result *unfalsifiable* — and pairs it with a concrete fix (define
  idiomatic-Carbon pass/fail before building; expert grader). Reviewers noted A (First Principles) is
  close and complementary ("test the awkward section, not the clean one").
- **Biggest blind spot (unanimous): Response E (Expansionist).** Skips to multi-DS switchers and a
  six-figure migration product before the one-page POC has proven anything — premature scaling on an
  unvalidated result, ignoring the falsifiability hole.
- **What ALL responses missed (emerged in peer round):**
  1. **Conflict of interest** — Knapsack *sells* DS governance, yet the POC uses raw Carbon + Vite
     with no Knapsack product in the loop. A skeptic asks "where's your platform in this story?" The
     demo could undercut Knapsack's own pitch.
  2. **Carbon is IBM's governed/trademarked system** — worth a glance before anything public-facing.
  3. **The proof is the build process, not the URL** — a live build (or recorded transcript) of Claude
     respecting/violating Carbon conventions is more convincing than a finished screenshot.

---

## Chairman's verdict

### Where the council agrees
- Home-page-only + standalone app + new URL is the right shape; the plumbing is sound.
- The real thesis is "can AI produce *idiomatic* Carbon," not "can AI scaffold a Carbon app."
  Hardcoded hex where a token belongs = thesis failed, and DS practitioners will spot it instantly.
- The proof artifact is the build *process*, not the deployed URL.

### Where the council clashes
Redesign vs. 1:1 port. Contrarian + Outsider want a falsifiable 1:1 port (and a side-by-side demo);
the redesign choice tests the more interesting "AI speaks Carbon natively" claim but is harder to
grade. **This is the one decision that reshapes the plan.**

### Blind spots caught
Conflict of interest (no Knapsack product in the loop); Carbon's trademark; build-process-as-artifact.

### Recommendation
**Proceed, with three amendments regardless of the clash:** (1) define an idiomatic-Carbon pass/fail
rubric *before* building and grade against it; (2) capture wall-clock, interventions, and where Carbon
lacked a component; (3) adopt the Executor's build specifics (`sass-embedded` + `loadPaths` +
`quietDeps`/`silenceDeprecations`; `@ibm/plex`; verify a styled Button first).

### The one thing to do first
Write the Carbon-fidelity rubric into the plan before any code.

---

## Decisions taken by Amber (post-verdict)

1. **Fidelity test → Redesign + fidelity rubric.** Keep the Carbon-native redesign, add an explicit
   pass/fail rubric, grade against it.
2. **Knapsack angle → Design for the switcher.** Architect content↔presentation seam (`content.ts`)
   so a second design system swaps in trivially — leaning into the on-brand AI-assisted DS-migration
   story.
