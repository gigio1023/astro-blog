---
title: "PyTorch Hook"
description: "How to use PyTorch hooks for inspecting and modifying forward/backward passes in nn.Module."
lang: en
translationOf: "pytorch-hook"
date: "2021-08-18T23:40:41.171Z"
tags: ["pytorch"]
draft: false
---

Back in high school I did things like hacking Pikachu Volleyball via DLL injection, and the techniques I used were a form of hooking. PyTorch's nn.Module officially supports that kind of mechanism.

# Rules
PyTorch hooks follow these rules:
- If the hook returns something, that return value is applied to the original object.
- If the hook returns nothing, the object behaves as usual.
- The hooked function is passed as an object, so you can name it anything.

The code examples below should make this clear.

# tensor hook
Tensors only support hooks for backward.

torch.tensor.register_hook(function)

# nn.Module hook
Four hooks are supported:
- register_forward_pre_hook
- register_forward_hook
- register_backward_hook (deprecated)
- register_full_backward_hook

## forward_pre_hook signature
def pre_hook(module, input)
	return Anything

If it returns something, the forward input gets replaced with Anything.
If it returns nothing, it simply inspects the input.

## forward_hook signature
def hook(module, input, output)
	return Anything

If it returns something, the forward output gets replaced with Anything.
If it returns nothing, it's just inspection.

## full_backward_hook
def module_hook(module, grad_input, grad_output)

If it returns something, the grad_output used during backward() update can be replaced.
If it returns nothing, it's just inspection.
