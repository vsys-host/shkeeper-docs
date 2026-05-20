---
sidebar_position: 1
title: Installation
---

# SHKeeper Self-Installation & Launch Guide

> This guide shows how to install and launch **SHKeeper** — the open-source crypto payment processor — on your own infrastructure.  
> It follows the official SHKeeper Knowledge Base documentation for launching and self-installation.

---

## 🔗 Important Links

- [Official SHKeeper knowledge base — launching & documentation](https://shkeeper.io/kb/start-to-work/documentation-on-launching)
- [SHKeeper website](https://shkeeper.io/)
- [Helm charts repository](https://github.com/vsys-host/helm-charts)  

---

## 📌 Overview

You can install SHKeeper using **Helm charts** if you already have a Kubernetes cluster.

This guide includes:

- Quick deployment with Helm
- Option to install on a VPS using lightweight Kubernetes (`k3s`)
- Commands and steps to get SHKeeper running

---

## 🧰 Prerequisites

Before starting, make sure you have:

- A Kubernetes environment (any conformant cluster)
- Helm 3.x installed
- Access to the cluster (`kubectl` configured)
- Optional: a VPS or dedicated server for local testing

---

## 📦 Helm Quick Install

If you already have a Kubernetes cluster:

```bash
helm repo add vsys-host https://vsys-host.github.io/helm-charts
helm repo update
helm install my-shkeeper vsys-host/shkeeper
```

This deploys SHKeeper with the chart’s default settings. Adjust the release name (`my-shkeeper`) and use `-f values.yaml` if you need custom configuration.

---

## 🖥️ Install SHKeeper on a VPS (k3s)

You can also test SHKeeper on a VPS using **k3s** — a lightweight Kubernetes distribution.

### 1) Get a VPS

Recommended: Ubuntu 20.04 or newer.

---

### 2) SSH into the server

Connect as root:

```bash
ssh root@YOUR_VPS_IP
```

### 3) Install k3s

```bash
curl -sfL https://get.k3s.io | sh -
```

Link kubeconfig for `kubectl`:

```bash
mkdir -p ~/.kube
ln -sf /etc/rancher/k3s/k3s.yaml ~/.kube/config
```

### 4) Install Helm

```bash
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### 5) Add Helm repositories

```bash
helm repo add vsys-host https://vsys-host.github.io/helm-charts
helm repo add mittwald https://helm.mittwald.de
helm repo update
```

### 6) Deploy Secret Generator

Install the Kubernetes Secret Generator (required by the SHKeeper chart):

```bash
helm install kubernetes-secret-generator mittwald/kubernetes-secret-generator
```
---

### 7) Prepare values.yaml

Create a `values.yaml` file with your custom settings before installing SHKeeper.

Example (matches the chart in [vsys-host/helm-charts](https://github.com/vsys-host/helm-charts)):

```yaml
namespace: shkeeper
domain: pay.example.com   # optional; leave "" to use LoadBalancer IP only

shkeeper:
  image: vsyshost/shkeeper:2.5.15
  enable_payout_callback: false

btc:
  enabled: true
  mainnet: true

btc_fullnode:
  enabled: false
  url: http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332
```

Adjust fields for your environment; see [Configuration](./configuration) and the chart’s [`values.yaml`](https://github.com/vsys-host/helm-charts/blob/main/charts/shkeeper/values.yaml) for all options.

---

### 8) Install SHKeeper

```bash
helm install -f values.yaml shkeeper vsys-host/shkeeper
```

This deploys SHKeeper using your configuration file.

### 9) Watch deployment

Check that pods are running (namespace may vary; use the namespace you set in the chart):

```bash
kubectl get pods -A | grep -i shkeeper
```

### 10) Access the Web UI

Once deployed, get the external address:

```bash
kubectl get svc -n shkeeper shkeeper-external
```

- If `domain` is set in `values.yaml`: open `https://your-domain/`
- Otherwise: open `http://LOAD_BALANCER_IP:5000/` (port is `shkeeper.port`, default 5000)

Complete [account registration](./account_registration) and set your admin password when prompted.

---

## 🚀 Done

You now have SHKeeper running on your infrastructure.  
For advanced configuration (domain, TLS, database, SSL), see the other guides in this documentation and the [official knowledge base](https://shkeeper.io/kb/start-to-work/documentation-on-launching).

---

## 📘 Notes

- SHKeeper syncs blockchain nodes in the background — initial access might take time.  
- Make sure your VPS has sufficient resources (CPU, RAM, storage).

---

*This guide is based on the official SHKeeper installation documentation.*
