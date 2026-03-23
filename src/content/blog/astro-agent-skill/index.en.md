---
title: "I Made an Agent Skill for My Astro Blog"
description: "Agents kept getting Astro 6 patterns wrong, so I put together a skill."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "agent-skill"]
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

I referenced Thariq's [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378) while putting this together. It covers how Anthropic runs hundreds of skills internally. Beyond the basics like gotchas-first structure and progressive disclosure, a few points were worth noting.

**The description field is for the model.** When a Claude Code session starts, it scans every installed skill's description to decide "is there a skill for this request?" The description isn't a human-readable summary — it's the trigger condition for the model. After reading this, I rewrote the description to be quite long and specific.

```yaml
description: "Use when editing .astro/.mdx files, modifying astro.config.*,
  working with content collections (build-time or live),
  adding Tailwind CSS v4, using client directives (client:load/idle/visible),
  handling forms/actions with Zod 4, configuring server features
  (sessions, i18n, env vars, CSP, Cloudflare Workers),
  using view transitions or ClientRouter (<ClientRouter />),
  or setting up adapters (Node/Vercel/Netlify/Cloudflare) in an Astro project."
```

Each condition is spelled out so the skill triggers automatically when the agent touches `.astro` files or modifies `astro.config`. A vague description like "Astro development helper" makes the trigger timing ambiguous.

**Give the agent code so it spends turns on composition.** Including scripts or templates in a skill means the agent assembles from known-good pieces instead of reconstructing boilerplate from scratch. In this skill, the `templates/` directory has drop-in config files for Astro 6 + Tailwind v4.

```
templates/
├── astro.config.ts    # Astro 6 + Tailwind v4 + MDX + Fonts API
├── content.config.ts  # Content Collections with glob loader
└── global.css         # Tailwind v4 CSS entry point
```

When the agent sets up a project, it copies these and starts from a correct baseline. If guardrails say "don't do it like that," templates say "start from this."

The guardrails themselves were added one at a time as I watched agents fail. I didn't design 20 upfront. The article puts it well: "Most of ours began as a few lines and a single gotcha, and got better because people kept adding to them." That's exactly how it went.

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
