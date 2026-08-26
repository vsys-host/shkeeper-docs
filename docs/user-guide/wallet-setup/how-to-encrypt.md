---
title: How to Encrypt
---

# How to Encrypt

1. On first run, complete account registration and set a strong encryption password.
2. Confirm wallets show as encrypted / unlocked in the dashboard after login.
3. After every process restart, unlock with the same password (UI or `POST /api/v1/decryption-key`).
4. In Helm you can force this flow:

```yaml
shkeeper:
  extraEnv:
    FORCE_WALLET_ENCRYPTION: "1"
```

Do not set `DEV_MODE` or `DEV_MODE_ENC_PW` in production. `SECRET_KEY` should be stable across restarts so sessions survive; it is separate from the wallet password.

Related: [Encryption, backup, restore](./encryption-backup-restore.md).
