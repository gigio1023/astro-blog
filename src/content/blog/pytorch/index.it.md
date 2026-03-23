---
title: "PyTorch"
description: "Consigli pratici su PyTorch: inizializzazione dei parametri, model.eval(), view dei tensor e ciclo di addestramento."
lang: it
translationOf: "pytorch"
date: "2021-01-01"
tags: ["dl", "pytorch"]
draft: false
---

## init parameters
PyTorch gestisce l'inizializzazione automaticamente, ma ci sono casi in cui serve inizializzare i parametri manualmente. L'approccio base è il seguente:

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
        self.init_param() # inizializza i parametri

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
Un grande vantaggio di PyTorch è l'assenza delle sessioni. Anche TensorFlow ha eliminato le sessioni dalla v2. Senza sessioni si può eseguire un forward pass direttamente come mostrato sotto.

## forward
Non è strettamente necessario chiamare forward in modo esplicito -- PyTorch lo gestisce automaticamente. Però essere espliciti rende il codice più leggibile.

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
Avevo una comprensione vaga di questa funzione, quindi ecco un riepilogo.

Layer come BatchNormalization e Dropout sono pensati solo per il training e non dovrebbero essere attivi durante la predizione. Per disattivarli, considerare la chiamata a model.eval() prima della predizione come una pratica standard.

## view
Una funzione che cambia la forma di un tensor mantenendo il numero totale di elementi. Equivale a reshape di numpy. Passare -1 per una dimensione lascia che PyTorch calcoli automaticamente la dimensione.
```python
batch_in.view(-1, 28*28)
```

## item
Tutti i valori sono gestiti come oggetti tensor. Per convertirne uno in un semplice scalare (ad esempio un float), si usa item.
```python
n_correct += (y_pred==y_trgt).sum().item()
```

## train
```python
print ("Start training.")
M.init_param() # inizializza i parametri
M.train()
EPOCHS,print_every = 10,1
for epoch in range(EPOCHS):
    loss_val_sum = 0
    for batch_in,batch_out in train_iter:
        # Forward path
        y_pred = M.forward(batch_in.view(-1, 28*28).to(device))
        loss_out = loss(y_pred,batch_out.to(device))
        # Update
        optm.zero_grad()      # azzera il gradiente
        loss_out.backward()      # backpropagation
        optm.step()      # aggiornamento dell'ottimizzatore
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
In precedenza abbiamo definito l'ottimizzatore così, specificando quali parametri addestrare:
```python
optm = optim.Adam(M.parameters(),lr=1e-3)
```
zero_grad() azzera i gradienti di quei parametri.

### loss()
È la funzione di loss definita prima come cross entropy. Passando l'output del modello y_pred e le label di training batch_out restituisce un oggetto che rappresenta la loss.

### backward()
Esegue la backpropagation per ogni peso.

### step()
Aggiorna i parametri usando il learning rate dell'ottimizzatore e gli altri iperparametri.
