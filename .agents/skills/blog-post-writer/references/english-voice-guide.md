# English Voice Guide

Use this when writing or reviewing English variants. The goal is plain technical prose that still feels like the author did the work.

## Reference Writers

| Blogger | URL | Best at |
|---------|-----|---------|
| Simon Willison | simonwillison.net | Hedging, personal narrative framing, dry humor |
| Vicki Boykis | vickiboykis.com | Deadpan tone, metaphor-as-bridge, anti-hype |
| Hamel Husain | hamel.dev | Experience-driven authority, concrete-before-abstract |

Do not imitate their surface style. Use them as reminders: start from lived context, keep claims bounded, and let concrete examples do the work.

## Patterns to Follow

### Opening: personal stake first, topic second

Don't open with the topic definition. Open with why you care.

Good (Willison): "I've been very hesitant to use the term 'agent' for meaningful communication."
Good (Boykis): "What I've found is that the new engineering systems are a lot like the old ones."
Good (Husain): "I started working with language models five years ago."

Bad (AI): "In this post, we'll explore the challenges of building agents."
Bad (AI): "Agent development has become increasingly important in the AI landscape."

### Evidence: concrete noun before abstract label

Name the thing that happened before naming the concept.

Good: "The relay returned an empty `tools/list`, so Claude had no tools to call."
Good: "The generated HTML pointed at `/og/blog/en/...png`; the old `merox.dev` image disappeared."

Bad: "This exposed a diagnosable failure in the toolchain."
Bad: "The workflow achieved better social preview consistency."

### Hedging: earned uncertainty, not weasel words

Good hedging sounds like a person thinking out loud. Bad hedging sounds like a disclaimer.

Good: "I think we may finally have settled on a widely enough accepted definition."
Good: "It turns out that we feel more inspired to produce hazelnut spread when it's sunny."
Good: "There isn't a strict formula as to when to introduce each level of testing."

Bad: "It's worth noting that this approach may not work in all cases."
Bad: "While results may vary, this methodology shows promise."

### Opinions: frame as discovered, not declared

State opinions as conclusions you arrived at, not truths you're revealing.

Good: "I'm going to ignore their various other definitions and stick with tools in a loop."
Good: "My advice is to orchestrate tests that involve the least friction in your tech stack."
Good: "Machine learning is more like alchemy than even software engineering."

Bad: "It is essential to recognize that tool design is the key challenge."
Bad: "The importance of evaluation cannot be overstated."

### Friction: keep the inconvenient parts

AI drafts often smooth away setup failures and awkward details. Keep the parts that explain why the result was not obvious.

Good: "The official package looked cleaner, but the relay was a closed 75MB Bun bundle."
Good: "The build passed, but the preview cache still needed a manual re-scrape."

Bad: "The integration process was seamless."
Bad: "This approach provides a robust solution."

### Sentence rhythm: short declarations + longer explanations

Alternate between punchy statements and unfolding thoughts. Monotone sentence length is a giveaway.

Good: "An LLM agent runs tools in a loop to achieve a goal." (short) → followed by a paragraph unpacking this.
Good: "Stay close to the metal." (punchy close after long technical section)
Good: "How much data should you look at?" (question breaking a technical flow)

Bad: A wall of 20-word sentences all structured as "Subject verb object, and additionally, subject verb object."

### Transitions: no throat-clearing

Connect ideas through content, not filler phrases. If you need a bridge, use a concrete example or question.

Good: "This reminds me of something, and that something is gradient descent." (metaphor bridge)
Good: "Let's break that down." (direct)
Good: "To ground this post in a real-world situation, I'll walk through a case study." (promise)

Bad: "It's worth noting that..."
Bad: "Having established the above, we can now turn to..."
Bad: "With this foundation in place, let's explore..."

### Contrast: use sparingly

Avoid the default AI reframe: "not just X, but Y." It can work once in a real argument, but repeated contrast makes the prose sound generated.

Bad: "This is not just a writing workflow, but a durable knowledge system."
Better: "The workflow matters because it changes what the agent reads before it writes."

### Closing: no summary, no call-to-action

End with a final thought that adds something, not one that restates the thesis.

Good: "I guess I've climbed my way from the left side of that curve to the right."
Good: "This is how I organized the problem. Others will have their own framing."
Good: "They had launched something into production, managed to cut away from hype."

Bad: "In conclusion, we've seen that tool design is crucial for agent development."
Bad: "I hope this post has been helpful in understanding the challenges involved."

## English Anti-Patterns

Words and phrases that make English text sound AI-generated. Search-and-destroy after drafting.

### Filler phrases (delete entirely)
- "It's worth noting that"
- "At its core"
- "In today's landscape"
- "It's important to understand that"
- "Having said that"
- "With that being said"
- "Let's dive in / dive into"
- "In this post, we'll explore"
- "This is not just X, but Y"
- "More than just"
- "seamless"
- "robust solution"
- "game-changing"

### Inflated verbs (replace with simpler words)
- "leverage" → "use"
- "utilize" → "use"
- "facilitate" → "help" or "enable"
- "implement" → "build" or "add"
- "demonstrate" → "show"
- "necessitate" → "need" or "require"
- "encompasses" → "includes" or "covers"

### Hedging that sounds corporate, not human
- "may or may not" → pick one
- "it should be noted" → just note it
- "one could argue" → "I think" or just argue it
- "there is a growing consensus" → name the consensus or skip

### Structural giveaways
- Every paragraph starting with a transition word (However, Moreover, Furthermore, Additionally)
- "First... Second... Third..." enumeration in prose (use for lists, not arguments)
- Restating the question before answering it
- Ending paragraphs with "This is important because..." or "This matters because..."
- Starting with "When it comes to..."
- Flattening every tradeoff into a balanced both-sides paragraph
- Removing all annoyance, uncertainty, or failed attempts from a debugging story
