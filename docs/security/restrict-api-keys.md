---
title: Restrict API Keys
---

# Restrict API Keys

SHKeeper uses **one API key shared across wallets** (copied when a new coin is registered). There is no per-IP or per-endpoint key ACL in core.

What you can do:

- Rotate the key in the dashboard; all coins pick up the same value on register/update.
- Keep the admin UI off the public internet except via Ingress + TLS (`domain` in Helm) and a strong login. Enable 2FA in the auth screens.
- Treat the key as the webhook HMAC secret. Anyone who has it can create invoices **and** forge unsigned-looking traffic if you only check `X-Shkeeper-Api-Key` on callbacks. Always [verify HMAC](../getting-started/webhook_verification.md).
- Payouts require HTTP Basic (dashboard user/password), not the API key.
- Metrics use `METRICS_USERNAME` / `METRICS_PASSWORD`.

There is no built-in allowlist of callback IPs.
