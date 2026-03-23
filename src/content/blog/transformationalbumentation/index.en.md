---
title: "Transformation (Albumentations)"
description: "Using the Albumentations library for image augmentation in PyTorch, with example pipelines for training and TTA."
date: "2021-09-06T10:17:15.770Z"
tags: ["computer-vision", "pytorch", "ai-competition"]
draft: false
lang: en
translationOf: "transformationalbumentation"
---

# Albumentations
I used it because it's better than PyTorch's built-in transformations in both speed and variety.

# Transformation setup
Suppose you used the following transformation for training:

```python
transformation = A.Compose(
    [
        A.Resize(224, 224),
        A.CenterCrop(100, 100),
        A.HorizontalFlip(p=0.5),
        A.OneOf(
            [
                A.MotionBlur(p=0.2),
                A.MedianBlur(blur_limit=3, p=0.2),
                A.Blur(blur_limit=3, p=0.2),
            ],
            p=1,
        ),
        A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225], ),
        albumentations.pytorch.transforms.ToTensorV2(),
    ]
)
```

Then during inference, you need the same resizing, cropping, and normalization:
```python
transformation = A.Compose(
    [
        A.Resize(224, 224),
        A.CenterCrop(100, 100),
        A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225], ),
        albumentations.pytorch.transforms.ToTensorV2(),
    ]
)
```

## When to apply transformations
I passed the transformation as a parameter when creating the dataset and applied it in `__getitem__`.

# Transformations I used
## Training
```python
transformation = A.Compose(
    [
        A.Resize(224, 224),
        A.HorizontalFlip(p=0.5),
        A.OneOf([A.GaussNoise()], p=0.4),
        A.OneOf(
            [
                A.MotionBlur(p=0.2),
                A.MedianBlur(blur_limit=3, p=0.2),
                A.Blur(blur_limit=3, p=0.2),
            ],
            p=1,
        ),
        A.OneOf(
            [
                A.HueSaturationValue(p=0.5),
                A.RGBShift(p=0.5),
                A.ChannelShuffle(p=0.5),
            ],
            p=1,
        ),
        A.ShiftScaleRotate(
            shift_limit=0.2,
            scale_limit=0.2,
            rotate_limit=10,
            border_mode=0,
            p=0.4,
        ),
        A.CoarseDropout(p=0.5),
        A.ColorJitter(p=0.3),
        A.RandomBrightnessContrast(p=0.7),
        # A.Rotate(limit=(-10, 10), p=0.4),
        A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225], ),
        albumentations.pytorch.transforms.ToTensorV2(),
    ]
)
```

## TTA
```python
   A.GaussNoise(var_limit=(20.0, 60.0),p=1),
    A.MedianBlur(blur_limit=9, p=1),
    A.Blur(blur_limit=9, p=1),
    A.HueSaturationValue(hue_shift_limit=40, sat_shift_limit=40, val_shift_limit=40,p=1),
    A.RGBShift(r_shift_limit=50, g_shift_limit=50, b_shift_limit=50,p=1),
    A.ChannelDropout(p=1),
    A.ChannelShuffle(p=1),
    A.CoarseDropout(p=1),
    A.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.5, hue=0.5,p=1),
    A.RandomBrightnessContrast(brightness_limit=0.5, contrast_limit=0.5,p=1),
    A.ShiftScaleRotate(
            shift_limit=0.2,
            scale_limit=0.2,
            rotate_limit=10,
            border_mode=0,
            p=1,
    ),
 ```
