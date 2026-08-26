---
title: Python and JavaScript Client
---

# Python and JavaScript Client

There is no official SDK. Use HTTP. Base URL is your instance (example `https://demo.shkeeper.io`).

## List coins (no auth)

```bash
curl -s https://your-shkeeper/api/v1/crypto
```

Use `crypto_list[].name` as `<crypto>` in paths.

## Python: create invoice and verify webhook

```python
import hmac, hashlib, requests

BASE = "https://your-shkeeper"
KEY = "your-api-key"

r = requests.post(
    f"{BASE}/api/v1/ETH/payment_request",
    headers={"X-Shkeeper-Api-Key": KEY, "Content-Type": "application/json"},
    json={
        "external_id": "order-107",
        "fiat": "USD",
        "amount": "18.25",
        "callback_url": "https://billing.example.com/callback",
    },
    timeout=30,
)
print(r.json()["wallet"], r.json()["amount"])

def verify(timestamp: str, body: bytes, signature: str, secret: str) -> bool:
    digest = hmac.new(
        secret.encode("utf-8"),
        timestamp.encode("ascii") + b"." + body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(digest, signature)
```

Your callback view must return **202**. Full examples: [Webhook verification](../../getting-started/webhook_verification.md).

## JavaScript (fetch)

```javascript
const res = await fetch("https://your-shkeeper/api/v1/ETH/payment_request", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Shkeeper-Api-Key": process.env.SHKEEPER_KEY,
  },
  body: JSON.stringify({
    external_id: "order-107",
    fiat: "USD",
    amount: "18.25",
    callback_url: "https://billing.example.com/callback",
  }),
});
const inv = await res.json();
```

Payouts use Basic auth, not the API key:

```bash
curl -u admin:password -X POST https://your-shkeeper/api/v1/ETH/payout \
  -H 'Content-Type: application/json' \
  -d '{"amount":"0.01","destination":"0x…","fee":"10"}'
```
