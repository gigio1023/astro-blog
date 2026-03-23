---
title: "Multi GPU"
description: "Guide to multi-GPU training in PyTorch covering model parallelism, DataParallel, and DistributedDataParallel with code examples."
date: "2021-08-20T08:14:42.707Z"
tags: ["pytorch", "dl"]
lang: en
translationOf: "multi-gpu"
draft: false
---

## node
A term used interchangeably with system.

## model parallelization
![](/assets/images/Multi gpu/94cb8fdb-a3de-471a-a93c-998795dd3c17-image.png)
Model parallelization was already used in AlexNet.

![](/assets/images/Multi gpu/67beca0a-0359-4bb8-8dd6-e8b1ebe83c05-image.png)
Good GPU parallelization requires coding a pipeline structure so that GPUs are used simultaneously, as shown in the figure.

## data parallelization
![](/assets/images/Multi gpu/31b41aa1-a575-4581-aef3-26b9cce4c85f-image.png)

1. GPU1 collects data and distributes it
2. Each GPU runs forward pass independently
3. GPU1 collects forward results
4. GPU1 distributes gradient information
5. Each GPU computes gradients independently
6. Gradients are collected and computed

### DataParallel in PyTorch
- Implements the approach described above directly
- Simply distributes data and takes the average
- Reduced batch size due to unbalanced GPU usage


### DistributedDataParallel in PyTorch
Each GPU gets its own CPU thread and computes its own averaged results independently.

- sampler: an object that determines how data is sampled from the dataloader. Provided by torch.

```
train_sampler = torch.utils.data.distributed.DistributedSampler(train_data)
shuffle = False
pin_memory = True

train_loader = torch.utils.data.DataLoader(train_data, batch_size=20, shuffle=shuffle, pin_memory=pin_memory, num_workers=4, sampler=train_sampler)

```

- num_workers: number of threads. Typically set to 4x the number of GPUs.
- pin_memory: data goes through paging in memory, then gets pinned, then loaded to GPU -- this option pins it directly.

---
```python
def main():
    ngpus_per_node = torch.cuda.device_count()
    world_size = ngpus_per_node

    torch.multiprocessing.spawn(main_worker, nprocs=ngpus_per_node, args=(ngpus_per_node, ))

```

Create a worker and pass it to spawn like Python's map function.

ref: https://blog.si-analytics.ai/12
