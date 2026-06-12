# Card

## Purpose
A surface for grouping related content and actions. The primary container for content within a page.

## When to use
- Grouping a distinct section of content on a page (e.g., "Shipping address", "Payment method")
- Separating content into scannable chunks
- When content has a clear title and a bounded scope

## When NOT to use
- As a list item container for repeating items — use ResourceList or IndexTable instead
- For full-page layout — use Layout/Grid to arrange Cards
- When content is a single sentence or status indicator — use Banner or Badge instead
- Do not nest Cards inside Cards

## Anatomy
- **Title** — section label (optional but recommended)
- **Body** — the content area (text, form fields, tables, etc.)
- **Footer** — card-level actions, typically a text link or secondary button (not primary actions — those belong on Page)
- **Sections** — multiple `Card.Section` components divide a card into sub-sections with their own titles

## Key props / variants
- `title` — section heading rendered as `<h2>`
- `sectioned` — auto-wraps children in a `Card.Section` (shorthand for simple cards)
- `actions` — header-level action links (e.g., "Edit", "View all")
- `primaryFooterAction` / `secondaryFooterAction` — footer buttons (use sparingly; prefer Page-level actions for primary page actions)
- `subdued` — reduced visual weight, for secondary/supporting content

## Common scenarios
- **Settings sections**: Each setting group (notifications, billing, shipping) in its own Card with a title
- **Order summary**: Card with sections for line items, subtotal, taxes, total
- **Product details**: Card with title "Product organization" containing category, tags, vendor fields
- **Empty section**: Card with EmptyState inside when a section has no content yet
- **Media card**: Card containing an image or video with supporting text alongside

## Accessibility notes
- `title` renders as `<h2>` by default. If you need a different heading level, use `titleHidden` and provide your own heading.
- Avoid putting interactive elements in card `actions` that duplicate footer actions — creates confusion for screen readers.

## Rework warnings
- Custom `<div>` containers with border + border-radius + padding styling → this is just a Card
- Repeating Card as a list item for each resource → use ResourceList or IndexTable instead
- Putting a primary page action (Save, Create) in a Card footer → belongs on Page as `primaryAction`

## Doc URL
https://polaris.shopify.com/components/layout-and-structure/card
