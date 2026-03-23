---
title: "Retrieval-Augmented Diffusion Model"
description: "Revisione del paper sui modelli di diffusione retrieval-augmented che sfruttano il retrieval nearest neighbor basato su CLIP per la sintesi di immagini ad alta fedeltà con meno parametri."
date: "2022-05-18T00:00:00.000Z"
tags: ["computer-vision", "nlp", "paper-review"]
draft: false
lang: it
translationOf: "retrieval-augmented-diffusion-model"
---

Feedback su contenuti errati è sempre gradito. Cerco di riassumere in modo conciso, ma dato che c'erano molti contenuti nuovi per me, ho incluso la maggior parte del paper.

# Abstract

Il paper usa un approccio retrieval-based, già efficace in NLP, per integrare i modelli di diffusione. Durante il training, si fa retrieve di feature visive come i training instance vicini e CLIP.

Il modello del paper usa lo spazio di embedding image-text di CLIP, mostrando alte prestazioni su task come class-conditional e text-image synthesis senza training esplicito. Può anche essere influenzato sia da embedding di testo che di immagini.

Il modello è applicabile anche alla unconditional generation, dove ha raggiunto lo SOTA.

L'approccio del paper consuma poche risorse computazionali ed è facile da implementare.

# Introduzione
Il language modeling e la generative synthesis per immagini ad alta fedeltà e altri tipi di dati hanno fatto progressi enormi. In particolare nell'image synthesis ci sono stati risultati impressionanti. [Ref 1, 2, 3, 4]
I 3 fattori principali:

1. Successo dei transformer nei task di vision. Nell'image synthesis si è usato l'autoregressive modeling.
2. I modelli di diffusione sono stati applicati con successo alla generazione di immagini ad alta risoluzione, diventando lo standard del generative image modeling.
3. I metodi 1 e 2 scalano bene. In particolare, ci sono evidenze che la scalabilità sia cruciale per le prestazioni, considerando modello e batch size.

Ma la maggior parte dei miglioramenti è ottenuta semplicemente aumentando potenza computazionale e parametri. Questo paper si propone di migliorare le prestazioni senza questo approccio.

Al contrario, ispirandosi al successo dei retrieval-augmented generative language model, il paper fa trade-off dei parametri addestrabili per una memoria di esempi visivi. Inoltre, parte del modello proposto è esplicitamente definita dal database di immagini.

Durante il training, il modello semi-parametrico retrieval-augmented accede al database tramite nearest neighbor lookup e apprende a sintetizzare immagini basandosi sui building block visivi recuperati.

Combinando questa strategia retrieval-enhanced con i modelli di diffusione, si ottengono modelli leggeri che superano le controparti fully parametric su dataset multimodali.

![](/assets/Generative-model/20220520155013.png)

La Fig2 mostra come, usando CLIP per fare retrieve dei nearest neighbor nello spazio text-image, i text prompt vengano usati come query per la sintesi basata su exemplar. Il modello ImageNet del paper può generalizzare a text prompt unseen/fittizi quando è direttamente influenzato dal text encoding di CLIP $\phi_{\tiny CLIP}(c_{\tiny text})$.
Al contrario, usando $\phi_{\tiny CLIP}(c_{\tiny text})$ insieme a k-1 nearest neighbor correlati dal database, o usando k nearest neighbor senza rappresentazione testuale, il modello non mostra capacità di generalizzazione.

La Fig2 mostra quindi che 'NNs only' e 'Text repr. and NNs' hanno capacità di generalizzazione inferiori rispetto a 'Text repr. only'.

## Riassunto dell'abstract
Il paper presenta quindi un framework semplice di retrieval-augmented generative modeling con modelli di diffusione. Cercando e condizionando nello spazio latente di CLIP, si possono creare rappresentazioni nearest neighbor con pochissimo calcolo. Il retrieval è molto veloce e gli embedding CLIP richiedono pochissimo storage. L'approccio semi-parametrico soddisfa sia alta fedeltà che diversità.

Usando le feature image-text di CLIP, si possono creare varie applicazioni condizionali come text-to-image e class-conditional synthesis, come mostrato nella Fig2.

Infine, si dimostrerà se cambiare il database di retrieval al test time conferisce flessibilità aggiuntiva al controllo del processo di sintesi, e come questo si combina con i modelli di diffusione classifier-free esistenti.

# Lavori correlati

## Modelli di diffusione per la sintesi di immagini
Si esaminano i risultati e i limiti generali dei modelli di diffusione. Per l'unconditional image generation su dataset complessi come ImageNet, servono molte risorse e modelli grandi.

Il paper propone di scambiare parametri addestrabili con memoria esterna per superare questi limiti. Anche modelli piccoli possono così raggiungere livelli di generazione immagini ad alta fedeltà paragonabili a modelli in continuo sviluppo.

## Modelli generativi retrieval-augmented
L'uso di memoria esterna per migliorare le prestazioni è una tecnica molto usata in NLP. RETRO[5] ha proposto un retrieval-enhanced transformer che raggiunge lo SOTA con meno parametri e risorse. I modelli retrieval-augmented con memoria esterna hanno trasformato i modelli parametrici di deep learning in modelli semi-parametrici.

I primi modelli visivi retrieval-augmented non usavano memoria esterna ma i dati di training per il retrieval. IC-GAN usa il neighborhood delle immagini di training per addestrare il GAN e genera campioni limitati a singole istanze dei dati di training.

Ma usando i dati di training come target di retrieval, la capacità di generalizzazione è limitata, e si intende risolvere questo con la memoria esterna.

## Lavori contemporanei
Recentemente sono stati proposti unCLIP[6] e kNN-Diffusion[7], simili a questo paper.

unCLIP condiziona i modelli di diffusione con le rappresentazioni di CLIP e usa calcolo su larga scala per produrre risultati text-image di alta qualità. Ma a differenza di questo paper, è limitato alle rappresentazioni CLIP dei dati di training, quindi apprende il text-image generativo successivamente.

kNN-Diffusion evita il problema di unCLIP condizionando tramite neighborhood, molto simile a questo paper. Usa anche una formulazione di diffusione continua invece che discreta per analizzare diverse forme di rappresentazione del neighborhood, e non si limita alla sintesi text-image.

# Sintesi di immagini con modelli di diffusione retrieval-augmented

## Modelli generativi di immagini retrieval-enhanced
Modello generativo semi-parametrico che introduce una tupla di componenti addestrabili e non addestrabili.

Una strategia di campionamento non addestrabile ottiene un sottoinsieme del database basato su una query.

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200512.png)

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200719.png)

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200736.png)

## Modelli di diffusione semi-parametrici
I ricercatori hanno usato il loro precedente LDM (Latent Diffusion Model). Si può pensare come un modello di diffusione applicato allo spazio latente di VQ-GAN. Per esempio, VQ-GAN fa downsample un'immagine 256x256 a 64x64 e su questa si apprende il reverse diffusion process.

Nel caso di unCLIP, che apprende direttamente immagini 64x64, serve una super resolution separata per convertire a 256x256. LDM invece usa lo spazio latente di VQ-GAN, quindi rimette l'immagine 64x64 in VQ-GAN per ottenere 256x256.
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200755.png)
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522201040.png)

La funzione obiettivo usa la formula fornita da DDPM.

## Inference per modelli di diffusione retrieval-augmented

A differenza del training, durante l'inference non c'è un'immagine query, quindi serve un processo aggiuntivo.
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522201643.png)

Si può creare una text query e usare CLIP per la text-conditional generation. Anche senza un'immagine query, CLIP ha una rappresentazione condivisa text-image, quindi si può usare in questo modo.

1. Creare semplicemente una text query al posto dell'immagine.
2. Ottenere il text embedding della text query tramite CLIP embedding.
3. Ottenere il neighborhood tramite la similarità tra text embedding e immagini del dataset.

Riepilogo delle modalità di inference:
- text-to-image
  - Si ottiene l'embedding della text query tramite CLIP. Si usa per il neighborhood searching.
- class-condition
  - Si usa come text query "A photo of { }"
- unconditional
  - Si può campionare casualmente dal dataset fisso e fare neighborhood searching. Ma questo ha prodotto solo immagini semplici o simili al reference.
  Quindi si è creata una proposal distribution per selezionare preferenzialmente i campioni che contribuiscono maggiormente al training.
  ![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522202728.png)
  La proposal distribution genera pseudo query per il neighborhood searching e la unconditional generation.


## Bilanciamento qualità-diversità
### Distribuzione troncata dei dataset
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522203230.png)
Per la unconditional generation, dato che le immagini generate erano troppo diverse, si sono usati solo i top m con densità più alta.

### Classifier-free guidance
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522203420.png)
Usata nella conditional image generation per migliorare la qualità. Si genera sia in condizione conditional che unconditional, e si fa denoising proporzionalmente alla differenza tra le due situazioni.

# Panoramica dei metodi
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522203721.png)

# Esperimenti
## Configurazione degli esperimenti
- Decoding head (modello generativo): LDM con 400M parametri. L'LDM originale ha 500M, quindi è leggermente più piccolo.
- Modello di retrieval: CLIP-ViT-B/32
- Database fisso: 20M esempi da OpenImages (9M). Dato che la risoluzione di OpenImages ha tipicamente una dimensione superiore a 1200, da ogni immagine si estraggono 2-3 patch.
- Dataset di training: ImageNet
- Ricerca NN: algoritmo ScaNN

## Image encoder
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522204403.png)
Anche VQ-GAN può essere implementato tramite pooling, ma l'uso degli embedding CLIP si è rivelato il migliore.

## K-NN
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522204600.png)
Valutazione in funzione di K. All'aumentare di K, recall, precision, FID e IS peggiorano. Dato che la qualità delle immagini può essere migliorata con classifier-free guidance e simili, si è pensato di impostare K nella direzione che aumenta la recall. [8]

## Dimensione delle patch
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522204754.png)
Data l'alta risoluzione di OpenImages, anche il patchify è stato importante. Le dimensioni più grandi hanno dato prestazioni migliori.

Non è una valutazione rigorosa, dato che CLIP non è addestrato su 64x64, quindi le prestazioni scadenti su 64x64 potrebbero dipendere da quello. [8]

## Complessità dei dati di training
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522205332.png)

Esperimenti variando il target della generazione. Ampliando il range da Dogs a Mammals ad Animals, precision e FID peggiorano sia per baseline che per SP-LDM. Ma la recall di SP-LDM migliora.

Anche se le prestazioni di generazione calano, il modello cercherà di recuperare immagini correlate dal dataset esterno e generare immagini simili. Quindi la recall sale, secondo il paper.

## Risultati unconditional generation
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522205809.png)

## Risultati conditional generation
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522205901.png)

Genera bene anche usando il text embedding di CLIP per la classe e k-1 nearest neighborhood. Significativo perché il class-condition non è stato usato durante il training.

## Text-to-image
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522210307.png)
Le combinazioni possibili sono:
- condizionamento su text embedding
- condizionamento su text embedding + nearest neighborhood
- condizionamento su nearest neighborhood

Nonostante il training solo su ImageNet, condizionare sul text embedding di CLIP produce buoni risultati. Dare più informazioni sull'immagine tende a peggiorare le prestazioni. Text embedding + nearest neighborhood insieme non sono migliori del solo text embedding.

# Riferimenti
- Paper: https://arxiv.org/abs/2204.11824
- 1: [Taming Transformers for High-Resolution Image Synthesis](https://arxiv.org/abs/2012.09841)
- 2: [Diffusion model beat GANs on image synthesis](https://arxiv.org/abs/2105.05233)
- 3: [Glide: Towards photorealistic image generation and editing with text-guided diffusion models](https://arxiv.org/abs/2112.10741)
- 4: [Hierarchical text-conditional image generation with clip latents](https://arxiv.org/abs/2204.06125)
- 5: [Improving language models by retrieving from trillions of tokens](https://arxiv.org/abs/2112.04426)
- 6: [Hierarchical Text-Conditional Image Generation with CLIP Latents](https://arxiv.org/abs/2204.06125)
- 7: [Knn-diffusion: Image generation via large-scale retrieval](https://arxiv.org/abs/2204.02849)
- 8: https://www.youtube.com/watch?v=Ktgt7bcXLYI
