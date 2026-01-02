---
title: "pytorch hook"
description: "."
date: "2021-08-18T23:40:41.171Z"
tags: ["PyTorch", "hook"]
draft: false
---

고등학생 때 DLL injection으로 피카츄 배구 해킹같은걸 했었는데, 그 때 사용했던 기법들이 일종의 hooking이다. 그런 기법들을 공식적으로 pytorch의 nn.Module에서 지원해준다.

# 규칙
pytorch의 hook들은 다음과 같은 규칙을 가진다.
- return이 있다면 해당 return을 본래 객체에 적용한다.
- return이 없다면 기존 객체의 동작대로 동작한다.
- hook될 함수는 객체로 전달되기 때문에 아무 이름이나 붙여되 된다.

아래 코드들을 보면 알거다.

# tensor hook
tensor는 backward에 대해서만 hook을 지원한다. 

torch.tensor.register_hook(function)

# nn.Module hook
아래와 같은 4개의 hook을 지원한다.
- register_forward_pre_hook
- register_forward_hook
- register_backward_hook (deprecated)
- register_full_backward_hook

## forward_pre_hook 형식
def pre_hook(module, input)
	return Anything
    
return이 있다면 forward의 input을 Anything으로 바꿀 수 있다.
return이 없다면 단순히 input을 조회할 뿐이다.

## forward_hook 형식
def hook(module, input, output)
	return Anything

return이 있다면 forward의 결과값이 Anything으로 교체된다.
return이 없다면 단순 조회.

## full_backward_hook
def module_hook(module, grad_input, grad_output)

return이 있다면 backard()를 통해 grad_ouput으로 업데이트 될 때, grad_output을 교체할 수 있다.
return이 없다면 단순 교체.