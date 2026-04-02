---
title: "Rethinking agents and tools"
description: "Notes from my LangCon 2025 talk."
date: "2025-03-08T15:00:00+09:00"
tags: ["agent"]
draft: false
lang: en
translationOf: "rethinking-agent-and-tools"
---

- Presented at LangCon 2025 on practical challenges of building agents in the real world
- What counts as a "good" agent is different in academia, on social media, and in production
- The real bottleneck is not agent logic but tool design and LLM infrastructure
- Covered Open API Specification to tool conversion, Port and Adapter pattern, LLM-as-Judge evaluation, and more

---

I keep running into the same set of problems when building agents. Not the agent loop itself, but everything around it: how to wire up tools, how to abstract the LLM layer, how to evaluate any of it. I tried organizing these into something useful and presented it at LangCon 2025 as "Rethinking about Agent and Tools." I'm not sure I got the framing right, but the slides are designed to stand on their own.

## Three definitions of "good"

An agent is an application with a plan that can verify whether it reached its goal. A tool is a function the agent can call. Loose definitions, but good enough for the conversation.

The interesting part is what "good" means, because it depends entirely on who you ask.

Academia sets the bar at novelty. Huang et al.'s "Language Models as Zero-Shot Planners" (2022) showed that GPT-3 and Sentence-BERT could handle planning. That was the contribution. Lu et al.'s OctoTools (2025) proposed a Unified Agent Framework across 16 benchmarks. New problem domains, integrated frameworks, rigorous evaluation.

Social media cares about something else. AutoGPT in 2023 was the textbook case: a compelling PoC that explored what was possible, not what was production-ready. For tools, the question is how quickly something plugs into a demo. Jina's ReaderLM-v2 (HTML to Markdown) got traction this way.

Production shifts the criteria again. A good agent has to show ROI. Low cost, high quality, solving use cases that were previously stuck or making existing ones meaningfully better. Perplexity took open-source search-based agent ideas and turned them into a real service. Good tools need reliable response quality, manageable auth and rate limits, and realistic implementation cost.

I don't think there's a universal definition of usefulness. But one thing seems consistent across all three: wherever you're building agents, the bottleneck tends to be outside the agent itself.

## Tools are the bottleneck

When you build agents, the agent loop is the easy part. What takes time is figuring out how to define and connect tools.

The most common case: converting RESTful APIs defined with Open API Specification into LLM function calling schemas. Sounds like a straightforward spec-to-code translation. It isn't. Existing open-source generators rarely fit your use case, and you end up writing code by hand. On the OpenAI spec, you need to build a functions schema generator yourself (the OpenAI Python SDK is a useful reference for schema structure). Services like composio.dev handle this translation from Python scripts to function calling specs. That these services exist probably says something about how tedious the process is.

Web search is a similar story. Most widely used tool use case, but the infrastructure is heavier than you'd expect: crawling, page cleansing, summarization. Data engineering work more than AI engineering work. Enterprise means building the search pipeline (crawler, parser, search engine) in-house. For personal projects, Tavily or Firecrawl are more practical. Gemini supports Google Search natively, with 1,500 free requests per day and $35 per 1,000 after that.

Tools can also be more than simple functions. If you implement personalization as a KnowledgeTriple (subject, predicate, object) memory tool, the LLM generates and stores personalization material in a vector store at each step. Tool design ends up shaping what the agent can do.

![Agent graph with personalization as a tool. Starting from load_memories, the agent cycles between LLM and tools, saving and querying memory.](./personalization-graph.png)

## Implementation and abstraction

In Python, zero-base implementation was the fastest path for me. I only used FastAPI, the OpenAI Python SDK, and LiteLLM Proxy. Unify the LLM infrastructure layer around the OpenAI spec and the rest gets simpler. Most backend-focused ML engineers I've talked to have their own version of this, though how quickly each company gets there varies.

In the talk I walked through building a ReAct agent on a company model served via vLLM OpenAI Compatible Server. LangChain gets you to a prototype fast, and the code compression is real. But the agent behavior spec is locked in, debugging gets harder, and changing library internals is painful. Rolling your own means more boilerplate upfront. The tradeoff is that you can handle changing requirements and use provider-specific features freely. Structured Output is a typical case where self-implementation wins.

I started from simple pseudo code and had o3-mini turn it into a 134-line Python ReAct agent. Code is on [gist](https://gist.github.com/gigio1023/f383dd337385d5f8e11ca2688b8bb937).

![ReAct Agent pseudo code. 17 lines capturing the core agent loop structure.](./react-pseudo-code.png)

For the LLM layer inside the agent, Port and Adapter works well. Define an abstract LLMProviderService interface, build adapters for each provider (OpenAI, LoraX, etc.), and provider swaps become invisible to the application code. Combine with vLLM OpenAI Compatible Server or LiteLLM Proxy and you're set.

![Port and Adapter architecture. The Domain sits at the center, with Ports and Adapters abstracting external interfaces (HTTP API, RPC, MySQL, etc.).](./port-and-adapter.png)

## Evaluation and cost

LLM-as-Judge is the practical path for evaluating agents in conversational systems. MT-Bench's pairwise comparison, answer grading, and reference-guided grading are solid starting points. WildBench shows you can also evaluate from random conversation logs. The trick is calibrating per-evaluation budget so you can actually afford to run evaluations regularly. Around $5 per round is a reasonable place to start.

Low cost and high quality together means running both end-to-end and per-module evaluations to find the sweet spot. Which model goes in which module, and where the parameters-to-performance ratio makes sense.

This is how I organized the problem. Others will have their own framing.

## References

- Huang, W., Abbeel, P., Pathak, D., & Mordatch, I. (2022). [Language Models as Zero-Shot Planners: Extracting Actionable Knowledge for Embodied Agents](https://arxiv.org/abs/2201.07207). ICML 2022.
- Lu, P., Chen, B., Liu, S., Thapa, R., Boen, J., & Zou, J. (2025). [OctoTools: An Agentic Framework with Extensible Tools for Complex Reasoning](https://arxiv.org/abs/2502.11271). arXiv:2502.11271.
- Zheng, L., Chiang, W., Sheng, Y., et al. (2023). [Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685). NeurIPS 2023.
- Lin, B.Y., Deng, Y., Chandu, K., et al. (2024). [WildBench: Benchmarking LLMs with Challenging Tasks from Real Users in the Wild](https://arxiv.org/abs/2406.04770). arXiv:2406.04770.
- LINE Engineering. [Port and Adapter Architecture](https://engineering.linecorp.com/ko/blog/port-and-adapter-architecture).
