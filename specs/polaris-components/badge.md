# Badge

## Purpose
A small visual label that communicates the status or state of an item. Non-interactive — it describes, it doesn't act.

## When to use
- Showing the status of a resource (order status, fulfillment status, payment status)
- Labeling an item with a categorical attribute (plan tier, feature flag, content type)
- Highlighting a count or quantity in a compact space

## When NOT to use
- For interactive elements (filters, tags the user can remove) → use Tag instead
- For a prominent alert or message → use Banner
- As a progress indicator → use ProgressBar
- When the status needs more explanation than a word or two → use Banner or inline text

## Anatomy
- **Label** — 1–3 words describing the status
- **Tone** — color that communicates meaning (green = success, yellow = attention, red = critical, etc.)
- **Icon** — optional leading icon for additional context
- **Progress** — optional `progress` prop adds a partially-filled circle indicator inside the badge

## Key props / variants
- `tone` — `'success'` | `'attention'` | `'warning'` | `'critical'` | `'info'` | `'new'` | `'magic'` | (default = neutral)
- `progress` — `'incomplete'` | `'partiallyComplete'` | `'complete'` — shows a fill indicator
- `size` — `'small'` | `'medium'` (default) | `'large'`
- `icon` — leading icon component

## Common scenarios
- **Order status column**: `<Badge tone="success">Fulfilled</Badge>` / `<Badge tone="attention">Unfulfilled</Badge>`
- **Payment status**: `<Badge tone="success">Paid</Badge>` / `<Badge tone="critical">Refunded</Badge>`
- **Plan indicator**: `<Badge tone="new">Plus</Badge>` on a feature only available on higher plans
- **Fulfillment progress**: `<Badge progress="partiallyComplete" tone="attention">Partially fulfilled</Badge>`
- **Draft indicator**: `<Badge>Draft</Badge>` (neutral tone) on an unpublished resource

## Accessibility notes
- Badge is purely visual — the status text is read by screen readers as inline text. Ensure it's meaningful without color context.
- Never rely on tone alone to communicate status — the label text must convey the meaning independently.

## Rework warnings
- Colored `<span>` elements with border-radius used as status labels → this is Badge
- Pill-shaped divs with background colors → Badge
- Using a custom color system for statuses instead of Polaris tones → creates inconsistency and loses semantic meaning

## Doc URL
https://polaris.shopify.com/components/feedback-indicators/badge
