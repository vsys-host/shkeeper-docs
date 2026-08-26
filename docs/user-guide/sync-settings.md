---
sidebar_position: 6
title: Sync Settings
---

# Sync Settings

SHKeeper has two different “sync” layers: the **coin backend** catching up with the chain, and the **core** deciding whether that coin can create invoices.

## Wallet / node sync

EVM wallets (`ethereum_like_coin`) scan new blocks on an interval:

- `CHECK_NEW_BLOCK_EVERY_SECONDS` (default `2`)
- `FULLNODE_URL` / `FULLNODE_TIMEOUT`

Status is exposed as `GET /api/v1/<crypto>/status` and on `GET /api/v1/crypto` (`Synced` vs lagging). Metrics on the EVM wallet include `ethereum_wallet_last_block` vs `ethereum_fullnode_last_block`.

Bitcoin-like wallets talk to bitcoind RPC. A local fullnode (`btc_fullnode.enabled: true`) must finish IBD before deposits are reliable. Public RPC skips that wait.

## Core: disable invoices when lagging

```env
DISABLE_CRYPTO_WHEN_LAGS=1
```

When this is set, `POST /api/v1/<crypto>/payment_request` (and `/quote`) returns an error if `crypto.getstatus()` is not `Synced`.

`GET /api/v1/crypto` is cached in memory for up to 60 seconds, so status can lag slightly.

## Invoice confirmation threshold

Each wallet has a `confirmations` field (default `1`). A transaction stays `need_more_confirmations=true` until `get_confirmations_by_txid()` reaches that number. Only then is the invoice callback sent (after `NOTIFICATION_TASK_DELAY`).

Configure it in the wallet UI or via `POST /api/v1/<crypto>/autopayout` (`confirmations` is part of the same wallet settings payload). See [Network confirmations](./payment-processing/network-confirmations.md).

## Payout confirmations

`MIN_CONFIRMATION_BLOCK_FOR_PAYOUT` (default `1`) controls when an outgoing payout is marked `SUCCESS` and, if enabled, when the payout webhook fires.

Related Helm preset: [Safe confirmations](../tutorials/helm_configs/safe_confirmation.md).
