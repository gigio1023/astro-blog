---
title: "Ottimizzazione"
description: "Fondamenti di ottimizzazione nel deep learning: generalizzazione, overfitting, cross-validation, tradeoff bias-varianza, bootstrapping, bagging e boosting."
date: "2021-08-10T01:35:15.676Z"
tags: ["dl"]
lang: it
translationOf: "optimization"
draft: false
---

![](/assets/images/Optimization/eb1d4749-f4b0-4545-a5a8-e2b72b35b6e4-image.png)

L'istruttore di BoostCamp ha insistito sull'importanza di conoscere la terminologia.

Ieri (2021.08.09), studiando l'AAE dell'esercizio opzionale 2, mi sono spaventato. Era piu veloce contare le parole che *conoscevo* in una frase piuttosto che quelle che non conoscevo. Scritto in inglese, ma sembrava una lingua aliena...

Credo sia la conseguenza dell'aver accumulato conoscenze sparse da autodidatta attraverso tirocini e progetti di tesi. Almeno fissiamo bene i termini usati nel ML.

Con questo spirito, ho documentato anche i termini che gia conoscevo, purche trattati a lezione.


# Introduzione
## Gradient Descent
undefined

First-order iterative optimization algorithm for finding a _**local minimum**_ of a differentiable function.

# Hyper Parameter
Parametri: pesi, bias, pesi di convoluzione, ecc. -- cose che si aggiornano durante il training.
Iperparametri: learning rate, dimensione della rete, tipo di loss function, ecc. -- cose che lo sviluppatore imposta manualmente.

# Generalization
![](/assets/images/Optimization/8103a09e-337e-491f-b114-41fb50a6509d-image.png)
Di solito, l'errore di test aumenta col proseguire del training.
Il gap di prestazioni tra train e test si chiama generalization gap.

Buone prestazioni di generalizzazione = le prestazioni del modello sui dati di training sono simili a quelle generali.

Ma buone prestazioni di generalizzazione non garantiscono che il modello funzioni bene. Perche un modello che non ha imparato bene i dati di training potrebbe comunque avere buone prestazioni di generalizzazione.

# Underfitting, Overfitting
![](/assets/images/Optimization/f4e80d54-ae70-4a91-ad57-13e820a06b90-image.png)
Overfitting: il modello funziona bene sui dati di training ma male nella pratica.
Underfitting: il training non e andato bene, il modello non ha nemmeno imparato.

Ovviamente, la figura sopra illustra solo il concetto. L'esempio di overfitting potrebbe in realta essere il risultato desiderato in certi casi. Bisogna giudicare in base alla definizione del problema, conoscenze di dominio e altri fattori.

# Cross-validation
K-fold validation.
![](/assets/images/Optimization/17d78872-bc7f-4489-9fef-4fbfd39ce8ad-image.png)
ref: https://blog.quantinsti.com/cross-validation-machine-learning-trading-models/

1. Si dividono i dati di training in k parti.
2. Si usano k-1 parti per il training.
3. Si usa la parte rimanente per la validation.
---

Di solito non ci sono indicazioni sugli iperparametri! Percio si usa la cross validation per trovare la combinazione ottimale di iperparametri.

Una volta trovati gli iperparametri ottimali, si fissano e si addestra su tutti i dati di training disponibili.

Ovviamente i dati di test non devono mai essere usati nel training in nessun modo. E essenzialmente barare. E barare non garantisce nemmeno un buon modello.

# Bias, Varianza
![](/assets/images/Optimization/16924af4-30e6-4ea1-b216-34fb72413392-image.png)
ref: https://work.caltech.edu/telecourse

Pensatela come la rosata di colpi su un bersaglio.
**Varianza**
- Quanto e consistente l'output per un dato input.
- Piu bassa = piu consistente.
- Piu alta = meno consistente.

**Bias**
- Quanto l'output e distante dal valore desiderato.

## Tradeoff Bias e Varianza
![](/assets/images/Optimization/c50f856f-580f-4562-b70d-ac7dc0d2137d-image.png)
Si assume che ci sia rumore nei dati di training.
We can derive that what we are minimizing (cost) can be decomposed into three different parts: $$bias^2$$, $$variance$$, and $$noise$$.

Il valore che minimizzo e un singolo numero, ma consiste di tre componenti. E queste tre componenti hanno una relazione di trade-off -- quando qualcosa diminuisce, qualcos'altro aumenta.

![](/assets/images/Optimization/f5938e91-b533-4b4b-ae4d-210b8257c844-image.png)

Quindi il costo puo essere decomposto in questi tre termini.
Si dice tipicamente che bias e varianza sono in trade-off.

# Bootstrapping
Un termine dalla statistica.
Bootstrapping is any test or metric that uses random sampling with replacement.

Per esempio, estrarre casualmente 80 campioni da 100 dati di training per creare diverse configurazioni di modelli da confrontare.

# Bagging, Boosting
**Bagging (Bootstrapping aggregating)**
- es. Usare il bootstrapping per subcampionare i dati di training in piu set. Modelli diversi producono output diversi da ogni set, e si usano questi output (estrarre statistiche, fare ensemble learning, ecc.)

Questo di solito supera l'addestramento di un singolo modello sull'intero set di training per un singolo risultato.
Una tecnica classica usata in competizioni come Kaggle.

**Boosting**
Supponiamo che 80 dati vengano classificati bene ma i restanti 20 no. Si crea un modello separato per quei 20. Chiamiamo questi modelli weak learner.

Si concatenano questi weak learner in sequenza per costruire **un unico strong learner**. Nel boosting, i pesi dei weak learner vengono addestrati in sequenza.

---

![](/assets/images/Optimization/cf306c62-c333-47c2-a8b5-fa543644371f-image.png)

# Metodi pratici di Gradient Descent
- Stochastic gradient descent
  - Aggiornamento dei parametri usando un dato alla volta.
- Mini-batch gradient descent
  - Aggiornamento dei parametri usando un sottoinsieme di dati alla volta.
- Batch gradient descent
  - Si usano tutti i dati in una volta.

## La dimensione del Batch conta
>
We .. present numerical evidence that supports the view that large batch methods tend to converge to _**sharp minimizers**_ of the training and testing functions.
In contrast, small-batch methods consistently converge to _**flat minimizers**_... this is due to the inherent noise in the gradient estimation.


Il paper afferma che i metodi con batch grandi producono sharp minimizer, mentre quelli con batch piccoli producono flat minimizer. La spiegazione segue il grafico sotto.

![](/assets/images/Optimization/7fb85c2e-6ad7-47f1-a1f4-6b591a789586-image.png)
ref: https://arxiv.org/pdf/1609.04836.pdf (ON LARGE-BATCH TRAINING FOR DEEP LEARNING:
GENERALIZATION GAP AND SHARP MINIMA)


Flat minimum: anche se le funzioni di test e training sono distanti, il modello impara comunque in modo accettabile. _**Alta generalization performance!**_
Sharp minimum: bassa generalization performance.

## Metodi di Gradient Descent
### (Stochastic) Gradient Descent
![](/assets/images/Optimization/ad76fb47-36fb-40e0-bf9b-48875a2b8b44-image.png)
La classica formula di aggiornamento dei parametri nel gradient descent.

Problema: impostare il learning rate e difficile. Troppo piccolo e il training non avanza; troppo grande e il training non funziona bene.

### Momentum
![](/assets/images/Optimization/4a286162-7a9a-405a-94eb-0a9a13a41fac-image.png)

I parametri vengono aggiornati mantenendo il momentum (inerzia).
beta (momentum) e un iperparametro. Una nuova accumulazione viene calcolata da beta, il gradient e l'accumulazione dello step precedente.
Questo mantiene parte dell'informazione dello step precedente invece di scartare tutto come l'SGD, aggiornando W.

### Nesterov Accelerated Gradient (NAG)
![](/assets/images/Optimization/89fade6f-4c7b-495e-b249-28259512df4d-image.png)

La struttura della formula e la stessa del momentum. La differenza e che pre-calcola il gradient allo step successivo e usa questo lookahead gradient per aggiornare l'accumulazione.

![](/assets/images/Optimization/6c02f42a-d117-412d-bbcb-d288e3560adb-image.png)

ref: https://golden.com/wiki/Nesterov_momentum

La differenza tra momentum e Nesterov momentum e illustrata sopra. Intuitivamente, il momentum potrebbe non convergere direttamente al punto di convergenza, oscillando avanti e indietro come un pendolo.

Nesterov usa il gradient dello step successivo, con l'effetto di muoversi in una sola direzione. Percio NAG tipicamente converge piu velocemente.

### Adagrad
![](/assets/images/Optimization/4257e2a2-df6a-483b-a1f0-49551601497f-image.png)

Riflette quanto ogni parametro e cambiato finora nell'aggiornamento.
$$G_t$$ e la somma dei quadrati dei gradient. Se un parametro e cambiato molto, $$G_t$$ e grande, quindi il parametro cambia meno. Se un parametro e cambiato poco, $$G_t$$ e piccolo, quindi il parametro cambia di piu.

$$\epsilon$$ serve a prevenire la divisione per zero.

Problema:
$$G_t$$ puo crescere indefinitamente. Se il denominatore tende a infinito, il termine converge a 0. Il parametro smette di aggiornarsi.


### Adadelta
![](/assets/images/Optimization/f751a440-d120-440c-a6ab-de5e67be655a-image.png)

Guarda le variazioni del gradient solo all'interno di una finestra di dimensione data.

Il problema e che $$g_t$$ deve avere tanti parametri quanti il modello. Dato che ogni parametro del modello ha il suo gradient, un modello come GPT-3 con 100 miliardi di parametri richiederebbe a $$g_t$$ di memorizzare info sui gradient per 100 miliardi di parametri per tutta la finestra.

Questo si risolve usando l'exponential moving average (EMA). Sembra che sia quello che fa il $$\gamma$$ nella formula...

_**Nessun learning rate!**_
= Nessuna possibilita di regolare gli iperparametri. Quindi non e praticamente utile.


### RMSprop
Non pubblicato come paper. Geoff Hinton lo ha rivelato durante una lezione. I paper che usano RMSprop citano effettivamente il link della lezione di Geoff Hinton.

![](/assets/images/Optimization/57e8d39b-5fe2-4175-966b-ad329e4b5863-image.png)

### Adam (Adaptive Moment Estimation)
Combina gradient passati (momentum) e gradient al quadrato (Adagrad, RMSprop...).
Cioe mescola informazioni sul momentum con metodi di learning rate adattivo.
![](/assets/images/Optimization/b1919bc5-0605-4143-9766-9b7fb568fc5f-image.png)

Regolare i 4 iperparametri e molto importante.
- $$\epsilon$$: un valore molto piccolo
- $$\beta_1$$: momentum
- $$\beta_2$$: gradient al quadrato
- $$\eta$$: learning rate

# Regularization
L'obiettivo e regolarizzare e ostacolare il training affinche il modello funzioni bene non solo sui dati di training ma anche su quelli di test.

## Early Stopping
![](/assets/images/Optimization/40d7d36e-b662-4271-99b8-e08ddbb8717f-image.png)
Usando i dati di validation (non di test), si determina il punto giusto per fermarsi.

## Parameter Norm Penalty
Impedire ai parametri di diventare troppo grandi.
![](/assets/images/Optimization/77786af1-ff49-457e-b5da-5c96dfcad47f-image.png)

Addestramento nella direzione che minimizza il costo totale.

L'istruttore ha detto qualcosa sul rendere le funzioni piu lisce nello spazio delle funzioni (?). Non ho capito bene...

Il parameter norm penalty si chiama anche weight decay.

## Data Augmentation
![](/assets/images/Optimization/db61a2e2-a892-45e0-aafb-47966822162f-image.png)
A differenza del ML tradizionale, DL e NN traggono vantaggio da piu dati. Quindi si genera il piu possibile.

![](/assets/images/Optimization/fb429d9f-2c90-4788-b5c1-b59d0b9fa551-image.png)

Si aumentano i dati variando dimensione, rotazione, ritaglio delle immagini, ecc. Le label pero devono restare fisse.

## Noise Robustness
Aggiungere rumore ai dati di input e ai pesi durante il training migliora le prestazioni in fase di test.
Non completamente dimostrato, ma verificato sperimentalmente.
![](/assets/images/Optimization/3b107bac-9e6b-47ac-b6b4-f2e14cf846df-image.png)

## Label Smoothing
Durante il training, si estraggono due dati di training, si mescolano e si crea un nuovo dato di training.
Si dice che abbia l'effetto di rendere piu liscio il decision boundary.

_**Un metodo che puo migliorare molto le prestazioni del modello!**_

![](/assets/images/Optimization/3cda6bbf-463c-4b3c-b07f-6fb7a9f87f56-image.png)

ref: https://arxiv.org/pdf/1905.04899.pdf (CutMix: Regularization Strategy to Train Strong Classifiers
with Localizable Features)

Mixup: mescola due immagini e le loro label.
Cutout: rimuove una porzione di un'immagine.
CutMix: a differenza di Mixup, taglia e incolla.

## Dropout
Si azzerano casualmente alcuni neuroni.
![](/assets/images/Optimization/24be1ed4-61c5-4cc7-8dd5-253b56c5398e-image.png)
Si interpreta come neuroni che acquisiscono feature piu robuste. Anche questo non e dimostrato.

## Batch Normalization
![](/assets/images/Optimization/8517c386-b451-4779-af90-2171c3e89dce-image.png)

Si normalizzano i pesi per layer usando media e varianza dei pesi. Come nella formula, si sottrae la media e si divide per la varianza per ottenere nuovi pesi.

Il paper interpretava questo come riduzione dell'internal covariate shift, che migliora le prestazioni, ma ci sono diversi paper di confutazione...

Quel che e certo e che usare BN migliora significativamente le prestazioni quando la rete diventa piu profonda.

---

![](/assets/images/Optimization/5124757b-893f-4e43-868d-d0189b23ecb6-image.png)

Esistono metodi simili alla BN. Usarli come appropriato.