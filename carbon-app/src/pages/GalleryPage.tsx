import { useEffect, useState } from 'react'
import {
  Grid,
  Column,
  Tile,
  Button,
  TextInput,
  TextArea,
  InlineNotification,
} from '@carbon/react'
import { hasSupabase, getSupabase } from '../lib/supabase'
import { setMilestone } from '../store'
import PageRenderer from '../PageRenderer'
import { standardPages } from '../content'

interface Submission {
  id?: string
  session_name: string
  what_built: string
  surprise?: string
  link?: string
}

function NativeGallery() {
  const [items, setItems] = useState<Submission[]>([])
  const [form, setForm] = useState<Submission>({ session_name: '', what_built: '', surprise: '', link: '' })
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')

  async function load() {
    const sb = await getSupabase()
    if (!sb) return
    const { data } = await sb.from('gallery_submissions').select('*').order('created_at', { ascending: false }).limit(50)
    if (data) setItems(data as Submission[])
  }

  useEffect(() => {
    load()
  }, [])

  async function submit() {
    if (!form.session_name || !form.what_built) return
    setStatus('saving')
    const sb = await getSupabase()
    if (!sb) return setStatus('error')
    const { error } = await sb.from('gallery_submissions').insert(form)
    if (error) return setStatus('error')
    setStatus('done')
    setMilestone('gallery')
    setForm({ session_name: '', what_built: '', surprise: '', link: '' })
    load()
  }

  return (
    <>
      <section className="pd-pagehead">
        <Grid><Column lg={12} md={8} sm={4}>
          <p className="cds--type-label-01 pd-pagehead__eyebrow">Day of</p>
          <h1 className="cds--type-fluid-heading-05 pd-pagehead__title">Workshop gallery</h1>
          <p className="cds--type-body-02 pd-pagehead__sub">
            {items.length} {items.length === 1 ? 'output' : 'outputs'} from the room — add yours below.
          </p>
        </Column></Grid>
      </section>

      <section className="pd-section">
        <Grid><Column lg={6} md={8} sm={4}>
          <Tile className="pd-prompt">
            <h3 className="cds--type-heading-03" style={{ marginBottom: '1rem' }}>Add your output</h3>
            {status === 'done' && <InlineNotification kind="success" lowContrast hideCloseButton title="Added to the gallery" subtitle="Thanks for sharing." />}
            {status === 'error' && <InlineNotification kind="error" lowContrast hideCloseButton title="Couldn’t save" subtitle="Try again, or use the live gallery." />}
            <TextInput id="g-name" labelText="Name your session" value={form.session_name} onChange={(e) => setForm({ ...form, session_name: e.target.value })} style={{ marginBottom: '0.75rem' }} />
            <TextArea id="g-built" labelText="What you built" value={form.what_built} onChange={(e) => setForm({ ...form, what_built: e.target.value })} style={{ marginBottom: '0.75rem' }} />
            <TextArea id="g-surprise" labelText="What surprised you" value={form.surprise} onChange={(e) => setForm({ ...form, surprise: e.target.value })} style={{ marginBottom: '0.75rem' }} />
            <TextInput id="g-link" labelText="Link (optional)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} style={{ marginBottom: '1rem' }} />
            <Button kind="primary" disabled={status === 'saving' || !form.session_name || !form.what_built} onClick={submit}>Add to gallery</Button>
          </Tile>
        </Column>
        <Column lg={10} md={8} sm={4}>
          <Grid condensed>
            {items.map((it) => (
              <Column key={it.id ?? it.session_name} lg={8} md={4} sm={4}>
                <Tile className="pd-card pd-card--info">
                  <h3 className="cds--type-heading-compact-02 pd-card__title">{it.session_name}</h3>
                  <p className="cds--type-body-01 pd-card__desc">{it.what_built}</p>
                  {it.surprise && <p className="cds--type-helper-text-01 pd-block__body">Surprise: {it.surprise}</p>}
                  {it.link && <a className="cds--link" href={it.link} target="_blank" rel="noopener noreferrer">Open →</a>}
                </Tile>
              </Column>
            ))}
          </Grid>
        </Column></Grid>
      </section>
    </>
  )
}

export default function GalleryPage() {
  // Native Supabase wall when keys exist; otherwise the link-out (current behaviour).
  if (!hasSupabase) return <PageRenderer page={standardPages.gallery} routeKey="gallery" />
  return <NativeGallery />
}
