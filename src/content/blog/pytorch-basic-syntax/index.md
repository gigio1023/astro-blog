---
title: "pytorch 기본 문법"
description: "."
date: "2021-08-17T13:07:14.697Z"
tags: ["PyTorch"]
draft: false
---

numpy와 비슷하다.

# view, reshape
동일한건줄 알았는데 다르다고 한다.
https://sanghyu.tistory.com/3

- view: 원본 데이터와 데이터 공유
- reshape: 원본 데이터와 데이터 공유될지 보장 못함. 될수도 안될수도 있다.

# squeeze, unsqueeze
많이 사용했던 함수인데 제대로된 정의를 몰랐었다.

- squeeze: 차원이 1인 차원을 제거
  - e.g., (2,1,2)면 (2,2)로
- unsqueeze: 차원이 1인 차원을 추가, index 지정 가능하다.
  - e.g., (2,3)에 unsqueeze(2)를 하면 2번째에 차원이 1인 차원을 추가해서 (2,3,1)이 된다.
  
# dot, matmul, mm
이전 포스팅에서도 정리했던 내용이다.
- 벡터간 내적일 때 사용 가능: dot, matmul, mm
- 다차원행렬간 내적일 때 사용 가능: matmul, mm
  - mm: broadcasting 불가
  - matmul: broadcasting 지원
  
# torch.index_select
https://pytorch.org/docs/stable/generated/torch.index_select.html

이해가 어려웠는데 python의 list나 numpy에서 slicing하는 것을 tensor 단위로 한다고 생각하면 편하다.

>
torch.index_select(input, dim, index, *, out=None) → Tensor

input: 검색 대상이다.
dim: axis, index의 기준을 설정한다.
index: tensor를 입력으로 한다. 어떤 것을 찾을지 결정한다.

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
가령 torch.index_select(x, 0, indices)는 x tensor에서 0차원을 기준으로 indices에 해당하는 것들을 찾고자 하는 것이다. 즉, 0번째 차원의 0번째, 2번째 요소들을 반환한다.

# torch.tensor slicing
numpy랑 같다

# torch.tensor, torch.Tensor
두 함수 모두 tensor를 객체로 구현하기 위한 함수이다. 다만 차이점이 있다.
- torch.tensor는 tensor 생성에 데이터가 필요하다.
  - torch.tensor()는 오류다.
- torch.Tensor는 원형 클래스 자체이다. 즉, torch.empty()의 기능을 수행하기 위해 torch.Tensor()만을 부를수도 있다.

# torch.gather
https://pytorch.org/docs/stable/generated/torch.gather.html#torch.gather
>
torch.gather(input, dim, index, *, sparse_grad=False, out=None) → Tensor

dim 차원 관점에서 input을 index만큼 slicing해준다. 사용하라면 사용 가능한데 남들처럼 깔끔하게 사용을 못하겠다.https://data-newbie.tistory.com/709

나는 input과 동일한 tensor를 생성하고 해당 tensor에서 원하는 값의 위치를 적어주는 식으로 사용하고 있다.

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
내가 아는 그 mlp의 한 layer이다. 이걸 아래처럼 사용하기도 하더라.

```python
X = torch.Tensor([[1, 2],
                  [3, 4]])
forward = nn.Linear(2, 5)
forward(X).shape
```
당연한거긴한데, 쉽게 생각이 안났다..

# torch.nn.Identity
말 그대로 입력과 동일한 tensor를 출력으로 내보내주는 layer다.

# torch.nn.LazyLinear
https://pytorch.org/docs/stable/generated/torch.nn.LazyLinear.html#torch.nn.LazyLinear

내가 이해한게 맞다면
첫번째 forward에서는 torch.nn.UninitializedParameter에서 weight와 bias를 가져와서 연산한다. 


**피어세션 때 알게 된 내용**
- input을 고정하지 않고 output channel만 정의
- 데이터의 크기를 가변적으로 받는데 사용하지는 않는다.
- 이미지의 채널이나 데이터 크기 외의 dimension을 결정하기 위해 사용한다.

# nn.Module.register_buffer
https://pytorch.org/docs/stable/generated/torch.nn.Module.html?highlight=register_buffer#torch.nn.Module.register_buffer

https://discuss.pytorch.org/t/what-is-the-difference-between-register-buffer-and-register-parameter-of-nn-module/32723

state_dict로 모델을 저장할 때, 보통 네트워크의 w, bias들과 같은 parameter들만 저장된다. 
가령, parameter외의 tensor를 저장하고 싶을 때는 register_buffer를 쓰면 된다. BN의 tensor를 어떻게 사용할건지 등, 사용할 곳이 있다고는 하더라.