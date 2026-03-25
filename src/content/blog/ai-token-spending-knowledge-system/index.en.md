---
title: "21.4 billion tokens outside of code"
description: "12 weeks, 21.4 billion tokens."
date: "2026-03-26T10:00:00+09:00"
tags: ["agent", "dev-tools"]
draft: false
lang: en
translationOf: "ai-token-spending-knowledge-system"
---

- 21.4 billion tokens over 12 weeks on personal subscriptions. Most went into building a personal knowledge base of 3,200 Markdown files, not writing code.
- When an agent makes a mistake, I fix the environment. When a task repeats, I turn it into a skill. 19 skills run on this repo.
- Comparative immigration research across Europe, a counseling skill — all running on the same system.

---

I tallied the token usage across my personal AI subscriptions. None of the company-provided Claude Code or Cursor usage is included. My employer's security policies are strict, and I didn't want to use company assets for personal promotion. What's here is usage tracked from personal subscriptions only: ChatGPT Personal, a ChatGPT Pro annual subscription from an OpenAI hackathon, Claude Code Max 20x, and Cursor at $20/month. Most of these run asynchronously anyway, agents churning while I eat or do other things.

| Tool | Tokens | Cost |
|------|--------|------|
| Claude Code | 1.67B | $1,480 |
| Codex / OpenAI | 19.72B | $6,459 |
| Cursor | 48M | $55 |
| **Total** | **21.4B** | **$7,994** |

January 1 to March 25, 2026. About 12 weeks. Aggregated from `bunx ccusage --json` and `bunx @ccusage/codex@latest --json` across two MacBooks, plus the 2026 usage CSV from the OpenClaw dashboard. OpenClaw runs on an OpenAI subscription, so it's rolled into the Codex / OpenAI line, though its usage is smaller than expected at 52 million tokens. Usage from company-provided tools is excluded. All subscriptions, so I didn't actually pay this much. It's what the bill would've looked like on per-token pricing.

## Building the environment

Personal dev work was limited to some Unity projects and this blog. The bulk of the tokens went toward building and consolidating a personal knowledge base: 3,200 Markdown files, 370,000 lines. Things like technical research notes, financial planning, comparative immigration policy research, and todo list management live here. There are many more topics in practice, but too much personal information to enumerate.

OpenAI has a concept they call harness engineering: "anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again." I've been applying the same principle to my personal knowledge system. When an agent references bad information, I fix the INDEX chain. When literature is missing, I collect and add it. When a task repeats, I turn it into an agent skill. There are 19 skills running on this repo. A vault-health skill detects broken links and unreferenced files, and a weekly review skill summarizes changes and prioritizes the next week.

There's a significant amount of personal information in there, so sharing specifics is off the table. Honestly, even having it in a private repo feels uneasy sometimes. One compromised GitHub key and everything is exposed. I've been considering self-hosted git, but my two personal servers don't feel reliable enough. I know the value of managed services too well to make that jump lightly.

## At work too

I wouldn't claim to be the best at this, but I apply the same approach at work. For example, I collect VictoriaMetrics metrics via CLI and API, do some manual plumbing to fit the company infrastructure early on, then package it as an agent skill. After that, agents pull metrics and feed them back into development automatically. Grafana SDK dashboard work follows the same pattern.

The company wiki runs on Jira Confluence, which is easy to access through MCP. Infrastructure that's reachable via HTTP API or CLI has well-maintained specs. Some parts aren't defined at the IaC level or follow internal conventions, so there was some trial and error early on.

One thing I found in a multi-repo environment: monorepo setups are often hard to push at the organizational level, but for my own workspace, wrapping multiple repos under a parent directory and working from there makes context retention much easier. When BE, Grafana SDK repo, Airflow, and infrastructure repos are separate, context breaks constantly. Wrapping them lets the agent understand cross-repo relationships.

I write wiki docs thoroughly, but I think the practical documentation and task definitions live more faithfully in agent skills. They contain every gotcha from real usage, and if something goes stale, my own work breaks, so I have to fix it. When building skills, I reference Thariq Shihipar's [Lessons from Building Claude Code](https://x.com/trq212/status/2033949937936085378) so frequently that I built a separate skill creator skill just for the process.

## From Notion to git repos

I had been running everything through Notion with a PARA setup. Notion is genuinely better for writing and it looks great. For a while I used both side by side. But over time, only Projects and Archives kept growing, mobile access was poor, and I never built the habit of opening Notion.

What pushed the full migration: Notion's newer dashboard features didn't work on the educational plan. Only basic charts were available. Notion MCP could add visualization views, but embedding them into actual pages wasn't possible through MCP, so a human still had to manually assemble things. A secondary issue, but one of the reasons I ended up moving nearly everything to git repos.

I used Claude Code to migrate everything. Notion MCP turned out to be block-based, not Markdown-based, so items had to be inserted one by one. From an agent's perspective, Notion felt like a walled-off data store. Git repos with Markdown files let agents read and write directly. At 3,200 files, I use INDEX.md trees for navigation so the system doesn't collapse as it grows.

I recently started using Obsidian. Still not sure about the value add. When the knowledge graph is managed through an agent harness, I'm not clear what Obsidian brings on top. Current advantages: Markdown rendering is better than VSCode, frontmatter displays cleanly. It feels more like "not hitting Cmd+Shift+V every time" than "using Obsidian."

## Inbox and web search

My inbox works through a dedicated Discord channel where I drop links. OpenClaw runs on an Oracle ARM instance with my knowledge repo cloned. OpenAI subscription-based, reasoning effort set to high. xhigh has enough quota but behaved oddly on simple tasks. When a link lands, it fetches the article and every reference link mentioned in it, producing a summary through a custom agent skill. Oracle Cloud's free ARM64 instance runs forever at no cost.

The ChatGPT Pro subscription is also useful. It's a one-year prize from an OpenAI hackathon. I used it to run high-volume multi-hop web searches from Claude Code, and to use Codex CLI itself as a web search tool inside OpenClaw, which has no built-in search. Both work through `codex exec ...` with natural language queries shaped for each harness. I was doing this before Codex subagent became official. At the OpenAI hackathon on January 20th, an engineer mentioned the feature had been added without documentation, and I started using it from then. At the time it was too unstable, so I ran multiple Codex processes from bash in parallel. Multi-thread didn't work; it had to be multi-process. After upgrading my Claude Code subscription, I stopped using this pattern there. In OpenClaw, it's still very useful.

## Once it's built

I did a comparative study of immigration systems across several European countries. Countries I've never lived in, knew almost nothing about, and that speak entirely different languages. The result was 366 files, iterated through version 7.0. About two months of work.

The scope of research I delegated to agents was broad. Spouse residence rights compared across 6 countries, visa category requirements for Blue Card and Highly Skilled Migrant permits, actual embassy regulations including Seoul, how comune-based administration works for residenza registration and SSN issuance, recent Visa D regulation changes, tax structures and social insurance systems for each country. I built a decision matrix comparing 5 cities across 11 dimensions — market size, visa complexity, language barrier, tax structure, cost of living, and so on — and visualized 12 different relocation paths as month-by-month timelines.

You could solve this by hiring an immigration consultant or acquiring the language skills and local knowledge yourself. But sitting at home in Korea, I could have agents collect legal documents, embassy requirements, and real experience reports, cross-verify them, and produce fairly concrete plans. Without agents, this would have taken several more months of posting in expat forums and waiting for replies.

## A personal counselor

A less expected use case: I built a counseling skill on the same git-repo knowledge system. I have zero domain expertise here, so the whole thing might be fundamentally wrong in ways I can't see. But I collected as much counseling literature as agents could scrape. Major approaches like CBT, DBT, ACT, motivational interviewing, person-centered therapy at textbook level, plus ethics guidelines and crisis intervention protocols.

The approach was completely different from implementation-focused skills like Thariq's or harness engineering. Instead of catching code gotchas, the time went into mapping collision points between therapeutic theories and designing safety constraints. Wampold's (2001) common factors model argues that the therapeutic relationship matters more than which approach you use, but that conflicts with approach-specific techniques in certain situations, and I needed to pre-map those priorities. How Fluckiger et al.'s (2018) meta-analysis on therapeutic alliance applies to AI-mediated counseling was another open question. I ended up setting hard safety constraints and letting the LLM follow its agent harness to find and cross-reference sources. I didn't want to run on a fixed pipeline like existing AI counseling products.

I built the conversation flow around AskUserQuestion, and the feel is quite different from using it during development. When the agent asks a question and I answer, I end up reorganizing my own situation in the process. That alone turned out to be a useful exercise. Codex has an equivalent called request_user_input, but it only works in plan mode, which is annoying enough that it's one of the reasons my Claude Code usage spiked over the past two weeks. On a tangent, I do enjoy CLI-based work, but I miss the Codex app a little. The early days had terrible overheating, but it stabilized, the app looks good, and it was just comfortable. I understand Claude Code's strategy of unifying into one Mac app, but compared to the Codex app... I'll hold my tongue.

A trained professional is better in every way, legally and practically. I don't think AI can replace someone who reads non-verbal cues in voice-based sessions and runs standardized assessments. But late at night when career doubts or personal concerns surface while working alone, I ask it things. Legal considerations prevent publishing it. Using it strictly for personal study. The field turned out to be deeper and more interesting than I expected.

## In closing

You might wonder why this isn't an OpenClaw-centric story. You could build the same system on top of OpenClaw. Honestly, I don't think OpenClaw itself is that important. Clone the knowledge repo, tell it "work only from this repo," and it does. As long as you back up the memory files, OpenClaw is a very accessible Discord-based remote interface, but it's not the core.

The core is the knowledge system underneath and the agent skills that run on top. Interfaces can change, but well-organized knowledge and guidebooks work on any tool. Even now, skills set direction on unfamiliar topics and maintain quality on repetitive tasks. As models improve, skills might need less detail, but the role of scoping direction and boundaries probably won't go away.

I don't think this system is finished. Dumping personal information into a private repo is a risk in itself, and I'm still not sure Obsidian is a necessary layer. But in the time it took to accumulate 3,200 files, I never once thought "I should scrap this and go back to Notion." Everyone uses these tools their own way, and this is just one of them.

## References

- [Harness Engineering: Leveraging Codex in an Agent-First World](https://openai.com/index/harness-engineering/) (OpenAI, 2026)
- [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/status/2033949937936085378) (Thariq Shihipar, Anthropic)
- [ccusage](https://github.com/ryoppippi/ccusage) — Claude Code / Codex CLI token usage tracking tool
- Wampold, B. E. (2001). *The Great Psychotherapy Debate: Models, Methods, and Findings.* Lawrence Erlbaum Associates.
- Fluckiger, C., Del Re, A. C., Wampold, B. E., & Horvath, A. O. (2018). The alliance in adult psychotherapy: A meta-analytic synthesis. *Psychotherapy*, 55(4), 316-340.
