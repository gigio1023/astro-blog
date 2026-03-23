---
title: "Beam Search"
description: "Explanation of beam search decoding as a trade-off between greedy decoding and exhaustive search in sequence generation."
date: "2021-09-08T10:39:16.519Z"
tags: ["nlp"]
lang: en
translationOf: "beam-search"
draft: false
---

# Greedy Decoding
In the attention and LSTM approaches from previous posts, when predicting the next word at a given step, the single word with the highest probability is selected. This is called greedy decoding.

It's greedy because it picks the locally best option rather than predicting from the overall context.

For example:
> input: {difficult French text}, answer: he hit me with a pie

In this situation, suppose the decoder has predicted only 'he hit a' so far. It's clearly become an incorrect sentence, but in greedy decoding there's no way to go back.

## Exhaustive Search
![](/assets/images/Beam search/5e071974-4a49-4fed-baad-01a0420124b7-image.png)
In greedy decoding, the output y for a given sentence x can be expressed as a joint probability as shown above.
The first term of the joint probability is the probability of outputting y1 given x. The second term is the probability of outputting y2 given y1 and x. The product of all these values represents the probability of output y considering all tokens in the Seq2Seq — a joint probability over simultaneous events.

**Goal**
Maximize $P(y|x)$. The goal is finding the most natural y.

**Problem**
Greedy decoding may fail to achieve this goal. The issue is making myopic choices that maximize $P(y_1|x)$. Such choices might cause subsequent terms after $P(y_1|x)$ to shrink, potentially reducing the overall value.

**Solution**
Even if the probability at time t decreases, make choices that can increase the overall value.
Computing all possible options at time t would accomplish this. If the number of choices at decoder time t (i.e., the vocabulary size) is $V^t$, the complexity would be $O(V^t)$. That's way too large.

# Beam Search
A compromise between greedy search and exhaustive search. Instead of searching $V^t$, the user sets a k to search k options from the vocabulary V.

![](/assets/images/Beam search/56127164-40e8-4cbe-9617-f8c4ef530d47-image.png)
k: beam size (in practice around 5 to 10)
At each step, k hypotheses are explored.

Log is applied to the original joint probability, converting it to a monotonically increasing function. When the domain increases, the range also increases — so the joint probability is maximized when the log-transformed score is also maximized. In other words, applying log is fine.

- Doesn't guarantee a globally optimal solution.
- More efficient than exhaustive search.

![](/assets/images/Beam search/f9a523c0-1e1e-4138-a217-778334300d44-image.png)
Here hypotheses branch into 4. From start, k hypotheses are generated. At the next step, each of the k generates k more hypotheses. Here k=2, step=2, so the number of hypotheses is $k^n = 2^2 = 4$.

---
![](/assets/images/Beam search/361ca7c2-e54c-439a-84a2-7bbc0aaa2589-image.png)
But at the next step, it doesn't create k hypotheses for each of the k. It somewhat greedily selects the k(2) hypotheses with the highest probability values, then creates k hypotheses from those.

Because of this approach, the complexity is much lower than searching all paths.

---

## Hypothesis Termination Condition
When the decoder generates an \<END\> token. Some hypotheses may finish earlier than others — these results are stored separately, and unfinished ones continue as normal.

## Beam Search Termination Condition
- When a predetermined timestep T is reached
- When at least n hypotheses have terminated

## Final Evaluation
![](/images/6cbe16e1-2d23-4550-949d-79b5ed15928b-image.png)

Since probability values are between 0 and 1, the score obviously decreases as the joint probability length grows. The log values become negative. So to compute scores fairly, the score is divided by the length.
