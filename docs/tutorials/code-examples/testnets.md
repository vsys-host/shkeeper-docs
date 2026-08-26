---
title: Testnets
---

# Testnets

Set `mainnet: false` on the chain’s fullnode block so the wallet process selects the test network (Ethereum: Sepolia via `ethereum_like_coin` `network_default`).

```yaml
btc:
  enabled: true
  mainnet: false
  regtest: false

eth:
  enabled: true
eth_fullnode:
  enabled: false
  mainnet: false
  url: https://your-sepolia-rpc.example.com

trx:
  enabled: true
tron_fullnode:
  enabled: false
  mainnet: false
  url: https://your-nile-or-shasta-http-api
```

Token contracts on EVM come from the testnet map in `app/chains/*.py`. Rates still come from live exchanges unless you set the wallet rate source to **manual**.

`btc.regtest: true` is a separate Bitcoin mode for local daemon testing.

Public demo: https://demo.shkeeper.io/ (`admin` / `admin`) — testnet, not mainnet funds.

Related: [Ethereum testnet](../../deployment/troubleshooting/eth-testnet-sync.md).
