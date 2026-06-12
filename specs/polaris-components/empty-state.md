# EmptyState

## Purpose
A placeholder shown when a section or page has no content yet. Guides the merchant to take the first action that will populate the space.

## When to use
- A list or table that has zero items (first-time or filtered-to-zero state)
- A section of the admin the merchant hasn't set up yet
- Search results that return no matches
- When a feature requires setup before content appears

## When NOT to use
- For loading states → use Skeleton components instead
- For errors → use Banner
- For a page that is intentionally sparse (a settings page with toggles doesn't need EmptyState)
- As a catch-all for any "nothing here" moment — only use when there's a clear next action

## Anatomy
- **Image** — illustration (Polaris provides a default set; custom SVGs are common)
- **Heading** — what's missing ("No orders yet", "No products found")
- **Description** — why it's empty and what to do ("Add your first product to start selling")
- **Action** — primary CTA button to start the setup/creation flow
- **Secondary action** — a lower-stakes option (e.g., "Learn more", "Import")
- **Footer content** — additional supporting links or context (rare)

## Key props / variants
- `heading` — required; the "nothing here" label
- `image` — URL to illustration (Polaris provides standard ones for common states)
- `action` — `{ content, url, onAction }` — the primary next step
- `secondaryAction` — `{ content, url }` — optional secondary link
- `footerContent` — rendered below the actions (plain text or links)
- `fullWidth` — removes max-width for full-width sections

## Common scenarios
- **Empty orders list**: "No orders yet" + image + "Learn more about fulfillment" action
- **Search returns nothing**: "No results for 'blue widget'" + "Clear search" action
- **First product**: "Add your first product" + image + "Add product" primary action + "Import products" secondary action
- **No staff**: "Invite your team" + description about permissions + "Invite staff member" action
- **Feature not enabled**: "Enable reviews to start collecting feedback" + "Enable reviews" action

## Accessibility notes
- `heading` renders as an `<h2>` — don't add another heading inside EmptyState content
- The `action` button should describe the action, not just say "Get started" — "Add product" is better than "Get started"
- Images are decorative — provide `alt=""` or let Polaris handle it (it sets decorative alt by default)

## Rework warnings
- Custom "nothing here" states with a centered illustration and a button → this is EmptyState
- Showing an empty table with "No data" in a cell → replace with EmptyState inside the table's container
- Using a loading skeleton for zero-results states → Skeleton is for loading; EmptyState is for empty

## Doc URL
https://polaris.shopify.com/components/layout-and-structure/empty-state
