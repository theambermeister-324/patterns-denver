# Modal

## Purpose
A dialog overlay for tasks or confirmations that are related to the current page but require focused attention before continuing.

## When to use
- Confirming a destructive action (delete, cancel, deactivate) — "Are you sure?"
- A short focused task that doesn't warrant navigating away (e.g., "Add a note", "Set a discount")
- Displaying supplemental information that doesn't need to persist as a page (e.g., tracking details, a preview)
- Collecting a small amount of input (1–3 fields) before an action

## When NOT to use
- For complex, multi-step flows — use a full page or a multi-step page flow instead
- When the modal would contain another modal — never nest modals
- For persistent information the user needs to refer back to — use a page or a sidebar
- As an error handler — use Banner on the relevant page instead
- For forms longer than ~5 fields — the modal will scroll and feel wrong; use a page

## Anatomy
- **Header** — title + optional close button
- **Body** — scrollable content area
- **Footer** — primary action + secondary action (and optional destructive action for confirmations)
- **Section** — `Modal.Section` divides body into padded sections

## Key props / variants
- `open` — controlled visibility
- `onClose` — required; fires when user presses Escape, clicks outside, or clicks X
- `title` — renders as modal heading (required for accessibility)
- `primaryAction` — `{ content, onAction, loading, disabled, destructive }`
- `secondaryActions` — array (typically just "Cancel")
- `size` — `'small'` | `'medium'` (default) | `'large'` | `'fullScreen'`
- `loading` — shows skeleton content in body
- `instant` — disables enter/exit animation (use in testing)
- `sectioned` — auto-wraps body in a `Modal.Section`

## Common scenarios
- **Delete confirmation**: small Modal, destructive primaryAction ("Delete"), secondary "Cancel"
- **Add note / tag**: medium Modal with a TextField, "Save" primary action
- **Bulk action confirmation**: "You're about to archive 12 orders. This can be undone." + "Archive orders" / "Cancel"
- **Preview**: large Modal showing an email preview or document preview — no footer actions, just close

## Accessibility notes
- `title` is required — it's the accessible label for the dialog (`aria-labelledby`)
- Focus is trapped inside the modal while it's open; confirm that Tab cycles through all interactive elements
- `onClose` must always be wired — users expect Escape to close a modal

## Rework warnings
- Custom overlay div with a centered card and a dimmed background → this is Modal
- Confirmation dialogs built with `window.confirm()` → replace with Modal for accessible, styled confirmations
- Inline "expanded" sections that grow to cover the page → likely should be a Modal
- Modals triggered by modals → rethink the flow; modals should not nest

## Doc URL
https://polaris.shopify.com/components/overlays/modal
