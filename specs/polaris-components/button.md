# Button / ButtonGroup

## Purpose
Triggers an action or navigation. ButtonGroup arranges multiple related buttons with consistent spacing and grouping behavior.

## When to use
- Any user-initiated action: saving, deleting, navigating, submitting
- ButtonGroup when two or more related actions appear together (Save + Cancel, Edit + Delete)
- Icon-only button when space is constrained and the icon is universally understood (with a tooltip)

## When NOT to use
- For navigation that looks like a link in body text → use a plain text link
- As the primary page action → wire it to Page's `primaryAction` prop instead of rendering a standalone Button
- For toggle states → use a Checkbox or ToggleButton
- More than one primary Button on a screen — there should be one clear primary action per context

## Anatomy
- **Label** — the action text (required; even icon-only buttons need an `accessibilityLabel`)
- **Icon** — optional leading or trailing icon
- **Loading indicator** — spinner state when async action is in progress
- **Disclosure** — trailing chevron indicating a dropdown

## Key props / variants
- `variant` — `'plain'` | `'basic'` (default) | `'primary'` | `'critical'` | `'tertiary'`
- `size` — `'micro'` | `'slim'` | `'medium'` (default) | `'large'`
- `icon` — Icon component or icon source
- `loading` — shows spinner, disables button
- `disabled` — prevents interaction
- `destructive` — red styling, for irreversible actions (usually paired with `variant="critical"`)
- `url` — renders as an `<a>` instead of `<button>`
- `external` — opens in new tab (only with `url`)
- `disclosure` — `true` | `'up'` | `'down'` | `'select'` — trailing chevron
- `accessibilityLabel` — required for icon-only buttons

### ButtonGroup props
- `segmented` — renders buttons as a connected segment group
- `gap` — `'tight'` | `'loose'` | `'extraTight'`
- `fullWidth` — each button takes equal width

## Common scenarios
- **Form actions**: `<ButtonGroup><Button variant="primary">Save</Button><Button>Cancel</Button></ButtonGroup>`
- **Destructive confirmation**: `variant="critical"` + `destructive` button in Modal footer
- **Toolbar actions**: `ButtonGroup segmented` for view-switchers (List / Grid)
- **Page header**: Primary Button wired via Page's `primaryAction`, not rendered standalone
- **Icon button in table row**: `icon={EditIcon}` + `accessibilityLabel="Edit order"` + `variant="plain"`

## Accessibility notes
- Every button must have visible text or an `accessibilityLabel` — never use an icon-only button without one
- `loading` state should always also set `disabled` — otherwise a second click can fire while the first is processing
- Don't use color alone to distinguish primary from secondary — rely on `variant` which also changes shape/weight

## Rework warnings
- Custom `<div onClick>` acting as a button → use Button (fixes keyboard nav and screen reader announcement)
- Multiple `variant="primary"` buttons on the same screen → only one primary action per context
- Disabled button with no explanation → consider showing the reason the action is unavailable

## Doc URL
https://polaris.shopify.com/components/actions/button
