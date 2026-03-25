# Astro Blog

## Build & Deploy
- `npm run build` — Astro 6 static build, ~550 pages, ~130s
- Deploy: Cloudflare Workers & Pages
- Node 22.12.0+ required (Astro 6)

## Architecture
- 3-language blog (ko/en/it) with manual routing (`/blog/ko/`, `/blog/en/`, `/blog/it/`)
- `DEFAULT_LANG = 'en'` in `src/consts.ts` — controls homepage, RSS, search, blog cards
- KO posts are `index.md`, EN/IT are `index.en.md`/`index.it.md` with `translationOf` field
- Shared layout: `src/layouts/blog-post-layout.astro` — all 3 lang pages delegate to this
- OG images: satori + @resvg/resvg-js, generated at build time per language

## Content
- Posts: `src/content/blog/{slug}/index.md` + `index.en.md` + `index.it.md`
- Use `getLocalizedTitle(post, lang)` not `getEnglishTitle()` — language-neutral API
- Reading time: always use base post slug for consistency across languages

## Writing Style (blog posts)
- Dry, first-person, hedging tone — see `.claude/skills/blog-post-writer/SKILL.md`
- No em-dashes in sentences, no past-tense section headers, no abbreviations (write full names)
- Check `.claude/skills/blog-post-writer/references/anti-patterns.md` after writing

## Skills
- `/blog-post-writer` — write blog posts in 3 languages
- `/astro-dev` — Astro 6 guardrails (20 patterns agents get wrong)

## Git
- Branch protection on master — always use PRs
- PR assignee: gigio1023
