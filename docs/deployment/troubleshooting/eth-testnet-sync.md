---
title: Ethereum Testnet Sync
---

# Ethereum Testnet Sync

Helm `eth_fullnode.mainnet: false` (and the matching flag on `ethereum_shkeeper` via that value) selects the testnet network in `ethereum_like_coin` (default network name `sepolia`). Token contracts then come from `TOKENS["sepolia"]` instead of `TOKENS["main"]`.

```yaml
eth:
  enabled: true
eth_usdt:
  enabled: true
eth_fullnode:
  enabled: false
  mainnet: false
  url: https://your-sepolia-rpc.example.com
```

Use a Sepolia RPC, not mainnet. Invoice amounts and rates still use production rate sources (Binance, …) unless you switch the wallet rate to **manual** in the dashboard.

Demo at https://demo.shkeeper.io/ is a testnet-style environment; do not send mainnet funds there.
