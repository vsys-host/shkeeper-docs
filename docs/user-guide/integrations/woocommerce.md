---
title: WooCommerce
---

# WooCommerce / WordPress

Official plugin (tested on WordPress 5.9.3 + WooCommerce 6.3.1):

[https://github.com/vsys-host/wp-shkeeper-plugin](https://github.com/vsys-host/wp-shkeeper-plugin)

Configure the plugin with your SHKeeper URL and API key. Orders create invoices through `/api/v1/<crypto>/payment_request`; payment updates arrive as signed webhooks.

The callback endpoint must return **HTTP 202**. See [Webhook verification](../../getting-started/webhook_verification.md).

Other official carts:

- OpenCart 3 — [opencart-3-shkeeper-payment-module](https://github.com/vsys-host/opencart-3-shkeeper-payment-module)
- PrestaShop 8 — [prestashop-8-shkeeper-payment-module](https://github.com/vsys-host/prestashop-8-shkeeper-payment-module)
