---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Quick Start Public Arbitrum
---

```yaml
arb_fullnode:
  enabled: false
  url: https://arb-mainnet.g.alchemy.com/v2/YOUR_API_KEY
  mainnet: true
  nodeSelector: {}
  tolerations: []

arbitrum_shkeeper:
  image: vsyshost/arbitrum-shkeeper:0.0.1

# Native ETH (Arbitrum)
arbeth:
  enabled: true

# Arbitrary ERC20
arb_token:
  enabled: false

# Stable
arb_usdc:
  enabled: true

arb_usdt:
  enabled: true

arb_pyusd:
  enabled: false


# After saving the file, upgrade your installation using:
# helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
