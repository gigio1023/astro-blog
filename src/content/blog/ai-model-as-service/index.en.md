---
title: "AI Model as Service"
description: "End-to-end process of deploying AI models as services, from requirements analysis and dataset construction to modeling, testing, and team organization."
date: "2021-09-23T05:09:46.199Z"
tags: ["naver-boostcamp"]
lang: en
translationOf: "ai-model-as-service"
draft: false
---

# AI Model as Researching
![](/assets/images/AI model as Service/b0c684b9-202f-40b7-8a82-eeebc246bbcd-image.png)
Like ImageNet, the dataset is well-defined, and the focus is on modeling to solve it.

# AI Model as Servicing
![](/assets/images/AI model as Service/0bfb577d-4358-44fe-a2a4-09f16450e819-image.png)
In most industrial environments, datasets don't exist at all. Typically, only software requirements exist, and AI is demanded as a tool to solve them.

So in most cases, you have to build the dataset yourself.

## Requirements
Think of the software engineering you learned in school. Use whatever means necessary to extract functional and non-functional requirements.

### Dataset
![](/assets/images/AI model as Service/8ebf7128-e569-4c5e-b5fe-2ae4faa638c6-image.png)
- Clarify requirements related to type, quantity, and ground truth
- Each requirement must be defined clearly
- Type: Largely dependent on requirements, but stay flexible
  - e.g., In OCR for mathematical formulas, how do you categorize the image types? Consider categories like elementary, middle school, handwritten, printed, etc.
- Define modules for processing the dataset
  - e.g., Define an AI module to extract individual formulas from images containing multiple formulas.
- Define ground truth
  - e.g., For math-related OCR, the ground truth is a LaTeX string
- Define quantity
  - Set appropriately considering budget and model performance

### Modeling
- Processing time
  - Time from input to output in the actual service
- Target accuracy
  - Determined quantitatively
- Target QPS (Query per Second)
  - Determine queries processable per second
  - Affected by hardware, processing time, model size
  - Model size only affects QPS at thresholds
    - If GPU MEM is 10GB and the model is larger than 5GB, no matter how much you shrink it, only one model can be loaded. From a QPS perspective, models above 5GB don't affect QPS.
- Serving method
  - Local, Cloud, Mobile, etc.
- Hardware specs

#### Model Partitioning
Heavily dependent on the dataset design. If needed, **combining multiple verified models into one is a good approach.** Datasets must also be prepared separately for each model.

Take handwritten math formula OCR as an example.

AI Model
- input: formula image
- output: LaTeX string

There's no dedicated model for this task alone, and modeling OCR from scratch would be a high-dimensional task. So the AI model can be split as follows.

AI model
  - Detector: LaTeX symbol detection
  - Recognizer: LaTeX symbol classification
  - Aligner: Align LaTeX symbols on a single line
  - Converter: LaTeX string generation

Since it's split into 4 models, datasets providing the appropriate input/output for each are needed.

#### Model Candidates
Launching a service with just a single AI model can be risky. Create multiple candidate AI models and choose the service release version after quantitative and qualitative evaluation.

### Test
Sometimes a separate test dataset is built; other times, a portion of the training data is used. This should also be derived from requirements.

- **Offline test**: Quantitative evaluation in the development environment before actual service deployment
  - Used to select from the AI model candidate pool
  - e.g., Model accuracy of 99%
- **Online test**: Quantitative evaluation when deployed in the actual service
  - Identify improvement points through VOC (Voice of Customer)

**e.g., 1 vs 1 AI Game Player**
- input dataset: Per-frame capture images, pro gamer logs
- output dataset: Skill set to use (including "no action")

Suppose this task is treated as a classification task and a model with 99% accuracy (**offline test**) is developed. But when playing against actual users (**online test**), the model would very likely just stand still.

Because it was developed assuming simple classification. In pro gamer logs where the player is mostly idle and occasionally uses skills, anything other than idling would likely be treated as noise.

## Team
![](/assets/images/AI model as Service/01baaabd-315e-4064-b830-3232f0783300-image.png)
A diagram of team structure for analyzing and developing requirements.

- Model engineer
  - Most models are developed in PyTorch; convert to TensorFlow for service suitability
  - Convert TensorFlow models to TFLite for mobile suitability
  - Convert models to TensorRT for GPU server serving
  - Develop operations that don't exist during framework conversion
  - CUDA Programming
  - Lightweight tasks
  - Convert operations to C++/C for faster computation
- Modeler
  - Personnel who develop models
  - The ability to build good models is still very valuable, but automation is happening fast (e.g., AutoML)
  - Try studying other areas a bit.
    - FE: annotation tool, debugging tool
    - BE: API serving, massive GPU training
    - Model: engineering
- Model management
  - Manage overall model quality
