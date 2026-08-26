---
title: Payout Automation
---

# Payout Automation

## Autopayout (wallet)

Configure destination and policy in the dashboard. The HTTP endpoint `POST /api/v1/<crypto>/autopayout` uses a **logged-in admin session** (it does not accept the API key or HTTP Basic). Policies: `manual`, `scheduled` (`pcond` is the interval in **minutes**), `limit` (`pcond` is the balance threshold). Optional reserve: `prespolicy` `amount` or `percent`. See [Cold wallets](../user-guide/wallet-setup/cold-wallets.md).

## API payout (Basic auth)

```bash
curl -u USER:PASS -X POST "https://your-shkeeper/api/v1/ETH/payout" \
  -H "Content-Type: application/json" \
  -d '{"amount":"0.05","destination":"0x…","fee":"10","callback_url":"https://example.com/payout-cb","external_id":"p-1"}'
```

Poll `GET /api/v1/ETH/task/<task_id>`. Status `PENDING` then `SUCCESS` (or error message per destination).

## Multipayout

`POST /api/v1/<crypto>/multipayout` with a JSON array `{ "dest", "amount" }`. Implemented for TRON, Ethereum, BNB, XRP — **not** BTC, LTC, DOGE, Monero. Same Basic auth. Details: `shkeeper.io/docs/multipayout.md`.

Helm: `shkeeper.enable_payout_callback: true` sets `ENABLE_PAYOUT_CALLBACK`. Temporary halt: `PAYOUTS_DISABLED=1` on the wallet pod.
