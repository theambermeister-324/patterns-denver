---
name: ingest
description: >
  This skill should be used when the user says "ingest", "file this", "process raw",
  "add source", or drops a file in raw/ and wants it processed into the wiki.
argument-hint: "[filename or 'all']"
---

Ingest source files from `raw/` into the knowledge base wiki.

If no argument is given, list everything in `raw/` and ask which files to process.
If the argument is `all`, process every file in `raw/` sequentially.
Otherwise, process the named file(s) — or follow the user's instructions if they specify
external sources accessible via MCP or other means.

## For each file

1. Read the file contents in full
2. Present 2-3 key takeaways and ask for confirmation before proceeding
3. Move from `raw/` to `sources/` with a descriptive kebab-case filename (e.g. `karpathy-llm-wiki-gist.md`). **Never alter file contents.**
4. Create a sidecar `.md` in `sources/` if the source is non-markdown (PDF, image, etc.), with `type: source` frontmatter:
   ```yaml
   ---
   type: source
   title: <descriptive title>
   origin_url: <url if known>
   ingested: <today>
   file_type: <article|paper|notes|data|image|other>
   summary: <one-line summary>
   ---
   ```
5. Write or update wiki pages for each concept, entity, or theme in the source (see **Page discipline** below)
6. Add cross-reference links between related wiki pages
7. Update `wiki/index.md` — add new pages, update summaries for changed pages
8. If a subfolder's content changed significantly, update or create its `summary.md` (see **summary.md** below)
9. Append to `wiki/log.md`:
   ```
   ## [YYYY-MM-DD] ingest | [Source Title]
   - Moved: raw/[original] → sources/[renamed]
   - Created: [list of new wiki pages]
   - Updated: [list of updated wiki pages]
   ```

## Page discipline

**Create a new page when:**
- A concept appears in the wiki for the first time
- Adding content to an existing page would push it past ~600 words

**Update an existing page when:**
- The source adds detail, nuance, a contradicting claim, or a new example to something already covered

**Split an existing page when:**
- It exceeds ~800 words and contains a clear sub-topic that could stand alone

**Page size targets:**
- Aim for 200–600 words per page
- Prefer many small, linked pages over fewer large ones
- A page that needs a long "Related" section is often a sign it should be split

## Frontmatter requirements

Every file written must have valid frontmatter. Look up the schema in `_types/<type>.md` for required and optional fields. The PostToolUse hook validates frontmatter automatically after every write — fix any warnings before moving on.

## Cross-referencing rules

- Link to other wiki pages on first mention: `[Concept Name](concept-name.md)`
- Add a "Sources" section at the bottom of every wiki page listing the `sources/` files used
- When sources disagree on a fact, note the contradiction explicitly — don't silently pick one

## summary.md

Each wiki subfolder can have a `summary.md` — a prose synthesis of everything in that subfolder.

- Create or update `summary.md` when a subfolder's content changes significantly during ingest
- Write it as: "What does this wiki know about [topic]?" — a 3–5 paragraph overview
- Use `type: article` frontmatter with `tags: [summary]`
- Keep it current; it's the first thing read during a `/query` on that topic
