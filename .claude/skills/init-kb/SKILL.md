---
name: init-kb
description: >
  This skill should be used when the user says "init", "initialize", "init kb",
  "set up this knowledge base", or is starting a new KB and needs to configure
  its topic, goals, entity types, and folder structure for the first time.
---

Configure a freshly cloned knowledge base for a specific topic. Run once per KB.
This is distinct from `/setup` (environment) — this defines what the KB is about.

## Step 1: Gather context

**Option A — Ask the user:**

Ask these questions (can be in one message):
1. What topic or domain is this KB about?
2. What goals should it serve — what questions should it answer, what decisions should it inform?
3. What kinds of entities will be tracked? (e.g. people, companies, papers / recipes, techniques, equipment / concepts, experiments, results)

**Option B — Infer from content (offer this if `raw/` has files or the user pastes something):**

Say: "I can read your initial sources and infer the topic, goals, and entity types from them — would you prefer that over answering questions manually?"

If yes: read the files in `raw/`, identify recurring concepts, entity types, and themes, then present a proposed configuration for the user to confirm or adjust before proceeding.

---

## Step 2: Propose structure

Based on the gathered context, propose:

1. **Additional `_types/`** beyond the starters (`article`, `source`, `output`) — one per major entity type (e.g. `person`, `company`, `paper`, `experiment`)
2. **Initial wiki subfolder structure** — suggest folders for entity types that will likely reach 3+ pages
3. **Tags taxonomy** — 5–10 initial tags that reflect the domain

Present these as a proposal and ask for confirmation before creating anything.

---

## Step 3: Create type definitions

For each approved new type, create `_types/<name>.md`. Use this pattern as a base, adjusting fields for the entity type:

```yaml
---
name: <name>
description: "<one-line description>"
fields:
  title:
    type: string
    required: true
  created:
    type: date
    generated: now
  updated:
    type: date
    generated: now_on_write
  tags:
    type: list
    items:
      type: string
---

<Usage notes — when to use this type, what goes on a page of this type>
```

---

## Step 4: Create wiki stubs

If `wiki/index.md` or `wiki/log.md` don't exist, create them:

**`wiki/index.md`:**
```markdown
---
type: meta
title: Index
description: Master catalog of all wiki pages
updated: <today>
---

| Page | Type | Summary |
|------|------|---------|
```

**`wiki/log.md`:**
```markdown
---
type: meta
title: Log
description: Chronological record of all operations
updated: <today>
---
```

Create stub `index.md` files for any approved subfolders:

```markdown
---
type: meta
title: <Folder Name>
description: Index of <folder> pages
updated: <today>
---

| Page | Summary |
|------|---------|
```

---

## Step 5: Update CLAUDE.md

Update the H1 heading in `CLAUDE.md` to reflect the topic:
```
# Knowledge Base: <Topic>
```

---

## Step 6: Log the initialization

Append to `wiki/log.md`:
```
## [YYYY-MM-DD] init | KB initialized — <topic>
- Topic: <topic>
- Goals: <brief summary>
- Types created: <list>
- Subfolders created: <list>
```
