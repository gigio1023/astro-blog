---
title: "Hugo → Ghost → Astro: Switching blog frameworks three times"
description: "From sitemap debugging to AI-agent-driven blogging."
date: "2026-03-24T18:00:00+09:00"
tags: ["rabbit-hole", "dev-tools"]
draft: false
lang: en
translationOf: "blog-migration-hugo-ghost-astro"
---

- Hugo, Jekyll, Ghost all work as blog platforms, but in my setup, Google Search Console sitemap registration only succeeded starting with Ghost.
- Claude Code only knew Astro 3/4, so I built a separate Agent Skill.
- Trilingual routing, dynamic OG images, full-text search, and JSON-LD, all built with AI agents.

---

I've been blogging since middle school. Started on Blogger.com, moved to Tistory in high school, then built a Jekyll site on GitHub Pages. Hugo came around 2024. Hosted it on GitHub Pages, wrote some posts, everything worked, except Google Search Console wouldn't accept my sitemap. `Sitemap: couldn't fetch`. That error stuck around for months.

I assumed it was a Hugo config issue at first. Checked `enableRobotsTXT = true`, ran the sitemap through XML validators. It passed, but the content had `favicon.ico` listed as a URL and inline SVG data URIs sneaking in. Fixed those. Tried changing sitemap `<priority>` values too, but turns out Google officially treats those as ignorable hints. Went deeper and found the HTTP response for sitemap.xml was coming back `304 Not Modified` with no `Content-Type` header. Added `.nojekyll` to stop GitHub Pages' Jekyll processing. Didn't help.

Moved to Cloudflare Pages. Deployment worked fine, sitemap registration still failed. Ran a control experiment with Jekyll. Some trouble with Ruby environment setup on macOS, but got it deployed under the same conditions. Same failure. Confirmed the framework wasn't the issue.

## Custom domain

Suspecting free subdomains (`.github.io`, `.pages.dev`) were the problem, I bought `sungho-gigio.com` from Cloudflare Registrar. $10.46/year, at-cost pricing, WHOIS redaction included.

Connected the domain, registered as a Domain property in Google Search Console. Hugo + custom domain + Cloudflare Pages still didn't work. I also tried self-hosting Hugo on a personal server with Cloudflare Tunnel for external access. Same result. Jekyll + custom domain didn't work either. At this point I genuinely didn't know what was wrong.

Other people might have had zero issues with Hugo or Jekyll + a custom domain. There could have been a setting I missed, or a timing issue on Google Search Console's end. In my setup, it just didn't work.

## Ghost and sitemap

The sitemap issue resolved when I switched to Ghost. Ghost has sitemap, meta tags, and structured data built in, no configuration needed. Custom domain + Ghost + Google Search Console Domain property worked immediately.

Why it worked, I still don't know. Can't exactly reverse-engineer Google Search Console. Maybe Ghost handles SEO internals better, or maybe something changed on Google's side between attempts. The only certainty is the problem disappeared when I moved to Ghost.

Ghost appealed for other reasons too. The WYSIWYG editor with instant preview for Markdown cards, images, and math. And I had a free Oracle Cloud ARM64 instance (4 OCPU, 24GB RAM) already, so self-hosting was essentially free.

## A blog on k8s

Self-hosting Ghost meant the infrastructure grew. k3s on Oracle Cloud ARM64, GitOps with Argo CD + Kustomize, secrets in Vault + SOPS, Cloudflare Tunnel for exposure, Zero Trust for admin protection, Prometheus + Grafana + Loki for monitoring. All for one blog. Good for learning infrastructure, but I was drifting further from writing.

```mermaid
flowchart LR
  A[User] --> B[Cloudflare CDN]
  B --> C[Cloudflare Tunnel]
  C --> D[Ingress-NGINX]
  D --> E[Ghost]
  E --> F[MySQL 8]
```

One thing I confirmed: Cloudflare's free tier is generous. Tunnel, Zero Trust (50 users), DNS, Access, SSL, Email Routing. All free.

## Why Astro

Starting late 2025, I was spending more time with tools like Claude Code. Ghost's WYSIWYG editor is great when a human writes in a browser, but it doesn't fit a workflow where agents need to read and write Markdown files directly. Ghost's Admin API exists but is limited.

I'd originally picked Ghost for the "writing experience," but the one doing the writing shifted from me to AI, and that criterion stopped mattering. Went back to Astro, the thing I was recommended in the first place. Markdown file-based, so agents work with it freely. Static site, no k8s. Deploy to Cloudflare Workers & Pages and done.

## What I built with agents

Before, the best I could do was wait for Hugo or Jekyll theme authors to push updates, or study the framework and barely manage to tweak a TOC UI. After moving to Astro and working with Claude Code and Codex, I could implement and deploy almost every requirement I noticed or thought of. Started from a forked astro-erudite theme, and ended up building a lot on top of it.

Trilingual i18n with per-language routes (`/blog/ko/`, `/blog/en/`, `/blog/it/`), `translationOf` frontmatter linking, language switcher on every post, hreflang tags, and an English-first RSS feed.

Dynamic OG images generated at build time with satori + resvg-js. Pretendard for Korean, Geist for English, adaptive title sizing. One image per language variant per post.

Full-text search powered by FlexSearch with a prerendered JSON index, fuzzy matching, keyboard navigation, search history, and localStorage caching.

JSON-LD structured data (BlogPosting, BreadcrumbList, WebSite, Person) applied by page type. Plus a series/subpost system, Mermaid diagrams, and KaTeX math rendering.

Along the way, Cloudflare Pages got reorganized into Cloudflare Workers & Pages, making wrangler-based builds mandatory. Issues like these got resolved in a few iterations. Back when I was blogging on Blogger.com, these would have been insurmountable troubleshooting tasks.

## Astro 6 and the Agent Skill

One problem came up during all this. Claude Code generates Astro 3/4/5 patterns. `post.render()` instead of the standalone `render(post)`, collections without the now-required `loader`, Zod 3 imports instead of Zod 4. The Astro Docs MCP doesn't help because agents don't ask when they think they're right.

So I built a separate Agent Skill, a set of guardrails the agent references before generating code. Lessons learned from trial and error accumulate as guides, so the same mistakes don't repeat.

```bash
npx skills add gigio1023/astro-dev-skill
```

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill) / Related post: [Agent Skill for Astro Blog](/blog/en/astro-agent-skill)

## What each framework taught me

| Framework | What I learned |
|-----------|---------------|
| Hugo | Sitemap debugging, HTTP header analysis, isolating causes through control experiments |
| Jekyll | The pain of macOS Ruby setup, confirming framework wasn't the cause |
| Ghost (k8s) | k3s, Argo CD, Vault + SOPS, Cloudflare Tunnel/Zero Trust, monitoring |
| Astro | AI-agent-driven development, i18n, OG image generation, structured data |

Looking back, ChatGPT recommended Astro from the start and I picked Ghost instead. Came back to Astro a year and a half later. The Cloudflare ecosystem and k8s experience I picked up along the way wasn't wasted, though.
