---
title: "Convoluzione - Pratica"
description: "Implementazione pratica di CNN in PyTorch: add_module, loop di training e batch normalization."
date: "2021-08-12T05:33:51.298Z"
tags: ["computer-vision", "dl"]
draft: false
lang: it
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

In TF si può impostare il nome di un layer al momento della creazione, ma in PyTorch segue il nome della variabile.

Tuttavia, se si definisce nn.Sequential() e si chiama add_module() su quell'oggetto, si possono impostare liberamente i nomi dei layer come in TF.

## Training delle CNN
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

Che sia MLP o altro, se non c'è un processo speciale coinvolto, la procedura di training è identica. Se serve personalizzazione, l'input e l'output della rete possono essere modificati liberamente, come ho fatto nel mio progetto di laurea.

Quello che cambia alla fine è il tipo di rete.

### nn.Module.train()
Se ci sono layer come la batch normalization che vengono usati solo durante il training e non durante la valutazione, assicurarsi di chiamare train() prima del training.
