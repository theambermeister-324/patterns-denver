# DataTable

## Purpose
Displays structured tabular data for comparison and analysis. Unlike IndexTable, DataTable is for read-only or summary data — not for selecting and acting on resources.

## When to use
- Displaying financial summaries, analytics breakdowns, comparison tables
- When the data is informational and users need to read across rows and columns
- When there's no concept of "selecting" a row and performing an action on it
- Reports, pricing tables, specification comparisons

## When NOT to use
- For lists of resources users need to select, open, or act on → use IndexTable
- For a list where each row navigates to a detail page → use IndexTable or ResourceList
- For fewer than 3 columns with no numeric comparison value → a simple list or Card sections are cleaner

## Anatomy
- **Column headers** — label row at top; can be sortable
- **Rows** — data rows; alternating row striping optional
- **Totals row** — optional summary row at the bottom
- **Column content types** — `'text'` | `'numeric'` — numerics right-align by default

## Key props / variants
- `columnContentTypes` — array matching columns: `'text'` or `'numeric'`
- `headings` — column header labels
- `rows` — 2D array of cell values (strings, numbers, or React nodes)
- `totals` — array for a summary row (same length as headings)
- `totalsName` — `{ singular, plural }` for the totals row label
- `sortable` — array of booleans matching columns
- `defaultSortDirection` — `'ascending'` | `'descending'`
- `initialSortColumnIndex` — which column to sort by on initial render
- `onSort` — sort callback
- `footerContent` — content below the table (pagination, notes)
- `stickyHeader` — fixes the header row on scroll
- `increasedTableDensity` — tighter row height for dense data

## Common scenarios
- **Revenue by product**: DataTable with product name (text), units sold (numeric), revenue (numeric), % of total (numeric) + totals row
- **Plan comparison**: DataTable with feature names (text) + columns for each plan tier (text or checkmarks)
- **Tax rates table**: Region (text), rate (numeric), applied-to (text) — read-only reference table
- **Shipping rates**: Weight range (text), carrier (text), rate (numeric) — simple lookup table

## Accessibility notes
- `columnContentTypes` affects alignment but also screen reader announcements — set it accurately (`'numeric'` for numbers, `'text'` for everything else)
- Sortable column headers are `<button>` elements — they receive focus and respond to keyboard events automatically
- For very wide tables that scroll horizontally, ensure the table is inside a scrollable container with `overflow-x: auto`

## Rework warnings
- Custom HTML `<table>` for analytics/summary data → DataTable provides sorting, totals, and accessibility handling
- Using IndexTable for a comparison table where rows aren't selectable → DataTable is the right fit
- Building a pricing comparison grid with divs → DataTable with text content types handles this cleanly

## Doc URL
https://polaris.shopify.com/components/tables/data-table
