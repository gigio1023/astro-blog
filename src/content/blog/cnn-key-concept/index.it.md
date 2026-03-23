---
title: "CNN - Concetti chiave"
description: "Architetture CNN chiave dall'ILSVRC: AlexNet, VGGNet, GoogLeNet e ResNet, con analisi dei receptive field e delle convoluzioni 1x1."
date: "2021-08-11T06:50:47.059Z"
tags: ["computer-vision", "dl"]
draft: false
lang: it
translationOf: "cnn-key-concept"
---

# CNN
## ILSVRC
- ImageNet Large-Scale Visual Recognition Challenge
- Classification, Detection, Localization, Segmentation
- 1000 categorie diverse

![](/assets/images/CNN key concept/4cf1564c-fafb-425d-8e60-9030768a67e7-image.png)

Dal 2015 in poi, l'error rate è sceso sotto il livello umano. A quanto pare quel "umano" era uno sviluppatore di Tesla che ha provato di persona.

I modelli CNN descritti di seguito sono stati validati in questa competizione.
## AlexNet
![](/assets/images/CNN key concept/c1b7c1ab-eecb-4719-8faf-81c3b1f3ef35-image.png)

AlexNet ha diviso la rete in due perché le risorse GPU erano limitate all'epoca, allenando su due GPU separate.

Un filtro 11x11 è stato applicato all'input. Non è stata una scelta ottima -- il receptive field si allarga, ma il numero di parametri aumenta proporzionalmente.

Punti chiave
- ReLU
  - Esistono varie interpretazioni, ma è una funzione di attivazione efficace che non danneggia la rete anche quando diventa profonda.
- 2 GPU
- LRN (Local response normalization)
  - Sopprime le regioni fortemente attivate.
  - Raramente usata oggi.
  - Ma la data augmentation si usa sempre. Non sono sicuro che la terminologia sia corretta..
- Overlapping pooling
- Data augmentation
- Dropout

Nel 2021 sono tecniche standard, ma nel 2012 erano novità per il deep learning.

### ReLU
![](/assets/images/CNN key concept/26a5bd12-59ad-447b-8279-6e0ec479230f-image.png)
- Ha le buone proprietà dei modelli lineari.
  - Anche quando i valori del gradiente diventano molto grandi, riesce a mantenerli.
- Il gradient descent funziona bene.
- Buona generalizzazione.
- Risolve il gradient vanishing.
  - Le funzioni di attivazione precedenti avevano gradienti che si avvicinavano a 0 con input molto grandi, causando il vanishing.


## VGGNet
![](/assets/images/CNN key concept/8e9be04a-4c98-4956-a2ca-a68bc40bef27-image.png)
Vincitore ICLR 2015
- Usa solo filtri di convoluzione 3x3 (con stride 1)
- Convoluzione 1x1 per i fully connected layer
  - Non usata per ridurre i parametri come nell'uso moderno dei filtri 1x1.
- Dropout (p=0.5)

![](/assets/images/CNN key concept/d167cf16-1508-418c-8c7e-84f6914ecccc-image.png)

Receptive field: la dimensione della regione ricevuta attraverso il filtro.

Passare attraverso un filtro 3x3 due volte dà lo stesso receptive field 5x5 di un singolo filtro 5x5.

Ma il numero di parametri differisce di quasi 1.5x. Il calcolo è mostrato sopra.

Quindi, la maggior parte dei paper sulle CNN successivi usa filtri 3x3 o 5x5, al massimo 7x7. Mostra quanto fosse inefficiente l'11x11 di AlexNet.

In sintesi, per aumentare il receptive field, impilare più filtri piccoli è molto più vantaggioso.

## GoogLeNet
Ho cercato paper con la l minuscola -- in realtà scrivono la L maiuscola.
![](/assets/images/CNN key concept/4e30c6bc-670c-4f2f-a9e1-8ae66fe2e556-image.png)

- Vincitore ILSVRC 2014
- NIN (Network in Network) -- una rete di forma simile esiste all'interno della rete.
- Usa gli Inception block

### Inception block

![](/assets/images/CNN key concept/ad954212-d5c2-4e03-afbe-c071dce347b2-image.png)

- Concatena i risultati delle convoluzioni da percorsi multipli
- La convoluzione 1x1 riduce il numero di parametri
  - 1x1 ha l'effetto di ridurre la dimensione nella direzione dei canali

### Convoluzione 1x1
![](/assets/images/CNN key concept/41e65537-9b53-4a42-b592-cb7879b0b5f4-image.png)
Convoluzione standard:
Filtri 3x3 con 128 canali. Dato che l'output ha 128 canali, servono 128 filtri.

Quindi servono 3x3x128x128 = 147.456 parametri.

Convoluzione 1x1:
L'output intermedio ha 32 canali. Cioè ci sono 32 filtri 1x1x128.
Dopo la convoluzione 3x3, il risultato ha 128 canali. Cioè ci sono 128 filtri 3x3x32.
Espresso come nella formula sopra. In totale servono 40.960 parametri.

Effetto della convoluzione 1x1:
Ridotto il numero di parametri mantenendo le dimensioni di input, output e receptive field.

## Confronto intermedio dei modelli CNN
Numero di parametri:
- AlexNet (8 layer): 60M
- VGGNet (19 layer): 110M
- GoogLeNet (22 layer): 4M

## ResNet
Scritto dal famoso Kaiming He, a quanto pare. Non sapevo chi fosse..

### Contesto
![](/assets/images/CNN key concept/5d3f16d1-0eff-4c11-92c9-88759de3ba40-image.png)

- L'overfitting si verifica con un numero eccessivo di parametri.
- Una rete a 56 layer non riesce ad apprendere meglio di una a 20 layer, indipendentemente da quanto la si alleni.

### Skip connection
![](/assets/images/CNN key concept/7ee3c4dc-34ed-45dd-bb2c-99302668dddb-image.png)
Impariamo solo i residui.

--

![](/assets/images/CNN key concept/131dc1c9-66e5-4b8a-909a-5105a000110b-image.png)

Aggiungere skip connection fa sì che più layer portino a un apprendimento migliore.

---
![](/assets/images/CNN key concept/1086f419-273a-4fda-9517-eed6532425cf-image.png)
- Simple shortcut
  - Somma semplicemente l'input e il risultato della convoluzione
  - Comunemente usato
- Projected shortcut
  - Somma una convoluzione 1x1 e il risultato della convoluzione
  - Raramente usato
- Batch normalization
  - Nel paper di ResNet, posizionata dopo la convoluzione e prima della funzione di attivazione.
  - Controverso. Alcuni dicono che conv->relu->bn funziona meglio, altri che è meglio non usare bn affatto.

### Bottleneck architecture
![](/assets/images/CNN key concept/d7cd47b1-05de-440f-9d88-c0641f32eb34-image.png)

A sinistra la rete originale, a destra la bottleneck architecture.

Aggiungendo liberamente filtri 1x1 prima e dopo la convoluzione, si abbinano le dimensioni di input e output riducendo al contempo il numero di parametri.

## Confronto modelli CNN
![](/assets/images/CNN key concept/53dd7dd9-0d6f-4312-9073-90c7e997b659-image.png)

Le performance sono aumentate e i parametri diminuiti!

## DenseNet
![](/assets/images/CNN key concept/57cc94ce-8ddc-4dd6-b4c1-018cbeb8f48d-image.png)
Nella skip connection di ResNet, sommando i risultati i valori si mescolano. Quindi facciamo concatenate. Dato che le dimensioni sono uguali, non ci dovrebbero essere problemi.

Molto utile per classificazioni semplici!

**Problema**
Le dimensioni raddoppiano ogni volta.

### Dense Block, Transition Block
![](/assets/images/CNN key concept/2aaac941-df7b-4ebe-9c05-645b673705f7-image.png)
Per risolvere questo problema, si riducono le dimensioni durante la costruzione della rete.

Cioè, quando le dimensioni crescono tramite un Dense block, vengono ridotte tramite un Transition block.

Transition block = bn -> 1x1 conv -> 2x2 AvgPooling
