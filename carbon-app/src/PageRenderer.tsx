import { useEffect } from 'react'
import {
  Grid,
  Column,
  Tile,
  Tag,
  Button,
  Checkbox,
  CodeSnippet,
  TextInput,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionItem,
  InlineNotification,
} from '@carbon/react'
import { ArrowRight, ArrowUpRight, CheckmarkFilled } from '@carbon/icons-react'
import type { Block, StandardPage } from './content'
import { config } from './config'
import { useProgress, toggleCheck, markCopied, setMilestone, setProgress } from './store'

const isExternal = (href: string) => /^https?:\/\//.test(href)

function CtaButton({ href, cta }: { href: string; cta: string }) {
  const external = isExternal(href)
  return (
    <Button
      href={href}
      kind="tertiary"
      size="sm"
      className="pd-cta"
      renderIcon={external ? ArrowUpRight : ArrowRight}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {cta}
    </Button>
  )
}

/** Pinned "your sentence" banner shown atop Playbook / Prompts. */
function SentenceBanner() {
  const p = useProgress()
  if (!p.sentence) {
    return (
      <section className="pd-section pd-section--tight">
        <Grid>
          <Column lg={10} md={8} sm={4}>
            <InlineNotification
              kind="info"
              lowContrast
              hideCloseButton
              title="Set your sentence first"
              subtitle="Open Setup and write “I want to see if AI can help me with ___.” It pins here as your compass."
            />
          </Column>
        </Grid>
      </section>
    )
  }
  return (
    <section className="pd-section pd-section--tight">
      <Grid>
        <Column lg={10} md={8} sm={4}>
          <aside className="pd-sentence-pin">
            <span className="cds--type-label-01 pd-sentence-pin__label">Your sentence</span>
            <p className="cds--type-heading-03 pd-sentence-pin__text">“{p.sentence}”</p>
          </aside>
        </Column>
      </Grid>
    </section>
  )
}

function CopiedTag({ id }: { id: string }) {
  const p = useProgress()
  if (!p.copied[id]) return null
  return (
    <Tag type="green" size="sm" renderIcon={CheckmarkFilled} className="pd-copied">
      Copied
    </Tag>
  )
}

function MilestoneButton({ id, label, note }: { id: string; label: string; note?: string }) {
  const p = useProgress()
  const done = !!p.milestones[id]
  return (
    <section className="pd-section pd-section--tight">
      <Grid>
        <Column lg={10} md={8} sm={4}>
          <Button
            kind={done ? 'ghost' : 'tertiary'}
            renderIcon={done ? CheckmarkFilled : undefined}
            onClick={() => setMilestone(id, !done)}
          >
            {done ? 'Done' : label}
          </Button>
          {note && <p className="cds--type-helper-text-01 pd-block__body" style={{ marginTop: '0.5rem' }}>{note}</p>}
        </Column>
      </Grid>
    </section>
  )
}

function BlockView({ block, routeKey }: { block: Block; routeKey: string }) {
  const p = useProgress()

  switch (block.type) {
    case 'prose':
      return (
        <section className="pd-section">
          <Grid><Column lg={10} md={8} sm={4}>
            {block.heading && <h2 className="cds--type-heading-03 pd-block__heading">{block.heading}</h2>}
            <p className="cds--type-body-02 pd-block__body">{block.body}</p>
            {block.bullets && (
              <UnorderedList className="pd-bullets">
                {block.bullets.map((b) => <ListItem key={b}>{b}</ListItem>)}
              </UnorderedList>
            )}
          </Column></Grid>
        </section>
      )

    case 'checklist':
      return (
        <section className="pd-section">
          <Grid><Column lg={10} md={8} sm={4}>
            <h2 className="cds--type-heading-03 pd-block__heading">{block.heading}</h2>
            {block.items.map((item) => (
              <div key={item.id} className="pd-check">
                <Checkbox id={`chk-${item.id}`} labelText={item.label} checked={!!p.checks[item.id]} onChange={() => toggleCheck(item.id)} />
                {item.hint && <p className="cds--type-helper-text-01 pd-check__hint">{item.hint}</p>}
              </div>
            ))}
          </Column></Grid>
        </section>
      )

    case 'sentence':
      return (
        <section className="pd-section">
          <Grid><Column lg={10} md={8} sm={4}>
            <Tile className="pd-prompt">
              <TextInput
                id="pd-sentence-input"
                labelText="Your sentence"
                placeholder="I want to see if AI can help me with ___"
                value={p.sentence}
                onChange={(e) => setProgress({ sentence: e.target.value })}
                helperText="Saved in your browser. It follows you to the Playbook and Prompts as your compass."
              />
            </Tile>
          </Column></Grid>
        </section>
      )

    case 'agenda':
      return (
        <section className="pd-section">
          <Grid><Column lg={10} md={8} sm={4}>
            <h2 className="cds--type-heading-03 pd-block__heading">Afternoon at a glance</h2>
            <Tile>
              {config.agenda.map((a) => (
                <div key={a.time} className="pd-agenda-row">
                  <span className="cds--type-heading-compact-01 pd-agenda-row__time">{a.time}</span>
                  <span className="cds--type-body-01 pd-agenda-row__label">{a.label}</span>
                </div>
              ))}
            </Tile>
          </Column></Grid>
        </section>
      )

    case 'callout':
      return (
        <section className="pd-section pd-section--tight">
          <Grid><Column lg={10} md={8} sm={4}>
            <InlineNotification kind={block.kind ?? 'info'} lowContrast hideCloseButton title={block.title} subtitle={block.body} />
          </Column></Grid>
        </section>
      )

    case 'milestone':
      return <MilestoneButton id={block.id} label={block.label} note={block.note} />

    case 'steps':
      return (
        <section className="pd-section">
          <Grid>
            {block.items.map((step, i) => {
              const sid = `${routeKey}:step:${i}`
              return (
                <Column key={step.title} lg={16} md={8} sm={4}>
                  <Tile className="pd-step">
                    <span className="pd-step__num" aria-hidden="true">{i + 1}</span>
                    <div className="pd-step__body">
                      <div className="pd-step__head">
                        <h2 className="cds--type-heading-03">{step.title}</h2>
                        {step.time && <Tag type="cool-gray" size="sm">{step.time}</Tag>}
                      </div>
                      {step.body && <p className="cds--type-body-01 pd-block__body">{step.body}</p>}
                      {step.code && (
                        <>
                          <CodeSnippet type="multi" wrapText feedback="Copied!" onClick={() => markCopied(sid)}>{step.code}</CodeSnippet>
                          <CopiedTag id={sid} />
                        </>
                      )}
                      {step.fillIn && (
                        <p className="cds--type-helper-text-01 pd-step__fillin">✎ {step.fillIn}</p>
                      )}
                      {step.output && <p className="cds--type-helper-text-01 pd-step__output">✓ Expected: {step.output}</p>}
                      {step.ifBroken && (
                        <details className="pd-step__broken">
                          <summary className="cds--type-helper-text-01">Didn’t work?</summary>
                          <p className="cds--type-body-01">{step.ifBroken}</p>
                        </details>
                      )}
                    </div>
                  </Tile>
                </Column>
              )
            })}
          </Grid>
        </section>
      )

    case 'prompt': {
      const pid = `prompt:${block.id}`
      return (
        <section className="pd-section pd-section--tight">
          <Grid><Column lg={10} md={8} sm={4}>
            <Tile className="pd-prompt">
              <div className="pd-step__head">
                <h2 className="cds--type-heading-03">{block.title}</h2>
                <CopiedTag id={pid} />
              </div>
              <p className="cds--type-body-01 pd-block__body">{block.description}</p>
              <CodeSnippet
                type="multi"
                wrapText
                feedback="Copied!"
                onClick={() => { markCopied(pid); setMilestone('prompts') }}
              >
                {block.prompt}
              </CodeSnippet>
            </Tile>
          </Column></Grid>
        </section>
      )
    }

    case 'tagnote':
      return (
        <section className="pd-section pd-section--tight">
          <Grid><Column lg={10} md={8} sm={4}>
            <Tag type="purple" size="sm">{block.tag}</Tag>
            <p className="cds--type-body-02 pd-block__body pd-tagnote">{block.text}</p>
          </Column></Grid>
        </section>
      )

    case 'accordion':
      return (
        <section className="pd-section">
          <Grid><Column lg={10} md={8} sm={4}>
            {block.heading && <h2 className="cds--type-heading-03 pd-block__heading">{block.heading}</h2>}
            <Accordion>
              {block.items.map((it) => (
                <AccordionItem key={it.title} title={it.title}>
                  <p className="cds--type-body-01">{it.body}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </Column></Grid>
        </section>
      )

    case 'embed':
      return (
        <section className="pd-section">
          <Grid><Column lg={10} md={8} sm={4}>
            <Tile className="pd-embed">
              {block.heading && <h2 className="cds--type-heading-03">{block.heading}</h2>}
              <p className="cds--type-body-01 pd-block__body">{block.note}</p>
              <CtaButton href={block.href} cta={block.cta} />
            </Tile>
          </Column></Grid>
        </section>
      )

    case 'cardgrid': {
      const span = block.columns === 3 ? { lg: 5, md: 4, sm: 4 } : { lg: 8, md: 4, sm: 4 }
      return (
        <section className="pd-section">
          <Grid>
            {block.items.map((item) => (
              <Column key={item.title} lg={span.lg} md={span.md} sm={span.sm}>
                <Tile className="pd-card pd-card--info">
                  {item.eyebrow && <Tag type="blue" size="sm" className="pd-card__tag">{item.eyebrow}</Tag>}
                  <h2 className="cds--type-heading-03 pd-card__title">{item.title}</h2>
                  <p className="cds--type-body-01 pd-card__desc">{item.description}</p>
                  {item.bullets && (
                    <UnorderedList className="pd-bullets">
                      {item.bullets.map((b) => <ListItem key={b}>{b}</ListItem>)}
                    </UnorderedList>
                  )}
                  {item.href && item.cta && <CtaButton href={item.href} cta={item.cta} />}
                </Tile>
              </Column>
            ))}
          </Grid>
        </section>
      )
    }

    default:
      return null
  }
}

export default function PageRenderer({ page, routeKey }: { page: StandardPage; routeKey: string }) {
  const p = useProgress()

  // Setup: auto-complete the 'setup' milestone once every checklist item is ticked.
  useEffect(() => {
    if (routeKey !== 'setup') return
    const ids = page.blocks.flatMap((b) => (b.type === 'checklist' ? b.items.map((i) => i.id) : []))
    const allDone = ids.length > 0 && ids.every((id) => p.checks[id])
    if (allDone && !p.milestones.setup) setMilestone('setup')
  }, [routeKey, page.blocks, p.checks, p.milestones.setup])

  return (
    <>
      <section className="pd-pagehead">
        <Grid>
          <Column lg={12} md={8} sm={4}>
            {page.eyebrow && <p className="cds--type-label-01 pd-pagehead__eyebrow">{page.eyebrow}</p>}
            <h1 className="cds--type-fluid-heading-05 pd-pagehead__title">{page.title}</h1>
            {page.subtitle && <p className="cds--type-body-02 pd-pagehead__sub">{page.subtitle}</p>}
          </Column>
        </Grid>
      </section>
      {page.pinnedSentence && <SentenceBanner />}
      {page.blocks.map((block, idx) => (
        <BlockView key={idx} block={block} routeKey={routeKey} />
      ))}
    </>
  )
}
