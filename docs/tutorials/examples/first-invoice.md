---
title: First Invoice
---

# First Invoice

Invoices are created with the REST API, not `/api/v1/payments`. There is no “open amount” or `description` field on create.

## Create

```bash
curl -s -X POST "https://your-shkeeper/api/v1/BTC/payment_request" \
  -H "X-Shkeeper-Api-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "external_id": "12345",
    "fiat": "USD",
    "amount": "18.25",
    "callback_url": "https://your-app/callback"
  }'
```

Success response includes `id`, `wallet` (deposit address), `amount` (crypto), `exchange_rate`, `recalculate_after`, `display_name`. Invoice status starts as `UNPAID`.

Required JSON fields: `external_id`, `fiat`, `amount`, `callback_url`. Repeating the same `external_id` + `callback_url` + `fiat` updates that invoice (for example after the customer switches coin).

## After payment

SHKeeper watches the address, then moves the invoice through `PARTIAL` / `PAID` / `OVERPAID`. Your `callback_url` receives a POST; respond with **HTTP 202**.

Lookup: `GET /api/v1/invoices/<external_id>` with the same API key.

Related: [API and IPN](../../user-guide/integrations/api-ipn-usage.md), [First payment](../code-examples/first-payment.md).
