// ---------------------------------------------------------------------------
// Switcher-ready content model.
//
// All page copy + structure lives here as plain data, decoupled from the Carbon
// presentation layer. Page components are dumb renderers over this data. To
// render the site in a different design system later, write a new renderer
// against these same types — the content never moves.
// ---------------------------------------------------------------------------

// ---- Shared nav ----------------------------------------------------------
export interface PageMeta {
  /** hash route segment; '' is home */
  route: string
  label: string
}

export const pages: PageMeta[] = [
  { route: '', label: 'Home' },
  { route: 'setup', label: 'Setup' },
  { route: 'playbook', label: 'Playbook' },
  { route: 'prompts', label: 'Prompts' },
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
  /** hash route this card links to */
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
export type Block =
  | { type: 'prose'; heading?: string; body: string; bullets?: string[] }
  | { type: 'checklist'; heading: string; items: { label: string; hint?: string }[] }
  | { type: 'steps'; items: { title: string; body?: string; code?: string; output?: string }[] }
  | { type: 'prompt'; title: string; description: string; prompt: string }
  | { type: 'cardgrid'; columns?: 2 | 3; items: { eyebrow?: string; title: string; description: string; bullets?: string[]; href?: string; cta?: string }[] }
  | { type: 'accordion'; heading?: string; items: { title: string; body: string }[] }
  | { type: 'embed'; heading?: string; note: string; href: string; cta: string }
  | { type: 'tagnote'; tag: string; text: string }

export interface StandardPage {
  eyebrow?: string
  title: string
  subtitle?: string
  blocks: Block[]
}

export const setupPage: StandardPage = {
  eyebrow: 'Before the workshop',
  title: 'Get ready',
  subtitle: 'Check off each item before June 11.',
  blocks: [
    {
      type: 'checklist',
      heading: 'What to install',
      items: [
        { label: 'Node.js 20+', hint: 'node --version to check' },
        { label: 'Claude Code', hint: 'npm install -g @anthropic-ai/claude-code' },
        { label: 'Anthropic account', hint: 'claude.ai — 2 minutes to create' },
      ],
    },
    {
      type: 'checklist',
      heading: 'What to bring',
      items: [
        { label: 'Personal laptop (not work-managed)' },
        { label: 'Design system doc', hint: 'Any component spec, README, token ref' },
        { label: 'Your sentence', hint: 'I want to see if AI can help me with ___' },
      ],
    },
  ],
}

export const playbookPage: StandardPage = {
  eyebrow: 'Day of · Workshop guide',
  title: 'Getting started',
  subtitle: 'Four steps. Takes about 10 minutes. Run these in order. If something breaks, see triage at the bottom.',
  blocks: [
    {
      type: 'prose',
      heading: 'Before you open your terminal — write this down',
      body: '“I want to see if AI can help me with ___.” One sentence. This is your compass for the afternoon. Everything you build should serve it.',
    },
    {
      type: 'steps',
      items: [
        {
          title: 'Clone the repo and open it',
          body: 'Copy the commands below into your terminal. You need to be inside the patterns-denver folder before continuing.',
          code: 'git clone https://github.com/theambermeister-324/patterns-denver.git\ncd patterns-denver\nnpm install\nclaude',
          output: 'You should see the Claude Code interface open in your terminal.',
        },
        {
          title: 'Run setup',
          body: 'This checks your environment and creates the folders Claude needs. Run it once at the start of each session.',
          code: '/setup',
          output: 'Claude will confirm setup is complete. Should take under 30 seconds.',
        },
        {
          title: 'Drop in your docs and ingest',
          body: 'Add any design system file to the raw/ folder — a component spec, README, tokens reference, Figma export. A sample is already there if you want to start immediately.',
          code: '# drop your file into raw/, then:\n/ingest all',
          output: "Claude reads your docs and organizes them into a knowledge base. You'll see a list of pages created.",
        },
        {
          title: 'Ask your first question',
          body: "Start with one of the prompts below, or write your own based on the sentence you wrote down. This is the deployed agent — you're running it right now.",
          code: '/query What are the documentation gaps in this design system?',
          output: 'Claude answers based only on your docs — no hallucination, no generic advice.',
        },
      ],
    },
    {
      type: 'accordion',
      heading: 'Bonus & triage',
      items: [
        {
          title: 'Bonus: connect Knapsack (optional)',
          body: 'Add the Knapsack design system as a live reference for comparison queries. 1) Go to claude.ai/settings/integrations. 2) Add a new MCP server with URL https://mcp.knapsack.cloud/mcp/demo. 3) Restart Claude Code — the Knapsack tools load automatically. 4) Try: /query What does Knapsack have that my system lacks?',
        },
        { title: "Claude Code isn't opening", body: 'Type `claude` inside the patterns-denver folder — ask Angie if nothing happens.' },
        { title: '/query returns nothing', body: 'Run /ingest all first — the wiki may be empty.' },
        { title: 'npm errors during install', body: 'Raise your hand — Angie or Amber will come to you.' },
        { title: "I don't know what to ask", body: 'Open Prompts — or find Amber or Nate. This is the real question.' },
        { title: 'Knapsack bonus prompts not working', body: 'Add the MCP at claude.ai/settings/integrations, then restart Claude Code.' },
      ],
    },
  ],
}

export const promptsPage: StandardPage = {
  eyebrow: 'Day of · Prompt library',
  title: 'Ready-to-run prompts',
  subtitle: "Copy any prompt and paste directly into Claude Code. Start with the first one if you're not sure where to begin.",
  blocks: [
    { type: 'prompt', title: 'Surface documentation gaps', description: "A broad first pass. Claude scans what's missing — components with no usage examples, accessibility gaps, rationale never written down.", prompt: '/query What are the documentation gaps in this design system?' },
    { type: 'prompt', title: 'Find accessibility gaps', description: 'Narrows to a11y specifically. Useful if accessibility coverage is uneven across your component library.', prompt: '/query Which components are missing accessibility guidance?' },
    { type: 'prompt', title: 'Think like a new engineer', description: 'Forces a perspective shift. What do people learn by asking a human instead of reading the docs? That gap is your first automation target.', prompt: "/query What would a new engineer need to know that isn't in these docs?" },
    { type: 'prompt', title: 'Find contradictions', description: 'Good for mature systems with multiple authors. Token values that disagree, usage guidance that conflicts, patterns that have drifted.', prompt: '/query Where does this system have contradictions or inconsistencies?' },
    { type: 'prompt', title: 'AI-readiness audit', description: 'Surfaces the difference between docs written for humans and docs an AI can reliably act on.', prompt: '/query What documentation would I need to add to make this system AI-ready?' },
    { type: 'prompt', title: 'Onboarding summary', description: 'A generative test. If the AI can write a coherent summary, your docs have enough signal. If it hedges or hallucinates, you’ve found the gaps.', prompt: '/query Write a 3-sentence onboarding summary for a developer joining this team' },
    {
      type: 'prose',
      heading: 'Write your own',
      body: 'The best prompts start with your sentence from the Setup page: “I want to see if AI can help me with ___.”',
      bullets: [
        'Be specific about what you want to know',
        'Name a component or token if you have one',
        'Ask for a list, not an essay',
        'Follow up: /query Tell me more about [the gap you mentioned]',
      ],
    },
    { type: 'tagnote', tag: 'requires Knapsack MCP', text: "If your facilitator has connected the Knapsack MCP, you can use a real enterprise design system as a reference benchmark — compare directly instead of asking 'what's missing?' in the abstract." },
    { type: 'prompt', title: 'Comparative gap analysis', description: "Surfaces what each system prioritizes. You'll often find your system is strong where Knapsack isn't, and vice versa.", prompt: "/query Using the Knapsack design system as a reference, what's in my system that Knapsack's lacks — and what does Knapsack have that I'm missing?" },
    { type: 'prompt', title: 'Component deep-dive', description: 'Narrow to one component for concrete output. Button is a good start — every system has one.', prompt: '/query Compare how my design system documents the Button component versus how Knapsack documents it. What’s missing from mine?' },
    { type: 'prompt', title: 'AI-readiness benchmark', description: 'The north-star question for this workshop. Uses Knapsack as a concrete target instead of an abstract ideal.', prompt: '/query What would I need to add to my documentation to make it as AI-queryable as Knapsack’s design system?' },
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
      note: 'Outputs appear live as groups submit during the afternoon. The live wall + submission form run on the original gallery page.',
      href: 'https://patterns-denver-2026.netlify.app/gallery.html',
      cta: 'Open the live gallery wall',
    },
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
          description: 'Today you ran queries against your docs. The PCRI tells you how AI-ready that context really is — scored against 158 enterprises. 10 minutes. You’ll leave knowing your archetype and what to prioritize next.',
          bullets: [
            'Your archetype — Builder, Adopter, Optimizer, or Transformer',
            'Industry benchmark — where you land across 158 enterprises',
            'AI governance score — can you adopt AI safely?',
            'Priority roadmap — personalized actions, not a generic checklist',
          ],
          href: 'https://www.knapsack-enable.com/app/ipe-intake',
          cta: 'Start the PCRI',
        },
        {
          eyebrow: 'Stay connected',
          title: 'The Denver cohort',
          description: 'The people who were in the room today are your best peer resource. Questions, wins, frustrations — keep the conversation going.',
          href: 'https://join.slack.com/share/enQtMTEzMzIyNTMyMTU3NzctNWJiMDM5OTVhZGJhODZmODFjNmVmMWZmNmI5OWYxZGZlMjhmODNjZmI3MzNlYWQ4YmM4MzUwNTAyNDlmNThhOA',
          cta: 'Join the Slack channel',
        },
      ],
    },
    {
      type: 'cardgrid',
      columns: 3,
      items: [
        { eyebrow: 'Once you know your benchmark', title: 'Knapsack', description: 'If your PCRI shows gaps in AI readiness or documentation structure — Knapsack makes your design system machine-readable and connects it to every AI tool your developers use.', href: 'https://www.knapsack.cloud', cta: 'knapsack.cloud' },
        { eyebrow: 'Org & culture', title: 'FuegoUX', description: 'If your PCRI shows governance or culture gaps — FuegoUX works the org side: executive alignment, contribution models, and practice-building.', href: 'https://www.fuegoux.com', cta: 'fuegoux.com' },
        { eyebrow: 'Delivery & tooling', title: 'Crux Digital', description: 'If your PCRI shows delivery workflow gaps — Crux Digital handles the engineering side: CI/CD integration, automated audits, and design-system tooling.', href: 'https://www.cruxdigital.com', cta: 'cruxdigital.com' },
      ],
    },
  ],
}

export const feedbackPage: StandardPage = {
  eyebrow: 'After June 11',
  title: 'Share your feedback',
  subtitle: 'Takes about 3 minutes. Your answers help us improve and figure out who needs follow-up support.',
  blocks: [
    {
      type: 'embed',
      heading: 'Workshop survey',
      note: 'An 8-question survey (rating, what was useful, friction, follow-up needs, NPS). Responses without an email are anonymous; contact details are only used for follow-up by the workshop organizers.',
      href: 'https://patterns-denver-2026.netlify.app/survey.html',
      cta: 'Open the survey',
    },
    {
      type: 'cardgrid',
      columns: 2,
      items: [
        { title: 'Take the PCRI assessment', description: 'See how AI-ready your design system is, benchmarked against 158 enterprises.', href: 'https://www.knapsack-enable.com/app/ipe-intake', cta: 'Start the PCRI' },
        { title: 'Join the Denver cohort', description: 'Share wins, ask questions, and stay connected with today’s room.', href: 'https://join.slack.com/share/enQtMTEzMzIyNTMyMTU3NzctNWJiMDM5OTVhZGJhODZmODFjNmVmMWZmNmI5OWYxZGZlMjhmODNjZmI3MzNlYWQ4YmM4MzUwNTAyNDlmNThhOA', cta: 'Join the Slack channel' },
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
