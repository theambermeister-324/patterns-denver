---
name: meta
description: "Structural pages that organize or log the knowledge base itself"
auto_match:
  - "wiki/INDEX.md"
  - "wiki/LOG.md"
fields:
  title:
    type: string
    required: true
  description:
    type: string
  updated:
    type: date
    generated: now_on_write
---

Meta pages are structural — they describe or track the knowledge base itself rather than its subject matter. INDEX.md and LOG.md are always meta. Do not use this type for content pages about the KB's topic.
