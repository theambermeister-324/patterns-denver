import type { SupabaseClient } from '@supabase/supabase-js'

// Env-gated Supabase access. The client is INERT (getSupabase → null) until both
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in the Netlify env, so
// the app gracefully degrades to the live link-out gallery/survey. supabase-js
// is dynamically imported only when keys exist, so it never bloats the bundle.
//
// Expected table for the native gallery wall (create in Supabase before enabling):
//   gallery_submissions(id uuid pk default, created_at timestamptz default now(),
//     session_name text, what_built text, surprise text, link text)
//   + RLS: anon insert + anon select.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const hasSupabase = Boolean(url && anon)

let clientPromise: Promise<SupabaseClient> | null = null

export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!hasSupabase) return null
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url as string, anon as string),
    )
  }
  return clientPromise
}
