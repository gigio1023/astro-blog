---
title: "Transformer - Pratica"
description: "Implementazione pratica in PyTorch di Scaled Dot-Product Attention e Multi-Head Attention per il Transformer."
date: "2021-08-13T13:09:33.204Z"
tags: ["pytorch", "nlp"]
draft: false
lang: it
translationOf: "transformer-practice"
---

# SDPA
Scaled Dot-Product Attention. Il modello con una sola attention head dalla lezione sul Transformer.
![](/images/8bdd6682-92f7-4150-9b64-5a77a312e39c-image.png)

Come mostrato sopra, generare più set di Q, K, V è MHA; generarne uno solo è SDPA.

![](/assets/images/Transformer 실습/2caaf910-d820-4ce6-a286-b6497e5928e9-image.png)
```python
class ScaledDotProductAttention(nn.Module):
    """
    Struttura con una singola attention head.
    Input: vettore n-dimensionale dal risultato dell'embedding.

    Trova query, key, value ed esegue il calcolo dell'attention
    come mostrato nella formula sopra.

    Output: tensor con dimensione uguale alla dimensione del vettore value
    per n word vector.
    """
    def forward(self, Q, K, V, mask=None):
        d_K = K.size()[-1] # dimensione del key
        scores = Q.matmul(K.transpose(-2, -1)) / np.sqrt(d_K)
        if mask is not None:
            scores = scores.masked_fill(mask==0, -1e9)
        attention = F.softmax(scores,dim=-1)
        out = attention.matmul(V)
        return out,attention

# Demo run di scaled dot product attention

SPDA = ScaledDotProductAttention()
"""
n_batch: ci sono n_batch parole
d_K: dimensione del vettore key
d_V: dimensione del vettore Value
n_Q: numero di vettori Query
n_K: numero di vettori Key
n_V: numero di vettori Value
"""
n_batch, d_K, d_V = 3, 128, 256 # d_K(=d_Q) non deve essere uguale a d_V
n_Q, n_K, n_V = 30,50,50
Q = torch.rand(n_batch,n_Q,d_K)
K = torch.rand(n_batch,n_K,d_K)
V = torch.rand(n_batch,n_V,d_V)
out,attention = SPDA.forward(Q,K,V,mask=None)
def sh(x): return str(x.shape)[11:-1]
print ("SDPA: Q%s K%s V%s => out%s attention%s"%
       (sh(Q),sh(K),sh(V),sh(out),sh(attention)))
```
Come mostrato nella formula, le dimensioni di query e key sono $$\mathbb{R}^{n\times d_K}$$. Ovvero, query e key devono avere la stessa dimensione perché l'operazione funzioni.

La dimensione del value è $$\mathbb{R}^{n\times d_V}$$, ma in pratica si implementa uguale a query e key per comodità. Possono essere uguali.

## Numero di Q, K, V
### Con encoder e decoder
Guardando il codice, i vettori SPDA vengono generati come:
> n_Q $$\neq$$ ( n_K = n_V)

V e K vengono dall'encoder, mentre il decoder crea Q dal proprio input, quindi i conteggi possono differire.

Questo è il caso più generale dato che presuppone encoder-decoder.

----
_**Lo scopo di SPDA diventa chiaro qui!**_
Si vogliono codificare i vettori Query facendo riferimento ai vettori key e value.

Quindi i vettori di output di SPDA devono avere lo stesso numero dei vettori Query.

### Per la self-attention
>
n_Q = n_V = n_K

Devono essere tutti uguali.

## K.transpose(-2, -1)
I tensor PyTorch supportano il transpose in questo modo. Scambia le due dimensioni date come argomenti. Qui scambia l'ultima e la penultima dimensione.

## torch.nn.Softmax()
Non sapevo cosa significasse dim = -1, quindi ho controllato la documentazione:
>
dim (int) - A dimension along which Softmax will be computed (so every slice along dim will sum to 1).

https://stackoverflow.com/questions/49036993/pytorch-softmax-what-dimension-to-use

Calcola la softmax lungo la dimensione specificata.

![](/assets/images/Transformer 실습/4a19b3f9-5b06-497f-84dd-b90f8839e484-image.png)

La definizione di softmax è come sopra, dove $$x_j$$ di j viene specificato tramite l'opzione dim.


## Perché il codice SDPA funziona anche per MHA
L'istruttore ha detto che è grazie al "batch the multiplication." Non sono del tutto sicuro di cosa intendesse.

La mia interpretazione: dato che SDPA è implementata tramite operazioni matriciali, funziona indipendentemente da quante dimensioni abbiano Q, K, V — basta far corrispondere i conteggi delle dimensioni.


# MHA (Multi-Head Attention)
```python
class MultiHeadedAttention(nn.Module):
    def __init__(self,d_feat=128,n_head=5,actv=F.relu,USE_BIAS=True,dropout_p=0.1,device=None):
        """
        :param d_feat: dimensione delle feature
        :param n_head: numero di head
        :param actv: attivazione dopo ogni layer lineare
        :param USE_BIAS: se usare il bias
        :param dropout_p: tasso di dropout
        :device: quale device usare (es., cuda:0)
        """
        super(MultiHeadedAttention,self).__init__()
        if (d_feat%n_head) != 0:
            raise ValueError("d_feat(%d) should be divisible by b_head(%d)"%(d_feat,n_head))
        self.d_feat = d_feat
        self.n_head = n_head
        self.d_head = self.d_feat // self.n_head
        self.actv = actv
        self.USE_BIAS = USE_BIAS
        self.dropout_p = dropout_p # prob. di azzeramento

        self.lin_Q = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)
        self.lin_K = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)
        self.lin_V = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)
        self.lin_O = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)

        self.dropout = nn.Dropout(p=self.dropout_p)

    def forward(self,Q,K,V,mask=None):
        """
        :param Q: [n_batch, n_Q, d_feat]
        :param K: [n_batch, n_K, d_feat]
        :param V: [n_batch, n_V, d_feat] <= n_K e n_V devono essere uguali
        :param mask:
        """
        n_batch = Q.shape[0]
        Q_feat = self.lin_Q(Q)
        K_feat = self.lin_K(K)
        V_feat = self.lin_V(V)
        # Q_feat: [n_batch, n_Q, d_feat]
        # K_feat: [n_batch, n_K, d_feat]
        # V_feat: [n_batch, n_V, d_feat]

        # Split multi-head di Q, K e V (d_feat = n_head*d_head)
        """
        Si dividono Q, K, V. Per esempio, (100,) diventa (10,10).
        Qui d_feat viene diviso in n_head parti di dimensione d_head.
        """
        Q_split = Q_feat.view(n_batch, -1, self.n_head, self.d_head).permute(0, 2, 1, 3)
        K_split = K_feat.view(n_batch, -1, self.n_head, self.d_head).permute(0, 2, 1, 3)
        V_split = V_feat.view(n_batch, -1, self.n_head, self.d_head).permute(0, 2, 1, 3)
        # Q_split: [n_batch, n_head, n_Q, d_head]
        # K_split: [n_batch, n_head, n_K, d_head]
        # V_split: [n_batch, n_head, n_V, d_head]

        # Multi-Headed Attention
        d_K = K.size()[-1] # dimensione del key
        scores = torch.matmul(Q_split, K_split.permute(0, 1, 3, 2)) / np.sqrt(d_K)
        if mask is not None:
            scores = scores.masked_fill(mask==0,-1e9)
        attention = torch.softmax(scores,dim=-1)
        x_raw = torch.matmul(self.dropout(attention),V_split) # dropout NON menzionato nel paper
        # attention: [n_batch, n_head, n_Q, n_K]
        # x_raw: [n_batch, n_head, n_Q, d_head]

        # Reshape di x
        x_rsh1 = x_raw.permute(0,2,1,3).contiguous()
        # x_rsh1: [n_batch, n_Q, n_head, d_head]
        """
        Si unisce il tensor che era stato diviso in n_head parti di dimensione d_head.
        n_head * d_head = d_feat, quindi si usa d_feat direttamente.
        """
        x_rsh2 = x_rsh1.view(n_batch,-1,self.d_feat)
        # x_rsh2: [n_batch, n_Q, d_feat]

        # Lineare
        x = self.lin_O(x_rsh2)
        # x: [n_batch, n_Q, d_feat]
        out = {'Q_feat':Q_feat,'K_feat':K_feat,'V_feat':V_feat,
               'Q_split':Q_split,'K_split':K_split,'V_split':V_split,
               'scores':scores,'attention':attention,
               'x_raw':x_raw,'x_rsh1':x_rsh1,'x_rsh2':x_rsh2,'x':x}
        return out

# Layer Self-Attention
"""
n_batch: prendi 128 parole per batch dai dati di training.
n_src: entrano n_src parole = elabora n_src elementi della sequenza contemporaneamente.
d_feat: dimensione delle feature
n_head: quante head per la multi-head attention
"""
n_batch = 128
n_src   = 32
d_feat  = 200
n_head  = 5
src = torch.rand(n_batch,n_src,d_feat)
self_attention = MultiHeadedAttention(
    d_feat=d_feat,n_head=n_head,actv=F.relu,USE_BIAS=True,dropout_p=0.1,device=device)

# Essendo self attention, Q, K, V hanno tutti la stessa dimensione
out = self_attention.forward(src,src,src,mask=None)

Q_feat,K_feat,V_feat = out['Q_feat'],out['K_feat'],out['V_feat']
Q_split,K_split,V_split = out['Q_split'],out['K_split'],out['V_split']
scores,attention = out['scores'],out['attention']
x_raw,x_rsh1,x_rsh2,x = out['x_raw'],out['x_rsh1'],out['x_rsh2'],out['x']
```

$$head_{\color{red}i} = \text{Attention}(Q {\color{green}W}^Q_{\color{red}i},K {\color{green}W}^K_{\color{red}i}, V {\color{green}W}^V_{\color{red}i})$$

- Il paper non include dropout. Ma in pratica, il dropout viene usato in tutti i layer di attention, quindi è incluso qui.
- L'MHA originale crea k header separati e aggrega i risultati dopo.
  - L'implementazione reale divide in k parti all'inizio ed esegue lo Scaled Dot-Product.
  - Quindi d_feat deve essere divisibile per n_head.

## torch.Tensor.permute
Stessa funzionalità di transpose. La differenza è che transpose scambia solo due dimensioni, mentre permute funziona su tutte le dimensioni.

# Conclusioni

Può essere leggermente confuso, quindi riassumendo:
>
1. n_Q $$\neq$$ ( n_K = n_V)
2. d_Q = d_K

Perché vale #1:
- Key e Value vengono dall'encoder.
- La Query è l'input ricevuto dal decoder.

Perché vale #2:
- Query e Key devono essere moltiplicati internamente per l'attention, quindi servono la stessa dimensione.
- La dimensione del Value può differire da entrambe.
