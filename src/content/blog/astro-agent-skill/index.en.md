---
title: "I Made an Agent Skill for My Astro Blog"
description: "Agents kept getting Astro 6 patterns wrong, so I put together a skill."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "dev-tools"]
draft: false
lang: en
translationOf: "astro-agent-skill"
---

- Agents generate outdated Astro patterns without knowing Astro 6's breaking changes.
- The Astro Docs MCP only works when the agent asks, and agents don't ask when they think they're right.
- So I made an Agent Skill that the agent references before generating code.

---

This blog is built with Astro. When working on it with Claude Code or Cursor, I noticed agents repeatedly generate incorrect Astro code. Astro 6 introduced significant breaking changes, but agents have mostly been trained on Astro 3/4/5 era code, so they generate old patterns without realizing they're wrong.

I also use the Astro Docs MCP, but MCP only activates when the agent asks a question. When an agent writes `entry.render()`, it doesn't ask MCP "has this API changed?" It's confident the pattern is correct and just generates the code. If MCP answers "how do I use this?", what I needed was something that says "not like that."

So I made an Agent Skill. It's essentially a set of guidelines the agent references before generating code, and it complements MCP rather than replacing it.

## What Agents Repeatedly Get Wrong

A few representative examples make the situation clear.

In Astro 6, `render()` changed from an entry method to a standalone function. Ask an agent to render a blog post and it will almost certainly use `post.render()`.

```ts
// what the agent generates
const { Content } = await post.render()

// what changed in Astro 6
import { render } from 'astro:content'
const { Content } = await render(post)
```

`Astro.glob()` was removed entirely in Astro 6, but agents still use it when fetching post lists.

```ts
// removed API
const posts = await Astro.glob('./posts/*.md')

// Content Collections is the replacement
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

Astro 6 ships Zod 4, where both the import path and validator chaining have changed.

```ts
// Zod 3 syntax
import { defineCollection, z } from 'astro:content'
z.string().email()

// Zod 4 syntax
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

Content Collections now require an explicit `loader`, and the config file moved from `src/content/config.ts` to `src/content.config.ts`.

```ts
// doesn't work without a loader
const blog = defineCollection({ schema: z.object({...}) })

// loader is required, schema is a function
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

I've cataloged about 20 patterns like these, including Tailwind v4's CSS-native config, agents applying `client:load` to every component, and event listeners breaking under `<ClientRouter />`.

---

## Design Principles

I drew heavily from Thariq's [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378), which summarizes how Anthropic uses hundreds of skills internally. A few points applied directly.

### Don't State the Obvious

Claude already knows a lot about coding, so skills should focus on information that pushes it out of its default thinking. In this skill, that became the guardrails. Rather than general explanations like "this is how Content Collections work," each guardrail targets a specific point where agents actually fail: "when you're about to use `Astro.glob()`, that API was removed." Repeating what the agent already knows just wastes context.

### Build a Gotchas Section

The highest-value content in any skill is the gotchas section, built from actual failure points and updated over time. The 20 guardrails in this skill were all created this way. I didn't design 20 guardrails upfront. Each one was added after watching an agent get something wrong.

### Use the File System & Progressive Disclosure

A skill is a folder, not just a markdown file. The file system itself serves as progressive disclosure. In this skill, SKILL.md is the entry point with guardrails and a router, while detailed references live in 9 separate files under `references/`. The router in SKILL.md directs the agent to the right file based on the task. Loading everything at once just inflates context, so only the relevant module gets read.

### Avoid Railroading Claude

Being too specific in instructions removes the agent's ability to adapt. This skill tells the agent "this is the wrong pattern, here's the correct one" and leaves actual application to the agent's judgment. For example, the `client:` directive guide provides a decision tree but lets the agent make the final call based on component context.

---

## Skill Structure

```
skills/astro-dev/
├── SKILL.md                    # Entry point. 20 guardrails + router
├── references/
│   ├── astro-core-patterns.md  # Core APIs, styles, scripts, middleware
│   ├── content-collections.md  # Build/live collections, loaders, Zod 4
│   ├── blog-recipes.md         # RSS, pagination, tags, SEO, TOC
│   ├── tailwind.md             # Vite plugin, CSS theming, Fonts API
│   ├── islands-and-hydration.md
│   ├── actions-and-forms.md
│   ├── view-transitions.md
│   ├── server-features.md
│   └── doc-endpoints.md        # MCP setup, LLM-optimized doc URLs
└── templates/
    ├── astro.config.ts
    ├── content.config.ts
    └── global.css
```

Guardrails live in SKILL.md. Detailed references are split by topic under `references/`. Multi-concept blog patterns (RSS, pagination, tag pages with nested pagination, Shiki dark mode, MDX component overrides, reading time, table of contents, prev/next navigation) are collected in `blog-recipes.md`. These involve several concepts interacting, so a single MCP search doesn't produce working code.

Decision frameworks for choices like `client:load` vs `client:idle` vs `client:visible`, Actions vs API routes, and prerender vs on-demand are also included. The `templates/` directory has drop-in config files for Astro 6 + Tailwind v4.

---

## Usage

For Claude Code, clone to your skills directory and add the path to your CLAUDE.md.

```bash
git clone https://github.com/gigio1023/astro-dev-skill.git ~/.claude/skills/astro-dev-skill
```

Using it alongside the Astro Docs MCP gives you a setup where MCP handles doc searches and the skill handles guardrails and recipes.

```json
{
  "mcpServers": {
    "astro-docs": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/astro-docs-mcp"]
    }
  }
}
```

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)
