---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Encrypt Wallet Dat
---
# Encrypt Wallet Data

SHKeeper is **non-custodial** and runs in **watch-only payment-processing mode** (it monitors the blockchain for deposits on your instance). Wallet private keys are **not stored in plain text**: they are encrypted in the database with a **user-provided password** at registration. This page describes that model; for terminology, see [Overview — Watch-only mode & private keys](/docs/basics/overview#watch-only-mode--private-keys).

Shkeeper securely encrypts all wallet data stored in its database using that registration password. This ensures sensitive information, including private keys and wallet credentials, remains protected even if the database files are compromised.

---

## 🔒 How It Works

1. **User Registration**  
   - During registration, the user chooses a secure **encryption key (password)**.  
   - This key is **never stored** on the server in plain text.  

2. **Database Encryption**  
   - All wallet-related data is encrypted with the user’s key before being written to the database.  
   - Only the user-provided key can decrypt this data when accessing their wallets.  

3. **Accessing Funds**  
   - Every time the user logs in, their key is used to decrypt the wallet data in memory.  
   - Shkeeper ensures that the decrypted data **never persists** in plain text on disk.  

4. **Password Loss Warning**  
   - If a user **forgets their encryption key**, they **lose access to their funds** permanently.  
   - Shkeeper **cannot recover** the key or decrypt the wallet data without it.  
   - This design maximizes security but places responsibility for key management entirely on the user.  

---

## ⚠️ Security Considerations

- Always choose a **strong, unique key**.  
- Store the key securely offline if needed.  
- Do not share your key with anyone.  

---

## 🛠 Implementation Notes

- Shkeeper uses **AES-256 encryption** for wallet data.  
- Encryption and decryption occur **on the server-side memory**
