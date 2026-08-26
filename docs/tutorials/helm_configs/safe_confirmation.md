---
title: Wallet confirmations
---

# Wallet confirmations

Core does **not** read a `SAFE_CONFIRMATIONS` environment variable. Finality for **incoming invoice payments** is `Wallet.confirmations` (default **1**): the tx stays `need_more_confirmations` until `get_confirmations_by_txid(txid) >= confirmations`.

Set it in the wallet UI (confirmations field). The same value is saved by `POST /api/v1/<crypto>/autopayout` as `confirationNum` (dashboard session, admin).

Related: [Network confirmations](../../user-guide/payment-processing/network-confirmations.md).

Outgoing payouts use a separate env on the **core** pod: `MIN_CONFIRMATION_BLOCK_FOR_PAYOUT` (default `1`) before status `SUCCESS`.

Coin backends may have their own scanner depth settings via `*.extraEnv` on the wallet deployment; those names are backend-specific and are not defined in `shkeeper.io`.
