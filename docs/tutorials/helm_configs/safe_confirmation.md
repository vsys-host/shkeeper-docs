---
# id is optional; using filename-based id. Keep frontmatter simple.
title: Safe confirmations
---


# 🔒 SAFE_CONFIRMATIONS in SHKeeper

`SAFE_CONFIRMATIONS` is a parameter that defines how many blocks must be confirmed after a transaction is included in the blockchain before it is considered final.  

It is used to protect against **blockchain reorganizations (reorgs)**, where recently added blocks can be reverted, and transactions in them may temporarily disappear.

---

## 📌 Definition

`SAFE_CONFIRMATIONS` is the number of most recent blocks that are considered unsafe and are not used for transaction finalization.

The system only works with blocks that are deeper than this threshold.

---

## ⚙️ How It Works

Definitions:

* current_block — the latest block in the network
* tx_block — the block containing the transaction
* SAFE_CONFIRMATIONS = N

Finality condition:
```
current_block - tx_block >= SAFE_CONFIRMATIONS
or:
safe_block = current_block - SAFE_CONFIRMATIONS
tx_block <= safe_block
```

---

## 🔹 Example
```
current_block = 1000
SAFE_CONFIRMATIONS = 6

safe_block = 994

* Blocks 995–1000 → unsafe (reorg risk)
* Blocks <= 994 → safe

Transaction is final if:

tx_block <= 994
```
---

## 🧠 Why It Matters

Blockchains can experience reorgs:

* recent blocks may be replaced
* transactions may disappear
* chain history can change

SAFE_CONFIRMATIONS protects against:

* false-positive payments
* balance inconsistencies
* incorrect transaction states

---

## 🔄 Difference from Confirmations

Confirmations (UI-level):

confirmations = current_block - tx_block + 1

Safe depth (backend-level):

safe_block = current_block - SAFE_CONFIRMATIONS

Production systems should rely on safe depth.

---

## ⚠️ Important Notes

* Higher SAFE_CONFIRMATIONS = more safety, slower finality
* Lower SAFE_CONFIRMATIONS = faster, but higher risk
* Value depends on blockchain and risk tolerance

---

## 📊 Example Configuration
BTC
SAFE_CONFIRMATIONS: 1
---

## 💡 Best Practices

* Use different values per blockchain
* Never finalize transactions from unsafe zone
* Store tx_block, current_block, safe_block
* Re-check transactions on each new block

---

## 🧠 TL;DR

SAFE_CONFIRMATIONS = how many latest blocks are ignored to avoid reorg issues
