---
name: query
description: >
  This skill should be used when the user asks a question about the knowledge base,
  says "query", "what does the wiki say about", "find in wiki", or asks anything that
  should be answered by synthesizing wiki content.
argument-hint: "<question>"
---

Research a question against the knowledge base wiki and synthesize a sourced answer.

## Query strategy

Read progressively — start broad, drill down only as needed:

1. Read `wiki/index.md` to get the full page catalog
2. Identify which subfolders or pages are relevant to the question
3. For relevant subfolders, read their `summary.md` if it exists — this gives a prose overview of what the wiki knows about that area without reading every page
4. If the summary covers the question sufficiently, answer from there
5. If more detail is needed, read the specific pages the question targets
6. If a page references a `sources/` file that seems directly relevant, read it too

## Synthesizing the answer

- Cite specific wiki pages: `[Concept Name](wiki/concept-name.md)`
- Note which `sources/` files back up key claims
- Flag contradictions or gaps in the wiki's coverage
- If the wiki doesn't cover the question, say so and suggest what kind of source would fill the gap (offer to dispatch the researcher agent)

## Filing the answer

If the answer is substantial (a comparison, analysis, or synthesis not already captured in the wiki), ask whether to:
- File it in `outputs/` as a standalone document with `type: output` frontmatter
- Update existing wiki pages with the new insight
- Both

If filed, append to `wiki/log.md`:
```
## [YYYY-MM-DD] query | [Question Summary]
- Filed: outputs/[filename]
```
