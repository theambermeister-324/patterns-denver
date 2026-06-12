import {
  Grid,
  Column,
  Tile,
  Tag,
  Button,
  Checkbox,
  CodeSnippet,
  UnorderedList,
  ListItem,
  Accordion,
  AccordionItem,
} from '@carbon/react'
import { ArrowRight, ArrowUpRight } from '@carbon/icons-react'
import type { Block, StandardPage } from './content'

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

function BlockView({ block, idx }: { block: Block; idx: number }) {
  switch (block.type) {
    case 'prose':
      return (
        <section className="pd-section">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              {block.heading && <h2 className="cds--type-heading-03 pd-block__heading">{block.heading}</h2>}
              <p className="cds--type-body-02 pd-block__body">{block.body}</p>
              {block.bullets && (
                <UnorderedList className="pd-bullets">
                  {block.bullets.map((b) => (
                    <ListItem key={b}>{b}</ListItem>
                  ))}
                </UnorderedList>
              )}
            </Column>
          </Grid>
        </section>
      )

    case 'checklist':
      return (
        <section className="pd-section">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              <h2 className="cds--type-heading-03 pd-block__heading">{block.heading}</h2>
              {block.items.map((item, i) => (
                <div key={item.label} className="pd-check">
                  <Checkbox id={`chk-${idx}-${i}`} labelText={item.label} />
                  {item.hint && <p className="cds--type-helper-text-01 pd-check__hint">{item.hint}</p>}
                </div>
              ))}
            </Column>
          </Grid>
        </section>
      )

    case 'steps':
      return (
        <section className="pd-section">
          <Grid>
            {block.items.map((step, i) => (
              <Column key={step.title} lg={16} md={8} sm={4}>
                <Tile className="pd-step">
                  <span className="pd-step__num" aria-hidden="true">{i + 1}</span>
                  <div className="pd-step__body">
                    <h3 className="cds--type-heading-03">{step.title}</h3>
                    {step.body && <p className="cds--type-body-01 pd-block__body">{step.body}</p>}
                    {step.code && (
                      <CodeSnippet type="multi" wrapText feedback="Copied!">
                        {step.code}
                      </CodeSnippet>
                    )}
                    {step.output && <p className="cds--type-helper-text-01 pd-step__output">{step.output}</p>}
                  </div>
                </Tile>
              </Column>
            ))}
          </Grid>
        </section>
      )

    case 'prompt':
      return (
        <section className="pd-section pd-section--tight">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              <Tile className="pd-prompt">
                <h3 className="cds--type-heading-03">{block.title}</h3>
                <p className="cds--type-body-01 pd-block__body">{block.description}</p>
                <CodeSnippet type="multi" wrapText feedback="Copied!">{block.prompt}</CodeSnippet>
              </Tile>
            </Column>
          </Grid>
        </section>
      )

    case 'tagnote':
      return (
        <section className="pd-section pd-section--tight">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              <Tag type="purple" size="sm">{block.tag}</Tag>
              <p className="cds--type-body-02 pd-block__body pd-tagnote">{block.text}</p>
            </Column>
          </Grid>
        </section>
      )

    case 'accordion':
      return (
        <section className="pd-section">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              {block.heading && <h2 className="cds--type-heading-03 pd-block__heading">{block.heading}</h2>}
              <Accordion>
                {block.items.map((it) => (
                  <AccordionItem key={it.title} title={it.title}>
                    <p className="cds--type-body-01">{it.body}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </Column>
          </Grid>
        </section>
      )

    case 'embed':
      return (
        <section className="pd-section">
          <Grid>
            <Column lg={10} md={8} sm={4}>
              <Tile className="pd-embed">
                {block.heading && <h3 className="cds--type-heading-03">{block.heading}</h3>}
                <p className="cds--type-body-01 pd-block__body">{block.note}</p>
                <CtaButton href={block.href} cta={block.cta} />
              </Tile>
            </Column>
          </Grid>
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
                  <h3 className="cds--type-heading-03 pd-card__title">{item.title}</h3>
                  <p className="cds--type-body-01 pd-card__desc">{item.description}</p>
                  {item.bullets && (
                    <UnorderedList className="pd-bullets">
                      {item.bullets.map((b) => (
                        <ListItem key={b}>{b}</ListItem>
                      ))}
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

export default function PageRenderer({ page }: { page: StandardPage }) {
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
      {page.blocks.map((block, idx) => (
        <BlockView key={idx} block={block} idx={idx} />
      ))}
    </>
  )
}
