---
sidebar_position: 4
title: Public Fullnodes
---

# Public Fullnodes

By default the Helm chart **does not** run your own Bitcoin/Ethereum/Tron nodes. Wallet pods connect to public RPC URLs in `values.yaml`.

When `*_fullnode.enabled` is `false`, the chart still passes `url` to the wallet service. Those defaults are VSYS-hosted public endpoints, for example:

| Chain | Default `url` when the in-cluster fullnode is off |
|---|---|
| Bitcoin | `http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332` |
| Litecoin | `http://shkeeper:shkeeper@fullnode.litecoin.shkeeper.io:80` |
| Dogecoin | `http://shkeeper:shkeeper@fullnode.dogecoin.shkeeper.io` |
| Ethereum | `http://ethereum:8545` (override with `eth_fullnode.url`) |
| Tron | `http://java-tron:8090` (`tron_fullnode.url` / `solidity_url`) |
| XRP | `http://xrp:51234` |
| Polygon | `http://polygon:51234` |
| Avalanche | `http://avalanche:9650/ext/bc/C/rpc` |
| Solana / TON | placeholder URLs — you must set a real RPC |

Bitcoin Lightning uses the same Bitcoin public node for LND (`BITCOIND_RPCHOST`, ZMQ ports `28334` / `28335`).

## Enable your own node

```yaml
eth:
  enabled: true
eth_fullnode:
  enabled: true
  mainnet: true
  url: http://ethereum:8545
```

When `enabled: true`, the chart deploys a fullnode pod and PVC. Initial sync can take a long time and needs disk. For a small VPS, keep fullnodes off and use public or third-party RPC instead — see [Low-resource VPS](../deployment/troubleshooting/low-resource-vps.md) and [External nodes](./external-nodes-chainstack.md).

Per-coin Helm snippets: [Tutorials](/docs/category/tutorials-and-examples).
