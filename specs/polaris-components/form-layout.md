# FormLayout

## Purpose
Arranges form fields into a consistent, readable layout — single column, two-column groups, or condensed groups — without requiring custom CSS grid work.

## When to use
- Any form with multiple fields that need spatial organization
- When two fields logically belong side by side (First name / Last name, City / Postal code)
- To group related fields with a title and optional help text

## When NOT to use
- For a single field in isolation — just render the field directly
- For non-form content layout — use Layout/Grid instead
- For complex multi-column page layouts — FormLayout is for field arrangement within a Card, not full-page structure

## Anatomy
- **FormLayout** — the outer wrapper; defaults to a single-column vertical stack
- **FormLayout.Group** — arranges child fields side by side (2–3 columns)
- **condensed** — tighter spacing variant for compact groups (e.g., a row of 3 small fields)

## Key props / variants
### FormLayout
- No major props — it's a layout container

### FormLayout.Group
- `condensed` — tighter spacing for 3+ small fields in a row
- `helpText` — supporting text shown below the group (applies to the group as a whole, not individual fields)
- `title` — optional group label

## Common scenarios
- **Billing address form**: FormLayout with TextField (Full name), FormLayout.Group for [Address line 1] [Apartment], TextField (City), FormLayout.Group for [State / Province] [Postal code] [Country]
- **Product pricing section**: FormLayout.Group for [Price] [Compare-at price], FormLayout.Group for [Cost per item] with helpText "Merchants won't see this"
- **Contact info**: FormLayout with [First name] [Last name] as a Group, then [Email], [Phone]
- **Tax settings**: FormLayout.Group condensed for [Country] [Region] [Tax rate %]

## Accessibility notes
- FormLayout does not render a `<form>` element — wrap it in a `<Form>` component or a native `<form>` tag
- Each field inside FormLayout must have its own `label` — FormLayout provides layout but not labeling
- Group `helpText` is rendered as a `<p>` — don't duplicate the same text in individual field `helpText`

## Rework warnings
- Custom CSS grid or flexbox to lay out form fields side by side → use FormLayout.Group
- Hardcoded widths on TextField components to make them appear narrower → use FormLayout.Group condensed
- Form fields stacked without any layout container → wrapping in FormLayout gives consistent spacing for free

## Doc URL
https://polaris.shopify.com/components/selection-and-input/form-layout
