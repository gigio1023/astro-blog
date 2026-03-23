---
title: "Modelli generativi - 2"
description: "Modelli a variabili latenti: variational inference, ELBO, VAE e adversarial auto-encoder (AAE)."
date: "2021-08-14T12:01:37.562Z"
tags: ["computer-vision"]
lang: it
translationOf: "generative-model-2"
draft: false
---

# Latent Variable Models
Creati da D. Kingma, che ha anche ideato Adam e il variational auto-encoder. Un curriculum notevole.

Un autoencoder è un modello generativo?
Dato che un variational auto-encoder è un modello generativo, lo è anche un autoencoder normale? No.

Quindi c'è una ragione specifica che rende il variational auto-encoder un modello generativo, e capirla è fondamentale.

## Variational Inference (VI)
L'obiettivo della VI è ottimizzare la distribuzione variazionale che meglio approssima la **_distribuzione a posteriori_**.
- Distribuzione a posteriori: $p_{\theta}(z|x)$
  - La distribuzione di probabilità della variabile casuale di interesse data un'osservazione
  - z: latent vector
  - L'inverso è tipicamente chiamato likelihood: $p(x|z)$
- Distribuzione variazionale: $q_{\phi}(z|x)$
  - La distribuzione a posteriori è spesso intrattabile.
  - È una distribuzione di probabilità che approssima la posteriore.
- KL divergence: il metodo di approssimazione
  - Usata per minimizzare la differenza tra la vera posteriore e la distribuzione variazionale.

![](/assets/images/Generative model - 2/2dfa4a4e-fdc2-46fc-a9d9-9f1ae935fd95-image.png)

- Encoder: dove viene appresa la distribuzione variazionale

### Come trovare l'obiettivo?
Come il gradient descent ha bisogno del vero y per calcolare la loss function, la variational inference ha bisogno della distribuzione a posteriori per approssimare la distribuzione variazionale.

Il problema è che la ragione per usare una distribuzione variazionale è proprio che la distribuzione a posteriori è difficile da calcolare. Si crea una contraddizione.

![](/assets/images/Generative model - 2/be4bc4a1-f73c-4432-a993-d9f416c4763d-image.png)

La matematica sopra cattura questo concetto. Dovrebbe essere accessibile con conoscenze di statistica a livello universitario. (...)

Ridurre l'obiettivo nell'equazione significa ridurre il divario tra la distribuzione a posteriori e quella variazionale. Ma poiché non conosciamo la vera posteriore, aumentiamo invece l'ELBO (Evidence Lower Bound), che a sua volta fa diminuire l'obiettivo.

Questo approccio è talvolta chiamato metodo sandwich.

Dato che non possiamo calcolare direttamente la KL divergence, la variational inference si allena massimizzando l'ELBO.

### ELBO
![](/assets/images/Generative model - 2/cacd1361-d2a5-4c38-b8c4-5ab06d57df5a-image.png)
L'ELBO può essere decomposto come mostrato sopra, ed è calcolabile.

- Reconstruction Term: il termine di reconstruction loss dell'auto-encoder
- Prior Fitting Term: Latent Prior Term

## Riepilogo
L'obiettivo finale della Variational Inference è: dato un input X, trovare uno spazio latente Z che rappresenti bene X.
Ma non conosciamo la distribuzione a posteriori $p_{\theta}(z|x)$. Quindi proviamo ad approssimarla usando la distribuzione variazionale (o encoder).

Non conoscendo la posteriore, non possiamo calcolare direttamente la KL divergence tra la stima e il valore reale. Usiamo quindi la variational inference per massimizzare l'ELBO, che riduce indirettamente la KL divergence.

L'ELBO si divide in un Reconstruction term e un Prior fitting term.

Reconstruction term
- Si manda l'input X attraverso l'encoder allo spazio latente.
- La reconstruction loss ottenuta decodificando è ciò che questo termine minimizza.

Prior fitting term
- Supponiamo che l'input X sia stato mappato nello spazio latente.
- Questo termine misura quanto la distribuzione dei dati mappati differisce dalla distribuzione prior dello spazio latente.

Pertanto, è un modello generativo, e specificamente un modello implicito piuttosto che esplicito.

## Variational Auto-Encoder (VAE)
Dato un input X, va nello spazio latente per trovare qualcosa, che viene poi usato per la ricostruzione.

Per essere un modello generativo, si campiona z dalla distribuzione prior dello spazio latente e lo si passa attraverso il decoder -- l'output è il risultato della generazione.

Ma un auto-encoder semplice non fa questo. L'input va nello spazio latente e torna come output. Quindi in senso stretto, un auto-encoder non è un modello generativo.

Caratteristiche del VAE:
- È un modello intrattabile.
  - Calcolare la likelihood è difficile.
  - È un modello implicito.
- Il prior fitting term è molto difficile da calcolare.
  - Si usa una Gaussiana isotropica affinché la derivazione produca valori trattabili.
  - ![](/images/283aa5c3-7d10-44b3-997a-4557cb4960be-image.png)

## Adversarial Auto-Encoder (AAE)
Il limite del VAE è che è difficile usare qualcosa di diverso dalla Gaussiana per il prior fitting term. Ma in molti casi non si vuole usare la Gaussiana come distribuzione prior.

![](/assets/images/Generative model - 2/7ffffc51-6fe7-43c9-9bc5-732d7bd8f99c-image.png)

L'AAE risolve questo usando un GAN per far corrispondere la distribuzione latente. In pratica, sostituisce il prior fitting term del VAE con un GAN.

Basta avere una distribuzione nello spazio latente da cui si può campionare per usarla nel prior fitting.
Es.: distribuzione uniforme, o anche distribuzioni complesse.

L'AAE spesso supera il VAE, anche se non sempre.

Un paper del 2018 sui wasserstein autoencoder ha dimostrato matematicamente che l'AAE equivale a minimizzare la distanza wasserstein nello spazio latente. Quindi l'AAE può essere considerato un tipo di wasserstein autoencoder.

## Generative Adversarial Network (GAN)
![](/assets/images/Generative model - 2/82bba9f4-c2e2-4470-821a-449a286f669c-image.png)

Immaginiamo che il generator produca banconote false e il discriminator cerchi di rilevarle.

Il discriminator impara a distinguere meglio le contraffazioni usando le proprie conoscenze e l'output del generator. Se il discriminator fosse fisso, nessuno dei due imparerebbe bene -- il fatto che entrambi imparino è un grande vantaggio.

Il generator impara a ingannare meglio il discriminator.

L'obiettivo del GAN è migliorare le prestazioni del generator. È un modello implicito.

## VAE vs GAN
![](/assets/images/Generative model - 2/1afdb9a4-0def-4958-a98d-3cf508ea0a71-image.png)
VAE
- Training
  - Si passa l'input x attraverso l'encoder per ottenere il latent vector z.
  - Si passa attraverso il decoder per tornare al dominio x.
- Generazione
  - Si campiona z da p(z).
  - Si passa z attraverso il decoder per generare il risultato desiderato.

GAN
- Si inserisce la distribuzione latente z.
- z passa attraverso G per produrre un fake.
- Il discriminator impara un classifier per distinguere reale da falso.
- Il generator impara a far produrre al discriminator true.
- Il discriminator re-impara a distinguere meglio reale da falso.

## Obiettivo del GAN
Un gioco minimax a due giocatori tra generator e discriminator.

### Discriminator
Guardando la formula del GAN dalla prospettiva del discriminator:
![](/assets/images/Generative model - 2/1e608f4e-3813-45df-893b-8407adc25632-image.png)

Il discriminator ottimale è:
![](/assets/images/Generative model - 2/35117cdb-1d73-4ee2-84a1-9c02c1bece1c-image.png)
Questa è la forma ottimale quando il generator è fisso. Valori alti indicano vero, valori bassi indicano falso.

### Generator

![](/assets/images/Generative model - 2/9f376be0-376a-4985-87c9-7befee5bd62a-image.png)
Sostituendo il discriminator ottimale nella formula del GAN scritta per il generator:

Si ottiene la Jensen-Shannon Divergence (JSD):
![](/assets/images/Generative model - 2/bf78062d-73b8-417b-99a6-c3b30c43eb1c-image.png)

Quindi la distanza tra i dati reali e quelli generati dal generator viene misurata usando la JSD.

Tuttavia, questo vale solo quando il discriminator ottimale è garantito. Teoricamente corretto, ma difficile da usare in pratica.

## DCGAN
Il GAN originale usava un MLP. DCGAN lo adatta al dominio delle immagini.
![](/assets/images/Generative model - 2/577497c3-7219-4bd1-a83e-addb75e5e0ac-image.png)

L'encoder usa la deconvolution, e il discriminator usa la convolution.

Nessun miglioramento algoritmico, ma sono stati applicati vari trick -- cambio dei tipi di errore, tuning degli hyperparameter, ecc.

## Info-GAN
![](/assets/images/Generative model - 2/4e31bc73-8b5c-434e-ad2c-e984646651f9-image.png)
Quando si inserisce z, viene fornito anche un one-hot vector c che rappresenta la classe. Questo permette al GAN di concentrarsi su una modalità specifica durante la generazione usando il vettore c.

Contrasta la tendenza ad apprendere distribuzioni multi-modali ancorando tramite il vettore c.

## Text2Image
![](/assets/images/Generative model - 2/50bd34dc-60be-46bb-b678-1b968825daaf-image.png)

Data una frase, genera un'immagine. La ricerca DALL-E di OpenAI sarebbe partita da questo paper.

## Puzzle-GAN
![](/assets/images/Generative model - 2/1aedd9ee-9e26-451c-a3ea-f9321b015274-image.png)

Il professore è co-autore di questo paper. Dati dei sotto-patch di un'immagine, ricostruisce l'immagine completa.

## CycleGAN
![](/assets/images/Generative model - 2/78622e5e-5b90-4303-8564-014e2e9aa7cb-image.png)

Un modello che trasferisce domini tra immagini -- per esempio, convertire una zebra in un cavallo.

### Cycle-consistency loss
![](/assets/images/Generative model - 2/91a7f1a2-d62e-4882-8b15-9c7f290b7440-image.png)

Normalmente, il trasferimento di dominio richiede immagini accoppiate -- ad esempio, una foto di zebra e una di cavallo scattate nello stesso luogo.

CycleGAN semplicemente lo fa. Basta dargli un mucchio di foto di cavalli e di zebre e trova il mapping da solo.

## Star-GAN
![](/assets/images/Generative model - 2/ac3adf3e-9fad-497f-95ca-97bbe5b3cf82-image.png)

Scritto da uno studente coreano. Piuttosto che un semplice trasferimento di dominio, permette cambiamenti di dominio controllabili sulle immagini. Molto citato.

## Progressive-GAN
![](/assets/images/Generative model - 2/c8163a52-6c4a-4b71-81fd-dff3545ba04d-image.png)

Invece di trainare su immagini ad alta risoluzione dall'inizio, aumenta progressivamente da 4x4 fino a 1024x1024. Questo approccio progressivo ha contribuito significativamente alle prestazioni.

# Riepilogo
![](/assets/images/Generative model - 2/d795046d-704b-49cc-bfe0-7f46d51ee8d1-image.png)

Questo grafico mostra il numero di paper sui GAN. Circa 500 solo nel 2018, quindi conoscerli tutti è impossibile. Guardando DALL-E di OpenAI, il professore ha suggerito che usare i transformer potrebbe rivelarsi meglio che usare i GAN.

L'importante è continuare a imparare.
