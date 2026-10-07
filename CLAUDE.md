# Astro Blog

## Build & Deploy
- `npm run build` — `astro check` plus Astro 7 static build, ~560 pages, about 2 minutes
- Deploy: Cloudflare Workers & Pages
- Node 22.12.0+ required (Astro 7)

## Architecture
- 3-language blog (ko/en/it) with manual routing (`/blog/ko/`, `/blog/en/`, `/blog/it/`)
- `DEFAULT_LANG = 'en'` in `src/consts.ts` — controls homepage, RSS, search, blog cards
- KO posts are `index.md`, EN/IT are `index.en.md`/`index.it.md` with `translationOf` field
- Shared layout: `src/layouts/blog-post-layout.astro` — all 3 lang pages delegate to this
- OG images: satori + @resvg/resvg-js, generated at build time per language

## Content
- Posts: `src/content/blog/{slug}/index.md` + `index.en.md` + `index.it.md`
- Titles: use `getLocalizedTitle(post, lang)` from `src/lib/data-utils.ts` (language-neutral)
- Reading time: always use base post slug for consistency across languages

## Writing Style (blog posts)
- Dry, first-person, evidence-led tone; hedge only when the evidence is incomplete. See `.agents/skills/blog-post-writer/SKILL.md`
- No decorative em dashes; short, noun-like section headings
- Run the passes in `.agents/skills/blog-post-writer/references/slop-review.md` and check `references/anti-patterns.md` after writing

## Skills
- Canonical skill directory: `.agents/skills/`; `.claude/skills` and `.codex/skills` are symlinks to it
- `/blog-post-writer` — write blog posts in 3 languages (in this repo)
- `/astro-dev` — Astro 7 guardrails from [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill). Not vendored here; install with `npx skills add gigio1023/astro-dev-skill@astro-dev`

## Git
- `master` ruleset requires a PR — always use PRs
- PR assignee: gigio1023
