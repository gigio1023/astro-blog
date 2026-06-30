---
title: "What My Minecraft Agent Left Behind in a Natural Village"
description: "A small run record."
date: "2026-06-30T22:00:00+09:00"
tags: ["agent", "rabbit-hole"]
draft: false
lang: en
translationOf: "minecraft-natural-village-agent-run"
---

- [Detailed report](https://gigio1023.github.io/minecraft-llm-agent-community/blog/natural-village-model-comparison)
- [Repository](https://github.com/gigio1023/minecraft-llm-agent-community)

- I am testing whether a large-language-model agent can leave real world-state changes inside Minecraft.
- This run started near a natural village, with a fresh world for each model lane.
- The goal was small material work: wood, basic materials, crafting table, tool, and stone if the run got that far.
- The detailed report keeps the metrics and per-lane screenshots. This post keeps the context and the timeline.

---

I have been working again on a Minecraft agent project. The basic idea is to put a large-language-model agent inside Minecraft, let it choose actions, execute those actions in the game, and then record what actually changed.

The agent is not just writing a plan in chat. The model proposes the next action, the runtime checks whether that action is available, and a Mineflayer bot moves inside a Minecraft server. After that, the run is read through inventory, block changes, and runtime records.

Minecraft is useful here because the world keeps state. If the agent collected wood, logs should appear in inventory. If it made or used a crafting table, that should show up as an item, a block, or a runtime record. The sentence "I did it" is much weaker than a world state that can be inspected later.

## Natural Village

For this run I did not use a hand-staged arena. The agent started near a naturally generated village. The scenario was `natural-village-spawn-v1`, with seed `4167799982467607063`.

I ran several model lanes under the same setup. A lane here means one independent run path for one model. Each lane used the same seed, but the world was freshly created each time. That kept one lane's blocks and inventory from leaking into the next.

Each lane got 30 cycles. A cycle is one pass through observation, model decision, action execution, and result recording. The practical objective was roughly this:

```text
From a fresh natural village-adjacent world, establish a small work point for continued material work.
Collect wood, craft basic materials, make or use a crafting table,
recover from blockers, and leave a state that can be reviewed later
from inventory, screenshots, and runtime records.
```

I chose this because early Minecraft material work touches several parts of the harness at once. The bot has to find wood, collect items, craft materials, keep working around a crafting table, and recover when movement or block access goes wrong.

## Timeline

The detailed report linked above has the metrics, screenshots, and per-lane cards. For this post, the timeline is enough.

![Practical goal state timeline for a natural-village Minecraft agent run. It shows the durable material states left by Qwen Plus, Qwen Max, GPT-5.4 mini, and Gemini 3.1 Flash Lite over 30 cycles.](./practical-goal-state-timeline.png)

The chart does not count every attempted action. Repeating an action does not improve the work point unless a more useful state remains in the world. The chart marks durable material states instead. Wood acquired means the lane got wood. Basic materials means planks or sticks appeared. Crafting table means the lane reached the table step. Tool retained means a tool was still present at the end. Stone follow-through means the run continued from wooden tools into cobblestone.

The shortest read is that Qwen Max reached the deepest material state. It kept the crafting-table and wooden-pickaxe chain alive, then ended with 6 cobblestone recorded. Qwen Plus reached a wood-level work point with a retained wooden pickaxe. GPT-5.4 mini gathered useful materials and held a crafting table, then failed to settle the work point. Gemini 3.1 Flash Lite reached the table step, then spent much of the run around recovery.

The setup is too narrow for a model ranking. I used Qwen Plus and Qwen Max through ModelScope. The OpenAI and Gemini lanes stayed within the free-tier or low-quota access I had available. I did not include frontier paid model runs such as GPT-5.5 or Claude Opus 4.8.

## Evidence

Screenshots help a human read the run. They show where the bot was, what the camera saw, and whether the logs were connected to an actual Minecraft scene.

I still did not use pixels alone to decide block identity or material progress. The material claims in this post come from inventory, observe and world-state scans, runtime status, and action records.

That distinction mattered for Qwen Max. Its final third-person camera had a terrain cross-section artifact. I treated the stone progress as an inventory and world-state claim, not as a claim from that image alone.

## Next Question

This run has a small scope. It does not show social emergence. It also does not show that the agent has learned an action-consequence target beyond the prior of a large language model. The current claim is smaller: the harness is now close enough to run small natural-village material-work experiments.

For the next run, I would narrow the objective. Something like: place a crafting table and maintain a village-adjacent work point for bounded material follow-through. Mixing shelter, storage, navigation recovery, and long-horizon continuity into one task made the failures harder to read.

The run was still useful. Starting from a natural village, I can now design the next experiment around inventory and world state first, and model narration second.
