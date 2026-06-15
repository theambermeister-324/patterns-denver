---
name: spec
description: "A section of an application spec built through the /spec skill"
match:
  path_glob: "wiki/specs/**/*.md"
fields:
  title:
    type: string
    required: true
  spec_app:
    type: string
    required: true
    description: "Kebab-case slug for the application being spec'd"
  section:
    type: enum
    values: [problem, users, goals, flows, features, constraints, nonfunctional, open-questions, contested-points, index, summary]
  contributors:
    type: list
    items:
      type: string
    description: "Names of SMEs who contributed to this page"
  created:
    type: date
    generated: now
  updated:
    type: date
    generated: now_on_write
  sources:
    type: list
    items:
      type: string
---

Spec pages are created by the /spec skill during interactive application spec sessions. Each page covers one dimension of the spec: problem, users, goals, flows, features, constraints, or open-questions. The index page is a coverage dashboard. The contested-points page tracks disagreements between contributors. Do not create spec pages manually — use /spec.
