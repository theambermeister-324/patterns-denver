# Patterns Denver — Advanced Track
**June 11, 2026 · CongaLine by Crux Digital**

This branch is the advanced track. You're deploying a fleet of isolated AI agents using [CongaLine](https://github.com/cruxdigital-llc/CongaLine) — open-source agent fleet management with zero ingress, zero egress, and zero trust between agents.

**If you're on the curious-but-new track:** switch back to `main` and run `/setup` in Claude Code.

---

## What you need

- **Docker Desktop** — running. [Download here](https://www.docker.com/products/docker-desktop/) if needed.
- **The `conga` CLI** — see install instructions below
- **An Anthropic API key** — the same one you use for Claude Code
- **Optionally:** a Slack workspace to connect agents to (Aaron can help you set one up)

---

## Install the conga CLI

```bash
# macOS (Homebrew)
brew install cruxdigital-llc/tap/conga

# Or download directly from GitHub releases
# https://github.com/cruxdigital-llc/CongaLine/releases
```

Verify: `conga --version`

---

## Your starting prompt

> **Deploy a CongaLine agent fleet that runs a design system linting agent — one agent per platform (web, native, email). Configure isolation policies that mirror your organization's governance model. What breaks first?**

You're not expected to finish this. You're expected to hit real walls. That's the point.

---

## Quick start (local provider)

```bash
# 1. Initialize CongaLine with the local Docker provider
conga admin setup --provider local

# 2. Add your first agent (team agent — visible in a channel)
conga admin add-team --name ds-linter-web --provider local

# 3. Check what's running
conga status

# 4. Open the gateway (web UI — no Slack needed)
conga gateway open
```

Aaron's pre-configured manifest is in `demo.yaml` — see below.

---

## Aaron's config (drop zone)

Aaron Stone (Crux Digital) will add a pre-configured `demo.yaml` and `demo.env.example` here before June 11. When those files appear:

```bash
cp demo.env.example demo.env
# Edit demo.env — add your ANTHROPIC_API_KEY and any Slack tokens

conga manifest apply demo.yaml --env-file demo.env
```

One command stands up the whole fleet from the manifest.

---

## The governance angle

Your design system has a governance model — even if it's informal. Who can change tokens? Who reviews new components? Which platforms have stricter rules?

CongaLine's isolation model maps directly onto this:
- Each agent runs in its own container, network, and secrets store
- One agent cannot see another agent's data
- Egress policy controls what each agent can reach

The `conga-policy.yaml` is where you define those boundaries. Start here:

```bash
cp conga-policy.yaml.example conga-policy.yaml
# Edit the egress.allowed_domains section
conga policy validate
conga policy deploy
```

What would your design system's governance model look like as a policy file?

---

## When you're stuck

| Problem | Who to ask |
|---|---|
| `conga` won't install / Docker errors | **Aaron** (primary tech resolver) |
| Policy questions / governance mapping | **Aaron** or **Amber** |
| "I don't know what the fleet should do" | **Nate** or **Amber** |
| Design system direction for the agents | **Amber** or your pair |

---

## Gallery wall

When you have output worth sharing: **[patterns-denver-2026.netlify.app](https://patterns-denver-2026.netlify.app)**

Fill in the form — no git required.

---

*Advanced track facilitated by **Aaron Stone** (Crux Digital) · [github.com/cruxdigital-llc/CongaLine](https://github.com/cruxdigital-llc/CongaLine)*
