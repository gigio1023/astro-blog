---
title: "Full Stack ML Engineer"
description: "What it means to be a full-stack ML engineer: roles, ML product lifecycle, team structure, and trade-offs."
date: "2021-09-26T09:41:46.765Z"
tags: ["mlops", "naver-boostcamp"]
lang: en
translationOf: "full-stack-ml-engineer"
draft: false
---

# ML Engineer
An engineer who understands and researches ML/DL and builds products.
![](/assets/images/Full stack ML Engineer/eb9eb9c1-bc28-40c0-ac2f-ac3c54855c8f-image.png)

Sits in an ambiguous spot between Researcher and Engineer. The field moves so fast that research often needs to be applied to products simultaneously.

# Full Stack Engineer

![](/assets/images/Full stack ML Engineer/cc790f50-9fe5-4605-9946-f9fc4af539f5-image.png)
An engineer who can handle both front-end and back-end. Given enough time, can build an entire product solo.

# Full Stack ML Engineer
An engineer who understands DL research and can build ML products.

**ML on the Back-end**
![](/assets/images/Full stack ML Engineer/4486a601-8052-4c92-8602-da7faf181f65-image.png)

**ML on the Front-end**
![](/assets/images/Full stack ML Engineer/d61bbf30-d230-4963-b553-cb4b4b21bfce-image.png)

**Pipeline for ML model development**
![](/assets/images/Full stack ML Engineer/a74e3312-4cef-4b03-a23c-ef6ac982d7b6-image.png)

## Pros
- Good for prototyping
  - Prototyping is often hard to do collaboratively, so being able to do it yourself is valuable.
- Cross-stack synergy
  - Understanding one stack can make development on another stack more efficient.
- Collaboration
  - Can find collaboration points where conflicts might arise.
  - Can anticipate potential risks.
- Diversified growth
  - Serves as a foundation for growth.
  - Can be a trigger to shake off complacency.

## Cons
- Risk of losing depth in any single stack.
  - Every stack evolves so fast that keeping up is extremely hard.
- Absolute time shortage
  - Lots of areas to study, same 24 hours for everyone.

# ML Product
![](/assets/images/Full stack ML Engineer/fea45e30-6992-4980-bd5c-de925c475dec-image.png)
- Requirements gathering
  - Client meetings (B2B), service planning (B2C)
  - Requirements and constraints documentation
  - Framing as an ML problem
- Data collection
  - Raw data collection
  - Annotation tool planning / development
  - Annotation guide creation / operation
- ML model development
  - Literature review and internalization
  - Real-data experiments, evaluation / feedback
  - Model-level optimization
- Production deployment
  - Engineering optimization
  - Research code cleanup
  - Model versioning / deployment automation

# ML Team
Example of an ideally structured ML team:
- 1 project manager
- 2 developers
- 2 researchers
- 1 planner
- 1 data manager

A smaller ML team with blended roles:
- 1 person as project manager, planner, researcher
- 1 person as developer, researcher, data manager
- 1 person as developer, data manager

## Full Stack ML Engineer in ML Team
One person wears multiple hats: developer, planner, data version manager, etc.

### 1. Formulating Real-World Problems as ML Problems
Concretizing customer/service requirements. Requires broad knowledge of existing ML research and awareness of the state of the art to judge feasibility and solution approaches.

### 2. Raw Data Collection
Implementing web crawlers (scrapers) directly.

### 3. Annotation Tool Development
Building applications for inputting collected/provided data and their ground-truth labels.
- Needs UI design that considers both speed and accuracy.
- Understanding the ML model itself is often required for annotation tool development.

![](/assets/images/Full stack ML Engineer/9705aef5-6565-4c05-88de-a81c31c2a525-image.png)

### 4. Data Version Management, Data Loader Development
Data versions must be managed. In most cases, data is accessed through a DB rather than directly, so a relevant loader package needs to be developed. Our mentor used Amazon S3 with Python.
![](/assets/images/Full stack ML Engineer/b6ba9bd2-c039-4237-bef7-d4449815cfe9-image.png)

### 5. Model Development, Paper Writing
- Literature review, reproduction
  - Reproduction performance verified on public benchmark data
- Applying collected service data
- Model improvement and idea application
  - Writing papers if needed
![](/assets/images/Full stack ML Engineer/2956ed76-bd5a-46ec-b42c-e9cd777ff19c-image.png)

### 6. Evaluation Tool, Demo Development
- Building applications that score model prediction results
- Evaluation tools help identify improvement points for the model

### 7. Production Deployment
- Cleaning up research code from steps 1-6 for use on production servers
- Storing code and parameter weights on a file server for version management
- Production server delivers jobs to Python workers via MQ
![](/assets/images/Full stack ML Engineer/fc215f70-56d9-4b42-a380-47243e2129b9-image.png)

# Stack
![](/assets/images/Full stack ML Engineer/bb761f82-eea7-4089-989d-39992ea229d5-image.png)

# Advice
Summary of our mentor's advice:
- Just build it fast
  - Considering systematic architecture for every stack makes the development cycle too long. Build end-to-end as quickly as possible first, then add features.
- Pick a specialty
  - Keeping all stacks at beginner-to-intermediate level isn't great. Reach at least intermediate level in your specialty.
  - An engineer in any field should be able to look at high-level implementation and understand the internal workings.
  ![](/images/93669793-f3f5-4bc3-b2b3-87454c951ad8-image.png)

- Repeat to overcome fear

## Recommendations for ML Engineers
1. Read ML papers and implement/reproduce them
2. Run the implementation on the web
3. Evolve the implementation from step 2 using a DB
