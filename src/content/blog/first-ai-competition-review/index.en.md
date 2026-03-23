---
title: "Wrapping Up My First AI Competition"
description: "Retrospective on a mask/age/gender image classification competition: model selection, augmentation, CutMix, and lessons learned."
date: "2021-09-06T11:01:54.134Z"
tags: ["ai-competition", "naver-boostcamp"]
lang: en
translationOf: "first-ai-competition-review"
draft: false
---

It was only two weeks, but since I pulled all-nighters the whole time, it felt more like four. Here's a summary of the things I tried and the methods others used.

# Final Results
Code I implemented for the experiments: https://github.com/naem1023/boostcamp-pstage-image

I was happy that my model helped us place 5th, but the real value was staying up late coding and experimenting with teammates. I'd never felt that kind of camaraderie outside of school before -- this was my first time experiencing a bond beyond just business collaboration.

When scored on public data we were 10th, so the mood was "well, we fought hard." When the final ranking including private data came out and we jumped up, we were in full celebration mode.

The f1 score barely changed between public and private data, which suggests that our focus on building a robust model paid off.

# Competition Overview
18 classes are composed of mask (3 classes), gender (2 classes), and age (3 classes). The task is to build a classifier for these 18 classes based on the training data and submit a submission.csv for scoring.

# Training Plan
First training plan: https://velog.io/@naem1023/TIL-train-%EA%B3%84%ED%9A%8D-%EC%A0%95%EB%A6%AC-2021.08.24
Second training plan: https://velog.io/@naem1023/TIL-train-%EA%B3%84%ED%9A%8D-%EC%A0%95%EB%A6%AC-2021.08.24-xuou0hx5

At first I vaguely planned to do ensemble but couldn't even figure out how. After getting feedback from teammates, I put together a structured model training plan, and that became the foundation for everything that followed.

# Training Pipeline
ref: https://github.com/victoresque/pytorch-template
I tried structuring the code using this template. The goal was full abstraction -- for example, teammates would inherit from BaseTrainer to create their own Trainers. That didn't quite work out, but at least we got value from using OOP.

## config
I set up configurations in config.py so that running train.py would handle training automatically. Ideally you'd have a config.json with a matching parser, but I wanted to run experiments quickly rather than spend time building a parser.
I just defined configuration values as variables in config.py and used Python syntax to compose them. Simple enough.

# Backbone Model
I tried several models; here are the results:
- Experimental models (ResNet18, EfficientNet-b2)
  - Used for quick results when testing augmentation, CutMix, etc.
  - Interestingly, after applying CutMix, ResNet18 performed poorly. F1 scores hovered around 0.6-0.7, making it hard to tell the difference between various CutMix techniques. For instance, the effect of vertical CutMix with random lambda ratios wasn't visible on ResNet18.
  - Larger models did show meaningful differences across CutMix approaches, so from week 2 I switched to EfficientNet-b2 for experiments.
- Validation model (EfficientNet-b7)
  - I wanted to use EfficientNet-b4, but b7 edged it out by a few decimal places, so I used b7 for validation.
  - The 1st and 2nd place teams used EfficientNet-b0 and ResNet152.

# Augmentation
Albumentations attempt: https://velog.io/@naem1023/Preprocessing

Albumentations was attractive for its speed, but the variety of transformations it offers was the real draw. Worked great.

One thing to watch out for: unlike PyTorch's transforms, it returns a dictionary.

# Preprocessing
## Face Crop
Since this is about mask, age, and gender classification, our team agreed that removing the background was important. Someone on the team obtained a face-cropped dataset and we used it.

The 1st and 2nd place teams actually didn't do face cropping. Surprising.

My guess is that finding a person in a photo is a relatively easy task for the model, so removing the background might not be necessary.

## Transformation
https://velog.io/@naem1023/TransformationAlbumentation
I wrote a separate post about this and followed it. The key idea was to use strong augmentation to build a robust model, since we didn't have much data.

## Changing Label Criteria
I changed the age group boundaries. The competition's default guide split age into 3 groups at 30 and 60 to derive the 18 classes. But the data was extremely imbalanced, making training nearly impossible with those thresholds.

![](/assets/images/첫번째 Ai Competition 마무리/398ac5b3-a8f7-4d62-9441-37e7f968c8dd-image.png)

- Very few people around age 30 fell into the 30-60 group.
- The 60+ group had far fewer people than the other groups.

To address this:
- Moved the lower boundary from 30 to 29 to slightly increase the 30-60 group's data.
- Moved the upper boundary from 60 to 59 to increase the 60+ group's data.

# Feature Splitting
Fortunately, our team raised this issue on day one.
The competition requires classifying images into 18 classes using mask, age, and gender features. But someone pointed out that these features have no correlation or causal relationship with each other. I agreed.

In our team, I trained with features split while others trained with all features combined. The split approach was marginally better -- a few points at the second decimal place.

Of course, in a competition that margin matters a lot. But I can't say that splitting uncorrelated features had a huge effect. I think models are generally large enough that they can learn mask, gender, and age features simultaneously -- effectively learning multiple features in parallel even without an explicit causal link.

# Label Smoothing
For our team, applying label smoothing actually hurt performance. The 1st and 2nd place teams used it though, so there might have been something wrong with how we applied it.

# Validation Set Construction
This was something our team somewhat neglected. The reasoning was: why bother when you can just submit a CSV and get scored?

Looking back, that was a terrible mindset. Many training techniques rely on validation set metrics for decision-making. A poorly constructed validation set is garbage.

Of course, the validation set itself doesn't participate in model parameter updates, so a bad validation set doesn't directly mean bad training. But for the reasons above, it absolutely must be done properly.

## Construction Method
- Ensure the same person doesn't appear in both train and test sets.
  - Each person has 5 mask photos, 1 normal, and 1 incorrect. If these 7 photos are scattered across train and test sets, the same person appears in both. Validation scores for that person would be artificially high, distorting the metrics.
- Ensure identical class distributions in train and test sets.
  - By the law of large numbers, randomly splitting a very large dataset would yield similar distributions. But the competition data wasn't large enough, so we needed to explicitly balance class distributions.

# Loss Function
I used focal loss, which assigns higher weight to underrepresented classes. This was consistent across virtually all teams.

The difference was that the 1st and 2nd place teams used f1 loss -- adding the f1 score to the loss value after loss.backward() but before optimizer.step(). This guides the loss function toward reducing the f1 score.

# CutMix
The much-discussed CutMix. Ironically, the 1st and 2nd place teams didn't use CutMix -- they used CutOut.

Our team's CutMix implementation is documented here:
https://velog.io/@naem1023/CutMix
https://velog.io/@naem1023/CutMix-vertical

# DataSampler
The DataLoader lets you specify a sampler. I used RandomSampler when splitting train and test sets.

Another team used ImbalancedDatasetSampler (beyond the official PyTorch library) to somewhat balance the imbalanced data.

# One-Hot Vector?
Most teams used one-hot vectors for multi-label classification, but the 2nd place team didn't. They passed the output through sigmoid so each class had an independent probability, then used torch.argmax to select the highest-probability class -- same as you'd do when constructing a one-hot vector.

# Pseudo Labeling
The much-discussed method. Our team didn't even consider it because we knew from Dacon and other domestic competitions that using the test set was prohibited. Turns out the Boostcamp competition rules actually allowed it. Didn't know that...

It's a methodology for using unlabeled data (test set data or images crawled from the internet) as training data. Once a model is trained enough to do inference, you use it to label the unlabeled data and add that to your training set. Essentially, it strongly reinforces the model's existing learning direction.

It's close to a gamble, since there's no guarantee the model's current learning direction is correct. But in a competition like this, where a top-performing model emerges toward the end, it's very useful.

The f1 score difference from the 1st and 2nd place teams was just 0.01, and pseudo labeling seems like the biggest factor.

# TTA
The day before the deadline, TTA bumped my best submission from 0.7665 to 0.7666. As the result suggests, it's not a dramatic improvement -- more of a score-locking technique.

# Retrospective
I missed way more techniques than I expected. The validation set construction was particularly critical. The results were good, but these aren't methods you'd use in a production setting. Getting a good score was nice, but more importantly it was a chance to identify all the things I overlooked.
