---
title: First Payment (API)
---

# First Payment (API)

1. Enable a coin (Helm or dashboard) and copy the API key.
2. `GET /api/v1/crypto` — pick a `name` that is listed.
3. Create an invoice:

```bash
curl -s -X POST "https://your-shkeeper/api/v1/BTC/payment_request" \
  -H "X-Shkeeper-Api-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"external_id":"demo-1","fiat":"USD","amount":"10.00","callback_url":"https://example.com/cb"}'
```

4. Pay the `wallet` address with the returned `amount` (crypto).
5. Wait for confirmations (`wallet.confirmations`, default 1) plus `NOTIFICATION_TASK_DELAY`.
6. Your `callback_url` receives JSON; respond **202**.

Lookup: `GET /api/v1/invoices/<external_id>` and `GET /api/v1/tx-info/<txid>/<external_id>`.

Related: [First BTC payment](../first-btc-payment.md), [API and IPN](../../user-guide/integrations/api-ipn-usage.md).
