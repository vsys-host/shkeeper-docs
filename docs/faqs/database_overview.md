---
title: SHKeeper Database Overview
---

## How SHKeeper Stores Data

SHKeeper uses **two types of databases**, depending on the component:

### 1. Core SHKeeper (SQLite)

The main `shkeeper` service uses an embedded **SQLite** database.

- Stored as a local file (e.g. `shkeeper.sqlite`)
- No external database required
- Automatically initialized on startup

This is why the system continues to work even if you remove MariaDB.

---

### 2. Crypto Services (MariaDB)

Some blockchain services use **MariaDB** when enabled:

- ethereum-shkeeper  
- bnb-shkeeper  
- polygon-shkeeper  
- avalanche-shkeeper  
- xrp-shkeeper  
- tron-shkeeper (partially)

These services require a relational database for handling blockchain data and indexing.

---

## Why MariaDB May Not Be Used

If you disable all supported crypto modules in your config:

```yaml
ethereum:
  enabled: false
polygon:
  enabled: false