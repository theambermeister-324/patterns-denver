# ResourceList

## Purpose
A list of resource items where each item has a consistent structure (media, title, metadata, actions). Less structured than IndexTable — optimized for scanning and quick action rather than column-by-column comparison.

## When to use
- Resources that benefit from visual scanning over tabular comparison (e.g., apps, staff accounts, custom content)
- When each item has a media element (avatar, thumbnail) as a key part of its identity
- When there are fewer columns to compare and the focus is on the item's identity + 1–2 quick actions
- Shorter lists (< 50 items) where pagination complexity isn't needed

## When NOT to use
- When users need to compare resources column by column → use IndexTable or DataTable
- When bulk selection is a primary need → use IndexTable (ResourceList bulk actions are more limited)
- For non-resource content (settings, form fields) → use a simple stack or FormLayout

## Anatomy
- **ResourceItem** — the individual list item; provides consistent layout for media, title, subtitle, and actions
- **Media** — avatar, thumbnail, or icon at the start of the item
- **Title / subtitle** — primary and secondary text
- **Shortcut actions** — 1–2 quick actions (buttons or icon buttons) on the item
- **Filter control** — optional search/filter bar above the list
- **Bulk actions** — limited bulk action support (less capable than IndexTable)

## Key props / variants
- `items` — array of data objects
- `renderItem` — function returning a `ResourceItem` per data object
- `selectedItems` — controlled selection state
- `onSelectionChange` — callback
- `filterControl` — optional Filters component for the list header
- `loading` — shows skeleton
- `totalItemsCount` / `showHeader` — controls the "X items" header display
- `resourceName` — `{ singular, plural }`

### ResourceItem props
- `id` — required
- `url` — makes the item navigable (renders as `<a>`)
- `media` — Avatar, Thumbnail, or Icon component
- `name` — primary text (also used for accessibility)
- `shortcutActions` — array of `{ content, url, onAction }` — renders as hover-revealed buttons

## Common scenarios
- **App list**: Each ResourceItem shows app icon, app name + description, and an "Uninstall" shortcut action
- **Staff accounts**: Each item shows Avatar with initials, staff name + email, "Edit permissions" action
- **Saved searches / segments**: List of named segments with a "Use" shortcut action
- **File manager**: Media thumbnails with filename + size, delete action

## Accessibility notes
- If `url` is provided, the entire item is a link — don't nest interactive elements inside (use `shortcutActions` instead, which render outside the link element)
- `name` prop is used as the accessible label for the item — make it descriptive

## Rework warnings
- Custom list of Cards with avatars/thumbnails + hover actions → this is ResourceList
- Mapping items into `<div>` rows with thumbnail + text + buttons → ResourceList with ResourceItem
- Using IndexTable when there's only one meaningful column and no bulk action need → ResourceList is simpler

## Doc URL
https://polaris.shopify.com/components/lists/resource-list
