---
title: Add Support for Wallets
---

# Add Support for Wallets

A new chain needs three pieces: core `Crypto` class, a wallet daemon the core can HTTP-call, and Helm resources.

## Core

1. Subclass `Crypto` (or an existing family: `BitcoinLikeCrypto`, `Ethereum`).
2. Implement `mkaddr`, `balance`, `getstatus`, `getaddrbytx` / `get_confirmations_by_txid`, `mkpayout`.
3. Drop the module in `shkeeper/modules/cryptos/`. Class name controls the env flag: `FOO_WALLET=enabled`.
4. Add the class name to `default_off` unless it should start enabled (only `btc`, `ltc`, `doge` are `default_on`).

## Wallet service

EVM: add `app/chains/foo.py` in `ethereum_like_coin` with `COIN`, `TOKENS`, `FULLNODE_URL`, `ENV` keys, register it in `app/chains/__init__.py`. One image serves ETH, BNB, Polygon, Avalanche, Arbitrum, Optimism via `WALLET=`.

Non-EVM: a separate service (pattern: `tron-shkeeper`, `solana-shkeeper`, `xrp-shkeeper`) exposing the same HTTP API the core class expects (`/generate-address`, `/balance`, `/payout`, `/multipayout`, …).

## Helm

Copy an existing deployment (for example `charts/shkeeper/templates/deployments/ethereum-shkeeper.yaml`): image, `FULLNODE_URL`, secrets, `WALLET` / `COIN_SYMBOL`, service, optional PVC/fullnode. Wire `*.enabled` in `values.yaml` to `FOO_WALLET` on the core pod (`templates/shkeeper/deploy.yaml`).

Related: [Architecture](../architecture-overview.md), [Create your own token](./create-own-token.md).
