import { test, expect, type ConsoleMessage } from '@playwright/test'

const routes = [
  { route: '', label: 'Home' },
  { route: 'setup', label: 'Setup' },
  { route: 'playbook', label: 'Playbook' },
  { route: 'prompts', label: 'Prompts' },
  { route: 'gallery', label: 'Gallery' },
  { route: 'next', label: 'Next steps' },
  { route: 'feedback', label: 'Feedback' },
]

// Benign console noise we don't want to fail the suite on.
const IGNORE = [/favicon/i, /React DevTools/i]

function attachConsoleGuard(page: import('@playwright/test').Page) {
  const errors: string[] = []
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error' && !IGNORE.some((re) => re.test(msg.text()))) errors.push(msg.text())
  })
  page.on('pageerror', (err) => errors.push(String(err)))
  return errors
}

for (const { route, label } of routes) {
  test(`functional — #/${route} loads cleanly with an h1 and no console errors`, async ({ page }) => {
    const errors = attachConsoleGuard(page)
    await page.goto(`/#/${route}`)
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h1')).toBeVisible()
    expect(errors, errors.join('\n')).toEqual([])
  })

  test(`functional — #/${route} marks "${label}" as the current nav item`, async ({ page }) => {
    await page.goto(`/#/${route}`)
    const current = page.locator('[aria-current="true"]')
    await expect(current).toHaveText(label)
  })
}

test('functional — deep-link + reload lands on the right page', async ({ page }) => {
  await page.goto('/#/prompts')
  await page.reload()
  await expect(page.locator('[aria-current="true"]')).toHaveText('Prompts')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ready-to-run prompts')
})

test('functional — unknown route falls back to home', async ({ page }) => {
  await page.goto('/#/does-not-exist')
  await page.waitForLoadState('networkidle')
  // Home hero heading
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Patterns Denver 2026')
})

test('functional — Prompts page exposes copy controls (CodeSnippet)', async ({ page }) => {
  await page.goto('/#/prompts')
  await page.waitForLoadState('networkidle')
  const copyButtons = page.getByRole('button', { name: /copy/i })
  expect(await copyButtons.count()).toBeGreaterThan(0)
})

test('functional — all external links open safely (target=_blank + rel=noopener)', async ({ page }) => {
  for (const { route } of routes) {
    await page.goto(`/#/${route}`)
    await page.waitForLoadState('networkidle')
    const externals = page.locator('a[target="_blank"]')
    const n = await externals.count()
    for (let i = 0; i < n; i++) {
      const rel = (await externals.nth(i).getAttribute('rel')) ?? ''
      expect(rel, `external link on #/${route} missing rel=noopener`).toContain('noopener')
    }
  }
})
