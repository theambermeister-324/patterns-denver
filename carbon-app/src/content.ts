// ---------------------------------------------------------------------------
// Switcher-ready content model.
//
// All page copy + structure lives here as plain data, decoupled from the Carbon
// presentation layer in App.tsx. To render the same site in a different design
// system later (Material, Fluent, Polaris…), you only write a new presentation
// component against this same shape — the content never moves.
// ---------------------------------------------------------------------------

export type Phase = 'before' | 'during' | 'after'

export interface NavItem {
  label: string
  href: string
  active?: boolean
}

export interface Facilitator {
  name: string
  org: string
  initials: string
}

export interface CardItem {
  /** which Carbon icon to render — resolved to a component in App.tsx */
  icon: 'play' | 'chat' | 'apps' | 'checklist' | 'arrow'
  phase: Phase
  phaseLabel: string
  title: string
  description: string
  href: string
  /** featured cards render larger / wider in the grid */
  featured?: boolean
}

export const nav: NavItem[] = [
  { label: 'Home', href: '#', active: true },
  { label: 'Setup', href: '#' },
  { label: 'Playbook', href: '#' },
  { label: 'Prompts', href: '#' },
  { label: 'Gallery', href: '#' },
  { label: 'Next steps', href: '#' },
  { label: 'Feedback', href: '#' },
]

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
  {
    icon: 'play',
    phase: 'during',
    phaseLabel: 'Day of',
    title: 'Workshop guide',
    description: 'Step-by-step: clone, setup, ingest, query. Triage help if you get stuck.',
    href: '#',
    featured: true,
  },
  {
    icon: 'chat',
    phase: 'during',
    phaseLabel: 'Day of',
    title: 'Prompt library',
    description: '6 ready-to-run queries. Copy and paste directly into Claude Code.',
    href: '#',
    featured: true,
  },
  {
    icon: 'apps',
    phase: 'during',
    phaseLabel: 'Day of',
    title: 'Gallery wall',
    description: 'See what the room is building. Submit your output here.',
    href: '#',
  },
  {
    icon: 'checklist',
    phase: 'before',
    phaseLabel: 'Before the workshop',
    title: 'Setup checklist',
    description: 'What to install, what to bring, what to expect.',
    href: '#',
  },
  {
    icon: 'arrow',
    phase: 'after',
    phaseLabel: 'After June 11',
    title: "What's next",
    description: 'PCRI assessment, Denver cohort, and partner paths.',
    href: '#',
  },
]

export const footerText = 'Patterns Denver 2026 · Knapsack'
