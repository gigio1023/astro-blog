---
title: "Optimizer 실습"
description: "."
date: "2021-08-10T07:58:31.504Z"
tags: ["DL", "Optimizer", "PyTorch"]
draft: false
---

## colab 설정
```python
%config InlineBackend.figure_format='retina'
```
matplotlib와 같은 출력물의 해상도를 retina로 설정

## 노이즈
```python
n_data = 10000
x_numpy = -3+6*np.random.rand(n_data,1)
# y_numpy = np.exp(-(x_numpy**2))*np.cos(10*x_numpy)
y_numpy = np.exp(-(x_numpy**2))*np.cos(10*x_numpy) + 3e-2*np.random.randn(n_data,1)
plt.figure(figsize=(8,5))
plt.plot(x_numpy,y_numpy,'r.',ms=2)
plt.show()
x_torch = torch.Tensor(x_numpy).to(device)
y_torch = torch.Tensor(y_numpy).to(device)
print ("Done.")
```
![](/assets/images/Optimizer 실습/f9fa06fa-733a-458b-8c5c-4cf9aba778bb-image.png)
본래 의도한 함수의 그래프는 위와 같다. 해당 그래프에 노이즈를 추가해보자.
노이즈는 위 코드에 서술됐듯이, np.random.randn()에 작은 실수값인 3e-2를 곱해줘서 구현된다.
![](/assets/images/Optimizer 실습/95e2a7f4-1755-447c-929d-e3bdb570a047-image.png)


## optimizer 비교
![](/assets/images/Optimizer 실습/ec72c958-f2cd-45c4-a3d6-f6065c0fb9b3-image.png)
![](/assets/images/Optimizer 실습/851dd821-a73e-4f8d-aede-9a0960ae7c9c-image.png)
![](/assets/images/Optimizer 실습/fce0de37-8504-4b73-936a-7d5a347684f3-image.png)

500번째, 3500번째, 9999번재 epoch에서 각각의 optimizer를 활용한 모델이 함수를 얼마나 근사하고 있는지 나타내는 그래프들이다. GT는 근사하고자 하는 그래프다.

ADAM은 초기부터 벌써 근사했다. 매우 빠르다. SGD와 Momentum은 비슷해보인다.