#!/bin/bash
file=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.file_path // empty' 2>/dev/null)
if [ -n "$file" ] && echo "$file" | grep -q '\.md$' && [ -f "$file" ]; then
  npx mdbase validate "$file" 2>&1 || true
fi
