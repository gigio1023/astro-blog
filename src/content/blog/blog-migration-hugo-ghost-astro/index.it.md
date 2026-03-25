---
title: "Hugo → Ghost → Astro: tre cambi di framework per un blog"
description: "Dal debug della sitemap al blogging con agenti AI."
date: "2026-03-24T18:00:00+09:00"
tags: ["rabbit-hole", "dev-tools"]
draft: false
lang: it
translationOf: "blog-migration-hugo-ghost-astro"
---

- Hugo, Jekyll, Ghost funzionano tutti come blog, ma nel mio caso la registrazione sitemap su Google Search Console ha funzionato solo a partire da Ghost.
- Claude Code conosceva solo Astro 3/4, così ho creato un Agent Skill separato.
- Routing trilingue, immagini OG dinamiche, ricerca full-text e JSON-LD, tutto costruito con agenti AI.

---

Ho creato un blog con Hugo intorno al 2024. Lo hostavo su GitHub Pages, scrivevo qualche post, tutto funzionava, tranne che Google Search Console non accettava la sitemap. `Sitemap: couldn't fetch`. Quell'errore è rimasto per mesi.

All'inizio pensavo fosse un problema di configurazione Hugo. Ho verificato `enableRobotsTXT = true`, passato la sitemap attraverso validatori XML. Passava, ma il contenuto aveva `favicon.ico` come URL e data URI SVG inline. Ho corretto tutto. Scendendo più in profondità, la risposta HTTP per sitemap.xml tornava `304 Not Modified` senza header `Content-Type`. Ho aggiunto `.nojekyll` per bloccare l'elaborazione Jekyll di GitHub Pages. Non ha funzionato.

Mi sono spostato su Cloudflare Pages. Il deploy andava bene, la registrazione sitemap continuava a fallire. Ho fatto un esperimento di controllo con Jekyll. Un po' di problemi con la configurazione Ruby su macOS, ma l'ho deployato nelle stesse condizioni. Stesso fallimento. Confermato: non era il framework.

## Dominio personalizzato

Sospettando che il problema fossero i sottodomini gratuiti (`.github.io`, `.pages.dev`), ho comprato `sungho-gigio.com` da Cloudflare Registrar. $10.46/anno, prezzo at-cost, WHOIS redaction inclusa.

Ho collegato il dominio, registrato come Domain property su Google Search Console. Hugo + dominio personalizzato non funzionava comunque. Neanche Jekyll + dominio personalizzato. A quel punto non sapevo davvero cosa non andasse.

Altre persone potrebbero aver avuto zero problemi con Hugo o Jekyll + dominio personalizzato. Potrebbe esserci stata una configurazione che mi sfuggiva, o un problema di tempistica lato Google Search Console. Nel mio setup, semplicemente non funzionava.

## Ghost e la sitemap

Il problema sitemap si è risolto quando sono passato a Ghost. Ghost ha sitemap, meta tag e structured data integrati, nessuna configurazione necessaria. Dominio personalizzato + Ghost + Google Search Console Domain property ha funzionato subito.

Perché non funzionava con Hugo/Jekyll ma con Ghost sì, non saprei dirlo con precisione. Forse Ghost gestisce meglio gli aspetti SEO internamente, o forse qualcosa è cambiato lato Google Search Console nel frattempo. L'unica certezza è che il problema è sparito con Ghost.

Ghost mi attirava anche per altri motivi. L'editor WYSIWYG con anteprima istantanea per card Markdown, immagini e formule. E avevo già un'istanza ARM64 gratuita su Oracle Cloud (4 OCPU, 24GB RAM), quindi il self-hosting era essenzialmente gratis.

## Un blog su k8s

Self-hostare Ghost ha fatto crescere l'infrastruttura. k3s su Oracle Cloud ARM64, GitOps con Argo CD + Kustomize, secret in Vault + SOPS, Cloudflare Tunnel per l'esposizione, Zero Trust per la protezione admin, Prometheus + Grafana + Loki per il monitoraggio. Tutto per un blog. Ottimo per imparare l'infrastruttura, ma mi stavo allontanando dallo scrivere.

```mermaid
flowchart LR
  A[Utente] --> B[Cloudflare CDN]
  B --> C[Cloudflare Tunnel]
  C --> D[Ingress-NGINX]
  D --> E[Ghost]
  E --> F[MySQL 8]
```

Una cosa che ho confermato: il tier gratuito di Cloudflare è generoso. Tunnel, Zero Trust (50 utenti), DNS, Access, SSL, Email Routing. Tutto gratis.

## Perché Astro

Dalla fine del 2025, passavo sempre più tempo con strumenti come Claude Code. L'editor WYSIWYG di Ghost è ottimo quando un umano scrive nel browser, ma non si adatta a un flusso dove gli agent devono leggere e scrivere file Markdown direttamente. L'Admin API di Ghost esiste ma è limitata.

Avevo scelto Ghost per l'"esperienza di scrittura", ma chi scriveva era passato da me all'AI, e quel criterio aveva smesso di contare. Sono tornato ad Astro, quello che mi avevano consigliato all'inizio. Basato su file Markdown, gli agent ci lavorano liberamente. Sito statico, niente k8s. Deploy su Cloudflare Workers & Pages e basta.

## Cosa ho costruito con gli agent

Dopo il passaggio ad Astro, ho costruito parecchio con Claude Code e Codex sopra un fork del tema astro-erudite.

i18n trilingue con route per lingua (`/blog/ko/`, `/blog/en/`, `/blog/it/`), linking `translationOf` nel frontmatter, language switcher su ogni post, tag hreflang e feed RSS in inglese.

Immagini OG dinamiche generate a build time con satori + resvg-js. Pretendard per il coreano, Geist per l'inglese, dimensionamento adattivo del titolo. Un'immagine per variante linguistica per post.

Ricerca full-text con FlexSearch, indice JSON prerenderizzato, fuzzy matching, navigazione da tastiera, cronologia ricerche e cache localStorage.

Dati strutturati JSON-LD (schema BlogPosting, BreadcrumbList, WebSite, Person) applicati per tipo di pagina. Più un sistema serie/subpost, diagrammi Mermaid e rendering matematico KaTeX.

## Astro 6 e l'Agent Skill

Un problema è emerso durante tutto questo. Claude Code genera pattern Astro 3/4/5. `post.render()` invece del `render(post)` standalone, collection senza il `loader` ora obbligatorio, import Zod 3 invece di Zod 4. L'Astro Docs MCP non aiuta perché gli agent non chiedono quando pensano di avere ragione.

Così ho costruito un Agent Skill separato, un insieme di guardrail che l'agente consulta prima di generare codice.

```bash
npx skills add gigio1023/astro-dev-skill
```

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill) / Post correlato: [Ho creato un Agent Skill per il mio blog Astro](/blog/it/astro-agent-skill)

## Cosa ho imparato da ogni framework

| Framework | Cosa ho imparato |
|-----------|-----------------|
| Hugo | Debug sitemap, analisi header HTTP, isolare cause con esperimenti di controllo |
| Jekyll | Il dolore della configurazione Ruby, conferma che il framework non era la causa |
| Ghost (k8s) | k3s, Argo CD, Vault + SOPS, Cloudflare Tunnel/Zero Trust, monitoraggio |
| Astro | Sviluppo guidato da agenti AI, i18n, generazione immagini OG, dati strutturati |

Guardando indietro, ChatGPT aveva consigliato Astro fin dall'inizio e io avevo scelto Ghost. Ci sono tornato un anno e mezzo dopo. L'esperienza con l'ecosistema Cloudflare e k8s che ho accumulato lungo la strada non è andata sprecata, comunque.
