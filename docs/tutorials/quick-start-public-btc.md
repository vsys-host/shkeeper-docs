---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Quick Start Public Bitcoin
---

```yaml
unifiend_btc_image: vsyshost/bitcoin-shkeeper:2.0.13

btc:
  enabled: true
  mainnet: true
  legacy:
    enabled: false

btc_fullnode:
  enabled: false
  image: vsyshost/bitcoind:27.0
  url: http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332
  nodeSelector: {}
  tolerations: []

# After saving the file, upgrade your installation using:
# helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
