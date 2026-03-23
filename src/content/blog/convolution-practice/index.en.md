---
title: "Convolution Practice"
description: "Practical CNN implementation in PyTorch: add_module, training loops, and batch normalization."
date: "2021-08-12T05:33:51.298Z"
tags: ["computer-vision", "dl"]
draft: false
lang: en
translationOf: "convolution-practice"
---

## add_module()
```python

# Concatenate all layers
self.net = nn.Sequential()
    for l_idx,layer in enumerate(self.layers):
        layer_name = "%s_%02d"%(type(layer).__name__.lower(),l_idx)
        self.net.add_module(layer_name,layer)
    self.init_param() # initialize parameters
```

In TF, you can set a layer's name when creating it, but in PyTorch it follows the variable name.

However, if you define nn.Sequential() and call add_module() on that object, you can freely set layer names like in TF.

## CNN training
```python

print ("Start training.")
C.init_param() # initialize parameters
C.train() # to train mode
EPOCHS,print_every = 10,1
for epoch in range(EPOCHS):
    loss_val_sum = 0
    for batch_in,batch_out in train_iter:
        # Forward path
        y_pred = C.forward(batch_in.view(-1,1,28,28).to(device))
        loss_out = loss(y_pred,batch_out.to(device))
        # Update
        loss.zero_grad()      # reset gradient
        loss_out.backward()      # backpropagate
        optim.step()      # optimizer update
        loss_val_sum += loss_out
    loss_val_avg = loss_val_sum/len(train_iter)
    # Print
    if ((epoch%print_every)==0) or (epoch==(EPOCHS-1)):
        train_accr = func_eval(C,train_iter,device)
        test_accr = func_eval(C,test_iter,device)
        print ("epoch:[%d] loss:[%.3f] train_accr:[%.3f] test_accr:[%.3f]."%
               (epoch,loss_val_avg,train_accr,test_accr))
print ("Done")

```

Whether it is MLP or anything else, if no special process is involved, the training procedure is identical. If customization is needed, the network's input and output can be freely modified, just like I did in my graduation project.

What changes in the end is the type of network.

### nn.Module.train()
If there are layers like batch normalization that are used only during training and not during evaluation, make sure to call train() before training.
