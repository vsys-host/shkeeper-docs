# SHKeeper Webhook Signature Verification (HMAC-SHA256)

SHKeeper signs outbound webhook requests using HMAC-SHA256 to ensure request authenticity and integrity.

Clients should always verify webhook signatures before processing incoming requests.

---

# Headers

Every webhook request contains the following headers:

| Header | Description |
|---|---|
| `X-Shkeeper-Timestamp` | Unix timestamp used for signing |
| `X-Shkeeper-Signature` | HMAC-SHA256 hex digest |

Example:

```http
X-Shkeeper-Timestamp: 1711111111
X-Shkeeper-Signature: 5b7d7c6d4f8d9f1e6d3c...
```

---

# Signing Algorithm

The signature is calculated as:

```text
HMAC_SHA256(
    secret,
    "{timestamp}." + raw_request_body
)
```

Example signed payload:

```text
1711111111.{"invoice_id":"123","status":"paid"}
```

Important:
- `timestamp` is encoded as ASCII
- `raw_request_body` must be the exact HTTP request body bytes
- the resulting digest is lowercase hexadecimal

---

# Important: Use Raw Request Body

The signature must be verified against the raw HTTP request body.

Do NOT:
- reformat JSON
- pretty-print JSON
- reorder keys
- parse and re-serialize JSON before verification

Even small formatting changes will produce a different signature.

Correct:
- use raw body bytes directly from the HTTP request

---

# Python Verification Example

```python
import hashlib
import hmac
import time

WEBHOOK_SIGNATURE_HEADER = "X-Shkeeper-Signature"
WEBHOOK_TIMESTAMP_HEADER = "X-Shkeeper-Timestamp"


def verify_webhook(
    secret: str,
    body: bytes,
    *,
    timestamp: int,
    signature_hex: str,
    max_age_sec: int = 300,
) -> bool:
    """
    Verify SHKeeper webhook signature.
    """

    sig = signature_hex.strip().lower()

    # Signature must be SHA256 hex digest
    if len(sig) != 64:
        return False

    # Replay attack protection
    now = int(time.time())
    if abs(now - int(timestamp)) > max_age_sec:
        return False

    # Build signed message
    msg = f"{timestamp}.".encode("ascii") + body

    # Generate expected signature
    expected = hmac.new(
        secret.encode("utf-8"),
        msg,
        hashlib.sha256,
    ).hexdigest()

    # Constant-time comparison
    return hmac.compare_digest(expected, sig)
```

---

# Flask Example

```python
from flask import Flask, request, abort

app = Flask(__name__)

API_KEY = "your-api-key"


@app.post("/webhook")
def webhook():
    signature = request.headers.get("X-Shkeeper-Signature")
    timestamp = request.headers.get("X-Shkeeper-Timestamp")

    if not signature or not timestamp:
        abort(401)

    # IMPORTANT:
    # Use raw request body bytes
    raw_body = request.get_data()

    valid = verify_webhook(
        secret=API_KEY,
        body=raw_body,
        timestamp=int(timestamp),
        signature_hex=signature,
    )

    if not valid:
        abort(401)

    return {"ok": True}
```

---

# PHP Verification Example

```php
<?php

function verify_webhook(
    string $secret,
    string $body,
    int $timestamp,
    string $signature,
    int $max_age_sec = 300
): bool {

    // Signature must be SHA256 hex digest
    if (strlen($signature) !== 64) {
        return false;
    }

    // Replay attack protection
    if (abs(time() - $timestamp) > $max_age_sec) {
        return false;
    }

    // Build signed message
    $message = $timestamp . "." . $body;

    // Generate expected HMAC
    $expected = hash_hmac(
        'sha256',
        $message,
        $secret
    );

    // Constant-time comparison
    return hash_equals(
        $expected,
        strtolower(trim($signature))
    );
}


$headers = getallheaders();

$timestamp = (int)$headers['X-Shkeeper-Timestamp'];
$signature = $headers['X-Shkeeper-Signature'];

# IMPORTANT:
# Use raw request body
$raw_body = file_get_contents('php://input');

$is_valid = verify_webhook(
    'your-webhook-secret',
    $raw_body,
    $timestamp,
    $signature
);

if (!$is_valid) {
    http_response_code(401);
    exit('Invalid signature');
}

echo json_encode([
    'ok' => true
]);
```

---

# Replay Attack Protection

The timestamp is included in the signature to prevent replay attacks.

By default:
- requests older than 5 minutes are rejected

You may adjust the allowed clock drift if necessary.

---

# Security Recommendations

- Always verify webhook signatures
- Use raw request body bytes
- Store webhook secrets securely
- Use HTTPS only
- Reject expired timestamps
- Use constant-time comparison (`hmac.compare_digest` / `hash_equals`)

---

# Reference Implementation

SHKeeper internally signs webhooks using:

```python
msg = f"{timestamp}.".encode("ascii") + body

signature = hmac.new(
    secret.encode("utf-8"),
    msg,
    hashlib.sha256,
).hexdigest()
```