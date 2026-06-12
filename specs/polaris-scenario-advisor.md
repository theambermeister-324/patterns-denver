# Spec: Polaris Scenario Advisor

A scenario-based discovery and communication tool for the Polaris design system. Give it your scenario in plain language; it tells you what exists in the system, which components fit, how to use them, and frames the answer for your role.

---

## Problem

Communication between product and design breaks down because it's hard to see what already exists in the design system (Polaris). Today, answering "how are we supposed to use this component in this scenario?" means sifting through documentation. People want to start from their *scenario* and get guided to the right components and layout — not start from an alphabetical component list and guess.

This causes rework: product writes requirements that don't map to the system, designers reinvent existing patterns, developers build things that already exist.

---

## Goal

A tool where a user describes what they're trying to build ("a settings page where merchants manage notification preferences") and receives:

1. **Recommended Polaris components** that fit the scenario, with rationale for each
2. **A suggested layout** showing how the components compose together
3. **Usage guidance** — how to use each component correctly *in this scenario* (not generic docs), including do/don'ts
4. **Links** to the relevant Polaris documentation for going deeper
5. **Rework warnings** — proactive "hey, consider this instead" suggestions when the scenario implies an anti-pattern or a near-miss with an existing pattern

---

## Personas

The same scenario should produce role-appropriate output. Support a persona selector (and consider that real people mix roles):

| Persona | Need | Output emphasis |
|---|---|---|
| **Product person** | Write requirements that map to what the system can do | Plain-language capability summary; component names they can reference in the req; constraints to be aware of |
| **Designer** | Select the right components to meet the requirements | Component recommendations with visual/anatomy context; layout suggestion; when-to-use-instead alternatives |
| **Developer** | Consume and build | Component names with props/variants relevant to the scenario; code snippets; links to API docs |

A core ambition: the output for one scenario should be **shareable across roles** — the tool acts as a communication artifact between product, design, and engineering (a shared "voice of the user" for the scenario), so all three are talking about the same components and constraints.

---

## Core user flow

1. User selects (or skips) a persona.
2. User describes their scenario in free text. Optionally answers 1–2 clarifying questions the tool asks.
3. Tool returns: recommended components (with rationale), a suggested layout, scenario-specific usage guidance, doc links, and any "consider this to reduce rework" flags.
4. User can refine ("what if it also needs bulk actions?") and the recommendation updates.
5. User can copy/share the result as a brief — formatted appropriately for handing to another role.

---

## Data source

- Polaris documentation is public at https://polaris.shopify.com (components, patterns, design guidelines, tokens).
- For v1, embed a curated subset of component knowledge directly (see Scope) rather than live-crawling. Structure it as one markdown spec per component: purpose, when to use / when not to, anatomy, key props/variants, common scenarios, accessibility notes, doc URL.
- The quality of recommendations depends on this structured component knowledge — treat the component `.md` files as a first-class part of the build, not an afterthought.
- Component knowledge files live in `specs/polaris-components/`. See `README.md` in that directory for the schema.

---

## Architecture (suggested)

- Single-page web app (React) — or an Astro page in the Enable repo at `/app/scenario-advisor/polaris`
- Calls the Anthropic API: scenario + persona + structured component knowledge → prompt → structured JSON recommendation (components, rationale, layout description, guidance, warnings, links) that the UI renders
- Layout suggestion rendered as a simple annotated wireframe (boxes labeled with component names) — no pixel-perfect rendering needed for v1
- No backend/auth required for v1; no persistence beyond the session (a "copy as markdown brief" button covers sharing)
- Model: `claude-sonnet-4-6` for v1; upgrade to `claude-opus-4-8` if output quality needs lifting

---

## Scope for v1 (prototype)

**In:**
- 12–20 high-traffic Polaris components (see `specs/polaris-components/`)
- Free-text scenario input + persona selector
- Component recommendations with rationale and doc links
- Text/wireframe-level layout suggestion
- Persona-formatted output + copy-as-brief
- At least 3 "rework warning" rules (e.g., scenario implies a custom table → point to IndexTable; implies custom dialog → point to Modal; implies custom notification bar → point to Banner)

**Out (for now):**
- Live Polaris doc crawling/sync
- Code generation beyond short snippets
- Figma integration
- Accounts, saved scenarios, team workspaces
- Full component coverage

---

## Success criteria

- For 5 test scenarios (written before building), the tool recommends components a Polaris-experienced designer agrees with
- A product person can paste the output into a requirement doc without translation
- Side-by-side: answering a scenario via the tool is meaningfully faster than finding the same answer in polaris.shopify.com docs
- At least one test scenario triggers a useful rework warning

---

## Open questions

- Who is the primary user for v1 — pick one persona to nail first (recommendation: **designer**, since component selection is the most concrete need)
- Should clarifying questions be a fixed short list per scenario type, or model-driven?
- Is the layout suggestion valuable as text alone, or does v1 need the wireframe rendering?

---

## Origin

Built during the Patterns Denver 2026 AI sandbox workshop (June 11, 2026) at Zero Hour Cafe, Denver CO. One of 7 group outputs from the afternoon sandbox session.
