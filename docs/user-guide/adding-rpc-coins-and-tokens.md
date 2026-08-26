---
sidebar_position: 8
title: Adding RPC Coins and Tokens
---

# Adding RPC Coins and Tokens

SHKeeper does not load an arbitrary RPC coin from the UI. You add a module in code, enable it with env/Helm, and (for EVM tokens) register the contract on the wallet backend.

## Enable a coin that already exists

Most coins are implemented but **off** until Helm/env turns them on. Example:

```yaml
eth:
  enabled: true
eth_usdt:
  enabled: true
trx:
  enabled: true
usdt:
  enabled: true
```

That sets `ETH_WALLET=enabled`, `ETH_USDT_WALLET=enabled`, `TRX_WALLET=enabled`, `USDT_WALLET=enabled` on the core pod. BTC, LTC, and DOGE are on by default.

## Add an ERC-20 (or same-family) token

1. Add the token to `TOKENS` in the matching chain file of `ethereum_like_coin` (`app/chains/ethereum.py`, `bnb.py`, …): symbol, `contract_address`, ABI, for `main` and testnet.
2. Add a tiny class in `shkeeper.io` under `shkeeper/modules/cryptos/` that subclasses the chain class and sets `self.crypto` (see `eth-usdt.py`).
3. Enable it in Helm `values.yaml` and in `Crypto` default_off / wallet env (`ETH_FOO_WALLET=enabled`).
4. Rebuild both images and upgrade the chart.

Step-by-step: [Create your own token](../developer-guide/extensions/create-own-token.md).

## Add a new chain

That is a larger change: a `Crypto` subclass in core, a wallet service (or reuse `ethereum_like_coin` by adding a chain module), Helm deployment/service/PVC, and a `*_WALLET` flag. See [Add support for wallets](../developer-guide/extensions/add-support-wallets.md).

There is no supported path to import an external xpub-only (watch-only) Bitcoin wallet. Keys are created on your instance and encrypted there.
