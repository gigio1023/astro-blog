---
title: "Generative Models - 2"
description: "Latent variable models explained: variational inference, ELBO, VAE, and adversarial auto-encoders (AAE)."
date: "2021-08-14T12:01:37.562Z"
tags: ["computer-vision"]
lang: en
translationOf: "generative-model-2"
draft: false
---

# Latent Variable Models
Made by D. Kingma, who also created Adam and the variational auto-encoder. Quite a resume.

Is an autoencoder a generative model?
Since a variational auto-encoder is a generative model, does that make a regular auto-encoder one too? No, it doesn't.

So there's a specific reason that makes the variational auto-encoder a generative model, and understanding that reason is key.

## Variational Inference (VI)
The goal of VI is to optimize the variational distribution that best matches the **_posterior distribution_**.
- Posterior distribution: $p_{\theta}(z|x)$
  - The probability distribution of the random variable of interest given an observation
  - z: latent vector
  - The reverse is typically called the likelihood: $p(x|z)$
- Variational distribution: $q_{\phi}(z|x)$
  - The posterior distribution is often intractable.
  - This is a probability distribution that approximates the posterior.
- KL divergence: the approximation method
  - Used to minimize the difference between the true posterior and the variational distribution.

![](/assets/images/Generative model - 2/2dfa4a4e-fdc2-46fc-a9d9-9f1ae935fd95-image.png)

- Encoder: where the variational distribution is learned

### How to Find the Objective?
Just as gradient descent needs the true y to compute the loss function, variational inference needs the posterior distribution to approximate the variational distribution.

The problem is that the whole reason for using a variational distribution is that the posterior distribution is hard to compute. A contradiction arises.

![](/assets/images/Generative model - 2/be4bc4a1-f73c-4432-a993-d9f416c4763d-image.png)

The math above captures this. It should be accessible with undergraduate-level statistics knowledge. (...)

Reducing the objective in the equation means reducing the gap between the posterior and variational distributions. But since we don't know the true posterior, we instead increase the ELBO (Evidence Lower Bound), which in turn causes the objective to decrease.

This approach is sometimes called the sandwich method.

Since we can't compute the KL divergence directly, variational inference trains by maximizing the ELBO.

### ELBO
![](/assets/images/Generative model - 2/cacd1361-d2a5-4c38-b8c4-5ab06d57df5a-image.png)
ELBO can be decomposed as shown above, and this is computable.

- Reconstruction Term: the reconstruction loss term of the auto-encoder
- Prior Fitting Term: Latent Prior Term

## Summary
The ultimate goal of Variational Inference is: given input X, find a latent space Z that represents X well.
But we don't know the posterior distribution $p_{\theta}(z|x)$. So we try to approximate the posterior using the variational distribution (or encoder).

Since we don't know the posterior, we can't directly compute the KL divergence between the estimate and the true value. So we use variational inference to maximize the ELBO, which indirectly reduces the KL divergence.

ELBO splits into a Reconstruction term and a Prior fitting term.

Reconstruction term
- Send input X through the encoder to the latent space.
- The reconstruction loss when decoding back is what this term minimizes.

Prior fitting term
- Suppose input X has been mapped to the latent space.
- This term measures how much the distribution of the mapped data differs from the latent space's prior distribution.

Therefore, it's a generative model, and specifically an implicit model rather than an explicit one.

## Variational Auto-Encoder (VAE)
Given input X, it goes to the latent space to find something, which is then used for reconstruction.

To be a generative model, you sample z from the prior distribution of the latent space and pass it through the decoder -- the output is the generation result.

But a plain auto-encoder doesn't do this. Input just goes to the latent space and comes back as output. So strictly speaking, an auto-encoder is not a generative model.

VAE characteristics:
- It's an intractable model.
  - Computing the likelihood is difficult.
  - It's an implicit model.
- The prior fitting term is very hard to compute.
  - Isotropic Gaussian is used so that differentiation yields tractable values.
  - ![](/images/283aa5c3-7d10-44b3-997a-4557cb4960be-image.png)

## Adversarial Auto-Encoder (AAE)
VAE's limitation is that it's hard to use anything other than Gaussian for the prior fitting term. But in many cases, you might not want to use Gaussian as the prior distribution.

![](/assets/images/Generative model - 2/7ffffc51-6fe7-43c9-9bc5-732d7bd8f99c-image.png)

AAE addresses this by using a GAN to match the latent distribution. In other words, it replaces VAE's prior fitting term with a GAN.

As long as you have some distribution in the latent space that you can sample from, you can use it for prior fitting.
e.g., uniform distribution, or even complex distributions.

AAE often outperforms VAE, though not always.

A 2018 paper on wasserstein autoencoders mathematically proved that AAE is equivalent to minimizing the wasserstein distance in the latent space. So AAE can be considered a type of wasserstein autoencoder.

## Generative Adversarial Network (GAN)
![](/assets/images/Generative model - 2/82bba9f4-c2e2-4470-821a-449a286f669c-image.png)

Imagine the generator makes counterfeit money and the discriminator tries to detect it.

The discriminator learns to better distinguish counterfeits using its own knowledge and the generator's output. If the discriminator were fixed, neither would learn well -- the fact that both learn is a major advantage.

The generator learns to better fool the discriminator.

GAN's goal is to improve the generator's performance. It's an implicit model.

## VAE vs GAN
![](/assets/images/Generative model - 2/1afdb9a4-0def-4958-a98d-3cf508ea0a71-image.png)
VAE
- Training
  - Pass input x through encoder to get latent vector z.
  - Pass through decoder back to the x domain.
- Generation
  - Sample z from p(z).
  - Pass z through decoder to generate the desired result.

GAN
- Input latent distribution z.
- z passes through G to produce a fake.
- Discriminator learns a classifier to distinguish real from fake.
- Generator learns to make the discriminator output true.
- Discriminator re-learns to better distinguish real from fake.

## GAN Objective
A two player minimax game between generator and discriminator.

### Discriminator
Looking at the GAN formula from the discriminator's perspective:
![](/assets/images/Generative model - 2/1e608f4e-3813-45df-893b-8407adc25632-image.png)

The optimal discriminator is:
![](/assets/images/Generative model - 2/35117cdb-1d73-4ee2-84a1-9c02c1bece1c-image.png)
This is the optimal form when the generator is fixed. High values indicate true, low values indicate false.

### Generator

![](/assets/images/Generative model - 2/9f376be0-376a-4985-87c9-7befee5bd62a-image.png)
Substituting the optimal discriminator into the GAN formula written for the generator:

This yields the Jensen-Shannon Divergence (JSD):
![](/assets/images/Generative model - 2/bf78062d-73b8-417b-99a6-c3b30c43eb1c-image.png)

So the distance between real data and generator-produced data is measured using JSD.

However, this only holds when the optimal discriminator is guaranteed. Theoretically correct, but hard to use in practice.

## DCGAN
The original GAN used an MLP. DCGAN adapts it for the image domain.
![](/assets/images/Generative model - 2/577497c3-7219-4bd1-a83e-addb75e5e0ac-image.png)

The encoder uses deconvolution, and the discriminator uses convolution.

No algorithmic improvements, but various tricks were applied -- changing error types, hyperparameter tuning, etc.

## Info-GAN
![](/assets/images/Generative model - 2/4e31bc73-8b5c-434e-ad2c-e984646651f9-image.png)
When inputting z, a one-hot vector c representing the class is also provided. This lets the GAN focus on a specific mode during generation using the c vector.

This counteracts the tendency to learn multi-modal distributions by anchoring via the c vector.

## Text2Image
![](/assets/images/Generative model - 2/50bd34dc-60be-46bb-b678-1b968825daaf-image.png)

Given a sentence, it generates an image. OpenAI's DALL-E research reportedly started from this paper.

## Puzzle-GAN
![](/assets/images/Generative model - 2/1aedd9ee-9e26-451c-a3ea-f9321b015274-image.png)

The professor co-authored this paper. Given sub-patches of an image, it reconstructs the full image.

## CycleGAN
![](/assets/images/Generative model - 2/78622e5e-5b90-4303-8564-014e2e9aa7cb-image.png)

A model that transfers domains between images -- for example, converting a zebra to a horse.

### Cycle-consistency loss
![](/assets/images/Generative model - 2/91a7f1a2-d62e-4882-8b15-9c7f290b7440-image.png)

Typically, domain transfer requires paired images -- e.g., a zebra and horse photo taken at the same location.

CycleGAN just does it. Feed it a bunch of horse photos and zebra photos and it figures out the mapping on its own.

## Star-GAN
![](/assets/images/Generative model - 2/ac3adf3e-9fad-497f-95ca-97bbe5b3cf82-image.png)

Written by a Korean student. Rather than simple domain transfer, it allows controllable domain changes on images. Heavily cited.

## Progressive-GAN
![](/assets/images/Generative model - 2/c8163a52-6c4a-4b71-81fd-dff3545ba04d-image.png)

Instead of training on high-resolution images from the start, it progressively increases from 4x4 up to 1024x1024. This progressive approach contributed significantly to performance.

# Summary
![](/assets/images/Generative model - 2/d795046d-704b-49cc-bfe0-7f46d51ee8d1-image.png)

This graph shows the number of GAN papers. Around 500 in 2018 alone, so knowing every GAN is impossible. Looking at OpenAI's DALL-E, the professor suggested that using transformers might end up being better than using GANs.

What matters is to keep learning.
