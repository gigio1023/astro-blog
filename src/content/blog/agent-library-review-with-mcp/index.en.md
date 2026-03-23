---
title: "Agent Library Review with MCP"
description: "Hands-on review of OpenAI Agents SDK, LangGraph, Gemini Gen AI SDK, and MCP for building AI agents. Conclusion: just use LLM Provider SDKs directly."
date: "2025-04-02T02:19:12+09:00"
tags: ["agent"]
draft: false
lang: en
translationOf: agent-library-review-with-mcp
---

# My thoughts
My key conclusion after exploring current AI agent development tools is this: Directly managing all components using core LLM Provider SDKs was the fastest and clearest way to focus on solving the specific problem I aimed to solve.

This insight comes from my recent dive into building AI agents using various libraries (OpenAI Agents SDK, LangGraph) and the Multi-Agent Communication Protocol (MCP).

Here's a breakdown of the specific findings that led to this main takeaway:

# The Usability vs. Observability Paradox
Agent libraries often lack usability. While implementing directly with LLM Provider SDKs offers better code-level observability, the absence of strong standalone agent monitoring tools paradoxically makes the integrated observability within some libraries (like LangSmith) highly valuable.

# LangGraph

- The potential of its graph state and edge definition is genuinely high.
- Using LangSmith again was a truly positive experience; it remains excellent.
- However, its LangChain foundation resulted in a very poor usability experience, making me unlikely to use it again.
- Specific issues arose when using LangChain with Gemini via an OpenAI-compatible proxy, particularly around controlling structured output and function calling parameters. This consumed excessive time, recalling past frustrations requiring library code changes.
- LangSmith itself, revisited since '23, is still unparalleled for agent-oriented observability among the available tools.

# MCP

- Working with MCP was unique due to its goal of setting a broad standard, but the ecosystem feels underdeveloped relative to the protocol's significance.
- Insufficient mcp-python-sdk documentation necessitated code analysis for understanding details (like low-level server use with Starlette), which is undesirable when caused by documentation gaps.
- (I should acknowledge I haven't contributed documentation back myself.)
- Encountered Unicode encoding issues with large GRPC/SSE responses (solved by using dictionaries instead of Pydantic models), suggesting many might be using stdio, which is disappointing for wider adoption.

# OpenAI Agents SDK

- It delivered the expected Pydantic-based simplicity and potential for easy handoff/guardrail integration, but little else.
- The lack of other useful features resulted in significant constraints.
- It misses capabilities for complex agent state management.
- Other limitations include slow OpenAI traces, no tagging, dependency on OpenAI infrastructure, and issues using LLM proxies (due to not following the standard chat completion spec), effectively tying users to OpenAI LLMs.

# Google Gemini & Gen AI SDK

- The Gemini model itself performs excellently (1M context, cost, performance).
- However, the genai SDK and documentation lack clarity, especially compared to the high standard set by OpenAI's SDK.
- For instance, parallel tool calling exists but lacks clear configuration guidance, and function calling documentation was sparse, forcing reliance on prompt adjustments. OpenAI offers clearer control here.
- The overall SDK experience (GenAI and Vertex AI) felt subpar ("quite poor"). Using an OpenAI-compatible interface via an LLM Proxy often seemed more convenient.

# Conclusion
To implement the specific behavior I needed, using only the LLM Provider SDK was the most prudent choice and saved significant time. This need isn't yet fully addressed by current agent libraries or abstract approaches ("vibe coding").
