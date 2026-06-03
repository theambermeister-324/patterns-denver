# Advanced Track — Dry Run Script
**Owner: Aaron Stone · Target: complete before June 9**

Run this cold on a machine that hasn't seen CongaLine before. Time each step.
Pass criteria: first running agent in under 20 minutes from clone.

---

## Step 1: Clone and set up (target: 5 min)

```bash
git clone https://github.com/theambermeister-324/patterns-denver
cd patterns-denver
git checkout advanced
```

Install the conga CLI if not already installed:
```bash
brew install cruxdigital-llc/tap/conga
conga --version
```

Verify Docker Desktop is running:
```bash
docker info
```

---

## Step 2: Configure from the manifest (target: 5 min)

```bash
cp conga/demo.env.example conga/demo.env
# Open conga/demo.env and add:
#   ANTHROPIC_API_KEY=your-key-here
#   (plus any Slack tokens if testing with Slack)

conga manifest apply conga/demo.yaml --env-file conga/demo.env
```

**Check:** does the manifest apply without errors? If it prompts for anything unexpected, that's a gap to fix before June 11.

---

## Step 3: Verify agents are running (target: 2 min)

```bash
conga status
```

Expected: at least one agent showing as running.

```bash
conga gateway open
```

Expected: web UI opens in browser, agent is reachable.

---

## Step 4: Run the workshop prompt (target: 5 min)

In the gateway (or Slack if configured), send this to an agent:

> "I want to deploy a design system linting agent fleet — one agent per platform: web, native, and email. Configure isolation policies that mirror a design system governance model where web is the source of truth and native/email inherit but can't push changes upstream. What would the policy file look like?"

**Check:** does the agent respond usefully? Does it understand the governance framing?

---

## Step 5: Test the policy flow (target: 3 min)

```bash
cp conga/conga-policy.yaml.example conga/conga-policy.yaml
# Make one change — add or remove a domain from egress.allowed_domains
conga policy validate
conga policy deploy
```

**Check:** does validate catch errors clearly? Does deploy succeed? This is what participants will be doing — the error messages need to be readable.

---

## What to document after the dry run

Note how long each step actually took, and flag:

- Any step that required knowledge not in `ADVANCED.md`
- Any error message that wasn't self-explanatory
- Anything that required Aaron to intervene that participants couldn't self-resolve from the triage card

Send findings to Amber before June 9 so there's time to update the docs.

---

## If something breaks

That's the point of the dry run. Document what broke and either:
1. Fix the config and re-test, or
2. Add it to the triage card so facilitators know what to expect

Contact: amber@knapsack.cloud
