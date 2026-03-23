---
title: "PyTorch Basic Syntax"
description: "Essential PyTorch operations: view vs reshape, squeeze, matrix multiplication, index_select, gather, and more."
lang: en
translationOf: "pytorch-basic-syntax"
date: "2021-08-17T13:07:14.697Z"
tags: ["pytorch"]
draft: false
---

Similar to numpy.

# view, reshape
I thought they were the same, but they differ.
https://sanghyu.tistory.com/3

- view: shares data with the original tensor
- reshape: no guarantee of data sharing with the original. It might or might not.

# squeeze, unsqueeze
I used these a lot but never knew the precise definition.

- squeeze: removes dimensions of size 1
  - e.g., (2,1,2) becomes (2,2)
- unsqueeze: adds a dimension of size 1 at a specified index
  - e.g., unsqueeze(2) on (2,3) inserts a size-1 dimension at position 2, giving (2,3,1)

# dot, matmul, mm
Covered in a previous post as well.
- For vector dot products: dot, matmul, mm
- For multi-dimensional matrix products: matmul, mm
  - mm: no broadcasting
  - matmul: supports broadcasting

# torch.index_select
https://pytorch.org/docs/stable/generated/torch.index_select.html

This was hard to understand at first, but it's easier if you think of it as tensor-level slicing similar to Python lists or numpy.

>
torch.index_select(input, dim, index, *, out=None) -> Tensor

input: the tensor to search.
dim: the axis along which to index.
index: a tensor specifying which indices to select.

```python
>>> x = torch.randn(3, 4)
>>> x
tensor([[ 0.1427,  0.0231, -0.5414, -1.0009],
        [-0.4664,  0.2647, -0.1228, -1.1068],
        [-1.1734, -0.6571,  0.7230, -0.6004]])
>>> indices = torch.tensor([0, 2])
>>> torch.index_select(x, 0, indices)
tensor([[ 0.1427,  0.0231, -0.5414, -1.0009],
        [-1.1734, -0.6571,  0.7230, -0.6004]])
>>> torch.index_select(x, 1, indices)
tensor([[ 0.1427, -0.5414],
        [-0.4664, -0.1228],
        [-1.1734,  0.7230]])
```
For example, torch.index_select(x, 0, indices) looks up elements along dimension 0 of x that match the indices. It returns the 0th and 2nd elements along dimension 0.

# torch.tensor slicing
Same as numpy.

# torch.tensor, torch.Tensor
Both create tensor objects, but there's a difference.
- torch.tensor requires data to create a tensor.
  - torch.tensor() without arguments is an error.
- torch.Tensor is the class itself. You can call torch.Tensor() to get the equivalent of torch.empty().

# torch.gather
https://pytorch.org/docs/stable/generated/torch.gather.html#torch.gather
>
torch.gather(input, dim, index, *, sparse_grad=False, out=None) -> Tensor

Slices input along the dim dimension according to index. I can use it, but I haven't been able to use it as cleanly as others. https://data-newbie.tistory.com/709

My approach is to create a tensor with the same shape as input and fill in the positions of the desired values.

```python
A = torch.Tensor([[[1, 2],
                   [3, 4]],
                  [[5, 6],
                   [7, 8]]])

indicies = torch.tensor([[[0],
                         [1]],
                        [[0],
                         [1]]])


output = torch.gather(A, 2, indicies).squeeze()

```

# torch.nn.Linear
The standard MLP layer I already know. It can also be used like this:

```python
X = torch.Tensor([[1, 2],
                  [3, 4]])
forward = nn.Linear(2, 5)
forward(X).shape
```
Obvious in hindsight, but it didn't come to mind easily.

# torch.nn.Identity
A layer that outputs the exact same tensor as the input, as the name suggests.

# torch.nn.LazyLinear
https://pytorch.org/docs/stable/generated/torch.nn.LazyLinear.html#torch.nn.LazyLinear

If I understand correctly, on the first forward pass it pulls weights and bias from torch.nn.UninitializedParameter and computes with those.

**Learned during peer session:**
- Only the output channel is defined; the input is left unspecified.
- Not used for variable-sized data inputs per se.
- Used to determine dimensions other than image channels or data size.

# nn.Module.register_buffer
https://pytorch.org/docs/stable/generated/torch.nn.Module.html?highlight=register_buffer#torch.nn.Module.register_buffer

https://discuss.pytorch.org/t/what-is-the-difference-between-register-buffer-and-register-parameter-of-nn-module/32723

When saving a model via state_dict, normally only network parameters like weights and biases are saved. If you want to save a tensor that isn't a parameter, use register_buffer. There seem to be use cases like controlling how BatchNorm tensors are handled.
