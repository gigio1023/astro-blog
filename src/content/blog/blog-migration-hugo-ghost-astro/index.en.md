---
title: "I just wanted to register a sitemap and ended up building a k8s cluster"
description: "Six months of debugging, one domain purchase."
date: "2026-03-24T18:00:00+09:00"
tags: ["rabbit-hole", "dev-tools"]
draft: false
lang: en
translationOf: "blog-migration-hugo-ghost-astro"
---

- Spent six months debugging sitemap registration. The cause was the free subdomain.
- Built a k8s cluster to run a single blog.
- Got recommended Astro from the start, picked Ghost instead, came back a year and a half later.

---

I started a Hugo blog around 2024. Hosted it on GitHub Pages, wrote some posts, everything worked — except one thing. Google Search Console wouldn't accept my sitemap. `Sitemap: couldn't fetch`. Six months, no fix.

I went through Hugo's SEO settings, checked robots.txt, ran the sitemap through validators, inspected HTTP response headers. 304 Not Modified here, missing Content-Type there, favicon.ico sneaking into the sitemap XML. Fixed each thing that looked wrong. Nothing changed. Moved to Cloudflare Pages. Same result.

I started wondering if Hugo itself was the problem, so I set up a control experiment with Jekyll. The Ruby environment setup on macOS was its own ordeal, but I got it deployed to Cloudflare Pages under the same conditions. Same failure. Jekyll couldn't register the sitemap either. The framework wasn't the issue — the free subdomain (`.github.io`, `.pages.dev`) was.

## A $10 domain

Bought `sungho-gigio.com` from Cloudflare Registrar. $10.46/year, at-cost pricing, same renewal rate.

Still didn't work at first. I'd registered it as a "URL Prefix" property in GSC. Switched to "Domain" property, verified ownership via Cloudflare DNS TXT record, and it worked immediately. Six months of debugging ended by changing a property type.

## I picked Ghost

With the sitemap fixed, Hugo's design felt a bit bare, so I looked at other frameworks. Asked ChatGPT for a comparison — top recommendation was Astro. Zero JS by default, Islands Architecture, Content Collections. A good fit for a blog.

I picked Ghost instead. The WYSIWYG editor appealed to me, SEO was built-in, and I already had a free Oracle Cloud ARM instance sitting around. "I have a server, might as well use it."

## k8s for a blog

Deciding to self-host Ghost made things escalate. I set up k3s on an Oracle Cloud ARM64 instance, configured GitOps with Argo CD, managed secrets with Vault, added monitoring with Prometheus + Grafana + Loki. Exposed it through Cloudflare Tunnel, protected the admin with Zero Trust.

```mermaid
flowchart LR
  A[User] --> B[Cloudflare CDN]
  B --> C[Cloudflare Tunnel]
  C --> D[Ingress-NGINX]
  D --> E[Ghost]
  E --> F[MySQL 8]
```

All of this to run one blog. I think the learning was worth it, but I was drifting further and further from actually writing.

One thing I confirmed during this: Cloudflare's free tier is surprisingly generous. Tunnel, Zero Trust (50 users), DNS, SSL, Email Routing — all free.

## The writer changed

Ghost's WYSIWYG editor is built for humans writing in a browser. Starting late 2025, I was spending more time working with tools like Claude Code, and I needed agents to read and write Markdown files directly. Ghost's Admin API doesn't really support that workflow.

I'd originally picked Ghost for the "writing experience," but the one doing the writing shifted from me to AI, and that criterion stopped mattering. I went back to Astro — the thing I was recommended in the first place. Static site, no k8s needed, just deploy to Cloudflare Workers & Pages.

| Detour | What I got |
|--------|-----------|
| 6 months of sitemap debugging | GSC Domain vs URL Prefix property, isolating causes through control experiments |
| Domain purchase research | Registrar ecosystem, DNS, WHOIS |
| Ghost on k8s | Hands-on k3s, Argo CD, Vault, Cloudflare Tunnel |
| Ghost → Astro | "Who is the user of the tool?" |

If I'd bought a $10 domain and used Astro from the start, none of this would have happened. Then again, this post wouldn't exist either.
