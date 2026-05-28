# Knowledge Base: [Topic]

You are maintaining an LLM-powered knowledge base. Your job is to compile, organize, cross-reference, and maintain a structured markdown wiki from raw source material. I curate the sources and ask the questions. You do all the writing, filing, and bookkeeping.

## Skills

All operations are handled by skills. Invoke the relevant skill — don't improvise the workflow.

| When the user says… | Invoke |
|---|---|
| "setup", just cloned the repo | `/setup` |
| "init", "initialize", starting a new KB | `/init-kb` |
| "ingest", "file this", "process raw/…" | `/ingest` |
| "research [topic]", "find sources about…" | researcher agent |
| any question about the knowledge base content | `/query` |
| "lint", "health check", "audit wiki" | `/lint` |

## Directory Structure

```
./
├── CLAUDE.md              ← this file
├── mdbase.yaml            ← mdbase collection config
├── _types/                ← mdbase type definitions (one per type)
├── .claude/
│   ├── settings.json      ← permissions + hooks
│   ├── skills/            ← setup, init-kb, ingest, query, lint
│   └── agents/
│       └── researcher.md
├── raw/                   ← inbox: drop new source files here
├── assets/                ← images, diagrams, other non-text files
├── sources/               ← processed originals (moved from raw/, never altered)
├── wiki/                  ← LLM-maintained knowledge base
│   ├── index.md           ← master catalog of all wiki pages
│   ├── log.md             ← chronological record of all operations
│   ├── [topic].md         ← standalone article pages
│   └── [collection]/      ← subfolder when a type reaches 3+ pages
│       ├── index.md       ← lists all pages in this subfolder
│       ├── summary.md     ← prose synthesis of everything in this area
│       └── [entry].md
├── outputs/               ← filed answers, analyses, comparisons
└── logs/                  ← archived log segments (log.md overflow)
    └── YYYY-MM-DD--YYYY-MM-DD.md
```

## Directory Rules

**raw/** — Inbox. After ingestion, files move to `sources/`. Empty `raw/` means everything is processed.

**sources/** — Source of truth. Files are renamed on arrival but never altered. Every claim in the wiki must trace back to a file here.

**wiki/** — Owned entirely by Claude. Create, update, delete pages freely. When a type accumulates 3+ pages, move them into a subfolder with `index.md` and optionally `summary.md`. Keep `index.md` as the master catalog and `log.md` as the operation log.

**outputs/** — Filed explorations. Good Q&A answers compound the knowledge base.

**logs/** — Archived segments of `wiki/log.md`. When log.md gets long, older entries are moved here as `YYYY-MM-DD--YYYY-MM-DD.md` files covering their date range.

## Typed Collections (mdbase)

Every markdown file must have a `type` field in its YAML frontmatter. If a file has `type: foo`, look in `_types/foo.md` for the schema that defines the remaining required and optional frontmatter fields. A PostToolUse hook validates frontmatter automatically on every write.

When a new category of content emerges (people, companies, papers, etc.), propose a new type: create `_types/<name>.md` with the schema in frontmatter, migrate existing files, and run `npx mdbase validate` to verify.

## Style Guide

- Write clearly and concisely. No filler.
- Use headers, bullet points, and tables for structure.
- Bold key terms on first mention in a page.
- Wiki page filenames use kebab-case: `roast-levels.md`, `green-coffee.md`.
- Link to other wiki pages on first mention: `[Concept Name](concept-name.md)`
- Include a "Sources" section at the bottom of every wiki page.
- When sources disagree, note the contradiction explicitly.
- Keep pages atomic: aim for 200–600 words. Prefer many small linked pages over few large ones.
