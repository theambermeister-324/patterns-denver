// ---------------------------------------------------------------------------
// Switcher-ready content model.
//
// All page copy + structure lives here as plain data; page components are dumb
// renderers over it. Event-level branding/links live in config.ts.
// ---------------------------------------------------------------------------

export interface PageMeta {
  route: string // hash route segment; '' is home
  label: string
}

export const pages: PageMeta[] = [
  { route: '', label: 'Home' },
  { route: 'setup', label: 'Setup' },
  { route: 'playbook', label: 'Playbook' },
  { route: 'prompts', label: 'Prompts' },
  { route: 'readiness', label: 'Readiness' },
  { route: 'gallery', label: 'Gallery' },
  { route: 'next', label: 'Next steps' },
  { route: 'feedback', label: 'Feedback' },
]

export const footerText = 'Patterns Denver 2026 · Knapsack'

// ---- Home page (bespoke layout) ------------------------------------------
export type Phase = 'before' | 'during' | 'after'

export interface Facilitator {
  name: string
  org: string
  initials: string
}

export interface CardItem {
  icon: 'play' | 'chat' | 'apps' | 'checklist' | 'arrow'
  phase: Phase
  phaseLabel: string
  title: string
  description: string
  route: string
  featured?: boolean
}

export const hero = {
  eyebrow: 'AI sandbox workshop',
  title: 'Patterns Denver 2026',
  subtitle: 'An afternoon of hands-on AI sandboxing for design system practitioners.',
  presenter: 'Knapsack',
}

export const playCallout = {
  title: "The goal isn't to make something beautiful. It's to play.",
  subtitle: 'Start with your sentence. Open the Guide when you’re ready.',
}

export const facilitators: Facilitator[] = [
  { name: 'Amber Atkins', org: 'Knapsack', initials: 'AA' },
  { name: 'Aaron Stone', org: 'Crux Digital', initials: 'AS' },
  { name: 'Nate Wearin', org: 'FuegoUX', initials: 'NW' },
  { name: 'Zach Hendershot', org: 'Crux Digital', initials: 'ZH' },
]

export const cards: CardItem[] = [
  { icon: 'play', phase: 'during', phaseLabel: 'Day of', title: 'Workshop guide', description: 'Step-by-step: clone, setup, ingest, query. Triage help if you get stuck.', route: 'playbook', featured: true },
  { icon: 'chat', phase: 'during', phaseLabel: 'Day of', title: 'Prompt library', description: '6 ready-to-run queries. Copy and paste directly into Claude Code.', route: 'prompts', featured: true },
  { icon: 'apps', phase: 'during', phaseLabel: 'Day of', title: 'Gallery wall', description: 'See what the room is building. Submit your output here.', route: 'gallery' },
  { icon: 'checklist', phase: 'before', phaseLabel: 'Before the workshop', title: 'Setup checklist', description: 'What to install, what to bring, what to expect.', route: 'setup' },
  { icon: 'arrow', phase: 'after', phaseLabel: 'After June 11', title: "What's next", description: 'PCRI assessment, Denver cohort, and partner paths.', route: 'next' },
]

// ---- Standard content pages (data-driven blocks) -------------------------
export interface StepItem {
  title: string
  body?: string
  code?: string
  /** "fill in YOUR part" note shown under the command (Tier 0 anti-stuck rail). */
  fillIn?: string
  /** expected output / success signal. */
  output?: string
  /** "didn't work?" inline fix. */
  ifBroken?: string
  /** rough time for the step. */
  time?: string
}

export type Block =
  | { type: 'prose'; heading?: string; body: string; bullets?: string[] }
  | { type: 'checklist'; heading: string; items: { id: string; label: string; hint?: string }[] }
  | { type: 'steps'; items: StepItem[] }
  | { type: 'prompt'; id: string; title: string; description: string; prompt: string }
  | { type: 'cardgrid'; columns?: 2 | 3; items: { eyebrow?: string; title: string; description: string; bullets?: string[]; href?: string; cta?: string }[] }
  | { type: 'accordion'; heading?: string; items: { title: string; body: string }[] }
  | { type: 'embed'; heading?: string; note: string; href: string; cta: string }
  | { type: 'tagnote'; tag: string; text: string }
  | { type: 'sentence' } // captures/echoes the attendee's "I want AI to help me with ___"
  | { type: 'agenda' } // renders config.agenda
  | { type: 'callout'; kind?: 'info' | 'success'; title: string; body: string }
  | { type: 'milestone'; id: string; label: string; note?: string } // "I did this" → marks a milestone

export interface StandardPage {
  eyebrow?: string
  title: string
  subtitle?: string
  /** show the pinned "your sentence" banner at the top (Playbook/Prompts). */
  pinnedSentence?: boolean
  blocks: Block[]
}

export const setupPage: StandardPage = {
  eyebrow: 'Before the workshop',
  title: 'Get ready',
  subtitle: 'Check off each item before June 11. Your progress saves in this browser.',
  blocks: [
    {
      type: 'checklist',
      heading: 'What to install',
      items: [
        { id: 'node', label: 'Node.js 20+', hint: 'node --version to check' },
        { id: 'claude', label: 'Claude Code', hint: 'npm install -g @anthropic-ai/claude-code' },
        { id: 'account', label: 'Anthropic account', hint: 'claude.ai — 2 minutes to create' },
      ],
    },
    {
      type: 'checklist',
      heading: 'What to bring',
      items: [
        { id: 'laptop', label: 'Personal laptop (not work-managed)' },
        { id: 'doc', label: 'Design system doc', hint: 'Any component spec, README, token ref' },
        { id: 'sentence', label: 'Your sentence (below)', hint: 'I want to see if AI can help me with ___' },
      ],
    },
    { type: 'sentence' },
    { type: 'agenda' },
    {
      type: 'embed',
      heading: 'Laptop locked down?',
      note: 'No admin rights or a work-managed machine? Run the entire workshop in the cloud — no local install needed. (Also available from the Stuck? button, any page.)',
      href: 'https://github.com/codespaces/new?repo=theambermeister-324/patterns-denver',
      cta: 'Open in GitHub Codespaces',
    },
  ],
}

export const playbookPage: StandardPage = {
  eyebrow: 'Day of · Workshop guide',
  title: 'Getting started',
  subtitle: 'Four steps, ~10 minutes. Run them in order. Stuck? Use the help button, bottom-right.',
  pinnedSentence: true,
  blocks: [
    {
      type: 'steps',
      items: [
        {
          title: 'Clone the repo and open it',
          time: '~3 min',
          body: 'Copy the commands below into your terminal. You need to be inside the patterns-denver folder before continuing.',
          code: 'git clone https://github.com/theambermeister-324/patterns-denver.git\ncd patterns-denver\nnpm install\nclaude',
          output: 'You should see the Claude Code interface open in your terminal.',
          ifBroken: 'If `claude` isn’t found, re-run the install line, then type `claude` again from inside the patterns-denver folder.',
        },
        {
          title: 'Run setup',
          time: '~1 min',
          body: 'This checks your environment and creates the folders Claude needs. Run it once at the start of each session.',
          code: '/setup',
          output: 'Claude confirms setup is complete. Should take under 30 seconds.',
        },
        {
          title: 'Drop in your docs and ingest',
          time: '~3 min',
          body: 'Add any design system file to the raw/ folder — a component spec, README, tokens reference, Figma export. A sample is already there if you want to start immediately.',
          code: '# drop your file into raw/, then:\n/ingest all',
          fillIn: 'Put YOUR file in the raw/ folder first. No file yet? The sample doc works fine.',
          output: "Claude reads your docs and organizes them into a knowledge base — you'll see a list of pages created.",
          ifBroken: 'If /query later returns nothing, it usually means ingest didn’t run — re-run /ingest all.',
        },
        {
          title: 'Ask your first question',
          time: '~3 min',
          body: 'Start with the prompt below, or write your own from your sentence. This is the deployed agent — you’re running it right now.',
          code: '/query What are the documentation gaps in this design system?',
          fillIn: 'Swap in a question from YOUR sentence once you’ve seen how it answers.',
          output: 'Claude answers based only on your docs — no hallucination, no generic advice.',
        },
      ],
    },
    { type: 'milestone', id: 'playbook', label: 'I ran my first query', note: 'Marks your progress and unlocks the readiness check.' },
    {
      type: 'accordion',
      heading: 'Bonus & triage',
      items: [
        { title: 'Done early? Connect Knapsack (optional)', body: 'Add the Knapsack design system as a live reference for comparison queries. 1) Go to claude.ai/settings/integrations. 2) Add a new MCP server with URL https://mcp.knapsack.cloud/mcp/demo. 3) Restart Claude Code. 4) Try: /query What does Knapsack have that my system lacks? Then use the bonus prompts on the Prompts page.' },
        { title: "Claude Code isn't opening", body: 'Type `claude` inside the patterns-denver folder. Still nothing? Raise a hand — or use the cloud fallback (Codespaces) from the Setup page.' },
        { title: '/query returns nothing', body: 'Run /ingest all first — the wiki may be empty.' },
        { title: 'npm errors during install', body: 'Raise your hand — Angie or Amber will come to you.' },
        { title: "I don't know what to ask", body: 'Open Prompts, or start from your pinned sentence at the top of this page.' },
      ],
    },
  ],
}

export const promptsPage: StandardPage = {
  eyebrow: 'Day of · Prompt library',
  title: 'Ready-to-run prompts',
  subtitle: 'Copy any prompt into Claude Code. Start with the first if you’re unsure.',
  pinnedSentence: true,
  blocks: [
    { type: 'prompt', id: 'gaps', title: 'Surface documentation gaps', description: "A broad first pass — components with no usage examples, accessibility gaps, rationale never written down.", prompt: '/query What are the documentation gaps in this design system?' },
    { type: 'prompt', id: 'a11y', title: 'Find accessibility gaps', description: 'Narrows to a11y specifically. Useful if accessibility coverage is uneven.', prompt: '/query Which components are missing accessibility guidance?' },
    { type: 'prompt', id: 'neweng', title: 'Think like a new engineer', description: 'What do people learn by asking a human instead of reading the docs? That gap is your first automation target.', prompt: "/query What would a new engineer need to know that isn't in these docs?" },
    { type: 'prompt', id: 'contradictions', title: 'Find contradictions', description: 'For mature systems with multiple authors — token values that disagree, guidance that conflicts.', prompt: '/query Where does this system have contradictions or inconsistencies?' },
    { type: 'prompt', id: 'aiready', title: 'AI-readiness audit', description: 'Surfaces the difference between docs written for humans and docs an AI can reliably act on.', prompt: '/query What documentation would I need to add to make this system AI-ready?' },
    { type: 'prompt', id: 'onboarding', title: 'Onboarding summary', description: 'A generative test — if the AI writes a coherent summary, your docs have enough signal.', prompt: '/query Write a 3-sentence onboarding summary for a developer joining this team' },
    {
      type: 'prose',
      heading: 'Write your own',
      body: 'The best prompts start with your sentence (pinned above).',
      bullets: ['Be specific about what you want to know', 'Name a component or token if you have one', 'Ask for a list, not an essay', 'Follow up: /query Tell me more about [the gap you mentioned]'],
    },
    { type: 'tagnote', tag: 'requires Knapsack MCP', text: 'If your facilitator connected the Knapsack MCP, compare directly against a real enterprise design system instead of asking “what’s missing?” in the abstract.' },
    { type: 'prompt', id: 'compare', title: 'Comparative gap analysis', description: "What each system prioritizes — you’ll find your system is strong where Knapsack isn’t, and vice versa.", prompt: "/query Using the Knapsack design system as a reference, what's in my system that Knapsack's lacks — and what does Knapsack have that I'm missing?" },
    { type: 'prompt', id: 'button', title: 'Component deep-dive', description: 'Narrow to one component for concrete output. Button is a good start.', prompt: '/query Compare how my design system documents the Button component versus how Knapsack documents it. What’s missing from mine?' },
    { type: 'prompt', id: 'benchmark', title: 'AI-readiness benchmark', description: 'The north-star question — Knapsack as a concrete target instead of an abstract ideal.', prompt: '/query What would I need to add to my documentation to make it as AI-queryable as Knapsack’s design system?' },
  ],
}

export const galleryPage: StandardPage = {
  eyebrow: 'Day of',
  title: 'Workshop gallery',
  subtitle: 'June 11, 2026 · Rhino District, Denver',
  blocks: [
    {
      type: 'cardgrid',
      columns: 2,
      items: [
        { title: 'Workshop repo', description: 'github.com/theambermeister-324/patterns-denver', href: 'https://github.com/theambermeister-324/patterns-denver', cta: 'Open repo' },
        { title: 'Gallery wall', description: 'patterns-denver-2026.netlify.app', href: 'https://patterns-denver-2026.netlify.app', cta: 'Open gallery' },
      ],
    },
    {
      type: 'embed',
      heading: 'What the room is building',
      note: 'Outputs appear live as groups submit. The live wall + submission form run on the original gallery page.',
      href: 'https://patterns-denver-2026.netlify.app/gallery.html',
      cta: 'Open the live gallery wall',
    },
    { type: 'milestone', id: 'gallery', label: 'I shared my output', note: 'Adds you to the room’s progress.' },
  ],
}

export const nextPage: StandardPage = {
  eyebrow: 'After June 11',
  title: "What's next",
  subtitle: "You've seen what AI can do with your design system. The next step is knowing where you actually stand — and who can help you get there.",
  blocks: [
    {
      type: 'cardgrid',
      columns: 2,
      items: [
        {
          eyebrow: 'Your next step',
          title: 'AI doesn’t consume components — it consumes context',
          description: 'Today you ran queries against your docs. The PCRI tells you how AI-ready that context really is — scored against 158 enterprises. 10 minutes.',
          bullets: ['Your archetype — Builder, Adopter, Optimizer, or Transformer', 'Industry benchmark across 158 enterprises', 'AI governance score — can you adopt AI safely?', 'Priority roadmap — personalized actions'],
          href: 'https://www.knapsack-enable.com/app/ipe-intake',
          cta: 'Start the PCRI',
        },
        {
          eyebrow: 'Stay connected',
          title: 'The Denver cohort',
          description: 'The people in the room today are your best peer resource. Keep the conversation going.',
          href: 'https://join.slack.com/share/enQtMTEzMzIyNTMyMTU3NzctNWJiMDM5OTVhZGJhODZmODFjNmVmMWZmNmI5OWYxZGZlMjhmODNjZmI3MzNlYWQ4YmM4MzUwNTAyNDlmNThhOA',
          cta: 'Join the Slack channel',
        },
      ],
    },
    {
      type: 'cardgrid',
      columns: 3,
      items: [
        { eyebrow: 'Once you know your benchmark', title: 'Knapsack', description: 'Gaps in AI readiness or doc structure — Knapsack makes your design system machine-readable and connects it to every AI tool your developers use.', href: 'https://www.knapsack.cloud', cta: 'knapsack.cloud' },
        { eyebrow: 'Org & culture', title: 'FuegoUX', description: 'Governance or culture gaps — FuegoUX works the org side: executive alignment, contribution models, practice-building.', href: 'https://www.fuegoux.com', cta: 'fuegoux.com' },
        { eyebrow: 'Delivery & tooling', title: 'Crux Digital', description: 'Delivery workflow gaps — Crux Digital handles CI/CD integration, automated audits, and design-system tooling.', href: 'https://www.cruxdigital.com', cta: 'cruxdigital.com' },
      ],
    },
  ],
}

export const feedbackPage: StandardPage = {
  eyebrow: 'After June 11',
  title: 'Share your feedback',
  subtitle: 'Takes about 3 minutes. Your answers help us improve and figure out who needs follow-up.',
  blocks: [
    {
      type: 'embed',
      heading: 'Workshop survey',
      note: 'An 8-question survey (rating, what was useful, friction, follow-up needs, NPS). Responses without an email are anonymous.',
      href: 'https://patterns-denver-2026.netlify.app/survey.html',
      cta: 'Open the survey',
    },
    {
      type: 'cardgrid',
      columns: 2,
      items: [
        { title: 'Take the PCRI assessment', description: 'See how AI-ready your design system is, benchmarked against 158 enterprises.', href: 'https://www.knapsack-enable.com/app/ipe-intake', cta: 'Start the PCRI' },
        { title: 'Join the Denver cohort', description: 'Share wins, ask questions, stay connected with today’s room.', href: 'https://join.slack.com/share/enQtMTEzMzIyNTMyMTU3NzctNWJiMDM5OTVhZGJhODZmODFjNmVmMWZmNmI5OWYxZGZlMjhmODNjZmI3MzNlYWQ4YmM4MzUwNTAyNDlmNThhOA', cta: 'Join the Slack channel' },
      ],
    },
  ],
}

export const standardPages: Record<string, StandardPage> = {
  setup: setupPage,
  playbook: playbookPage,
  prompts: promptsPage,
  gallery: galleryPage,
  next: nextPage,
  feedback: feedbackPage,
}
