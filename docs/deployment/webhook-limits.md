---
title: Webhook Limits and Retries
---

# Webhook Limits and Retries

There is no rate-limit quota on how many invoices you may attach a `callback_url` to. Delivery rules:

## Success status

The merchant endpoint must return **HTTP 202**. The current callback code treats any other code as failure (`callback.py`). (Some older notes said 203; that is incorrect.)

## Invoice callbacks

Unconfirmed txs with `callback_confirmed=false` are retried by `send_callbacks`. Confirmed txs wait `NOTIFICATION_TASK_DELAY` (default 60s), then POST. Failures stay `callback_confirmed=false` and are tried again on the next scheduler run. There is no `MAX_RETRIES` cap on invoice callbacks.

`REQUESTS_NOTIFICATION_TIMEOUT` (default 30s) is the HTTP timeout.

## Payout callbacks

Enabled with `ENABLE_PAYOUT_CALLBACK`. Rows in `Notification` retry while `retries < MAX_RETRIES` (env `MAX_RETRIES`, default 7). Delay before try n is the sum of `1² + 2² + …`. After the cap, SHKeeper stops.

## HMAC

Every POST includes `X-Shkeeper-Timestamp` and `X-Shkeeper-Signature`. See [Webhook verification](../getting-started/webhook_verification.md) and [IPN security](../security/ipn-webhook-security.md).

Related: [Recurring callbacks](../user-guide/payment-processing/stop-recurring-callbacks.md).
