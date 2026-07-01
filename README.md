# astro-blog

Personal multilingual Astro blog for [sunghogigio.com](https://sunghogigio.com).

This repository is a static blog built on Astro 7. It publishes Korean,
English, and Italian posts, generates branded social preview images during the
build, and deploys to Cloudflare Pages.

## Highlights

- Astro 7 static site with MDX, React islands, Tailwind CSS v4, and shadcn/ui
- Trilingual blog routing for Korean, English, and Italian posts
- Build-time Open Graph image generation for every published post
- Branded default social preview assets for pages without explicit images
- JSON-LD structured data for posts, breadcrumbs, homepage, about page, FAQ, and
  how-to content
- Client-side full-text search backed by a prerendered FlexSearch index
- RSS, sitemap, tags, pagination, view transitions, newsletter, comments, and
  analytics hooks
- Agent writing workflow with one canonical skill directory under `.agents`

## Tech Stack

| Area | Stack |
| --- | --- |
| Framework | Astro 7 |
| UI | React 19, Radix UI, shadcn/ui-style components |
| Styling | Tailwind CSS v4 |
| Content | Astro Content Collections, Markdown, MDX |
| Markdown pipeline | `@astrojs/markdown-remark` `unified()` with remark/rehype plugins |
| Code blocks | Expressive Code, Shiki |
| Diagrams and math | Mermaid remark plugin, KaTeX |
| Search | FlexSearch |
| OG images | Satori, Resvg |
| Hosting | Cloudflare Pages |

## Getting Started

```bash
git clone https://github.com/gigio1023/astro-blog.git
cd astro-blog
npm install
npm run dev
```

The development server uses the Astro config default:

```text
http://localhost:1234
```

## Scripts

```bash
npm run dev       # Start the local Astro dev server
npm run build     # Run astro check, then build the static site
npm run preview   # Preview the production build locally
npm run prettier  # Format Astro, TypeScript, TSX, and CSS files
```

`npm run build` is the main validation command. It runs `astro check` first, so
type errors, Astro warnings, and content schema problems should be fixed before
deploying.

## Configuration

Main site settings live in `src/consts.ts`.

Use this file for:

- Site title, description, canonical origin, author, and locale
- Default display language
- Navigation links
- Social links
- Analytics, comments, and newsletter environment variable wiring

Astro, Markdown, syntax highlighting, and integration setup lives in
`astro.config.ts`.

## Environment Variables

All environment variables are optional. Without them, the site still builds and
publishes static pages.

```env
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PUBLIC_DISQUS_SHORTNAME=your-shortname
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=3
BREVO_TEMPLATE_ID=5
```

Notes:

- `PUBLIC_DISQUS_SHORTNAME` has no theme fallback. If it is unset, comments stay
  disabled instead of falling back to unrelated branding.
- Brevo variables are only needed for newsletter subscription handling.

## Content Model

Blog posts live under `src/content/blog`.

Typical translated post layout:

```text
src/content/blog/my-post/
  index.md       # Korean or source post
  index.en.md    # English translation
  index.it.md    # Italian translation
```

Supported frontmatter fields:

```yaml
title: "Post title"
description: "Short summary used for SEO and previews"
date: 2026-07-01
tags: ["agent", "dev-tools"]
authors: ["Sungho Park"]
lang: "en"
translationOf: "my-post"
draft: false
image: "./optional-explicit-image.png"
order: 1
```

Important conventions:

- `lang` must be `ko`, `en`, or `it`.
- `translationOf` links translated variants to the canonical slug.
- `draft: true` excludes a post from generated routes and generated OG images.
- `image` is optional. If it is omitted, the site automatically uses the
  generated branded post OG image.
- Nested files can be used for series/subposts. `order` controls custom ordering.

## Social Previews

Social preview behavior is intentionally automatic.

- Every published blog post gets a generated image at
  `/og/blog/{lang}/{slug}.png`.
- `src/components/post-head.astro` uses that generated image as the default
  `og:image` and `twitter:image`.
- If a post defines an explicit `image`, that image overrides the generated one.
- Non-post fallback branding lives in `public/og-default.png`.
- The web app manifest branding lives in `public/site.webmanifest`.

Cloudflare Pages does not need a special OG environment variable. The OG route is
prerendered during the static build through `getStaticPaths`, so generated images
are included in the build output by default.

## Agent Skills

Agent skills have one source of truth:

```text
.agents/skills/
```

Tool-specific directories route to that canonical location through symlinks:

```text
.claude/skills -> ../.agents/skills
.codex/skills  -> ../.agents/skills
```

Do not add real skill files under `.claude/skills` or `.codex/skills`. Add and
edit skills only under `.agents/skills`, then let Claude and Codex resolve the
same files through their symlinked paths.

Current local skill:

```text
.agents/skills/blog-post-writer/
  SKILL.md
  references/
  templates/
```

If symlinks are damaged, recreate them from the repository root:

```bash
rm -rf .claude/skills .codex/skills
mkdir -p .claude .codex
ln -s ../.agents/skills .claude/skills
ln -s ../.agents/skills .codex/skills
```

## Project Structure

```text
.agents/                 # Canonical agent skills
.claude/skills           # Symlink to ../.agents/skills
.codex/skills            # Symlink to ../.agents/skills
functions/               # Cloudflare Pages Functions
public/                  # Static assets, fonts, manifest, default OG image
src/components/          # Astro and React components
src/content/             # Blog, author, and project collections
src/layouts/             # Page and post layouts
src/lib/                 # Data utilities and shared helpers
src/pages/               # Routes, RSS, search index, generated OG images
src/plugins/             # Custom remark plugins
src/styles/              # Global styles
```

## Deployment

The site is designed for Cloudflare Pages.

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

Cloudflare should not need extra configuration for generated OG images, RSS, the
sitemap, or static routes. Optional analytics, comments, and newsletter features
can be enabled by setting the environment variables listed above.

## Validation Checklist

Before merging meaningful changes:

```bash
npm run build
```

For social preview changes, also inspect the built HTML for a representative
post and confirm:

- `og:image` points to `/og/blog/{lang}/{slug}.png` unless the post has an
  explicit `image`.
- `twitter:image` matches `og:image`.
- No unrelated theme branding appears in metadata, manifest, or default images.

## Credits

This project started from the erudite theme lineage:

- [astro-erudite](https://github.com/jktrn/astro-erudite) by
  [@jktrn](https://github.com/jktrn)
- [merox-erudite](https://github.com/meroxdotdev/merox-erudite) by
  [@meroxdotdev](https://github.com/meroxdotdev)
- [Astro Micro](https://astro-micro.vercel.app/) by
  [trevortylerlee](https://github.com/trevortylerlee)

The current repository keeps that foundation but customizes the site for Sungho
Park's blog identity, multilingual publishing, Cloudflare Pages deployment, and
agent-assisted writing workflow.

## License

[MIT](LICENSE)
