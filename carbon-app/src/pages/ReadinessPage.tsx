import { useState } from 'react'
import {
  Grid,
  Column,
  Tile,
  Tag,
  Button,
  RadioButtonGroup,
  RadioButton,
  TextInput,
  Checkbox,
  InlineNotification,
} from '@carbon/react'
import { ArrowUpRight } from '@carbon/icons-react'
import { config } from '../config'
import { useProgress, setProgress, setMilestone } from '../store'

// Self-reported signals from running Claude on THEIR docs. Higher = more AI-ready.
const QUESTIONS: { id: string; q: string; options: { label: string; value: number }[] }[] = [
  { id: 'examples', q: 'Components with no usage examples?', options: [{ label: 'Many', value: 0 }, { label: 'A few', value: 50 }, { label: 'None', value: 100 }] },
  { id: 'a11y', q: 'Accessibility guidance coverage?', options: [{ label: 'Missing', value: 0 }, { label: 'Partial', value: 50 }, { label: 'Thorough', value: 100 }] },
  { id: 'summary', q: 'Could Claude write a coherent onboarding summary?', options: [{ label: 'It hallucinated', value: 0 }, { label: 'It hedged', value: 50 }, { label: 'Confidently', value: 100 }] },
  { id: 'contradictions', q: 'Contradictions or inconsistencies found?', options: [{ label: 'Many', value: 0 }, { label: 'Some', value: 50 }, { label: 'None', value: 100 }] },
  { id: 'coverage', q: 'How much of your system did Claude have docs for?', options: [{ label: 'Little', value: 0 }, { label: 'Some', value: 50 }, { label: 'Most', value: 100 }] },
]

function archetype(score: number): { name: string; gap: string } {
  if (score < 40) return { name: 'Builder', gap: 'Your docs are written for humans, not machines. The biggest wins are structural — usage examples, tokens, and rationale an AI can read.' }
  if (score < 60) return { name: 'Adopter', gap: 'You have real coverage but uneven signal. Closing the gaps (a11y, contradictions) is what makes AI reliable on your system.' }
  if (score < 80) return { name: 'Optimizer', gap: 'Your system is largely AI-legible. The remaining gaps are the long tail — and that’s exactly what the PCRI quantifies against 158 enterprises.' }
  return { name: 'Transformer', gap: 'Your docs are unusually AI-ready. The PCRI shows where you lead the benchmark — and where governance, not docs, is now the constraint.' }
}

export default function ReadinessPage() {
  const p = useProgress()
  const [shared, setShared] = useState(false)
  const answered = QUESTIONS.every((q) => typeof p.readinessAnswers[q.id] === 'number')

  async function share(score: number, name: string) {
    const text = `I audited my design system at ${config.eventName} — AI-readiness ${score}/100 (${name}). ${config.repoUrl}`
    try {
      await navigator.clipboard.writeText(text)
      setShared(true)
      setTimeout(() => setShared(false), 2500)
    } catch {
      /* clipboard unavailable */
    }
  }

  function compute() {
    const vals = QUESTIONS.map((q) => p.readinessAnswers[q.id])
    const score = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
    setProgress({ readinessScore: score })
    setMilestone('readiness')
  }

  const score = p.readinessScore
  const arch = score != null ? archetype(score) : null

  return (
    <>
      <section className="pd-pagehead">
        <Grid>
          <Column lg={12} md={8} sm={4}>
            <p className="cds--type-label-01 pd-pagehead__eyebrow">Day of · In the room</p>
            <h1 className="cds--type-fluid-heading-05 pd-pagehead__title">How AI-ready are your docs?</h1>
            <p className="cds--type-body-02 pd-pagehead__sub">
              Answer from what Claude just showed you. You’ll get a readiness score and your archetype —
              the same lens the PCRI scores against 158 enterprises.
            </p>
          </Column>
        </Grid>
      </section>

      {p.sentence && (
        <section className="pd-section pd-section--tight">
          <Grid><Column lg={10} md={8} sm={4}>
            <aside className="pd-sentence-pin">
              <span className="cds--type-label-01 pd-sentence-pin__label">Your goal</span>
              <p className="cds--type-heading-03 pd-sentence-pin__text">“{p.sentence}”</p>
            </aside>
          </Column></Grid>
        </section>
      )}

      <section className="pd-section">
        <Grid>
          <Column lg={10} md={8} sm={4}>
            {QUESTIONS.map((q) => (
              <div key={q.id} className="pd-readiness-q">
                <RadioButtonGroup
                  legendText={q.q}
                  name={q.id}
                  valueSelected={p.readinessAnswers[q.id]}
                  onChange={(value) => setProgress({ readinessAnswers: { ...p.readinessAnswers, [q.id]: Number(value) } })}
                >
                  {q.options.map((o) => (
                    <RadioButton key={o.label} id={`${q.id}-${o.value}`} labelText={o.label} value={o.value} />
                  ))}
                </RadioButtonGroup>
              </div>
            ))}
            <Button kind="primary" disabled={!answered} onClick={compute} style={{ marginTop: '1rem' }}>
              {score != null ? 'Recalculate my score' : 'Get my readiness score'}
            </Button>
            {!answered && <p className="cds--type-helper-text-01 pd-block__body" style={{ marginTop: '0.5rem' }}>Answer all five to see your score.</p>}
          </Column>
        </Grid>
      </section>

      {score != null && arch && (
        <section className="pd-section">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              <Tile className="pd-result">
                <div className="pd-result__head">
                  <div>
                    <span className="cds--type-label-01">Your AI-readiness</span>
                    <div className="pd-result__score">{score}<span className="pd-result__max">/100</span></div>
                  </div>
                  <Tag type="blue" size="md">{arch.name}</Tag>
                </div>
                <div className="pd-meter" role="img" aria-label={`AI-readiness score ${score} out of 100`}>
                  <div className="pd-meter__fill" style={{ width: `${score}%` }} />
                </div>
                <p className="cds--type-body-02 pd-block__body" style={{ marginTop: '1rem' }}>{arch.gap}</p>

                <h2 className="cds--type-heading-03" style={{ marginTop: '1.5rem' }}>Your next step — right now</h2>
                <p className="cds--type-body-01 pd-block__body">
                  Turn this snapshot into a benchmarked roadmap. The PCRI takes 10 minutes and tells you exactly what to prioritize.
                </p>
                <div className="pd-result__cta">
                  <Button href={config.pcriUrl} target="_blank" rel="noopener noreferrer" renderIcon={ArrowUpRight} kind="primary">
                    Start the PCRI
                  </Button>
                  <Button kind="tertiary" onClick={() => share(score, arch.name)}>
                    {shared ? 'Copied to clipboard' : 'Copy a shareable summary'}
                  </Button>
                </div>

                {/* Opt-in follow-up — privacy-first, stored locally until the user consents. */}
                <div className="pd-consent">
                  <Checkbox
                    id="pd-consent"
                    labelText="It’s OK for a facilitator to follow up with me about my result."
                    checked={p.consent}
                    onChange={(_, { checked }) => setProgress({ consent: checked })}
                  />
                  {p.consent && (
                    <TextInput
                      id="pd-email"
                      type="email"
                      labelText="Work email (optional)"
                      placeholder="you@company.com"
                      value={p.email}
                      onChange={(e) => setProgress({ email: e.target.value })}
                      helperText="Stays in your browser. Share it with a facilitator in the room, or use it on the PCRI."
                    />
                  )}
                  <InlineNotification
                    kind="info"
                    lowContrast
                    hideCloseButton
                    title="Your data stays with you"
                    subtitle="Your answers, score, and sentence are stored only in this browser. Nothing is sent anywhere unless you choose to."
                  />
                </div>
              </Tile>
            </Column>
          </Grid>
        </section>
      )}
    </>
  )
}
