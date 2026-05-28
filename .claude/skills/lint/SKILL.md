---
name: lint
description: >
  This skill should be used when the user says "lint", "health check", "audit wiki",
  or "check wiki". Scans all wiki pages for issues and produces a structured report.
  Requires the user to be present — fixes are made interactively with their approval.
---

Run a full health check on the knowledge base wiki. This is an interactive session —
present findings, then wait for the user to decide what to fix before touching anything.

## Scan procedure

Read `wiki/index.md` to get the full page list, then read each page. Check for:

- **Contradictions** — same entity attributed different values on different pages (e.g. one page says X was founded in 2010, another says 2012). Flag with page names and the conflicting statements.
- **Unsourced claims** — assertions not backed by any file listed in the page's `sources:` frontmatter field
- **Orphan pages** — pages with no inbound links from other wiki pages
- **Missing pages** — concepts mentioned across multiple pages but lacking their own dedicated page
- **Missing cross-references** — first mentions of a concept that should link to its page but don't
- **Stale content** — pages whose cited source has been superseded by a newer ingested source
- **Oversized pages** — pages exceeding ~800 words that likely should be split

## Report format

```
## Health Check Report — [YYYY-MM-DD]

### Contradictions
- [ ] [page-a.md] vs [page-b.md]: "[claim A]" vs "[claim B]"

### Unsourced Claims
- [ ] [page.md]: "[claim]" — no source in sources/ supports this

### Orphan Pages
- [ ] [page.md] — no other page links here

### Missing Pages
- [ ] "[concept]" — mentioned in [page-a.md], [page-b.md] but has no page

### Missing Cross-References
- [ ] [page.md] mentions "[concept]" but doesn't link to [concept.md]

### Stale Content
- [ ] [page.md] — based on [source-a] but [source-b] (ingested later) contradicts it

### Oversized Pages
- [ ] [page.md] (~N words) — consider splitting

### Suggested New Pages
- "[concept]" — worth its own page given frequency of mention

### Questions Worth Investigating
- [question that would fill a notable gap]

### Sources Worth Finding
- [topic where more raw material would strengthen coverage]
```

## Interactive fixes

After presenting the report, ask for each category:
> "Want to fix [category] now, skip it, or come back to it later?"

Fix only what the user approves. Don't auto-fix anything.

## Log archiving

If `wiki/log.md` exceeds ~200 entries, ask the user:
> "log.md has grown large (~N entries). Want to archive older entries?"

If yes:
- Determine the date range of entries to archive (keep the 30 most recent in log.md)
- Move older entries to `logs/[start-date]--[end-date].md` (verbatim copy)
- Add a pointer at the top of `wiki/log.md`: `Entries before [date] archived to logs/[filename]`

## After fixing

Append to `wiki/log.md`:
```
## [YYYY-MM-DD] lint | Health Check
- Issues found: N
- Issues fixed: N
- [summary of what was fixed]
```
