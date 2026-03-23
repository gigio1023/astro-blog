---
title: "MLOps Summary"
description: "Curated list of MLOps tools and frameworks including Wandb, Hydra, DVC, ONNX, and CI/CD options for ML project workflows."
date: "2021-09-22T17:27:56.922Z"
tags: ["mlops"]
lang: en
translationOf: "mlops-summary"
draft: false
---

# MLOps framework, tool
MLOps frameworks and tools worth trying during Boostcamp. Just use what's needed.

- Wandb
  - main logger
  - Sweep
    - hyperparameter tuner
- Hydra: configuration manager
  - Better consistency and extensibility than implementing a JSON parser yourself
  - Good for sharing hyperparameters
- DVC: data version control
  - Might be worth trying if there's a need to modify NLP data
  - Probably won't need it for KLUE
- ONNX: model deployment
  - Instead of deploying PyTorch model parameters, convert to a fully executable ONNX model
  - Worth considering if external deployment is needed
- Fast API / Uvicorn
  - Use both frameworks via docker when an asynchronous server is needed
  - Seems useful for ONNX deployment
- Github actions, Jenkins, Circle CI
  - Use for post-processing trained models
  - wandb-action
    - Consolidates wandb results into CSV
    - Probably not needed if using wandb sweeps
- Kibana
  - Seems necessary if using AWS Elastic
  - Unnecessary if wandb sweep alone is sufficient

# Collaboration
## Available environments
Things applicable from an MLOps perspective, not software engineering:
- Circle CI
  - Build
  - Deploy
  - Usually managed via wrapper packages called Orbs
  - [ref](https://velog.io/@priveate/CircleCI-%EB%A7%9B%EB%B3%B4%EA%B8%B0)
- Github
  - Discussion, issue, action can be unified
  - No separate setup needed
  - Issue: development tasks
  - Discussion: discuss issue items or other topics
  - Action: post-processing trained models
- Jira Software
  - Requires separate setup, only works with github token
  - Issue: development tasks, more automation potential than github
  - Board: Unlike Github Project, the board itself is an issue generator. Github requires separate conversion to issues.
  - Build: need to connect a separate build tool. Circle CI, Jenkins, Travis all support Jira.


## Approaches
- Github only
  - Code review and project management all through github
- Github for code review, Jira for project management
  - https://makeeyaf.postype.com/post/8614009
  - Code review: Github PR
    - Github used only as VCS
  - Project management: Jira (Issue, Board, Build)
  - Build: Circle CI, Jenkins, Travis, etc.
