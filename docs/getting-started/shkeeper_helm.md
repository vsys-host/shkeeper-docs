---
# id is optional; using filename-based id. Keep frontmatter simple.
title: SHKeeper Helm
---

# What is SHKeeper Helm

SHKeeper Helm is a convenient deployment package designed to simplify the installation of SHKeeper and its required cryptocurrency daemons on a Kubernetes cluster. Using Helm, you can quickly deploy SHKeeper and its dependencies with minimal manual setup.
---

## 🚀 Overview

SHKeeper Helm is a **Helm chart** that automates the deployment of SHKeeper and its supported blockchain daemons (such as Bitcoin, Litecoin, and Dogecoin) for you. When installed using Helm, the chart sets up all necessary components in a Kubernetes environment so that SHKeeper is ready to run.
---

## 📦 What the Helm Chart Installs

After deploying the SHKeeper Helm chart, your cluster runs the **SHKeeper application** and, depending on your `values.yaml`, **cryptocurrency daemons** for the coins you enable (for example Bitcoin, Litecoin, Ethereum). Each component runs as its own workload (Deployment, StatefulSet, and so on).

For a detailed deployment reference, see the [Helm chart](../deployment/helm-chart) page.
---

## ⚙️ Prerequisites

Before deploying SHKeeper using Helm, make sure you have:

- A working Kubernetes cluster (e.g., k3s, GKE, EKS)
- `kubectl` installed and configured to access the cluster
- `helm` installed on your local system or CI environment

These tools allow Helm to communicate with your cluster and deploy the chart.
---

## 🛠 Installation

Use the chart published in the VSYS Host Helm repository (no separate Git clone is required):

```bash
helm repo add vsys-host https://vsys-host.github.io/helm-charts
helm repo update
helm install my-shkeeper vsys-host/shkeeper
```

Optional: create a `values.yaml` and install with `helm install my-shkeeper vsys-host/shkeeper -f values.yaml`.

For a full walkthrough (k3s on a VPS, Secret Generator, custom values), see [Installation](./installation) and [Configuration](./configuration).
