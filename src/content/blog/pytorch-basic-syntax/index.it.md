---
title: "Sintassi base di PyTorch"
description: "Operazioni essenziali di PyTorch: view vs reshape, squeeze, moltiplicazione matriciale, index_select, gather e altro."
lang: it
translationOf: "pytorch-basic-syntax"
date: "2021-08-17T13:07:14.697Z"
tags: ["pytorch"]
draft: false
---

Simile a numpy.

# view, reshape
Pensavo fossero uguali, ma sono diversi.
https://sanghyu.tistory.com/3

- view: condivide i dati con il tensor originale
- reshape: nessuna garanzia di condivisione con l'originale. Potrebbe condividere o no.

# squeeze, unsqueeze
Li ho usati spesso senza conoscerne la definizione precisa.

- squeeze: rimuove le dimensioni di taglia 1
  - es. (2,1,2) diventa (2,2)
- unsqueeze: aggiunge una dimensione di taglia 1 a un indice specificato
  - es. unsqueeze(2) su (2,3) inserisce una dimensione di taglia 1 alla posizione 2, ottenendo (2,3,1)

# dot, matmul, mm
Già trattato in un post precedente.
- Per prodotti scalari tra vettori: dot, matmul, mm
- Per prodotti tra matrici multidimensionali: matmul, mm
  - mm: niente broadcasting
  - matmul: supporta il broadcasting

# torch.index_select
https://pytorch.org/docs/stable/generated/torch.index_select.html

All'inizio era difficile da capire, ma è più semplice se lo si pensa come slicing a livello di tensor, simile alle liste Python o a numpy.

>
torch.index_select(input, dim, index, *, out=None) -> Tensor

input: il tensor in cui cercare.
dim: l'asse lungo cui indicizzare.
index: un tensor che specifica gli indici da selezionare.

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
Per esempio, torch.index_select(x, 0, indices) cerca gli elementi lungo la dimensione 0 di x corrispondenti agli indici. Restituisce gli elementi alla posizione 0 e 2 della dimensione 0.

# torch.tensor slicing
Uguale a numpy.

# torch.tensor, torch.Tensor
Entrambi creano oggetti tensor, ma c'è una differenza.
- torch.tensor richiede dati per creare un tensor.
  - torch.tensor() senza argomenti dà errore.
- torch.Tensor è la classe stessa. Si può chiamare torch.Tensor() per ottenere l'equivalente di torch.empty().

# torch.gather
https://pytorch.org/docs/stable/generated/torch.gather.html#torch.gather
>
torch.gather(input, dim, index, *, sparse_grad=False, out=None) -> Tensor

Fa lo slicing di input lungo la dimensione dim secondo index. Riesco a usarlo, ma non in modo pulito come fanno altri. https://data-newbie.tistory.com/709

Il mio approccio è creare un tensor con la stessa forma di input e scrivere le posizioni dei valori desiderati.

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
Il classico layer MLP che già conosco. Si può anche usare così:

```python
X = torch.Tensor([[1, 2],
                  [3, 4]])
forward = nn.Linear(2, 5)
forward(X).shape
```
Ovvio col senno di poi, ma non mi era venuto in mente subito.

# torch.nn.Identity
Un layer che restituisce esattamente lo stesso tensor in input, come dice il nome.

# torch.nn.LazyLinear
https://pytorch.org/docs/stable/generated/torch.nn.LazyLinear.html#torch.nn.LazyLinear

Se ho capito bene, al primo forward pass prende pesi e bias da torch.nn.UninitializedParameter e calcola con quelli.

**Scoperto durante la peer session:**
- Si definisce solo il canale di output; l'input non viene specificato.
- Non si usa per ricevere dati di dimensione variabile in sé.
- Si usa per determinare dimensioni diverse dai canali dell'immagine o dalla dimensione dei dati.

# nn.Module.register_buffer
https://pytorch.org/docs/stable/generated/torch.nn.Module.html?highlight=register_buffer#torch.nn.Module.register_buffer

https://discuss.pytorch.org/t/what-is-the-difference-between-register-buffer-and-register-parameter-of-nn-module/32723

Quando si salva un modello tramite state_dict, di norma vengono salvati solo i parametri della rete come pesi e bias. Se si vuole salvare un tensor che non è un parametro, si usa register_buffer. Sembra ci siano casi d'uso come il controllo dei tensor di BatchNorm.
