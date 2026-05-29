# Patterns Sandbox Workshop — Denver

**Date:** June 11, 2026
**Event:** Patterns Denver
**Knapsack facilitators:** Amber Atkins, Angie Stevenson
**Co-facilitators:** Aaron Stone, CEO — Crux Digital (CongaLine sandbox); Nate Wearin — FuegoUX
**Status:** Draft v2

---

## Objective

Give design system practitioners at Patterns Denver a hands-on session with agentic AI infrastructure — not a demo, not a deck. Participants deploy a real AI agent fleet using Crux Digital's open-source CongaLine platform, tethered to a problem they named themselves.

The deeper goal: help practitioners understand what "agentic workflows" actually means from the inside, so they can lead their organizations toward it with confidence instead of anxiety. CongaLine makes the invisible (agent deployment, isolation, secrets, messaging integrations) visible and touchable. If participants leave still calling this "scary," the session failed.

**What makes Denver different from Minneapolis:** Crux Digital is in the room as a peer, not a vendor. They're bringing their own story — how they built CongaLine, why they open-sourced it, what they learned running agent fleets in production. That practitioner-to-practitioner credibility is the asset. Protect it. Don't turn it into a pitch.

---

## Who's in the Room

| Name | Role | Organization | What's keeping them up at night |
|---|---|---|---|
| Eric Leckband | Senior Designer – Native \| Reveille Design System | USAA | Adoption methods across platforms; rollout strategies for a new brand across multiple platforms |
| Meghan Morris | Design System Lead | Aetna/CVS Health | Educating product teams and designers to use the design system without feeling stifling; protecting space for important work amid constant new priorities |
| Tony Walt | Sr. Director | Spectrum/Charter Communication | Navigating AI in design — curious observer, no current pain points |
| Patrick Farrell | UX Architecture & Strategy Lead | M&T Bank | Scaling the design system operating model; adapting to multi-platform; using structured content for automation and documentation |
| Rachael Greene | Principal Designer, Design Systems | SageSure | Getting the design system AI-ready; consistent brand-aligned AI outputs; AI prototyping for user testing and POCs |
| Chris Holder | Chief Product Officer | Spirence | Balancing ethics in using persuasive patterns to actually help users in a mental health platform |
| Bridget Higgins | Lead UX Design | Engrain | Collaborating with PMs; thoughtful AI-tooling use; pushing design across the org |
| Rebecca Fanning | VP, Experience Design | Engrain | Workflows and collaboration between AI-emergent Product and Design teams |
| Tambralyn Peterson | UX Manager of Design and Research | Allegion | How handoff is changing with AI; measurable gains in product design workflows; skills for AI-assisted UX; design system + AI to accelerate production-ready UI; future of the designer role |
| Lex ReganHolzheimer | Sr UX Designer | ADP | Folding AI into workflow (especially images, icons, illustrations); balancing many products |
| Connie Benedict | Sr. UX Architect | Independent Consulting | Metrics for measuring design system success after implementation |
| Julian Hartnett | Design Manager | Maxio | Design system enablement in agentic workflows |
| Scott Johns | Principal Product Designer / Strategist | Intuit | SaaS collapse; cost of software production; ROI on AI; AI trust patterns; designing for users who don't want AI; avoiding AI-slop; designing for agentic AI (systems that act, not just suggest); accountability for AI-generated experiences; homogenization |
| Ari Weissman | Director of Product Design | HealthEdge | Collaboration in an AI design workflow |

**14 participants.** Two from the same company (Bridget and Rebecca from Engrain) — pair them separately in the afternoon so they get different inputs, not just each other.

---

## Maturity Spectrum

This group skews more advanced than Minneapolis. The ceiling is higher and the floor is less about "what even is AI" and more about "how do I operationalize this responsibly."

**Advanced / Agentic-ready:**
- **Scott (Intuit)** — Has already mapped the full landscape: agentic AI, SaaS collapse, accountability, homogenization. Give him a stretch prompt, not a setup tutorial.
- **Julian (Maxio)** — His exact phrase: "design system enablement in agentic workflows." He came for CongaLine specifically. He's the most direct signal-match in the room.
- **Rachael (SageSure)** — Wants AI-ready design systems and AI-generated prototypes for user testing. Technical appetite, implementation-focused.
- **Patrick (M&T Bank)** — Structured content for automation and documentation delivery. Systems thinker. Will engage with the architecture of CongaLine.

**Middle / Practical applicators:**
- **Tambralyn (Allegion)** — Deep question list but framed as "where do other teams see real gains?" Observer who wants to act. Pair her with someone who's already doing it.
- **Rebecca & Bridget (Engrain)** — Leadership + execution pairing from the same org. Separate them so each gets outside perspective. Both think in workflows and collaboration, not just components.
- **Ari (HealthEdge)** — Collaboration in AI workflows. Relational framing — how do humans and AI work together, not just what does AI output.

**Adoption / Education layer:**
- **Eric (USAA)** — Brand rollout across platforms + adoption strategy. Practical, scale-focused. Benefits from seeing how CongaLine's isolation model maps to multi-platform design system governance.
- **Meghan (Aetna)** — Team education + process protection. Her pain is organizational, not technical. The right pairing unlocks her — avoid dropping her with a power-user who'll talk past her.
- **Lex (ADP)** — AI in workflow for images, icons, illustrations. Specific and practical. Middle maturity, likely benefits from constrained starting prompt.

**Strategic / Observing:**
- **Tony (Spectrum)** — Sr. Director watching AI navigate. No stated pain. He's here to assess and learn. Let him roam. He may be the most valuable conversation in the room if you give him space rather than scaffolding.
- **Chris (Spirence)** — Ethics in dark patterns for mental health. Unique framing. CongaLine may connect if he can explore how agent behavior policies and guardrails map to ethical design constraints.
- **Connie (Independent)** — Metrics obsessed. What gets measured after implementation. She'll want to know how you'd measure outcomes from a CongaLine deployment. That's actually a great question — have an answer ready.

---

## The Concept

Same premise as Minneapolis, adapted for an agentic infrastructure sandbox:

**You already know what's scary. Let's make that the first jump.**

Crux Digital's CongaLine is the environment — an open-source platform for deploying and managing isolated AI agent fleets. Each agent gets its own container, network, secrets, and identity. Participants aren't watching agents run. They're deploying them. Connecting them to real messaging channels. Configuring policies. Seeing what breaks.

The design systems thread runs through this directly: if the future of design systems is agents that generate, lint, audit, and deliver UI — what does the infrastructure that runs those agents actually look like? CongaLine is a working answer.

**What leaves the room matters.** Every participant walks out with:
1. A running CongaLine agent they deployed themselves
2. A link to the shared gallery of what the room built
3. The practitioner anxiety map (distilled from the morning, sent within 48 hours)

---

## Agenda Arc

### Morning — Real Talk

Open with the same anonymous input format from Minneapolis: index cards or shared anonymous doc, everyone writes what's keeping them up at night before anyone speaks. Facilitators read the cards back without attribution. This neutralizes the vendor-in-the-room dynamic before it can set in.

**Facilitator stories — go first:**

- **Amber:** The Enable story — how Knapsack built an internal AI-powered sales enablement toolkit, what it took, what surprised them, and what it means for how design system teams can think about building their own AI-powered workflows.
- **Aaron Stone (Crux):** CongaLine started with an Nvidia engagement right before OpenClaw hit. His stakeholder called and said: *"Research securing open claw — that's the biggest problem we have right now."* Agents were being given access to email, calendar, GitHub — and they were doing what they *thought* was right. Reading all your email. Sending messages to the wrong people. C-suite headlines. The enterprise question: will organizations adopt this? They won't (security) or they'll be loose about it and absorb the fallout. CongaLine is the third option — zero ingress, zero egress, complete isolation, zero trust. One agent can't see the next. The UI is Slack. The real surprise: a team agent adapted to their personality and sense of humor within days. Months later, it connected a stakeholder's name to a conversation it had quietly read four weeks earlier and surfaced something no one remembered to mention. It's a team member, and it never spilled anything outside the network. His closing note: *"CongaLine is an experiment. Whatever's the right format to give people tools to play with and a problem to solve — that's my happy place."*
- **FuegoUX:** The cross-client tension brief — research, design, and dev workflows being reshaped. The anxiety of not knowing which pieces should stay manual vs. AI-assisted. Where human judgment, critical thinking, and design differentiation still matter. Framing: AI and critical thinking together for better outcomes, not just faster ones. This is the "should we" counterweight to the "how do we" technical tracks.
- **Angie:** Her own AI journey and what brought her to this work. The accessible proof point for the room.

Then the room. Cluster themes loosely. Watch for:
- The education/adoption cluster (Meghan, Eric, Lex) — they need different scaffolding than the technical cluster
- The accountability/ethics thread (Chris, Scott, Connie) — this is a rich conversation that could run the whole morning if given room
- The agentic infrastructure thread (Julian, Patrick, Rachael) — they'll want to get to the sandbox fast; let them

**Important:** don't rush the morning. The trust built here is what makes the afternoon work. If the room is still going when the break approaches, let it run.

**Capture it:** one person owns notes on the anonymous cards and verbal themes. The anxiety map that surfaces here — 14 practitioners, 10+ enterprise orgs, in their own words — is publishable content. Don't let it evaporate.

### Outdoor Break

Short, loosely structured. Reset energy before the afternoon. Give the morning conversation time to settle.

### Afternoon — Paired Sandbox Play (two tracks)

**Before pairing:** each participant writes one sentence — *"I want to see if AI can help me with ___."* Pairing happens around that sentence.

**Two tracks:**

**Advanced track** — Scott, Julian, Patrick, Rachael (and potentially Tony if he's engaged):
- Open-ended prompt. Minimal scaffolding.
- Suggested stretch problem: *Deploy a CongaLine agent fleet that runs a design system linting agent — one agent per platform (web, native, email). Configure isolation policies that mirror your organization's governance model. What breaks first?*
- They should hit real walls. That's the point.

**Curious-but-new track** — Meghan, Eric, Lex, Tambralyn, Bridget, Rebecca, Chris, Connie, Ari:
- Constrained, already-running environment. First prompt visible on load.
- Suggested starting prompt: *"Your design system has a documentation gap. You have an AI agent. What's the first thing you'd automate? Deploy it."*
- Crux Digital's quick-start (local Docker setup) is the on-ramp. Have it bookmarked on every device before participants sit down.

**Gallery wall:** all output lands in one shared space (Figma file, GitHub repo, shared URL — Crux to confirm format) by end of day. Name it before the sandbox opens: *"By the end of this session, you'll have a deployed agent in the gallery."*

Facilitators circulate. No one presents unless they want to. Session ends when time runs out, not when everything is polished.

---

## Facilitator Roles

### Amber — Host, Room Manager, Enable Story
Sets tone, opens the anonymous input round, reads cards back, manages the room energy. Shares the Enable story — building an AI-powered sales enablement toolkit inside Knapsack, what it took, and what it means for design system teams thinking about their own AI-powered workflows. Holds the clock on the morning session without cutting it too early. Afternoon: circulates as thought partner, not tech support.

### Angie Stevenson (Knapsack) — Co-Host, Curious-But-New Track Support
Partners with Amber on room management. In the afternoon, Angie is the primary support for the curious-but-new track — keeping participants unstuck without doing the work for them.

### Aaron Stone, CEO — Crux Digital — CongaLine Story, Technical Resolver
Shares the origin of CongaLine: built during Nvidia work, right when OpenClaw landed and their stakeholder called to say *"securing open claw is the biggest problem we have."* Agents were being given access to everything and doing what they *thought* was right — reading all your email, messaging the wrong people. The enterprise question: will orgs adopt this? Only in two bad ways (don't, or be loose about it). CongaLine was the third option: zero ingress, zero egress, complete isolation, zero trust. One agent can't see the next. The UI is Slack. The team agent became a genuine team member — adapted to personality within days, surfaced a months-old context thread no one remembered. He tells this as a practitioner story, not a product pitch. His honest stance: *"CongaLine is an experiment. Whatever's the right format to give people tools to play with and a problem to solve — that's my happy place."*

Owns the sandbox environment setup and the June 4 dry run. In the afternoon, Aaron is the **primary technical resolver** — when participants hit walls with the environment, Aaron has the answers Amber and Angie don't.

### Nate Wearin — FuegoUX — The "Should We" Story
Brings a cross-client strategic view on the central tension this room is living: research, design, and dev workflows being reshaped by AI — and the anxiety that comes from not knowing which pieces should stay manual versus AI-assisted. FuegoUX's morning story is the counterweight to the technical tracks: **where does human judgment, critical thinking, and design differentiation still matter?** Their framing — AI and critical thinking together for better outcomes, not just faster ones — names what Scott's AI-slop concern, Chris's ethics thread, Connie's metrics framing, and Meghan's education problem all have in common. This is the strategic, objective voice in the room.

---

## Sandbox Environment (Technical)

**Platform:** [CongaLine](https://github.com/cruxdigital-llc/CongaLine) — open-source AI agent fleet management. Go + Docker + AWS. Each agent gets its own container, network, secrets, and identity.

**Two starting configurations:**

- **Advanced:** Full CongaLine CLI. Empty agent manifest. Participants define their own fleet architecture.
- **Curious-but-new:** Pre-configured local Docker environment with one agent already running. Participants modify, extend, or redirect — no blank-screen paralysis.

**Before June 11 — required dry run:** Put someone who has never seen CongaLine before in front of the curious-but-new config alone. Time how long it takes to reach "I deployed something real." If that time exceeds 20 minutes, the afternoon is at risk. Fix it before the event, not during. **Owner: Crux Digital.**

**Triage card:** one printed page per pair. "If you're stuck, check these three things first." Keeps Crux from becoming a single point of failure when multiple pairs hit walls simultaneously.

**Fallback:** if Docker Desktop fails on a participant's machine, have a pre-provisioned remote SSH host option ready. CongaLine supports it natively.

**Onboarding resource:** CongaLine quick-start README + any Crux-recorded walkthrough. Pre-loaded and bookmarked on every device before participants sit down.

---

## Post-Workshop (48-hour window)

- **Same evening:** send the gallery URL to all participants. One link, everything everyone deployed.
- **Within 48 hours:** send the practitioner anxiety map — the anonymous morning cards, themed and lightly synthesized, with no attribution. This is the artifact that keeps the conversation alive and shows Knapsack was listening, not pitching.
- **Ongoing:** a shared thread (Slack, Discord, or email chain) so participants can continue. The peer relationship sets in this window or it doesn't.

**Owner:** Amber, with morning-notes support from co-facilitator.

---

## Unique Denver Threads

These themes were named explicitly by this group and deserve specific attention. They're richer than the Minneapolis group's anxiety map:

**The accountability gap** — Scott, Chris, and Connie all circled around accountability: who owns it when AI generates the experience? Chris comes at it from mental health ethics. Scott from a SaaS design and governance angle. Connie from a metrics perspective. This is a conversation thread worth surfacing explicitly in the morning, not letting it stay buried in individual sticky notes.

**The handoff evolution** — Tambralyn named it directly: *"How is the handoff from design to engineering changing with AI in the mix?"* This resonates with at least half the room. Crux's CongaLine is a working example of what happens when AI takes over the middle of that handoff.

**The education problem** — Meghan and Eric both want to know how to bring their organizations along. They're not behind; their organizations are. The sandbox format works for them only if the environment doesn't require them to already be technically confident. This is the hardest design problem for the afternoon.

**The agentic design system** — Julian named it cleanly: "design system enablement in agentic workflows." Rachael wants AI-ready design systems. Patrick wants automation in documentation delivery. These three are asking the same question from different angles. They should end up in the same conversation at some point.

---

## Open Questions

1. **Dry run timing** — When will Aaron / Crux run the first-timer test on the curious-but-new CongaLine config? Target: by June 4. Owner: Aaron Stone.
2. **Gallery wall platform** — What format for the shared artifact gallery? Crux should decide since they own the environment.
3. **Anonymous input format** — Index cards (analog) or shared doc (digital)? Pick one and commit before the day.
4. **Angie's facilitator story** — What personal AI moment does Angie bring to the morning opener? Nail this before June 11 so it lands clean.
5. **David Dechant (USAA) from Minneapolis** — Is Eric Leckband (also USAA) connected to David? Potential warm intro to follow up.
6. **Blog post / anxiety map publishing** — Is the Denver anxiety map going into the same publishing pipeline as the Minneapolis one?

---

## Participant Contact Reference

| Name | Company | Email | Phone |
|---|---|---|---|
| Eric Leckband | USAA | Eric.Leckband@usaa.com | 949.290.6498 |
| Meghan Morris | Aetna/CVS Health | meghan.morris23@gmail.com | 937-902-5571 |
| Tony Walt | Spectrum | tony.walt@spectrum.com | 303-246-4706 |
| Patrick Farrell | M&T Bank | pfarrell1@mtb.com | 720-708-9899 |
| Rachael Greene | SageSure | rachael.greene@sagesure.com | 720-697-8454 |
| Chris Holder | Spirence | chrislholder@gmail.com | 314-780-3252 |
| Bridget Higgins | Engrain | bhiggins@engrain.com | 706-202-2409 |
| Rebecca Fanning | Engrain | rfanning@engrain.com | 202-577-4609 |
| Tambralyn Peterson | Allegion | tambralyn.peterson@allegion.com | 303-909-2895 |
| Lex ReganHolzheimer | ADP | alexandra@regholz.com | 970-632-8110 |
| Connie Benedict | Independent | connie.benedict@gmail.com | 734-368-8468 |
| Julian Hartnett | Maxio | julian.hartnett@maxio.com | 561-523-7959 |
| Scott Johns | Intuit | scott_johns@intuit.com | 801-851-0980 |
| Ari Weissman | HealthEdge | ariel.weissman@healthedge.com | 720-225-7141 |
