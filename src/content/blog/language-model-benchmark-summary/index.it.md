---
title: "Riepilogo dei benchmark per language model"
description: "Riepilogo dei benchmark per language model da GLUE alle valutazioni multilingue, coprendo l'evoluzione da RNN a ELMo, BERT e oltre."
date: "2021-09-26T22:12:41.097Z"
tags: ["nlp", "naver-boostcamp"]
lang: it
translationOf: "language-model-benchmark-summary"
draft: false
---

# Language Modeling
Un task Seq2Seq. Predire la parola successiva dato un contesto.

![](/assets/images/Language model Benchmark 간단 정리/c4574267-c36a-47a2-8735-213136b0523f-image.png)

Si può anche pensare come predire la probabilità della parola successiva in un dato punto della frase.

## RNN
![](/assets/images/Language model Benchmark 간단 정리/eade94db-783b-4d14-97ce-ba671fdb5f24-image.png)

Gli elementi della sequenza vengono passati al modello in ordine. L'hidden state precedente viene usato come input per lo step successivo.

Le RNN sono modelli progettati per task specifici, quindi **funzionano bene solo su quei task**. Es., un modello Seq2Seq gestisce solo Seq2Seq.

## Language Modeling bidirezionale
### ELMo
Language modeling bidirezionale. ELMo (Embeddings from Language Models) ha introdotto questo concetto per primo.

Ha mostrato che fare embedding del linguaggio naturale ed eseguire task di language modeling può gestire anche altri task NLP.

![](/assets/images/Language model Benchmark 간단 정리/76453581-7a9e-45d5-81f6-df575506d647-image.png)

Come mostrato nel diagramma a destra, ELMo esegue il language modeling in entrambe le direzioni, forward e backward.

![](/assets/images/Language model Benchmark 간단 정리/a7b68d9f-1073-4494-afc5-4383d18764ed-image.png)

In precedenza, c'erano modelli separati specializzati per SQuAD (QA), SNLI (rilevamento contraddizioni), SRL (etichettatura dei ruoli semantici), Coref (individuazione entità, [Blog](https://gnoej671.tistory.com/15)), NER (riconoscimento entità) e SST-5 (classificazione frasi).

ELMo ha eseguito tutti e 6 i task con un singolo language model mostrando accuratezza significativa.

## BERT
Bidirectional Encoder Representations from Transformers. Un paper che ha usato i Transformer per il language modeling bidirezionale.
![](/assets/images/Language model Benchmark 간단 정리/1118b4bd-da20-492a-8b94-7282d751cf00-image.png)

Pre-allena transformer di encoding/decoding su un grande corpus per estrarre embedding. Dove ELMo usava due RNN per l'encoding bidirezionale, BERT usa i transformer per trainare entrambe le direzioni simultaneamente.

![](/assets/images/Language model Benchmark 간단 정리/5ee98e48-41c5-4b9c-9134-dc97ef254a51-image.png)

![](/assets/images/Language model Benchmark 간단 정리/2cfb4633-fe7c-4b83-acc7-c019d407509c-image.png)
Come ELMo, BERT ha mostrato che il language modeling può gestire più task NLP.

![](/assets/images/Language model Benchmark 간단 정리/0b9ec46d-9a05-4ac1-86a4-510ea9b1d20e-image.png)

Altri avevano già provato a gestire più task NLP con un singolo language model, ma BERT ha avuto le migliori prestazioni ed era più facile da usare.

Ha dimostrato prestazioni efficaci su GLUE e SQuAD 1.1/2.0.

# GLUE
General Language Understanding Evaluation.
Un dataset e una definizione di task per valutare quanto un language model **comprende** il linguaggio naturale.

Dataset standardizzati e definizioni di task NLP hanno reso molto più facile valutare BERT e i modelli successivi. RoBERTa di Facebook, ELECTRA di Stanford, ALBERT di Google -- tutti valutati equamente sotto questo framework.

Elementi del GLUE Benchmark. ref: https://vanche.github.io/NLP_Pretrained_Model_BERT(2)
- MNLI (Multi-Genre Natural Language Inference): task di classificazione dell'implicazione
- QQP (Quora Question Pairs): determinare se coppie di domande su Quora sono semanticamente identiche
- QNLI (Question Natural Language Inference): versione a classificazione binaria di SQuAD -- se un paragrafo contiene la risposta
- SST-2 (Stanford Sentiment Treebank): classificazione binaria di frasi singole con sentimento da recensioni di film
- CoLA (Corpus of Linguistic Acceptability): classificazione binaria dell'accettabilità linguistica di frasi inglesi
- STS-B (Semantic Textual Similarity Benchmark): misura della similarità tra coppie di frasi
- MRPC (Microsoft Research Paraphrase Corpus): similarità tra coppie di frasi
- RTE (Recognizing Textual Entailment): simile a MNLI ma con meno dati
- WNLI (Winograd NLI): dataset NLI con problemi di valutazione, escluso dagli esperimenti BERT

![](/assets/images/Language model Benchmark 간단 정리/cccf4ba8-a0b8-46f6-9f2e-fcc534e6477b-image.png)

GLUE ha fornito uno stimolo continuo al miglioramento dei modelli attraverso il benchmarking.

# Benchmark per la generazione del linguaggio naturale

![](/assets/images/Language model Benchmark 간단 정리/5372dd0d-92c6-4a22-abaf-0b8a475d4507-image.png)

Oltre a GLUE, sono emersi benchmark per valutare language model come T5 di Google ([Blog](https://brunch.co.kr/@synabreu/49)) e BART di Facebook ([Blog](https://dladustn95.github.io/nlp/BART_paper_review/)).
Questi benchmark valutano quanto bene viene generato il linguaggio naturale.

Il testo mascherato o rumoroso viene ricostruito non dall'encoder ma attraverso l'output del decoder. Cioè, anche il decoder è incluso nell'ambito del pre-training.

# Benchmark multilingue
Dato che GLUE è basato sull'inglese, le altre lingue dovevano affidarsi ad approcci basati sull'inglese. Senza considerare le caratteristiche specifiche della lingua, questo portava a processi inefficienti di modifica degli approcci inglesi o ideazione di metodi specifici da zero.

Sono emersi benchmark multilingue, progettando e valutando benchmark su misura per lingue specifiche:
- FLUE: francese
- CLUE: cinese
- IndoNLU benchmark: indonesiano
- IndicGLUE: lingue indiane
- RussianSuperGLUE: russo

## Benchmark coreano
KLUE (Korean Language Understanding Evaluation)

- Named Entity Recognition (NER)
  - Classificare parole secondo categorie predefinite
- POS Tagging e Dependency Parsing
  - Identificare le parti del discorso
  - Analizzare le relazioni di dipendenza tra parole
- Text Classification
- Natural Language Inference
  - Determinare se due frasi sono contraddittorie, esplicative, ecc.
- Semantic Textual Similarity
- Relation Extraction
- Question Answering
- Task-oriented Dialogue
