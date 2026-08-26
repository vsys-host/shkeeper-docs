---
title: Tron Wallet Offline
---

# Tron Wallet Offline

TRX / USDT / USDC stay disabled until `trx.enabled` / `usdt.enabled` / `usdc.enabled` are true. The core talks to `tron-shkeeper` (`TRON_API_SERVER_HOST`, default host `localhost` in code, `tron-shkeeper` in Helm).

## Checklist

1. Coins enabled in `values.yaml` and wallets enabled in the dashboard.
2. `tron-shkeeper` pod running (`image: vsyshost/tron-shkeeper`).
3. RPC reachable:
   - In-cluster node: `tron_fullnode.enabled: true` (java-tron, heavy).
   - Remote: `tron_fullnode.enabled: false` and a working `url` / `solidity_url`.
4. Credentials: `{CRYPTO}_USERNAME` / `{CRYPTO}_PASSWORD` (Helm secrets).
5. Logs: `kubectl logs deploy/tron-shkeeper -n shkeeper`.

Staking / energy env vars (`ENERGY_DELEGATION_MODE`, …) go on `tron_shkeeper.extraEnv`. They do not replace a live fullnode URL. See [Tron lite vs fullnode](../../developer-guide/extensions/tron-lite-fullnode.md).
