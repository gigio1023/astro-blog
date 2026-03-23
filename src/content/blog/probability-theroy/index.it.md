---
title: "Teoria della probabilita"
description: "Fondamenti di teoria della probabilita per il machine learning: distribuzioni di probabilita, distribuzioni congiunte e condizionate, regola di Bayes e valore atteso."
date: "2021-01-01"
tags: ["ml"]
lang: it
translationOf: "probability-theroy"
draft: false
---

Questi sono argomenti con cui ho avuto difficolta anche scrivendo appunti sulla likelihood l'anno scorso. Li ho riorganizzati qui sulla base dei contenuti di BoostCamp.

# Teoria della probabilita
Il deep learning si basa sulla teoria del machine learning basata sulla probabilita.

## Distribuzioni di probabilita
![](/assets/images/확률론/632ccac5-8350-4221-86f6-292e72937eee-image.png)

Nello spazio dei dati (X x y), la distribuzione di probabilita D e la distribuzione da cui vengono campionati i dati nello spazio dei dati.

Dato che y e assunto, questa spiegazione si basa sull'apprendimento supervisionato con etichette di verita.

### Variabili casuali
![](/assets/images/확률론/b24b39b1-fa0d-4ec5-8788-1936e236d728-image.png)
Variabile casuale = dati osservabili nello spazio dei dati.

- Le variabili casuali vengono usate quando si estraggono dati.
- Una distribuzione di probabilita si riferisce alla distribuzione da cui vengono estratte le variabili casuali.

### Tipi di variabili casuali
Le variabili casuali sono classificate come discrete o continue a seconda della distribuzione D.

_**Non classificate in base allo spazio dei dati.**_
Per esempio, le variabili casuali nello spazio degli interi sono necessariamente discrete. Ma una variabile casuale nello spazio dei numeri reali e comunque discreta se si possono selezionare solo -0.5 e 0.5.

#### Variabili casuali discrete
![](/assets/images/확률론/71e08125-84fc-4a9c-90ae-6c363f9432f9-image.png)
Modellate come somma delle probabilita considerando tutti i casi possibili.
Chiamata funzione di massa di probabilita.


#### Variabili casuali continue
![](/assets/images/확률론/bb4330b1-5074-49e9-a042-7bf202c16ab1-image.png)
Modellate integrando la densita delle variabili casuali definite nello spazio dei dati.

La densita e la seguente:

![](/assets/images/확률론/66415699-5c4f-4797-a1d6-0ea000aa5f75-image.png)

_**La densita e il tasso di variazione della funzione di distribuzione cumulativa -- non e una probabilita!**_

## Distribuzione congiunta
![](/assets/images/확률론/652e4961-a733-4952-b74c-f1c0b1d76ebf-image.png)
Dati i dati completi X e y, possiamo postulare una distribuzione, chiamata distribuzione congiunta.
La distribuzione congiunta modella la distribuzione di probabilita D.

![](/assets/images/확률론/632ccac5-8350-4221-86f6-292e72937eee-image.png)

Nella figura sopra, i punti dati reali sono i punti blu. Sembrano variabili casuali continue, ma se postuliamo la distribuzione congiunta come le caselle rosse, possono essere trattate come se fossero discrete.

Il tipo della distribuzione dei dati reali e il tipo della distribuzione congiunta sono indipendenti. Dipende da come si modella.

Dato che gestiamo i dati computazionalmente, basta impostare la distribuzione congiunta P(X, y) in modo appropriato per approssimare la vera distribuzione D.

## Distribuzione di probabilita marginale

![](/assets/images/확률론/45b5498a-9d5d-41d8-8892-f877a935458c-image.png)

P(x) = distribuzione di probabilita marginale per l'input x; nessuna informazione su y.
Come mostrato, si possono contare le occorrenze lungo x o fornire informazioni integrate.

Si puo definire anche la distribuzione marginale per y.
Cioe contare o integrare lungo y per definire P(y).


## Distribuzione di probabilita condizionata
![](/assets/images/확률론/ab9290ca-170b-4432-8726-da3e91df6aa5-image.png)
P(x|y) = modella la relazione tra input x e output y.
Come mostrato, la distribuzione condizionata puo modellare le informazioni di x quando y=1.

### Probabilita condizionata e machine learning
P(y|x) = la probabilita che la risposta sia y per la variabile di input x.

Nella regressione logistica, la combinazione di un modello lineare e softmax viene usata per interpretare i pattern estratti dai dati come probabilita.

Come calcolare la probabilita condizionata P(y|x):
- Nella classificazione, softmax(W*phi + b) viene calcolata usando il pattern di feature phi(x) estratto dai dati x e la matrice dei pesi W.
- Si puo scrivere P(y|phi(x)) al posto di P(y|x).

Deep learning:
- Le NN estraggono i pattern di feature phi dai dati.

## Valore atteso
Quando si analizzano dati data una distribuzione di probabilita, si possono calcolare vari funzionali statistici.

Il valore atteso (expectation) e la statistica rappresentativa dei dati. E la media.
Viene anche usato per calcolare altri funzionali statistici dalla distribuzione di probabilita.

![](/assets/images/확률론/dfec800e-116f-4e56-9d59-e6bde9a5a7c3-image.png)

Per le distribuzioni continue si calcola per integrazione; per quelle discrete per sommatoria.

### Utilizzo
![](/assets/images/확률론/7d9dcf7f-5fbb-4acb-8816-6793ae516416-image.png)
Usato per calcolare varianza, curtosi, covarianza, ecc.

### Stima del valore atteso condizionato nella regressione
![](/assets/images/확률론/5f9cc4a4-7ff9-4f3c-acd4-46a22cc46fde-image.png)
Il valore atteso condizionato coincide con la funzione che minimizza la norma L2.

Per stime robuste nella regressione, si usa la mediana al posto del valore atteso condizionato.

## Campionamento Monte Carlo
La maggior parte dei problemi di machine learning inizia senza conoscere la distribuzione di probabilita.

Cioe bisogna calcolare il valore atteso usando solo i dati, ed e qui che entra il campionamento Monte Carlo.
![](/assets/images/확률론/903c5c4f-c73e-455b-907a-8309c1614a62-image.png)

Spiegazione della formula:
1. Sostituire i dati campionati x in f.
2. Calcolare la media aritmetica dei dati campionati.
3. Questo valore approssima il valore atteso.

Monte Carlo funziona sia per il caso discreto che continuo.

Il campionamento Monte Carlo richiede estrazioni indipendenti.
- La convergenza e garantita dalla legge dei grandi numeri.

### Esempio di campionamento Monte Carlo

![](/assets/images/확률론/8c42ae08-02d1-4555-b276-f2d5c4911de4-image.png)

Integrare la funzione sopra su [-1, 1] e analiticamente impossibile. E qui che si usa il campionamento Monte Carlo.

1. Per strutturare la formula integrale come il campionamento Monte Carlo, si divide l'espressione integrale per 2.
Perche nell'integrazione non esiste il concetto di "numero di elementi", la lunghezza dell'intervallo x integrato viene usata come se fosse il numero di elementi.
2. Si estraggono N punti dati uniformemente da [-1, 1] e si calcola la media aritmetica.

```python
def mc_int(fun, low, high, sample_size=100, repeate=10):
    int_len = np.abs(high - low)
    stat = []
    for _ in range(repeat):
    	x = np.random.uniform(low=low, high=high, size=sample_size)
        fun_x = fun(x)
        int_val = int_len * np.mean(fun_x)
        stat.append(int_val)
    return np.mean(stat), np.std(stat)
def f_x(x):
    return np.exp(-x**2)

print(mc_int(f_x, low=-1, high=1, sample_size=10000, repeat=100))

```