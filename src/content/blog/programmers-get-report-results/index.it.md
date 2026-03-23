---
title: "[Programmers] Risultati delle segnalazioni"
description: "Soluzione in C++ del problema dei risultati delle segnalazioni di Programmers, con unordered_map, set e stringstream."
date: "2022-01-30T17:51:20.099Z"
tags: ["algorithm"]
lang: it
translationOf: "programmers-get-report-results"
draft: false
---

https://programmers.co.kr/learn/courses/30/lessons/92334?language=cpp
ref: https://wadekang.tistory.com/6
# Ripasso C++
- unordered_map<T, T>
  - Stesso utilizzo di map
  - map esegue l'ordinamento su insert/erase; unordered_map no, quindi è più veloce.
  - Ricerca in map: O(log n)
  - unordered_map: O(1), caso peggiore O(n)
  - ref: [Blog1](https://math-coding.tistory.com/31), [Blog2](https://jjeongil.tistory.com/1045)
- stringstream
  - str(): estrae dati del tipo appropriato dal buffer, escludendo spazi e '\n'
  - ref: [Blog1](https://deukyu.tistory.com/48), [HowToUse](https://life-with-coding.tistory.com/403)
- Ranged-based for loops, auto
  - ref: [Auto type inference](https://boycoding.tistory.com/210), [Ranged-based for](https://blockdmask.tistory.com/319)
```c
  for (auto it: v)
	cout << it;

  for (auto& it: v)
  	it *= 2; // si possono usare puntatori

  for (const auto& it: v)
  	// se il costo della copia è alto, usare const pointer
  ```


# Soluzione
1. Mappare ogni utente a un indice per poterlo identificare.
2. Costruire una mappa "chiave: utente segnalato, valore: insieme degli utenti che lo hanno segnalato".
3. Usando le informazioni del punto 2, se k o più persone hanno segnalato qualcuno, aggiornare le informazioni sull'utente bannato in base agli indici del punto 1.

# Codice
```cpp
#include <string>
#include <vector>
#include <unordered_map>
#include <set>
#include <sstream>

using namespace std;

vector<int> solution(vector<string> id_list, vector<string> report, int k) {
    vector<int> answer(id_list.size(), 0);
    unordered_map<string, int> idx_map; // assegnare un indice a ogni utente
    for (int i = 0; i < id_list.size(); i++)
        idx_map[id_list[i]] = i;

    unordered_map<string, set<string>> report_map; // memorizzare l'insieme dei segnalatori per utente segnalato
    stringstream ss;

    for (auto rep: report) {
        ss.str(rep);
        string first, second;
        ss >> first >> second; // separare per spazio usando l'output di stringstream

        report_map[second].insert(first); // memorizzare first (il segnalatore) nell'insieme di second
        ss.clear();
    }

    for (auto it: report_map) {
        if (it.second.size() >= k) { // per gli utenti segnalati da k o più persone
            for (auto set_it: it.second) { // trovare ogni segnalatore tramite indice e notificarlo
                int idx = idx_map[set_it];
                answer[idx]++;
            }
        }
    }
    return answer;
}
```
