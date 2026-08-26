---
title: Create Your Own Token
---

# Create Your Own Token

EVM tokens are defined in `ethereum_like_coin` (`app/chains/<chain>.py` → `TOKENS`) and exposed to the API by a one-class file in `shkeeper.io`.

## 1. Contract on the wallet backend

In `app/chains/ethereum.py` (or `bnb.py`, `polygon.py`, …) add an entry under both `main` and the testnet key (`sepolia`, etc.):

```python
"ETH-MYTOKEN": {
    "contract_address": "0x…",
    "abi": '[...]',  # ERC-20 ABI JSON string
},
```

The symbol must match what the core will use. Rebuild `vsyshost/evm-shkeeper` (chart `unified_evm_image`).

## 2. Crypto class in core

`shkeeper/modules/cryptos/eth-mytoken.py`:

```python
from shkeeper.modules.classes.ethereum import Ethereum

class eth_mytoken(Ethereum):
    _display_name = "ERC20 MYTOKEN"

    def __init__(self):
        self.crypto = "ETH-MYTOKEN"

    def getname(self):
        return "ETH-MYTOKEN"
```

Concrete subclasses auto-register unless listed in `Crypto.default_off`. Add `eth_mytoken` there so it stays off until `ETH_MYTOKEN_WALLET=enabled`.

## 3. Helm

Add `eth_mytoken.enabled` (or reuse an existing extraEnv) and pass `ETH_MYTOKEN_WALLET` on the core deployment the same way as `ETH_USDT_WALLET`. Enable the parent chain (`eth.enabled: true`) so `ethereum-shkeeper` runs.

Invoice endpoint becomes `POST /api/v1/ETH-MYTOKEN/payment_request`. Add the symbol to a rate source mapping if Binance has no `ETH-MYTOKEN` pair (stablecoins are remapped in `RateSource`).

Related: [Adding RPC coins](../../user-guide/adding-rpc-coins-and-tokens.md).
