---
title: "Transformer Practice"
description: "Hands-on PyTorch implementation of Scaled Dot-Product Attention and Multi-Head Attention for the Transformer."
date: "2021-08-13T13:09:33.204Z"
tags: ["pytorch", "nlp"]
draft: false
lang: en
translationOf: "transformer-practice"
---

# SDPA
Scaled Dot-Product Attention. This is the model with only one attention head from the Transformer lesson.
![](/images/8bdd6682-92f7-4150-9b64-5a77a312e39c-image.png)

As shown above, generating multiple Q, K, V sets is MHA; generating just one set is SDPA.

![](/assets/images/Transformer 실습/2caaf910-d820-4ce6-a286-b6497e5928e9-image.png)
```python
class ScaledDotProductAttention(nn.Module):
    """
    Structure with a single attention head.
    Input: n-dimensional vector from embedding result.

    Finds query, key, value and performs attention computation
    as shown in the formula above.

    Output: tensor with dimension equal to value vector dimension
    for n word vectors.
    """
    def forward(self, Q, K, V, mask=None):
        d_K = K.size()[-1] # key dimension
        scores = Q.matmul(K.transpose(-2, -1)) / np.sqrt(d_K)
        if mask is not None:
            scores = scores.masked_fill(mask==0, -1e9)
        attention = F.softmax(scores,dim=-1)
        out = attention.matmul(V)
        return out,attention

# Demo run of scaled dot product attention

SPDA = ScaledDotProductAttention()
"""
n_batch: there are n_batch words
d_K: key vector dimension
d_V: Value vector dimension
n_Q: number of Query vectors
n_K: number of Key vectors
n_V: number of Value vectors
"""
n_batch, d_K, d_V = 3, 128, 256 # d_K(=d_Q) does not necessarily be equal to d_V
n_Q, n_K, n_V = 30,50,50
Q = torch.rand(n_batch,n_Q,d_K)
K = torch.rand(n_batch,n_K,d_K)
V = torch.rand(n_batch,n_V,d_V)
out,attention = SPDA.forward(Q,K,V,mask=None)
def sh(x): return str(x.shape)[11:-1]
print ("SDPA: Q%s K%s V%s => out%s attention%s"%
       (sh(Q),sh(K),sh(V),sh(out),sh(attention)))
```
As shown in the formula, query and key dimensions are $$\mathbb{R}^{n\times d_K}$$. That is, query and key must have the same dimension for the operation to work.

Value dimension is $$\mathbb{R}^{n\times d_V}$$, but in practice it's implemented the same as query and key for convenience. They can be equal.

## Number of Q, K, V
### With encoder and decoder
Looking at the code, SPDA vectors are generated as:
> n_Q $$\neq$$ ( n_K = n_V)

V and K come from the encoder, while the decoder creates Q from its own input, so the counts can differ.

This is the more general case since it assumes encoder-decoder.

----
_**The purpose of SPDA becomes clear here!**_
We want to encode Query vectors by referencing key and value vectors.

So SPDA's output vectors must match the Query vector count.

### For self-attention
>
n_Q = n_V = n_K

All must be equal.

## K.transpose(-2, -1)
PyTorch tensors support transpose like this. It swaps the two dimensions given as arguments. Here, it swaps the last and second-to-last dimensions.

## torch.nn.Softmax()
I didn't know what dim = -1 meant, so I checked the docs:
>
dim (int) - A dimension along which Softmax will be computed (so every slice along dim will sum to 1).

https://stackoverflow.com/questions/49036993/pytorch-softmax-what-dimension-to-use

It computes softmax along the specified dimension.

![](/assets/images/Transformer 실습/4a19b3f9-5b06-497f-84dd-b90f8839e484-image.png)

The definition of softmax is as above, where $$x_j$$'s j is specified via the dim option.


## Why SDPA code also works for MHA
The instructor said it's because of "batch the multiplication." I'm not entirely sure what was meant.

My take: since SDPA is implemented via matrix operations, it works regardless of how many dimensions Q, K, V have — you just need to match dimension counts.


# MHA (Multi-Head Attention)
```python
class MultiHeadedAttention(nn.Module):
    def __init__(self,d_feat=128,n_head=5,actv=F.relu,USE_BIAS=True,dropout_p=0.1,device=None):
        """
        :param d_feat: feature dimension
        :param n_head: number of heads
        :param actv: activation after each linear layer
        :param USE_BIAS: whether to use bias
        :param dropout_p: dropout rate
        :device: which device to use (e.g., cuda:0)
        """
        super(MultiHeadedAttention,self).__init__()
        if (d_feat%n_head) != 0:
            raise ValueError("d_feat(%d) should be divisible by b_head(%d)"%(d_feat,n_head))
        self.d_feat = d_feat
        self.n_head = n_head
        self.d_head = self.d_feat // self.n_head
        self.actv = actv
        self.USE_BIAS = USE_BIAS
        self.dropout_p = dropout_p # prob. of zeroed

        self.lin_Q = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)
        self.lin_K = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)
        self.lin_V = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)
        self.lin_O = nn.Linear(self.d_feat,self.d_feat,self.USE_BIAS)

        self.dropout = nn.Dropout(p=self.dropout_p)

    def forward(self,Q,K,V,mask=None):
        """
        :param Q: [n_batch, n_Q, d_feat]
        :param K: [n_batch, n_K, d_feat]
        :param V: [n_batch, n_V, d_feat] <= n_K and n_V must be the same
        :param mask:
        """
        n_batch = Q.shape[0]
        Q_feat = self.lin_Q(Q)
        K_feat = self.lin_K(K)
        V_feat = self.lin_V(V)
        # Q_feat: [n_batch, n_Q, d_feat]
        # K_feat: [n_batch, n_K, d_feat]
        # V_feat: [n_batch, n_V, d_feat]

        # Multi-head split of Q, K, and V (d_feat = n_head*d_head)
        """
        Split Q, K, V. For example, (100,) becomes (10,10).
        Here, d_feat is split into n_head parts of d_head dimension.
        """
        Q_split = Q_feat.view(n_batch, -1, self.n_head, self.d_head).permute(0, 2, 1, 3)
        K_split = K_feat.view(n_batch, -1, self.n_head, self.d_head).permute(0, 2, 1, 3)
        V_split = V_feat.view(n_batch, -1, self.n_head, self.d_head).permute(0, 2, 1, 3)
        # Q_split: [n_batch, n_head, n_Q, d_head]
        # K_split: [n_batch, n_head, n_K, d_head]
        # V_split: [n_batch, n_head, n_V, d_head]

        # Multi-Headed Attention
        d_K = K.size()[-1] # key dimension
        scores = torch.matmul(Q_split, K_split.permute(0, 1, 3, 2)) / np.sqrt(d_K)
        if mask is not None:
            scores = scores.masked_fill(mask==0,-1e9)
        attention = torch.softmax(scores,dim=-1)
        x_raw = torch.matmul(self.dropout(attention),V_split) # dropout is NOT mentioned in the paper
        # attention: [n_batch, n_head, n_Q, n_K]
        # x_raw: [n_batch, n_head, n_Q, d_head]

        # Reshape x
        x_rsh1 = x_raw.permute(0,2,1,3).contiguous()
        # x_rsh1: [n_batch, n_Q, n_head, d_head]
        """
        Merge the tensor that was split into n_head parts of d_head dimension.
        n_head * d_head = d_feat, so we use d_feat directly.
        """
        x_rsh2 = x_rsh1.view(n_batch,-1,self.d_feat)
        # x_rsh2: [n_batch, n_Q, d_feat]

        # Linear
        x = self.lin_O(x_rsh2)
        # x: [n_batch, n_Q, d_feat]
        out = {'Q_feat':Q_feat,'K_feat':K_feat,'V_feat':V_feat,
               'Q_split':Q_split,'K_split':K_split,'V_split':V_split,
               'scores':scores,'attention':attention,
               'x_raw':x_raw,'x_rsh1':x_rsh1,'x_rsh2':x_rsh2,'x':x}
        return out

# Self-Attention Layer
"""
n_batch: take 128 words per batch from training data.
n_src: n_src words go in = process n_src sequence elements at once.
d_feat: feature dimension
n_head: how many heads for multi-head attention
"""
n_batch = 128
n_src   = 32
d_feat  = 200
n_head  = 5
src = torch.rand(n_batch,n_src,d_feat)
self_attention = MultiHeadedAttention(
    d_feat=d_feat,n_head=n_head,actv=F.relu,USE_BIAS=True,dropout_p=0.1,device=device)

# Since it's self attention, Q, K, V all have the same dimension
out = self_attention.forward(src,src,src,mask=None)

Q_feat,K_feat,V_feat = out['Q_feat'],out['K_feat'],out['V_feat']
Q_split,K_split,V_split = out['Q_split'],out['K_split'],out['V_split']
scores,attention = out['scores'],out['attention']
x_raw,x_rsh1,x_rsh2,x = out['x_raw'],out['x_rsh1'],out['x_rsh2'],out['x']
```

$$head_{\color{red}i} = \text{Attention}(Q {\color{green}W}^Q_{\color{red}i},K {\color{green}W}^K_{\color{red}i}, V {\color{green}W}^V_{\color{red}i})$$

- The paper doesn't include dropout. But in practice, dropout is used in all attention layers, so it's included here.
- The original MHA creates k separate headers and aggregates the results later.
  - The actual implementation splits into k parts upfront and runs Scaled Dot-Product.
  - Therefore, d_feat must be divisible by n_head.

## torch.Tensor.permute
Same functionality as transpose. The difference is that transpose only swaps two dimensions, while permute works on all dimensions.

# Takeaway

This can be slightly confusing, so to summarize:
>
1. n_Q $$\neq$$ ( n_K = n_V)
2. d_Q = d_K

Why #1 holds:
- Key and Value come from the encoder.
- Query is the input received by the decoder.

Why #2 holds:
- Query and Key must be inner-producted for attention, so they need the same dimension.
- Value dimension can differ from both.
