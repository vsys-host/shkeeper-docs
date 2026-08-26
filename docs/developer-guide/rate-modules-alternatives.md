---
title: Rate Module Alternatives
---

# Rate Module Alternatives

`ExchangeRate.source` is either `manual` or the name of a `RateSource` class. Dynamic providers live in `shkeeper/modules/rates/` and register by `name`:

| `source` | Provider |
|---|---|
| `binance` | `https://api.binance.com/api/v3/ticker/price?symbol={crypto}{fiat}` |
| `kucoin` | KuCoin prices API |
| `kraken` | Kraken ticker |
| `coinbase` | Coinbase |
| `manual` | Uses `ExchangeRate.rate` stored in the DB (no HTTP) |

If `source` is not `manual` and the named provider is missing, core falls back to **binance**.

Stablecoins in `USDT_CRYPTOS` / `USDC_CRYPTOS` are mapped to `USDT`/`USDC` (USD≈1 for USDT on some providers). `BTC-LIGHTNING` uses BTC. `MATIC` is queried as `POL`, `TON` as `GRAM` on Binance/KuCoin (Kraken/Coinbase notes TON mapping as not implemented). `ARB-TOKEN` → `ARB`, `OP-TOKEN` → `OP`, `ARBETH`/`OPETH` → `ETH`.

Set the source and fees in the wallet rates UI (`fee`, `fixed_fee`, `fee_policy`). `POST /api/v1/<crypto>/exchange-rate` updates the rate when using manual or dashboard flows.

Fiat list: `USD` and `EUR` always; add more with `EXTRA_CURRENCIES`.

`ExchangeRate` is unique on `(crypto, fiat)`: one rate and fee policy per pair.
