---
title: Low-Resource VPS
---

# Low-Resource VPS

A small VPS can run SHKeeper if you **do not** enable in-cluster fullnodes. Fullnodes (Bitcoin, Ethereum, Tron java-tron, Monero, Arbitrum, …) need large disks and RAM.

Recommended `values.yaml` for a light host:

- Enable only the coins you need (`btc.enabled`, `eth.enabled`, …).
- Keep every `*_fullnode.enabled: false` and point `url` at public or provider RPC.
- Leave `btc_lightning.enabled: false` unless you have a public IP, `domain`, and extra ports (LND p2p, LNURL 9000).
- Leave `monero.fullnode.enabled: false` unless you size the node separately.
- Use `storageClassName` that exists on the cluster (`local-path` on k3s).

BTC/LTC/DOGE default to on in the chart; set `enabled: false` for coins you will not use.

Related: [Skip ETH/BNB sync](./skip-sync-eth-bnb.md), [Requirements](../../getting-started/requirements.md).
