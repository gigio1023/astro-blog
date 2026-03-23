---
title: "Quant Trading / Researcher"
description: "Introduction to quantitative trading strategies including arbitrage, market making, and statistical arbitrage."
lang: en
translationOf: "quant-trading-researcher"
date: "2021-09-23T09:51:47.930Z"
tags: ["quant-trading"]
draft: false
---

# Trading
- Trading: short-term
  - Re-trade within 1 second to 3 days.
- Investment: long-term

# Quant trading
Quantitative trading, as the name says. Instead of trading on gut feeling, you use math and models.
= Automated / system / algorithmic trading

- Past: derivative prices were seen as having mathematical properties, and prices were derived through mathematical manipulation.
  - Historical data was not used.
- Recent: historical data access has become easy and convenient. Statistics and ML-based data-driven approaches to pricing have been very successful.

# Strategy of Quant trading
Countless strategies exist. The well-known ones can be categorized as follows:
- How long is the position held?
  - Sub-second, ~3 minutes, ~1 hour, ~1 day, ~3 days -- it varies widely.
- Which asset class?
  - Stocks, futures, options, bonds, forex, crypto, etc.
  - e.g., in terms of number of instruments traded, futures might be 10-100 at most, while stocks can be thousands (say 5000).
- Automation level
  - Blackbox: 100% automated
  - Greybox: trader's judgment involved
- Trade execution vs. self-generated returns
  - Maximizing returns from the instrument itself
  - Strategy for handling large orders on an instrument
- **Where does the edge come from?** [What is trading edge?](https://quantsavvy.com/finding-a-daytrading-edge/)
  - Understanding market characteristics
  - Generating returns through a good model

## Arbitrage
Buying cheap and selling expensive across venues to generate profit. You trade considering price differences across multiple exchanges.

Arbitrage serves to equalize prices of the same product. It tells consumers they can buy and sell at similar prices regardless of which exchange they visit.

When arbitrage breaks down, it means prices across exchanges become unpredictable. A well-known example is the "kimchi premium" -- Korean crypto trading at a premium over other countries.

**Because it's intuitive and straightforward, speed competition is fierce.** When an arbitrage opportunity appears, trades happen anywhere from microseconds to milliseconds depending on the market and exchange.

Success factors are roughly 90% speed and 10% alpha. Alpha means how smart the strategy is. So the best model tends to dominate.

## Market Making
Market makers generate profit by using characteristics of capital markets.

e.g., banks generate revenue through foreign exchange trading.

> Providing liquidity = anyone can easily buy and sell whenever they want to trade.
- Market makers create markets, supply liquidity, and earn the spread.
- Market makers stabilize capital markets.

Without market makers, people would have to trade P2P, trade amounts would vary by person, and capital markets would become unstable.

When everyone in the market trades in the same direction at once, prices move and market makers can take losses. So it's important to build strategies that detect such movements and cancel orders accordingly.

50% speed, 50% alpha.

## Statistical arbitrage
Despite the name, it has little to do with actual arbitrage. It's an umbrella term for all methods that predict future price changes.
- Price prediction using recent order book movements
- Price prediction using cross-sectional correlations between instruments
- Price difference prediction between instruments (basis trading)

All information sources are used regardless of whether they're fundamental ([ref](https://byeoltong.com/737)), technical indicators, etc.

Data-driven approaches are essential.

10% speed, 90% alpha.

# Fundamental trading players
- Quant hedge fund ([ref](http://www.samsungfund.com/content/guide4_2_10.action?mobile)), robo-adviser ([wiki](https://ko.wikipedia.org/wiki/%EB%A1%9C%EB%B3%B4_%EC%96%B4%EB%93%9C%EB%B0%94%EC%9D%B4%EC%A0%80))
  - Manage large-scale client capital (hundreds of billions to tens of trillions of won).
  - Earn fees from AUM and a share of profits.
  - Holding periods are relatively long. Closer to quant investment than quant trading.
- Proprietary trading ([ref](https://www.mk.co.kr/news/business/view/2015/06/571712/))
  - Unlike hedge funds, they trade with the company's own or partners' capital (tens to hundreds of billions of won).
  - Relatively smaller scale than hedge funds.
  - Pursue high returns through HFT and market making. Successful teams achieve 100%+ annual returns.
  - After the financial crisis, regulatory changes led many to shift from prop trading to providing quant trading services.
    - e.g., order execution services: executing large sell orders that standard systems can't handle, using quant trading.

# Stat Arb strategy
If we think of statistical arbitrage strategy through a deep learning lens, ideally it looks like an end-to-end structure. Elegant and simple. But in practice, not everything is end-to-end; the setup looks more like:

- Most price prediction uses linear regression. ML and DL models are also used, of course.
- Portfolio optimizer: a model that considers inter-instrument correlations, how much prices move, etc., to determine which positions generate the most stable returns.
  - Model-based rather than data-driven.
  - Actual orders to execute come from here.

# Is quant trading even viable?
One might wonder whether generating excess returns in markets is a scam. That is, whether quant trading itself has any merit. There are plenty of hypotheses and anecdotes claiming this approach can't work.

## Efficient market hypothesis (Eugene Fama)
> "Prices contain all information about the product, so long-term excess returns are impossible."

The hypothesis that prices already reflect all present and future information, so returns above a certain level are unattainable. The author won a Nobel Prize in Economics.

Supporting arguments:
- Comparing active fund managers (who buy/sell based on personal judgment) with market indices (buying all instruments weighted by market cap) shows market indices performing better.
- Long Term Capital Management spectacularly blew up during the 1997 Asian financial crisis.

## Why prediction is possible
### Information reflected through trading
Depending on the prediction horizon, there are clear cases and reasons why future prediction works.

> For new information to be reflected in prices, someone has to trade.

The efficient market hypothesis says information is pre-reflected in prices, but that reflection happens through trading. So observing trades can yield some level of future prediction.

- Large participants take a long time to move.
  - Large sell orders on a single instrument take time. Observing such movements can enable price prediction.
- Crowd psychology appears during large price changes.
  - When prices rise, they peak and then correct to an appropriate level.
- Professionals take rational risk-reducing actions that are actually meaningful.
  - Options market makers hedging large sells must trade in the spot market to reduce risk. So options market volume can predict the near future (milliseconds).
- New information (news, disclosures, earnings, fundamentals) takes time to be reflected in the market.
  - Modeling how that information propagates can generate returns.
- Technical issues: exchange/instrument characteristics, participants that follow specific rules.
  - Characteristics and rules of specific instruments and users enable future prediction.
- High-volume instruments or exchanges lead the price discovery process.
  - Arbitrageurs align prices between exchanges with very different volumes, using the high-volume exchange as the reference.
  - The high-volume side has market makers and more liquidity, so the low-volume side's liquidity gets consumed first.

### Success criteria differ from intuition
$r^2$ ([wiki](https://ko.wikipedia.org/wiki/%EA%B2%B0%EC%A0%95%EA%B3%84%EC%88%98)) is a metric for evaluating future prediction success. Simply put, it tells you how much of the future price you predicted correctly. Negative means you'd be better off not predicting; positive ranges from 0 to 100%.

Consider 6 forecasts. One might think high $r^2$ forecasts are useful for making money. But in practice, forecasts with $r^2$ of 0.05%, 1.00%, and 3.00% are the ones that are actually achievable and profitable. If $r^2$ exceeds 15%, something is likely wrong -- a pipeline bug, incorrect $r^2$ measurement, or data snooping ([ref](https://ddingz.tistory.com/m/84)) artificially inflating the number.

**Even bad predictions can make money, which is why the success criteria in quant trading differ from our intuition.**

----

**Why bad predictions still work**
- Extremely small and numerous bets
  - Thousands of instruments, tens of thousands of bets per day.
  - If win probability is 51%, by the law of large numbers, the actual win rate converges to 51%.
- Many forecast algorithms used.
- The average profit per HFT (high frequency trading) trade is about 0.01% of volume (1 basis point).
  - Actual returns vary, but the overall average produces a tiny profit.
  - To achieve 100%+ annual returns via HFT, an enormous number of trades is needed.

# Deep learning in quant trading
Linear regression is used a lot; ML and DL only a little for price prediction. **Because the problem of predicting markets is hard to even define, let alone solve.**
Why market prediction is hard:
- Only a tiny fraction of the factors affecting markets are observable.
  - Other participants' positions, views, COVID, crypto regulation, politics, economy, diplomacy, scandals, etc.
  - Information is always observed later than when it occurs.
- Market characteristics keep changing.
  - Participants continuously refine their approaches.
  - Participants themselves keep changing.
  - Regulations keep changing.
  - New markets / asset classes appear.

## Problem and environment definition
Problems that deep learning solves well include:
- Image recognition: objects in images don't change. Cat and dog features won't change for millions of years.
- Go AI: the entire board is observable regardless of the game state.
- NLP: language forms and properties change, but the essence of language stays stable over long periods.

These problems don't change over time (independent of difficulty). Compared to market prediction, it's like:
- Identifying an animal from a single strand of fur.
- Animals changing their fur to avoid classification.
- The government redefining animal categories.

## What does it mean that the problem is hard?
- High risk of overfitting.
  - Reducing in-sample error is easy with ML/DL.
  - But finding low error likely means overfitting.
  - Even if overfitting is prevented now, there's no guarantee it won't happen in the future.
- Must distinguish between market attributes that change and those that don't.
  - If you can classify these properly, even linear regression yields a valuable model.

---
**The problem is hard to define, the problem itself keeps changing, and even valuable information carries high overfitting risk -- that's why deep learning isn't widely used in quant trading.**

# Research
## Hypothesis
Most market research starts from a hypothesis.
- If summer floods and bad weather hurt crops, grain futures prices should rise.
- If buy orders of the same size repeat, prices should rise.

Roughly designing a model and throwing data at it (data-driven approach) tends to fail. Without a convincing hypothesis, adjusting the model, direction, and data is difficult. Even with a convincing hypothesis, reaching production is rare; without one, it's even harder.

**Research doesn't always follow a waterfall model.** Iterating on model form and results to improve outcomes is also essential.

## Data
Quant trading firms purchase and use a very diverse set of data.
- Trade prices, announcements
- News, Twitter, web crawl results, analyst reports
- Rumored data sources include satellite imagery (parking lot car counts for economic prediction), weather data (crop failure prediction), credit card usage data, etc.

Extracting signal from data involves the familiar ML/DL operations:
- Filtering, noise removal, clipping, outlier detection, normalization, regression regularization, NLP...

## Algorithm
- Does it express the hypothesis well?
- Is the objective function properly designed? (e.g., which is right -- L1 or L2 norm?)
- Reusing existing code
  - Engineering perspective: refactor if the code isn't distributed
  - Modeling perspective: model compression

## Monetization
The algorithm's results must actually make money.
- Exchange selection
- Order type selection
- Identifying which portfolio delivers steady performance without large swings
- Trading without exposing your alpha and positions
- Ensuring your trades don't impact the market
- Accounting for the gap between simulator and reality

## Caveats
- Gap between production and backtest systems
  - Backtest system: for evaluation
  - e.g., production in C++, backtest in Python -- gaps existed.
- Market impact: the market effect caused by your own trades
- Data snooping: accidentally including data you didn't see during research
  - Backtesting only on recently high-volume stocks:
    - Risky because you don't know which stocks will have high volume later.
  - Using information not available on the trading day:
    - Accidentally including today's data instead of only yesterday's, producing misleadingly good test results.

## Research pipeline
Like ML, research often produces no results -- unlike development, where fulfilling requirements eventually leads to completion. In research, even the best ideas can lead nowhere.

So a platform that enables efficient hypothesis iteration is very important.
- Company-level investment
  - Internal notebook research platforms, internal cloud, internal DSL
- Team-level investment
  - Easily reproducible research scripts, investment in research efficiency

# Industry
In Korea, trading startups, prop desks at traditional brokerages, robo-advisers, and fintech startups are all emerging as quant trading companies.

A good place to work is one that invests heavily in platforms and processes, and fosters a culture of openly sharing research results and materials internally.
