# Polaris Design System — Reference Documentation (Sample)

*This is sample source material for the workshop. Based on Shopify's Polaris design system. Replace with your own design system docs.*

---

## Button

**Status:** Stable
**Version:** 8.3.0
**Owner:** Design Systems team
**Last updated:** 2025-11-14

### Variants
- Primary (default)
- Secondary
- Tertiary
- Plain
- Destructive
- Destructive Plain

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary \| secondary \| tertiary \| plain \| destructive \| destructive-plain` | `primary` | Visual style and hierarchy |
| `size` | `slim \| medium \| large` | `medium` | Button height and padding |
| `fullWidth` | `boolean` | `false` | Expands to fill container width |
| `disabled` | `boolean` | `false` | Disables interaction and mouse events |
| `loading` | `boolean` | `false` | Replaces text with spinner, disables click |
| `url` | `string` | — | If provided, renders as anchor instead of button |
| `external` | `boolean` | `false` | Opens link in new tab (use with `url`) |
| `icon` | `ReactNode` | — | Icon rendered before text |
| `accessibilityLabel` | `string` | — | Aria-label for icon-only buttons |
| `submit` | `boolean` | `false` | Sets `type="submit"` for form submission |
| `onClick` | `function` | — | Click handler |

### Usage
Use **Primary** for the main action on a page or card. Only one primary button per view; if you find yourself needing more, your information hierarchy needs review.

Use **Secondary** for supporting actions or navigation within a section.

Use **Tertiary** for less prominent actions, or for actions grouped together.

Use **Plain** for buttons that need minimal visual weight, such as inline actions or within dense toolbars.

Use **Destructive** for actions that cannot be undone (delete, remove, cancel subscription). Always pair with a confirmation step.

### When NOT to use
- Do not use buttons to navigate unless absolutely necessary — prefer Links in most cases.
- Do not disable buttons without context. If a button is disabled because a form is incomplete, show a validation error instead.
- Do not use a Destructive button as a default action.
- Do not use icon-only buttons without an `accessibilityLabel`.

### Design notes
Buttons at `size="slim"` are reserved for admin or "power user" surfaces. Avoid in customer-facing interfaces where cognitive load is higher.

---

## Card

**Status:** Stable
**Version:** 8.2.1
**Owner:** Design Systems team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Card content |
| `title` | `string` | — | Card heading (optional) |
| `sectioned` | `boolean` | `false` | Adds padding and dividers between sections |
| `actions` | `Action[]` | — | Action buttons in card header |
| `disabled` | `boolean` | `false` | Dims card and disables interactions |
| `selectable` | `boolean` | `false` | Makes card clickable/selectable |
| `onAction` | `function` | — | Handler when card is clicked (if selectable) |

### Action type
```ts
type Action = {
  content: string
  onAction: function
  icon?: ReactNode
  destructive?: boolean
}
```

### Usage
Cards are the primary container for grouped content. Use them to organize related information and actions.

Use `sectioned` when your card has multiple logical groups (e.g., product details followed by shipping info). Each section gets visual separation.

### Accessibility
Cards should be semantic containers. If a card is selectable, ensure keyboard navigation works — test with a screen reader.

---

## TextField

**Status:** Stable
**Version:** 8.4.0
**Owner:** Design Systems team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label (required) |
| `type` | `text \| email \| number \| password \| tel \| url \| search` | `text` | HTML input type |
| `value` | `string` | — | Controlled input value |
| `onChange` | `function` | — | Called with new value on input |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the field |
| `readOnly` | `boolean` | `false` | Prevents editing |
| `error` | `string \| boolean` | — | Error message (true hides message, shows red border) |
| `helpText` | `string` | — | Helper text below field |
| `maxLength` | `number` | — | Maximum characters allowed |
| `required` | `boolean` | `false` | Marks field as required |
| `prefix` | `string` | — | Text before input (e.g., currency symbol) |
| `suffix` | `string` | — | Text after input (e.g., unit label) |

### Usage
Use TextField for single-line text input. For multi-line content, use TextArea.

Always include a `label`. If you need a placeholder-as-label pattern, use the `placeholder` prop, but also include a hidden label for accessibility.

```jsx
<TextField
  label="Store name"
  type="text"
  value={name}
  onChange={setName}
  helpText="Your store name appears in emails and invoices."
/>
```

### Accessibility
- Labels are associated via `htmlFor`. Test that clicking the label focuses the input.
- Error states use `aria-invalid="true"` and `aria-describedby` for error messages.
- Screen reader testing: verified in NVDA + JAWS on Windows, VoiceOver on macOS (see wcag-audit-2025.md for details).

### When NOT to use
- Do not use for numbers or email if you can use a more specific input type.
- Do not use masked inputs (e.g., phone number formatting). Let users type freely; format on blur.

---

## Badge

**Status:** Stable
**Version:** 8.1.0
**Owner:** Design Systems team

### Statuses
- Default
- Success
- Attention
- Warning
- Critical
- New
- Info

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `string` | — | Badge label text |
| `status` | see above | `default` | Semantic status |
| `size` | `small \| medium` | `medium` | Badge size |
| `progress` | `complete \| incomplete` | — | Progress indicator (optional) |

### Usage
Badges communicate a quick status or category label. Keep text to 1–2 words.

Use `status="critical"` only for urgent states (e.g., subscription expired, payment failed).

Use `progress` for workflow status: set to `complete` for finished steps, `incomplete` for pending.

### When NOT to use
- Do not use badges for actions — if users need to click, use a Button or Tag.
- Do not overuse badges. A page crowded with badges loses clarity.

### Dark mode
*Dark mode badge styling is in development. Use light backgrounds only until Q1 2026.*

---

## Heading

**Status:** Stable
**Version:** 8.0.0
**Owner:** Design Systems team

### Elements
- h1, h2, h3, h4, h5, h6

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `element` | `h1 \| h2 \| h3 \| h4 \| h5 \| h6` | `h1` | Semantic HTML heading level |
| `children` | `ReactNode` | — | Heading text |
| `id` | `string` | — | Anchor link ID |

### Usage
Always use semantic heading levels. Start with h1; do not skip levels (h1 → h3 jumps hierarchy).

Use h1 once per page for the main page title. Use h2 for major sections.

### Accessibility
Headings are critical for screen reader navigation. Never use headings for styling — use the `className` prop to adjust appearance if needed.

---

## Select

**Status:** Beta
**Version:** 0.8.0
**Owner:** Design Systems team
**Next review:** Q2 2026

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label (required) |
| `options` | `Option[]` | — | Array of selectable items |
| `value` | `string` | — | Currently selected value |
| `onChange` | `function` | — | Called with selected value |
| `disabled` | `boolean` | `false` | Disables the field |
| `error` | `string` | — | Error message |
| `placeholder` | `string` | `'Select an option'` | Placeholder text |

### Option type
```ts
type Option = {
  label: string
  value: string
  disabled?: boolean
}
```

### Usage
Use Select for choosing a single value from a list. For large option sets (50+ items), consider Combobox for searchability.

Do not use Select for navigation. Use a menu component instead.

### Known limitations
- **Grouping not yet supported.** Flat lists only. If you need grouped options, use Combobox instead (when available).
- **Mobile experience:** Native select on mobile, styled dropdown on desktop.
- **Keyboard navigation tested in:** Chrome, Safari, Firefox. Edge support is pending.

### Accessibility
*See accessibility-compliance.md for full WCAG guidance. Placeholder selection behavior differs across browsers — test thoroughly.*

---

## ResourceList

**Status:** Stable
**Version:** 7.4.0
**Owner:** Design Systems team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `Item[]` | — | List items to render |
| `loading` | `boolean` | `false` | Shows skeleton state |
| `emptyState` | `ReactNode` | — | Rendered when items is empty |
| `selectable` | `boolean` | `false` | Enables row checkboxes |
| `selectedItems` | `string[]` | — | Array of selected item IDs |
| `onSelectionChange` | `function` | — | Called with new selected IDs |
| `sortOptions` | `SortOption[]` | — | Sort controls in header |
| `onSort` | `function` | — | Called when sort changes |

### Usage
ResourceList is the primary way to display rows of content (products, orders, customers, etc.). It's optimized for admin interfaces.

Each item should be clickable (to a detail view) and have bulk actions available via the checkbox.

### Accessibility
*Documentation in progress. Keyboard shortcuts for bulk selection not yet standardized — contribute to the RFC in #design-system.*

### Limitations
- No built-in pagination. Implement externally.
- Sorting is UI-only — you must re-query or re-sort your data when `onSort` fires.

---

## Modal

**Status:** Stable
**Version:** 8.1.0
**Owner:** Design Systems team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | `false` | Controls visibility |
| `onClose` | `function` | — | Called when modal closes |
| `title` | `string` | — | Modal heading (required for accessibility) |
| `size` | `small \| medium \| large \| fullscreen` | `medium` | Modal width |
| `children` | `ReactNode` | — | Modal content |
| `primaryAction` | `Action` | — | Right-aligned action button |
| `secondaryActions` | `Action[]` | — | Additional buttons |
| `sectioned` | `boolean` | `false` | Adds padding and dividers to content |
| `limitHeight` | `boolean` | `false` | Constrains modal to viewport height |

### Usage
Use modals for focused, interruptive tasks. Examples: confirmations, forms, alerts.

Avoid nesting modals. If a modal action opens another modal, use a different pattern (inline sheet, drawer, or new page).

On mobile, use `size="fullscreen"`.

### When NOT to use
- Do not use modals for complex wizards or multi-step flows. Use a page instead.
- Do not trap users with `preventClose` without a clear exit path.

---

## Page

**Status:** Stable
**Version:** 8.2.0
**Owner:** Design Systems team

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Page heading |
| `titleMetadata` | `ReactNode` | — | Subheading or metadata next to title |
| `subtitle` | `string` | — | Descriptive text below title |
| `children` | `ReactNode` | — | Page content |
| `breadcrumbs` | `Breadcrumb[]` | — | Navigation breadcrumbs |
| `actions` | `Action[]` | — | Primary actions in header |
| `secondaryActions` | `Action[]` | — | Secondary actions (usually menu) |

### Usage
Wrap page-level content in Page to get consistent header, title, and action styling.

Use `breadcrumbs` for navigation within a shallow hierarchy (3–4 levels). Don't use breadcrumbs on every page.

---

## Design Tokens

### Color — Brand (Shopify Green)
```
--p-color-brand: #008060
--p-color-brand-hover: #006b52
--p-color-brand-active: #005541
--p-color-brand-subdued: #dffcf0
--p-color-brand-disabled: #c3fae8
```

### Color — Critical (Red)
```
--p-color-critical: #d72c0d
--p-color-critical-hover: #ae2707
--p-color-critical-active: #8b2105
--p-color-critical-subdued: #fed7d0
--p-color-critical-disabled: #fac5ba
```

### Color — Warning (Amber)
```
--p-color-warning: #f59e0b
--p-color-warning-hover: #d97706
--p-color-warning-active: #b45309
--p-color-warning-subdued: #fef3c7
```

### Color — Success (Green)
```
--p-color-success: #137333
--p-color-success-hover: #0f5a2e
--p-color-success-active: #0d4324
```

### Color — Info (Blue)
```
--p-color-info: #0c5ff7
--p-color-info-hover: #003dd4
--p-color-info-active: #0030ad
--p-color-info-subdued: #dbeafe
```

### Color — Neutral
```
--p-color-bg: #ffffff
--p-color-surface: #f6f6f7
--p-color-on-surface: #202223
--p-color-border: #e1e3e5
--p-color-border-subdued: #e8eaeb
--p-color-text: #202223
--p-color-text-subdued: #626f86
--p-color-icon: #5e6369
--p-color-icon-subdued: #8891a1
```

### Color — Dark mode
**⚠️ Dark mode tokens are not finalized.** Do not use in production. Guidance document and token set TBA in Q1 2026.

### Spacing Scale
```
--p-space-0: 0
--p-space-025: 2px
--p-space-05: 4px
--p-space-1: 8px
--p-space-2: 16px
--p-space-3: 24px
--p-space-4: 32px
--p-space-5: 40px
--p-space-6: 48px
--p-space-8: 64px
--p-space-12: 96px
```

### Typography
```
--p-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
--p-font-family-mono: 'Menlo', 'Monaco', monospace
--p-font-size-sm: 12px
--p-font-size-base: 14px
--p-font-size-md: 16px
--p-font-size-lg: 20px
--p-font-size-xl: 24px
--p-font-weight-regular: 400
--p-font-weight-medium: 500
--p-font-weight-semibold: 600
--p-font-weight-bold: 700
--p-line-height-tight: 1.2
--p-line-height-base: 1.5
--p-line-height-loose: 1.8
```

### Border radius
```
--p-border-radius-0: 0
--p-border-radius-1: 2px
--p-border-radius-2: 4px
--p-border-radius-3: 6px
--p-border-radius-4: 8px
--p-border-radius-5: 12px
--p-border-radius-base: 4px
--p-border-radius-lg: 8px
--p-border-radius-full: 9999px
```

### Shadow / Elevation
```
--p-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--p-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07)
--p-shadow-lg: 0 12px 16px rgba(0, 0, 0, 0.1)
--p-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

### Motion & Animation
**Status: Roadmap**
*Motion tokens (duration, easing) are planned for Q3 2026. Until then, use these inline values:*
- Fast: 150ms, cubic-bezier(0.16, 1, 0.3, 1)
- Base: 200ms, cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Slow: 300ms, cubic-bezier(0.33, 0.66, 0.66, 1)

---

## Patterns

### Empty State

When a list, section, or view has no content to display, show an empty state instead of blank space.

An effective empty state includes:
- A descriptive heading
- A brief explanation of why it's empty
- An action the user can take to populate it (if applicable)
- Optional: an illustration or icon

Do not use placeholder text or skeleton loading as a substitute.

### Form Validation

Run validation on submit. For longer forms, also validate on blur to catch errors early.

Display errors inline, immediately below the field. Do not use modals or toasts for validation errors.

*See form-validation-detailed.md for multi-step form patterns.*

### Confirmation Actions

Always require explicit confirmation before destructive actions (delete, cancel, downgrade).

Use a Modal with a clear title and explanation. The primary action button should be `variant="destructive"` and say exactly what will happen (e.g., "Delete product" not just "Delete").

---

## Icon Library

Icons are provided via the Polaris Icons package. [See icon inventory here](TODO: link to icon browser).

Always use semantic icons. If an icon doesn't exist, consult #design-system before creating a custom one.

*Icon library visual reference not yet updated for v8.x. Refer to Storybook in the meantime.*

---

## Accessibility Standards

Polaris aims for WCAG 2.1 Level AA compliance.

Each component has accessibility notes in its section. For broader guidance:

**Keyboard navigation:** All interactive elements must be keyboard-accessible. Test with Tab, Enter, Escape, and arrow keys.

**Screen readers:** Test with at least two screen readers (e.g., NVDA + JAWS on Windows, VoiceOver on macOS).

**Color contrast:** Text must meet 4.5:1 contrast ratio (normal text) or 3:1 (large text). Do not rely on color alone to convey meaning.

**Focus management:** Visible focus indicator on all interactive elements. Modal focus trap verified.

*Full accessibility audit report: see wcag-2025-audit.md (internal only)*

---

## Status Legend

- **Stable:** Component is production-ready. API is locked; breaking changes require a major version bump.
- **Beta:** Component works but API may change before stable release. Use in production with caution.
- **Experimental:** Early testing phase. API will change. Do not use in production.

---

## Contributing

New components and significant changes go through an RFC process. Open an issue or RFC in the Design Systems GitHub repo.

For bug reports, see [GitHub Issues](TODO: link).

Questions? Reach out in #design-system on Slack or email design-systems@shopify.com.

---

## Changelog

**8.4.0** — TextField: added `prefix`/`suffix` props; Button: deprecated `plain` in favor of `tertiary`
**8.3.0** — Badge: added `progress` prop; Page: added `titleMetadata`
**8.2.1** — Modal: fixed focus trap bug in Safari
**8.2.0** — Page component added; ResourceList refactored
**8.1.0** — Button size options renamed (small → slim); added Heading component
**8.0.0** — Major version: migrated to CSS-in-JS; breaking API changes across all components
**7.4.0** — ResourceList: stable release; added `onSort` callback

