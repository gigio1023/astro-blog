---
title: "PyTorch apply"
description: "Come nn.Module.apply() di PyTorch applica una funzione a tutti i sottomoduli tramite attraversamento in post-ordine."
lang: it
translationOf: "pytorch-apply"
date: "2021-08-19T00:07:50.898Z"
tags: ["pytorch"]
draft: false
---

Una funzione che applica una data funzione a tutti i sottomoduli di un nn.Module, in modo simile a map.

Attraversa i moduli con un postorder traversal, dando priorità al figlio sinistro.
```python
def do_something(m):
	# do something!
	return m
model = #something very complex model
result = model.apply(print_module)

```
