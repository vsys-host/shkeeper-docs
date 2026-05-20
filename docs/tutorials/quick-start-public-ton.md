---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Quick Start Public Ton
---

```yaml
#
# =========================
# TON
# =========================
#

ton_fullnode:
  enabled: false
  url: https://toncenter.com/api/v2/jsonRPC
  mainnet: true
  nodeSelector: {}
  tolerations: []

ton_shkeeper:
  image: vsyshost/ton-shkeeper:0.0.3

# Native TON
ton:
  enabled: true

# USDT (TON jetton)
ton_usdt:
  enabled: true

# After saving the file, upgrade your installation using:
# helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
helm upgrade -f shkeeper-values.yaml my-shkeeper vsys-host/shkeeper
