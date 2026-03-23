---
title: "PyTorch apply"
description: "How PyTorch's nn.Module.apply() maps a function across all submodules via postorder traversal."
lang: en
translationOf: "pytorch-apply"
date: "2021-08-19T00:07:50.898Z"
tags: ["pytorch"]
draft: false
---

A function that applies a given function to all submodules of an nn.Module, similar to map.

It traverses modules using postorder traversal, prioritizing the left child.
```python
def do_something(m):
	# do something!
	return m
model = #something very complex model
result = model.apply(print_module)

```
