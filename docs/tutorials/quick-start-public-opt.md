---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Quick Start Public Optimism
---

```yaml
optimism_fullnode:
  enabled: false
  url: https://opt-mainnet.g.alchemy.com/v2/YOUR_API_KEY
  mainnet: true
  nodeSelector: {}
  tolerations: []

optimism_shkeeper:
  image: vsyshost/optimism-shkeeper:0.0.2

# Native ETH (Optimism)
opeth:
  enabled: true

# Arbitrary ERC20
op_token:
  enabled: false

# Stable-coin
op_usdc:
  enabled: true

op_usdt:
  enabled: true

# After saving the file, upgrade your installation using:
# helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
