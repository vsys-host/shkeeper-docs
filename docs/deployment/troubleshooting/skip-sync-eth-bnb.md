---
title: Skip Local ETH/BNB Sync
---

# Skip Local ETH/BNB Sync

Running `eth_fullnode.enabled: true` or `bnb_fullnode.enabled: true` starts an in-cluster geth-style node and a PVC. First sync can take days.

To skip that, keep the fullnode off and set `url` to a public or provider RPC (this is the chart default):

```yaml
eth:
  enabled: true
eth_fullnode:
  enabled: false
  mainnet: true
  url: https://your-eth-rpc.example.com

bnb:
  enabled: true
bnb_fullnode:
  enabled: false
  mainnet: true
  url: https://your-bsc-rpc.example.com
```

The `evm-shkeeper` pod still runs; it only talks to RPC (`FULLNODE_URL`). Same pattern for Polygon, Avalanche, Arbitrum, and Optimism.

See [Public fullnodes](../../user-guide/public-fullnodes.md) and [External nodes](../../user-guide/external-nodes-chainstack.md).
