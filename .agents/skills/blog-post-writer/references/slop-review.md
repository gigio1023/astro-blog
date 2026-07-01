# Slop Review

Run these passes after the first draft and after translation. Do not rely on a single "make it less AI" rewrite.

## Pass 1: Claim And Source

For each section, identify the main claim.

- If the claim comes from the author's experience, include the concrete event, log, command, result, date, or decision.
- If the claim comes from an external source, link the source or name it directly.
- If evidence is weak, narrow the claim.
- If the section has no claim, merge it or delete it.

## Pass 2: Specificity

Search for vague nouns and replace them with observable behavior.

Weak:

- "workflow improvement"
- "quality boost"
- "better agent behavior"
- "interesting failure"

Better:

- "the build stopped failing after `translationOf` was added"
- "the generated OG route appeared in `dist/og/blog/en/...png`"
- "the agent stopped inventing Astro 5 APIs after the skill forced it to read `astro.config.ts`"

## Pass 3: Reader Value

Ask what the reader learns that they could not get from a generic model answer.

Keep:

- first-hand failure modes
- exact constraints
- tradeoffs
- surprising non-results
- decisions that would change under different constraints

Delete:

- generic context paragraphs
- tool praise
- repeated thesis statements
- broad industry commentary without evidence

## Pass 4: Voice

Make the post sound like a person who did the work.

- Use "I" when the claim comes from the author's experience.
- Keep mild frustration or uncertainty when it was part of the work.
- Avoid perfectly balanced prose. Real investigations have uneven weight.
- Vary sentence length. Put a short sentence after a dense technical paragraph when it helps.

## Pass 5: Structure

Check whether the structure matches the material.

- Debugging post: situation -> failed attempt -> evidence -> conclusion.
- Opinion post: observation -> why it matters -> counterpoint -> current stance.
- Build log: goal -> constraints -> implementation -> what broke -> what remains.
- Paper/review post: claim -> method -> where it helps -> where it does not.

Do not force a TL;DR, table, or conclusion if the material does not need it.

## Pass 6: Translation

For translated variants:

- Preserve the same evidence and caveats.
- Rewrite idioms naturally instead of translating literally.
- Keep technical terms stable across languages.
- Search for English AI filler introduced during translation.
- Do not make the translated version more polished or more promotional than the source.
