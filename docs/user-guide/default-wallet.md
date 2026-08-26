---
sidebar_position: 7
title: Default Wallet
---

# Default Wallet

Each enabled cryptocurrency has one `Wallet` row (`crypto` is unique). The first registration creates wallets for coins that are on (`*_WALLET=enabled`, plus BTC/LTC/DOGE by default).

## Shared API key

`Wallet.apikey` is copied from any existing wallet when a new coin is registered. The same `X-Shkeeper-Api-Key` works for every coin. Generate or rotate it in the dashboard; payouts still use HTTP Basic Auth (login/password).

## Per-coin settings

Stored on the wallet, not globally:

| Field | Default | Role |
|---|---|---|
| `enabled` | `true` | If false, `payment_request` returns “gateway unavailable”. |
| `llimit` | `95` | Below this % of `amount_fiat` → invoice `PARTIAL`. |
| `ulimit` | `105` | Below this % → `PAID`; at or above → `OVERPAID`. |
| `recalc` | `0` | Hours after invoice creation to refresh the FX rate (`0` = keep creation rate). |
| `confirmations` | `1` | Required chain confirmations before the paid callback. |
| `payout` / `ppolicy` / `pdest` / `pfee` | off / `manual` | Autopayout to a cold address. |
| `prespolicy` / `presamount` | `disable` | Keep a reserve (fixed amount or percent) when autopaying. |

Related: [Wallet setup](../getting-started/wallet_setup.md).
