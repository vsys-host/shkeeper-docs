---
title: SHKeeper Overview
sidebar_label: Overview
sidebar_position: 1
---

# SHKeeper Overview

**SHKeeper** is a self-hosted, **non-custodial cryptocurrency payment processor** that allows merchants and applications to accept crypto payments directly into wallets on **your** deployment.

It tracks transactions for supported cryptocurrencies, generates invoices with unique deposit addresses, and provides payment callbacks to merchant systems. SHKeeper can connect to **full blockchain nodes** or use external nodes for transaction verification.

---

## Watch-only mode & private keys

**Watch-only mode** means SHKeeper **monitors** the blockchain to detect and confirm incoming payments. It does not hold customer funds as a third-party custodian—payments are credited to wallets you operate on your instance.

| Term | Meaning in SHKeeper |
|------|---------------------|
| **Watch-only (processor)** | Observes the chain and verifies deposits; no external custodian |
| **Non-custodial** | Self-hosted; you control infrastructure, encryption password, and funds |
| **Private keys** | Created at registration, **encrypted** in your database (AES-256), **never stored in plain text** |
| **Not supported** | Importing external Bitcoin-style watch-only wallets (xpub / view-key only) — see [FAQ](/docs/faqs#lite-wallets-supported) |

Helm charts and default install configs do **not** ship wallet private keys; you complete [wallet setup](/docs/getting-started/wallet_setup) in the UI after deployment. For encryption details, see [Encrypt wallet data](/docs/security/encrypt-wallet-dat).

---

## Supported Coins

SHKeeper currently supports the following cryptocurrencies:

- **Bitcoin (BTC)**  
- **Ethereum (ETH)**  
- **Litecoin (LTC)**  
- **Dogecoin (DOGE)**  
- **Monero (XMR)**  
- **Ripple (XRP)**  
- **TRON (TRX)**  
- **Binance Coin (BNB)**  
- **Polygon (MATIC)**  
- **Avalanche (AVAX)**  
- **Firo (FIRO)**  
- **Tether (USDT)** — ERC20, TRC20, BEP‑20, Polygon, Avalanche  
- **USD Coin (USDC)** — ERC20, TRC20, BEP‑20, Polygon, Avalanche

> ℹ️ Only these coins are supported for deposits and monitoring. Wallet keys stay on **your** instance (encrypted); SHKeeper does not act as a third-party custodian.

---

## Key Features

- 🔑 **Watch-only & Non-custodial** — monitors incoming payments on your deployment; wallet keys are encrypted with your password and never stored in plain text.  
- 💰 **Multi-currency support** — handle multiple supported coins in a single platform.  
- 🛠️ **REST API** — create invoices, check balances, manage payouts, and handle webhook callbacks.  
- 📊 **Dashboard** — manage merchants, wallets, and transaction history.  
- 🚀 **Scalable Deployment** — supports Docker and Kubernetes (Helm charts) for production-ready environments.

---

## Payment Flow

1. Merchant or client requests supported cryptocurrencies.  
2. SHKeeper generates an invoice with a unique deposit address.  
3. User sends crypto to the invoice address.  
4. SHKeeper monitors the blockchain and verifies the payment.  
5. Callback notifies the merchant system about the payment status.

---

## Deployment Overview

- **API Service** — receives requests from merchants and applications.  
- **Wallet Daemons** — monitor blockchain networks for incoming payments.  
- **Optional Fullnode Connectors** — for running your own nodes instead of relying on external nodes.  
- **Docker / Kubernetes (Helm Charts)** — recommended for scalable, production-ready deployment.

> ℹ️ SHKeeper is designed to be **secure, flexible, and fully self-hosted**, giving merchants full control over crypto payments without relying on third-party custodians.
