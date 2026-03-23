---
title: "AI & Ethics"
description: "Discussion of AI bias, fairness, and privacy issues, including the COMPAS case study and COVID contact tracing privacy analysis."
date: "2021-09-26T10:10:36.459Z"
tags: ["ethics", "naver-boostcamp"]
lang: en
translationOf: "ai-and-ethics"
draft: false
---

# Bias
Northpointe's COMPAS, a system for predicting recidivism in the US, exhibited biased predictions regarding race and gender, and was ultimately discontinued due to ambiguous legal basis, as shown below.
![](/assets/images/AI & Ethics/12702dce-9ede-49d5-86ba-785eb013d5a4-image.png)

Personally, I think COMPAS was **a bias issue caused by insufficient legal persuasiveness and flawed model design**.

If data analysis was biased toward a specific gender, race, or religion, that's a problem with the data analysis methodology, not developer propaganda driven by their beliefs. If imbalanced class distribution was mishandled and the model learned it as-is, the model's reliability can't be guaranteed and its predictions won't be accurate either.

The important thing is that COMPAS's development process and data are a **trade secret**. [Related article](https://m.lawtimes.co.kr/Content/Opinion?serial=119712)
In other words, we don't know whether the developers built a biased model due to racial or gender-related beliefs, or whether it was simply a statistical error.

As the attorney in the linked article mentions, this also constitutes a **violation of due process**. Evidence adopted through trade secrets leaves no room for the defendant's right of defense, and the court can't use it as a basis for judgment either.

The NSTC (National Science and Technology Council) report 'Preparing For The Future Of Artificial Intelligence' dedicates an entire chapter to 'Fairness,' showing how blackbox learning methods fail to guarantee the public's right to know. Such blackbox approaches make it difficult to certify that racial or gender discrimination hasn't occurred, though it's clearly something that must be pursued.

## Bias-Related Research
There are apparently legal papers studying how bias arises in big data.
https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2477899
The paper's abstract says that finding exact solutions is difficult because the root of the problem is hard to identify.
- Algorithms are inevitably data-driven. If the data is biased, the output will be biased too.
- If previous judges' rulings were biased, the algorithm will produce biased rulings too. Social bias gets reflected in algorithms.
- Patterns disadvantageous to minorities and vulnerable groups may exist in social data. But knowing the exact source of such data is difficult.
- Developers may not intend to build biased models, but biased models can still result.

### Define Target Variable and Class Labels
The paper says bias can arise from the very definition of target variables and class labels.
For example, defining a "good employee":
- Years of service
- Daily working hours
- Productivity
- Relationships with coworkers

Bias can enter when defining these variables and class conditions. How you define productivity, how you define daily working hours — these can involve highly subjective elements.

### Labeling
In LinkedIn Talent Match, employees are evaluated by employers. Employers may be implicitly biased. Such evaluation data can be reflected in training data.

### Collection
The argument is that bias can be embedded in data collection itself.
- Underrepresentation
  - There are cases where data fails to represent vulnerable groups.
  - For example, in Boston, citizens report road damage by taking photos with smartphones, but in areas with concentrated vulnerable populations, smartphone availability was low, so reporting was inadequate.
- Overrepresentation
  - Data overrepresents vulnerable groups
  - Activities of employees from vulnerable groups may receive disproportionate attention from employers, making objective evaluation impossible.

### Feature Selection
The argument is that bias is embedded in the features themselves. A representative example of overcoming this is blind hiring.
Redlining: looking at general criteria. Evaluating surrounding environments rather than individuals.

### Proxies
- Unintentional discrimination
  - The model independently discovers biased patterns without intent
- Intentional discrimination
  - Designers deliberately inject bias into algorithms

## Bias Metrics
![](/assets/images/AI & Ethics/cebc13d0-9abf-4940-a53a-b60ac8401221-image.png)
Source: May, et al. NAACL 2019

In NLP models, European American names are reportedly learned as more contextually appropriate with positive words, while African American names are more contextually appropriate with negative words.

![](/assets/images/AI & Ethics/626691f1-c2b7-457a-9294-da78f20313e9-image.png)
As the diagram shows, sentence-to-sentence positive/negative evaluation also carries bias, according to the paper.

## Bias Conclusion
This is a sensitive topic, so I handled it with more care than other posts.

COMPAS is the most fitting example when introducing AI and bias cases. The model trained on biased data, yielding poor predictions; a blackbox model has no legal persuasiveness as evidence; and it can't guarantee the defendant's right of defense.

That said, I personally don't think we should obsess over biased results. If a statistically and methodologically sound approach was designed, questioning its results for bias is meaningless.

Misguided social bias clearly exists, and it's reasonable that AI models should avoid learning and reinforcing such biases. But cases like 'Lee Luda' show that propaganda-driven analysis, rather than legal or statistical reasoning, was also prevalent in society.

The issues with the Lee Luda service have been pointed out through various articles. [Article link](https://m.lawtimes.co.kr/Content/LawFirm-NewsLetter?serial=170076)
What should be noted are Lee Luda's privacy protection and legal issues, not a biased model. As someone studying AI, it's unfortunate that the Lee Luda issue was overshadowed by propaganda from certain groups.

**In short, I think it's misleading to claim a model was developed with bias based solely on its outputs, without considering statistical and legal perspectives.**

# Privacy
This is a paper analyzing privacy issues of Singapore's COVID-19 contact tracing app 'TraceTogether' and suggesting improvements.
ref: https://arxiv.org/pdf/2003.11511.pdf

The privacy-related issues raised in the paper are as follows.
- User devices only contain their own information. However, all user information is stored on a central server, masked with random strings that can't identify individuals.
- Privacy from snoopers
  - Individual information is managed through identifiers that change via random strings each time, and only personal information exists on the device. So even if there's a risk of snooping, privacy issues aren't significant.
- Privacy from contacts
  - If contact with a COVID-19 patient is detected, the app notifies the Singapore government. But it doesn't hand over personally identifiable information (name, gender, etc.).

**Improvements**
The paper suggests the following technical improvements for privacy protection.
- Store personal information on distributed servers
- Use cryptography-based solutions
- Adding random noise doesn't help with privacy protection.

**South Korea**
South Korea has fewer confirmed cases compared to other countries, so all confirmed patient information is disclosed. This is not a good approach from a privacy standpoint. It's also meaningless if the number of confirmed cases is high.

# Social Inequality
This is a White House report summarizing the social impact AI might have over 10 years. Reports exist from 2016, 2018, and 2019; the reference is the 2016 report.

ref: https://ainowinstitute.org/AI_Now_2016_Report.pdf

The report says:

AI could make socially important decisions.
- Housing
- Health insurance: People with certain diseases or genetic predispositions could pay more or be denied coverage. Traditional health insurance makes similar decisions, but AI has the potential to detect latent diseases and genetic predispositions early.

**Benefits**
- Professions that use AI well (developers, finance, etc.)
- Groups with access to large-scale resources

**Harmed**
- Vulnerable populations without IT access
- Small groups, schools

## Labor
Job losses for employees seem inevitable. There's also potential for harm when systematic management of employees becomes more structured. e.g., Uber

## Misinformation
**News**
Language models like GPT-3 that write human-like text have the potential for explosive fake news production.
ref: https://tinkeredthinking.com/?id=836

**Deepfakes**
ref: https://arxiv.org/pdf/2001.00179.pdf
While first-generation GANs produced awkward images, second-generation and later GANs generate very natural images. This paper addresses face replacement detection to prevent related harms.

## Identity
**Identity Prediction**
ref: https://www.pnas.org/content/pnas/110/15/5802.full.pdf
A paper that predicts user information (age, gender, political leanings) by analyzing their Facebook likes.

![](/assets/images/AI & Ethics/a20d8724-5198-424a-8902-8fff6ffd8ada-image.png)

Predictions are possible for quite a variety of information, and they're meaningful.

**Detecting cheaters in coding test**
ref: https://dl.acm.org/doi/abs/10.1145/3386527.3406726
![](/assets/images/AI & Ethics/fe3ff752-4b41-4c89-86b9-551e700b236b-image.png)
A paper for detecting cheaters in coding tests. It classifies users by detecting keystrokes.

# Health
**Early detection**
Among diabetic patients, some develop complications that cause vision loss. Technology has been developed to detect such cases early.
ref: https://irisvision.com/diabetic-retinopathy/

**Medical image interpretation**
ref: https://youtu.be/Mur70YjInmI
Reportedly used for cancer detection through image interpretation to aid diagnosis. Personally, some developers seem to think CV has found the definitive solution for such cases, but I think these should still serve only as assistive tools. In fact, current legal restrictions classify them as medical support tools rather than medical diagnostic tools.

**COVID-19 Detection**
ref: https://www.nature.com/articles/s41591-020-0931-3
A paper about a model that detects COVID-19 by combining multiple DL models.

# Climate Change
**$CO_2$ Emissions**
ref: https://s10251.pcdn.co/pdf/2021-bender-parrots.pdf
An issue that always comes up with AI and environmental pollution.
When a person emits roughly 5 tons of $CO_2$ per year, a single training run of a typical large transformer emits about 284 tons of $CO_2$. The paper argues that researchers should consider energy costs alongside efficiency and performance.

**Cases where it helps the environment**
ref: https://arxiv.org/pdf/1906.05433.pdf
It's a long paper, but summarizing AI's applications:
- Developing solutions that don't use carbon fuels
- Developing solutions that effectively reduce consumption of existing resources
- Developing plans for global deployment of such solutions
- Increasing energy efficiency of transportation (electric vehicles)
- Planning efficient transportation schedules for trains, airplanes to reduce fuel consumption
- Analyzing hot water usage patterns for effective supply
- Placing shared bicycles based on demand to increase ridership
- Optimizing Uber routes for shorter paths

![](/assets/images/AI & Ethics/4218cae7-cb2a-464f-85dc-85cef50c65c7-image.png)

For example, if electricity consumption forecasting is done effectively, resources can be allocated based on need. Since this is about electricity, the key point seems to be adjusting electricity production rather than focusing on resource allocation. After all, there's no convenient state-of-charge system for storing electricity like a dam..

---

![](/assets/images/AI & Ethics/faeb6bb5-c874-44b7-8ba9-a542309fee04-image.png)
ref: https://deepmind.com/blog/article/deepmind-ai-reduces-google-data-centre-cooling-bill-40

A post by DeepMind about cooling efficiency at Google data centers. The goal is to analyze scheduling patterns during ML workloads versus non-ML workloads using ML, thereby reducing energy consumed for cooling.
