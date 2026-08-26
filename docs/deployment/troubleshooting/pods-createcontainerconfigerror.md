---
title: Pods CreateContainerConfigError
---

# Pods `CreateContainerConfigError`

This Kubernetes error means the pod spec references a missing Secret, ConfigMap, or env value. For the SHKeeper chart the usual causes are:

1. **`kubernetes-secret-generator` not installed.** The chart expects secrets such as `bitcoin-rpc` (`username` / `password`) with `optional: false`. Install it before the SHKeeper release:

   ```bash
   helm repo add mittwald https://helm.mittwald.de
   helm install kubernetes-secret-generator mittwald/kubernetes-secret-generator
   ```

2. **Coin enabled without its secret.** If `btc.enabled: true` but the generator never created `bitcoin-rpc` in namespace `shkeeper`, the bitcoin-shkeeper / core containers fail to start.

3. **Empty `storageClassName` on a cluster with no default class.** PVCs stay pending; related pods may not schedule.

Debug:

```bash
kubectl describe pod -n shkeeper <pod>
kubectl get secrets -n shkeeper
```

The Events section names the missing key (`secret "bitcoin-rpc" not found`).
