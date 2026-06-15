---
name: spec-export
description: "Compile a completed application spec from wiki/specs/ into a single shareable document in outputs/."
argument-hint: "[app-slug]"
---

Compile all section pages for an application spec into a single, shareable document.

## Step 1: Resolve the app slug

If an argument was provided, use it as the `<app-slug>`.

If no argument:
- Check `wiki/specs/` for existing spec subfolders.
- If one spec exists: use it, confirming with a brief note.
- If multiple exist: list them and ask which to export.
- If none exist: say "No specs found. Run `/spec` to start one." and stop.

## Step 2: Read all spec pages

Read all `.md` files in `wiki/specs/<app-slug>/` except `index.md`. Collect content from whichever section pages exist:
- `problem.md`
- `users.md`
- `goals.md`
- `flows.md`
- `features.md`
- `constraints.md`
- `open-questions.md`

Note which sections are missing — they'll be omitted from the export with a note.

## Step 3: Write the export document

Write to `outputs/spec-<app-slug>.md` with this structure:

```markdown
---
type: output
title: "App Spec: <App Name>"
query: "spec export"
created: <today>
sources:
  - wiki/specs/<app-slug>/problem.md
  - wiki/specs/<app-slug>/users.md
  - <... all pages that exist>
---

# App Spec: <App Name>

> <One-paragraph executive summary synthesized from all sections. 3–5 sentences.
> Cover: what the app does, who it's for, the key goal, and the biggest open question or risk.>

---

## Problem

<Full content from problem.md, reformatted as prose if needed>

---

## Users

<Full content from users.md>

---

## Goals

<Full content from goals.md>

---

## Core Flows

<Full content from flows.md>

---

## Features & Scope

<Full content from features.md>

---

## Constraints

<Full content from constraints.md>

---

## Open Questions

<Full content from open-questions.md, or "None remaining." if resolved>

---

*Generated from `wiki/specs/<app-slug>/` on <today>. To update, run `/spec <app-slug>`.*
```

**Section ordering is fixed:** Problem → Users → Goals → Flows → Features → Constraints → Open Questions.

If a section is missing entirely, insert a placeholder:
```
## <Section Name>

> *Not yet documented. Run `/spec <app-slug>` to add this section.*
```

## Step 4: Report and log

After writing:
1. Print the output file path and approximate word count.
2. List which sections were included and which were missing.
3. Append to `wiki/log.md`:
   ```
   ## [YYYY-MM-DD] spec-export | <App Name>
   - Filed: outputs/spec-<app-slug>.md
   - Sections included: [list]
   - Sections missing: [list or "none"]
   ```
