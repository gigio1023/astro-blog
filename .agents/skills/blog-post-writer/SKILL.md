---
name: blog-post-writer
description: "Write, edit, translate, or substantially revise posts for this Astro blog under src/content/blog. Use when the user gives notes, opinions, technical findings, logs, drafts, or asks to reduce AI slop in blog writing. Covers Korean, English, and Italian post variants, frontmatter, blog voice, source grounding, and final anti-slop review."
---

# Blog Post Writer

Write posts for this repository, not generic technical content. Preserve the author's dry, first-person, evidence-led style and remove AI slop before finishing.

## Core Workflow

1. Read the user's raw material and identify the actual claim, not just the topic.
2. Read 2-3 nearby or recent posts in `src/content/blog/` to match current structure and tone.
3. Check existing tags before adding a new one.
4. Draft the source-language post first. Use Korean when the user writes in Korean unless they ask otherwise.
5. Create or update translations only when the task calls for all language variants or the existing post already has variants.
6. Run the review passes in `references/slop-review.md`.
7. Read `references/anti-patterns.md` and remove matching patterns.
8. For English output, also read `references/english-voice-guide.md`.
9. Validate frontmatter and build with `npm run build` when files changed.

## Writing Priorities

- Start from the user's concrete experience, logs, numbers, failures, decisions, or tradeoffs.
- Prefer one specific observation over broad commentary.
- Keep claims traceable. If a claim depends on a source, link it or say where it came from.
- Keep uncertainty visible when evidence is incomplete.
- Delete paragraphs that only summarize the topic, praise the tooling, or announce what the post will do.
- Do not write SEO filler. Helpful, original, people-first content matters more than keyword coverage.

## Post Files

Use this layout for a translated post:

```text
src/content/blog/{slug}/
├── index.md
├── index.en.md
└── index.it.md
```

Use only the variants requested by the task when editing an existing post. If a post already has translations, keep them in sync unless the user explicitly scopes the edit to one language.

## Frontmatter

Use the schema from `src/content.config.ts`.

Korean or source post:

```yaml
---
title: "제목"
description: "짧은 설명"
date: "YYYY-MM-DDTHH:mm:ss+09:00"
tags: ["agent"]
draft: false
lang: ko
---
```

Translated post:

```yaml
---
title: "Title"
description: "Short description"
date: "YYYY-MM-DDTHH:mm:ss+09:00"
tags: ["agent"]
draft: false
lang: en
translationOf: "slug"
---
```

Rules:

- `lang` must be `ko`, `en`, or `it`.
- `translationOf` must point to the source slug for translated variants.
- Keep date and tags aligned across translations.
- Keep `description` short and literal. Do not turn it into marketing copy.
- `image` is optional. Omit it unless the user provides a specific image; the site generates branded OG images by default.

## Tags

Prefer existing tags:

```text
agent, agent-skill, algorithm, ai-competition, computer-vision, data-viz,
dev-tools, dl, ethics, ml, ml-engineering, mlops, naver-boostcamp, nlp,
paper-review, python, pytorch, quant-trading, rabbit-hole
```

Ask before introducing a new tag unless the user explicitly names it.

## Structure

- Use a short TL;DR or bullet summary only when it adds real information. Do not force it into every post.
- Open with the concrete situation, not a definition.
- Organize by argument or debugging path, not by the order of the user's notes.
- Keep section headings short and noun-like. Avoid sentence headings that already explain the whole section.
- Use tables only for comparison.
- End when the last useful thought is done. Do not add a generic conclusion.

## Voice

- Dry, calm, first-person.
- Specific before abstract.
- Clear enough for outsiders: explain project-local names, log labels, benchmark names, and scorecard-style numbers before using shorthand.
- Hedging is allowed when earned by uncertainty. Do not use it to avoid making a point.
- Avoid superiority. Use "I used it this way" rather than "people misunderstand this."
- For company or team contexts, describe structural constraints without blaming people.
- Code and logs should appear as evidence in the story, not as tutorial filler.

## Translation

- Preserve structure and claims across languages.
- Rewrite naturally; do not translate sentence by sentence.
- Keep technical terms in English when that is the natural local usage: `agent`, `skill`, `guardrail`, `MCP`, `RAG`, `benchmark`.
- English should be plain and slightly dry.
- Italian should be natural prose, not formal bureaucratic Italian.

## References

| File | Read when | Purpose |
| --- | --- | --- |
| `references/slop-review.md` | Before finalizing any draft or rewrite | Evidence, originality, voice, and source-grounding review passes |
| `references/anti-patterns.md` | After drafting | Search-and-destroy list for Korean and English AI slop |
| `references/english-voice-guide.md` | For English writing/review | English voice examples and anti-patterns |
| `templates/` | When creating a new post | Minimal frontmatter templates |
