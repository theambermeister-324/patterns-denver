# TextField

## Purpose
The standard single-line (or multi-line) text input. Covers text, number, email, password, search, URL, and other input types.

## When to use
- Any free-text input from the merchant (name, email, description, URL, price, etc.)
- Multi-line text with `multiline` prop (bio, notes, description)
- Number input with increment/decrement controls

## When NOT to use
- Selecting from a fixed list of options → use Select or ChoiceList
- Date picking → use DatePicker
- Rich text / formatted content → use a purpose-built rich text editor
- Search within a list → consider Filters' search field

## Anatomy
- **Label** — always required; describes what to enter
- **Input** — the text entry area
- **Prefix / suffix** — inline decorators (currency symbol, unit, icon) inside the input
- **Connected left / right** — elements attached outside the input border (Select for unit, Button for "Copy")
- **Help text** — supporting instruction below the field
- **Error** — validation message below the field (red)
- **Character count** — optional count shown when `showCharacterCount` + `maxLength` are set

## Key props / variants
- `label` — required
- `type` — `'text'` (default) | `'number'` | `'email'` | `'password'` | `'search'` | `'tel'` | `'url'` | `'currency'` | `'integer'`
- `value` / `onChange` — controlled input
- `multiline` — `true` or a number (sets initial row count); renders as `<textarea>`
- `error` — string or boolean; shows error state + message
- `helpText` — supporting text below the field
- `prefix` — content inside the input at the start (e.g., "$")
- `suffix` — content inside the input at the end (e.g., "USD")
- `connectedLeft` / `connectedRight` — components attached outside the input
- `clearButton` — shows an × to clear the field
- `autoComplete` — hint for browser autofill (`'name'`, `'email'`, `'off'`, etc.)
- `disabled` / `readOnly`
- `maxLength` / `showCharacterCount`
- `placeholder` — use sparingly; labels are better than placeholder-only fields

## Common scenarios
- **Product title**: `label="Title"` + `autoComplete="off"` + `helpText="Appears on your storefront and in customer emails"`
- **Price input**: `type="currency"` + `prefix="$"` + `suffix="USD"` + `label="Price"`
- **Notes / description**: `multiline={4}` + `label="Notes"` + optional `maxLength` + `showCharacterCount`
- **Password field**: `type="password"` + a show/hide toggle in `connectedRight`
- **Search with clear**: `type="search"` + `clearButton` + `onClearButtonClick`

## Accessibility notes
- Never use `placeholder` as a substitute for `label` — placeholder disappears on input and isn't always read by screen readers
- `error` strings are announced by screen readers — write them as instructions, not just alerts ("Enter a valid email address", not "Invalid email")
- `helpText` is associated with the input via `aria-describedby` — keep it concise

## Rework warnings
- Native `<input>` or `<textarea>` elements without Polaris wrapping → TextField provides error states, help text, and consistent styling
- Custom prefix/suffix layouts (absolute-positioned text inside an input) → use TextField's `prefix`/`suffix` props
- Showing validation errors only on blur with no persistent message → TextField's `error` prop handles persistent error display

## Doc URL
https://polaris.shopify.com/components/selection-and-input/text-field
