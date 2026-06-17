---
title: SHKeeper Database Overview
---

## How SHKeeper Stores Data

SHKeeper uses different storage layers depending on which workloads are enabled.

### 1) Core service (`shkeeper`) database

The main `shkeeper` service can run with embedded **SQLite** by default (for example `instance/shkeeper.sqlite` in standalone installs).

In Helm/Kubernetes deployments, additional components are usually enabled, so MariaDB is commonly present in the cluster too.

### 2) Coin service databases (MariaDB in Helm chart)

Many coin-specific services in the Helm deployment use **MariaDB** for operational data and indexing.

Typical examples:

- `bitcoin-shkeeper` / `litecoin-shkeeper` / `dogecoin-shkeeper`
- `ethereum-shkeeper`
- `bnb-shkeeper`
- `polygon-shkeeper`
- `avalanche-shkeeper`
- `xrp-shkeeper`
- `tron-shkeeper`

If these workloads are enabled, MariaDB is required for stable operation.

---

## Can SHKeeper run without MariaDB?

It depends on your deployment profile:

- **Standalone core-only setup** (without extra coin workloads): the main service can run with SQLite.
- **Helm production setup with multiple coins**: MariaDB is expected and should not be removed.

Removing MariaDB while coin workloads are enabled will break those services.

---

## Practical recommendation

- Use SQLite only for lightweight/local scenarios.
- Use the chart defaults (including MariaDB) for real multi-coin deployments.
- Treat MariaDB backups as part of your production backup policy when coin services are enabled.
