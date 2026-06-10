# Carbon Design System
**Version:** v11.x · **Maintained by:** IBM Design
**Last updated:** 2024-Q4 · **Status:** Production

> Carbon is IBM's open-source design system. It provides working code, design tools, and design guidelines for building consistent, accessible digital products across IBM and IBM clients.

---

## Design Tokens

Carbon's token system is the foundation of the design system. Components reference tokens — never raw values. Tokens map to semantic concepts rather than visual descriptions.

### Token Architecture

Carbon uses a **layering model** to create visual depth and hierarchy. Tokens are defined globally and then overridden per theme.

```
Global tokens → Theme tokens → Component tokens
```

**Four themes supported:** White, Gray 10, Gray 90, Gray 100

> **Known gap:** Dark theme token overrides are not yet fully documented for all components. For Gray 90/100 themes, refer to the Storybook theme switcher until component-level docs are complete.

---

### Color Tokens

#### Layer Tokens (background hierarchy)

| Token | White theme | Gray 10 theme | Usage |
|---|---|---|---|
| `$background` | #ffffff | #f4f4f4 | Page background |
| `$layer-01` | #f4f4f4 | #ffffff | First-level container background |
| `$layer-02` | #ffffff | #f4f4f4 | Second-level container (cards, modals within layer-01) |
| `$layer-03` | #f4f4f4 | #ffffff | Third-level container (rare — popovers within modals) |
| `$layer-accent-01` | #e0e0e0 | #e0e0e0 | Subtle accent within layer-01 |

#### Interactive Tokens

| Token | Value | Usage |
|---|---|---|
| `$interactive` | #0f62fe | Primary interactive elements — buttons, links, focus rings |
| `$interactive-hover` | #0043ce | Hover state of interactive elements |
| `$interactive-active` | #002d9c | Active/pressed state |
| `$interactive-selected` | #0043ce | Selected state in lists, tabs |
| `$interactive-focus` | #0f62fe | Focus outline color (4px ring, offset 2px) |

#### Status / Feedback Tokens

| Token | Value | Usage |
|---|---|---|
| `$support-error` | #da1e28 | Error states, destructive actions |
| `$support-warning` | #f1c21b | Warning states — use `$text-primary` for text on yellow bg |
| `$support-success` | #24a148 | Success states |
| `$support-info` | #0043ce | Informational messages |
| `$support-error-inverse` | #ff8389 | Error on dark backgrounds |

#### Text Tokens

| Token | Value | Usage |
|---|---|---|
| `$text-primary` | #161616 | Body text, headings |
| `$text-secondary` | #525252 | Secondary labels, helper text |
| `$text-placeholder` | #a8a8a8 | Input placeholder text |
| `$text-disabled` | #c6c6c6 | Disabled text — do not use for active content |
| `$text-on-color` | #ffffff | Text on colored backgrounds ($interactive, status tokens) |
| `$text-inverse` | #ffffff | Text on dark backgrounds |

---

### Spacing Tokens

Carbon uses a **2px base grid**. All spacing values are multiples of 2px. Components snap to a 4px mini-unit grid; page layout uses the 8px grid.

| Token | Value | Usage |
|---|---|---|
| `$spacing-01` | 2px | Internal micro-spacing (icon padding) |
| `$spacing-02` | 4px | Tight spacing (between icon and label) |
| `$spacing-03` | 8px | Default small spacing |
| `$spacing-04` | 12px | Compact component padding |
| `$spacing-05` | 16px | Default component padding |
| `$spacing-06` | 24px | Section spacing (small) |
| `$spacing-07` | 32px | Section spacing (medium) |
| `$spacing-08` | 40px | Section spacing (large) |
| `$spacing-09` | 48px | Page section padding |
| `$spacing-10` | 64px | Major page divisions |
| `$spacing-11` | 80px | Hero/feature section padding |
| `$spacing-12` | 96px | Maximum spacing (rare) |

---

### Type Scale

Carbon uses **IBM Plex** as its typeface family. The type scale follows a fluid system in v11.

| Token | Size | Weight | Line height | Usage |
|---|---|---|---|---|
| `$label-01` | 12px | 400 | 16px | Subtle labels, captions |
| `$helper-text-01` | 12px | 400 | 16px | Form helper text |
| `$body-compact-01` | 14px | 400 | 18px | Default body text, tight contexts |
| `$body-01` | 14px | 400 | 20px | Body text with normal reading line height |
| `$body-compact-02` | 16px | 400 | 22px | Large body, tight |
| `$body-02` | 16px | 400 | 24px | Large body, comfortable |
| `$heading-compact-01` | 14px | 600 | 18px | Compact headings (data tables, sidebars) |
| `$heading-01` | 14px | 600 | 20px | Standard component headings |
| `$heading-02` | 16px | 600 | 22px | Card titles, section headings |
| `$heading-03` | 20px | 400 | 28px | Page headings (h3 equivalent) |
| `$heading-04` | 28px | 400 | 36px | Page headings (h2 equivalent) |
| `$heading-05` | 36px | 300 | 44px | Hero headings |
| `$heading-06` | 48px | 300 | 56px | Feature/display headings |

**IBM Plex families:** IBM Plex Sans (UI), IBM Plex Mono (code), IBM Plex Serif (editorial, rarely used in product UI)

---

### Motion Tokens

> **Implementation pending.** Motion token documentation is in progress for v11. Values below represent the design specification; code-level token exports are not yet available in `@carbon/styles`. Use the values directly until tokens are released.

| Token | Value | Usage |
|---|---|---|
| `$duration-fast-01` | 70ms | Micro-interactions (toggles, checkboxes) |
| `$duration-fast-02` | 110ms | Small elements (tooltips, tags) |
| `$duration-moderate-01` | 150ms | Medium transitions (dropdowns, modals entry) |
| `$duration-moderate-02` | 240ms | Large element transitions |
| `$duration-slow-01` | 400ms | Complex layout transitions |
| `$ease-standard` | cubic-bezier(0.2, 0, 0.38, 0.9) | Most UI transitions |
| `$ease-entrance` | cubic-bezier(0, 0, 0.38, 0.9) | Elements entering the screen |
| `$ease-exit` | cubic-bezier(0.2, 0, 1, 0.9) | Elements leaving the screen |

---

## Components

### Button

**Status:** Stable · **Version:** v11.2.0

#### Variants

| Variant | Token | When to use |
|---|---|---|
| Primary | `$interactive` fill | The single most important action on a page. Use once per section maximum. |
| Secondary | `$layer-02` fill, `$interactive` border | Supporting action alongside primary. |
| Tertiary | Transparent, `$interactive` border | Lower-emphasis actions in dense contexts. |
| Ghost | Transparent, no border | Inline actions, toolbars, icon-only contexts. |
| Danger | `$support-error` fill | Destructive actions — delete, remove, clear. Requires confirmation pattern. |
| Danger Ghost | Transparent, `$support-error` text | Destructive action in toolbars where Danger fills would be visually heavy. |

#### Sizes

| Size | Height | Padding | Use case |
|---|---|---|---|
| Small (sm) | 32px | 0 $spacing-04 | Dense UIs, data tables, inline |
| Medium (md) | 40px | 0 $spacing-05 | Default for most UI contexts |
| Large (lg) | 48px | 0 $spacing-05 | Touch targets, landing pages |
| Extra large (xl) | 64px | 0 $spacing-05 | Hero CTAs only |
| 2XL | 80px | 0 $spacing-05 | Full-bleed feature sections |

#### Accessibility

- All buttons must have a visible label or an `aria-label` (icon-only buttons)
- Focus ring: 2px solid `$interactive-focus`, 2px offset
- Keyboard: `Enter` and `Space` activate; `Tab` navigates
- Do not use `<div>` or `<a>` as buttons — use `<button>` elements only
- Disabled state: `disabled` attribute, not `aria-disabled` alone

#### When not to use
- Do not use Primary for navigation — use a Link instead
- Do not place more than one Primary button in the same visual section
- Do not use buttons inside data table rows for non-destructive read actions — use a Link

---

### TextInput

**Status:** Stable · **Version:** v11.1.0

#### Anatomy

| Element | Token |
|---|---|
| Label | `$label-01`, `$text-secondary` |
| Helper text | `$helper-text-01`, `$text-secondary` |
| Input background | `$field-01` (= `$layer-02` in context) |
| Input border | `$border-strong-01` |
| Placeholder | `$text-placeholder` |
| Input text | `$text-primary`, `$body-compact-01` |
| Focus border | 2px `$interactive-focus` |
| Error border | 2px `$support-error` |
| Error message | `$text-error`, `$label-01` + error icon |

#### States

Active, focus, disabled, read-only, invalid, warning

> **Known gap:** Warning state token documentation is incomplete for Gray 90/100 themes. In production, warning inputs on dark backgrounds may have insufficient contrast — verify manually.

#### Character count
TextInput supports an optional character counter (`maxCount` prop). Counter turns `$support-error` color when limit is exceeded. The form does not auto-prevent submission — validation must be handled explicitly.

#### Accessibility
- Always pair with a `<label>` — do not rely on placeholder text as the label
- Helper text and error messages must be associated via `aria-describedby`
- Read-only inputs: `readonly` attribute; still focusable and selectable

---

### Modal

**Status:** Stable · **Version:** v11.3.0

#### Sizes

| Size | Max width | When to use |
|---|---|---|
| Extra small (xs) | 320px | Confirmation dialogs, alerts |
| Small (sm) | 480px | Simple forms, single decision |
| Medium (md) | 640px | Standard content, 2-column forms |
| Large (lg) | 800px | Complex forms, multi-step flows |
| Full width | 100% viewport | Immersive workflows, document review |

#### Structure

1. **Header** — title + optional label (smaller text above title for category context)
2. **Body** — scrollable content area
3. **Footer** — action buttons (primary left, secondary right, danger tertiary far-left if needed)

#### Focus management
- Focus must move to the Modal container or the first interactive element on open
- Focus must be trapped within the Modal while open
- On close, focus must return to the trigger element
- Pressing `Escape` always closes; this behavior must not be suppressed

> **Accessibility gap:** Focus return behavior on programmatic close (not triggered by user action) is not yet tested across all browser/assistive technology combinations. Behavior verified in Chrome + NVDA and Safari + VoiceOver only.

#### When not to use
- Do not use Modals for navigation — use a side panel or a new page
- Do not stack Modals — if a confirmation is required inside a Modal, use an inline notification or a Popover

---

### Notification

**Status:** Stable · **Version:** v11.1.0

#### Types

| Type | Use case | Auto-dismiss |
|---|---|---|
| Inline | Contextual to a form field or section | No |
| Toast | System-level feedback, triggered by an action | Yes (default: 5000ms, configurable) |
| Actionable | Toast that requires user response (Undo, View) | No — must be dismissed manually |
| Callout | Persistent informational content on the page | No |

#### Status variants
- **Informational** — `$support-info` + info icon
- **Success** — `$support-success` + checkmark icon
- **Warning** — `$support-warning` + warning icon
- **Error** — `$support-error` + error icon

#### Accessibility
- Toasts must use `role="status"` (polite) for success/info or `role="alert"` (assertive) for error/warning
- Do not auto-dismiss error or warning notifications — the user may not have read them
- Notification close buttons must have `aria-label="Close notification"`

---

### DataTable

**Status:** Stable · **Version:** v11.4.0

#### Features

| Feature | Prop | Notes |
|---|---|---|
| Sorting | `isSortable` | Single column sort only; multi-sort not yet supported |
| Row selection | `selectionType: 'multi' \| 'single'` | |
| Inline actions | `actions` | Per-row action overflow menus |
| Batch actions | `batchActions` | Shown when ≥1 row selected |
| Pagination | `<Pagination>` companion | External component — see Pagination docs |
| Filtering | `<TableToolbarSearch>` | Client-side filter only; server-side filtering is implementation responsibility |
| Expandable rows | `expandable` | Single-level only; nested expansion not supported |
| Sticky header | `stickyHeader` | Requires fixed container height |

> **Known limitation:** Multi-sort is not supported. If your data requires sorting by multiple columns simultaneously, this must be implemented outside of the Carbon DataTable.

> **Accessibility:** Screen reader testing for DataTable is in progress. Documented behavior verified with NVDA + Chrome. VoiceOver on Safari has known issues with row selection announcements — tracked in [IBM a11y issue tracker]. Do not consider DataTable accessibility complete until this is resolved.

#### When not to use
- Do not use DataTable for small datasets (< 5 rows) — a simple list or definition list is more appropriate
- Do not use DataTable for primarily visual content — use a Card grid instead

---

### Tag

**Status:** Stable · **Version:** v11.0.0

#### Types

| Type | Use case |
|---|---|
| Read-only | Display-only labels, category indicators |
| Selectable | Filter controls, multi-select facets |
| Operational | Status indicators (with icon) |
| Dismissible | Applied filters, removable selections |

#### Colors
Gray (default), Red, Magenta, Purple, Blue, Cyan, Teal, Green, Warm gray, Cool gray

> **Known gap:** No documented guidance on when to use each color semantically. Color usage is currently arbitrary across IBM products. Recommendation: establish a team-specific color convention and document it in your design system extension.

---

### Dropdown

**Status:** Stable · **Version:** v11.2.0

#### Variants

| Variant | Use case |
|---|---|
| Dropdown | Single selection from a list |
| MultiSelect | Multiple selection; shows count chip when items selected |
| ComboBox | Single selection with type-to-filter |
| FilterableMultiSelect | Multiple selection with type-to-filter |

#### Sizes
Small (32px), Medium (40px, default), Large (48px)

#### Accessibility
- Keyboard: `Down`/`Up` arrows navigate options; `Enter` selects; `Escape` closes without selecting
- When closed, shows selected value; when open, focus is on the list
- `aria-expanded`, `aria-haspopup="listbox"` required on trigger

> **Known gap:** ComboBox accessible name is not announced correctly in Firefox + JAWS combinations. Workaround: add explicit `aria-label` to the ComboBox input.

---

## Patterns

### Form Validation

Carbon's form validation pattern uses inline error messages directly below the invalid field, not a summary block at the top of the form.

**Rules:**
- Validate on blur (when the user leaves the field), not on every keystroke
- Validate on submit for fields not yet touched
- Error messages must be specific: "Email is required" not "Invalid input"
- Use `$text-error` + the error icon for all error messages
- Remove the error state as soon as the field becomes valid

**Multi-field validation:** If the form has more than 6 fields and multiple errors, add a notification at the top of the form summarizing the count ("3 fields need your attention") in addition to inline errors.

---

### Empty States

Carbon empty states have three components: illustration (optional), heading, body text, and a primary action.

| Situation | Heading pattern | Action |
|---|---|---|
| No data yet | "No [items] yet" | Create first item (Primary button) |
| Search/filter returned nothing | "No results found" | Clear filters (Ghost button) |
| No permission | "You don't have access" | Request access (Primary) or contact admin |
| Error loading | "Something went wrong" | Try again (Primary) |

> **Illustration guidance:** To be documented. See Figma Empty States kit for approved illustrations. Do not create custom illustrations without Design review.

---

### Loading States

| Pattern | When to use |
|---|---|
| Inline loading | Single element updating (button action, field save) |
| Loading spinner | Section or component loading (card content, sidebar data) |
| Skeleton screens | Full page or large section initial load — always prefer over spinner for perceived performance |
| Progress bar | Multi-step processes with known completion percentage |

**Skeleton screens:** Always use `<SkeletonText>` and `<SkeletonPlaceholder>` components — do not use CSS-only shimmer animations, which do not respect `prefers-reduced-motion`.

---

## AI Components (Experimental)

> **Status: Experimental.** The AI component set is under active development. APIs and visual design may change without a major version bump. Do not use in production without explicit approval from your IBM Design contact.

### AILabel

AILabel is used to indicate that content was generated or influenced by AI. It provides a visual marker and a popover explaining the AI's role.

**Usage guidance:** Not yet documented. See the Carbon AI storybook for current implementation examples. Official usage guidance is targeted for Q2 2025.

**Known open questions:**
- When is AILabel required vs. optional?
- What text goes in the AILabel popover?
- How does AILabel interact with user-editable AI-generated content?
- Accessibility pattern for AILabel is not yet finalized

---

## Changelog

### v11.4.0 (2024-Q4)
- DataTable: sticky header support added
- Modal: Full-width size variant added
- Token: `$layer-accent-03` added for deep nesting contexts

### v11.3.0 (2024-Q3)
- Notification: Actionable Toast variant added
- Button: 2XL size added for feature section CTAs
- Motion tokens: specification published (implementation pending)

### v11.2.0 (2024-Q2)
- Dropdown: FilterableMultiSelect performance improvements
- Button: Danger Ghost variant added
- AILabel: Experimental component added

### v11.1.0 (2024-Q1)
- TextInput: Character count feature added
- Notification: Callout type added
- Tag: Operational type added

### v11.0.0 (2023)
- Token system refactored to layering model
- All components updated to reference layer tokens
- IBM Plex type scale updated to fluid system

---

## Resources

- **Storybook:** [carbon.ibm.com/storybook](https://carbon.ibm.com/storybook)
- **Figma kit:** Available in IBM Design organization — request access via your IBM contact
- **GitHub:** [github.com/carbon-design-system/carbon](https://github.com/carbon-design-system/carbon)
- **Accessibility:** [carbondesignsystem.com/guidelines/accessibility/overview](https://carbondesignsystem.com/guidelines/accessibility/overview)

> **Questions?** Post in the #carbon-design-system Slack channel or open a GitHub issue.
