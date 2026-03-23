---
title: "Troubleshooting"
description: "Common PyTorch troubleshooting tips for GPU memory issues, OOM errors, tensor accumulation, and inference best practices."
date: "2021-08-22T20:10:07.453Z"
tags: ["pytorch"]
draft: false
lang: en
translationOf: "trouble-shooting"
---

# GPUtil
- Similar to nvidia-smi.
- Continuously prints GPU and memory stats to the console.

```python
!pip install GPUtil
import GPUtil
GPUtil.showUtilization()
```

# Tensor accumulation
Most tensor variables use GPU memory.

If these variables accumulate in a loop, GPU memory will be exhausted quickly.

e.g.,
```python
total_loss = 0
for i in range(10):
	optim.zero_grad()
    output = model(input)
    loss = criterion(output)
    loss.backward()
    optim.step()
    total_loss += loss ## here!!!
```

For tensors that accumulate, are used only once, or are simple, convert them to Python native objects whenever possible.


# Out of Memory (OOM)
- Try batch size = 1 first and experiment while monitoring memory.

# torch.no_grad()
Always use it during inference. Obviously, if you don't, backward pass computations accumulate just like during training.

# Model size
For example, LSTMs consume quite a bit of memory, so consider the model's own size too.

# Tensor dtype
Float precision can be set to 16-bit.
