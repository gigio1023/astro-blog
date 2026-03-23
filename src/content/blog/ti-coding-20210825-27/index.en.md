---
title: "TIL Coding Notes 2021.08.25~27"
description: "TIL notes on wandb logging, fine-tuning pre-trained models, early stopping, and ensemble learning during an image classification competition."
date: "2021-08-26T23:45:48.082Z"
tags: ["pytorch", "naver-boostcamp", "ai-competition"]
draft: false
lang: en
translationOf: "ti-coding-20210825-27"
---

I was so busy coding and validating that I didn't take any notes. Time to catch up.

# conda, pip
conda is far better for dependency conflict resolution. However, it was very slow on the Naver servers. Most installs hit conflicts, and conda took over 5 minutes resolving them against all installed Python modules. It was even slower on Windows.

conda-forge covers virtually every package, but I used pip for smaller modules.

# wandb
Much better than tensorboard.
- tensorboard: reads log files left on the server side.
- wandb: the developer explicitly specifies what to update, when, and which objects from the Python script.

## wandb objects
A single wandb run object becomes a named collection of metrics on wandb.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/4ecb11b3-9b07-4405-bd98-f669fec6ae26-image.png)

If you update both train and validation in one run object, step display breaks.
![](/assets/images/TIL 코딩 정리 2021.08.25~27/952e8ca1-65f4-4fff-8b42-e627f2e0ccaf-image.png)

The intent was for train and validation metrics to progress separately. But updating the same run object interleaves them.

e.g., steps 1-10 update train, steps 11-15 update validation.

### Solution
Use separate wandb run objects for train and validation. I need to refactor everything.

# Fine tuning
I was only looking for pre-trained models that let you adjust class count, which limited my options. In hindsight, I can just grab any model and modify it — that's the whole point of PyTorch's flexibility.

1. Pick a pre-trained model.
2. Print the model structure.
3. Identify the output layer name.
4. Access the output layer by name as a model attribute and change the output.
5. Usually a linear layer, so initialize with Xavier.

# Dev / Test
Always test programs with a small network first, then switch to a heavy model when you need real results. Don't blindly test with efficientnet-b7; use resnet-18 or something smaller.

I'm also no longer doing everything on the server. I implement and test OS-independent code on my desktop, then deploy to the server. The server just keeps training while development happens on the desktop. The RTX 3070 means I don't need Colab.

# Path separators
I habitually use Linux-style `/`, but I should use `os.sep` or `os.path.join` to remove OS dependency.

# Ensemble learning
I thought ensemble learning modules would take arbitrary models and automatically produce an optimal one. There is actually a PyTorch module for that:

https://ensemble-pytorch.readthedocs.io/en/stable/quick_start.html

But it offered no customization, was inconvenient, and had no effect. I also looked at XGBoost and LightGBM, but they're fundamentally different model types from CNNs.

Since the competition's goal is solving mask classification with CNNs, implementing voting directly seemed best.

# Model save name
At my previous company, I created directories by date and dumped plot files, graph images, tensorboard logs, program logs, and other artifacts in there.

Similarly, I'm making directories by date and embedding the model name, feature name, and evaluation metrics in the filename.

# Early stopping
At my previous company, I did this heuristically. In hindsight, implementing it mechanically takes fewer than 100 lines. Why didn't I think of this sooner...

I decided to build a class that stops training if a metric doesn't improve for a given number of steps.

## delta
https://github.com/Bjarten/early-stopping-pytorch/blob/master/pytorchtools.py
Looking at a pre-built early stopping implementation, there's a delta added to the comparison expression.

Early stopping aims to halt when metrics converge, but defining "convergence" via simple numeric comparison is often inadequate.

Say early stopping triggers when a metric doesn't improve for 6 steps. If the metric barely rises then drops again repeatedly, early stopping never fires. You wanted to stop when the metric hovers around a value, but simple comparison resets the counter on any tiny change.

So delta captures that oscillation range and is added to the comparison. It's added (not subtracted) because the formula below is loss-based, and we don't want to count loss increases.

```python
elif score < self.best_score + self.delta:
    self.counter += 1
```
# Project structure
I referenced the Python template shown in class a lot.
https://github.com/victoresque/pytorch-template

Current project structure:
![](/assets/images/TIL 코딩 정리 2021.08.25~27/fa5294a5-736c-4735-a8d0-5f919ceddf39-image.png)

# git
## Config tracking
Data file paths and program settings end up in config.json or config.py. Manage them with git like this:
- If tracking config files:
  - Set up different config files per OS.
- If not tracking config files:
  - No worries.
  - Need to find a way to distribute config separately during deployment.

I alternate between Windows and Linux, so I don't track config files. But for proper deployment, you should track them with OS-specific variants.
## Stopping git tracking
I didn't know this existed since I never needed it. Good to know.
https://kamang-it.tistory.com/entry/TipGit-%EC%82%AC%EC%9A%A9%EC%8B%9C-%ED%8A%B9%EC%A0%95-%ED%8C%8C%EC%9D%BC%EC%9D%84-%ED%8A%B8%EB%9E%98%ED%82%B9%EC%9D%84-%ED%95%98%EA%B8%B0-%EC%8B%AB%EC%9D%84-%EA%B2%BD%EC%9A%B0

Used this to stop tracking config files and CSV artifacts.

## git rebase
At my previous company, I only used merge, and when asked to rebase before merging, I struggled. I should use rebase going forward for cleaner branch management. I forgot how, so I checked the docs.
https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0

## git default branch
Changing the default branch locally is doable via command.
https://stevenmortimer.com/5-steps-to-change-github-default-branch-from-master-to-main/

But changing the remote repository's default branch must be done by the repository admin through the GitHub website.
