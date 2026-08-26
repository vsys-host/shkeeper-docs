---
title: First BTC Payment
---

# First BTC Payment

1. Enable Bitcoin (chart default `btc.enabled: true`). Prefer public RPC on a small host:

```yaml
btc:
  enabled: true
  mainnet: true
btc_fullnode:
  enabled: false
  url: http://shkeeper:shkeeper@fullnode.bitcoin.shkeeper.io:8332
```

2. Open the dashboard, unlock/encrypt the wallet, copy the API key.
3. Create an invoice:

```bash
curl -X POST "https://your-shkeeper/api/v1/BTC/payment_request" \
  -H "X-Shkeeper-Api-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"external_id":"btc-1","fiat":"USD","amount":"25.00","callback_url":"https://your-app/callback"}'
```

4. Send BTC to `wallet`. Fee for later payouts is sat/vByte. Confirmations default to 1.
5. Callback: respond **202**. Lightning is a separate coin (`BTC-LIGHTNING`) and needs `btc_lightning.enabled`, `domain`, and `external_ip`.

Related: [Quick start public BTC](./quick-start-public-btc.md), [First payment](./code-examples/first-payment.md).
