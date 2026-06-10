# Patterns Denver — AI Sandbox Workshop

**June 11, 2026 · Rhino District, Denver**

This is the workshop sandbox for the Patterns Denver AI Sandbox session. If you're a participant, start with **[WORKSHOP.md](WORKSHOP.md)**.

A Claude Code-powered knowledge base pre-configured for design system source material. Drop in your component docs, pattern library, tokens, or any design system documentation — and use Claude to surface gaps, answer questions, and automate the first thing worth automating.

> *"Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate? Deploy it."*

## Quick start

```bash
git clone https://github.com/theambermeister-324/patterns-denver.git
cd patterns-denver
npm install
claude
```

Then in Claude Code:
```
/setup
/ingest all
/query What are the documentation gaps in this design system?
```

A sample design system (`raw/sample-design-system.md`) is pre-loaded so you can start immediately. Replace it with your own docs anytime.

## Commands

| Command | Purpose |
|---|---|
| `/setup` | First-run environment check |
| `/ingest all` | Process everything in `raw/` into the wiki |
| `/query <question>` | Ask a question against the knowledge base |
| `/lint` | Health check — find gaps, orphans, contradictions |

## Gallery wall

All pair outputs live in `gallery/`. The deployed gallery is at:
**[patterns-denver-2026.netlify.app](https://patterns-denver-2026.netlify.app)**

## Facilitators

- **Amber Atkins** — Knapsack
- **Angie Stevenson** — Knapsack
- **Nate Wearin** — FuegoUX

---

*Built on [knapsack-labs/llm-knowledge-base-template](https://github.com/knapsack-labs/llm-knowledge-base-template)*
