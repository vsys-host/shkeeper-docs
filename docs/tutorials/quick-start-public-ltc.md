---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Quick Start Public Litcoin
---

```yaml
ltc:
  enabled: true
  mainnet: true
  legacy:
    enabled: false

ltc_fullnode:
  enabled: false
  image: vsyshost/litecoind:0.21.5.4
  url: http://shkeeper:shkeeper@fullnode.litecoin.shkeeper.io:80
  nodeSelector: {}
  tolerations: []

# After saving the file, upgrade your installation using:
# helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
