# Prompt Templates — Patterns Denver Workshop

Six ready-to-use `/query` prompts for the workshop sandbox. Run any of these after `/ingest all` — then remix them for your own system.

---

## How to write a good prompt

Three things make a query land well:

**1. Be specific about what you want back**
"What are the gaps?" is a start. "Which gaps would cause a developer to ask a human instead of reading the docs?" is better. The more you narrow what a useful answer looks like, the more useful the answer.

**2. Name your audience**
Claude will answer differently for a developer joining the team vs. a design director reviewing coverage vs. a product manager writing a ticket. "What would [X] need to know?" is almost always a sharper prompt than "What does this system say about [X]?"

**3. Use your blank sentence as the north star**
You wrote "I want to see if AI can help me with ___." before pairing. Every prompt you write should be in service of that sentence. If you're getting answers that don't connect back to it, you've drifted — reorient.

---

## When you're stuck

**Got a thin or generic result?**
Add a constraint. Name a specific component, audience, or scenario:
```
/query What would a new engineer need to know about our Button component that isn't in the docs?
```

**Got a good result but don't know what to do next?**
Ask Claude to prioritize:
```
/query Which of these gaps would someone ask a human about right now, instead of reading the docs?
```

**Want to find your automation target?**
Ask what it couldn't answer:
```
/query What questions about this design system can you not answer from the documentation?
```

**Have a result you want to act on?**
Ask what documentation you'd need to make it automatable:
```
/query What would I need to document so an AI could reliably answer questions about [X]?
```

**Got a result that surprises you?**
That's the thing worth sharing. Drop it in your pair notes and put it in the gallery.

---

## Follow Claude's follow-up

After every `/query`, Claude will suggest one question you might not have thought to ask. This is not boilerplate — follow it. That's usually where the real automation target is.

---

## The six starting prompts

### 1. Surface documentation gaps
```
/query What are the documentation gaps in this design system?
```
A broad first pass. Claude will scan what's missing — components with no usage examples, accessibility gaps, rationale that was never written down.

---

### 2. Find accessibility gaps
```
/query Which components are missing accessibility guidance?
```
Narrows to a11y specifically. Useful if accessibility coverage is uneven across your component library.

---

### 3. Think like a new engineer
```
/query What would a new engineer need to know that isn't in these docs?
```
Forces a perspective shift. What do people learn by asking a human instead of reading the docs? That gap is your first automation target.

---

### 4. Find contradictions
```
/query Where does this system have contradictions or inconsistencies?
```
Good for mature systems with multiple authors. Token values that disagree, usage guidance that conflicts, patterns that have drifted from the components they're built on.

---

### 5. AI-readiness audit
```
/query What documentation would I need to add to make this system AI-ready?
```
Surfaces the difference between docs written for humans and docs an AI can reliably act on. "Use good judgment" is not AI-ready. Criteria and examples are.

---

### 6. Onboarding summary
```
/query Write a 3-sentence onboarding summary for a developer joining this team
```
A generative test. If the AI can write a coherent summary, your docs have enough signal. If it hedges or hallucinates, you've found the gaps.

---

## Remixing these for Monday

These prompts work against any Claude Code knowledge base pointed at design system content. To use them at work:

1. `git clone https://github.com/theambermeister-324/patterns-denver.git`
2. Drop your real docs into `raw/`
3. `/ingest all`
4. Run any of the prompts above

The prompts don't change. Your results will.

---

## Going deeper

Once you have results, follow the suggestion Claude offers at the end of each `/query` response — it will surface one question you likely didn't think to ask. That's often where the real automation target lives.

---

## Prompts that don't work (and why)

| Don't do this | Do this instead | Why |
|---|---|---|
| `/query Tell me about buttons` | `/query What's missing from the Button documentation that would help a developer use it correctly?` | Too vague — no clear deliverable |
| `/query What does the design system say?` | `/query What are the three most important things a new team member needs to know about this system?` | Not a real question |
| `/query Write documentation for me` | `/query What documentation gaps would I need to fill to let an AI answer questions about this system reliably?` | Without a specific target, you'll get filler |
| `/query Is this design system good?` | `/query What are the biggest adoption barriers in this documentation — what would cause a developer to give up and ask a human?` | "Good" has no actionable answer |

The pattern: vague in, vague out. Specific question + specific audience + specific deliverable = something you can act on.
