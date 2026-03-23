---
title: "Pratica con gli Optimizer"
description: "Confronto pratico tra gli optimizer SGD, Momentum e Adam nell'approssimazione di funzioni con dati rumorosi in PyTorch."
date: "2021-08-10T07:58:31.504Z"
tags: ["dl", "pytorch"]
lang: it
translationOf: "optimizer-practice"
draft: false
---

## Setup su Colab
```python
%config InlineBackend.figure_format='retina'
```
Imposta la risoluzione di output per matplotlib e simili a retina.

## Rumore
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
Il grafico sopra mostra la funzione originariamente intesa. Aggiungiamo il rumore.
Il rumore viene implementato moltiplicando np.random.randn() per un piccolo valore reale di 3e-2, come mostrato nel codice sopra.
![](/assets/images/Optimizer 실습/95e2a7f4-1755-447c-929d-e3bdb570a047-image.png)


## Confronto degli Optimizer
![](/assets/images/Optimizer 실습/ec72c958-f2cd-45c4-a3d6-f6065c0fb9b3-image.png)
![](/assets/images/Optimizer 실습/851dd821-a73e-4f8d-aede-9a0960ae7c9c-image.png)
![](/assets/images/Optimizer 실습/fce0de37-8504-4b73-936a-7d5a347684f3-image.png)

Grafici che mostrano quanto bene il modello di ogni optimizer approssima la funzione alle epoche 500, 3500 e 9999. GT e la funzione target da approssimare.

Adam stava gia approssimando dall'inizio. Molto veloce. SGD e Momentum sembrano simili.