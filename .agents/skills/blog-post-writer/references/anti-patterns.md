# AI Anti-Patterns

Use this as a final search-and-destroy checklist after drafting. The goal is not to fool detectors. The goal is to respect the reader's time.

## Structural Patterns

**Forced template symmetry.** Every section has the same length, same cadence, or same internal structure. Let important parts take more space and minor parts stay short.

**Mandatory summary blocks.** A TL;DR is useful for long debugging posts, but noisy for short notes. Delete it when it repeats the first paragraph.

**Number theater.** "3 lessons", "5 takeaways", "14/14 matrix" without explaining what was measured. Explain the actual evidence before the count.

**Product-doc posture.** "Quick start", "How to use", "Best practices" when the post is really a personal investigation or opinion. A blog post is not a README.

**Generic explainer opening.** Starting with definitions the target reader already knows. Open with the specific problem, failure, or decision.

**Forced closure.** "In conclusion", "마무리", "정리하면" after the post has already ended. Stop at the last useful sentence.

## Evidence Problems

**Source laundering.** Turning "I saw this in one log" into a general claim. Keep scope honest.

**Unnamed authority.** "Many studies show", "experts agree", "업계에서는" without naming the source. Name it or delete it.

**Missing real-world mess.** Presenting a tool or workflow as clean when the actual experience involved setup friction, flaky behavior, exceptions, or ambiguous evidence.

**Abstract label over concrete behavior.** "사회적 압력", "visible reason", "diagnosable failure", "current-run evidence" without first saying what happened.

## Tone Problems

**Relentless optimism.** "powerful", "seamless", "game-changing", "revolutionary", "robust" without a concrete reason. Prefer the plain result.

**Press-release voice.** Sentences written to impress rather than inform: "unlock", "empower", "leverage", "transform", "pave the way".

**Coaching voice.** "이것만 기억하세요", "you should", "the key is to". This blog describes experience; it does not lecture.

**Superiority.** "Most people don't understand", "the real value is". Use the author's concrete use case instead.

**Over-polished neutrality.** No stance, no tradeoff, no annoyance, no uncertainty. Add the actual judgment or delete the section.

## Sentence Patterns

**Contrastive reframe.** "It's not just X, it's Y", "X isn't just evolving, it's accelerating", "단순히 X가 아니라 Y다". Use only if the contrast is genuinely the point.

**Throat-clearing transitions.** "It's worth noting", "At its core", "In today's landscape", "With that being said", "이 맥락에서 중요한 것은". Usually delete.

**Repeated transition starters.** Paragraph after paragraph beginning with "However", "Moreover", "Furthermore", "Additionally".

**Decorative em dash.** Especially in English titles or dramatic mid-sentence turns. Use punctuation only when it changes meaning.

**Same point twice.** The intro, top bullets, and closing all say the same thing. Keep the strongest version.

**Wall paragraphs.** More than 8-10 lines without a break. Split by claim, evidence, and consequence.

## Korean-Specific Checks

- Avoid "~를 통해" when a simpler particle works.
- Avoid "핵심은", "중요한 것은", "결국" as filler transitions.
- Avoid abstract nouns attached to ordinary actions: "보금자리 압력", "집짓기 압력", "사회적 압력".
- Avoid unexplained internal labels: `14/14 live matrix`, `stress run`, `seed action skill`.
- Prefer "무엇을 했고 무엇이 바뀌었는지" over a named evaluation frame.

## English-Specific Checks

Delete or rewrite:

- "It's worth noting that"
- "At its core"
- "In today's landscape"
- "Let's dive in"
- "In this post, we'll explore"
- "This is important because"
- "When it comes to"
- "may or may not"
- "one could argue"
- "there is a growing consensus"

Replace inflated verbs:

- "leverage" -> "use"
- "utilize" -> "use"
- "facilitate" -> "help" or "enable"
- "demonstrate" -> "show"
- "necessitate" -> "need"
- "encompasses" -> "includes"
