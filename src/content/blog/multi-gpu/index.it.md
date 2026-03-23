---
title: "Multi GPU"
description: "Guida all'addestramento multi-GPU in PyTorch: parallelismo dei modelli, DataParallel e DistributedDataParallel con esempi di codice."
date: "2021-08-20T08:14:42.707Z"
tags: ["pytorch", "dl"]
lang: it
translationOf: "multi-gpu"
draft: false
---

## node
Un termine usato in modo intercambiabile con system.

## model parallelization
![](/assets/images/Multi gpu/94cb8fdb-a3de-471a-a93c-998795dd3c17-image.png)
La model parallelization era gia stata usata in AlexNet.

![](/assets/images/Multi gpu/67beca0a-0359-4bb8-8dd6-e8b1ebe83c05-image.png)
Una buona GPU parallelization richiede di scrivere una struttura a pipeline in modo che le GPU vengano usate simultaneamente, come mostrato in figura.

## data parallelization
![](/assets/images/Multi gpu/31b41aa1-a575-4581-aef3-26b9cce4c85f-image.png)

1. GPU1 raccoglie i dati e li distribuisce
2. Ogni GPU esegue il forward pass indipendentemente
3. GPU1 raccoglie i risultati del forward
4. GPU1 distribuisce le informazioni sui gradienti
5. Ogni GPU calcola i gradienti indipendentemente
6. I gradienti vengono raccolti e calcolati

### DataParallel in PyTorch
- Implementa direttamente l'approccio descritto sopra
- Semplicemente distribuisce i dati e fa la media
- Batch size ridotta a causa dell'uso sbilanciato delle GPU


### DistributedDataParallel in PyTorch
Ogni GPU ottiene il proprio thread CPU e calcola i propri risultati mediati indipendentemente.

- sampler: un oggetto che determina come i dati vengono campionati dal dataloader. Fornito da torch.

```
train_sampler = torch.utils.data.distributed.DistributedSampler(train_data)
shuffle = False
pin_memory = True

train_loader = torch.utils.data.DataLoader(train_data, batch_size=20, shuffle=shuffle, pin_memory=pin_memory, num_workers=4, sampler=train_sampler)

```

- num_workers: numero di thread. Tipicamente impostato a 4x il numero di GPU.
- pin_memory: i dati passano attraverso il paging in memoria, poi vengono pinnati, poi caricati sulla GPU -- questa opzione li pinna direttamente.

---
```python
def main():
    ngpus_per_node = torch.cuda.device_count()
    world_size = ngpus_per_node

    torch.multiprocessing.spawn(main_worker, nprocs=ngpus_per_node, args=(ngpus_per_node, ))

```

Si crea un worker e lo si passa a spawn come la funzione map di Python.

ref: https://blog.si-analytics.ai/12
