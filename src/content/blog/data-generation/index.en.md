---
title: "Some Tips"
description: "Tips on efficient data feeding, transform ordering for performance, and using Albumentations for image augmentation."
date: "2021-08-24T02:35:24.900Z"
tags: ["pytorch", "ai-competition"]
draft: false
lang: en
translationOf: "data-generation"
---

# Data Generation

## Data feeding
Let's try to do data feeding well.

![](/assets/images/Data Generation/ba02679f-71ab-49da-800f-2b178061cab7-image.png)

Suppose the code looks like the above. Both approaches are inefficient.
The first one: the generator is slower than the model, so the model cannot perform at its best.
The second one: the model is slower than the generator, so the generator cannot perform at its best.

That said, model performance usually means GPU performance. If you had to pick one situation, choosing the second direction that maximizes model performance is probably better. Of course, this varies by situation, so choose accordingly.

### transforms
```python
ToTensor()
RandomRotation([-8, +8])
Resize((1024, 1024))
```

Performance of these 3 transforms depends on ordering. If the image is smaller than 1024, doing resize last gives the best performance. Obviously -- running tensor conversion and rotation on 100x100 is faster than on 1024x1024.

#### albumentations
Said to be faster than PyTorch's transforms and has more features. Decided to try it while learning new things.
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

- Most features are self-explanatory from the method names.
- p = probability
- ShiftScaleRotate rotates the entire image, and also handles the empty space from rotation.
- In Normalize, you can directly specify RGB mean and std.
- OneOf: selects one among the components of OneOf. You can specify p for this as well.
