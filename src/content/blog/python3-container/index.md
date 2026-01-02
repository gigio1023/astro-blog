---
title: "python3 container"
description: "."
date: "2021-10-27T00:53:46.790Z"
tags: ["python"]
draft: false
---

huggingface나 코테에서 활용되는 python built-in container들을 정리했다.
# collections
## UserDict
[Docs](https://docs.python.org/3/library/collections.html#collections.UserDict)
일반적인 python의 dictionary와 동일하다. 상속받거나 객체로써 다루기 쉽도록 만든 단순한 wrapper다. 

[HuggingFace BatchEncoding Github](https://github.com/huggingface/transformers/blob/8ddbfe975264a94f124684a138a2a5ca89a2bd0d/src/transformers/tokenization_utils_base.py#L163)
HuggingFace의 tokenizer를 호출하면 BatchEncoding type으로 return해준다. BatchEncoding을 아래와 같이 pop하는 코드들이 있었는데 이해가 가지 않았다. 찾아보니 BatchEncoding은 UserDict의 subclass였다. 즉, python dictionary에서 쓰는 pop의 기능을 그대로 사용한 것이다.

```py
sample_mapping = tokenized_examples.pop("overflow_to_sample_mapping")
```

## OrderedDict
[ref blog](https://www.daleseo.com/python-collections-ordered-dict/)
python 3.6이전에는 Dictionary의 순서가 보장되지 않아서 OrderedDict가 필요했다. 3.6 이후부터는 기본 Dictionary도 iteration에서의 순서성이 보장된다. 

비교 연산 시에 Dictionary는 순서성을 고려하지 않고, OrderedDict는 고려한다.

## deque
양방향 큐(Double-ended queue).
공식 docs보다 [ref blog](https://leonkong.cc/posts/python-deque.html)에 정리가 더 잘 돼있다.
- deque.append(item): item을 데크의 오른쪽 끝에 삽입한다.
- deque.appendleft(item): item을 데크의 왼쪽 끝에 삽입한다.
- deque.pop(): 데크의 오른쪽 끝 엘리먼트를 가져오는 동시에 데크에서 삭제한다.
- deque.popleft(): 데크의 왼쪽 끝 엘리먼트를 가져오는 동시에 데크에서 삭제한다.
- deque.extend(array): 주어진 배열(array)을 순환하면서 데크의 오른쪽에 추가한다.
- deque.extendleft(array): 주어진 배열(array)을 순환하면서 데크의 왼쪽에 추가한다.
- deque.remove(item): item을 데크에서 찾아 삭제한다.
- deque.rotate(num): 데크를 num만큼 회전한다(양수면 오른쪽, 음수면 왼쪽).