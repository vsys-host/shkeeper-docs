---
title: Can I Add My Own RPC Coin or Token?
---

# Can I Add My Own RPC Coin or Token?

Yes, in source, not from the dashboard. Enable coins that already exist with Helm `*.enabled` / `*_WALLET=enabled`. New ERC-20s need a `TOKENS` entry in `ethereum_like_coin` plus a `Crypto` subclass in `shkeeper.io`. New chains need a wallet service and Helm templates.

Full steps: [Adding RPC coins and tokens](./adding-rpc-coins-and-tokens.md), [Create your own token](../developer-guide/extensions/create-own-token.md).
