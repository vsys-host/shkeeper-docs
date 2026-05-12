---
sidebar_position: 2
title: SHKeeper Helm Configuration
sidebar_label: Configuration
---

# SHKeeper Helm Configuration

This document explains how to configure and deploy **SHKeeper** using the official Helm chart. SHKeeper is a self-hosted, watch-only cryptocurrency processor.

## 🧰 Prerequisites

Before you start, make sure you have:

- A Kubernetes cluster (e.g., k3s, GKE, AKS, EKS)  
- Helm CLI installed  
- (Optional) kubectl configured to access your cluster  

> ℹ️ These are the minimum requirements to deploy SHKeeper using Helm charts.

---

## 📦 Add Helm Repository and Install SHKeeper

Add the official repository and update it:

```bash
helm repo add vsys-host https://vsys-host.github.io/helm-charts
helm repo update
```

Search for SHKeeper charts:

```bash
helm search repo vsys-host
```

Install SHKeeper:

```bash
helm install my-shkeeper vsys-host/shkeeper
```

To uninstall:

```bash
helm delete my-shkeeper
```

> ℹ️ `my-shkeeper` is the release name. You can change it to any name you prefer.

---

## ⚙️ Configure `values.yaml`

Create a `values.yaml` file with your configuration:

```yaml
replicaCount: 1
image:
  repository: vsys-host/shkeeper
  tag: latest
  pullPolicy: IfNotPresent
service:
  type: LoadBalancer
  port: 5000
btc:
  enabled: true
eth:
  enabled: true
ltc:
  enabled: true
doge:
  enabled: false
enable_payout_callback: true
payout_callback:
  url: "https://yourapp.com/webhook"
  secret: "YOUR_SECRET"
persistence:
  enabled: true
  storageClass: "standard"
  size: 10Gi
resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi
polling_interval: 30
confirmations:
  bitcoin: 6
  ethereum: 12
  tron: 20
```

> ℹ️ Customize fields as needed: enable/disable coins, webhook, resources, etc.

---

## 🚀 Deploy with Custom `values.yaml`

Install SHKeeper using your custom configuration:

```bash
helm install my-shkeeper vsys-host/shkeeper -f values.yaml
```

Upgrade later:

```bash
helm upgrade my-shkeeper vsys-host/shkeeper -f values.yaml
```

---

## 🌐 Access SHKeeper

Get the external IP of the service:

```bash
kubectl get svc
```

Open in your browser:

`http://EXTERNAL-IP:5000/`

> ℹ️ Replace `EXTERNAL-IP` with the actual service IP. Do not use angle brackets `< >` in Markdown.

---

## ❗ Important Notes

- SHKeeper is **watch-only**, private keys are never stored.  
- Multiple instances can run using different `values.yaml` and release names.  
- Default login is usually `admin`; change your password in the UI.  
- If the webhook (`enable_payout_callback`) is enabled, your endpoint must accept secure POST requests.  
- The Helm chart automatically deploys required coin daemons.  
- Adjust resources, `polling_interval`, and `confirmations` according to your environment.

---

## 📌 Summary

1. Add the Helm repository and update  
2. Create a custom `values.yaml`  
3. Install or upgrade SHKeeper using `helm install` / `helm upgrade`  
4. Check the service with `kubectl get svc`  
5. Open the dashboard via IP and port  
6. (Optional) Configure webhook

> ℹ️ This Helm-based deployment fully replaces legacy local YAML configs and allows SHKeeper to run securely and standardized on Kubernetes.