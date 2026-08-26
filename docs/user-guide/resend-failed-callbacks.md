---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Resend Failed Callbacks
---

# Resend Failed Callbacks

Shkeeper ensures reliable delivery of **webhooks and callbacks** by automatically retrying failed attempts. This guarantees that your system receives all critical notifications, even in the event of temporary network issues or server downtime.

---

## 🔹 How It Works

1. **Detection of Failed Callbacks**  
   - Every webhook or callback request that does not return **HTTP 202** is marked as failed.  
   - Failed callbacks are logged with details including timestamp, payload, and target URL.

2. **Automatic Retry Mechanism**  
   - Shkeeper automatically retries failed callbacks based on a **configured retry schedule**.  
   - Retry intervals may increase progressively (exponential backoff) to prevent overloading your server.

3. **Manual Retry Option**  
   - Administrators can manually trigger a resend of failed callbacks via the **Shkeeper dashboard** or API.  
   - This is useful for recovering from extended downtime or configuration issues.
---

## 🔒 Best Practices

- Ensure your callback endpoints respond with **HTTP 202** for successful processing.  
- Monitor callback failures and retry metrics to detect systemic issues early.

---

## 🛠 Implementation Notes

- Failed callbacks are stored in Shkeeper until successfully delivered or manually cleared.

