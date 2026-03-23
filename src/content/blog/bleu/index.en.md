---
title: "BLEU"
description: "BLEU score for machine translation evaluation: precision, recall, F1, n-gram overlap, and brevity penalty."
date: "2021-09-10T05:52:17.974Z"
tags: ["nlp"]
draft: false
lang: en
translationOf: "bleu"
---

If you compute standard precision or recall in Seq2Seq, most metrics will be close to 0. Comparing step by step, the probability of mismatch is very high. That means even very similar sentences like the ones below could yield near-zero metrics.
![](/assets/images/BLEU/58b650dd-378a-4bfd-b915-7c066c40cc9c-image.png)

So this context needs to be reflected in the metrics.

# Precision, Recall
![](/assets/images/BLEU/346e52dd-e71a-4ba8-b0a8-d298402fd0e9-image.png)
![](/assets/images/BLEU/712dc76b-c5f9-4ff2-9688-98e443521384-image.png)

**Precision**
- Shows how many corrected words exist in the predicted result.
- The number of words overlapping with the ground truth, based on the predicted result.
- A metric of how accurate the predictions exposed to the user are.
  - e.g., among search results shown to the user, how many were actually correct.

**Recall**
- Shows how many corrected words exist relative to the ground truth.
- The number of words overlapping with the prediction, based on the ground truth.
- Among the results that should have been found, how many did the search engine actually find.
  - There might be information the user wanted among results not shown to them.
- Think of recall in StarCraft 1: of the units you intended to summon, how many actually got summoned?

# F1 score
To express a combined statistic of precision and recall, take the average of both metrics.
The ordering of different averages is:
> Arithmetic mean >= Geometric mean >= Harmonic mean

F1 score uses the harmonic mean, which focuses on the smaller of precision and recall. My guess is that, like Big O notation assuming worst-case scenarios, using the harmonic mean leads to a more accurate metric.

---

In machine translation, computing F1 score the conventional way ignores grammar, word order, and various other factors. So a new metric is needed.

# BLEU score
BiLingual Evaluation Understudy. Pronounced "blue," apparently.
![](/assets/images/BLEU/fbf1424e-0a7b-4a1c-9ffc-365f9ce0a944-image.png)
- Instead of computing overlap for single words only, it computes N-gram overlap.
  - Typically 1 to 4 grams.
- The latter term only considers precision, not recall.
  - Because in machine translation, how completely the original sentence was reproduced is not the priority.
  - What matters more is how much the prediction overlaps with the original sentence.
- Computes the geometric mean of precision for 1 to 4 grams.
  - To focus on smaller values among the metrics, like F1 score does.
  - Harmonic mean is not used because it over-weights excessively small metrics.


## Brevity penalty
A term for weighting overly short translation results. It corresponds to the min() in the BLEU formula.

If the predicted result is shorter than the original sentence, this value becomes less than 1.

This compensates somewhat for the recall that the latter term does not consider. It suppresses the maximum of recall to 1 when it could exceed 1, and also multiplies by a factor when the predicted sentence is shorter than the original.
