---
title: Cold Wallets (autopayout)
---

# Cold Wallets (autopayout)

Autopayout moves coin from the hot wallet to a destination you control (`Wallet.pdest`). It is not a separate “hardware wallet” integration; it is a scheduled or threshold payout to an address you set.

## Policies (`ppolicy`)

| Value | Behavior |
|---|---|
| `manual` | No automatic send. Use the dashboard or payout API. |
| `scheduled` | Run when `last_payout_attempt + pcond minutes` is in the past (and balance is not zero). |
| `limit` | Run when `balance >= pcond`. |

`Wallet.payout` must be true. `pfee` is the fee parameter passed to `mkpayout` (sat/vByte for BTC; ignored on many EVM coins where fee is estimated).

## Reserve

`prespolicy`:

- `disable` — send the full balance
- `amount` — leave `presamount` in the hot wallet
- `percent` — send `balance * (1 - presamount/100)`

If the reserved amount is greater than or equal to the balance, autopayout raises and skips.

Lightning (`BTC-LIGHTNING`) first finds a sendable amount via `QueryRoutes`; if nothing is sendable, it skips.

## API

`POST /api/v1/<crypto>/autopayout` (logged-in session / dashboard) updates destination, fee, limits, recalc, and related wallet fields.

Manual payouts: `POST /api/v1/<crypto>/payout` with Basic auth. Disable sending entirely with `PAYOUTS_DISABLED=1` on the wallet backend ([payouts disabled](../../tutorials/helm_configs/payouts_disabled.md)).
