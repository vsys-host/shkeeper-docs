---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Lite Wallets Supported
---

# Lite Wallets Supported

> **Note:** “Lite wallets” here means using **remote blockchain nodes** (no local full node)—**not** importing external Bitcoin watch-only wallets (xpub / view-key). External xpub-only wallets are **not** supported; see [FAQ — Lite wallets supported?](/docs/faqs#lite-wallets-supported).

Shkeeper supports **lite wallet** operation, providing a lightweight option for managing cryptocurrency funds without requiring full blockchain nodes on your server. This is ideal when you want to interact with multiple cryptocurrencies efficiently, without the overhead of running full nodes locally.

---

## 🔹 Key Features of Lite Wallets

1. **No Full Node Required**  
   - Lite wallets interact with the blockchain via remote nodes or APIs.  
   - Users do not need to download the full blockchain, saving storage and bandwidth.

2. **Real-Time Balance and Transaction Monitoring**  
   - Supports monitoring balances and transaction history through trusted APIs.  
   - Provides notifications for incoming and outgoing transactions.

3. **Compatibility**  
   - Supports multiple blockchains including Bitcoin (BTC), Ethereum (ETH), and major ERC-20 tokens.  

---

## 🛠 Implementation Notes

- Lite wallets communicate with Shkeeper via secure APIs.  
- Transactions are signed locally and submitted to blockchain nodes or services through Shkeeper.

