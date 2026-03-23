---
title: "Naver Boostcamp AI Tech 2nd - Week 7 Report"
description: "Week 7 retrospective of Naver Boostcamp AI Tech covering Transformer and BERT studies, mentoring Q&A on attention mechanisms and positional encoding."
date: "2021-09-17T11:34:08.418Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "naver-boost-camp-ai-tech-2nd-report-fifth-week"
draft: false
---

# Week 7 Report
## Lecture review
### NLP (posts 10~14)
https://velog.io/@naem1023/series/NLP

## Assignment process / deliverables
## Mentoring answers
**Peer session**
A lot of questions were exchanged during peer sessions. I collected the unresolved or ambiguous ones and asked the mentor. Here's a summary of the answers:

- Why divide by d_k in the transformer?
    - I had guessed it was to prevent gradient exploding since d_k and n increase proportionally.
    - The conclusion: dividing a random variable by n divides its variance by n^2, so it's a mathematically straightforward fact being applied.

- Why use sin and cos in positional encoding?
    - Sin and cos functions don't grow in magnitude, have periodicity, and yield unique values. They also somewhat guarantee unique values through linear transformation.

- Time complexity (resolved)
    - There was a slight misunderstanding. The "Complexity per Layer" part is the time complexity for matrix operations. The "Sequential Operation" discussed here is different.
    - For RNN: to compute the hidden state at time step t, computation up to t-1 must be done first. So computation proceeds proportionally to sequence length (can't parallelize). That's why O(n) is listed for the Recurrent part.
    - For Transformer: all attention over the entire sequence is computed at once. If you look at the lecture materials, the input matrix has dimensions (n * d), showing all tokens in the sequence are processed simultaneously. So it's O(1) regardless of sequence length.
    - [This](https://jalammar.github.io/illustrated-transformer/) seems like the best resource for understanding Transformers. Translated versions exist.
- Why divide by sqrt(d)? (resolved)
    - Reading the "Attention is All You Need" paper carefully should make this clear. Without dividing, the values inside softmax become too large since they result from dot product operations.
- Why sin and cos?
    - Many reasons, but plain integer sequences grow too large toward the end, and integers are too large compared to embedding values, deviating from the original intent of adding only "small" positional information to embeddings.
    - sin and cos can be adjusted using their periodicity based on sequence length, and are mathematically stable (?) -- though I can't vouch for that.
    - Useful links for understanding positional encoding:
        - [What is the positional encoding in the transformer model?](https://datascience.stackexchange.com/questions/51065/what-is-the-positional-encoding-in-the-transformer-model)
        - [Why does the transformer positional encoding use both sine and cosine?](https://datascience.stackexchange.com/questions/68553/why-does-the-transformer-positional-encoding-use-both-sine-and-cosine)
        - [Transformer Architecture: The Positional Encoding](https://datascience.stackexchange.com/questions/68553/why-does-the-transformer-positional-encoding-use-both-sine-and-cosine)
- Why is Post-Layer Normalization problematic, and warm-up
    - These two topics are the same problem. When LN is applied afterward, value stabilization happens later, causing the gradients near that point to be large early on, which creates sensitivity to learning rate. That's why warm-up is needed.
    - For details, reviewing this paper would be helpful:
        - [On Layer Normalization in the Transformer Architecture](https://arxiv.org/pdf/2002.04745.pdf)
- Gradient Vanishing in Transformer
    - This isn't really an issue, which relates to point 1. Vanishing happens when gradients from later in the sequence shrink as they propagate backward, but Transformer sees the entire sequence at once, so there's not much discussion about this issue.
    - Skip-connection is also used in Transformers and helps with vanishing to some extent, but I don't think it's the decisive factor. The structural difference from RNN -- "seeing all sequences at once" -- seems to be the more relevant reason.


## Peer session summary
We discussed the questions mentioned above, and tried to understand and re-summarize the mentor's answers in our own terms.

## Study retrospective
21/09/06: Studied transformer lecture 1
21/09/07: Studied transformer lecture 2
21/09/08: Studied BERT
21/09/09: Studied remaining lectures. Reviewed and summarized transformer.
21/09/10: Reviewed and organized assignments.
