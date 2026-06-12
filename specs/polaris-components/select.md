# Select

## Purpose
A dropdown for choosing one option from a predefined list. The native `<select>` element, styled to match Polaris.

## When to use
- Choosing from a list of 5–15 options where the user knows what they're looking for
- When screen space is limited and a full ChoiceList would be too tall
- For settings with a known, static set of options (country, timezone, language, plan)

## When NOT to use
- Fewer than 5 options → use a ChoiceList (radio buttons) so all options are visible at once
- More than ~15 options that benefit from search → use a Combobox or Autocomplete
- Multiple selection → use ChoiceList with `allowMultiple` or a Combobox
- When users need to see all options to make a decision → use ChoiceList

## Anatomy
- **Label** — always required
- **Options** — the list items; can be grouped with `<optgroup>`-style `groups` prop
- **Selected value display** — shows the current selection in the closed state
- **Help text** — supporting instruction below the field
- **Error** — validation message

## Key props / variants
- `label` — required
- `options` — array of `{ label, value }` or `{ title, options: [...] }` for grouped options
- `value` / `onChange` — controlled
- `placeholder` — shown as a disabled first option when no value is selected (e.g., "Select a country")
- `disabled`
- `error`
- `helpText`
- `labelInline` — places the label to the left of the select (useful in filter or toolbar contexts)
- `labelHidden` — hides the label visually (still present for screen readers)

## Common scenarios
- **Country selector**: Long `options` list of countries with `placeholder="Select country"`
- **Timezone setting**: Grouped options by region
- **Sort order**: `labelInline` + options like "Date (newest first)", "Date (oldest first)", "Name A–Z"
- **Bulk action type selector**: Inline Select for choosing an action type before applying
- **Language picker**: Select with 5–10 language options

## Accessibility notes
- `label` is always required — use `labelHidden` if you must hide it visually, but never omit it entirely
- Grouped options (using the `groups` prop) render as native `<optgroup>` which has good screen reader support
- `placeholder` renders as a disabled `<option>` — make sure it reads as an instruction, not a valid choice

## Rework warnings
- Custom dropdown built with a `<div>` + `<ul>` + absolute positioning → unless you need multi-select or search, use Select (native `<select>` has better accessibility)
- Long lists (50+ options) in a Select → users can't search; use Combobox/Autocomplete instead
- Radio buttons for 6+ options where all options don't need to be visible → use Select

## Doc URL
https://polaris.shopify.com/components/selection-and-input/select
