# astro-blog

Multilingual (ko/en/it) Astro blog with dynamic OG image generation, structured data (JSON-LD), and SPA-like view transitions.

**Live**: [sunghogigio.com](https://sunghogigio.com)

---

## What This Is

A fork of [merox-erudite](https://github.com/meroxdotdev/merox-erudite) (itself built on [astro-erudite](https://github.com/jktrn/astro-erudite)). The base themes provide Astro Islands, shadcn/ui components, Tailwind styling, MDX authoring, Expressive Code blocks, view transitions, multi-author support, tag system, RSS/sitemap, newsletter (Brevo), Disqus comments, analytics (GA4/Umami), and AdSense integration.

Everything listed below is what was built on top of that foundation.

## What I Added

### Trilingual i18n

- Three languages: Korean (default), English, Italian
- Per-language routes (`/blog/ko/`, `/blog/en/`, `/blog/it/`) with dedicated page files
- Translation linking via `translationOf` frontmatter field
- Language switcher component on every post
- `hreflang` alternate tags with `x-default` fallback
- Dynamic `<html lang>` attribute matching each page's actual language
- English-first RSS feed with fallback to base post data

### Dynamic OG Images

- Build-time generation with [satori](https://github.com/vercel/satori) + [@resvg/resvg-js](https://github.com/yisibl/resvg-js)
- Nebula-style gradient background with paw watermark
- Multilingual font stack: Geist (Latin) + Pretendard (Korean)
- Adaptive title size based on character count
- One image generated per language variant per post

### Full-Text Search

- Client-side search powered by [FlexSearch](https://github.com/nicola-cal/flexsearch)
- Prerendered JSON index covering title, description, tags, and full content
- Fuzzy matching with relevance scoring (exact > prefix > contains)
- Keyboard navigation, search history (last 10), contextual snippet extraction
- localStorage caching for instant subsequent loads

### Structured Data (JSON-LD)

- `BlogPosting` on every post (headline, author, publisher, dates, keywords)
- `BreadcrumbList` with positional items on all navigable pages
- `WebSite` and `Person` schemas on homepage and about page
- Reusable `FAQPage` and `HowTo` schema components for rich snippet eligibility

### Series / Subpost System

- Parent-child post relationships via folder nesting (`post/index.md` + `post/sub.md`)
- Sidebar + header navigation showing all posts in a series
- Combined reading time aggregated across parent and children
- Merged table of contents spanning subposts
- Custom ordering via `order` frontmatter field

### SEO Meta Architecture

- Deduplicated meta tags: `head.astro` skips OG/Twitter/canonical when `post-head.astro` provides article-specific versions (`skipMeta` prop)
- `og:type` correctly set to `"article"` on posts, `"website"` on other pages (no conflicts)
- `article:published_time`, `article:modified_time`, `article:tag` meta tags
- Language-specific `og:locale` and `og:locale:alternate`
- `og:image` dimensions and `twitter:url` on article pages

### Content Rendering

- Mermaid diagrams via custom remark plugin + client-side CDN rendering (theme-aware, dark/light)
- KaTeX math rendering with on-demand CSS loading (only when `.katex` elements detected)
- Both re-initialize correctly on view transition navigations via `astro:page-load`

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build/) |
| UI | [shadcn/ui](https://ui.shadcn.com/) + [React](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Content | [MDX](https://mdxjs.com/) + Astro Content Collections |
| OG Images | [satori](https://github.com/vercel/satori) + [resvg](https://github.com/yisibl/resvg-js) |
| Code Blocks | [Expressive Code](https://expressive-code.com/) + [Shiki](https://shiki.style/) |
| Search | [FlexSearch](https://github.com/nicola-cal/flexsearch) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |

## Getting Started

```bash
git clone https://github.com/gigio1023/astro-blog.git
cd astro-blog
npm install
npm run dev     # localhost:1234
```

### Environment Variables (all optional)

```env
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PUBLIC_DISQUS_SHORTNAME=your-shortname
BREVO_API_KEY=xkeysib-...
BREVO_LIST_ID=3
BREVO_TEMPLATE_ID=5
```

### Configuration

Edit `src/consts.ts` for site metadata, navigation, and social links.

## Project Structure

```
src/
  content/blog/       # Posts (index.md + index.en.md + index.it.md per slug)
  pages/blog/{ko,en,it}/  # Language-specific post routes
  pages/og/           # satori OG image generation
  pages/api/          # Search index endpoint
  components/         # Astro + React components
  plugins/            # Custom remark plugins (Mermaid)
  lib/                # Data utilities, helpers
functions/            # Cloudflare Pages Functions (newsletter)
```

## Credits

This project builds on excellent open-source work:

- **[astro-erudite](https://github.com/jktrn/astro-erudite)** by [@jktrn](https://github.com/jktrn) — the original theme that established the design system, component architecture, and content collection patterns
- **[merox-erudite](https://github.com/meroxdotdev/merox-erudite)** by [@meroxdotdev](https://github.com/meroxdotdev) (Robert Melcher) — added newsletter, Disqus, analytics, AdSense, and accessibility improvements
- **[Astro Micro](https://astro-micro.vercel.app/)** by [trevortylerlee](https://github.com/trevortylerlee) — the original inspiration for the erudite lineage

The foundation these contributors built made everything above possible.

## License

[MIT](LICENSE)
