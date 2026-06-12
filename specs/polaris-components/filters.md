# Filters

## Purpose
A standardized filter and search control for lists and tables. Lets merchants narrow down a resource list by one or more criteria.

## When to use
- Above an IndexTable or ResourceList when the list has more than ~10 items and filtering is expected
- When users need to narrow by multiple dimensions (status, date range, tag, etc.)
- When a persistent search bar is needed for a list

## When NOT to use
- For page-level search (across the whole admin) → use the global search
- For a single toggle (show/hide archived) → use a simple Select or segmented ButtonGroup
- For filtering fewer than ~10 static items → inline controls are simpler

## Anatomy
- **Search field** — free-text search input (optional but common)
- **Filter buttons** — each filter dimension appears as a button that opens a popover with filter options
- **Applied filter tags** — chips showing active filters with a remove (×) button each
- **"Clear all" action** — removes all active filters at once

## Key props / variants
- `filters` — array of filter definitions: `{ key, label, filter: <Component> }` — the `filter` value is the popover content (a ChoiceList, DatePicker, RangeSlider, etc.)
- `appliedFilters` — array of `{ key, label, onRemove }` — the active filter chips
- `onQueryChange` — search field change handler
- `onQueryClear` — clears the search query
- `queryValue` — controlled search input value
- `queryPlaceholder` — search field placeholder text
- `onClearAll` — fires when user clicks "Clear all"
- `hideFilters` — hides filter buttons (search-only mode)
- `hideQueryField` — hides search (filters-only mode)
- `loading` — shows loading state on the search field

## Common scenarios
- **Orders list filters**: Filter by status (ChoiceList: Open, Archived, Cancelled), payment status, fulfillment status + search by order number/customer
- **Product list filters**: Filter by status (Active, Draft, Archived), vendor, type, tag + search by product title
- **Customer segments**: Filter by spend amount (RangeSlider), location (ChoiceList), email subscribed (Checkbox)
- **Search-only list**: `hideFilters` + `queryPlaceholder="Search apps"` for a simple list search

## Accessibility notes
- Each filter popover must be keyboard accessible — Polaris handles this, but custom filter content inside the popover must also be keyboard navigable
- Applied filter tags (chips) have a remove button — ensure the `label` in `appliedFilters` is descriptive: "Status: Open" not just "Open"

## Rework warnings
- Custom dropdown menus for filtering above a table → use Filters
- Multiple Select components above a list for filtering → consolidate into Filters with filter definitions
- Filter state managed without `appliedFilters` chips → users can't see what's active or clear individual filters

## Doc URL
https://polaris.shopify.com/components/selection-and-input/filters
