# Layout / Grid

## Purpose
Arranges Cards and page sections into multi-column layouts. The primary tool for composing a full page from multiple content sections.

## When to use
- A page that has a main content area + a sidebar (e.g., product detail page: main form + "Organization" sidebar)
- A page with two equal-width sections side by side
- Any page where multiple Cards need to be arranged in a grid rather than a single vertical stack

## When NOT to use
- For arranging form fields within a Card → use FormLayout
- For a single-column page → no layout wrapper needed; just stack Cards vertically
- For inline element arrangement within a component (text + badge, icon + label) → use Bleed, InlineStack, or BlockStack

## Anatomy (Layout)
- **Layout** — outer container
- **Layout.Section** — a column section; two of these create a 2-column layout
- **Layout.Section variant="oneThird"** — takes 1/3 of the width (sidebar)
- **Layout.Section variant="oneHalf"** — takes 1/2 of the width
- **Layout.Section variant="fullWidth"** — spans the full width (for banners, full-width tables)
- **Layout.AnnotatedSection** — a section with a left-side title and description (used for settings pages)

## Anatomy (Grid — newer API)
- **Grid** — CSS grid-based layout container
- **Grid.Cell** — a cell with `columnSpan` props for responsive control at each breakpoint

## Key props / variants

### Layout.Section
- `variant` — `'oneThird'` | `'oneHalf'` | `'fullWidth'` (default is the remaining space)

### Layout.AnnotatedSection
- `title` — section label on the left
- `description` — supporting text below the title on the left

### Grid
- `columns` — `{ xs, sm, md, lg, xl }` — number of columns at each breakpoint
- `gap` — spacing between cells

### Grid.Cell
- `columnSpan` — `{ xs, sm, md, lg, xl }` — how many columns this cell spans at each breakpoint

## Common scenarios
- **Product edit page**: Layout with a main section (title, description, media) + `variant="oneThird"` sidebar (organization, pricing, inventory)
- **Settings page**: Layout.AnnotatedSection for each settings group (left: label + explanation, right: Card with controls)
- **Analytics overview**: Grid with 4 equal stat cards at desktop, 2 at tablet, 1 at mobile
- **Order detail**: Main section (line items, fulfillment) + oneThird sidebar (customer info, notes)

## Accessibility notes
- Layout/Grid creates visual columns but doesn't change document order — ensure the reading order (DOM order) is logical for screen readers, even before CSS is applied
- AnnotatedSection titles render as `<h2>` — consistent with the rest of the page heading hierarchy

## Rework warnings
- Custom CSS grid or flexbox at the page level for Card arrangement → use Layout or Grid
- Hardcoded percentage widths on Card containers → use Layout.Section variants
- A settings page with inline labels and controls → use Layout.AnnotatedSection for the standard settings layout

## Doc URL
https://polaris.shopify.com/components/layout-and-structure/layout
