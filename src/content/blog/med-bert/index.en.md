---
title: "Med-BERT"
description: "A review of Med-BERT, a BERT-based model pretrained on structured EHR data for disease prediction."
date: "2022-05-17T00:00:00.000Z"
tags: ["nlp", "paper-review"]
draft: false
lang: en
translationOf: "med-bert"
---

# Primary Contributions

The contributions presented in the paper are as follows:

1. The first study to provide a proof of concept demonstrating the value of a BERT-style model trained on structured EHR data for real-world modeling tasks.
2. Designed a domain-specific cross-visit pretraining task capable of capturing general and contextual semantics from EHR data.
3. The first demonstration of outperforming SOTA methods on multiple clinical tasks using phenotyped cohorts.
4. Generalization of the EHR BERT model by evaluating on a dataset (Truven) different from the training dataset (Cerner).
5. Performance improvements of Med-BERT observed across all sample sizes. The pretrained model works well even when training data is limited.
6. Provided a visualization tool for EHR dependency semantics.
7. Released the pretrained model and code publicly.


# Abstract
Previous studies that attempted to model structured EHR (Electronic Health Records) via transfer learning include BEHRT and G-BERT.

BEHRT was pretrained by predicting medical codes from visit records. Because it used non-standard metrics such as AUC, it was difficult to compare with existing research.

G-BERT learned GNN and BERT embeddings through clinical codes. It modified the MLM pretraining task into a domain-specific task that maximizes the difference between existing clinical codes and non-existent ones, and predicts different clinical codes. However, G-BERT's input data consisted of single-visit samples, which was insufficient for identifying long-term contextual information in EHRs.

To address these issues and build a model specialized for disease prediction, the authors designed Med-BERT. While the original BERT learns from free text, Med-BERT learns from structured diagnostic data using ICD (International Classification of Disease) codes.

# Compare with Relevant Study
![](/assets/images/Med-BERT/20220517112753.png)

Med-BERT has a larger vocabulary size and a larger pretraining cohort than BEHRT and G-BERT. The paper argues that pretraining with a larger cohort size and longer visit sequences helps the model better understand contextual semantics.

Furthermore, since Med-BERT was pretrained using large, publicly accessible vocabularies such as ICD-9 and ICD-10, along with data from multiple institutions, the authors claim it should be well-suited for different institutions and clinical scenarios.

Similar to BEHRT and G-BERT, Med-BERT uses code embeddings for clinical codes, visit embeddings to distinguish different visits, and transformers to identify inter-code relationships. While BEHRT and G-BERT did not use code ordering within visits, Med-BERT introduces serialization embeddings to represent the relative order of codes.

The paper designed a domain-specific pretraining task for predicting prolonged length of stay in hospital (Prolonged LOS). This is a well-known clinical problem that requires modeling the severity of patient health information based on disease progression and does not require human annotation. Learning such a task helps the model better capture clinical and contextualized features.

# Fine-tuning
The usefulness of the pretrained Med-BERT is evaluated by fine-tuning on the following two prediction tasks across 3 patient cohorts from two different EHR datasets:
- Heart failure among patients with diabetes (DHF)
- Onset of pancreatic cancer (PaCa)

The paper argues that these tasks are well-suited for evaluating model generalization because they differ from the pretraining prediction tasks (MLM and Prolonged LOS). The two tasks above were selected as fine-tuning tasks for the following reasons:
- They contain more complex information than specific diagnosis codes.
- These tasks are based on phenotyping algorithms that integrate multiple types of information beyond diagnosis codes, such as temporal constraints, timing of diagnosis onset, medications, and laboratory data.

Fine-tuning was conducted with the following objectives:
- Testing whether adding Med-BERT to 3 SOTA models improves performance
- Comparing Med-BERT with pretrained non-contextualized embeddings (word2vec-style embeddings)
- Evaluating Med-BERT's disease prediction performance across different fine-tuning training sizes

# Med-BERT Architecture
## Input Data Modality
The same architecture (multi-level embedding, bidirectional transformer) and similar pretraining techniques (loss function on masking, classification pretraining task) as the original [BERT paper](https://arxiv.org/abs/1810.04805) were used. Since there are semantic differences between EHR and text, it is important to adapt BERT's methodology to structured EHR.

![](/assets/images/Med-BERT/20220517135319.png)
The original BERT's input data is one-dimensional, but structured EHR is multilayer, multi-relational data. Therefore, the key challenge is how to flatten structured EHR data into one dimension and encode it for BERT.

Table 3 specifies these differences.

![](/assets/images/Med-BERT/20220517135430.png)

## Model Architecture

![](/assets/images/20220517135639.png)

Med-BERT has three types of input:
- Code embedding
  - Low-dimensional representations of each diagnosis code
- Serialization embedding
  - Relative order of each visit. For the data in this paper, this refers to the priority order of each code in each visit.
- Visit embedding
  - Distinguishes each visit in the sequence

Unlike BERT, Med-BERT does not use [CLS] or [SEP] tokens. Because the sequence length is too long to summarize information into [CLS], a separate feed-forward layer compresses the content of the output tokens. The paper also argues that [SEP] is unnecessary because visit embeddings alone can sufficiently separate individual visit information.

# Pretraining Med-BERT
Pretraining was done using the recommended hyperparameters and algorithms from the original BERT paper.

## Masked LM
The masking algorithm from the original BERT paper was used. For a randomly selected code, there is an 80% chance it is replaced with a [MASK] token, a 10% chance it is replaced with a random code, and a 10% chance it remains unchanged.

## Prediction of Prolonged Length of Stay (Prolonged LOS) in Hospital

To ensure the pretrained model's generalizability, a clinical problem was selected that is not disease-specific and is similar to the pretraining dataset. Commonly used quality-of-care indicators in hospitals -- mortality, early readmission, and prolonged LOS -- were candidates for the pretraining task. Among these, mortality and early readmission turned out to be relatively easy tasks with accuracy exceeding 99%. Therefore, the task of predicting whether a hospital stay exceeds 7 days was chosen as the pretraining task.

Structurally, prolonged LOS leverages Med-BERT's bidirectional architecture because a patient's health information recorded in past visits has an impact on LOS for subsequent visits. In contrast, disease onset and mortality always end at the last visit in the patient information sequence, making them inherently unidirectional.

# Downstream Prediction Task by Fine-tuning
The pretrained model only outputs general-purpose embeddings for the input data and cannot produce prediction labels on its own.

In EHR predictive models, an RNN was used as the prediction head.

# Evaluation
Two disease prediction tasks were performed using 3 cohorts from 2 databases.
- Two tasks: DHF and PaCa prediction
- 3 cohorts: DHF-Cerner and PaCa-Cerner cohorts for both tasks; Truven for pancreatic cancer prediction only

Unlike BEHRT and G-BERT, Med-BERT's pretraining and evaluation tasks are more complex and require phenotyping from multiple perspectives. The paper argues that their methodology is more realistic and helps establish generalizability.

The comparison methods used are as follows:
- GRU, Bi-GRU
- RETAIN: a popular disease prediction model with double GRUs with attention model
- L2LR: L2-regularized logistic regression
- RF: random forest

![](/assets/images/20220517160625.png)



# Reference
- Med-BERT: https://www.nature.com/articles/s41746-021-00455-y
- Med-BERT Github: https://github.com/ZhiGroup/Med-BERT
- BEHRT: https://www.nature.com/articles/s41598-020-62922-y
- G-BERT: https://arxiv.org/abs/1906.00346
