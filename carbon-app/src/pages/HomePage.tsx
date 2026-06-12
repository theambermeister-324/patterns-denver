import { Grid, Column, Tile, ClickableTile, Tag, InlineNotification } from '@carbon/react'
import { Play, Chat, Apps, ListChecked, ArrowRight } from '@carbon/icons-react'
import { hero, playCallout, facilitators, cards, type CardItem, type Phase } from '../content'

const ICONS = { play: Play, chat: Chat, apps: Apps, checklist: ListChecked, arrow: ArrowRight } as const

// Phase → Carbon Tag colour. Carbon's token palette carries the meaning.
const PHASE_TAG: Record<Phase, 'cool-gray' | 'blue' | 'green'> = {
  before: 'cool-gray',
  during: 'blue',
  after: 'green',
}

function NavCard({ card }: { card: CardItem }) {
  const Icon = ICONS[card.icon]
  return (
    <ClickableTile href={`#/${card.route}`} className="pd-card">
      <Icon size={24} className="pd-card__icon" />
      <Tag type={PHASE_TAG[card.phase]} size="sm" className="pd-card__tag">
        {card.phaseLabel}
      </Tag>
      <h3 className="cds--type-heading-03 pd-card__title">
        {card.title} <ArrowRight size={16} />
      </h3>
      <p className="cds--type-body-01 pd-card__desc">{card.description}</p>
    </ClickableTile>
  )
}

export default function HomePage() {
  const featured = cards.filter((c) => c.featured)
  const secondary = cards.filter((c) => !c.featured)

  return (
    <>
      {/* Hero — Carbon has no hero component, so this is grid + type + brand token */}
      <section className="pd-hero">
        <Grid>
          <Column lg={10} md={6} sm={4}>
            <p className="cds--type-heading-compact-01 pd-hero__eyebrow">{hero.eyebrow}</p>
            <h1 className="cds--type-fluid-heading-05 pd-hero__title">{hero.title}</h1>
            <p className="cds--type-body-02 pd-hero__sub">{hero.subtitle}</p>
            <p className="cds--type-label-01 pd-hero__presenter">
              Presented by <strong>{hero.presenter}</strong>
            </p>
          </Column>
        </Grid>
      </section>

      {/* "It's to play" callout */}
      <section className="pd-section pd-section--tight">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <InlineNotification
              kind="info"
              lowContrast
              hideCloseButton
              title={playCallout.title}
              subtitle={playCallout.subtitle}
              className="pd-callout"
            />
          </Column>
        </Grid>
      </section>

      {/* Facilitators */}
      <section className="pd-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <p className="cds--type-heading-compact-01 pd-label">Facilitators</p>
          </Column>
          {facilitators.map((f) => (
            <Column key={f.name} lg={4} md={4} sm={4}>
              <Tile className="pd-facilitator">
                <span className="pd-avatar" aria-hidden="true">
                  {f.initials}
                </span>
                <span>
                  <span className="cds--type-heading-compact-02 pd-facilitator__name">{f.name}</span>
                  <span className="cds--type-body-01 pd-facilitator__org">{f.org}</span>
                </span>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Navigation cards */}
      <section className="pd-section">
        <Grid>
          {featured.map((card) => (
            <Column key={card.title} lg={8} md={8} sm={4}>
              <NavCard card={card} />
            </Column>
          ))}
          {secondary.map((card, i) => (
            <Column key={card.title} lg={i === 0 ? 8 : 4} md={i === 2 ? 8 : 4} sm={4}>
              <NavCard card={card} />
            </Column>
          ))}
        </Grid>
      </section>
    </>
  )
}
