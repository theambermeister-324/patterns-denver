# Story: We pointed AI at our workshop site and rebuilt it in IBM Carbon

A drafting source for a talk, a LinkedIn post, or a sales narrative. Every number below is
**measured** in this project — nothing is rounded up for effect. Items we *didn't* measure are
flagged honestly, because a room of design-system practitioners will smell hype.

---

## The thesis (one line)
Knapsack's pitch is that AI + a design system produces idiomatic output — fast. So we tested it on
ourselves: rebuild our own workshop site in **IBM Carbon** (a design system we don't own), with AI
doing the work and a panel of AI advisors pressure-testing every plan. It worked — and the *receipts*
are more interesting than the result.

## TL;DR
We rebuilt a 7-page workshop site as an 8-route Carbon React app, took it through a full
accessibility + QA pass (WCAG 2.2 AA, 56 automated tests, Lighthouse a11y 98), and then redesigned
the *experience* into a guided conversion funnel — across one working session. The build was never
the hard part. The expensive part was **deciding what to build**, and the durable lesson is that the
*second* page costs a fraction of the first once you stop re-deciding settled questions.

---

## The arc (four acts)

**Act 1 — Prove it (the home page).** Before writing code, we ran the plan through an AI "council"
(five advisors with different lenses + an anonymized peer review). Its sharpest catch: a free
"redesign" is *unfalsifiable* — if it looks good you let the AI freelance, if it looks bad maybe
Carbon just doesn't fit. Fix: define an **idiomatic-Carbon rubric up front** (real Carbon components,
spacing/type/color tokens, **zero hardcoded hex**, real IBM Plex, document where Carbon has no
component — e.g. there's no "hero"). The home page passed the rubric on the first real build.

**Act 2 — Scale it cheaply (the other 6 pages).** A second council reviewed the receipts and reframed
the work: *don't re-plan, codify.* We wrote a one-page build doc capturing every settled decision and
turned the pages into data + one dumb renderer. The 6 pages went from "six design problems" to "one
templating problem, six times."

**Act 3 — Prove it's safe (QA + a11y).** A reusable Playwright + axe suite found two real, serious
accessibility defects — text contrast on the hero and a keyboard-trap in code blocks — both fixed.
Result: **0 WCAG 2.2 AA violations** across all routes, desktop and mobile.

**Act 4 — Make it good (the experience).** A third council asked the question that mattered most:
this isn't a website, it's a *conversion instrument* for a workshop. So we added guide rails
(progress, "your sentence" pinned throughout, a "Stuck?" button, an in-cloud fallback for locked-down
laptops), an in-room **AI-readiness score** on the attendee's own docs, and consent-first data
handling — turning seven static pages into a funnel.

---

## The receipts (measured)
| Metric | Value |
|---|---|
| Pages rebuilt | 7 → **8 routes** in Carbon (added an in-room readiness check) |
| Accessibility | **0** WCAG 2.2 AA violations; **56** automated tests green (desktop + mobile) |
| Lighthouse | a11y **98** · best-practices **100** · performance **89** · SEO **91** |
| Idiomatic-Carbon rubric | passed — real components + tokens, **zero hardcoded hex**, real IBM Plex |
| Production build | **~2 seconds** (`vite build`) |
| Planning vs. building | one planning council ≈ **289,000 tokens**; the code build was the cheap part |

> Honest gap: we never instrumented total main-thread build tokens, so we don't claim a single
> end-to-end cost number. The ~289k figure is the *planning* council, measured. The point stands
> precisely because the build was so cheap by comparison.

---

## The five most repeatable lessons (the actually-interesting part)
1. **The planning cost more than the building.** ~289k tokens of deliberation produced a ~2-second
   build. For a design-systems audience this is the headline: with a good system, AI *building* is
   nearly free — the cost moves to judgment and re-decisions.
2. **Make the second time cheap.** The win in round two wasn't a faster model; it was a written build
   doc so nothing settled got re-litigated. Codify decisions → pages become mechanical.
3. **A token existing ≠ a class existing.** AI guessed a Carbon type class that's a real *token* but
   not an emitted CSS *class*. Lesson: verify against the running app and the installed package, not
   the docs (or the model's memory).
4. **The "limitation" was the advantage.** Advisors wanted a hosted browser sandbox for reliability;
   the right call was the opposite — running on the attendee's *own* docs is the entire point. Don't
   sand down your differentiator for polish.
5. **Consent gates the funnel.** The moment you capture anything from someone's proprietary docs, opt-in
   and "your data stays in your browser" stop being nice-to-haves and become the thing that makes the
   whole experience usable.

---

## Ready-to-post LinkedIn draft (honest voice — edit to taste)
> We rebuilt our workshop site in a design system we don't own — IBM Carbon — with AI doing the build.
>
> The surprising part wasn't that it worked. It's *where the cost went.*
>
> The code build took ~2 seconds. The expensive part was **deciding what to build** — we ran every
> plan through a panel of AI advisors that kept catching things we'd have shipped: an unfalsifiable
> "redesign," a contrast failure, a keyboard trap in our code blocks.
>
> By the second batch of pages, the build was nearly mechanical — not because of a better model, but
> because we'd written down every settled decision so we stopped re-deciding them.
>
> Final: 8 pages, 0 WCAG 2.2 AA violations, Lighthouse accessibility 98, idiomatic Carbon (real
> tokens, zero hardcoded hex).
>
> The lesson for anyone with a design system: AI *building* against a good system is close to free.
> The leverage is in how queryable and decided your system already is. That's the whole game.
>
> (Full write-up + the AI council transcripts in the comments.)

---

## Conference talk (for a design-systems / AI audience)
**Title options**
- "We let AI rebuild our site in someone else's design system. Here's what it cost."
- "The build was free. The deciding wasn't."
- "Idiomatic by default: AI + design systems, with receipts."

**Abstract (≈80 words)**
We pointed AI at our own workshop site and rebuilt it in IBM Carbon — a design system we don't
own — then took it through accessibility, QA, and a full experience redesign. Along the way we
pressure-tested every plan with a panel of AI advisors. This talk shares the receipts: what passed,
what broke, where the real cost lived (hint: not the code), and the five repeatable lessons for any
team trying to make their design system AI-ready.

**Outline (6 sections, ~25 min)**
1. The setup — the thesis, and why we tested it on ourselves (2 min)
2. Act 1: the rubric that made "idiomatic" falsifiable (4 min)
3. Act 2: why the second page was nearly free (4 min)
4. Act 3: the two accessibility bugs AI shipped — and the suite that caught them (4 min)
5. Act 4: from 7 static pages to a conversion funnel (5 min)
6. The five lessons + "what this means for your design system" → the AI-readiness question (6 min)

---

## What to attach / link
- Before/after: the live original vs. the Carbon redesign URL
- The three council transcripts (`council-transcript-*.md`) — the "AI reviewing AI" angle plays well
- The QA report (`qa-report-20260612.html`) for the a11y receipts
- The enhancements doc (`carbon-app/ENHANCEMENTS.md`) for the experience redesign

## Caveats to keep it honest on stage
- Total end-to-end token/time cost wasn't instrumented — cite the measured pieces, not a made-up total.
- A few experience features are scaffolded but need a backend to fully activate (native gallery,
  per-result share images, follow-up email) — see ENHANCEMENTS.md.
