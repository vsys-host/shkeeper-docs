---
title: Underpayment and Overpayment
---

# Underpayment and Overpayment

Invoice status is computed from **fiat** balance vs `amount_fiat`, using wallet percentages:

| Condition | Status |
|---|---|
| `balance_fiat < amount_fiat * (llimit / 100)` | `PARTIAL` |
| `balance_fiat < amount_fiat * (ulimit / 100)` | `PAID` |
| otherwise | `OVERPAID` |

Defaults: `llimit=95`, `ulimit=105`. Example: a $100 invoice is `PARTIAL` below $95, `PAID` from $95 up to (but not including) $105, `OVERPAID` at $105+.

Only transactions in the **same crypto** as the invoice add to `balance_crypto` (a TRX deposit does not increase a USDT invoice’s crypto balance). Fiat balance still updates from the credited rate.

## Exchange rate window

If wallet `recalc` is `0`, the rate from invoice creation is kept. If `recalc` is N hours and the payment arrives after that window, SHKeeper recomputes `amount_crypto` from the current `ExchangeRate` before applying the tx. The response field `recalculate_after` is this N.

Fee on the quoted amount follows `ExchangeRate.fee_policy` (`NO_FEE`, `PERCENT_FEE`, `FIXED_FEE`, `PERCENT_OR_MINIMAL_FIXED_FEE`).

The callback includes `paid` (`true` for `PAID` and `OVERPAID`), `overpaid_fiat`, and per-tx `amount_fiat_without_fee` / `fee_fiat`. Use `status`, not a local amount check, as the source of truth.

Related: [Default wallet](../default-wallet.md), [Fees](../fees-gas-miscalculations.md).
