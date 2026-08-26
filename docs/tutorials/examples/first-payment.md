---
title: First Payment
---

# First Payment

Incoming payments are tracked as **invoices**. The dashboard **Payout** screen sends funds out; it does not create a deposit address for a customer.

1. Enable a coin and copy the API key from the wallet settings.
2. Create an invoice: `POST /api/v1/<crypto>/payment_request` with `external_id`, `fiat`, `amount`, and `callback_url`.
3. Give the customer the returned `wallet` address and crypto `amount`.
4. Wait for confirmations. The callback POST must be answered with **HTTP 202**.
5. Status values are `UNPAID`, `PARTIAL`, `PAID`, `OVERPAID` — not “Completed” or “Success”.

Step-by-step BTC: [First BTC payment](../first-btc-payment.md). API details: [First invoice](./first-invoice.md).
