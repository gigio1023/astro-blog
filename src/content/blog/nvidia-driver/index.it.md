---
title: "Driver NVIDIA"
description: "Risoluzione dei problemi di installazione del driver NVIDIA su Ubuntu, risolta seguendo la documentazione ufficiale NVIDIA."
date: "2021-10-06T21:59:12.874Z"
tags: ["dev-tools"]
lang: it
translationOf: "nvidia-driver"
draft: false
---

Sto usando due server -- uno da BoostCamp e uno da AIHub -- e a volte il driver NVIDIA non viene rilevato.

Di solito basta rimuovere con apt e reinstallare, ma a volte non funziona. Questo succedeva spesso soprattutto su Ubuntu 16.04. Nessuna delle soluzioni trovate cercando su Google per l'installazione del driver su 16.04 funzionava.

Ho controllato la documentazione NVIDIA e si e risolto.
>https://docs.nvidia.com/datacenter/tesla/tesla-installation-notes/index.html