# Page

## Purpose
The top-level wrapper for every admin page. Provides the page title, breadcrumbs, primary action, and secondary actions in a consistent header structure.

## When to use
- Every full page in the admin. There is almost no scenario where you build a page without Page.
- When you need a page title, breadcrumb trail, or page-level primary action (e.g., "Create order").
- When you need to group page-level secondary actions (e.g., export, duplicate) under a menu.

## When NOT to use
- Inside modals — Modal has its own header.
- For embedded components or partial views within a page.

## Anatomy
- **Title** — the page name (required)
- **Breadcrumbs** — back navigation (optional but expected on detail pages)
- **Primary action** — the one most important action on the page (e.g., Save, Create)
- **Secondary actions** — additional actions, rendered in a dropdown on mobile
- **Action groups** — grouped secondary actions with a disclosure button
- **Subtitle** — supporting text below the title (use sparingly)

## Key props / variants
- `title` — required string
- `primaryAction` — `{ content, onAction, loading, disabled }`
- `secondaryActions` — array of action objects
- `breadcrumbs` — array of `{ content, url }` objects
- `backAction` — single back link (simpler than breadcrumbs for one level up)
- `fullWidth` — removes max-width constraint (use for data-dense pages like reports)
- `narrowWidth` — constrains to narrower max-width (use for single-column forms)

## Common scenarios
- **List page** (e.g., Orders, Products): Page with title + "Create" primary action + filter/export secondary actions
- **Detail/edit page** (e.g., Order #1234): Page with title + breadcrumb back to list + "Save" primary action
- **Settings page**: Page with narrowWidth + title + no primary action (settings auto-save or have their own save per section)
- **New/create form**: Page with title ("Create product") + "Save" primary action + "Discard" secondary action
- **Report/analytics page**: Page with fullWidth + title + date range secondary action

## Accessibility notes
- The `title` prop renders as an `<h1>` — do not add another `<h1>` anywhere else on the page.
- `primaryAction` with `loading: true` should also set `disabled: true` to prevent double-submission.

## Rework warnings
- Custom back buttons or custom page headers → use Page's `backAction` or `breadcrumbs` instead
- Hardcoded `<h1>` tags on a page that already uses Page → removes the semantic heading hierarchy
- Page actions placed inside Card footers → these belong in the Page header as `primaryAction` or `secondaryActions`

## Doc URL
https://polaris.shopify.com/components/layout-and-structure/page
