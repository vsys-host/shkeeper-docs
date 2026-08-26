---
title: Tron Lite vs Fullnode
---

# Tron Lite vs Fullnode

## Wallet only (typical)

```yaml
trx:
  enabled: true
usdt:
  enabled: true
tron_fullnode:
  enabled: false
  url: http://java-tron:8090
  solidity_url: http://java-tron:8091
  mainnet: true
tron_shkeeper:
  image: vsyshost/tron-shkeeper:1.1.17
```

`tron-shkeeper` is always deployed when Tron coins are on. It uses `tron_fullnode.url` as `FULLNODE_URL`. Point `url` at a public or hosted Tron HTTP API if you do not run java-tron.

## In-cluster java-tron

```yaml
tron_fullnode:
  enabled: true
  image: vsyshost/javatron:GreatVoyage-v4.8.2.1
  extraEnv: {}
```

This starts a full Tron node (large disk, long sync). Use it only if you need an independent node.

## Staking / energy

`tron_shkeeper.extraEnv` (not the fullnode) enables energy delegation and SR voting, for example `ENERGY_DELEGATION_MODE: 1`. Details are in `shkeeper.io/docs/tron_staking.md`. `TRON_STAKING_GUI` / `TRON_MULTISERVER_GUI` on the core pod toggle dashboard screens.

Related: [Tron offline](../../deployment/troubleshooting/tron-offline.md), [Adding Tron](../../tutorials/adding-tron-support.md).
