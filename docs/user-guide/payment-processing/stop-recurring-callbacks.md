---
title: Recurring Callbacks
---

# Recurring Callbacks

SHKeeper sends a callback **for every confirmed transaction** on the invoice, including extra payments after `PAID` / `OVERPAID`. The tx that triggered this POST has `"trigger": true` in `transactions`.

There is no API flag to “stop callbacks for this invoice”. To ignore later events:

- Treat `PAID` / `OVERPAID` as terminal in **your** system and no-op further POSTs (still return **HTTP 202** so SHKeeper marks `callback_confirmed`).
- Or change `callback_url` only by creating/updating the invoice; old addresses remain valid and will still notify the stored URL.

Returning anything other than 202 leaves `callback_confirmed=false`. The scheduler (`send_callbacks`) will retry. That is retry-on-failure, not a way to unsubscribe.

Payout webhooks retry up to `MAX_RETRIES` with backoff. Invoice webhooks retry until accepted (202).

Related: [API and IPN](../integrations/api-ipn-usage.md), [Resend failed callbacks](../resend-failed-callbacks.md).
