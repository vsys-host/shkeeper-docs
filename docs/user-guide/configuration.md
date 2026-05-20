---
sidebar_position: 2
title: SHKeeper Helm Configuration
---

# SHKeeper Helm Configuration

This page is a short reference for the official SHKeeper Helm chart. For the full guide (prerequisites, examples, access, SSL), see [Getting started — Configuration](../getting-started/configuration).

The chart source of truth is [`charts/shkeeper/values.yaml`](https://github.com/vsys-host/helm-charts/blob/main/charts/shkeeper/values.yaml) in the vsys-host/helm-charts repository.

---

## Install

```bash
helm repo add vsys-host https://vsys-host.github.io/helm-charts
helm repo update
helm install my-shkeeper vsys-host/shkeeper -f values.yaml
```

---

## Main value groups

**Cluster / access**

- `namespace` — default `shkeeper`
- `domain` — if non-empty, enables HTTPS Ingress (Traefik)
- `storageClassName` — PVC storage class
- `external_ip` — for Bitcoin Lightning

**SHKeeper app**

```yaml
shkeeper:
  image: vsyshost/shkeeper:2.5.15
  port: 5000
  enable_payout_callback: false
```

**Coins** — enable wallets with top-level flags, for example:

```yaml
btc:
  enabled: true
  mainnet: true
eth:
  enabled: true
trx:
  enabled: true
usdt:
  enabled: true
```

**Full nodes** — use public RPC or run your own:

```yaml
btc_fullnode:
  enabled: false
  url: http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332
eth_fullnode:
  enabled: false
  url: https://fullnode.ethereum.shkeeper.io:8645
  mainnet: true
```

**Images** — chain-specific images are top-level keys, for example `unifiend_btc_image`, `ethereum_shkeeper.image`, `tron_shkeeper.image`, not `image.repository` under a generic `image` block.

---

## Not supported in Helm values

These appear in older docs but are **not** in the chart:

- `replicaCount`, `image.repository`, `image.tag`, `pullPolicy`
- `service.type`, `service.port` (use `shkeeper.port`; LoadBalancer service is fixed)
- `persistence.enabled` / `size` (PVCs are created per component by templates)
- `resources.limits` / `requests`
- `polling_interval`, `confirmations`
- `payout_callback.url`, `payout_callback.secret` (configure in SHKeeper after deploy)

---

## Access

```bash
kubectl get svc -n shkeeper shkeeper-external
```

Browser: `http://LOAD_BALANCER_IP:5000/` or `https://your-domain/` when `domain` is set.

---

## Related

- [Installation](../getting-started/installation)
- [SHKeeper Helm overview](../getting-started/shkeeper_helm)
- [Auto SSL](../getting-started/auto-ssl)
