# Triage Card — Stuck? Check These 3 Things First

Before raising your hand, run through this list. Most issues resolve here.

---

## 1. Is Claude Code running?

Open your terminal and type `claude`. If nothing happens:
- Make sure you're inside the `patterns-denver` folder: `cd patterns-denver`
- If Claude Code isn't installed: `npm install -g @anthropic-ai/claude-code`
- If you get a permissions error: ask Angie

---

## 2. Is there something in `raw/`?

The `/ingest` command needs files to process. Check:
```bash
ls raw/
```
If it's empty, either:
- Drop in a file from your design system (any markdown, text, or PDF)
- Or use the sample that's already there: `raw/sample-design-system.md`

---

## 3. Did you run `/setup` first?

If you skipped setup and things feel broken, run it now:
```
/setup
```
Then try your command again.

---

## Still stuck?

| Problem | Who to ask |
|---|---|
| Claude isn't responding or errors out | Angie (circulating) |
| The environment won't start / npm errors | Angie or Amber — they have a script for this |
| "I don't know what to ask" | Amber or Nate — this is the real question |
| Git / clone issues | Angie or Amber |

---

*One printed copy per pair. Don't lose this.*
