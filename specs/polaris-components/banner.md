# Banner

## Purpose
Communicates important information or feedback to the merchant — success confirmations, warnings, errors, or informational context — in a way that is contextually relevant to the current page or action.

## When to use
- Communicating the result of an action (success, error, warning)
- Providing important context before a merchant takes action ("This plan will renew on March 1")
- Surfacing a recoverable error on a form or page
- Showing a persistent warning about a configuration state ("Your store is in test mode")

## When NOT to use
- For temporary toasts/notifications that auto-dismiss → use Toast instead
- For a single inline field-level validation error → use the TextField's `error` prop directly
- As a marketing or promotional message → use a CalloutCard instead
- For information that belongs in the page body as regular content

## Anatomy
- **Status icon** — contextual icon matching the tone (success ✓, warning ⚠, critical ✕, info ℹ)
- **Title** — optional short heading
- **Body** — the message (can include links and lists)
- **Action** — optional button for a direct response (e.g., "Upgrade plan", "Fix settings")
- **Dismiss button** — optional close control (not all banners should be dismissible)

## Key props / variants
- `status` — `'success'` | `'info'` | `'warning'` | `'critical'`
- `title` — optional heading
- `action` — `{ content, url, onAction }` — primary action button
- `secondaryAction` — secondary action link
- `onDismiss` — if provided, renders a dismiss button
- `icon` — custom icon override (rare)

## Common scenarios
- **Form save success**: `status="success"` Banner at the top of the page after saving settings
- **Payment failed**: `status="critical"` Banner on billing page with "Update payment method" action
- **Incomplete setup warning**: `status="warning"` Banner on dashboard ("Your store isn't ready to accept orders — add a payment method")
- **Informational context**: `status="info"` Banner explaining a feature constraint or upcoming change
- **Page-level form error**: `status="critical"` Banner listing validation errors when a form submission fails (link to the specific fields)

## Accessibility notes
- Banners with `status="critical"` are announced immediately by screen readers (role="alert") — only use critical for actual errors, not warnings
- If a Banner appears after a user action (form submit), scroll it into view or move focus to it

## Rework warnings
- Custom colored alert boxes with icons built from scratch → this is Banner
- Using `window.alert()` or browser dialogs for error messaging → replace with Banner
- Success/error states shown only via color change with no text → Banner provides the accessible text announcement
- Persistent notification at the top of every page → if it's page-specific context, it's a Banner; if it's global, consider using the Frame notification system

## Doc URL
https://polaris.shopify.com/components/feedback-indicators/banner
