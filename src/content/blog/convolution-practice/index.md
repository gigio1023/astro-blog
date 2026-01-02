---
title: "Convolution 실습"
description: "."
date: "2021-08-12T05:33:51.298Z"
tags: ["CNN", "DL"]
draft: false
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

tf에서는 layer를 만들 때부터 name을 따로 설정할 수 있는데, pytorch는 변수 이름을 따라간다.

다만, 위 처럼 nn.Sequential()을 정의하고 해당 객체의 add_module()을 호출하면 마치 tf처럼 layer의 name을 자유롭게 설정할 수 있다.

## CNN의 train
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

mlp든 뭐든 특별한 과정이 들어가는게 아니면 동일한 과정의 train이다. 커스텀이 필요하다면 졸프에서 했던 것과 같이, network의 input과 ouput을 자유롭게 수정도 가능하다.

결국 달라지는 것은 network의 종류이다.

### nn.Module.train()
batch normalization과 같이 train에서만 사용되고 eval에서는 사용되지 않는 layer가 있다면, 학습 전에 반드시 train()을 호출하자.