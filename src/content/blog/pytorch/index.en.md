---
title: "PyTorch"
description: "Practical PyTorch tips covering parameter initialization, model.eval(), tensor views, and the training loop."
lang: en
translationOf: "pytorch"
date: "2021-01-01"
tags: ["dl", "pytorch"]
draft: false
---

## init parameters
PyTorch handles this automatically. But there are definitely cases where you need to initialize parameters manually. The basic approach looks like this:

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
A big advantage of PyTorch is the absence of sessions. TensorFlow also dropped sessions from v2 onward. Without sessions, you can run a forward pass directly as shown below.

## forward
You don't strictly need to call forward explicitly -- PyTorch handles it automatically. But being explicit makes code easier to read.

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
I used to have a vague understanding of this, so here's a proper summary.

Layers like BatchNormalization and Dropout are meant only for training and should not be active during prediction. To disable them, treat calling model.eval() before prediction as a standard practice.

## view
A function that reshapes a tensor while keeping the total number of elements the same. It's the equivalent of numpy's reshape. Passing -1 for a dimension lets PyTorch figure out the size automatically.
```python
batch_in.view(-1, 28*28)
```

## item
All values are managed as tensor objects. If you want to convert one to a plain scalar (e.g., a float), use item.
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
Earlier we defined the optimizer as follows, specifying which parameters to train:
```python
optm = optim.Adam(M.parameters(),lr=1e-3)
```
zero_grad() resets the gradients of those parameters to zero.

### loss()
This is the loss function defined earlier as cross entropy. Passing the model output y_pred and the training labels batch_out returns a weight object representing the loss.

### backward()
Performs backpropagation for each weight.

### step()
Updates the parameters using the optimizer's learning rate and other hyperparameters.
