---
title: Payouts disabled
---

### `PAYOUTS_DISABLED`

**Type:** `boolean` (0 / 1)  
**Default:** `0`

**Description:**  
A flag to temporarily disable payout execution (sending funds).

---

### 📌 Behavior

- `PAYOUTS_DISABLED = 1`  
  → 💸 **Payouts are disabled**  
  → 🔔 Callbacks and notifications (shkeeper.io) continue to work  
  → 🔄 Polling and incoming transaction processing continue  

- `PAYOUTS_DISABLED = 0`  
  → 💸 Payouts work normally  
  → 🔔 Callbacks work  
  → 🔄 Polling works  

---

### ⚠️ Important

- This parameter affects **only fund transfers (payouts)**  
- It does NOT affect:
  - callbacks (`task_callback`)  
  - notifications (`task_send_payout_callback_notifier`)  
  - incoming transaction processing  
- All scheduler jobs continue running

---

### 💡 Usage

Recommended to enable in cases of:

- maintenance  
- node or network issues  
- temporary suspension of payouts  
- incident investigation  

---

### 🧠 Example

```env
PAYOUTS_DISABLED=1