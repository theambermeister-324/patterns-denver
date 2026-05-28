# Patterns Denver — AI Sandbox Workshop
**June 11, 2026 · Rhino District, Denver**
Facilitated by Amber Atkins (Knapsack) · Aaron Stone (Crux Digital) · Nate Wearin (FuegoUX) · Angie Stevenson (Knapsack)

---

## What is this?

This repo is your sandbox for the afternoon session. It's a Claude Code-powered knowledge base that you're going to point at your design system — and watch an AI agent do something useful with it.

You don't need to know Go. You don't need Docker. You need Claude Code and something from your design system worth questioning.

---

## Before you start — write this down

> **"I want to see if AI can help me with ___."**

Fill in that blank right now, on paper. That's your prompt for the afternoon. Everything you do in this sandbox should be in service of that sentence.

---

## Getting started (10 minutes)

### 1. You're already here
You cloned this repo. Good.

### 2. Open it in Claude Code
```bash
claude
```

If Claude Code isn't installed: `npm install -g @anthropic-ai/claude-code`

### 3. Drop your design system docs into `raw/`
Anything works: a component spec, a Figma export, a Confluence page you copy-pasted, a README, release notes. If you don't have anything with you, the `raw/` folder already has a sample — use that.

### 4. Run setup
```
/setup
```

### 5. Ingest your source material
```
/ingest all
```
Claude will read what's in `raw/`, organize it into the `wiki/`, and tell you what it found.

### 6. Ask it something real
```
/query What are the documentation gaps in this design system?
```

Or try something specific to your blank:
```
/query What components are missing usage examples?
/query Where does this design system have accessibility gaps?
/query What would I need to add to make this AI-ready?
```

---

## What "deployed" means here

When you run `/ingest` and `/query`, you've deployed an agent against your design system. It read your docs, organized them, and answered a question you actually have. That's agentic AI doing real work on real material.

The prompt on the screen when you sat down was: *"Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate? Deploy it."*

You just did that.

---

## Capture your output

When you've found something worth sharing, add it to the gallery:

1. Open `gallery/` — find your pair's folder
2. Drop in a screenshot or paste your query + response into `pair-notes.md`
3. One sentence: what you built and what it showed you
4. One sentence: what surprised you or what broke

The gallery URL will be shared with everyone after the session.

---

## Stuck?

See `triage-card.md` — three things to check before raising your hand.

Facilitators circulating: **Amber**, **Angie**, **Nate**
Technical questions about the environment: **Aaron**

---

## The sandbox prompt for this track

> *Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate? Deploy it.*

---

*This sandbox runs on [Claude Code](https://claude.ai/code) and the [knapsack-labs/llm-knowledge-base-template](https://github.com/knapsack-labs/llm-knowledge-base-template). The advanced track is running [CongaLine](https://github.com/cruxdigital-llc/CongaLine) by Crux Digital.*
