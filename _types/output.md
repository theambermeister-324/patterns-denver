---
name: output
description: "A filed exploration — answer, analysis, or comparison"
match:
  path_glob: "outputs/**/*.md"
fields:
  title:
    type: string
    required: true
  created:
    type: date
    generated: now
  query:
    type: string
    description: "The original question that produced this output"
  sources:
    type: list
    items:
      type: string
---

Outputs are answers to queries that were worth keeping. They compound the knowledge base.
