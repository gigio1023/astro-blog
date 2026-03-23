---
title: "Unicode, Tokenization"
description: "Basics of Unicode handling in Python and subword tokenization methods including BPE (Byte-Pair Encoding)."
date: "2021-10-12T02:26:14.074Z"
tags: ["nlp", "python"]
draft: false
lang: en
translationOf: "unicode-tokenization"
---

# Unicode
> e.g., U+AC00

- 'U+': prefix denoting Unicode
- 'AC00': hexadecimal code point

## Python
- ord: character to Unicode code point
- chr: Unicode code point to character

- Precomposed Korean (Hangul Syllables): 11,172 characters
  - len returns 2
- Conjoining Jamo (decomposed Korean)
  - len returns 1

# Tokenization
There's growing consensus that human-defined tokenization rules have their limits. The recent trend is data-driven approaches.
- Subword
  - Frequently occurring character combinations are treated as single units.
  - Infrequent combinations are split into subwords.
- BPE (Byte-Pair Encoding)
  - Replaces the most frequent character-level bigram (or byte pair) with a new character.
