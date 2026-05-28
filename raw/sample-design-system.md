# Meridian Design System — Component Reference (Sample)

*This is sample source material for the workshop. Replace it with your own design system docs, or use it as a starting point to explore what the AI surfaces.*

---

## Button

**Status:** Stable  
**Version:** 2.1.0

### Variants
- Primary
- Secondary
- Destructive
- Ghost

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary \| secondary \| destructive \| ghost` | `primary` | Visual style |
| `size` | `sm \| md \| lg` | `md` | Button size |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `onClick` | `function` | — | Click handler |

### Usage
Use the primary button for the main action on a page. Use secondary for supporting actions.

---

## Modal

**Status:** Stable  
**Version:** 1.4.0

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | `false` | Controls visibility |
| `onClose` | `function` | — | Close handler |
| `title` | `string` | — | Modal heading |
| `size` | `sm \| md \| lg \| full` | `md` | Modal width |

### Usage
Use modals for focused tasks that require user input before continuing.

---

## FormField

**Status:** Beta  
**Version:** 0.9.2

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label |
| `error` | `string` | — | Error message |
| `required` | `boolean` | `false` | Marks field as required |

### Usage
Wrap all form inputs in FormField to get consistent label, error, and helper text styling.

---

## DataTable

**Status:** Experimental  
**Version:** 0.3.0

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `Column[]` | — | Column definitions |
| `data` | `object[]` | — | Row data |
| `loading` | `boolean` | `false` | Loading state |
| `onSort` | `function` | — | Sort handler |

---

## Toast

**Status:** Stable  
**Version:** 1.1.0

### Variants
- Success
- Error
- Warning
- Info

### Usage
Use toasts for transient feedback that doesn't require user action. Do not use for errors that block workflow — use inline validation instead.

---

## Design Tokens

### Color
```
--color-primary: #6436bf
--color-primary-hover: #5429a8
--color-destructive: #d63b3b
--color-success: #2e7d32
--color-warning: #f57c00
--color-neutral-100: #f8f9fa
--color-neutral-900: #1a1a1a
```

### Spacing
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
--space-12: 48px
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
```

---

## Accessibility Notes

*To be written.*

---

## Contribution Guide

See the main repo for contribution guidelines.

---

## Changelog

**2.1.0** — Added `loading` state to Button  
**2.0.0** — Breaking: renamed `variant="danger"` to `variant="destructive"`  
**1.4.0** — Added `full` size to Modal
