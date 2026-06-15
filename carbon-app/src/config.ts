// ---------------------------------------------------------------------------
// Event configuration — the "workshop-in-a-box" re-skin seam.
//
// Everything event-specific (name, dates, the canonical URLs, the agenda)
// lives here so the same app redeploys for a different conference / team by
// editing one file. Page copy lives in content.ts; brand/links live here.
// ---------------------------------------------------------------------------

export const config = {
  eventName: 'Patterns Denver 2026',
  tagline: 'AI sandbox workshop',
  date: 'June 11, 2026',
  location: 'Rhino District, Denver',
  presenter: 'Knapsack',

  // Canonical links (used by CTAs, fallbacks, sharing)
  repoUrl: 'https://github.com/theambermeister-324/patterns-denver',
  /** One-click cloud fallback for a broken/locked-down laptop (Tier 3). */
  codespacesUrl: 'https://github.com/codespaces/new?repo=theambermeister-324/patterns-denver',
  pcriUrl: 'https://www.knapsack-enable.com/app/ipe-intake',
  slackUrl:
    'https://join.slack.com/share/enQtMTEzMzIyNTMyMTU3NzctNWJiMDM5OTVhZGJhODZmODFjNmVmMWZmNmI5OWYxZGZlMjhmODNjZmI3MzNlYWQ4YmM4MzUwNTAyNDlmNThhOA',
  liveGalleryUrl: 'https://patterns-denver-2026.netlify.app/gallery.html',
  surveyUrl: 'https://patterns-denver-2026.netlify.app/survey.html',
  /** Where attendees raise a hand for live help. */
  helpContact: 'Find Amber, Nate, or Angie in the room',

  /** Time-boxed agenda (Tier 0 — gives the afternoon a shape). */
  agenda: [
    { time: '0:00', label: 'Welcome + write your sentence' },
    { time: '0:15', label: 'Setup + clone (Playbook steps 1–2)' },
    { time: '0:35', label: 'Ingest your docs + first query (steps 3–4)' },
    { time: '1:00', label: 'Explore the prompt library' },
    { time: '1:30', label: 'Readiness check + share to the gallery' },
    { time: '2:00', label: 'Readouts + what’s next' },
  ],
} as const

export type Config = typeof config
