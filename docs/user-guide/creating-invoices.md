---
title: Creating Invoices
---

## Creating Invoices

SHKeeper uses **invoices** as the core entity for accepting cryptocurrency payments. An invoice is a payment request with a fiat amount, a cryptocurrency, and a unique receiving address.

### How invoices work

When you call `POST /api/v1/<crypto>/payment_request` with an API key, SHKeeper:

- Converts `amount` in `fiat` to crypto using the wallet’s rate source
- Generates a deposit address (`wallet` in the response)
- Stores the invoice as `UNPAID`

Later statuses: `PARTIAL`, `PAID`, `OVERPAID` (also `CANCELLED`, `REFUNDED`, `OUTGOING` for other flows).

### Request body

All four fields are required:

| Field | Meaning |
|---|---|
| `external_id` | Your order id |
| `fiat` | ISO code (`USD`, `EUR`, plus `EXTRA_CURRENCIES`) |
| `amount` | Fiat amount as a string or number |
| `callback_url` | HTTPS URL that must return **HTTP 202** |

There is no `description` or optional metadata field on this endpoint. The same `external_id` + `callback_url` + `fiat` updates an existing invoice instead of creating a second one.

### Payment tracking

The coin backend watches the address. After `Wallet.confirmations` are reached, core waits `NOTIFICATION_TASK_DELAY` seconds (default 60) and POSTs a signed webhook.

Related: [API and IPN](./integrations/api-ipn-usage.md), [Unique address per invoice](./payment-processing/unique-address-per-transaction.md), [Underpayment and overpayment](./payment-processing/underpayment-gas-confirmation.md), [Network confirmations](./payment-processing/network-confirmations.md).
