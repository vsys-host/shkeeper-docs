---
title: Encryption, Backup, Restore
---

# Encryption, Backup, Restore

Private keys are encrypted on your instance. SHKeeper is not a third-party custodian. See [Overview](../../basics/overview.md#watch-only-mode--private-keys).

## How encryption works

At registration you set a password. Core derives a Fernet key with **PBKDF2-HMAC-SHA256** (500 000 iterations, fixed salt) and encrypts wallet material. The password is not stored in plain text (bcrypt hash for verification). If you lose it, keys cannot be recovered.

Runtime status: pending / fail / success. Persistent status: pending / disabled / enabled. `FORCE_WALLET_ENCRYPTION` requires encryption during setup.

`POST /api/v1/decryption-key` submits the password so the process can decrypt in memory after restart.

## Backup

`GET /api/v1/<crypto>/backup` requires a **logged-in admin session** (not the API key). It asks the coin backend for a wallet dump. Store the file offline.

EVM backends (`ethereum_like_coin`) keep encrypted keys in MariaDB (`Wallets.priv_key`). Back up that database as well as the core SQLite file (`instance/shkeeper.sqlite` unless you switched DSN).

## Restore

Restore is “restore the backup file / database onto a new instance and unlock with the same password”. There is no import of an external xpub-only Bitcoin wallet.

Related: [Encrypt wallet data](../../security/encrypt-wallet-dat.md), [How to encrypt](./how-to-encrypt.md).
