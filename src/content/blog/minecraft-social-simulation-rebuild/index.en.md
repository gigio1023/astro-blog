---
title: "Restarting the Minecraft social simulation"
description: "Evidence first this time."
date: "2026-05-27T10:00:00+09:00"
tags: ["agent", "rabbit-hole"]
draft: false
lang: en
translationOf: "minecraft-social-simulation-rebuild"
---

- [Repository](https://github.com/gigio1023/minecraft-llm-agent-community)

- I remembered starting this around 2023, but the git history says the first commit was May 22, 2024.
- The old project treated Voyager as the main baseline. The current one still learns from Voyager, but tries hard not to become a Voyager clone.
- I came back in 2026 partly because model runs are cheaper, but mostly because I now want a structure where a model with more context and authority is checked by execution records.
- The current target is not a house-building diary. It is one actor choosing actions from memory, goals, observation, and body, then carrying the checked result into the next cycle.

---

I have been looking again at `minecraft-llm-agent-community`, a repository I had left alone for too long. My memory said I started it around late 2023 or early 2024. The repository is less vague: the first commit is from May 22, 2024.

The old README had a line saying the project would be resumed after June 18, 2024. That did not really happen. The intention was there, and the dream was large enough. I wanted to observe agents in Minecraft forming groups, building villages, and dealing with cooperation, coexistence, and survival. That direction still sounds like what I want.

The approach changed.

## First shape

The 2024 version started almost directly from Voyager. The README checklist had items such as basic environment setup using the Voyager baseline, making a single agent with the Voyager baseline, and writing an architecture image and analysis of Voyager. The docs also had a rewritten pseudo code version of Voyager's `learn()` loop, including the note that one cycle used five sequential model calls.

That made sense then. If someone wanted to build a large language model agent in Minecraft, Voyager was the obvious reference. I also thought in terms of skill library, curriculum, critic, and action generation. To build a multi-actor society, I assumed I first needed a Voyager-style single actor, then several bots around it.

Most of the work happened one layer below that. Mineflayer to Minecraft server communication, Fabric server setup, plugin imports, physics tick behavior, bots talking too often, bots getting kicked from the server. The git history still has fixes for failing to load `mineflayer-hawkeyes`, for over-chatty bots, and for making bots operators so the server would not kick them.

Those are solvable problems. I just did not solve them with enough discipline. I spent too much time patching the environment and not enough time isolating the core loop. Some of that was technical uncertainty. Some of it was just me not being persistent enough. The project stopped there.

There was another attempt in January 2025. I fixed local running, added mock responses, and changed the Mineflayer bridge server so it could accept multiple bots. Even then, the shape was still a Python Voyager structure talking to a JavaScript bridge server. I cannot cleanly separate my own lack of follow-through from the architecture, but it was too shaky a base for a social simulation.

## Reason to restart

Model cost is part of why I came back in 2026. In 2024, repeated experiments felt expensive. Now Gemini has an explicit free tier, and OpenAI's application programming interface is not exactly a free tier in the same sense, but it has free test requests, account-level limits, cheaper models, and credit-based paths. It is much easier to justify short real runs while repairing the execution layer.

Cost was not the main reason though. The discussion around memory systems, agent runtimes, and tool boundaries has moved on. My own habits changed after using Codex and Claude Code for a long time. An agent is not made by giving a model a longer prompt or a better model name. The environment has to preserve what is true when the model is wrong.

Minecraft makes that especially visible. A bot moving a little is not success. The sentence "I collected logs" is not evidence. Inventory change, the block that was dug, pickup behavior, chest ledger changes, delivered chat, and concrete execution records matter more than the model explanation.

The old project was closer to "run Voyager and let it learn." The current one is closer to "let the actor propose an action, have the execution layer check whether it can run, and keep the failure reason as input for the next cycle."

## Authority And Checks

More precisely, this is not only about making a bot that builds a nice house in Minecraft. The thing I care about is close to how we now use large language models as coding tools. We give the model repository context, let it edit files, let it touch the terminal and tests, and allow it to make more decisions than a simple autocomplete system would.

But in coding, I do not really trust the model's statement by itself. What I can trust is the diff, type check, tests, and actual run output. If the model says it fixed something and the build is broken, it did not fix it. If the explanation is imperfect but the diff is understandable and the tests pass, that result can become input for the next decision.

Minecraft is a useful environment for that same problem. There is world state, inventory, blocks, items, and chat. The more context and authority the model gets, the more important it becomes to break its decisions into units that can be checked. That is why I keep trying to define society, action skills, available actions, and memory. It is not just worldbuilding. I want the model to judge more for itself, but I also want that judgment to be checked repeatedly.

Memory matters for the same reason. The goal is not to keep a diary saying that something happened before. The system has to decide which observations may enter the next decision, which execution result a memory depends on, and how a failed judgment should reduce future repeats. Only then can a long-lived actor be more than a long prompt.

## Distance from Voyager

Voyager is still important. Automatic curriculum, executable skill library, environment feedback, and self-verification are useful mechanisms. The current repository still references them. It also repeatedly says not to revive Voyager as the active architecture. That may look excessive, but it is intentional.

A global Voyager-style skill library does not quite fit the social simulation I want. A skill should belong to an actor. The actor workspace should record what the actor can currently do, what concrete result proved it, and whether a proposed skill is still only a candidate or has become usable. A skill should not just be a JavaScript function somewhere in the repository. It should be closer to part of the actor's current body.

Other references get the same treatment. From Generative Agents, I take the observation, memory, reflection, and planning loop, but not the idea that reflection text proves Minecraft progress. From SayCan and SWE-agent, I take the lesson that the action interface shapes agent behavior. From the Hermes memory-system notes, I take memory as an input and output contract: when it may be written, and which execution record it points to, not as a diary.

References are not product specs. I need to extract mechanisms and translate them into this project. I keep writing that down because otherwise this kind of project quickly turns into paper imitation.

## Current loop

The current implementation centers on a social-cycle runtime. The name is bigger than the present system. Right now it is a small loop that manages one action cycle.

There are internal names such as ActorSoul and LifeGoal. The names are a bit much, but the role is simple. They keep a persistent record of who the actor is and what it keeps caring about.

Recent observations, memory, relationship context, and the currently available actions are added to that. The model call, which the code calls a provider, proposes a small goal and an action candidate for the current cycle. The execution layer checks whether the action has the required arguments, whether it repeats the same failure, and whether it is actually allowed. Only then does Mineflayer act as the Minecraft client. After execution, a verifier looks at changes such as inventory, blocks, chests, and chat, then records the result. That result and judgment move into the next cycle.

The boundary is simple. The model proposes. The execution layer checks whether the proposal is executable. Mineflayer reads and changes the world. Success belongs to the execution record, not the model text.

That explains why the repository now contains a lot of dry machinery. If the model only writes "move east" as a reason but does not provide a position or a bounded scouting direction, the action does not run. If the same action fails for the same reason repeatedly, the next identical attempt is blocked before another Minecraft call. Memory can influence the next judgment, but it cannot prove physical progress.

None of this is flashy. It is the layer I needed in 2024 and did not have. When a run fails, I can now separate a bad model choice, a missing pre-execution check, a Mineflayer failure, and an overconfident result checker or report.

## Building a place

The current work is near the goal "build a home for yourself." That sounds like a house-building agent. There is even an action called `buildBasicShelter`. But this goal is more of a test case for the broader structure than the final product.

Recently I checked small actions that seem necessary for that goal by running them one by one. Placing a crafting table, mining cobblestone, building a simple shelter, and using a shared chest are examples. The current code exposes 14 such actions, and all 14 produced the expected execution result in those checks. By "result", I do not mean that the model wrote a success sentence. I mean that inventory, block state, or another Minecraft-side record changed as expected.

Turning that into the identity of the project would be a mistake. Home, base, shelter, and storage are things an actor may care about in a particular situation. They are not the runtime architecture. This goal is useful because it puts several boring actions in the same run: gathering wood, crafting planks and sticks, placing a crafting table, mining cobblestone, using shared storage, asking another actor for something, and announcing a resource. That makes it a good test case. Memory, available actions, pre-execution checks, actual execution, result checking, and relationships all show up at once.

The runtime should not become a dedicated house planner. It should give the actor observation, memory, relationships, available actions, gates, and evidence so the model can choose a small next action from the current situation. If that layer is general enough, it can later support farming, trading, shared storage, conflict, and other social situations.

That is why passing those 14 action checks is not a victory lap. It means each action worked on its own in a small test environment where the preconditions were already prepared. Good, but not social simulation.

A longer run tells a similar story. I asked the system to continue for 100 action cycles, and it reached cycle 54 before stopping on a cleanup file-permission problem. I would not call that a success story. It still helped because the report did not claim broad completion without concrete support, and previous judgment plus memory were visible in later context.

## Still small

The implementation is still mostly one actor. Multiple actors with separate long-term goals and memory are not really there yet. Social actions are still small pieces: approach, request, announce, handoff, wait. Conflict, danger, and richer relationship changes are mostly planned.

That is fine. I would rather keep the core loop small and end to end than build another large bridge layer on top of unstable behavior. Observation has to enter the loop, available actions have to be visible, the model has to propose a small action, the execution layer has to block or run it, Mineflayer results have to be recorded, and memory plus judgment have to reach the next cycle.

Once that loop is stable, adding more actors is reasonable. Without it, ten actors would probably just produce more logs.

The original dream is still there. I am trying to put evidence under it first.

## References

- [Voyager: An Open-Ended Embodied Agent with Large Language Models](https://arxiv.org/abs/2305.16291)
- [Gemini Developer pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [OpenAI pricing](https://platform.openai.com/docs/pricing/)
- [OpenAI rate limits](https://platform.openai.com/docs/guides/rate-limits)
