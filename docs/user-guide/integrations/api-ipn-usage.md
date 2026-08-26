---
title: API and IPN (callbacks)
---

# API and IPN (callbacks)

Invoice creation and payment notifications are the integration surface. OpenAPI live spec: `/api` on the docs site (`static/openapi/openapi.json`).

## Auth

| Call type | Auth |
|---|---|
| `GET /api/v1/crypto` | none |
| Invoice, quote, addresses, balances | header `X-Shkeeper-Api-Key` |
| Payout / multipayout / task status | HTTP Basic (dashboard login/password) |
| Outbound webhooks | HMAC-SHA256 (`X-Shkeeper-Timestamp`, `X-Shkeeper-Signature`) plus `X-Shkeeper-Api-Key` |

The API key is the HMAC secret. Verify the signature on the **raw body**; do not trust the API-key header alone. Guide: [Webhook verification](../../getting-started/webhook_verification.md).

## Create an invoice

```http
POST /api/v1/ETH/payment_request
X-Shkeeper-Api-Key: <key>
Content-Type: application/json

{
  "external_id": "107",
  "fiat": "USD",
  "amount": "18.25",
  "callback_url": "https://billing.example.com/callback"
}
```

Response includes `id`, `wallet` (deposit address), `amount` (crypto), `exchange_rate`, `recalculate_after`.

The invoice identity is the pair **`external_id` + `callback_url`**. Repeating the same pair updates the existing invoice (for example after the customer switches coin).

## Callback body (confirmed payment)

SHKeeper POSTs JSON when a transaction is confirmed enough. Your handler **must respond with HTTP 202**. Any other status leaves `callback_confirmed=false` and the scheduler will try again.

Typical fields: `external_id`, `crypto`, `addr`, `fiat`, `balance_fiat`, `balance_crypto`, `paid` (true when status is `PAID` or `OVERPAID`), `status`, `transactions` (the triggering tx has `"trigger": true`), `fee_percent`, `overpaid_fiat`.

Unconfirmed notifications (`UNCONFIRMED_TX_NOTIFICATION`) use `"status": "unconfirmed"` and still require HTTP 202.

## Payout callbacks

If `ENABLE_PAYOUT_CALLBACK` is set (Helm `shkeeper.enable_payout_callback`), a successful payout POSTs to `callback_url` from the payout request. Retries use `MAX_RETRIES` with increasing delays `(n+1)²` seconds. Same HMAC headers.

See [Webhook limits](../../deployment/webhook-limits.md) and [Creating invoices](../creating-invoices.md).
