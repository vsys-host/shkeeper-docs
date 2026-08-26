---
title: Unique Address per Invoice
---

# Unique Address per Invoice

`POST /api/v1/<crypto>/payment_request` generates a fresh deposit address and stores it on the invoice (`Invoice.addr`) and in `InvoiceAddress` (one row per invoice + crypto).

## Same order, different coin

Identity is **`external_id` + `callback_url` + `fiat`**. If the customer switches from ETH to USDT, call `payment_request` again with the same triple and the new crypto. SHKeeper updates the invoice, keeps previous addresses, and credits a payment that lands on an older address for that invoice.

Lightning (`BTC-LIGHTNING`) can also attach an on-chain BTC address when `LIGHTNING_GENERATE_ONCHAIN_ADDRESS` is enabled (BTC wallet must be on).

## Do not pre-create every coin

Creating invoices for every coin “in advance” allocates unused addresses. Create the invoice only for the coin the customer chose.

## Static address pattern

There is no separate “static address” API. To keep one address per customer, reuse the same invoice (`external_id` + `callback_url` + `fiat`) and optionally set a high target amount so the invoice stays below `PAID`. Rate refresh still follows wallet `recalc` (hours).

## No built-in address cap

The core does not enforce a maximum number of generated addresses. Disk/DB growth is the practical limit.

Related: [Creating invoices](../creating-invoices.md), [Use cases](../../basics/use-cases.md).
