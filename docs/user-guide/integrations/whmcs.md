---
title: WHMCS
---

# WHMCS

Official payment gateway module (tested on WHMCS 8.10.1):

[https://github.com/vsys-host/whmcs-shkeeper-gateway-module](https://github.com/vsys-host/whmcs-shkeeper-gateway-module)

The module talks to SHKeeper over the same REST API as a custom integration: invoice create via `/payment_request`, then IPN on `callback_url`.

On your SHKeeper instance:

1. Enable the coins you want in Helm / the dashboard.
2. Copy the wallet API key into the WHMCS gateway settings.
3. Point the module at your SHKeeper base URL (including HTTPS if you use Ingress/`domain`).
4. Confirm the WHMCS callback URL is reachable from the SHKeeper pod.

Your WHMCS callback handler must return **HTTP 202** and should [verify HMAC signatures](../../getting-started/webhook_verification.md). Invoice status mapping uses `UNPAID` / `PARTIAL` / `PAID` / `OVERPAID` from the webhook `status` field.

Related: [API and IPN](./api-ipn-usage.md).
