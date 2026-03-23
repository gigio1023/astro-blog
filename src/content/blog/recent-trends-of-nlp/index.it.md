---
title: "Tendenze recenti dell'NLP"
description: "Panoramica sulle tendenze recenti dell'NLP: QA, chatbot open-domain, traduzione automatica non supervisionata, style transfer e in-context learning."
lang: it
translationOf: "recent-trends-of-nlp"
date: "2021-09-19T13:41:16.480Z"
tags: ["nlp"]
draft: false
---

# Question Answering
![](/assets/images/Recent trends of NLP/51679e9c-0eec-4d8b-8950-8b3963c8574a-image.png)
Si può dire che sia l'area che ha beneficiato di più dal self-supervised learning con modelli come BERT e GPT.

- Vengono forniti una question e un context.
  - Il context si può intendere come il contesto circostante, anche se il significato esatto varia leggermente a seconda del dominio.
- Multiple-choice: vengono proposti diversi candidati come risposta, e il modello ne sceglie uno.
- Span-based: la risposta viene estratta dal passaggio.
  Es. la risposta si trova tra il 10o e il 30o indice del testo.
- Yes/No: risposta binaria alla domanda.
- Generation-based: la risposta stessa viene trattata come un task di generazione del linguaggio, come in GPT.

# Open-Domain Question Answering
![](/assets/images/Recent trends of NLP/c84b7650-9a71-40b9-b92f-2c5783e5160c-image.png)

Le informazioni vengono estratte da conoscenze esterne come knowledge base e knowledge graph (DB strutturati) per eseguire il QA.
![](/assets/images/Recent trends of NLP/f9583d5f-92a4-4dca-a04a-2904898adbda-image.png)
- Knowledge tuple: coppie di nodi contenenti informazioni come [Hotel], [HasA], [Lobby].
- Knowledge graph: una struttura composta da knowledge tuple.

![](/assets/images/Recent trends of NLP/29c071a9-8b60-490e-a3ec-889e113bed6f-image.png)

L'Open-domain QA recupera informazioni da conoscenze esterne. La maggior parte dei task NLP apprende da dati in sequenza in linguaggio naturale. Una tendenza recente è usare dati strutturati come knowledge base durante il fine-tuning di questi modelli.

L'Open-domain QA fa in modo che il Retriever estragga dalla conoscenza esterna -- che sia una knowledge base o dati in linguaggio naturale come Wikipedia -- e poi esegue l'MRC.

## Retrieval-augmented Language Model pre-training/fine-tuning
![](/assets/images/Recent trends of NLP/709cc4be-7d1c-4e11-845b-bc95597783b8-image.png)

Invece di trovare la risposta nel passaggio, usa la conoscenza interna del modello pre-addestrato più la conoscenza esterna per trovare le risposte. Una forma di zero-shot learning.

# Open-domain Chatbot
Non esiste ancora un approccio standardizzato per i chatbot. Di solito vengono costruiti con Seq2Seq.

- Open-domain chatbot: può conversare su argomenti non strutturati.
  - Molto più difficile del closed-domain.
- Closed-domain chatbot: progettato per argomenti e scopi specifici. Spesso usa modelli progettati manualmente.
  - Libertà limitata.
  - Di solito basato su classification.

![](/assets/images/Recent trends of NLP/939fc6a3-a738-473c-8f47-47d25b28f2fd-image.png)

Questa è l'architettura di Blender Bot 2.0 di Facebook. Combina le conoscenze preesistenti del modello con informazioni da internet per le query.

# Unsupervised Neural Machine Translation

I task di traduzione standard usano dati etichettati. Questo campo mira ad applicare la traduzione a dati non etichettati.

## Back-translation
![](/assets/images/Recent trends of NLP/b83e7ce2-6962-4c5a-9e6e-dcc68f4016b2-image.png)

La stessa tecnica usata in CycleGAN, StarGAN, ecc.

- Parallel corpus: letteralmente un insieme di documenti paralleli. Ad esempio, coppie (inglese, coreano).

L'idea della back-translation: tradurre dall'inglese al francese, poi dal francese all'inglese, e verificare se si recupera la frase originale. Il modello cerca di minimizzare questa differenza. Somiglia a un AutoEncoder nel senso che input e output dovrebbero essere simili, ma a differenza dell'AutoEncoder, ci importa del risultato intermedio. La traduzione francese intermedia dovrebbe essere effettivamente corretta.

Naturalmente il risultato intermedio potrebbe essere pessimo e l'output finale corrispondere comunque all'input. Per affrontare questa contraddizione si usano tecniche come denoising autoencoder o controllo dell'output del decoder.

# Text Style Transfer
![](/assets/images/Recent trends of NLP/db328dbb-5ef1-456b-aeca-c0eb5dbfbd67-image.png)

Un task che converte una frase sorgente nello stile desiderato. Ad esempio, riordinare le parole, convertire testo casual in testo formale, ecc.
![](/assets/images/Recent trends of NLP/f4d012ae-24ff-4225-a188-5878aef63fe6-image.png)

Implementato inserendo informazioni sullo stile tra encoder e decoder, oppure fornendo al transformer sia x che le informazioni sullo stile. Chiamato anche conditional model o conditional generator.
- (a) Disentanglement: context (z) e style (s) sono separati.
- (b) Entanglement: context e style non sono separati.

# Quality Estimation

![](/assets/images/Recent trends of NLP/83c8fd4e-0f37-41e8-b3e5-2f978689dd78-image.png)

Il BLEU score è una metrica per l'NLG (Natural Language Generation). Ma è solo un punteggio progettato manualmente e non una metrica olistica per i modelli. Un modello con BLEU score sotto 50 potrebbe comunque essere più che adeguato per la produzione. Progettare un punteggio che catturi quanto bene un modello esegue un task specifico del dominio è molto difficile.

La Quality Estimation mira a valutare usando fattori diversi e non standardizzati sulle frasi. È un campo difficile perché valutare se le frasi prodotte sono buone è intrinsecamente complesso.

## BERTScore
![](/assets/images/Recent trends of NLP/2c5789c8-dc22-41cf-9565-f3dfa8c552b9-image.png)

Usa l'encoding di BERT per la valutazione. Confronta il ground truth e la frase da valutare tramite similarità.

# In-Context Learning
Un campo che mira a gestire tutti i task NLP come task di generazione del linguaggio naturale. GPT è l'esempio rappresentativo.

![](/assets/images/Recent trends of NLP/287c17a3-f28f-4ffe-92d5-eeb3d3368bab-image.png)

Questo è un po' diverso dal few-shot nelle CNN. Poiché tutti i task sono trattati come generazione di linguaggio, anche la descrizione del task, gli esempi e il prompt sono in linguaggio naturale. Rimane few-shot nel senso che nessun dato relativo alla traduzione è stato usato per il training.

## Prompt Tuning
Il task di capire come scrivere la descrizione del task, gli esempi e il prompt (dal diagramma sopra) per eseguire al meglio il task desiderato.

![](/assets/images/Recent trends of NLP/ef440bf2-f134-470d-a1e1-19abdedbd69a-image.png)

Ottimizza tutto il testo usato nella query per ottenere una risposta. Si costruisce un modello separato per il prompt tuning, ma il modello originale (GPT) non viene fine-tunato affatto.

## Language Models Trained on Code
![](/assets/images/Recent trends of NLP/c5dc3fa6-d7d9-4efc-9ddd-9479c8da862f-image.png)
Codex: un language model fine-tunato su codice Python pubblicamente disponibile da GitHub.
Applicare In-Context Learning e Prompt Tuning anche al codice ha prodotto buoni risultati nella programmazione.

# Modelli Multi-Modali
Modelli che combinano più tipi di informazione.

## DALL-E
![](/assets/images/Recent trends of NLP/627b1a77-8cfc-4903-a048-441fc08f2443-image.png)
Generazione di immagini da descrizioni testuali. Un conditional generator.
Le immagini vengono divise in n patch, e ogni patch viene trattato come un vettore di embedding. DALL-E raccoglie questi n patch e li elabora come un'unica sequenza. È basato su transformer.

## CLIP
![](/assets/images/Recent trends of NLP/50752cfc-b048-4272-8033-3db8d860905b-image.png)

Un modello basato sulla logica che se testo e immagine sono semanticamente simili, dovrebbero essere vicini nello spazio di embedding.

I dati di training sono composti da immagini e didascalie. Le didascalie da tipi di immagine diversi vengono allontanate nello spazio di embedding, mentre quelle da immagini simili vengono avvicinate. Anche questo è basato su transformer.

**Molto usato come modello pre-addestrato.**
È un modello pre-addestrato molto versatile, utilizzabile sia in CV che in NLP. Può codificare testo, immagini o qualsiasi cosa.

NeRF, un modello di generazione di immagini 3D, si dice che sia basato su transfer learning da CLIP.

# Domande e risposte
- I modelli tradizionali della famiglia RNN (RNN, LSTM, GRU) sono stati completamente sostituiti dai transformer?
  - No. L'RNN è ancora usato in molti domini per la previsione di informazioni future.
  - I campi che si concentrano sui segnali di pattern sono utilizzatori rappresentativi di RNN.
  - I transformer non hanno molti parametri di per sé, ma di solito vengono impilati con molti layer, e i prodotti intermedi (Q, K, V) richiedono molta memoria. $softmax(QK^T)$ richiede memoria proporzionale a $sequence^2$.
  - Quindi i modelli della famiglia RNN vengono usati quando servono modelli leggeri.
- Word2Vec, GloVe, RNN, LSTM sembrano sempre meno usati. Dovrei concentrarmi sulla tecnologia recente?
  - Di recente, i modelli pre-addestrati funzionano bene anche con dati che non sono passati attraverso embedding elaborati. Ma Word2Vec e GloVe sono a loro volta layer di embedding. Capire come funzionano resta utile.
- Non basterebbe che il modello avesse tutte le informazioni?
  - I modelli non sono costruiti così perché bisogna gestire informazioni impreviste. Inoltre, è realisticamente impossibile che un solo modello conosca tutte le informazioni del mondo.
