---
title: "pathlib"
description: "."
date: "2021-09-07T01:10:10.740Z"
tags: ["python"]
draft: false
---

# pathlib
ref: https://brownbears.tistory.com/415

그 동안 os.path.join이나 os.sep을 사용해서 일일히 경로 연산을 했다. 문제는 없지만 매우 귀찮고 번거럽고 코드도 더러워지면서 관리도 힘들다. 다행히도 python built in으로 pathlib라는 것을 제공해준다.

요점은 path를 객체처럼 관리하자는 것이다. 또한 경로 연산에서 연산자를 재정의할 수 있어서 '/'를 나누기가 아니라 경로 구분자로 즉시 사용할 수 있다.