---
title: "AI Agents Break Astro Code — How I Fixed It with an Agent Skill"
description: "Why AI agents confidently generate broken Astro 6 code, why MCP alone isn't enough, and how I built an Agent Skill to solve it."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "astro", "mcp", "claude-code", "agent-skill"]
draft: false
lang: en
translationOf: "astro-agent-skill"
---

- AI agents confidently generate broken Astro code. They don't know about Astro 6's breaking changes.
- The Astro Docs MCP answers questions, but it can't intercept wrong code the agent never questioned.
- An Agent Skill complements MCP — it provides guardrails, multi-concept recipes, and decision frameworks.
- Here's why I built this skill and how it's structured.

---

## The Problem: AI Agents + Astro = Guaranteed Disaster

This blog is built with Astro. When I work on it using Claude Code, Cursor, or similar tools, the code agents generate is almost always broken. Unless you're deeply familiar with Astro, you can't even tell why the generated code doesn't work.

The core issue is that agents **don't know what they don't know**. Astro 6 introduced massive breaking changes, but agents' training data is overwhelmingly Astro 3/4/5 patterns. They confidently generate outdated code without realizing it's wrong.

Here are real examples I've encountered.

### `entry.render()` → `render(entry)`

In Astro 6, `render()` became a standalone function, not an entry method.

```ts
// what agents generate (Astro 5 and earlier)
const { Content } = await post.render()

// correct Astro 6 pattern
import { render } from 'astro:content'
const { Content } = await render(post)
```

The error message isn't intuitive either, making root cause analysis difficult if you don't know Astro well.

### `Astro.glob()` Removed

When agents use `Astro.glob()`, they're calling an API that simply doesn't exist in Astro 6.

```ts
// what agents generate (removed API)
const posts = await Astro.glob('./posts/*.md')

// correct Astro 6 pattern
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

### Zod 4 Syntax Changes

Astro 6 ships Zod 4. Agents generate Zod 3 syntax.

```ts
// what agents generate (Zod 3)
import { defineCollection, z } from 'astro:content'
z.string().email()

// correct Astro 6 + Zod 4 pattern
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

The import path is different, and the validator method chaining has changed. The chance of an agent getting this right is near zero.

### Mandatory `loader` for Content Collections

```ts
// what agents generate (Astro 5 and earlier)
const blog = defineCollection({ schema: z.object({...}) })

// correct Astro 6 pattern
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

The `loader` is now required, schema takes a function form receiving helpers like `image()`, and the config file location changed from `src/content/config.ts` to `src/content.config.ts`. Agents know none of this.

I've identified about 20 such patterns.

---

## Why MCP Alone Isn't Enough

The Astro Docs MCP exists. You can search official documentation with `search_astro_docs()`, and it's well-documented. I use it with this blog too.

But MCP **only works when the agent asks**. The problem is that when an agent writes `entry.render()`, it doesn't ask MCP "how has the render function changed?" The agent is confident its pattern is correct and just generates the code.

To summarize:

| Situation | MCP | Agent Skill |
|-----------|-----|-------------|
| "How do I use paginate()?" | Searches and answers | References recipe file |
| Agent generates `entry.render()` | Agent never asks → can't intervene | Guardrail catches it proactively |
| Build tag pages with pagination | Single search returns incomplete info | Multi-concept recipe provided |
| Choose between Actions vs API routes | Explains both | Provides decision framework |

MCP answers **"how?"** while the Agent Skill says **"not like that."** They're complementary, not competing.

---

## What Is an Agent Skill?

An Agent Skill injects domain knowledge into AI agents. It works with 40+ coding agents including Claude Code, Codex CLI, and Cursor. Think of it as a set of guidelines the agent references before generating code.

If MCP is a "standard for external tool calls," an Agent Skill is "extending the agent's internal knowledge."

### Relationship with MCP

```
┌──────────────┐     ┌──────────────────┐
│  Agent Skill  │     │  Astro Docs MCP  │
│               │     │                  │
│  Guardrails   │     │  Doc search      │
│  Recipes      │     │  API reference   │
│  Frameworks   │     │  Config options   │
└──────┬────────┘     └────────┬─────────┘
       │                       │
       └───────────┬───────────┘
                   │
           ┌───────▼───────┐
           │   AI Agent    │
           │ (code gen)    │
           └───────────────┘
```

The Agent Skill improves code generation quality; MCP provides access to up-to-date documentation.

---

## Structure of astro-dev Skill

Here's the skill structure:

```
skills/astro-dev/
├── SKILL.md                    # Entry point: 20 guardrails + router
├── references/
│   ├── astro-core-patterns.md  # Core APIs, styles, scripts, middleware
│   ├── content-collections.md  # Build/live collections, loaders, Zod 4
│   ├── blog-recipes.md         # RSS, pagination, tags, SEO, TOC
│   ├── tailwind.md             # Vite plugin, CSS theming, Fonts API
│   ├── islands-and-hydration.md # Client directives, state sharing, server islands
│   ├── actions-and-forms.md    # Actions API, validation
│   ├── view-transitions.md     # ClientRouter lifecycle, FOUC prevention
│   ├── server-features.md      # Prerender/on-demand, sessions, env vars, i18n
│   └── doc-endpoints.md        # MCP setup, LLM-optimized doc URLs
└── templates/
    ├── astro.config.ts         # Astro 6 + Tailwind v4 drop-in config
    ├── content.config.ts       # Content Collections config
    └── global.css              # Tailwind v4 CSS entry point
```

### Key Components

**1. 20 Guardrails**

Patterns that agents repeatedly get wrong. Beyond the 4 shown above:

- Tailwind v4 uses CSS-native config (not JS)
- Don't slap `client:load` on every component (choose by urgency)
- Use Actions API for forms (not manual API routes)
- Cookies/sessions require on-demand rendering
- Use `astro:env` for environment variables (not `process.env`)
- With `<ClientRouter />`, use `astro:page-load` event
- And more

Each guardrail was identified from actual agent failure cases.

**2. 9 Blog Recipes**

Multi-concept patterns commonly needed in blog development. These are things agents can't properly implement from a single MCP search.

- RSS + Content Collections
- Pagination (`paginate()` + `getStaticPaths`)
- Tag pages with nested pagination (`flatMap` + `paginate()`)
- Shiki dark mode (`.astro-code` class, not `--shiki-*`)
- MDX component overrides
- SEO meta layout
- Reading time (remark plugin)
- Table of contents (headings array)
- Previous/next post navigation

**3. 4 Decision Frameworks**

Guides for choices agents tend to get wrong:

- `client:load` vs `client:idle` vs `client:visible` — decision tree based on urgency and position
- Actions vs API routes — forms/mutations use Actions, webhooks/streaming use API routes
- Prerender vs on-demand — cookies, sessions, forms, live collections require on-demand
- Adapter selection — Node/Vercel/Netlify/Cloudflare, only needed for on-demand features

---

## Quick Router

The SKILL.md includes a router that directs agents to the right reference file for their task. It's designed to load only what's needed, not everything at once.

| Task | File to read |
|------|-------------|
| Project setup / Core APIs | `astro-core-patterns.md` |
| Content Collections | `content-collections.md` |
| Blog features (RSS, pagination, etc.) | `blog-recipes.md` |
| Tailwind CSS | `tailwind.md` |
| Client directives / hydration | `islands-and-hydration.md` |
| Forms, Actions | `actions-and-forms.md` |
| View Transitions | `view-transitions.md` |
| Sessions, env vars, i18n | `server-features.md` |
| MCP setup, doc URLs | `doc-endpoints.md` |

---

## Usage

### Claude Code

```bash
# 1. Clone to skills directory
git clone https://github.com/gigio1023/astro-dev-skill.git ~/.claude/skills/astro-dev-skill

# 2. Add skill path to your project's CLAUDE.md
```

### Using with Astro Docs MCP

This skill works best alongside the Astro Docs MCP. MCP handles up-to-date doc searches; the skill handles guardrails and recipes.

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

---

## Closing Thoughts

In a [previous post](../agent-library-review-with-mcp), I discussed the immaturity of agent libraries. An Agent Skill addresses part of that problem. It doesn't change the agent's fundamental capabilities, but by injecting domain knowledge, it significantly reduces the "confidently wrong" scenarios.

If skills like this existed for every framework, the experience of developing with AI agents would improve dramatically. I've open-sourced the project — contributions and feedback are welcome.

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)
