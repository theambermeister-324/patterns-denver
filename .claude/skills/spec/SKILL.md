---
name: spec
description: "Interactively spec out a new application with one or more subject matter experts. Supports sequential multi-expert sessions that confirm or surface contradictions against previously collected input."
argument-hint: "[app-name-or-slug]"
---

Help a subject matter expert progressively spec out a new application. Supports both single-expert and multi-expert sequential sessions. The goal is a complete, structured spec across 7 dimensions, with agreement between contributors flagging confidence and disagreement surfacing decision points.

---

## Step 1: Determine context

If an argument was provided, treat it as the app name or slug. If no argument:
- Check whether `wiki/specs/` contains any existing spec subfolders (use `ls wiki/specs/`).
- If specs exist: list them with a one-line summary and ask which to continue, or whether to start a new one.
- If no specs exist: proceed to Step 2.

**If the spec exists and already has content:**
- Read `wiki/specs/<app-slug>/index.md` and all section pages.
- Ask: "Who is contributing today?" (get their name)
- Check if `wiki/specs/<app-slug>/index.md` lists previous contributors.
  - If yes: switch to **Compare Mode** (Step 3b).
  - If no: resume the single-expert flow (Step 4) as if continuing where it left off, but record the contributor name.

**If the spec does not exist:** proceed to Step 2.

---

## Step 2: Open intake (new spec only)

Ask who is contributing: "What's your name? I'll attribute your input in the spec."

Then say exactly this — no other preamble:

> Tell me about the application you want to build. Anything — a one-liner, a brain dump, a story, a user complaint. Whatever's in your head right now.

Wait for their response. Do not prompt with categories or structure.

---

## Step 3a: First contributor — write initial pages

After receiving their response:

1. **Derive a kebab-case app slug** from the app name or idea. Confirm: "I'll call this `inventory-tracker` — let me know if you want a different name."

2. **Internally map** what they said against the 7 spec dimensions:
   - **Problem** — What problem exists? Why does this need to exist?
   - **Users** — Who experiences the problem? Who will use this?
   - **Goals** — What does success look like? What outcomes matter?
   - **Flows** — How do users accomplish their main goal? What's the core interaction?
   - **Features** — What must the app do? What's explicitly in scope?
   - **Constraints** — What limits the solution? (Tech stack, platform, timeline, team, regulations)
   - **Open Questions** — What's still uncertain or unresolved?

3. **Write wiki pages for everything clearly established.** A dimension only gets a page if there's real, specific content — no placeholder pages. Include the contributor's name in the `contributors` frontmatter field.

4. **Create `wiki/specs/<app-slug>/index.md`** as the coverage dashboard (see formats below). Record contributor name in the Contributors section.

5. If `wiki/specs/index.md` doesn't exist yet, create it.

Then proceed to **Step 4** (identify gaps, ask questions).

---

## Step 3b: Subsequent contributor — Walkthrough Mode

A new expert is contributing to a spec that already has content from a previous session.

### Opening

Show a brief summary (one sentence per populated dimension), then say:

> "I'll walk you through what's been captured so far, point by point. For each item, just tell me:
> - **'Agree'** — if it's right as written
> - **'Comment'** — if you'd push back, add nuance, or see it differently
> - **'Skip'** — if it's outside your area
>
> Ready to start?"

### Item-level walkthrough

Go through each populated dimension in order. For each page:

1. **Name the dimension** and read its key claims as a short numbered list — 2–4 items per page, drawn from the substantive content, not headers. Don't just summarize; present the actual specific claims.

   Example:
   > "**Problem** — here's what we have:
   > 1. Running AC in an open room wastes energy because conditioned air escapes.
   > 2. There's no current alert mechanism — it relies entirely on manual awareness.
   > 3. This is unreliable across multiple rooms.
   >
   > Any of those land differently for you?"

2. **Wait for their response.** They may react to all items at once, or item by item. Either is fine.

3. **Process each reaction:**
   - **Agrees (explicit or implicit):** Add their name to `contributors` on the page. If they said something confirmatory, note it inline: `*(Confirmed by [Name])*`
   - **Comments / pushes back:** Judge severity:
     - *Nuance or additional detail* → enrich the page, attributed: `*(Added by [Name]: ...)*`
     - *Substantive disagreement* → write a contested point in `contested-points.md`. Mark the item inline: `> ⚡ *Contested — see [contested-points.md](contested-points.md)*`. Do NOT silently overwrite the original claim.
   - **Skips / defers:** Log to `open-questions.md` as `Deferred`. Increment deferral count for this topic category (see Deferral Pattern Detection below).

4. **After completing each dimension's walkthrough,** move to the next before writing — batch the wiki updates for that dimension once the expert has finished reacting to it.

### After the walkthrough

Once all populated dimensions are reviewed:
- Ask about dimensions that are missing, using adaptive questioning from Step 4.
- Then run the NFR checklist (Step 4b) if not already done.
- Update `wiki/specs/<app-slug>/index.md` with the new contributor, confidence scores, and contested point count.

---

## Handling Deferred Questions

At any point, an expert may not feel qualified to answer. They might say:
- "I don't know" / "Not sure"
- "That's more of a security/legal/technical question"
- "You'd need to ask [someone else]"
- "Skip" / "Pass" / "Not my area"

**When an expert defers:**
1. Acknowledge without pressure: "Got it — I'll flag that for someone with [domain] expertise."
2. Record who deferred, what domain is needed, and increment the **session deferral counter** for that topic category (see below).
3. Log to `open-questions.md` as `Deferred` with the expertise noted in the **Needs** column.
4. Move on immediately — never re-ask a deferred question in the same session.

**In Walkthrough Mode:** When a new expert joins, check `open-questions.md` for deferred items. If any match this expert's apparent domain, surface them first: "The previous contributor flagged a few [security / legal / ...] questions as outside their area — is that something you can speak to?"

---

## Deferral Pattern Detection

Track a **per-session deferral counter** by topic category. This is conversational state — not written to the wiki until the session ends.

### Topic categories

| Category | Covers |
|---|---|
| Security | Encryption, secrets management, pen testing, API security, rate limiting |
| Legal / Compliance | GDPR, HIPAA, PCI DSS, SOC 2, FedRAMP, audit logs, data regulations |
| Identity & Access | Authentication methods, authorization / roles, account provisioning |
| Data & Privacy | PII handling, retention, deletion, data residency |
| Technical | Reliability SLAs, performance, scalability, infrastructure, architecture |
| Internationalization | Languages, RTL, locale formats, translation workflow |
| Accessibility | WCAG level, screen readers, keyboard navigation |
| Integrations | Third-party APIs, data import/export, webhooks, event consumers |

### Threshold: 2 defers from the same category

After an expert defers **2 questions from the same topic category**, pause and ask:

> "You've passed on a couple of [Security] questions — that's completely fine. Would you like me to skip [Security] topics for the rest of this session and bundle them up for someone with that expertise?"

- **If yes:** Stop asking questions in that category. Add a single summary entry to `open-questions.md`: `All [Security] questions deferred — [Name] opted out of this topic area. Needs security expertise.` Do not list each question individually.
- **If no:** Continue asking, but don't revisit this offer again for the same category.

### Session summary

At the end of a session, if any categories were skipped entirely, include in the log entry:
```
- Skipped topics: [Security] (opted out), [Legal] (opted out)
```
This signals which expert profiles are needed in future sessions.

---

## Expert-Initiated Queries

At any point in a session, an expert may ask to drive the conversation rather than be led through it. Recognize these requests and respond immediately — they take priority over the current step.

---

### "Ask me about [topic]"

**Triggers:** "Ask me about security", "What questions do you have on integrations?", "Let's talk data privacy", "Hit me with your [topic] questions", "I want to cover [topic]"

**Response:**
1. Identify the matching topic category from the Deferral Pattern Detection table.
2. Pull questions from two sources:
   - The **NFR Checklist** questions for that category (Step 4b)
   - Any `open-questions.md` entries with `Status: Open` or `Status: Deferred` that map to that category
3. Ask them one at a time, as you would in the normal flow.
4. Apply deferral tracking as normal — if they defer 2 questions in this self-selected topic, simply note it (don't offer to skip — they chose this topic, so the offer would be odd).
5. After exhausting questions for that topic, ask: "That covers [topic]. Want to keep going with another area, or should I pick up where we left off?"

---

### "Show me what's been deferred" / "What couldn't others answer?"

**Triggers:** "What's been deferred?", "Show deferred questions", "What did others skip?", "Are there questions nobody answered?", "What's still open from other sessions?"

**Response:**
1. Read `open-questions.md`. Filter to rows where `Status` is `Deferred`.
2. If none: "Nothing's been deferred yet — everyone's been pretty comprehensive."
3. If some exist, group them by the `Needs` expertise column and present clearly:

   > "Here are the questions previous contributors passed on:
   >
   > **Security** (2 questions)
   > 1. Are there encryption requirements for data at rest?
   > 2. Is pen testing required before launch?
   >
   > **Legal / Compliance** (1 question)
   > 3. Does this app need GDPR compliance?
   >
   > Which of these are in your wheelhouse?"

4. Let the expert pick any they can answer. Ask each one individually. When answered, update `open-questions.md` status to `Resolved` with their name and answer.
5. For any they also defer, log as `Deferred` with their name added (indicating two experts couldn't answer — may need a specialist).

---

### "Show me the conflicts" / "I want to weigh in on disagreements"

**Triggers:** "Show me the contested points", "What did people disagree on?", "Are there any conflicts?", "I want to weigh in", "What's still in dispute?"

**Response:**
1. Read `contested-points.md`. If none: "No conflicts logged yet — contributors have been consistent."
2. Present each contested point one at a time with full context:

   > "**CP-1: Timer behavior when door closes**
   >
   > Here's the disagreement:
   > - **Alice** thinks the timer should cancel immediately when the door closes — problem solved, no need to act.
   > - **Bob** thinks the timer should still fire regardless — the AC was running inefficiently and should be turned off as a consequence.
   >
   > The design impact: if the timer cancels, the AC stays on when the door reopens. If it fires, the user may be surprised to find their AC off even though they closed the door.
   >
   > Do you have a view on this?"

3. **Accept any response:**
   - **Takes a side:** Add their position to the CP (see contested-points.md format below). If they align with an existing position, that position now has 2 supporters — note it as **Trending**.
   - **Offers a third option:** Add as a new position. Note that the disagreement is now 3-way.
   - **Defers:** Note `[Name] — no position` in the CP. Move on.
   - **Resolves it outright** ("the right answer is definitely X because..."): Mark as `Resolved — [decision]` with their reasoning. They may or may not be the decision-maker — note that explicitly if uncertain.

4. After all contested points are reviewed, summarize: "You weighed in on N conflicts. X are now trending toward a resolution, Y still need a decision."

---

## Step 4: Identify gaps and ask follow-up questions

After writing what's known (in either mode):

1. **Assess which dimensions are missing or thin.** "Thin" = vague content rather than specific content.

2. **Rank gaps by importance** — what's missing that would most change the design? Exclude deferred questions (already logged — don't re-ask them).

3. **Ask 2–3 questions**, numbered, specific to what was said.

   Good: "You mentioned enterprise users — are there different roles with different permissions, or does everyone see the same thing?"
   Bad: "Who are your users?"

4. If an answer contradicts something already written (from the same or a previous contributor), name it explicitly before filing it.

---

## Step 4b: Non-Functional Requirements Checklist

After the 7 core dimensions have at least one substantive answer, run through the non-functional requirements checklist. Do this as a **separate, clearly signaled pass**:

> "The core spec is taking shape. Let me quickly run through some areas that teams often overlook — these can be easy to defer if you're not the right person to answer them."

Work through each area **one at a time**, ask a single focused question, and accept a defer gracefully. Do not ask multiple sub-questions at once. Log deferred items with the required expertise.

### NFR Checklist

**Identity & Access**
- Authentication: How do users log in? (Username/password, SSO/SAML, OAuth, magic link, API key?)
- Authorization: Are there different roles or permission levels, or does everyone see the same thing?
- Account lifecycle: Who provisions accounts — users self-signup, admins create them, or SSO-provisioned?

**Data & Privacy**
- Does the app store or process personally identifiable information (PII)?
- Are there data retention or deletion requirements (e.g., GDPR right to erasure)?
- Any data residency or jurisdiction constraints (e.g., data must stay in the EU)?

**Security**
- Are there specific security requirements — pen testing, encryption at rest, API rate limiting?
- How will secrets and credentials be managed?

**Compliance & Regulatory**
- Does this app need to comply with any regulations? (HIPAA, PCI DSS, SOC 2, GDPR, FedRAMP, WCAG?)
- Are audit logs required — who did what, and when?

**Reliability & Performance**
- Is there an uptime SLA or availability requirement?
- Roughly how many concurrent users are expected, and is there a response time requirement?
- What happens if the app goes down — is there a recovery time objective?

**Internationalization & Accessibility**
- Does the app need to support multiple languages now or in the future?
- Are there right-to-left (RTL) language requirements?
- What level of accessibility compliance is required? (e.g., WCAG 2.1 AA)

**Integrations**
- Does the app need to connect to external systems, APIs, or data sources?
- Does it need to export or import data in specific formats?
- Will other systems need to consume this app's API?

Write confirmed answers to `wiki/specs/<app-slug>/nonfunctional.md`. Deferred items go to `open-questions.md` with `Deferred` status and the relevant expertise noted (e.g., "Security expertise", "Legal / compliance").

---

## Step 5: Update, repeat

After each round:
1. Update existing wiki pages with new content.
2. Update `wiki/specs/<app-slug>/index.md`.
3. Return to Step 4.

Continue until all 7 dimensions have at least one concrete, specific answer.

---

## Step 6: Wrap up

When all 7 dimensions have substantive content (or the user signals done):

1. Print the final coverage dashboard from the index.
2. List remaining open questions and any contested points.
3. Say: "Run `/spec-export <app-slug>` to compile into a single shareable document."

---

## Page Formats

### Section pages

```markdown
---
type: spec
title: "<App Name>: <Section Name>"
spec_app: <app-slug>
section: <section-name>
contributors:
  - <Name>
created: <today>
updated: <today>
---

# <App Name>: <Section Name>

<Structured content. Write in declarative present tense.
Mark uncertain items: > ⚠️ *Needs clarification*
Attribute contested items: > ⚡ *Contested — see [contested-points.md](contested-points.md)*>
```

### nonfunctional.md

```markdown
---
type: spec
title: "<App Name>: Non-Functional Requirements"
spec_app: <app-slug>
section: nonfunctional
contributors:
  - <Name>
created: <today>
updated: <today>
---

# <App Name>: Non-Functional Requirements

## Identity & Access
- **Authentication:** <answer or > ⚠️ *Deferred — see open-questions.md*>
- **Authorization / Roles:** <answer>
- **Account lifecycle:** <answer>

## Data & Privacy
- **PII handling:** <answer>
- **Retention / deletion:** <answer>
- **Data residency:** <answer>

## Security
- **Security requirements:** <answer>
- **Secrets management:** <answer>

## Compliance & Regulatory
- **Regulations:** <answer>
- **Audit logging:** <answer>

## Reliability & Performance
- **Availability SLA:** <answer>
- **Concurrent users / response time:** <answer>
- **Recovery objective:** <answer>

## Internationalization & Accessibility
- **Languages:** <answer>
- **RTL support:** <answer>
- **Accessibility standard:** <answer>

## Integrations
- **External systems:** <answer>
- **Data import/export:** <answer>
- **API consumers:** <answer>
```

Only include sections that have answers — omit sections where every item is deferred (those are in open-questions.md).

### contested-points.md

```markdown
---
type: spec
title: "<App Name>: Contested Points"
spec_app: <app-slug>
section: contested-points
contributors:
  - <All names who contributed any view>
created: <today>
updated: <today>
---

# <App Name>: Contested Points

Decision points where contributors disagreed. Each needs a resolution before the spec is final.

## CP-1: <Short topic label>

**Design impact:** <What changes depending on which view is adopted — stated once, up front>

### Positions

| Contributor | Session | Position | Summary |
|---|---|---|---|
| Alice | 1 | View A | Timer should cancel when door closes — problem resolved |
| Bob | 1 | View B | Timer should fire regardless — AC was still wasted |
| Carol | 2 | View A | Agrees with Alice; door closing means user resolved it |
| Dave | 2 | No position | Deferred |

**Status:** Open / Trending toward [View A] (2 vs 1) / Resolved — [decision and reasoning]
```

**Status progression:**
- `Open` — positions exist but no clear majority
- `Trending toward [View X]` — more contributors support one side, but no formal decision yet
- `Resolved — [decision]` — a decision has been made; record who made it and the reasoning

When resolved, keep the full position history (don't delete it) — it shows how the decision was reached. Remove from the index count.

### open-questions.md

```markdown
---
type: spec
title: "<App Name>: Open Questions"
spec_app: <app-slug>
section: open-questions
created: <today>
updated: <today>
---

# <App Name>: Open Questions

| # | Question | Raised by | Session | Status | Needs |
|---|---|---|---|---|---|
| 1 | <question text> | <Name> | 1 | Open | — |
| 2 | <question text> | <Name> | 1 | Deferred | Security expertise |
| 3 | <question text> | <Name> | 2 | Deferred | Legal / compliance |
```

**Status values:**
- `Open` — not yet answered, anyone can address it
- `Deferred` — explicitly passed by a contributor; the **Needs** column records what expertise is required
- `Resolved` — answered; update briefly then remove on next session

### index.md (coverage dashboard)

```markdown
---
type: spec
title: "<App Name>: Spec Index"
spec_app: <app-slug>
section: index
created: <today>
updated: <today>
---

# <App Name>

<One-sentence description>

## Contributors
- <Name> — Session 1 (YYYY-MM-DD)
- <Name> — Session 2 (YYYY-MM-DD)

## Coverage

| Dimension | Status | Confidence | Page |
|---|---|---|---|
| Problem | ✓ Covered | ★★☆ 1 contributor / ★★★ 2+ confirmed | [problem.md](problem.md) |
| Users | ⚠️ Thin | ★☆☆ | [users.md](users.md) |
| Goals | ✗ Missing | — | — |
| Flows | ✓ Covered | ★★★ Confirmed | [flows.md](flows.md) |
| Features | ✗ Missing | — | — |
| Constraints | ✓ Covered | ★★☆ | [constraints.md](constraints.md) |
| Non-Functional | ⚠️ Thin (N deferred) | ★☆☆ | [nonfunctional.md](nonfunctional.md) |
| Open Questions | N open, N deferred | — | [open-questions.md](open-questions.md) |
| Contested Points | N open | — | [contested-points.md](contested-points.md) |

**Confidence key:** ★☆☆ single contributor, unconfirmed · ★★☆ single contributor, detailed · ★★★ confirmed by 2+ contributors

## Sessions
- Session 1 (YYYY-MM-DD): <Name> — initial intake
- Session 2 (YYYY-MM-DD): <Name> — compare mode, N confirmations, N contested
```

---

## Log Entry

After each session, append to `wiki/log.md`:

```
## [YYYY-MM-DD] spec | <App Name>
- Session N: contributor "<Name>", mode: [intake | compare]
- Covered/updated: [list of pages]
- Confirmed: N dimensions · Contested: N points · Open questions: N
```
