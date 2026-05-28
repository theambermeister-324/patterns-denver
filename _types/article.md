---
name: article
description: "A wiki article about a concept, entity, or theme"
fields:
  title:
    type: string
    required: true
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
    description: "Paths to files in sources/"
  tags:
    type: list
    items:
      type: string
---

Wiki articles are the core pages of the knowledge base. One per concept or entity.
