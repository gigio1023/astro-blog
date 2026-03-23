---
title: "Optimizer Practice"
description: "Practical comparison of SGD, Momentum, and Adam optimizers on function approximation with noisy data in PyTorch."
date: "2021-08-10T07:58:31.504Z"
tags: ["dl", "pytorch"]
lang: en
translationOf: "optimizer-practice"
draft: false
---

## Colab Setup
```python
%config InlineBackend.figure_format='retina'
```
Sets the output resolution for matplotlib and similar to retina.

## Noise
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
The graph above shows the originally intended function. Let's add noise to it.
Noise is implemented by multiplying np.random.randn() by a small real value of 3e-2, as shown in the code above.
![](/assets/images/Optimizer 실습/95e2a7f4-1755-447c-929d-e3bdb570a047-image.png)


## Optimizer Comparison
![](/assets/images/Optimizer 실습/ec72c958-f2cd-45c4-a3d6-f6065c0fb9b3-image.png)
![](/assets/images/Optimizer 실습/851dd821-a73e-4f8d-aede-9a0960ae7c9c-image.png)
![](/assets/images/Optimizer 실습/fce0de37-8504-4b73-936a-7d5a347684f3-image.png)

Graphs showing how well each optimizer's model approximates the function at epochs 500, 3500, and 9999. GT is the target function to approximate.

Adam was already approximating from the start. Very fast. SGD and Momentum look similar.