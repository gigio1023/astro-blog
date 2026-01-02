---
title: "Split VRAM of GPU on Kubernetes"
description: "."
date: "2022-04-08T00:00:00.000Z"
tags: ["mlops"]
draft: false
---

# Overview
남는 VRAM 자원에 대한 자유로운 할당은 Kubernetes에서는 GPU 단위로만 가능할까.  
잉여 자원을 다른 작업에 어떻게 할당 가능한지에 대한 task에 대해 정리했다.

# Examples
- GPU spec: 32GB
- Workstation spec: GPU 2개
- 상시 Inference spec: GPU 1개, VRAM 12GB
- 여유 VRAM이 32GB, 20GB인 GPU가 발생.  
잉여 자원을 다른 task에 할당해서 GPU를 최대한으로 활용하고 싶다.

# HOWTO
## Replica
pod 수를 제한하고 미리 요구 자원을 계산이 된다면 replica를 통해서 전체 자원 할당량 제한은 가능.  e.g., 최소 CPU 1개, RAM 2GB, 최대 CPU 2개 RAM 4GB의 pod이 최대 5개만 생성 가능

단, CPU와 RAM에 대해서만 가능하고, GPU에 대해서는 불가능하다.

## Extended Resources
ref: [Apply Extended Resources](https://blog.ggaman.com/1025)  
Kubernetes의 Extended Resources를 사용해 pod당 할당될 수 있는 VRAM을 조절해서 train, serving pod에 대한 자원을 조절할 수 있다. 

하지만, runtime 도중에 해당 컨테이너가 전체 vram을 다 잡아먹어도 알 수가 없다. 해당 컨테이너를 감시하는 또 다른 컨테이너를 생성하면 되지만 불필요한 자원 점유가 늘어난다.

## GPU Virtualization
본래는 GPU Virtualization을 VMWare으로 실현해 하나의 GPU에 대한 자원 할당을 한다. 하지만 해당 가상화를 data center에 들어가는 gpu급에서만 지원하고 VMWare도 유료다..

# 결론
Kubernetes에서 VRAM 쪼개기를 지원하지 않는다. 따라서 Extended Reousrces를 써서 POD 생성 시점에서 VRAM을 쪼개서 할당 가능하다. 하지만 이것이 해당 POD의 VRAM 할당량을 조절해주는 것은 아니다.