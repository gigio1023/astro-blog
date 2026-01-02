---
title: "nvidia-driver"
description: "."
date: "2021-10-06T21:59:12.874Z"
tags: ["linux"]
draft: false
---

부스트캠프에서 받은 서버와 aihub에서 받은 서버 2개를 사용 중인데, 종종 nvidia driver가 안 잡히는 문제가 있다. 

보통은 apt remove 후 재설치하면 되는데 안되는 경우가 있어서 난감했다. 특히 Ubuntu 16.04에서 이런 문제가 빈번했다. 16.04에서 nvidia-driver 설치를 하기 위해 구글링했던 내용들이 전부 먹히지 않았다.

nvidia docs보니 해결됐다.
>https://docs.nvidia.com/datacenter/tesla/tesla-installation-notes/index.html