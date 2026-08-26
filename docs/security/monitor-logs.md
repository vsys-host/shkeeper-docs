---
title: Monitor Logs
---

# Monitor Logs

## Core (`shkeeper` deployment)

```bash
kubectl logs -n shkeeper deploy/shkeeper -f
```

Invoice create/fail is logged in `payment_request` (`request` / `response`). Callbacks log the target URL with the API key redacted, HTTP status, and `[{crypto}/{txid}]`. Encryption and payout errors go here too.

## Coin wallets

Each wallet is a separate deployment, for example `ethereum-shkeeper`, `tron-shkeeper`, `bitcoin-shkeeper`. EVM wallets log scanner progress and RPC errors. Metrics (when enabled) expose last scanned vs fullnode block.

## What to watch

- Callback HTTP codes other than 202
- `payment gateway is unavailable because of lagging` when `DISABLE_CRYPTO_WHEN_LAGS` is on
- Autopayout reserve errors (`Unable to autopayout, reserved amount…`)
- `CreateContainerConfigError` on pod events — [troubleshooting](../deployment/troubleshooting/pods-createcontainerconfigerror.md)

Core SQLite lives under the instance path; Helm typically mounts a PVC on the shkeeper pod. MariaDB logs are under the `mariadb` deployment used by coin wallets.
