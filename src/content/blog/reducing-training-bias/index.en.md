---
title: "Reducing Training Bias"
description: "Types of training bias in MRC and ODQA, and techniques to mitigate them including negative sampling and annotation bias handling."
lang: en
translationOf: "reducing-training-bias"
date: "2021-10-18T03:44:02.826Z"
tags: ["nlp"]
draft: false
---

# Definition of Bias
Bias is not inherently bad. But some biases hurt model performance, and those need to be addressed.
- ML/DL
  - Inductive bias ([ref](https://velog.io/@euisuk-chung/Inductive-Bias%EB%9E%80))
    - Additional assumptions used to make accurate predictions on situations not encountered during training.
  - Preferring certain function forms to inject prior knowledge.
    - The very act of designing a model and feeding data into it carries a form of bias.
- Real world
  - Historical Bias
    - If the real world itself is biased, the model will be too.
  - Co-occurrence bias
    - Unwanted attributes learned due to superficial correlations like gender and occupation.
- Data generation
  - Specification bias
    - Bias arising from how inputs and outputs are defined.
  - Sampling bias
    - Bias caused by the data sampling method.
  - Annotator bias
    - Bias caused by the annotators' own characteristics.

## Gender bias
![](/assets/images/Reducing Training Bias/d2f45ed8-ae11-4789-88a9-27bd42c0d60c-image.png)

A model that extracts various attributes from photos. Because the training data contained many images of women cooking, it often classified men who were cooking as women.

![](/assets/images/Reducing Training Bias/14acf299-66af-4726-9806-3fcbdab7dbdb-image.png)
https://ai.googleblog.com/2020/04/a-scalable-approach-to-reducing-gender.html

Translating "someone is a doctor" from Turkish to English would produce "he." Even if Google didn't intend this, if the training data had many correlations between doctors and men, the model makes inaccurate assumptions like this. I see it more as an inaccurate model output problem than a social issue.

## Sampling bias
If sampling is done in a biased way, the confidence that the sample reflects the population's properties is lost. Sample randomly and fairly.

# Bias in ODQA
The reader model always learns from training data where the answer is included in the document -- only those pairs are treated as positive.
e.g., SQuAD positives have a fixed (Context, Query, Answer) triplet.

So the reader model's reading comprehension will be very poor on data pairs with entirely different properties.
e.g., a reader trained on novels, essays, and non-fiction might perform poorly on medicine, engineering, or natural science inference.

## Mitigate training bias
- Train negative examples
  - Negative examples can push negative input data away from the correct answer in the embedding space.
  - Rather than picking random negatives, pick confusing ones.
    - Similar to how dense embedding uses maximally similar documents for negative sampling.
    - Use samples with high BM25/TF-IDF scores that don't contain the answer.
    - Use different passages/questions from the same document.
- Add no answer bias
  - Handle the "no answer" case.
  - Assume one extra token beyond the input sequence.
  - If start and end probabilities in the answer prediction land on that bias token, treat it as no answer.

# Annotation Bias from Datasets
![](/assets/images/Reducing Training Bias/98739eba-aaed-4025-99d3-f2173a65bfed-image.png)

Datasets should be constructed under the scenario that the person asking the question doesn't know the answer. Otherwise the question itself might contain or heavily hint at the answer.

In the table above, the blue-boxed datasets follow this principle.

But there are cases where annotation happens while the question asker already knows the answer. TriviaQA and SQuAD are well-known examples.

In SQuAD, many words overlap between the question and the evidence paragraph. So the model might learn simple word matching rather than developing actual reading comprehension. That's not necessarily wrong, but it's not the intended learning direction if the goal is improving comprehension.

Also, SQuAD uses the 500 most-viewed Wikipedia articles as training data, so it's likely heavily biased toward those documents.

## Effect of annotation bias
![](/assets/images/Reducing Training Bias/05353d86-b769-4cd1-a891-5b6907eae76c-image.png)

Objective evaluation is difficult on datasets with annotation bias. In the table above, most models perform better with DPR, but SQuAD specifically performs best with BM25 -- because SQuAD has many overlapping words between questions and evidence.

A potential remedy is using both BM25 and DPR. But this is a fix specific to datasets with annotation bias; for other models, combining both methods sometimes hurts performance. Try as appropriate for each dataset.

## Dealing with annotation bias
Use datasets designed to prevent annotation bias.
e.g., Natural Questions uses real user queries from Google search where no supporting evidence is given to the questioner. Since this setup closely mirrors ODQA, it greatly reduces annotation bias.

# Questions unsuitable for ODQA
A question like "Who is the president of the United States?" might be solvable in MRC but not necessarily in ODQA. It's unclear whether the question asks about the current president, a list of all presidents, or a specific past president.

Handling these kinds of questions is also necessary.
