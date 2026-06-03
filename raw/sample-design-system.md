# Meridian Design System — Component Reference (Sample)

*This is sample source material for the workshop. Replace it with your own design system docs, or use it as a starting point to explore what the AI surfaces.*

---

## Button

**Status:** Stable
**Version:** 2.1.0
**Owner:** Core UI team

### Variants
- Primary
- Secondary
- Destructive
- Ghost
- Link

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary \| secondary \| destructive \| ghost \| link` | `primary` | Visual style |
| `size` | `sm \| md \| lg` | `md` | Button size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading spinner, disables click |
| `iconLeft` | `ReactNode` | — | Icon before label |
| `iconRight` | `ReactNode` | — | Icon after label |
| `onClick` | `function` | — | Click handler |
| `type` | `button \| submit \| reset` | `button` | HTML button type |
| `fullWidth` | `boolean` | `false` | Expands to fill container |

### Usage
Use the primary button for the main action on a page. Use secondary for supporting actions. Only one primary button should appear per section.

Use ghost when the button needs to feel lighter — for example, inside a card or alongside a primary action where visual weight would compete.

Use the link variant when the action navigates rather than submits. Avoid using it inside forms.

### Accessibility
- Always provide a meaningful label. Avoid labels like "Click here" or "Submit."
- When `loading` is true, add `aria-busy="true"` and a visually-hidden status update.
- Icon-only buttons must include `aria-label`.
- The `disabled` prop removes the element from tab order. If a button is disabled for a reason the user needs to understand, consider using `aria-disabled` with a tooltip instead.

### When NOT to use
- Do not use a button to open an external link in a new tab without warning the user.
- Do not use a destructive button as a default action — it should always require a confirmation step.
- Do not use multiple primary buttons in the same view. If you find yourself doing this, revisit the information hierarchy.

### Design rationale
The ghost variant was added in v2.0 after research showed teams were using the secondary button in contexts where it still felt too heavy. Ghost communicates "optional" without using color.

---

## Modal

**Status:** Stable
**Version:** 1.4.0
**Owner:** Core UI team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | `false` | Controls visibility |
| `onClose` | `function` | — | Called when user closes modal |
| `title` | `string` | — | Modal heading (required for accessibility) |
| `size` | `sm \| md \| lg \| full` | `md` | Modal width |
| `closeOnOverlayClick` | `boolean` | `true` | Whether clicking outside closes |
| `preventClose` | `boolean` | `false` | Disables all close mechanisms |
| `footer` | `ReactNode` | — | Action buttons |

### Usage
Use modals for focused tasks that require user input or confirmation before continuing. Modals interrupt the current flow — use them deliberately.

Avoid stacking modals. If a modal action needs to open another dialog, use a different pattern (inline expansion, drawer, or a new page).

### Accessibility
*To be documented.*

### When NOT to use
- Do not use a modal for content that could live inline on the page.
- Do not use `preventClose` without giving users a clear path to exit. Trapping users is an accessibility violation.
- Do not use modals on mobile for complex forms — the viewport limitations make them frustrating. Use a full-screen sheet instead.

---

## FormField

**Status:** Beta
**Version:** 0.9.2
**Owner:** Forms working group

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label (required) |
| `hint` | `string` | — | Helper text below input |
| `error` | `string` | — | Error message, replaces hint |
| `required` | `boolean` | `false` | Marks field as required |
| `disabled` | `boolean` | `false` | Grays out field |
| `id` | `string` | — | Associates label with input |

### Usage
Wrap all form inputs in FormField to get consistent label, error, and helper text styling. FormField does not render any input itself — pass the input as a child.

```jsx
<FormField label="Email address" hint="We'll never share your email." required>
  <TextInput type="email" />
</FormField>
```

### Beta notice
FormField is in beta. The API may change before stable release. Known gap: `id` management is currently manual — automatic label association is on the roadmap.

---

## DataTable

**Status:** Experimental
**Version:** 0.3.0
**Owner:** Data visualization pod

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `Column[]` | — | Column definitions (see Column type) |
| `data` | `object[]` | — | Row data |
| `loading` | `boolean` | `false` | Shows skeleton loading state |
| `onSort` | `function` | — | Called with `(columnId, direction)` on header click |
| `onRowClick` | `function` | — | Called with row data when a row is clicked |
| `selectable` | `boolean` | `false` | Adds row checkboxes |
| `emptyState` | `ReactNode` | — | Rendered when `data` is empty |
| `stickyHeader` | `boolean` | `false` | Keeps header visible on scroll |

### Column type
```ts
type Column = {
  id: string
  label: string
  accessor: string | ((row: object) => ReactNode)
  sortable?: boolean
  width?: string
}
```

### Usage
*To be written. See Storybook for examples in the meantime.*

### Accessibility
*To be written.*

### Known limitations
- No built-in pagination. Implement externally and pass paginated data.
- Sorting is UI-only — you must re-sort `data` in your own state when `onSort` fires.
- `selectable` mode does not yet support keyboard selection.

---

## Toast

**Status:** Stable
**Version:** 1.1.0
**Owner:** Core UI team

### Variants
- Success
- Error
- Warning
- Info

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | — | Toast body text |
| `variant` | `success \| error \| warning \| info` | `info` | Visual style |
| `duration` | `number` | `4000` | Ms before auto-dismiss. Set to `0` to persist. |
| `action` | `{ label: string, onClick: function }` | — | Optional inline action |

### Usage
Use toasts for transient feedback that doesn't require user action. Do not use for errors that block workflow — use inline validation instead.

When you need the user to take action, set `duration: 0` and include an `action`.

### Triggering toasts
Use the `useToast` hook — do not render `<Toast>` directly.

```js
const { toast } = useToast()
toast({ message: 'Saved.', variant: 'success' })
```

### Accessibility
- Toasts are announced via an ARIA live region. No additional configuration needed.
- Persistent toasts (`duration: 0`) must include a way to dismiss — either via the `action` prop or a close button.

---

## Badge

**Status:** Stable
**Version:** 1.0.0
**Owner:** Core UI team

### Variants
- Default
- Success
- Warning
- Error
- Info
- Outline

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Badge text |
| `variant` | see above | `default` | Visual style |
| `size` | `sm \| md` | `md` | Badge size |
| `dot` | `boolean` | `false` | Shows a colored dot before label |

### Usage
Use badges to communicate status, category, or count at a glance. Keep labels short — one or two words.

Use the outline variant when placing a badge on a dark or colored background.

### When NOT to use
Do not use badges for interactive actions. If the user needs to click it, use a Button or Tag component instead.

### Accessibility
*To be documented.*

---

## Tooltip

**Status:** Stable
**Version:** 1.2.0
**Owner:** Core UI team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | — | Tooltip text |
| `placement` | `top \| bottom \| left \| right` | `top` | Preferred position |
| `delay` | `number` | `300` | Ms before showing on hover |
| `children` | `ReactNode` | — | The element the tooltip is attached to |

### Usage
Use tooltips to provide brief clarifying information for UI elements that are ambiguous without it. Common use cases: icon buttons, truncated text, disabled states with a reason.

Do not put interactive content inside a tooltip. Do not use tooltips for content that is critical — if the user must see it, put it on the page.

### Accessibility
Tooltips are triggered on hover and focus. Screen readers will read the tooltip content via `role="tooltip"` and `aria-describedby`. Test this — browser behavior varies.

Use good judgment about when tooltips are appropriate for touch devices.

---

## Combobox

**Status:** Beta
**Version:** 0.7.1
**Owner:** Forms working group

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `Option[]` | — | List of selectable items |
| `value` | `string \| null` | — | Controlled value |
| `onChange` | `function` | — | Called with selected option |
| `placeholder` | `string` | `'Select…'` | Input placeholder text |
| `searchable` | `boolean` | `true` | Enables type-to-filter |
| `clearable` | `boolean` | `false` | Shows clear button when value is set |
| `loading` | `boolean` | `false` | Shows loading state in dropdown |
| `disabled` | `boolean` | `false` | Disables input |
| `error` | `string` | — | Error message below input |
| `noResultsText` | `string` | `'No results'` | Shown when filter returns empty |

### Option type
```ts
type Option = {
  value: string
  label: string
  disabled?: boolean
  group?: string
}
```

### Usage
Use Combobox for single-value selection from a medium or large option set (roughly 8+ items). For fewer options, prefer a radio group. For multiple selection, the MultiSelect component is not yet available — use a workaround appropriate to your context.

### Known limitations
- Async search (loading options from an API on keystroke) is not natively supported yet.
- Grouping (`option.group`) renders group headers but does not support collapsing.

### Accessibility
*To be written. Known issue: keyboard navigation has been tested in Chrome only.*

---

## Design Tokens

### Color — Brand
```
--color-primary: #6436bf
--color-primary-hover: #5429a8
--color-primary-subtle: #f0ebff
--color-destructive: #d63b3b
--color-destructive-hover: #b52e2e
--color-success: #2e7d32
--color-warning: #f57c00
--color-info: #1565c0
```

### Color — Neutral
```
--color-neutral-0: #ffffff
--color-neutral-100: #f8f9fa
--color-neutral-200: #e8e4f0
--color-neutral-400: #9893a1
--color-neutral-600: #645e6e
--color-neutral-900: #1a1a1a
```

### Color — Semantic (aliases)
*Semantic token aliases are on the roadmap but not yet implemented. Teams should use brand/neutral tokens directly for now.*

### Spacing
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
--space-16: 64px
```

### Typography
```
--font-size-xs: 11px
--font-size-sm: 13px
--font-size-base: 15px
--font-size-lg: 18px
--font-size-xl: 24px
--font-size-2xl: 32px
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 700
--line-height-tight: 1.2
--line-height-base: 1.6
--font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-family-mono: 'JetBrains Mono', 'Fira Code', monospace
```

### Border radius
```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 9999px
```

### Elevation (shadows)
*Not yet tokenized. Teams currently copy shadow values from Figma manually — this is a known inconsistency.*

---

## Patterns

### Empty States

When a list, table, or view has no content to show, display an empty state rather than blank space.

An empty state should include:
- An icon or illustration (optional but recommended)
- A heading that describes the situation
- A short explanation of why it's empty
- A call to action if the user can resolve it

Use good judgment on whether the empty state needs an illustration — for internal tools, a heading + action is usually enough.

### Error States

*To be documented. See Figma for visual examples.*

### Loading States

The design system provides skeleton loading components for DataTable and Card. For other components, use a spinner from the Icon library.

Loading states should appear after 300ms of waiting to avoid flashing on fast connections.

### Form Validation

Display validation errors inline, below the relevant field, using FormField's `error` prop. Do not use a toast for form validation errors.

Run validation on submit. For complex forms or long flows, also validate on blur.

*For multi-step form validation guidance, see the Forms pattern page.*

---

## Accessibility Notes

*To be written.*

The following components have open accessibility issues tracked in Linear:
- Combobox: keyboard navigation only tested in Chrome
- DataTable: no ARIA grid role, keyboard row selection not implemented
- Modal: focus trap tested but not verified against NVDA + Firefox

---

## Contribution Guide

See the main repo for contribution guidelines.

To propose a new component, open an RFC in the #design-system Slack channel and tag the Core UI team.

There is no formal process for contributing to existing components yet. Reach out to the component owner directly.

---

## Changelog

**2.1.0** — Added `loading` state to Button; added Combobox (beta)
**2.0.0** — Breaking: renamed `variant="danger"` to `variant="destructive"`; added Ghost and Link button variants
**1.4.0** — Added `full` size to Modal; added Badge component
**1.1.0** — Toast: added `action` prop and `useToast` hook
**1.0.0** — Initial stable release: Button, Modal, Toast
