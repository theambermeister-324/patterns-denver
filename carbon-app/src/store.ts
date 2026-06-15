import { useSyncExternalStore } from 'react'

// ---------------------------------------------------------------------------
// Tiny localStorage-backed progress store (no deps).
//
// Holds the one identity thread the council asked for: the attendee's
// "sentence" → their readiness score → PCRI follow-up, plus the guide-rail
// state (checklist, copied snippets, completed milestones, consent).
//
// Everything stays in THIS browser. Nothing is sent anywhere unless the
// attendee explicitly opts in (see `consent`). That's the privacy posture.
// ---------------------------------------------------------------------------

export interface ProgressState {
  sentence: string
  checks: Record<string, boolean> // setup checklist item ids
  copied: Record<string, boolean> // snippet ids that have been copied
  milestones: Record<string, boolean> // milestone ids (see MILESTONES)
  consent: boolean
  email: string
  readinessScore: number | null
  readinessAnswers: Record<string, number>
}

/** Milestones drive the global progress bar. */
export const MILESTONES: { id: string; label: string }[] = [
  { id: 'setup', label: 'Set up' },
  { id: 'playbook', label: 'First query' },
  { id: 'prompts', label: 'Explored prompts' },
  { id: 'readiness', label: 'Readiness check' },
  { id: 'gallery', label: 'Shared an output' },
]

const KEY = 'pd-progress-v1'

const empty: ProgressState = {
  sentence: '',
  checks: {},
  copied: {},
  milestones: {},
  consent: false,
  email: '',
  readinessScore: null,
  readinessAnswers: {},
}

function load(): ProgressState {
  if (typeof localStorage === 'undefined') return empty
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...empty, ...JSON.parse(raw) } : empty
  } catch {
    return empty
  }
}

let state: ProgressState = load()
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage may be unavailable (private mode) — degrade silently */
  }
}

export function setProgress(patch: Partial<ProgressState>) {
  state = { ...state, ...patch }
  persist()
  emit()
}

export function toggleCheck(id: string) {
  setProgress({ checks: { ...state.checks, [id]: !state.checks[id] } })
}

export function markCopied(id: string) {
  if (state.copied[id]) return
  setProgress({ copied: { ...state.copied, [id]: true } })
}

export function setMilestone(id: string, value = true) {
  setProgress({ milestones: { ...state.milestones, [id]: value } })
}

export function resetProgress() {
  state = { ...empty }
  persist()
  emit()
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

/** Subscribe a component to the whole progress state. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, () => state, () => state)
}

/** Completed-milestone count for the progress bar. */
export function milestoneProgress(s: ProgressState): { done: number; total: number } {
  return { done: MILESTONES.filter((m) => s.milestones[m.id]).length, total: MILESTONES.length }
}
