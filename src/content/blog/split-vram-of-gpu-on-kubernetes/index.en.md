---
title: "Split VRAM of GPU on Kubernetes"
description: "Exploring options for splitting GPU VRAM across pods in Kubernetes, including replicas, extended resources, and GPU virtualization."
date: "2022-04-08T00:00:00.000Z"
tags: ["mlops"]
draft: false
lang: en
translationOf: "split-vram-of-gpu-on-kubernetes"
---

# Overview
Can leftover VRAM only be allocated at the GPU level in Kubernetes? I looked into how surplus resources could be assigned to other workloads.

# Examples
- GPU spec: 32GB
- Workstation spec: 2 GPUs
- Persistent inference spec: 1 GPU, 12GB VRAM
- This leaves GPUs with 32GB and 20GB of spare VRAM.
I wanted to allocate this surplus to other tasks and maximize GPU utilization.

# HOWTO
## Replica
If you can cap the number of pods and pre-calculate resource requirements, replicas let you limit overall resource allocation. e.g., min CPU 1, RAM 2GB; max CPU 2, RAM 4GB; up to 5 pods.

However, this only works for CPU and RAM — not for GPU.

## Extended Resources
ref: [Apply Extended Resources](https://blog.ggaman.com/1025)
Kubernetes Extended Resources let you control how much VRAM each pod gets, so you can tune resources for training vs. serving pods.

The catch: if a container gobbles up all VRAM at runtime, there's no way to detect it. You could spin up a sidecar container to monitor it, but that just adds more unnecessary resource usage.

## GPU Virtualization
GPU virtualization is traditionally done through VMware, enabling fine-grained resource allocation on a single GPU. But virtualization support is limited to data-center-grade GPUs, and VMware is not free.

# Conclusion
Kubernetes doesn't natively support VRAM splitting. Extended Resources can allocate VRAM at pod creation time, but this doesn't actually constrain the pod's runtime VRAM usage.
