---
title: "Why AI Agents Break Astro Blogs, and What I Did About It"
description: "Agents kept confidently generating broken Astro 6 code, so I built an Agent Skill."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "astro", "mcp", "claude-code", "agent-skill"]
draft: false
lang: en
translationOf: "astro-agent-skill"
---

- Agents confidently generate broken Astro code. They don't know about Astro 6 breaking changes.
- Astro Docs MCP is good, but useless when the agent doesn't bother asking.
- So I built an Agent Skill. It complements MCP, doesn't replace it.
- Here's what kept breaking and how the skill is structured.

---

This blog runs on Astro. Whenever I use Claude Code or Cursor to work on it, the generated Astro code is almost always wrong. At first I thought I was prompting badly, but after seeing the same failures over and over, it was clearly an agent-side problem.

Astro 6 shipped with significant breaking changes, but agents have been trained on overwhelmingly Astro 3/4/5 era code. From the agent's perspective, it knows these patterns and they're correct. It doesn't know what it doesn't know.

After spending way too much time debugging agent-generated code, I managed to catalog the recurring failures.

## What Agents Get Wrong, Repeatedly

### `entry.render()` doesn't work anymore

In Astro 6, `render()` changed from an entry method to a standalone function. Ask an agent to render a blog post and nine times out of ten you get this:

```ts
// what the agent generates
const { Content } = await post.render()
```

This throws something like `post.render is not a function` at runtime. If you don't know Astro well, good luck figuring out why. The correct pattern:

```ts
import { render } from 'astro:content'
const { Content } = await render(post)
```

### `Astro.glob()` was removed

Agents love using `Astro.glob()` to fetch post lists. It's been removed entirely in Astro 6.

```ts
// removed API
const posts = await Astro.glob('./posts/*.md')

// what you actually need
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

### Zod 4 syntax is different

This one's annoying. Astro 6 ships Zod 4. The import path changed and the validator chaining is different.

```ts
// what agents generate (Zod 3)
import { defineCollection, z } from 'astro:content'
z.string().email()

// Astro 6 + Zod 4
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

The odds of an agent getting this right on its own are near zero.

### Content Collections require a `loader` now

Another major change agents don't know about:

```ts
// what agents generate
const blog = defineCollection({ schema: z.object({...}) })

// loader is now required, schema is a function
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

The config file location also moved from `src/content/config.ts` to `src/content.config.ts`. Agents know none of this.

I cataloged about 20 patterns like these. Tailwind v4 switching to CSS-native config, agents slapping `client:load` on every component, event listeners breaking under `<ClientRouter />`, and so on.

---

## Why MCP Isn't Enough

I wrote about MCP in a [previous post](../agent-library-review-with-mcp). The Astro Docs MCP exists and works well enough. You can search official docs with `search_astro_docs()`, and I use it with this blog.

But MCP only works when the agent asks. When an agent writes `entry.render()`, it doesn't ask MCP "hey, has the render function changed?" It's confident the pattern is correct, so it just generates the code. That's the fundamental problem.

MCP answers "how do I use this?" What I needed was something that says "don't do it like that."

So I built an Agent Skill.

---

## What an Agent Skill Is

In short, it's a way to inject domain knowledge into an agent. Works with coding agents like Claude Code, Codex CLI, and Cursor. Think of it as guidelines the agent checks before generating code.

If MCP is the standard for external tool calls, an Agent Skill extends the agent's internal knowledge. It doesn't replace MCP. It fills the gaps MCP can't cover.

- MCP: agent asks "how do I use X?" → searches docs, returns answer
- Agent Skill: agent is about to write wrong code without asking → proactively says "that pattern is wrong"
- MCP: explains one concept per search
- Agent Skill: provides multi-concept patterns like tag pages + pagination in one shot

The conclusion was that you need both for things to actually work.

---

## How the Skill Is Structured

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

It breaks down into three parts.

**Guardrails** are the core. Beyond the 4 examples above, there are 20 total covering Tailwind v4 config, `client:` directive selection, Actions API, on-demand rendering, environment variables, ClientRouter events, and more. Every single one was added after I watched an agent get it wrong.

**Blog recipes** came from building this blog. RSS, pagination, tag pages with nested pagination, Shiki dark mode, MDX component overrides, reading time, table of contents, prev/next navigation. Nine patterns total. These involve multiple concepts interacting, so a single MCP search doesn't produce working code.

**Decision frameworks** help the agent pick the right option. When to use `client:load` vs `client:idle` vs `client:visible`, Actions vs API routes, prerender vs on-demand.

The SKILL.md also has a router that tells the agent which reference file to load based on what it's working on. Loading everything at once just wastes context, so it only reads the relevant module.

---

## How to Use It

For Claude Code, clone to your skills directory and add the path to your project's CLAUDE.md:

```bash
git clone https://github.com/gigio1023/astro-dev-skill.git ~/.claude/skills/astro-dev-skill
```

I recommend using it alongside the Astro Docs MCP. MCP handles doc searches, the skill handles guardrails and recipes:

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

I wrote in a [previous post](../agent-library-review-with-mcp) about how agent libraries still feel half-baked. Changing what agents fundamentally can do is hard, but injecting domain knowledge to reduce the "confidently wrong" problem seemed worth trying. It'd be nice if something like this existed for every framework.

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)
