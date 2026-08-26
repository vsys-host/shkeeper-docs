---
sidebar_position: 4
title: Public Fullnodes
---

# Public Fullnodes

The Helm chart can either deploy an in-cluster node (`*_fullnode.enabled: true`) or point the wallet at an RPC URL.

## Bitcoin, Litecoin, Dogecoin

When `btc_fullnode.enabled` is **false**, `FULLNODE_URL` is `btc_fullnode.url`. Chart default:

`http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332`

When `btc_fullnode.enabled` is **true**, the chart deploys a bitcoind pod and sets `FULLNODE_URL` to `http://shkeeper:shkeeper@bitcoin-fullnode:8332`.

LTC/DOGE follow the same `url` key when the in-cluster fullnode flag is off. Default URLs:

| Chain | Default `url` (fullnode off) |
|---|---|
| Bitcoin | `http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332` |
| Litecoin | `http://shkeeper:shkeeper@fullnode.litecoin.shkeeper.io:80` |
| Dogecoin | `http://shkeeper:shkeeper@fullnode.dogecoin.shkeeper.io` |

Bitcoin Lightning LND uses `BITCOIND_RPCHOST` / ZMQ on `fullnode.bitcoin.shkeeper.io` (ports `28334` / `28335`) unless you override `btc_lightning.lnd` values.

## EVM and other chains

Ethereum, BNB, Polygon, Avalanche, Arbitrum, Optimism, Tron, XRP always pass `*_fullnode.url` into the wallet as `FULLNODE_URL`, whether or not the chart starts a fullnode pod.

Chart **defaults** for those `url` fields are in-cluster DNS names (`http://ethereum:8545`, `http://java-tron:8090`, …). They only work if you also enable the matching `*_fullnode.enabled: true` pod. For public RPC, set `url` explicitly, for example:

```yaml
eth:
  enabled: true
eth_fullnode:
  enabled: false
  mainnet: true
  url: https://fullnode.ethereum.shkeeper.io:8645
```

Solana and TON defaults in `values.yaml` are placeholders; you must set a real RPC.

Related: [External nodes](./external-nodes-chainstack.md), [Low-resource VPS](../deployment/troubleshooting/low-resource-vps.md), [Quick start public Ethereum](../tutorials/quick-start-public-eth.md).
