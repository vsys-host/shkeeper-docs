---
title: Adding Tron Support
---

# Adding Tron Support

```yaml
trx:
  enabled: true
usdt:
  enabled: true
usdc:
  enabled: false

tron_fullnode:
  enabled: false
  mainnet: true
  url: http://java-tron:8090
  solidity_url: http://java-tron:8091

tron_shkeeper:
  image: vsyshost/tron-shkeeper:1.1.17
```

`helm upgrade -f values.yaml my-shkeeper vsys-host/shkeeper`. Core gets `TRX_WALLET=enabled` and `USDT_WALLET=enabled`. Invoice cryptos are `TRX` and `USDT` (TRC-20).

Use a reachable Tron HTTP API in `url` if you do not run java-tron (`tron_fullnode.enabled: true` is the heavy option).

Optional staking:

```yaml
tron_shkeeper:
  extraEnv:
    ENERGY_DELEGATION_MODE: 1
```

Related: [Quick start public Tron](./quick-start-public-tron.md), [Tron lite vs fullnode](../developer-guide/extensions/tron-lite-fullnode.md).
