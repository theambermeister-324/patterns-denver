# Polaris Component Knowledge Base

Structured component knowledge for the Polaris Scenario Advisor. Each file covers one component using a consistent schema. The quality of AI recommendations depends directly on the quality of these files — treat them as first-class product, not documentation.

## Schema

```markdown
# ComponentName

## Purpose
One sentence: what this component is and what job it does.

## When to use
Bullet list of triggering conditions — scenarios where this is the right choice.

## When NOT to use
Anti-patterns and near-misses. What to reach for instead.

## Anatomy
Key parts of the component (not exhaustive — focus on the parts that matter for scenario matching).

## Key props / variants
The props and variants that change behavior meaningfully. Skip cosmetic-only props.

## Common scenarios
3–5 real scenarios this component appears in, with notes on how it's used in each.

## Accessibility notes
The one or two things a builder must know to not break accessibility.

## Rework warnings
Patterns that signal someone is about to build this from scratch when they shouldn't.

## Doc URL
https://polaris.shopify.com/components/...
```

## Component index

| File | Component | Category |
|---|---|---|
| page.md | Page | Layout |
| layout.md | Layout / Grid | Layout |
| card.md | Card | Layout |
| index-table.md | IndexTable | Lists & tables |
| resource-list.md | ResourceList | Lists & tables |
| data-table.md | DataTable | Lists & tables |
| filters.md | Filters | Lists & tables |
| form-layout.md | FormLayout | Forms |
| text-field.md | TextField | Forms |
| select.md | Select | Forms |
| button.md | Button / ButtonGroup | Actions |
| modal.md | Modal | Overlays |
| banner.md | Banner | Feedback |
| badge.md | Badge | Status |
| empty-state.md | EmptyState | Feedback |

## How to add a component

1. Create a new `.md` file following the schema above
2. Add a row to the index table in this README
3. Reference the doc URL from polaris.shopify.com/components
4. Add at least 2 rework warnings — these are the highest-value entries

## Maintenance

These files are intentionally static for v1. When Polaris ships breaking changes to a component, update the relevant file. The `## Doc URL` line is the canonical source of truth for what's current.
