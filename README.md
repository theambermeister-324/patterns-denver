# Patterns Denver — AI Sandbox Workshop

**June 11, 2026 · Rhino District, Denver**

This is the workshop sandbox for the Patterns Denver AI Sandbox session. If you're a participant, start with **[WORKSHOP.md](WORKSHOP.md)**.

A Claude Code-powered knowledge base pre-configured for design system source material. Drop in your component docs, pattern library, tokens, or any design system documentation — and use Claude to surface gaps, answer questions, and automate the first thing worth automating.

> *"Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate? Deploy it."*

## How It Works

- **`raw/`** — your inbox. Drop any source files here (markdown, text, PDFs).
- **`sources/`** — processed originals. Claude moves files here after ingestion; never altered.
- **`wiki/`** — the knowledge base. Claude writes and maintains all pages, cross-references, and indexes.
- **`outputs/`** — filed answers. Analyses and responses worth keeping land here.
- **`_types/`** — frontmatter schemas. Defines the shape of each page type.

Claude handles all writing, filing, and bookkeeping. You curate sources and ask questions.

## Getting Started

### 1. Clone this template

```bash
gh repo create my-kb --template knapsack-labs/llm-knowledge-base-template --clone
cd my-kb
```

### 2. Install dependencies

```bash
pnpm install
# or: npm install
```

### 3. Open in Claude Code and run setup

```
/setup
```

This checks your environment, validates the hook, and walks you through first-run initialization.

### 4. Add sources and start ingesting

Drop files into `raw/`, then:

```
/ingest all
```

Or ingest a specific file:

```
/ingest my-document.pdf
```

### 5. Ask questions

```
/query What are the key themes across all sources?
```

### 6. Run a health check

```
/lint
```

## Customizing for Your Domain

Add domain-specific entity types in `_types/`. For example, a customer knowledge base might add `customer.md`, `meeting.md`, and `contact.md` types. See `_types/article.md` for the schema format.

Update `CLAUDE.md`'s H1 title to reflect your domain — Claude uses this to stay oriented.

## Example Content

This repo ships with a working example: a **Home Coffee Roasting** knowledge base built from 3 ingested sources. It demonstrates how ingestion, wiki pages, cross-references, and LOG.md work in practice. Delete `wiki/` and `sources/` contents when you're ready to start fresh.

## Skills Reference

| Command | Purpose |
|---------|---------|
| `/ingest [file\|all]` | Process source files into the wiki |
| `/query <question>` | Ask a question against the wiki |
| `/lint` | Health check — find gaps, orphans, contradictions |
| `/setup` | First-run environment check |

## Stack

- [Claude Code](https://claude.ai/code) — the AI that runs everything
- [mdbase](https://github.com/knapsack-labs/mdbase) — frontmatter validation and typed collections
