---
sidebar_position: 3
title: Environment Variables
---

# Environment Variables

SHKeeper core (`shkeeper.io`) reads these variables at startup. In Helm, set extra keys with `shkeeper.extraEnv` in `values.yaml`. Coin wallets are enabled by `*_WALLET=enabled` (the chart sets this from `btc.enabled`, `eth.enabled`, and so on).

## Core application

| Variable | Default | Meaning |
|---|---|---|
| `SECRET_KEY` | random at start | Flask session key. Regenerating it logs everyone out. |
| `FORCE_WALLET_ENCRYPTION` | unset | Any **non-empty** value is treated as true (`bool(os.environ.get(...))`). |
| `UNCONFIRMED_TX_NOTIFICATION` | unset | Any non-empty value enables unconfirmed-tx callbacks (`status: unconfirmed`). |
| `REQUESTS_TIMEOUT` | `10` | Timeout (seconds) for outbound HTTP to coin backends. |
| `MAX_RETRIES` | `7` | Max retries for **payout** callback notifications (`REQUESTS_NOTIFICATION_RETRIES`). |
| `REQUESTS_NOTIFICATION_TIMEOUT` | `30` | Timeout (seconds) when posting invoice/payout webhooks. |
| `ENABLE_PAYOUT_CALLBACK` | unset | Any non-empty value enables payout success webhooks. Helm sets this from `shkeeper.enable_payout_callback`. |
| `MIN_CONFIRMATION_BLOCK_FOR_PAYOUT` | `1` | Confirmations required before a payout is marked `SUCCESS`. |
| `NOTIFICATION_TASK_DELAY` | `60` | Seconds to wait after a confirmed tx before sending the invoice callback. |
| `DISABLE_CRYPTO_WHEN_LAGS` | unset | Any non-empty value rejects `payment_request` / `quote` if the backend is not `Synced`. |
| `EXTRA_CURRENCIES` | empty | Extra ISO 4217 codes besides `USD` and `EUR` (example: `TRY,CAD`). |
| `DEV_MODE` | unset | Any non-empty value enables development mode (`SECRET_KEY=dev`). Do not use in production. |
| `DEV_MODE_ENC_PW` | unset | Optional encryption password used only in `DEV_MODE`. |
| `TRON_MULTISERVER_GUI` | unset | Any non-empty value shows the Tron multi-server UI. |
| `TRON_STAKING_GUI` | unset | Any non-empty value shows the Tron staking UI. |
| `METRICS_USERNAME` / `METRICS_PASSWORD` | `shkeeper` / `shkeeper` | Basic auth for metrics. |

Wallet enable flags follow the class name in uppercase plus `_WALLET`. Examples: `ETH_WALLET=enabled`, `USDT_WALLET=enabled`, `BTC-LIGHTNING` uses `BITCOINLIGHTNING_WALLET` via the class name `BitcoinLightning`. BTC, LTC, and DOGE are on by default; other coins stay off until the flag is `enabled`.

## Coin backend hosts (core → wallet service)

The API talks to per-coin services over HTTP Basic Auth. Host/port/user/password env vars:

| Coin family | Host | Port | User / password |
|---|---|---|---|
| Bitcoin-like | `{CRYPTO}_NGINX_URL` or backend host | — | `{CRYPTO}_USERNAME` / `{CRYPTO}_PASSWORD` |
| Ethereum | `ETHEREUM_API_SERVER_HOST` | `ETHEREUM_SERVER_PORT` (`6000`) | `ETH_USERNAME` / `ETH_PASSWORD` |
| Tron | `TRON_API_SERVER_HOST` | `TRON_API_SERVER_PORT` (`6000`) | `{CRYPTO}_USERNAME` / `{CRYPTO}_PASSWORD` |
| BNB / Polygon / Avalanche / Arbitrum / Optimism / Solana / TON | `{CHAIN}_API_SERVER_HOST` | `{CHAIN}_SERVER_PORT` | matching `*_USERNAME` / `*_PASSWORD` |
| Monero | `MONERO_DAEMON_HOST`, `MONERO_WALLET_RPC_HOST` | daemon/RPC ports | `MONERO_*_USER` / `MONERO_*_PASS` |

Default username and password for most backends is `shkeeper` / `shkeeper`. Helm injects RPC secrets from `kubernetes-secret-generator` (for example `bitcoin-rpc`).

## EVM wallet service (`ethereum_like_coin`)

Set on the `*-shkeeper` pods (ETH, BNB, Polygon, Avalanche, Arbitrum, Optimism):

| Variable | Meaning |
|---|---|
| `WALLET` or `COIN_SYMBOL` | Active coin (`ETH`, `BNB`, `MATIC`, `AVAX`, `ARBETH`, `OPETH`). Required. |
| `FULLNODE_URL` | RPC endpoint. |
| `FULLNODE_TIMEOUT` | RPC timeout seconds (default `60`). |
| `CHECK_NEW_BLOCK_EVERY_SECONDS` | Scanner interval (default `2`). |
| `SHKEEPER_BACKEND_KEY` | Shared key with the core (`SHKEEPER_KEY` inside the wallet). |
| `SHKEEPER_HOST` | Core host (default `shkeeper:5000`). |
| `MULTIPLIER` / `PAYOUT_MULTIPLIER` / `PRICE_MULTIPLIER` | Gas/price multipliers. |
| `SQLALCHEMY_DATABASE_URI` | MariaDB DSN for that wallet. |

Tron staking variables live on `tron-shkeeper` (`ENERGY_DELEGATION_MODE`, `SR_VOTING`, …). See the Tron staking notes in the core repo (`docs/tron_staking.md`).

Related: [Helm configuration](../getting-started/configuration.md), [Payouts disabled](../tutorials/helm_configs/payouts_disabled.md).
