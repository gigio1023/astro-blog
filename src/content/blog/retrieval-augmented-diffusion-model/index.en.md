---
title: "Retrieval-Augmented Diffusion Model"
description: "A review of the paper that enhances diffusion models using retrieval-based approaches from NLP, achieving high-fidelity image generation with fewer parameters."
date: "2022-05-18T00:00:00.000Z"
tags: ["computer-vision", "nlp", "paper-review"]
draft: false
lang: en
translationOf: "retrieval-augmented-diffusion-model"
---

Feedback on any inaccuracies is always appreciated. I aimed to keep this concise, but since there was so much new material, I ended up covering most of the paper.

# Abstract

The paper augments diffusion models using retrieval-based approaches that have proven successful in NLP. During training, the model retrieves and learns from visual features such as CLIP and neighboring elements of training instances.

The model leverages CLIP's image-text embedding space and demonstrates strong performance on tasks like class-conditional and text-image synthesis without explicit training on those tasks. It can also be influenced by both text and image embeddings.

The model can also be applied to unconditional generation, where it achieves state-of-the-art results.

The authors claim that their approach consumes fewer computational resources and is easy to implement.

# Introduction

Language modeling and generative synthesis for high-fidelity images and other data types have made tremendous leaps. In particular, there have been groundbreaking results in image synthesis. [Ref 1, 2, 3, 4]
The three main contributing factors are as follows:

1. The success of transformers in vision tasks. In image synthesis, this was carried out through autoregressive modeling.
2. Diffusion models have been successfully applied to high-resolution image generation and have become the standard for generative image modeling.
3. Both methods from 1 and 2 scale well. In particular, there is evidence that scalability is key to performance when considering model and batch size.

However, most performance improvements are achieved simply by increasing computational power and the number of parameters. This paper aims to improve performance without relying on that approach.

Instead, inspired by the success of retrieval-augmented generative language models, the paper trades off trainable parameters for a memory of visual examples. It also explicitly defines parts of the proposed model through an image database.

During training, the retrieval-augmented semi-parametric model accesses a database through nearest neighbor lookup and learns to synthesize images based on retrieved visual building blocks.

By combining this retrieval-enhanced strategy with diffusion models, the authors obtain a lightweight model that outperforms fully parametric counterparts on multi-modal datasets.

![](/assets/Generative-model/20220520155013.png)

In Fig. 2, when retrieving nearest neighbors in the text-image space using CLIP, text prompts are used as queries for exemplar-based synthesis. When retrieved neighbors are constructed under direct influence of CLIP's text encoding $\phi_{\tiny CLIP}(c_{\tiny text})$, the authors observed that their ImageNet model can generalize to unseen or fictional text prompts.
On the other hand, when $\phi_{\tiny CLIP}(c_{\tiny text})$ is used together with k - 1 nearest neighbors related to $\phi_{\tiny CLIP}(c_{\tiny text})$ from the retrieval database, or when k nearest neighbors are used without any text representation, the model did not exhibit generalization capabilities.

In other words, Fig. 2 shows that "NNs only" and "Text repr. and NNs" have weaker generalization capabilities compared to "Text repr. only."

## Abstract summary

Therefore, the paper presents a simple framework of retrieval-augmented generative modeling with diffusion models. By performing searching and conditioning in CLIP's latent space, nearest neighbor representations can be constructed with very minimal compute. Additionally, retrieval speed is very fast and CLIP embeddings require very little storage. The semi-parametric approach can satisfy both high fidelity and diversity.

By using CLIP's image-text features, the framework enables various conditional applications such as text-to-image and class-conditional synthesis, as demonstrated in Fig. 2.

Finally, the paper demonstrates whether changing the retrieval database at test time grants additional flexibility to synthesis process control, and how this can be combined with existing classifier-free diffusion models.

# Related work

## Diffusion Models for Image Synthesis

This section covers the general achievements and limitations of diffusion models. For unconditional image generation on complex datasets like ImageNet, large model sizes and significant compute resources are required.

The paper proposes exchanging trainable parameters for external memory to overcome these limitations. This enables even small models to perform high-fidelity image generation at a level comparable to continuously growing models.

## Retrieval-Augmented Generative Models

Leveraging external memory to enhance existing model performance is a widely used technique in NLP. RETRO [5] proposed a retrieval-enhanced transformer that achieved state-of-the-art results using fewer parameters and compute resources. Retrieval-augmented models with external memory transformed parametric deep learning models into semi-parametric models.

Early retrieval-augmented visual models used training data for retrieval rather than external memory. IC-GAN, for instance, utilizes the neighborhood of training images to train the GAN and generates samples constrained to single instances of the training data.

However, since training data was used as the retrieval target, generalization capacity was inherently limited, and the authors address this through external memory.

## Concurrent Work

Recently, unCLIP [6] and kNN-Diffusion [7] were proposed as work similar to this paper.

unCLIP conditions diffusion models on CLIP representations and uses large-scale computation to produce high-quality text-image results. However, unlike this paper, that model is constrained by CLIP representations of training data, so generative text-image capabilities are learned afterward.

kNN-Diffusion avoids unCLIP's above limitation by conditioning through neighborhoods, which is very similar to this paper's approach. It also uses continuous formulation rather than discrete diffusion formulation to analyze different forms of neighborhood representations, and the fact that it is not limited to text-image synthesis is also very similar.

# Image Synthesis with Retrieval-Augmented Diffusion Models

## Retrieval-Enhanced Generative Models of Images

Semi-parametric generative model by introducing a tuple of trainable and non-trainable model components.

A non-trainable sampling strategy obtains a subset of the database based on a query.

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200512.png)

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200719.png)

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200736.png)

<!-- Semi-parametric generative model에서는 $p_{\nu}(x)$를 학습한다.
이 때, $\nu = \{\theta, \mathcal{D}, \sampling}$,  where $\mathcal{D} = \{y_i\}_{i=1}^{N}$ is a fixed database of images $y_i \in \mathbb{R}^{H_{\mathcal{D}} \times W_{\mathcal{D}} \times 3}$

일반적인 모델은 $\nu$ 자리에 $\theta$가 오지만, semi-parametric model은 3가지 factor를 기반으로 학습한다.

$
p_{\theta, \mathcal{D}, \sampling}(x)
= p_{\theta}(x \vert \{y \vert y \in \sampling(x, \mathcal{D})\})
= p_{\theta}(x \vert \{y \vert y \in \mathcal{M}_{\mathcal{D}}^{(k)}\})
\label{eq:modelbase}
$ -->
## Semi-Parametric Diffusion Models

The authors build upon their previous work on LDM (Latent Diffusion Model). The idea is to run the diffusion model on the latent space of VQ-GAN. For example, VQ-GAN downsamples a 256x256 image to 64x64, and the reverse diffusion process is learned in that space.

In the case of unCLIP, since 64x64 images are learned directly, a separate super-resolution module must be trained to upscale them to 256x256. In contrast, LDM uses VQ-GAN's latent space, so the 64x64 image is fed back into VQ-GAN to obtain a 256x256 image.

![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522200755.png)
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522201040.png)

The objective function uses the formula provided in DDPM.

## Inference for Retrieval-Augmented Diffusion Models

Unlike training, no query image is available during inference, so an additional process is needed.
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522201643.png)

One approach is to create a text query and perform text-conditional generation using CLIP. Even without a query image, CLIP possesses a shared representation of text and images, making this feasible.

1. Simply create a text query instead of using an image.
2. Obtain the text embedding of the query through CLIP embedding.
3. Retrieve the neighborhood based on similarity between the text embedding and dataset images.

The possible inference modes are summarized below:
- Text-to-image
  - Obtain the text query's embedding via CLIP and use it for neighborhood searching.
- Class-conditional
  - Use "A photo of { }" as the text query.
- Unconditional
  - Random sampling from a fixed dataset followed by neighborhood searching is possible. However, this approach only produced simple images or images similar to the reference.
  Therefore, a proposal distribution was devised to preferentially select samples that contributed most to training.
  ![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522202728.png)
  A pseudo query is generated from the proposal distribution, and neighborhood searching is performed for unconditional generation.


## Trading Quality for Diversity
### Truncation distribution of datasets
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522203230.png)
During unconditional generation, images were generated with too much diversity, so only the top m samples with the highest density were used.

### Classifier-free guidance
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522203420.png)
This was used to improve generation quality in conditional image generation. The idea is to generate under both conditional and unconditional settings, then denoise by the difference between the two.

# Methods Overview
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522203721.png)

# Experiments
## Experiment settings
- Decoding head (generative model): LDM with 400M parameters. The original LDM has 500M, so this is a slightly smaller model.
- Retrieval model: CLIP-ViT-B/32
- Fixed Database: 20M examples from OpenImages (9M). Since one dimension of OpenImages' resolution is typically larger than 1200, 2 to 3 patches were extracted from each image.
- Training dataset: ImageNet
- NN search: ScaNN search algorithm

## Image encoder
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522204403.png)
Although VQ-GAN can also be implemented via pooling, CLIP embedding performed the best.

## K-NN
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522204600.png)
This is the evaluation across different values of K. As K increases, recall, precision, FID, and IS all degrade. Since image quality can be improved through methods like classifier-free guidance, the author suggests that K was likely set to maximize recall. [8]

## Patch size
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522204754.png)
Because OpenImages has very high resolution, how patches are handled mattered significantly. This process is called patchification, and larger patch sizes yielded better performance.

Note that this is not a strict evaluation, since CLIP was not trained on 64x64 images, which could explain the poor performance at that resolution. [8]

## Training data complexity
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522205332.png)

This experiment varied the generation target. As the scope expanded from Dogs to Mammals to Animals, both precision and FID worsened for both the baseline and SP-LDM. However, for recall, SP-LDM actually improved.

The paper argues that even as generation performance declines, the model retrieves related images from the external dataset and strives to generate images similar to them, which explains the increase in recall.

## Unconditional generation results
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522205809.png)

## Conditional generation results
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522205901.png)

The model generates well even when using a class's CLIP text embedding along with k - 1 nearest neighbors for conditioning. This is significant because class-conditional training was not used.

## Text-to-image
![](/assets/images/Generative-model/Retrieval-Augmented-Diffusion-model/20220522210307.png)
The available conditioning options are as follows:
- Text embedding condition
- Text embedding + nearest neighborhood condition
- Nearest neighborhood condition

Despite training only on ImageNet, conditioning with CLIP's text embedding produced good results. In fact, providing more image-level information degraded performance. Using text embedding together with nearest neighborhoods did not outperform using text embedding alone.

# Reference
- Paper: https://arxiv.org/abs/2204.11824
- 1: [Taming Transformers for High-Resolution Image Synthesis](https://arxiv.org/abs/2012.09841)
- 2: [Diffusion model beat GANs on image synthesis](https://arxiv.org/abs/2105.05233)
- 3: [Glide: Towards photorealistic image generation and editing with text-guided diffusion models](https://arxiv.org/abs/2112.10741)
- 4: [Hierarchical text-conditional image generation with clip latents](https://arxiv.org/abs/2204.06125)
- 5: [Improving language models by retrieving from trillions of tokens](https://arxiv.org/abs/2112.04426)
- 6: [Hierarchical Text-Conditional Image Generation with CLIP Latents](https://arxiv.org/abs/2204.06125)
- 7: [Knn-diffusion: Image generation via large-scale retrieval](https://arxiv.org/abs/2204.02849)
- 8: https://www.youtube.com/watch?v=Ktgt7bcXLYI
