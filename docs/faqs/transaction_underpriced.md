# Ethereum / USDT: "Replacement transaction underpriced"

## Problem
replacement transaction underpriced

This error appears when a transaction replacement fails due to insufficient gas fee.

---

## Why this happens

Ethereum transactions use nonce ordering:

- each transaction has a nonce  
- replacement transaction must use the same nonce  
- and must have a higher gas fee than the previous one  

If the fee increase is not enough, the network rejects the transaction.

---

## Example

- Token: USDT (ERC-20)  
- Gas price: ~0.16 Gwei (too low)  
- Max fee: ~$0.05  
- Nonce: 20  

This gas level is too low for replacement.

---

## Why increasing fee may still fail

- previous transaction is still in mempool  
- new transaction does not exceed required fee bump  
- nonce conflict remains active  

---

## SHKeeper limitation

SHKeeper does not support fee bumping after a transaction is sent.  
Once a transaction is broadcasted, its fee cannot be changed.

---

## Possible solutions

### 1. Wait
If network load decreases, the transaction may eventually be confirmed.

---

### 2. Use external wallet

Export the private key and import it into a wallet that supports fee replacement, then use “Speed Up” or “Replace Transaction”.

Example:
- MetaMask

---

## Recommended prevention

Use dynamic fee configuration:

MAX_PRIORITY_FEE_MODE: dynamic  
DYNAMIC_MAX_PRIORITY_FEE_LIMIT: `<max ETH>`
DYNAMIC_MAX_PRIORITY_FEE_PERCENTILE: 50  

This helps prevent underpriced transactions.

---

## Summary

- issue caused by low gas fee  
- replacement must exceed previous transaction fee  
- SHKeeper cannot modify sent transactions  
- fix via correct fee setup or external wallet