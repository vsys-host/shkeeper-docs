---
sidebar_position: 5
title: External Nodes (RPC providers)
---

# External Nodes (RPC providers)

You can point SHKeeper wallets at any JSON-RPC (or chain-specific) endpoint: Chainstack, Infura, Alchemy, QuickNode, or your own remote node. The chart does not hard-code a provider.

## EVM chains (ETH, BNB, Polygon, Avalanche, Arbitrum, Optimism)

The wallet image (`ethereum_like_coin`, Helm `unified_evm_image`) uses `FULLNODE_URL`. Helm fills it from `eth_fullnode.url` (and the matching key for other chains) when `*_fullnode.enabled` is `false`.

```yaml
eth:
  enabled: true
eth_fullnode:
  enabled: false
  mainnet: true
  url: https://eth-mainnet.example.com/YOUR_KEY
```

Optional wallet extras go in `ethereum_shkeeper.extraEnv` (or `bnb_shkeeper.extraEnv`, …):

```yaml
ethereum_shkeeper:
  extraEnv:
    FULLNODE_TIMEOUT: "60"
    CHECK_NEW_BLOCK_EVERY_SECONDS: "2"
```

## Bitcoin-like (BTC, LTC, DOGE)

Pass a bitcoind-compatible RPC URL:

```yaml
btc:
  enabled: true
btc_fullnode:
  enabled: false
  url: http://user:pass@your-btc-rpc.example.com:8332
```

## Solana and TON

Defaults in `values.yaml` are placeholders. You must set a real RPC:

```yaml
sol:
  enabled: true
solana_fullnode:
  enabled: false
  mainnet: true
  url: https://your-solana-rpc.example.com
```

## Notes

- `mainnet: false` switches wallet network env to testnet (for example Ethereum Sepolia in `ethereum_like_coin`).
- If `DISABLE_CRYPTO_WHEN_LAGS` is set on the core, invoice creation fails while the backend is not `Synced`.
- Provider rate limits show up as scanner lag or RPC timeouts (`FULLNODE_TIMEOUT`).
