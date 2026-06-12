# LLM Council Transcript — Phase 2 Plan (efficiency retrospective)

**Date:** 2026-06-12
**Counciled by:** Amber Atkins

## Original question
Produce a Phase 1 receipts report (token usage + efficiency lessons) for the AI-driven Carbon
rebuild, then have the council recommend a plan for Phase 2 (rebuilding the remaining 6 pages)
that maximizes reuse and minimizes the rework/token leaks observed.

## Framed question
"What's the most efficient plan for Phase 2 — rebuilding the remaining 6 pages of the Patterns
Denver workshop site in IBM Carbon — given a Phase 1 retrospective showing the home-page POC was
built cheaply/fast but ~289,000 tokens went to council *planning*, plus rework leaks (SCSS imported
before written, a guessed non-existent Carbon class, fonts redone 3×, docs-MCP quota/truncated
WebFetch, verification round-trips)?"

---

## Advisor responses

### The Contrarian
The build is the cheap part — so the only thing worth optimizing is the 289k deliberation and the
rework. Don't re-run the council. Phase 2 is one templating problem repeated six times: build the
most component-complex page as a reference, extract a checklist, batch the rest. Kill the specific
leaks (write SCSS before importing; stop trusting the docs MCP — grep node_modules once and cache).
Flaws being ignored: (1) main-thread build tokens were never instrumented — "cheap" is unmeasured;
(2) the 6 pages aren't homogeneous — pick the reference by *component coverage*, not gut; (3) deploy
is still pending — ship Phase 1 first or you bake a Carbon issue into all six; (4) "switcher-ready"
content.ts is untested abstraction tax — don't pay it five more times until one switch has happened.

### The First Principles Thinker
Wrong unit of work. The problem isn't "build 6 pages efficiently" — it's "never re-decide a settled
question." Phase 1 already paid the architecture tax; those decisions are facts now. Don't plan it —
*codify* it into a CARBON_BUILD.md fed as fixed context, and the 6 pages become mechanical. You're
optimizing wrong: a 289k-token council producing a 2-second build is a counter-proof of your own
"AI + design systems = efficient" thesis. Phase 2's real deliverable is demonstrating the *second*
time is cheap — measure tokens-per-page; if page 6 costs what page 1 did, you failed regardless of
fidelity. Automate the rubric; reserve council judgment for the one genuinely open question (the
switcher), not for re-paving paved road.

### The Expansionist
Invert the ratio and the leftover capacity is pure upside. Don't plan 6 pages — plan ONE (Setup),
turn the rework log into a reusable CARBON-PLAYBOOK.md, batch 2-6. Build in upside now: (1) the
harness IS the switcher — define each page's content as generic primitives (hero/steps/card-grid)
and Material/Fluent/Polaris become a render target you flip; (2) instrument the build — per-page
tokens, rework events, time-to-rubric — "6 idiomatic pages, N tokens, zero hand-coding" is the
sellable proof, not the pages; (3) the bigger play: harness + metrics + switcher = a repeatable
"AI builds your design system's reference app, with receipts" offering. Build the harness once;
everything downstream compounds.

### The Outsider
You spent 289,000 tokens *planning* to rebuild one page, and the building was quick. The plan cost
more than the work — like hiring a committee to discuss hanging a poster. Phase 1 was slow from
process overhead + avoidable mistakes (a missing file, a guessed-wrong style name, fonts redone
three times, broken doc lookups) — those need a *checklist*, not a council. For Phase 2: don't
re-plan — the home page IS the template; copy its structure/fonts/styles. Write down the 4 things
that broke so they don't break six more times. Build all 6 in one pass; review once at the end. And
the question nobody's asking: does a 7-page event site need a giant corporate UI toolkit at all?
That choice generated most of the friction.

### The Executor
**Routing:** don't add react-router — 7 fixed-nav pages is `useState` + `window.location.hash`.
**PageShell first:** extract Header/HeaderNavigation/HeaderMenuItem + footer + `<Theme>` into
`PageShell.tsx` ({active, onNavigate, children}); do it as commit #1 against the home page, prove no
regression, never touch it again. **Content:** extend `content.ts` with discriminated unions
(`checklist | steps | promptCard | galleryItem | linkList | embed`); pages become dumb renderers —
highest-leverage move. **Components per page:** Setup → List/Checkbox/Accordion; Playbook →
Accordion/numbered Tiles; Prompts → **`CodeSnippet` (`type="multi"`, built-in copy button) — the
real gap, don't hand-roll**; Gallery → Grid/Column + AspectRatio + ClickableTile; Next steps → Tile
+ Button/Link + Tag; Feedback → **wrap the survey iframe in a Tile, don't rebuild a form**. Two gaps
total. **Don't blind-parallelize — pipeline:** land PageShell + content types + the 2 new patterns
serially, then the 6 pages are trivially batchable. **Slash overhead:** resolve every component name
from one `node_modules` `.d.ts` read (skip docs MCP/WebFetch — they thrash); verify once at the end
(one screenshot sweep); don't touch vite.config (no dev-server restarts); cap the council.

---

## Peer review highlights
Anonymization map: A = Executor, B = Contrarian, C = Outsider, D = Expansionist, E = First Principles.

- **Strongest (unanimous): Response E (First Principles).** Names the real error — "never re-decide a
  settled question" — gives the only falsifiable success metric (tokens-per-page; if page 6 costs
  what page 1 did, you failed), and scopes scarce council judgment to the one open question (the
  switcher). B (Contrarian) is the sharpest *tactically* and catches real leaks; A (Executor) is the
  best pure execution plan; but E sets the frame the others operate inside.
- **Biggest blind spot (majority): Response D (Expansionist).** Asked for the *most efficient* plan,
  it piles on instrumentation + a switcher harness + a productized offering — re-spending on
  abstraction the same way Phase 1 over-spent on planning. Premature until one cheap page-batch
  exists. (One reviewer instead flagged C for dismissing Carbon, which is the engagement's whole
  point.)
- **What ALL FIVE missed (peer round):**
  1. None questioned whether the *council itself* should run on a task this small — convening five
     advisors to plan a template job is the same waste recurring. The honest move is a checklist.
  2. No one set a **token budget** before starting; they said "less," never a number.
  3. The baseline is **unmeasured** — "289k planning vs cheap build" never measured main-thread
     build tokens, so "tokens-per-page" has no denominator yet.
  4. Efficiency was optimized in isolation, not tied to **shipped value** (Phase 1 deploy status).

---

## Chairman's verdict

### Where the council agrees
- The build was never the problem — re-deciding settled questions was. Don't run another big council.
- Codify Phase 1 into a fixed-context build doc (`CARBON_BUILD.md`); read Carbon truth from
  `node_modules`, never the docs MCP/WebFetch.
- Extract a `PageShell` once; `useState` + hash routing, no react-router.
- Pages become dumb renderers over a typed `content.ts` block model.
- Pipeline (foundation first, then batch); two component gaps (CodeSnippet, iframe-in-Tile) pre-solved.
- Verify once at the end; freeze config.

### Where the council clashes
How much to build beyond the 6 pages. Expansionist wants instrumentation + switcher harness +
productization now; the majority calls that premature abstraction tax. Synthesis: lightweight
instrumentation yes (it's the receipts), switcher harness + productization deferred.

### Blind spots caught
Unmeasured build-token baseline (no tokens-per-page denominator); Phase 1 deploy status; no token
budget set.

### Recommendation
Execute Phase 2 directly against a codified `CARBON_BUILD.md`, lean, with light per-page metrics —
and treat this as the last council for the redesign.

### The one thing to do first
Write `CARBON_BUILD.md` from a single `node_modules` pass before any page work.

---

## Decisions taken by Amber (post-verdict)
1. **Phase 2 scope → Lean 6 pages + light metrics.** Defer the switcher harness and productization.
2. **Deploy gate → Build now, deploy in parallel.** (Netlify Git auto-build ships each push to
   `carbon-redesign`; Phase 1 already deployed, with the pnpm→npm build fix in commit `86b0706`.)
