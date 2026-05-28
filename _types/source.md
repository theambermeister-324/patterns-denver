---
name: source
description: "A record tracking an ingested source file"
match:
  path_glob: "sources/**/*.md"
fields:
  title:
    type: string
    required: true
  origin_url:
    type: string
    description: "Original URL if sourced from the web"
  ingested:
    type: date
    generated: now
  file_type:
    type: enum
    values: [article, paper, notes, data, image, other]
  summary:
    type: string
    description: "One-line summary of the source"
---

Source records are created automatically during ingestion. They sit alongside the original file in sources/ (as a sidecar .md if the source is non-markdown like PDF).
