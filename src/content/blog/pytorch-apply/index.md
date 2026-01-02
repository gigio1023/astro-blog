---
title: "pytorch apply"
description: "."
date: "2021-08-19T00:07:50.898Z"
tags: ["PyTorch", "apply"]
draft: false
---

nn.Module의 모든 하위 모듈들에 일괄적으로 적용하고 싶은 함수를 map과 같이 적용시켜주는 함수다.

Postorder traversal 방식으로 module들을 순회한다고 한다. left child 우선으로 탐색.
```python
def do_something(m):
	# do something!
	return m
model = #something very complex model
result = model.apply(print_module)

```