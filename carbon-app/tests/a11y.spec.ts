import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// All 7 hash routes ('' = home).
const routes = ['', 'setup', 'playbook', 'prompts', 'readiness', 'gallery', 'next', 'feedback']

for (const route of routes) {
  test(`a11y — #/${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(`/#/${route}`)
    await page.waitForLoadState('networkidle')

    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    // Surface a readable summary in the failure message.
    const summary = violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.length,
      help: v.help,
    }))
    expect(JSON.stringify(summary, null, 2)).toBe('[]')
  })
}
