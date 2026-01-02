---
title: "Some tips"
description: "."
date: "2021-08-24T02:35:24.900Z"
tags: ["PyTorch", "ai competition"]
draft: false
---

# Data Generation

## Data feeding
Data feeding을 잘해보자. 

![](/assets/images/Data Generation/ba02679f-71ab-49da-800f-2b178061cab7-image.png)

가령, 위처럼 코딩해놨다고 하자. 두 코드 모두 비효율적이다.
첫번째는 generator의 속도가 model보다 느리기 때문에 model이 제 성능을 내지 못한다.
두번째는 model의 속도가 generator보다 느리기 때문에 generator가 제 성능을 내지 못한다.

다만, 보통 model의 성능이라하면 gpu의 성능을 의미하게 된다. 즉, 둘 중 한 가지 상황을 선택해야한다면 model의 성능을 극대화시키는 두번째 방향을 선택하는 것이 좋겠다. 물론 이 또한 상황마다 모두 다르기 때문에 적절하게 선택하자.

### transforms
```python
ToTensor()
RandomRotation([-8, +8])
Resize((1024, 1024))
```

위 3개 transforms에 대한 성능은 순서에 의존된다. 만약 이미지의 크기가 1024보다 작다면 resize를 마지막에 하는 것이 가장 성능이 좋을 것이다. 당연하다. 100x100에 대해서 tensor로 변환하고 rotation 변환을 하는 것이 1024x1024 이미지에 대한 연산보다 빠를 것이다. 

#### albumentations
pytorch의 transpose보다 빠르고 기능이 많다고 한다. 새로운거 배우는 김에 써보기로 했다. 
```python
import albumentations as A
import albumentations.pytorch

transformation = A.Compose(
    [
        A.Resize(224, 224),
        A.HorizontalFlip(p=0.5),
        A.OneOf([A.GaussNoise()], p=0.2),
        A.OneOf(
            [
                A.MotionBlur(p=0.2),
                A.MedianBlur(blur_limit=3, p=0.1),
                A.Blur(blur_limit=3, p=0.1),
            ],
            p=0.2,
        ),
        A.OneOf(
            [
                A.CLAHE(clip_limit=2),
                A.Sharpen(),
                A.Emboss(),
                A.HueSaturationValue(),
                A.RGBShift(),
                A.ChannelShuffle(),
            ],
            p=0.3,
        ),
        A.ShiftScaleRotate(
            shift_limit=0.2,
            scale_limit=0.2,
            rotate_limit=10,
            border_mode=0,
            p=0.5,
        ),
        A.RandomBrightnessContrast(p=0.2),
        A.Rotate(limit=(-30, 30), p=0.2),
        A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225],),
        albumentations.pytorch.transforms.ToTensorV2(),
    ]
)
```

- 대부분의 기능들은 메서드 명 그대로이다. 
- p = probability
- ShiftScaleRoate는 image전체를 rotate하는데, 이미지에 빈 공간이 생기기 rotate도 해준다.
- Normalize에서 rgb의 mean, std를 직접 지정할 수도 있다.
- OneOf: OneOf의 구성요소 중 한가지를 선택해준다. 이것에 대해서도 p를 지정할 수 있다.