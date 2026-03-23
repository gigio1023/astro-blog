---
title: "Python 3 Containers"
description: "Overview of Python collections containers: UserDict, OrderedDict, and deque with practical usage notes."
lang: en
translationOf: "python3-container"
date: "2021-10-27T00:53:46.790Z"
tags: ["python"]
draft: false
---

I organized some Python built-in containers that show up in HuggingFace and coding tests.

# collections
## UserDict
[Docs](https://docs.python.org/3/library/collections.html#collections.UserDict)
Identical to a regular Python dictionary. It's a simple wrapper made to be easier to subclass or handle as an object.

[HuggingFace BatchEncoding Github](https://github.com/huggingface/transformers/blob/8ddbfe975264a94f124684a138a2a5ca89a2bd0d/src/transformers/tokenization_utils_base.py#L163)
When you call HuggingFace's tokenizer it returns a BatchEncoding type. I came across code that called pop on BatchEncoding like below and didn't understand it at first. Turns out BatchEncoding is a subclass of UserDict, so it just uses the same pop behavior as a Python dictionary.

```py
sample_mapping = tokenized_examples.pop("overflow_to_sample_mapping")
```

## OrderedDict
[ref blog](https://www.daleseo.com/python-collections-ordered-dict/)
Before Python 3.6, dictionary ordering wasn't guaranteed, so OrderedDict was necessary. From 3.6 onward, the standard dictionary also preserves insertion order during iteration.

The difference remains in comparison: a regular dictionary ignores order when comparing, while OrderedDict considers it.

## deque
Double-ended queue.
The [ref blog](https://leonkong.cc/posts/python-deque.html) has a better summary than the official docs.
- deque.append(item): Insert item at the right end of the deque.
- deque.appendleft(item): Insert item at the left end of the deque.
- deque.pop(): Remove and return the rightmost element.
- deque.popleft(): Remove and return the leftmost element.
- deque.extend(array): Iterate over the given array and append each element to the right.
- deque.extendleft(array): Iterate over the given array and append each element to the left.
- deque.remove(item): Find and remove item from the deque.
- deque.rotate(num): Rotate the deque by num steps (positive = right, negative = left).
