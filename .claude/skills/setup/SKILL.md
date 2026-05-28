---
name: setup
description: >
  This skill should be used when the user says "setup", "set up", or has just cloned
  this knowledge base template repo and needs to install dependencies and verify the
  environment. This is environment setup only — for KB configuration, use /init-kb.
argument-hint: "[--skip-obsidian]"
---

Set up the environment for this knowledge base. This is idempotent — safe to re-run
any time. Stop and ask the user if a required step fails and there is no obvious fix.

## Step 1: Install Node dependencies

Run `pnpm install` (or `npm install` if pnpm is not available) to install `mdbase-cli`.

```bash
pnpm install
```

Verify by running `npx mdbase --version`. If it fails, report the error and stop.

## Step 2: Check the PostToolUse hook script

Confirm `scripts/validate-md.sh` is executable:

```bash
chmod +x scripts/validate-md.sh
```

Run a quick smoke test:

```bash
bash scripts/validate-md.sh
```

If it exits non-zero for reasons other than "no file path provided," report and stop.

## Step 3: Check for Obsidian

Check whether the Obsidian desktop app is installed:

- **macOS**: `ls /Applications/Obsidian.app` or `ls ~/Applications/Obsidian.app`
- **Linux**: `which obsidian` or check `~/.local/share/applications/obsidian.desktop`
- **Windows**: `where obsidian` or check `%APPDATA%\Obsidian`

Report one of:
- "Obsidian is installed at [path]"
- "Obsidian not found — download from https://obsidian.md if you plan to use it as a viewer"

Do NOT install Obsidian automatically — it requires a GUI installer. Just report its presence.

## Step 4: Check for Obsidian CLI (`obsidian-cli` / `oboe`)

```bash
which obsidian-cli 2>/dev/null || which oboe 2>/dev/null || echo "not found"
```

If not found:
> No Obsidian CLI detected. Optional — enables automation like opening vaults from the terminal.
> Install with: `npm install -g obsidian-cli`

## Step 5: Validate existing frontmatter

If `wiki/` contains any `.md` files, run:

```bash
npx mdbase validate wiki/
```

Report a summary: how many files passed, warned, failed. List failures — do not auto-fix.

## Step 6: Confirm `_types/` definitions exist

Check that the starter type files are present:

- `_types/article.md`
- `_types/source.md`
- `_types/output.md`
- `_types/meta.md`

If any are missing, create them from the definitions in `_types/`. If `_types/` is empty,
notify the user — these should have been in the repo. (They can be recreated via `/init-kb`.)

## Step 7: Ensure required directories exist

Create these if missing:

```bash
mkdir -p outputs logs
```

## Completion Report

```
Setup complete.

  pnpm install          ✓
  validate-md.sh        ✓
  Obsidian app          [found | not found]
  Obsidian CLI          [found | not found]
  mdbase validate       [✓ N files | ⚠ N warnings | ✗ N errors]
  _types/ definitions   ✓
  outputs/ + logs/      ✓
```

If anything is missing or broken, list next steps clearly.

**Next step:** If this is a new KB, run `/init-kb` to configure the topic, entity types, and wiki structure.
