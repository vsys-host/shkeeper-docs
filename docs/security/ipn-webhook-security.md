---
# id is optional; using filename-based id. Keep frontmatter simple.
title: IWN (Instant Webhook Notification) Webhook Security
---

# IWN Webhook Security

SHKeeper supports **IWN (Instant Webhook Notification) webhooks** to notify your systems about payment and invoice events in real time.

To ensure integrity and authenticity, all webhook requests are signed using **HMAC-SHA256** and include a timestamp-based replay protection mechanism.

---

## 🔒 Security Model

Each webhook request is protected using:

- A shared **webhook secret**
- An **HMAC-SHA256 signature**
- A **timestamp header (`X-Shkeeper-Timestamp`)**
- The **raw HTTP request body**

Signature is calculated as:

```text
HMAC_SHA256(
    secret,
    "{timestamp}." + raw_request_body
)
```

---

## 📦 Webhook Headers

Every request contains:

| Header | Description |
|---|---|
| `X-Shkeeper-Timestamp` | Unix timestamp of the request |
| `X-Shkeeper-Signature` | HMAC-SHA256 hex signature |

Example:

```http
X-Shkeeper-Timestamp: 1711111111
X-Shkeeper-Signature: 5b7d7c6d4f8d9f1e6d3c...
```

---

## 🔒 Security Best Practices

### 1. Validate Signature (Mandatory)

Always verify the webhook signature before processing any data.

- Use **raw request body**
- Recompute HMAC using your shared secret
- Compare using constant-time comparison

Reject requests with:
- missing signature
- invalid signature

---

### 2. Validate Timestamp (Replay Protection)

To prevent replay attacks, SHKeeper includes a timestamp in every request.

You must reject requests that are too old.

Recommended window:

```text
±300 seconds (5 minutes)
```

---

### 3. Use HTTPS Only

Webhook endpoints must be served over HTTPS.

Never accept webhook traffic over plain HTTP.

---

### 4. Idempotency Handling

Webhooks may be delivered more than once due to network retries.

Ensure your system is idempotent:

- Use invoice/payment ID as a unique key
- Prevent duplicate processing

---

### 5. Minimal Endpoint Exposure

- Expose only required webhook endpoints
- Do not include secrets in URLs or query parameters
- Keep endpoints unguessable where possible

---

## ⚠️ Security Considerations

- Never trust webhook payloads without verification
- Do not log secrets or signatures
- Always validate signature and timestamp
- Reject expired or malformed requests
- Rotate webhook secrets periodically

---

## 🛠 Implementation Notes

To validate a webhook correctly:

1. Read **raw HTTP body**
2. Extract headers:
   - `X-Shkeeper-Timestamp`
   - `X-Shkeeper-Signature`
3. Recompute HMAC:
   ```text
   "{timestamp}." + raw_body
   ```
4. Compare signatures using constant-time comparison
5. Validate timestamp freshness
6. Process request only if all checks pass

---

## 📌 Response Handling

- Return `202` only for valid requests
- Return `401` or `403` for invalid requests
- Do not expose internal validation logic in responses

---

## 🔐 Summary

SHKeeper webhook security is based on:

- HMAC-SHA256 signature verification
- Timestamp-based replay protection
- Raw body integrity validation

This ensures webhook requests are authentic, unmodified, and protected against replay attacks.