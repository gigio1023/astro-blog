---
title: "NVIDIA Driver"
description: "Troubleshooting NVIDIA driver installation issues on Ubuntu, resolved by following the official NVIDIA documentation."
date: "2021-10-06T21:59:12.874Z"
tags: ["dev-tools"]
lang: en
translationOf: "nvidia-driver"
draft: false
---

I've been using two servers -- one from BoostCamp and one from AIHub -- and the NVIDIA driver sometimes fails to be detected.

Usually removing via apt and reinstalling fixes it, but sometimes it doesn't. This was especially common on Ubuntu 16.04. None of the solutions I found by googling for driver installation on 16.04 worked.

Checked the NVIDIA docs and it was resolved.
>https://docs.nvidia.com/datacenter/tesla/tesla-installation-notes/index.html