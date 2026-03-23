---
title: "[Programmers] Lotto miglior e peggior piazzamento"
description: "Soluzione in C++ del problema lotto miglior/peggior piazzamento di Programmers, con note su find e metodi vector."
date: "2022-01-31T08:04:48.906Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-lotto-max-min-rank"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/77484?language=cpp

# Ripasso C++
- find()
  - Cerca usando il primo e l'ultimo iteratore come parametri.
  - Restituisce l'ultimo iteratore se non trova nulla; restituisce il valore se trovato.

```c++
#include <algorithm>
#include <vector>
#include <iostream>
vector<int> target;
int i = 0;

auto res = find(target.begind(), target.end(), i);
if (res != target.end()) cout << "find" << endl;
```
- Metodi vector
```c++
// copia
dest.assign(source.begin(), source.end());

// eliminazione
dest.erase(idx);
```
# Soluzione
1. Confrontare `lottos` e `win_nums` per contare il numero di corrispondenze.
2. Contare il numero di zeri.
3. Il punto 1 dà il piazzamento peggiore; sommando i punti 1 e 2 si ottiene il piazzamento migliore.

# Codice
```c++
#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

int get_rank(int correct) {
    int rank;
    if (correct >= 2) {
        rank = 7 - correct;
    }
    else {
        rank = 6;
    }

    return rank;
}

void print_vector(vector<int> target) {
    for (auto i: target) {
        cout << i << ' ';
    }
    cout << endl;
}
vector<int> solution(vector<int> lottos, vector<int> win_nums) {
    vector<int> answer;

    // peggiore: confrontare lottos e win_nums
    // migliore: peggiore + numero di zeri

    int zero_cnt = 0, cnt = 0;

    for (auto& i: lottos) {
        // contare gli zeri
        if (i == 0) {
            zero_cnt++;
            continue;
        }

        // verificare
        auto res = find(win_nums.begin(), win_nums.end(), i);
        if (res != win_nums.end()) {
            cnt++;
        }
    }

    int best = get_rank(cnt + zero_cnt), worst = get_rank(cnt);
    answer.push_back(best);
    answer.push_back(worst);
    return answer;
}
```
