import type { ReactNode } from 'react'
import {
  Theme,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
  Grid,
  Column,
} from '@carbon/react'
import { pages, footerText } from './content'

/**
 * Shared UI Shell: Carbon Header (nav driven by the `pages` array) + a main
 * region + footer. Pages render as children. `active` is the current hash route.
 */
export default function PageShell({
  active,
  children,
}: {
  active: string
  children: ReactNode
}) {
  return (
    <Theme theme="white">
      <Header aria-label="Patterns Denver 2026">
        <SkipToContent />
        <HeaderName href="#/" prefix="">
          Patterns Denver
        </HeaderName>
        <HeaderNavigation aria-label="Patterns Denver 2026">
          {pages.map((p) => (
            <HeaderMenuItem key={p.route} href={`#/${p.route}`} isActive={active === p.route}>
              {p.label}
            </HeaderMenuItem>
          ))}
        </HeaderNavigation>
      </Header>

      <main className="pd-main" id="main-content">
        {children}
      </main>

      <footer className="pd-footer">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <p className="cds--type-label-01">{footerText}</p>
          </Column>
        </Grid>
      </footer>
    </Theme>
  )
}
