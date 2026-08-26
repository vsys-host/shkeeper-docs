---
sidebar_position: 5
title: Use Cases
---

# Use Cases

SHKeeper is a self-hosted payment processor. Typical setups use the REST API plus callbacks, or a ready-made e-commerce module.

## Online store

Create one invoice per order with `POST /api/v1/<crypto>/payment_request`. Pass your order id as `external_id`, the amount in fiat, and a `callback_url`. SHKeeper returns a unique deposit address (`wallet`). When funds arrive, it posts a signed webhook to that URL.

Official modules exist for [WHMCS](../user-guide/integrations/whmcs.md), [WooCommerce](../user-guide/integrations/woocommerce.md), OpenCart 3, and PrestaShop 8.

## Recurring or static deposits

If a customer must keep the same address (exchange-style deposits), reuse the same `external_id` + `callback_url` pair. SHKeeper updates the existing invoice instead of creating a second one. See [Unique address per invoice](../user-guide/payment-processing/unique-address-per-transaction.md).

## Payouts and cold storage

Use HTTP Basic Auth on payout endpoints, or enable wallet autopayout (`scheduled` / `limit`) to a destination address. Multipayout is available for TRON, Ethereum, BNB, and XRP — not for BTC, LTC, DOGE, or Monero. See [Cold wallets](../user-guide/wallet-setup/cold-wallets.md).

## Self-hosted vs public nodes

Helm can run your own fullnodes (`*_fullnode.enabled: true`) or point wallets at public/external RPC (`enabled: false` + `url`). Public RPC avoids multi-day sync; your own node increases independence. See [Public fullnodes](../user-guide/public-fullnodes.md).
