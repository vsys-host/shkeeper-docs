---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Helm Chart
---

# ⛵ Helm Chart

## 🧠 Overview

A Helm chart is a package that defines, installs, and manages Kubernetes applications. It allows you to describe the structure of your application, its services, deployments, configurations, and dependencies in a reusable and versioned format. Helm charts simplify deploying complex applications consistently across environments.

---

## 🔧 Key Concepts

- **Chart:** A collection of files that describe a related set of Kubernetes resources.  
- **Release:** A specific deployment of a chart in a Kubernetes cluster.  
- **Values:** Configuration parameters that can be customized per deployment.  
- **Templates:** Kubernetes manifests that are parameterized with values from the chart.  
- **Dependencies:** Other charts or services required for your application to function.

For SHKeeper, values are defined in [`charts/shkeeper/values.yaml`](https://github.com/vsys-host/helm-charts/blob/main/charts/shkeeper/values.yaml) (keys such as `shkeeper.image`, `btc.enabled`, `eth_fullnode.url`, `domain`). See [Configuration](../getting-started/configuration) for a field-by-field guide.

---