---
title: "Riepilogo MLOps"
description: "Lista curata di strumenti e framework MLOps tra cui Wandb, Hydra, DVC, ONNX e opzioni CI/CD per i workflow di progetti ML."
date: "2021-09-22T17:27:56.922Z"
tags: ["mlops"]
lang: it
translationOf: "mlops-summary"
draft: false
---

# MLOps framework, tool
Framework e strumenti MLOps che vale la pena provare durante il Boostcamp. Usare solo quelli necessari.

- Wandb
  - main logger
  - Sweep
    - hyperparameter tuner
- Hydra: configuration manager
  - Migliore consistenza ed estensibilita rispetto a implementare un parser JSON da soli
  - Comodo per condividere gli hyperparameter
- DVC: data version control
  - Potrebbe valere la pena provarlo se c'e bisogno di modificare dati NLP
  - Probabilmente non servira per KLUE
- ONNX: model deployment
  - Invece di distribuire i parametri del modello PyTorch, si converte in un modello ONNX completamente eseguibile
  - Da considerare se serve deployment esterno
- Fast API / Uvicorn
  - Usare entrambi i framework via docker quando serve un server asincrono
  - Sembra utile per il deployment ONNX
- Github actions, Jenkins, Circle CI
  - Per il post-processing dei modelli addestrati
  - wandb-action
    - Consolida i risultati wandb in CSV
    - Probabilmente non necessario se si usano i wandb sweeps
- Kibana
  - Sembra necessario se si usa AWS Elastic
  - Non necessario se basta wandb sweep

# Collaborazione
## Ambienti disponibili
Aspetti applicabili dalla prospettiva MLOps, non dal software engineering:
- Circle CI
  - Build
  - Deploy
  - Di solito gestito tramite pacchetti wrapper chiamati Orbs
  - [ref](https://velog.io/@priveate/CircleCI-%EB%A7%9B%EB%B3%B4%EA%B8%B0)
- Github
  - Discussion, issue, action unificabili
  - Nessuna configurazione separata necessaria
  - Issue: compiti di sviluppo
  - Discussion: discutere issue o altri argomenti
  - Action: post-processing modelli addestrati
- Jira Software
  - Richiede configurazione separata, funziona solo con token github
  - Issue: compiti di sviluppo, piu possibilita di automazione rispetto a github
  - Board: a differenza di Github Project, la board stessa e un generatore di issue. Github richiede la conversione separata in issue.
  - Build: bisogna collegare un tool di build separato. Circle CI, Jenkins, Travis supportano tutti Jira.


## Approcci
- Solo Github
  - Code review e gestione progetto tutto tramite github
- Github per code review, Jira per gestione progetto
  - https://makeeyaf.postype.com/post/8614009
  - Code review: Github PR
    - Github usato solo come VCS
  - Gestione progetto: Jira (Issue, Board, Build)
  - Build: Circle CI, Jenkins, Travis, etc.
