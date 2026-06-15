# CARBON_BUILD.md — fixed-context build reference

> Purpose: the single source of truth for building pages in this app, so settled decisions are
> never re-litigated. Read this, not the docs MCP (it hit quota) or WebFetch (it truncates). When a
> component's API is unclear, read `node_modules/@carbon/react/.../*.d.ts` — that never lies.

## Frozen config (do NOT change — changing these forces a dev-server restart and re-debugging)
- **Sass:** `sass-embedded` + `vite.config.ts` → `css.preprocessorOptions.scss = { loadPaths: ['node_modules'], quietDeps: true, silenceDeprecations: ['global-builtin','import'] }`.
- **Carbon styles entry:** `src/index.scss` → `@use '@carbon/styles/scss/config' with ($css--font-face: false);` then `@use '@carbon/react';`. (The `$css--font-face:false` kills Carbon's broken `~@ibm/plex` font-faces.)
- **Fonts:** `src/fonts.scss` ships IBM Plex Sans weights 300/400/600 from the `@ibm/plex` package. Frozen. Don't reintroduce the aggregate `@ibm/plex/css/ibm-plex.css` (pulls every Plex family into `dist`).
- **Token-only SCSS partials** (use these in component SCSS so Carbon CSS isn't re-emitted): `@use '@carbon/react/scss/spacing' as *;` (gives `$spacing-01..13`), `@use '@carbon/react/scss/breakpoint' as *;`.
- **Colors:** always Carbon CSS custom props — `var(--cds-background)`, `--cds-background-brand`, `--cds-text-primary`, `--cds-text-secondary`, `--cds-text-helper`, `--cds-text-on-color`, `--cds-icon-primary`, `--cds-border-subtle-01`. **Never hardcode hex.**
- **Netlify:** the carbon-app site builds with **npm** (forced via tracked `carbon-app/package-lock.json` + `@carbon/styles` declared as a direct dep). Don't add pnpm assumptions; `loadPaths:['node_modules']` needs a flat npm `node_modules`.

## Confirmed components (all present in `@carbon/react` v1.109 — verified)
UI Shell: `Header`, `HeaderName`, `HeaderNavigation`, `HeaderMenuItem`, `SkipToContent`, `Theme`.
Layout: `Grid`, `Column`, `Tile`, `ClickableTile`, `AspectRatio`.
Content: `Tag`, `Button`, `Link`, `InlineNotification`, `Accordion`, `AccordionItem`,
`OrderedList`, `UnorderedList`, `ListItem`, `Checkbox`, **`CodeSnippet`** (`type="multi"` has a
built-in copy button — use `feedback` + `aria-label`; pass the snippet as the child string).
Icons: `@carbon/icons-react` (e.g. `Play`, `Chat`, `Apps`, `ListChecked`, `ArrowRight`).

## Type classes — VERIFIED working at runtime in Phase 1 (use these)
`cds--type-fluid-heading-05` (page/hero titles), `cds--type-heading-03` (section/card titles),
`cds--type-heading-compact-01`/`-02`, `cds--type-body-01`, `cds--type-body-02`, `cds--type-label-01`.
> ⚠️ A type *token* existing in `@carbon/type` does NOT guarantee the `cds--type-…` utility class is
> emitted (Phase 1 trap: `fluid-heading-06` token exists, class didn't render). **Before using any
> NEW class, confirm it on the running page** — don't trust the minified CSS or token lists.
> Safer default: reuse the verified set above, and lean on components' own built-in typography.

## content.ts contract
All page copy lives in `src/content.ts` as plain data. Page components are dumb renderers over it.
Phase 2 extends it with discriminated-union block types: `checklist | steps | promptCard |
galleryItem | linkList | embed | prose`. One typed export per page. (This stays lean — NOT the
deferred generic switcher-primitive harness.)

## Phase 1 rework rules (don't repeat these)
1. **Write a `.scss`/file BEFORE importing it** — importing first throws a stale Vite resolve error.
2. **Use only confirmed component/class names** — verify new type classes on the running page.
3. **Fonts are frozen** — see config above.
4. **Docs = `node_modules` `.d.ts`**, not the MCP/WebFetch.
5. **Netlify = npm** (see config). Don't break the lockfile/`@carbon/styles` setup.
6. **Verify once at the end** — one screenshot sweep across all pages; don't touch `vite.config` mid-build.

## Per-page component map (Phase 2 contract)
| Page | Route hash | Components |
|---|---|---|
| Home | `#/` (or empty) | already built: Header, hero, InlineNotification, facilitator Tiles, ClickableTile cards + Tags |
| Setup (`before`) | `#/setup` | `Checkbox` checklist groups, section headings |
| Playbook (`guide`) | `#/playbook` | numbered `Tile` steps + `CodeSnippet` (commands), `Accordion` for triage/bonus, `Tag` "optional" |
| Prompts | `#/prompts` | `CodeSnippet` (`type="multi"`) per prompt + prose; `Tag` "requires Knapsack MCP" for bonus |
| Gallery | `#/gallery` | `Grid`/`Column` + `Tile`; QR `<img>`; **submission form + live wall are dynamic (Supabase) — Phase 2 renders a static placeholder Tile + link to the live original**, do NOT reimplement Supabase |
| Next steps (`after`) | `#/next` | featured `Tile` + bullet list + `Button`/`Link`; partner `Grid` of Tiles; `Tag` eyebrows |
| Feedback (`survey`) | `#/feedback` | **wrap the existing survey in a `Tile` with a `Button` link to `survey.html`** — do NOT rebuild the 8-question Supabase form in Carbon (out of scope, lean) |

> Scope guard: Gallery's submission/live-wall and Feedback's survey are Supabase-backed apps. Per the
> "lean" decision, Phase 2 presents them in Carbon shells and links to the working originals rather
> than re-porting backend-wired forms. Note this as a documented gap (like the hero in Phase 1).
