# Gallery submission (spec skill) — copy-paste into the form

**Where:** https://patterns-denver-2026.netlify.app/gallery.html → scroll to **"Add your output"**.
Paste each field below into the matching input, then click **"Add to gallery →"**.
(The form posts to the live gallery wall, so it'll show up with the room's other outputs.)

---

### Name your session
```
An AI that interviews the experts and writes the spec
```

### Your starting sentence
```
I want to see if AI can help me turn what's in an expert's head into a real spec — without making them fill out a single form.
```

### What you built
```
A reusable Claude Code skill, /spec, that interviews subject-matter experts in plain conversation — no forms, no templates — and progressively builds a structured app spec across seven dimensions: problem, users, goals, flows, features, constraints, and non-functional requirements. It runs multiple experts in sequence (each one confirms or challenges what came before), tracks what people choose to defer, surfaces where they disagree, and compiles everything into one shareable document with /spec-export.
```

### What surprised you
```
The useful part wasn't the questions it asked — it was letting an expert say "not my area" and pass. That one move kept the conversation human and surfaced the disagreements a form would have silently averaged away.
```

### Link to your work
```
https://github.com/theambermeister-324/patterns-denver/tree/carbon-redesign/.claude/skills/spec
```
> Primary link = the skill in the repo. The example spec it produced — an "AC Door Monitor" Home
> Assistant automation built across multiple sessions — lives under `examples/wiki/specs/` in the
> original skill package if you'd rather show the output.

---

## How to submit (recommended)
1. Open **https://patterns-denver-2026.netlify.app/gallery.html** (the live wall + form).
2. Scroll to the **"Add your output"** form.
3. Paste the five fields above into: *Name your session · Your starting sentence · What you built ·
   What surprised you · Link to your work*.
4. Click **"Add to gallery →"**. Your entry appears on the live wall for the room.

**Note on the link:** it resolves once this skill is on the `carbon-redesign` branch (or main). It's
currently committed on the `spec-skill/add` branch — push/merge it first, or swap the link to the
repo root `https://github.com/theambermeister-324/patterns-denver` until then.

**Tip:** keep "What you built" / "What surprised you" punchy — the wall shows many entries, and the
*surprise* line ("the magic was letting experts pass") is the hook that makes people click.
