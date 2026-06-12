import { useState, type ReactNode } from 'react'
import {
  Theme,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
  Grid,
  Column,
  Button,
  Modal,
  UnorderedList,
  ListItem,
} from '@carbon/react'
import { Help, ArrowUpRight } from '@carbon/icons-react'
import { pages, footerText } from './content'
import { config } from './config'
import { useProgress, milestoneProgress, MILESTONES } from './store'

// Pages that show the live progress strip (the "day of" flow).
const FLOW = new Set(['setup', 'playbook', 'prompts', 'readiness', 'gallery'])

function ProgressStrip() {
  const p = useProgress()
  const { done, total } = milestoneProgress(p)
  return (
    <div className="pd-progress" role="status" aria-label={`Progress: ${done} of ${total} milestones complete`}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="pd-progress__row">
            <span className="cds--type-label-01 pd-progress__label">{done} of {total} done</span>
            <div className="pd-progress__track">
              <div className="pd-progress__fill" style={{ width: `${(done / total) * 100}%` }} />
            </div>
            <div className="pd-progress__dots">
              {MILESTONES.map((m) => (
                <span key={m.id} className={`pd-progress__dot${p.milestones[m.id] ? ' is-done' : ''}`} title={m.label} aria-hidden="true" />
              ))}
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  )
}

export default function PageShell({ active, children }: { active: string; children: ReactNode }) {
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <Theme theme="white">
      <Header aria-label="Patterns Denver 2026">
        <SkipToContent />
        <HeaderName href="#/" prefix="">Patterns Denver</HeaderName>
        <HeaderNavigation aria-label="Patterns Denver 2026">
          {pages.map((pg) => (
            <HeaderMenuItem key={pg.route} href={`#/${pg.route}`} isActive={active === pg.route}>
              {pg.label}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>
      </Header>

      {/* tabIndex=-1 lets us move focus here on route change for keyboard/SR users */}
      <main className="pd-main" id="main-content" tabIndex={-1}>
        {FLOW.has(active) && <ProgressStrip />}
        {children}
      </main>

      <footer className="pd-footer">
        <Grid><Column lg={16} md={8} sm={4}>
          <p className="cds--type-label-01">{footerText}</p>
        </Column></Grid>
      </footer>

      {/* Persistent "Stuck?" affordance — on every page, never a dead end. */}
      <Button
        className="pd-help-fab"
        kind="primary"
        renderIcon={Help}
        onClick={() => setHelpOpen(true)}
      >
        Stuck?
      </Button>

      <Modal
        open={helpOpen}
        passiveModal
        modalHeading="Stuck? Here’s help"
        onRequestClose={() => setHelpOpen(false)}
      >
        <p className="cds--type-body-01" style={{ marginBottom: '1rem' }}>
          <strong>Raise your hand</strong> — {config.helpContact}.
        </p>
        <p className="cds--type-heading-compact-01" style={{ marginBottom: '0.5rem' }}>Quick fixes</p>
        <UnorderedList style={{ marginBottom: '1rem' }}>
          <ListItem><code>claude</code> not found → run the install line, then type <code>claude</code> inside the patterns-denver folder.</ListItem>
          <ListItem><code>/query</code> returns nothing → run <code>/ingest all</code> first.</ListItem>
          <ListItem>npm errors on install → raise a hand, a facilitator will come to you.</ListItem>
        </UnorderedList>
        <p className="cds--type-heading-compact-01" style={{ marginBottom: '0.5rem' }}>Laptop locked down?</p>
        <p className="cds--type-body-01" style={{ marginBottom: '0.75rem' }}>
          Run the whole workshop in the cloud — no local install needed.
        </p>
        <Button href={config.codespacesUrl} target="_blank" rel="noopener noreferrer" renderIcon={ArrowUpRight} kind="tertiary" size="sm">
          Open in GitHub Codespaces
        </Button>
      </Modal>
    </Theme>
  )
}
