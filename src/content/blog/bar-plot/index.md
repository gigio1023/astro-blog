---
title: "Bar plot"
description: "."
date: "2021-08-16T12:14:26.551Z"
tags: ["data viz", "python"]
draft: false
---

한번 봤던 내용들인데 복습 차 필사했다.

# Principle of Proportion Ink
> 실제 값과 그에 표현되는 잉크 양은 비례해야 한다.

- 모든 시각화 자료에서 통용되는 원칙이다. 
- 반드시 x축의 시작은 0이다.
  - plot의 세로 비율을 통해 데이터의 차이를 나타내야 한다.

![](/assets/images/Bar plot/fe90cd8b-91de-49c6-bac0-766292955d7b-image.png)

왼쪽은 0부터 시작하지 않았다. 따라서 표현되는 그래프의 비율이 실제 데이터의 비율을 반영하지 못한다. 즉, 불필요한 오해를 방지하기 위해서는 오른쪽 그림과 같은 그래프를 사용해야 한다.

# Bar plot

- 말 그대로 bar로 데이터를 표현.
- caetgory에 따른 수치값을 비교하기에 적합

## 막대의 방향에 따른 분류
matplotlib에서의 표현
- .bar() : x축에 범주, y축에 데이터
- .barh() : y축에 범주, x축에 값
  - 범주가 많을 때 적합
  
## 여러 개의 범주
- Bar plot은 범주에 대한 값을 표현
  - 1개의 feature에 대한 값만을 표현
  - 여러 group를 보여주려면 다른 방법을 찾아봐야 한다.
  
solution
- 여러개의 plot
- 1개의 plot에 동시에 표현
  - 쌓아서
  - 겹쳐서
  - 이웃에 배치해서
  
### Stacked bar plot
![](/assets/images/Bar plot/38e77e6d-742f-45ef-8e2f-305c05bb31dc-image.png)
- 2개 이상의 그룹을 stack
- 가장 아래에 stack된 bar의 분포는 파악하기 쉽다.
  - 그 위에 stack된 bar들은 분포를 알기 어렵다.
- matplotlib
  - .bar()에서 bottom parameter로 쌓아준다.
   -.barh()에서 left parameter로 쌓아준다.

### Percentaged stacked bar chart
![](/assets/images/Bar plot/f9755ff7-f0ca-40e6-8eb2-cc49add0ea39-image.png)

stacked bar plot은 전체 분포를 알기 어려우니, percentage로 stacked bar chart를 바꿔본 형태이다.

### Overlapped bar plot
![](/assets/images/Bar plot/2eb0f831-b391-487f-adb8-c3ff8e3b599d-image.png)
- 2개 그룹만 비교하려면 좋음.
  - 투명도(alpha)를 조절하여 비교.
  - 색상의 명도, 채도에 따라서도 투명도의 효과가 달라지니 유념하자.
- 3개 그룹 이상을 비교하려면 별로다.
  - 이럴 때는 area plot이 좋다.
  
### Grouped bar plot
**_가장 효과적인 방법!!_**
![](/assets/images/Bar plot/9bfd23d5-dba3-493b-9c5b-202dea6a5008-image.png)
- 그룹별 bar를 이웃되게 배치
- matplotlib에서는 구현이 까다로워서 seaborn에서 다룬다.
  - .set_xticks(), .setxticklabels()를 사용한다.
  
---

앞선 방법들 모두 그룹이 5~7개 일 때 효과적이다. 그룹이 더 많다면 다른 방법 필요.

# 데이터 정렬
- 정렬을 필수다
  - 가령, pandas에서는 sort_valeus(), sort_index()
- 시간순, 크기순, 범주의 순서, 범주의 값에 따라 적합하게 정렬해주자.

# 적절한 공간 활용
- matplotlib의 bar plot은 ax에 꽉 차서 답답하다
- 다음의 메서드로 적절히 조정하자
  - X/Y axis limit(.set_xlim(), .set_ylime())
  - Spines(.spines[spine].set_visible())
  - gap(width)
  - legend(.legend()), 범례를 어디에 두느냐
  - margins(.margins())