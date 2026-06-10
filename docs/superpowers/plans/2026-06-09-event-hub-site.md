# Event Hub Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-page static HTML event hub at `patterns-denver-2026.netlify.app` that guides non-technical workshop participants through the Patterns Denver 2026 AI Sandbox Workshop without requiring them to read markdown files or navigate GitHub.

**Architecture:** Self-contained static HTML files — no framework, no build step, no external CSS. Each page includes its own `<style>` block, shares a consistent design language (purple nav, card-based layout, inline SVGs), and is independently deployable. The existing `gallery/index.html` is adapted into `gallery.html` at the root level.

**Tech Stack:** HTML5, vanilla CSS, vanilla JS (`localStorage` for checklist, `navigator.clipboard` for copy buttons). Deploy via Netlify drag-and-drop.

---

## File Structure

```
/Users/amberatkins/dev/patterns-denver/
├── index.html              CREATE — home page
├── before.html             CREATE — setup checklist (localStorage state)
├── guide.html              CREATE — 4-step workshop guide + triage
├── prompts.html            CREATE — 6 copyable prompts
├── gallery.html            CREATE — adapted from gallery/index.html (add nav bar)
├── after.html              CREATE — post-workshop resources (partial content)
```

**Reference files (read before implementing):**
- `docs/superpowers/specs/2026-06-09-event-hub-site-design.md` — full design spec
- `.superpowers/brainstorm/40334-1781048852/homepage-v2.html` — approved homepage mockup
- `.superpowers/brainstorm/40334-1781048852/guide-page.html` — approved guide mockup
- `.superpowers/brainstorm/40334-1781048852/remaining-pages.html` — Before/Prompts/After overview
- `gallery/index.html` — existing gallery to adapt
- `prompt-templates.md` — source of the 6 prompts for prompts.html

---

## Shared Design Constants

Copy these exact values into every page's `<style>` block:

```css
/* Font stacks (include in body and code selectors on every page) */
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
/* monospace: 'SF Mono', 'Fira Code', monospace — use on .code-block, .prompt-text */

/* Color tokens */
--purple:        #6436bf;
--purple-light:  #f0ebfa;
--purple-border: #e8e4f0;
--purple-mid:    #c4aef0;
--text-purple:   #4a1fa0;
--text-main:     #1a1a1a;
--text-muted:    #645e6e;
--text-faint:    #9893a1;
--green:         #226633;
--green-light:   #e8f5ec;
--site-bg:       #f5f4f7;
--card-bg:       #ffffff;
--code-bg:       #1a1a2e;

/* Nav */
nav height: 48px, bg #6436bf, sticky, z-index 100
nav logo: font-size 11px, weight 800, letter-spacing .12em, uppercase, color #fff
nav links: font-size 12px, weight 600, padding 6px 12px, border-radius 6px
nav link inactive: color rgba(255,255,255,.6)
nav link active: color #fff, background rgba(255,255,255,.18)
```

**Shared nav HTML (copy into every page, update `active` class per page):**

```html
<nav class="site-nav">
  <a class="nav-logo" href="index.html">Patterns Denver</a>
  <div class="nav-links">
    <a class="nav-link" href="index.html">Home</a>
    <a class="nav-link" href="before.html">Before</a>
    <a class="nav-link" href="guide.html">Guide</a>
    <a class="nav-link" href="prompts.html">Prompts</a>
    <a class="nav-link" href="gallery.html">Gallery</a>
    <a class="nav-link" href="after.html">After</a>
  </div>
</nav>
```

Add `class="nav-link active"` to the link matching the current page. Nav logo links to `index.html`.

**Footer (copy into every page):**

```html
<footer>Patterns Denver 2026 · Knapsack × FuegoUX</footer>
```

Footer style: `text-align: center; padding: 24px; font-size: 11px; color: #bbb; border-top: 1px solid #e8e4f0; background: #fff; margin-top: 8px;`

---

## Task 1: index.html — Home Page

**Files:**
- Create: `index.html` (site root)
- Reference: `.superpowers/brainstorm/40334-1781048852/homepage-v2.html`

- [ ] **Step 1: Read the approved mockup**

Read `.superpowers/brainstorm/40334-1781048852/homepage-v2.html` in full before writing anything.

- [ ] **Step 2: Create index.html**

Build from the mockup. Key requirements:
- Purple hero section with eyebrow "AI Sandbox Workshop", h1 "Patterns Denver / 2026", subtitle "Design system practitioners. One afternoon. / Real AI agents. Real design system docs."
- Hero meta row with 3 pills: calendar icon + "June 11, 2026" / map-pin icon + "Zero Hour Cafe · Denver" / users icon + "14 practitioners · 7 pairs"
- All 3 icons are inline SVG (not emojis). Calendar = `<rect x="3" y="4" width="18" height="18" rx="2"/>` etc. Stroke `currentColor`, stroke-width 2.5.
- Prompt banner (white bar): `"Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate?"`
- Phase callout card: pulsing dot + "You're in the **afternoon sandbox** right now. Open the Guide or Prompts to get started."
- 5 nav cards in a responsive grid (`repeat(auto-fit, minmax(240px, 1fr))`, gap 14px):
  - Before (phase `before`, icon: clipboard): "Setup checklist → / What to install, what to bring, what to expect."
  - Guide (phase `during`, active border `#c4aef0`, icon: play-circle): "Workshop guide → / Step-by-step: clone, setup, ingest, query."
  - Prompts (phase `during`, active border, icon: chat bubble): "Prompt library → / 6 ready-to-run queries. Copy and paste directly into Claude Code."
  - Gallery (phase `during`, active border, icon: grid): "Gallery wall → / See what the room is building. Submit your pair's output here."
  - After (phase `after`, icon: arrow-right): "Take it home → / Anxiety map, gallery highlights, and resources to run this on your own system."
- Each card links to correct `.html` file
- Phase-during cards have `border: 1.5px solid #c4aef0`; others `border: 1.5px solid #e8e4f0`
- Active nav link: Home

- [ ] **Step 3: Verify**

Open `index.html` in browser. Check:
- Nav bar visible and sticky on scroll
- Hero shows correct text, no emojis, icons render
- Prompt banner visible
- Phase callout pulsing dot visible (CSS animation or static ring both acceptable)
- 5 cards visible, 3 during-phase cards have purple border
- All card links resolve (before.html, guide.html, etc. — 404 is fine at this step)

- [ ] **Step 4: Commit**

```bash
cd /Users/amberatkins/dev/patterns-denver
git add index.html
git commit -m "feat: add event hub home page"
```

---

## Task 2: before.html — Setup Checklist

**Files:**
- Create: `before.html`
- Reference: `.superpowers/brainstorm/40334-1781048852/remaining-pages.html` (Before preview section)

- [ ] **Step 1: Create before.html structure**

Page header:
- Label: "Before the workshop"
- h1: "Get ready"
- Subtitle: "Check off each item before June 11. Your progress saves automatically."

Two sections, each with a section label and checklist items:

**What to install:**
| id | Label | Helper text |
|---|---|---|
| `node` | Node.js 20+ | `node --version` to check |
| `claude-code` | Claude Code | `npm install -g @anthropic-ai/claude-code` |
| `account` | Anthropic account | claude.ai — 2 minutes to create |

**What to bring:**
| id | Label | Helper text |
|---|---|---|
| `laptop` | Personal laptop (not work-managed) | — |
| `docs` | Design system doc | Any component spec, README, token ref |
| `sentence` | Your sentence | "I want to see if AI can help me with ___" |

- [ ] **Step 2: Implement checkbox HTML**

Each checklist item:

```html
<div class="checklist-item" data-id="node">
  <button class="checkbox" aria-label="Mark Node.js 20+ complete" role="checkbox" aria-checked="false">
    <!-- checkmark SVG, hidden when unchecked -->
    <svg class="check-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  </button>
  <div>
    <div class="item-text">Node.js 20+</div>
    <div class="item-sub">node --version to check</div>
  </div>
</div>
```

Unchecked state: `border: 1.5px solid #c4aef0; background: #fff; border-radius: 3px; width: 18px; height: 18px;`
Checked state: `background: #6436bf; border-color: #6436bf;`
`.check-icon` hidden by default; shown when `.checkbox.checked`

- [ ] **Step 3: Implement localStorage JS**

```javascript
// Each item gets its own localStorage key: 'pdx-checklist-{id}'
function getKey(id) { return 'pdx-checklist-' + id; }

function applyState(item, checked) {
  item.querySelector('.checkbox').classList.toggle('checked', checked);
  item.querySelector('.checkbox').setAttribute('aria-checked', String(checked));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.checklist-item').forEach(item => {
    const id = item.dataset.id;
    const checked = localStorage.getItem(getKey(id)) === 'true';
    applyState(item, checked);
    item.querySelector('.checkbox').addEventListener('click', () => {
      const next = localStorage.getItem(getKey(id)) !== 'true';
      localStorage.setItem(getKey(id), String(next));
      applyState(item, next);
    });
  });
});
```

- [ ] **Step 4: Verify**

Open `before.html`. Check:
- All 6 items visible with helper text
- Clicking a checkbox turns it purple with checkmark
- Reload page — checked items remain checked
- Active nav link: Before

- [ ] **Step 5: Commit**

```bash
git add before.html
git commit -m "feat: add before page with persistent checklist"
```

---

## Task 3: guide.html — Workshop Guide

**Files:**
- Create: `guide.html`
- Reference: `.superpowers/brainstorm/40334-1781048852/guide-page.html`

- [ ] **Step 1: Read the approved mockup**

Read `.superpowers/brainstorm/40334-1781048852/guide-page.html` in full before writing.

- [ ] **Step 2: Create guide.html**

Page header:
- Label: "Day of · Workshop guide"
- h1: "Getting started"
- Subtitle: "Four steps. Takes about 10 minutes. Run these in order. If something breaks, see the triage section at the bottom."

Sentence card (before the steps, purple background `#f0ebfa`, border `1.5px solid #c4aef0`):
```
Before you open your terminal — write this down
"I want to see if AI can help me with ___."
One sentence. This is your compass for the afternoon.
```
The blank `___` is styled with `border-bottom: 2px dashed #9b72ef; min-width: 180px; color: #9b72ef; font-style: italic; display: inline-block;` — it should look like a fill-in-the-blank line, not a text input.

4 step cards (white, border `#e8e4f0`, border-radius 12px):

**Step 1 — Clone the repo and open it**
- Description: "Copy the commands below into your terminal. You need to be inside the `patterns-denver` folder before continuing."
- Code block (dark bg `#1a1a2e`):
  ```
  git clone https://github.com/theambermeister-324/patterns-denver.git
  cd patterns-denver
  npm install
  claude
  ```
- Expected output: "You should see the Claude Code interface open in your terminal."

**Step 2 — Run setup**
- Description: "This checks your environment and creates the folders Claude needs. Run it once."
- Code block: `/setup` (slash command style, color `#f0c080`)
- Expected output: "Claude will confirm setup is complete. Should take under 30 seconds."

**Step 3 — Drop in your docs and ingest**
- Description: "Add any design system file to the `raw/` folder — a component spec, README, tokens reference, Figma export. A sample is already there if you want to start immediately."
- Code block:
  ```
  # drop your file into raw/, then:
  /ingest all
  ```
- Expected output: "Claude reads your docs and organizes them into a knowledge base. You'll see a list of pages created."

**Step 4 — Ask your first question**
- Description: "Start with one of the prompts below, or write your own. This is the deployed agent — you're running it right now."
- Code block: `/query What are the documentation gaps in this design system?`
- Expected output: "Claude answers based only on your docs — no hallucination, no generic advice. Need more prompts? See the Prompt library."

Triage section (below steps, subtle label "Stuck? Check these three things first"):

| Problem | What to do |
|---|---|
| Claude Code isn't opening | Type `claude` inside the `patterns-denver` folder — ask Angie if nothing happens |
| /query returns nothing | Run `/ingest all` first — wiki may be empty |
| npm errors during install | Raise your hand — Angie or Amber will come to you |
| "I don't know what to ask" | Open Prompts — or find Amber or Nate, this is the real question |

- [ ] **Step 3: Verify**

Open `guide.html`. Check:
- Sentence card visible above steps
- 4 numbered steps with dark code blocks
- Code block colors: commands green `#a8d8a8`, comments gray `#666`, slash commands amber `#f0c080`
- Each step has a light expected-output row below the code block
- Triage table at bottom has 4 rows
- Active nav link: Guide

- [ ] **Step 4: Commit**

```bash
git add guide.html
git commit -m "feat: add guide page with 4-step flow and triage"
```

---

## Task 4: prompts.html — Prompt Library

**Files:**
- Create: `prompts.html`
- Reference: `prompt-templates.md` (read for full prompt text)

- [ ] **Step 1: Read prompt-templates.md**

Read `prompt-templates.md` to get the exact text of all 6 prompts before writing.

- [ ] **Step 2: Create prompts.html**

Page header:
- Label: "Day of · Prompt library"
- h1: "Ready-to-run prompts"
- Subtitle: "Copy any prompt and paste directly into Claude Code. Start with the first one if you're not sure where to begin."

6 prompt cards. Each card:
```html
<div class="prompt-card">
  <div class="prompt-header">
    <h3 class="prompt-title">Surface documentation gaps</h3>
    <button class="copy-btn" data-prompt="/query What are the documentation gaps in this design system?">
      Copy
    </button>
  </div>
  <p class="prompt-desc">Find what's missing or underdeveloped in your design system docs.</p>
  <div class="prompt-text">/query What are the documentation gaps in this design system?</div>
</div>
```

Card style: white bg, border `#e8e4f0`, border-radius 12px, padding 18px 20px, margin-bottom 12px.
Prompt text block: bg `#f8f5ff`, border `#e8e0f5`, font-family monospace, font-size 13px, color `#4a1fa0`, padding 10px 14px, border-radius 8px, margin-top 10px.
Copy button: top-right of card header, small, `font-size: 11px; font-weight: 700; color: #6436bf; background: #f0ebfa; border: 1px solid #c4aef0; border-radius: 6px; padding: 4px 10px; cursor: pointer;`

The 6 prompts with exact text (from `prompt-templates.md` at repo root):

| # | Title | Full prompt text |
|---|---|---|
| 1 | Surface documentation gaps | `/query What are the documentation gaps in this design system?` |
| 2 | Find accessibility gaps | `/query Which components are missing accessibility guidance?` |
| 3 | Think like a new engineer | `/query What would a new engineer need to know that isn't in these docs?` |
| 4 | Find contradictions | `/query Where does this system have contradictions or inconsistencies?` |
| 5 | AI-readiness audit | `/query What documentation would I need to add to make this system AI-ready?` |
| 6 | Onboarding summary | `/query Write a 3-sentence onboarding summary for a developer joining this team` |

Set `data-prompt` on each Copy button to the exact text above. The prompt descriptions come from `prompt-templates.md` — read that file for the one-line description under each prompt heading.

- [ ] **Step 3: Implement copy JS**

```javascript
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.prompt;
    navigator.clipboard.writeText(text).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = '#226633';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.color = '';
      }, 2000);
    });
  });
});
```

- [ ] **Step 4: Add "Write your own" section**

Below the 6 cards, a callout box:

```
Write your own
The best prompts start with your sentence from before:
"I want to see if AI can help me with ___."

Tips:
• Be specific about what you want to know
• Reference a component or token by name if you have one
• Ask for a list, not an essay
• Follow up with: "/query Tell me more about [the gap you mentioned]"
```

Style: bg `#f8f5ff`, border `1.5px solid #e8e0f5`, border-radius 12px, padding 18px 20px.

- [ ] **Step 5: Verify**

Open `prompts.html`. Check:
- 6 cards visible with full prompt text in monospace block
- Click a Copy button — button text changes to "Copied!" then reverts
- Open DevTools console — no clipboard errors
- "Write your own" section at bottom
- Active nav link: Prompts

- [ ] **Step 6: Commit**

```bash
git add prompts.html
git commit -m "feat: add prompts page with 6 copyable workshop prompts"
```

---

## Task 5: gallery.html — Adapted Gallery

**Files:**
- Create: `gallery.html` (site root)
- Reference: `gallery/index.html`

- [ ] **Step 1: Read gallery/index.html**

Read `gallery/index.html` in full.

- [ ] **Step 2: Create gallery.html**

Copy `gallery/index.html` verbatim to `gallery.html` at the site root. Then make exactly these changes:

1. Add the shared `<style>` block for `.site-nav` (same CSS as all other pages)
2. Replace the existing header/logo element with the shared nav bar HTML (Gallery link gets `active` class)
3. Change footer branding from `Knapsack × Crux Digital × FuegoUX` to `Knapsack × FuegoUX` if present
4. Do NOT change the form `action` attribute — Netlify Forms routes by the form's `name` attribute and `data-netlify="true"`, not by URL path. Leave `action` as-is.
5. Do NOT change the form fields, pair cards, submission logic, or Netlify form attributes (`data-netlify`, `name`, `netlify-honeypot`)

- [ ] **Step 3: Verify**

Open `gallery.html`. Check:
- Nav bar appears at top, Gallery link is active
- Submission form is visible and fields are intact
- `data-netlify="true"` attribute is present on the form
- Existing pair cards (if any) still render
- Footer shows `Knapsack × FuegoUX`

- [ ] **Step 4: Commit**

```bash
git add gallery.html
git commit -m "feat: add gallery page with shared nav (adapted from gallery/index.html)"
```

---

## Task 6: after.html — Post-Workshop Resources

**Files:**
- Create: `after.html`

- [ ] **Step 1: Create after.html**

Page header:
- Label: "After June 11"
- h1: "Take it home"
- Subtitle: "Resources, highlights, and ways to keep going."

Three sections:

**Section 1 — What the room built** (icon: people/users)
- Placeholder state (live before June 11):
  ```
  Coming June 13
  Amber will add the anxiety map and gallery highlights within 48 hours of the workshop.
  ```
- Style: bg `#f8f9fa`, border `1.5px dashed #e8e4f0`, border-radius 10px, padding 16px 18px, color `#9893a1`, font-style italic, font-size 13px

**Section 2 — Run it on your own system** (icon: arrow-right, green)
- Pills (bg `#f5f4f7`, border-radius 6px, padding 6px 10px, font-size 12px):
  - "Clone the repo, use your own docs"
  - Links row: `Claude Code` (href: https://claude.ai/code) · `Workshop repo` (href: https://github.com/theambermeister-324/patterns-denver) · `Knapsack` (href: https://www.knapsack.cloud)
- Link style: color `#6436bf`, font-weight 600

**Section 3 — Stay connected** (icon: chat bubble, green)
- Pills:
  - "Reach out to Amber — amber@knapsack.cloud"
  - "Follow-up thread for continued peer conversation"

Section wrapper style: white card, border `#e8e4f0`, border-radius 12px, padding 20px, margin-bottom 14px.
Section title: font-size 11px, weight 800, uppercase, letter-spacing .08em, color `#226633`, margin-bottom 8px.

- [ ] **Step 2: Verify**

Open `after.html`. Check:
- 3 sections visible with green section titles and icons
- "Coming June 13" placeholder visible in Section 1
- Links in Section 2 open correct URLs
- Email in Section 3 is a `mailto:` link
- Active nav link: After

- [ ] **Step 3: Commit**

```bash
git add after.html
git commit -m "feat: add after page with resources and post-workshop continuity"
```

---

## Task 7: Cross-page QA and Nav Verification

- [ ] **Step 1: Check all nav links work**

Open each page in browser. For each page, verify:
- Correct nav link has `active` class (visible as white text + translucent white bg)
- All 6 nav links resolve to real pages (no 404)
- Logo links back to index.html
- Browser back/forward works correctly

Pages to check: index.html, before.html, guide.html, prompts.html, gallery.html, after.html

- [ ] **Step 2: Check narrow viewport layout**

Resize browser to ~768px wide. Cards should reflow to fewer columns via `auto-fit, minmax`. Nav links should not overflow horizontally — if they do, add `flex-wrap: wrap` to `.nav-links`. Full mobile support is out of scope (workshop audience is on laptops) but basic reflow should not break.

- [ ] **Step 3: Check localStorage isolation**

Open before.html, check some items. Open index.html, return to before.html — items should still be checked.
Open DevTools > Application > localStorage — confirm keys like `pdx-checklist-node`, `pdx-checklist-laptop` etc. exist with value `"true"` or `"false"`.

- [ ] **Step 4: Check copy buttons**

Open prompts.html. Click each Copy button. Verify text is copied (paste into a text editor). Verify "Copied!" feedback and revert.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: cross-page QA complete — event hub site ready for Netlify deploy"
```

---

## Task 8: Netlify Deploy

- [ ] **Step 1: Zip the site root**

First, inspect `gallery/index.html` for local asset references:
```bash
grep -E 'src=|href=' /Users/amberatkins/dev/patterns-denver/gallery/index.html | grep -v 'http'
```
Include any local CSS, JS, or image files found in that output.

Then zip the deploy:
```bash
cd /Users/amberatkins/dev/patterns-denver
zip -r event-hub-deploy.zip index.html before.html guide.html prompts.html gallery.html after.html gallery/success.html
# If gallery/index.html references local assets (e.g., gallery/style.css, gallery/images/):
# zip -r event-hub-deploy.zip index.html before.html guide.html prompts.html gallery.html after.html gallery/
```

Note: `gallery/success.html` is the Netlify form success redirect — always include it.

- [ ] **Step 2: Deploy to Netlify**

Go to `app.netlify.com` → find the `patterns-denver-2026` site → Deploys tab → drag and drop `event-hub-deploy.zip`

- [ ] **Step 3: Verify live site**

Open `https://patterns-denver-2026.netlify.app` and check:
- Home page loads
- Nav links all work
- Gallery form is functional (submit a test entry)
- Copy buttons work

- [ ] **Step 4: Clean up**

```bash
rm event-hub-deploy.zip
```

---

## Appendix: The 6 Prompts (exact text from prompt-templates.md)

These are the definitive titles and prompt strings. The inline table in Task 4 matches this list — use either, not a mix.

| # | Title | Full prompt text |
|---|---|---|
| 1 | Surface documentation gaps | `/query What are the documentation gaps in this design system?` |
| 2 | Find accessibility gaps | `/query Which components are missing accessibility guidance?` |
| 3 | Think like a new engineer | `/query What would a new engineer need to know that isn't in these docs?` |
| 4 | Find contradictions | `/query Where does this system have contradictions or inconsistencies?` |
| 5 | AI-readiness audit | `/query What documentation would I need to add to make this system AI-ready?` |
| 6 | Onboarding summary | `/query Write a 3-sentence onboarding summary for a developer joining this team` |
