---
sidebar_position: 2
title: SHKeeper Helm Configuration
sidebar_label: Configuration
---

# SHKeeper Helm Configuration

This document explains how to configure and deploy **SHKeeper** using the official Helm chart from [vsys-host/helm-charts](https://github.com/vsys-host/helm-charts). The chart structure matches `charts/shkeeper/values.yaml` in that repository.

## Prerequisites

Before you start, make sure you have:

- A Kubernetes cluster (for example k3s, GKE, AKS, EKS)
- Helm 3.x installed
- `kubectl` configured to access your cluster
- **kubernetes-secret-generator** installed (required by the chart for RPC credentials)

```bash
helm repo add mittwald https://helm.mittwald.de
helm repo update
helm install kubernetes-secret-generator mittwald/kubernetes-secret-generator
```

---

## Add Helm repository and install

```bash
helm repo add vsys-host https://vsys-host.github.io/helm-charts
helm repo update
helm search repo vsys-host/shkeeper
```

Install with defaults:

```bash
helm install my-shkeeper vsys-host/shkeeper
```

Install or upgrade with a custom `values.yaml`:

```bash
helm install my-shkeeper vsys-host/shkeeper -f values.yaml
helm upgrade my-shkeeper vsys-host/shkeeper -f values.yaml
```

Uninstall:

```bash
helm uninstall my-shkeeper
```

`my-shkeeper` is the release name; you can use any name.

---

## `values.yaml` structure

The chart does **not** use generic keys such as `replicaCount`, `image.repository`, `service.type`, `persistence`, `resources`, `polling_interval`, or `confirmations`. Configuration is grouped as follows.

### General

| Key | Default | Description |
|-----|---------|-------------|
| `namespace` | `shkeeper` | Kubernetes namespace for all chart resources |
| `external_ip` | `0.0.0.0` | Used by Bitcoin Lightning (LND) when enabled |
| `domain` | `""` | If set, creates Traefik Ingress with TLS for HTTPS access |
| `storageClassName` | (empty) | Storage class for PVCs; cluster default if empty |
| `dev.imagePullSecrets` | (empty) | Optional image pull secrets for private registries |

### SHKeeper application

| Key | Default | Description |
|-----|---------|-------------|
| `shkeeper.image` | `vsyshost/shkeeper:2.5.15` | Main SHKeeper container image |
| `shkeeper.port` | `5000` | Port exposed on the `shkeeper-external` LoadBalancer |
| `shkeeper.enable_payout_callback` | `false` | Sets `ENABLE_PAYOUT_CALLBACK=enabled` in the deployment when `true` |

Payout callback URLs and secrets are configured in the SHKeeper UI or API after deployment, not in Helm values. There is no `payout_callback.url` or `payout_callback.secret` in the chart.

The main deployment always runs with **1 replica** and strategy **Recreate** (not configurable via values).

### Bitcoin (BTC, LTC, DOGE)

| Key | Description |
|-----|-------------|
| `unifiend_btc_image` | Image for bitcoin-shkeeper, litecoin-shkeeper, and dogecoin-shkeeper workloads |
| `btc.enabled`, `btc.mainnet`, `btc.regtest`, `btc.legacy.enabled` | Bitcoin wallet and legacy node |
| `btc_fullnode.enabled`, `btc_fullnode.url`, `btc_fullnode.image` | Optional local or remote Bitcoin full node |
| `ltc.*`, `ltc_fullnode.*` | Litecoin (same pattern) |
| `doge.*`, `doge_fullnode.*` | Dogecoin (same pattern) |

### Other networks

Each chain has `enabled` flags and optional `*_fullnode` / `*_shkeeper` sections. Examples:

- **Tron:** `trx`, `usdt`, `usdc`, `tron_fullnode`, `tron_shkeeper`
- **Ethereum:** `eth`, `eth_usdt`, `eth_usdc`, `eth_pyusd`, `eth_dai`, `eth_fullnode`, `ethereum_shkeeper`
- **BNB, XRP, Polygon, Avalanche, Solana, Arbitrum, Optimism, TON, Monero, Firo**
- **Bitcoin Lightning:** `btc_lightning` (LND, RTL, LNbits)
- **AML:** `aml`, `aml_shkeeper`

See the full list in the chart’s [`values.yaml`](https://github.com/vsys-host/helm-charts/blob/main/charts/shkeeper/values.yaml).

---

## Example `values.yaml`

Minimal override: enable Ethereum with a public full node and HTTPS via domain:

```yaml
namespace: shkeeper
domain: pay.example.com

shkeeper:
  image: vsyshost/shkeeper:2.5.15
  enable_payout_callback: false

eth_fullnode:
  enabled: false
  mainnet: true
  url: https://fullnode.ethereum.shkeeper.io:8645

eth:
  enabled: true
eth_usdt:
  enabled: true
```

Bitcoin using the public full node (default in the chart):

```yaml
unifiend_btc_image: vsyshost/bitcoin-shkeeper:2.0.13

btc:
  enabled: true
  mainnet: true

btc_fullnode:
  enabled: false
  url: http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332
```

---

## Networking and access

The chart creates two Services for SHKeeper:

| Service | Type | Purpose |
|---------|------|---------|
| `shkeeper` | ClusterIP | Internal access on port 5000 |
| `shkeeper-external` | LoadBalancer | External access on `shkeeper.port` (default 5000) |

**Without a domain** — get the LoadBalancer IP:

```bash
kubectl get svc -n shkeeper shkeeper-external
```

Open `http://EXTERNAL-IP:5000/` (use your namespace if you changed `namespace`).

**With `domain` set** — the chart creates an Ingress (Traefik, TLS via cert resolver). Open `https://your-domain/`. Requires Traefik and certificate setup (see [Auto SSL](./auto-ssl)).

There is no `service.type` value in `values.yaml`; LoadBalancer is always created as `shkeeper-external`.

---

## Important notes

- SHKeeper is **watch-only**; private keys are not stored in the chart.
- Enabling a coin deploys the corresponding *-shkeeper workload and, when `*_fullnode.enabled: true`, a full node with PVCs.
- Use `storageClassName` if your cluster needs a non-default storage class for persistent volumes.
- Multiple isolated instances: separate Helm releases and/or namespaces (see chart defaults: single replica, one PVC at `/shkeeper.io/instance`).
- After install, complete [account registration](./account_registration) in the web UI.
- For per-chain examples, see [Quick start tutorials](../tutorials/quick-start-public-btc) in the Tutorials section.

---

## Summary

1. Install **kubernetes-secret-generator**, then add the **vsys-host** Helm repo.
2. Create `values.yaml` using the chart’s real keys (`shkeeper`, `btc`, `eth`, `*_fullnode`, etc.).
3. `helm install` or `helm upgrade` with `-f values.yaml`.
4. Access via `shkeeper-external` LoadBalancer or `https://` when `domain` is configured.
5. Configure payout callbacks and wallets in the SHKeeper UI after deployment.
