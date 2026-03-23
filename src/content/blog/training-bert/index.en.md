---
title: "Training BERT"
description: "BERT training pipeline details: tokenizer creation, dataset construction with NSP, masking strategies, segment handling, and truncation."
date: "2021-09-28T02:22:24.556Z"
tags: ["nlp"]
draft: false
lang: en
translationOf: "training-bert"
---

# Process
1. Create Tokenizer
2. Make Dataset
3. NSP (Next Sentence Prediction)
4. Masking

# Training
This somewhat contradicts what I learned earlier, so I'm noting it down.

> For domain-specific tasks, training from scratch using **only domain-specific data** outperforms fine-tuning a pretrained model.

![](/assets/images/Training BERT/54e501c8-a585-4e61-b0dd-0f09f295c423-image.png)
ref: https://huggingface.co/microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract

This is a paper that trained BERT from scratch using data from PubMed, one of the largest archives of biomedical journals.

![](/assets/images/Training BERT/4e949c96-0eef-437c-a499-dcf459faa0b6-image.png)

These are BERT scores on biomedical tasks. For example, BC5-chem is a chemical NER task. For such domain-specific tasks, training BERT from scratch on biomedical data outperformed fine-tuning.

# Data
![](/assets/images/Training BERT/b2f590fc-3d8a-46d0-b00a-2e19fd8f2ffd-image.png)
## Dataset
Transform data into a form the model can consume. For BERT, you need to create:
- input_ids: Vocab IDs generated through Token Embedding.
- token_type_ids: Segment IDs generated through Segment Embedding.
- Positional encoding information.

### target_seq_length
https://github.com/huggingface/transformers/blob/5e3b4a70d3d17f2482d50aea230f7ed42b3a8fd0/src/transformers/data/datasets/language_modeling.py#L247

This is BERT code on GitHub. The embedding size is controlled as follows:
- max_num_tokens: maximum number of tokens that can go into BERT.

```python
target_seq_length = max_num_tokens
if random.random() < self.short_seq_probability:
     target_seq_length = random.randint(2, max_num_tokens)
```
short_seq_probability makes target_seq_length randomly variable.

The reason for this is model generalization. If all data is packed to max_num_tokens, the model might not handle other token counts well. So the max embedding size is randomly adjusted to produce a more flexible model.

### Segment control
https://github.com/huggingface/transformers/blob/5e3b4a70d3d17f2482d50aea230f7ed42b3a8fd0/src/transformers/data/datasets/language_modeling.py#L258

Starting from line 258, the code controls segments. The dataset tries to fill the max embedding size. That is, **if 'sentence_1[SEP]sentence_2' is too short, it will create something like 'sentence_1+sentence_2[SEP]sentence_3+sentence_4'.** There are still only 2 segments — 'sentence_1+sentence_2' becomes one segment.

The code randomly cuts Segment A's length — it picks a random integer and uses only that many tokens as the segment.

### Truncation
https://github.com/huggingface/transformers/blob/5e3b4a70d3d17f2482d50aea230f7ed42b3a8fd0/src/transformers/data/datasets/language_modeling.py#L293

'SegmentA[SEP]SegmentB' might exceed the max embedding size. That's when truncation is needed.

Truncation repeats:

1. Randomly pick either Segment A or B.
2. Remove the last token from the selected segment.
3. Check the token count; if truncation is still needed, go back to step 1.

## Dataloader
Determines how data is delivered to the model. For BERT, this boils down to the masking strategy.
