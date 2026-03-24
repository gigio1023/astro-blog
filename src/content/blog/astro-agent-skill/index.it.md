---
title: "Ho creato un Agent Skill per il mio blog Astro"
description: "Gli agenti continuavano a sbagliare i pattern di Astro 6, così ho messo insieme uno skill."
date: "2026-03-23T14:00:00+09:00"
tags: ["agent", "agent-skill"]
draft: false
lang: it
translationOf: "astro-agent-skill"
---

- Gli agenti generano pattern Astro obsoleti senza conoscere i breaking change di Astro 6.
- L'Astro Docs MCP funziona solo quando l'agente chiede, e gli agenti non chiedono quando pensano di avere ragione.
- Quindi ho creato un Agent Skill che l'agente consulta prima di generare codice.

GitHub: [gigio1023/astro-dev-skill](https://github.com/gigio1023/astro-dev-skill)

---

Questo blog è costruito con Astro. Ci sto lavorando con Claude Code e Codex, e ho notato che gli agenti generano ripetutamente codice Astro sbagliato. Astro 6 ha introdotto breaking change significativi, ma gli agenti sono stati addestrati principalmente su codice di Astro 3/4/5, quindi generano pattern vecchi senza rendersi conto dell'errore.

Uso anche l'Astro Docs MCP, ma l'MCP si attiva solo quando l'agente fa una domanda. Quando un agente scrive `entry.render()`, non chiede all'MCP "questa API è cambiata?" È convinto che il pattern sia corretto e genera il codice. Se l'MCP risponde a "come si usa questo?", quello che serviva era qualcosa che dicesse "non così."

Quindi ho creato un Agent Skill. È essenzialmente un insieme di linee guida che l'agente consulta prima di generare codice, e complementa l'MCP invece di sostituirlo.

## Cosa gli agenti sbagliano ripetutamente

Alcuni esempi rappresentativi chiariscono la situazione.

In Astro 6, `render()` è passato da metodo dell'entry a funzione standalone. Se si chiede a un agente di renderizzare un post del blog, quasi sicuramente userà `post.render()`.

```ts
// Codice generato dall'agente
const { Content } = await post.render()

// In Astro 6 è cambiato così
import { render } from 'astro:content'
const { Content } = await render(post)
```

`Astro.glob()` è un'API completamente rimossa in Astro 6, ma gli agenti la usano ancora per ottenere la lista dei post.

```ts
// API rimossa
const posts = await Astro.glob('./posts/*.md')

// Bisogna usare Content Collections
import { getCollection } from 'astro:content'
const posts = await getCollection('blog')
```

Astro 6 usa Zod 4, che ha percorsi di import diversi e un chaining dei validator diverso.

```ts
// Sintassi Zod 3
import { defineCollection, z } from 'astro:content'
z.string().email()

// Sintassi Zod 4
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
z.email()
```

Anche il `loader` delle Content Collections è diventato obbligatorio. La posizione del file di configurazione è cambiata da `src/content/config.ts` a `src/content.config.ts`.

```ts
// Senza loader non funziona
const blog = defineCollection({ schema: z.object({...}) })

// Il loader è obbligatorio, e lo schema ha forma di funzione
import { glob } from 'astro/loaders'
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({...})
})
```

Di pattern come questi ne ho catalogati circa 20. La configurazione CSS nativa di Tailwind v4, l'uso di `client:load` su tutti i componenti, i listener di eventi che spariscono con `<ClientRouter />`, e altri.

---

## Con quali criteri l'ho costruito

Nel creare lo skill, ho fatto riferimento a [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378) di Thariq. Si parla dell'esperienza di Anthropic con centinaia di skill, e oltre ai punti base come costruire intorno ai gotcha e usare progressive disclosure, c'erano alcuni spunti utili.

Lo skill copre modifica di file `.astro`/`.mdx`, Content Collections, Tailwind v4, direttive `client:`, Actions/Zod 4, funzionalità server (sessioni, i18n, variabili d'ambiente, CSP), View Transitions, configurazione adapter. Io per abitudine invoco `/astro-dev` direttamente, ma ho scritto la description come condizione di trigger, quindi in un progetto Astro si attiva automaticamente quando si tocca il codice.

**Dare codice all'agente per fargli usare i turni in composizione.** Se lo skill include script o template, l'agente passa il tempo a comporre invece di creare boilerplate da zero. In questo skill, la directory `templates/` contiene file di configurazione per Astro 6 + Tailwind v4.
```
templates/
├── astro.config.ts    # Astro 6 + Tailwind v4 + MDX + Fonts API
├── content.config.ts  # Content Collections con glob loader
└── global.css         # Entry point CSS Tailwind v4
```

Quando l'agente setta un progetto partendo da questi file, le possibilità di errore nella configurazione si riducono. Se i guardrail dicono "non fare così", i template dicono "copia questo e parti da qui."

I guardrail li ho aggiunti uno alla volta ogni volta che vedevo l'agente sbagliare. Non ho progettato 20 pattern dall'inizio. Anche nell'articolo si dice "Most of ours began as a few lines and a single gotcha, and got better because people kept adding to them" — ed è effettivamente così.

---

## Struttura dello skill

```
skills/astro-dev/
├── SKILL.md                    # Punto di ingresso. 20 guardrail + router
├── references/
│   ├── astro-core-patterns.md  # Core API, stili, script, middleware
│   ├── content-collections.md  # Collezioni build/live, loader, Zod 4
│   ├── blog-recipes.md         # RSS, paginazione, tag, SEO, TOC
│   ├── tailwind.md             # Plugin Vite, tema CSS, Fonts API
│   ├── islands-and-hydration.md
│   ├── actions-and-forms.md
│   ├── view-transitions.md
│   ├── server-features.md
│   └── doc-endpoints.md        # Configurazione MCP, URL doc ottimizzati per LLM
└── templates/
    ├── astro.config.ts
    ├── content.config.ts
    └── global.css
```

I guardrail sono in SKILL.md, e i riferimenti dettagliati sono separati per argomento sotto `references/`. I pattern multi-concetto frequenti nel lavoro sul blog (RSS, paginazione, pagine tag + paginazione annidata, dark mode Shiki, override componenti MDX, tempo di lettura, sommario, post precedente/successivo) sono raccolti in `blog-recipes.md`. Questi coinvolgono più concetti intrecciati e una singola ricerca MCP non basta per ottenere codice corretto.

Sono inclusi anche framework decisionali come `client:load` vs `client:idle` vs `client:visible`, Actions vs API routes, prerender vs on-demand. In `templates/` ci sono file di configurazione drop-in per Astro 6 + Tailwind v4.

---

## Come si usa

```bash
npx skills add gigio1023/astro-dev-skill
```

Usandolo insieme all'Astro Docs MCP, l'MCP gestisce la ricerca nella documentazione aggiornata, e lo skill fornisce guardrail e ricette. L'Astro Docs MCP e un server HTTP remoto fornito dal team Astro — nessun pacchetto npm da installare.

Per Claude Code:

```bash
claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp
```

Per Codex e altri editor, consulta la guida ufficiale [Astro: Build with AI](https://docs.astro.build/en/guides/build-with-ai/).

[![gigio1023/astro-dev-skill - GitHub](https://gh-card.dev/repos/gigio1023/astro-dev-skill.svg)](https://github.com/gigio1023/astro-dev-skill)
