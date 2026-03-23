---
title: "PyTorch Hook"
description: "Come usare gli hook di PyTorch per ispezionare e modificare i passaggi forward/backward in nn.Module."
lang: it
translationOf: "pytorch-hook"
date: "2021-08-18T23:40:41.171Z"
tags: ["pytorch"]
draft: false
---

Al liceo facevo cose come hackerare Pikachu Volleyball tramite DLL injection, e le tecniche che usavo erano una forma di hooking. nn.Module di PyTorch supporta ufficialmente questo tipo di meccanismo.

# Regole
Gli hook di PyTorch seguono queste regole:
- Se l'hook restituisce qualcosa, il valore restituito viene applicato all'oggetto originale.
- Se l'hook non restituisce nulla, l'oggetto si comporta normalmente.
- La funzione da agganciare viene passata come oggetto, quindi può avere qualsiasi nome.

Gli esempi di codice qui sotto dovrebbero chiarire il tutto.

# tensor hook
I tensor supportano hook solo per il backward.

torch.tensor.register_hook(function)

# nn.Module hook
Sono supportati quattro hook:
- register_forward_pre_hook
- register_forward_hook
- register_backward_hook (deprecato)
- register_full_backward_hook

## Firma di forward_pre_hook
def pre_hook(module, input)
	return Anything

Se restituisce qualcosa, l'input del forward viene sostituito con Anything.
Se non restituisce nulla, si limita a ispezionare l'input.

## Firma di forward_hook
def hook(module, input, output)
	return Anything

Se restituisce qualcosa, l'output del forward viene sostituito con Anything.
Se non restituisce nulla, è solo ispezione.

## full_backward_hook
def module_hook(module, grad_input, grad_output)

Se restituisce qualcosa, il grad_output usato durante l'aggiornamento di backward() può essere sostituito.
Se non restituisce nulla, è solo ispezione.
