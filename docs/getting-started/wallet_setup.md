---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Wallet Setup
---

# Wallet Setup

After registering an account, your wallets in SHKeeper are automatically created and configured.

When you first initialize SHKeeper, the system may begin syncing **local cryptocurrency daemons** (when you run your own nodes in the deployment). That synchronization can take **up to two days**, depending on the coin and network load, because the node downloads blockchain data needed to validate and detect payments. If you use remote or lightweight endpoints only, initial setup can be much faster.
Once the sync is complete and the blockchain data is fully downloaded, you are ready to start using SHKeeper for receiving and managing payments in your e‑commerce or other applications.
---

## 🔧 What Happens During Wallet Setup

1. **Automatic Wallet Creation**  
   After you complete the account registration process, SHKeeper automatically generates wallet addresses for the supported cryptocurrencies.
2. **Blockchain Synchronization**  
   Each coin’s server will start syncing with the network to download the entire blockchain.  
   - This step is required for accurate balance calculation, transaction detection, and payment processing.  
   - Sync time varies by coin and network status.
3. **Ready to Receive Payments**  
   Once the sync process completes, your SHKeeper wallets are fully operational and can be used to receive cryptocurrency payments.
---

## 📌 Notes

- Syncing the full blockchain is necessary to ensure that SHKeeper can independently validate and detect incoming payments.- No further action is required from you after registration — wallet setup is automatic.
---

If you encounter issues during the wallet setup process or synchronization, please contact SHKeeper support for assistance.
