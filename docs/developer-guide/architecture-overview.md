---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Architecture Overview
---

# Architecture Overview

**SHKeeper** is built as a modular, self-hosted cryptocurrency payment system designed to run in a containerized environment. Its architecture separates payment logic, blockchain interaction, and infrastructure components to ensure reliability and flexible deployments.

At the core of the system is the **SHKeeper API**, which exposes REST endpoints for creating invoices, managing wallets, tracking payments, and handling payouts. This API is the main integration point for merchant applications and external services.

For blockchain interaction, SHKeeper uses **wallet services and blockchain connectors**. In Kubernetes deployments this usually means:
- the main `shkeeper` service (`shkeeper.io`) for API/UI and payment orchestration;
- coin-specific services (for example `bitcoin-shkeeper` for BTC/LTC/DOGE on-chain flows);
- optional fullnode services or external/public nodes, depending on your values configuration.

`bitcoin-shkeeper` handles UTXO chains (BTC/LTC/DOGE) via node RPC and background workers. Bitcoin Lightning is a separate module (`BTC-LIGHTNING`) and should be documented/configured independently.

The system is typically deployed on **Kubernetes using Helm charts**. Each major component (API, wallets, fullnode connectors, background workers) runs in its own container or pod, which allows independent scaling and isolation. Kubernetes also manages networking, secrets, and service discovery between components.

### High-Level Components

- **SHKeeper API & UI**  
  Handles invoices, wallets, payments, callbacks, and user management.

- **Coin Services / Wallet Daemons**  
  Generate addresses, track balances, and process transactions for each supported blockchain family.

- **Full Node / Node Connectors**  
  Provide blockchain data for transaction verification and confirmation.

- **Database & Storage**  
  The main service stores state in its application database (SQLite by default in standalone mode), while additional coin services may use MariaDB in Helm deployments.

- **Kubernetes & Helm**  
  Manage deployment, configuration, scaling, and upgrades.

This architecture allows SHKeeper to operate as a fully independent crypto payment processor, giving operators full control over funds, infrastructure, and blockchain connectivity.
