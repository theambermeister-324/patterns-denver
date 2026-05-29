# Prompt Templates — Patterns Denver Workshop

Six ready-to-use `/query` prompts for the workshop sandbox. Run any of these after `/ingest all` — then remix them for your own system.

---

## The six prompts

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
