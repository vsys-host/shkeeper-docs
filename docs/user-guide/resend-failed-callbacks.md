---
title: Resend Failed Callbacks
---

# Resend Failed Callbacks

Invoice and payout webhooks are accepted only with **HTTP 202**. Any other status (or a timeout) leaves the event unconfirmed.

## Invoice callbacks

A scheduler job runs every **60 seconds** (`task_callback`). It:

1. Updates confirmation counts
2. POSTs any `Transaction` / `UnconfirmedTransaction` with `callback_confirmed=false` (after `NOTIFICATION_TASK_DELAY` for confirmed txs)

There is **no** `MAX_RETRIES` cap and **no** exponential backoff on invoice callbacks. They are retried on every run until the endpoint returns 202.

There is no dashboard “resend” button and no public resend API. Operators can trigger a send from the app CLI (`flask` callback `send` command) on the core pod.

## Payout callbacks

Used when `ENABLE_PAYOUT_CALLBACK` is set. Rows in `Notification` retry while `retries < MAX_RETRIES` (env `MAX_RETRIES`, default 7), with delay `1² + 2² + …` seconds. After the cap, retries stop.

Related: [Webhook limits](../deployment/webhook-limits.md), [API and IPN](./integrations/api-ipn-usage.md).
