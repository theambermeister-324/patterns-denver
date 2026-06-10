# Event Hub Site Design — Patterns Denver 2026
*Spec date: 2026-06-09 · Status: Approved*

## Problem

Non-technical workshop participants currently have to clone a GitHub repo and navigate markdown files in their terminal to access workshop instructions, prompts, and resources. This creates a high barrier before the actual work even starts. Facilitators Amber and Angie are also not technical enough to debug setup failures mid-session.

The `patterns-denver-2026.netlify.app` gallery site exists but only handles output submission. It should become the full participant-facing event hub — a browser tab participants keep open alongside Claude Code throughout the day.

---

## Solution

A 5-page static HTML site (+ existing gallery) deployed to `patterns-denver-2026.netlify.app` via Netlify drag-and-drop. No framework, no build step. Every page shares a consistent purple nav bar and design language. Participants navigate the site in a browser tab while running Claude Code in their terminal.

---

## Pages

### 1. Home — `index.html`

**Purpose:** Entry point and orientation. Tells participants where they are and where to go.

**Sections:**
- Purple hero with event details (date, venue, headcount) using inline SVG icons — no emojis
- Prompt banner: *"Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate?"*
- Phase callout: pulsing dot indicating current phase ("You're in the afternoon sandbox right now")
- 5 nav cards (Before / Guide / Prompts / Gallery / After) with phase labels (before/during/after) and short descriptions
- Cards with `phase-during` active styling for Guide, Prompts, Gallery during workshop

**Key design decisions:**
- Phase callout is hardcoded to "afternoon sandbox" — no dynamic time detection
- During-phase cards have `border-color: #c4aef0` to visually distinguish active content
- Arrow is SVG `→` not a text character

---

### 2. Before — `before.html`

**Purpose:** Pre-workshop setup checklist. Complete before June 11.

**Sections:**
- "What to install" section: Node.js 20+, Claude Code (`npm install -g @anthropic-ai/claude-code`), Anthropic account
- "What to bring" section: personal laptop, design system doc (any component spec/README/token ref), one sentence ("I want to see if AI can help me with ___")
- Each item is a checkbox with helper text (e.g., `node --version to check`)

**Behavior:**
- Checkbox state persists via `localStorage` — key: `pdx-checklist-{item-id}`
- Participants can check items off across multiple visits
- No backend required

**Key design decisions:**
- Emphasize personal laptop (not work-managed) — participants have encountered MDM issues before
- "Your sentence" is the first prompt from `prompt-templates.md` — starts the mental model before arrival

---

### 3. Guide — `guide.html`

**Purpose:** Day-of step-by-step guide. Runs parallel to Claude Code in terminal.

**Sections:**
- Sentence prompt card (prominent, before steps): "I want to see if AI can help me with ___" with dashed underline fill-in visual
- 4 steps (numbered, card-based):
  1. Clone + open (`git clone`, `cd`, `npm install`, `claude`)
  2. Run setup (`/setup`)
  3. Drop in docs + ingest (`/ingest all`)
  4. Ask first question (`/query What are the documentation gaps...`)
- Each step has:
  - Dark terminal code block (background `#1a1a2e`)
  - Expected output row in light gray — "what you should see"
- Triage table (4 rows): common problems + canned phrases (no technical knowledge required)

**Key design decisions:**
- Code blocks have color-coded syntax: commands `#a8d8a8`, comments `#666`, slash commands `#f0c080`
- Triage is visual, not technical — phrases like "ask Angie" and "Angie or Amber will come to you"
- Step 3 notes: "A sample is already there if you want to start immediately" (Meridian DS)

---

### 4. Prompts — `prompts.html`

**Purpose:** 6 ready-to-run queries from `prompt-templates.md`. Copy and paste into Claude Code.

**Content (6 prompts from `prompt-templates.md`):**
1. Surface documentation gaps — `/query What are the documentation gaps in this design system?`
2. Find accessibility gaps — `/query Where does this design system fall short on accessibility guidance?`
3. New engineer test — `/query What would a new engineer need to know to use this design system effectively?`
4. AI-readiness audit — `/query What would I need to add to this design system documentation to make it more useful for AI-assisted workflows?`
5. Component coverage check — `/query Which components have the most complete documentation and which are missing key information?`
6. Token usage audit — `/query How are design tokens documented in this system, and what gaps exist in their usage guidance?`

**Behavior:**
- Each prompt card shows full prompt text (visible, not truncated)
- One-click copy button per card — uses `navigator.clipboard.writeText()`
- Button text changes to "Copied!" for 2 seconds on click
- "Write your own" guidance section at bottom: tips for writing effective queries

**Key design decisions:**
- Full prompt text visible without expand/collapse — reduces cognitive load day-of
- Copy button is functional, not decorative — tested behavior essential
- "Write your own" section references the sentence from the Before page

---

### 5. Gallery — `gallery.html` (adapted from `gallery/index.html`)

**Purpose:** Live gallery wall — see what pairs are building, submit your output.

**Changes from existing `gallery/index.html`:**
- Add shared purple nav bar (same component as all other pages)
- Move to site root as `gallery.html` — no subfolder
- Submission form already works via Netlify Forms (`data-netlify="true"`) — no changes needed
- Pair cards already functional — no changes needed
- Update footer branding: `Knapsack × FuegoUX` (remove Crux Digital)

**Key design decisions:**
- Minimize changes to existing gallery — form and cards are working
- Nav bar addition is the only structural change

---

### 6. After — `after.html`

**Purpose:** Post-workshop resources and continuity. Amber populates within 48 hours of June 11.

**Sections (hardcoded structure, content added post-workshop):**
- "What the room built" — themed anxiety map (no attribution) + gallery highlights from 7 pairs
- "Run it on your own system" — clone the repo, use your own docs; links to Claude Code, workshop repo, Knapsack
- "Stay connected" — amber@knapsack.cloud, follow-up thread for peer conversation

**Placeholder state (live before June 11):**
- Resources section is live immediately (links are static)
- "What the room built" section shows: "Coming June 13 — Amber will add the anxiety map and gallery highlights within 48 hours of the workshop."

**Key design decisions:**
- Section structure and visual treatment are complete before the workshop — only content slots are empty
- Amber manually edits two text areas after the event, no form or CMS needed

---

## Shared Design System

**Color palette:**
- Primary purple: `#6436bf`
- Light purple (backgrounds): `#f0ebfa`
- Border purple: `#e8e4f0`, `#c4aef0`
- Text purple: `#4a1fa0`
- Muted text: `#9893a1`, `#645e6e`
- Green (after phase): `#226633`, `#e8f5ec`
- Dark bg (code blocks): `#1a1a2e`
- White card bg: `#ffffff`
- Site bg: `#f5f4f7`

**Typography:**
- Font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Monospace (code): `'SF Mono', 'Fira Code', monospace`
- All-caps labels: `font-size: 10–11px, font-weight: 800, letter-spacing: 0.1em`

**Nav bar (shared):**
- Background: `#6436bf`
- Height: `48px`, sticky, z-index 100
- Logo: `PATTERNS DENVER` — 11px, weight 800, uppercase, letter-spacing 0.12em
- Links: 6 items (Home, Before, Guide, Prompts, Gallery, After)
- Active link: `color: #fff; background: rgba(255,255,255,.18)`
- Inactive links: `color: rgba(255,255,255,.6)`

**Icons:**
- Inline SVG only — no emojis, no icon fonts
- Standard set: calendar, map-pin, users, clipboard, play-circle, chat, grid, arrow-right, check, info-circle, people

**Phase labels:**
- Before: `#9893a1` on `#f5f4f7`
- During: `#6436bf` on `#f0ebfa`
- After: `#226633` on `#e8f5ec`

---

## File Structure

```
patterns-denver-2026.netlify.app/
├── index.html          (home)
├── before.html         (setup checklist)
├── guide.html          (4-step workshop guide)
├── prompts.html        (6 copyable prompts)
├── gallery.html        (adapted from gallery/index.html)
├── after.html          (post-workshop resources)
└── gallery/
    └── success.html    (form success redirect — unchanged)
```

All HTML files are self-contained — no external CSS files, no JavaScript files, no build step. Styles are `<style>` blocks in each `<head>`. Deploy via Netlify drag-and-drop (zip the folder root).

---

## Constraints

- No backend, no database, no CMS
- No JavaScript frameworks — vanilla JS only
- `localStorage` for checklist state only
- `navigator.clipboard` for copy buttons (modern browsers only — acceptable for workshop audience)
- Must work as a browser tab alongside Claude Code (not full-screen required)
- Netlify Forms for gallery submission — already wired up in `gallery/index.html`

---

## Out of Scope

- Mobile responsiveness (laptop/desktop only — workshop participants are on laptops)
- Search functionality
- User accounts or authentication
- Dynamic phase detection (current phase hardcoded for June 11)
- Automated deployment pipeline (manual drag-and-drop is fine)
