# IndexTable

## Purpose
A full-featured table for browsing, selecting, and taking bulk actions on a list of resources (orders, products, customers, etc.).

## When to use
- Displaying a list of resources where users need to select one or more and act on them
- When bulk actions (delete, archive, export) are a primary need
- When rows have a consistent set of columns
- When the list needs sorting by column

## When NOT to use
- For non-resource data that doesn't have a "select and act on" pattern — use DataTable instead
- For a simple display of summary data — use DataTable
- For a short list of 5 or fewer items where selection isn't needed — consider a simple stack of Cards

## Anatomy
- **Checkbox column** — bulk selection (per row + select all)
- **Column headers** — sortable or static
- **Rows** — each row is a resource item; the first column is typically a link to the detail page
- **Bulk action toolbar** — appears when items are selected; shows bulk action buttons
- **Pagination** — footer pagination for large lists

## Key props / variants
- `resourceName` — `{ singular, plural }` used in accessibility labels and bulk action messaging
- `itemCount` — total item count (used for select-all messaging)
- `selectedItemsCount` — `'All'` or a number
- `onSelectionChange` — callback for selection changes
- `headings` — column definitions array
- `sortable` — array of booleans matching headings
- `onSort` — sort callback with column index and direction
- `loading` — shows skeleton rows
- `hasMoreItems` — indicates more items exist beyond current page (affects select-all messaging)
- `bulkActions` — actions shown in the bulk action toolbar when items are selected
- `promotedBulkActions` — bulk actions always visible (not in overflow menu)

## Common scenarios
- **Orders list**: IndexTable with columns for order number, customer, date, status (Badge), total — clicking a row navigates to order detail
- **Products list**: IndexTable with product title (with thumbnail), status, inventory, type — bulk archive/delete
- **Customer list**: IndexTable with name, email, location, order count, spend — bulk export
- **Draft orders**: IndexTable with smaller column set + bulk "Send invoice" promoted bulk action

## Accessibility notes
- Always provide `resourceName.singular` and `resourceName.plural` — these are used in screen reader announcements for selection state
- Row actions (edit, delete on a single row) should be in the row's final column as a `ButtonGroup`, not as clickable row backgrounds

## Rework warnings
- Custom HTML table with checkboxes built from scratch → use IndexTable
- Mapping resources into a list of Cards with selection state → if you need bulk actions, this is IndexTable territory
- Custom bulk action toolbar → IndexTable handles this; wire up `bulkActions` prop instead

## Doc URL
https://polaris.shopify.com/components/tables/index-table
