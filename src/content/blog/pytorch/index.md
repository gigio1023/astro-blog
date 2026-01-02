---
title: "pytorch"
description: "."
date: "2021-01-01"
tags: ["DL", "PyTorch"]
draft: false
---

## init parameters
pytorch에서 자동으로 해주기는한다.
하지만 수동으로 parameter를 원하는대로 초기화해야하는 경우가 분명 발생한다. 이를 수동으로 해결하는 방법은 기본적으로 아래와 같다.

```python
class MultiLayerPerceptronClass(nn.Module):
    """
        Multilayer Perceptron (MLP) Class
    """
    def __init__(self,name='mlp',xdim=784,hdim=256,ydim=10):
        super(MultiLayerPerceptronClass,self).__init__()
        self.name = name
        self.xdim = xdim
        self.hdim = hdim
        self.ydim = ydim
        self.lin_1 = nn.Linear(
            # FILL IN HERE
        )
        self.lin_2 = nn.Linear(
            # FILL IN HERE
        )
        self.init_param() # initialize parameters
        
    def init_param(self):
        nn.init.kaiming_normal_(self.lin_1.weight)
        nn.init.zeros_(self.lin_1.bias)
        nn.init.kaiming_normal_(self.lin_2.weight)
        nn.init.zeros_(self.lin_2.bias)

    def forward(self,x):
        net = x
        net = self.lin_1(net)
        net = F.relu(net)
        net = self.lin_2(net)
        return net
        
M = MultiLayerPerceptronClass(name='mlp',xdim=784,hdim=256,ydim=10).to(device)
loss = nn.CrossEntropyLoss()
optm = optim.Adam(M.parameters(),lr=1e-3)
print ("Done.")
```

## session
pytorch의 큰 장점은 session이 없다는 것이다. 물론 tf도 ver 2부터는 session이 없기는하다.
session이 없어서 아래처럼 바로 forward를 할 수 있다.
## forward
본래 forward를 쓰지 않아도 아래와 같이 알아서 forward를 해준다.
하지만 명시하는 것이 읽기에 편하니, 써보자.

```python
x_numpy = np.random.rand(2,784)
x_torch = torch.from_numpy(x_numpy).float().to(device)
y_torch = M.forward(x_torch) # forward path
# y_torch = M(x_torch) # forward path
y_numpy = y_torch.detach().cpu().numpy() # torch tensor to numpy array
print ("x_numpy:\n",x_numpy)
print ("x_torch:\n",x_torch)
print ("y_torch:\n",y_torch)
print ("y_numpy:\n",y_numpy)
```

## model.eval()
애매하게 알고 썻던 내용인데 정리해본다.

BatchNormalization이나 DropOut 같이 학습 시에만 사용되고 predict 단계에서는 사용하면 안되는 것들이 있다. 이런 부분들을 막기 위해서 predict시에는 반드시 model.eval() 사용하는 것을 관례처럼 여기자.

## view
원소의 수를 유지하면서 tensor의 차원을 바꿔주는 함수. numpy의 reshape이다.
차원에 -1을 넣어주면 pytorch가 알아서 설정하도록 하는 것이다.
```python
batch_in.view(-1, 28*28)
```

## item
tensor는 모두 tensor라는 객체로써 관리된다. 이를 실수와 같은 형태로 바꾸고 싶다면 item을 사용한다.
```python
n_correct += (y_pred==y_trgt).sum().item()
```

## train
```python
print ("Start training.")
M.init_param() # initialize parameters
M.train()
EPOCHS,print_every = 10,1
for epoch in range(EPOCHS):
    loss_val_sum = 0
    for batch_in,batch_out in train_iter:
        # Forward path
        y_pred = M.forward(batch_in.view(-1, 28*28).to(device))
        loss_out = loss(y_pred,batch_out.to(device))
        # Update
        optm.zero_grad()      # reset gradient 
        loss_out.backward()      # backpropagate
        optm.step()      # optimizer update
        loss_val_sum += loss_out
    loss_val_avg = loss_val_sum/len(train_iter)
    # Print
    if ((epoch%print_every)==0) or (epoch==(EPOCHS-1)):
        train_accr = func_eval(M,train_iter,device)
        test_accr = func_eval(M,test_iter,device)
        print ("epoch:[%d] loss:[%.3f] train_accr:[%.3f] test_accr:[%.3f]."%
               (epoch,loss_val_avg,train_accr,test_accr))
print ("Done")  
```
---
### optm.zero_grad()
앞서 optim을 아래와 같이 정의하여 어떠한 parameter를 학습할지 정의했다.
```python
optm = optim.Adam(M.parameters(),lr=1e-3)
```
zero_grad()를 통해 해당 paramter의 gradient를 0으로 초기화하는 함수이다.

### loss()
앞서 cross entropy로 정의한 loss function을 의미한다. loss에 매개변수로 모델의 출력인 y_pred와 학습 데이터인 batch_out을 넘겨주면 이에 대한 weight 객체를 반환한다.

### backward()
각각의 weight에 대한 backward propagation을 수행한다.

### step()
앞서 정의한 optimizer의 learning rate와 여러 다른 hyper parameter를 통해, 인자로 넘겨받았던 parameter를 업데이트한다.