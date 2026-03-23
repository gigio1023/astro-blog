---
title: "PyTorch Dataset and DataLoader"
description: "Guide to PyTorch Dataset and DataLoader: data flow, tensor conversion, samplers, collate_fn, and transforms."
lang: en
translationOf: "pytorch-dataset-dataloader"
date: "2021-08-19T01:53:16.064Z"
tags: ["pytorch"]
draft: false
---

I implemented a custom dataset and dataloader for my graduation project, but I was under time pressure and the result was a mess in my memory. I took this chance to organize the parts I found confusing or didn't know.

# Data flow
![](/assets/images/pytorch dataset, dataloader/a659d452-c938-4671-a516-55c059003eec-image.png)

The important thing is that converting data to tensors also needs separate consideration. I used to just throw conversions in wherever...

# torch.utils.Data.Dataset
\_\_len\_\_, \_\_getitem\_\_, etc. -- just implement them to fit your data.

## Tensor conversion
Not done in \_\_getitem\_\_!
That is, data is not converted to tensors at load time. Instead, a function like a transformer converts everything to tensors in bulk when training begins.

Fortunately, CPU and GPU handle these operations in parallel, so it's fast.

Recently, standardized libraries like HuggingFace are also used.

# torch.utils.Data.DataLoader
- A class that generates data batches.
- Handles data conversion right before training (before GPU feed).
  - Conversion to tensors.
- Parallel data preprocessing needs to be considered.

See this blog for reference:
https://subinium.github.io/pytorch-dataloader/

## sampler
Defines how to control the idx passed to getitem. batch_sampler works the same way.

## collate_fn
Defines how to transform a batch collected via getitem from [[data, label], [data, label], [data, label] ...] into [[data, data, data ...], [label, label, label, ...]].

# torchvision.transforms

```python
data_transform = transforms.Compose([
        transforms.RandomSizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])
```

You should compose a separate transform pipeline for data conversion like this. No more converting each item one by one inside the dataset like I did in my graduation project.
