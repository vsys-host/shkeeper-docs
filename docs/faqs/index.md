---
title: FAQs
slug: /faqs
---

## What coins are supported?
SHKeeper supports major blockchains such as Bitcoin, Litecoin, Dogecoin, Ethereum, Tron, Binance Smart Chain, Polygon, Avalanche, and XRP. Support is constantly expanding.

## How to set dynamic pricing?
Dynamic pricing can be set via API by linking SHKeeper to your own exchange rate source or using built-in market price providers.

## Is there crypto-to-fiat support?
No, SHKeeper does not convert crypto to fiat. You receive payments directly in cryptocurrency.

## What about smart contracts for payments?
For Ethereum and EVM chains, SHKeeper works with standard token transfers. Custom smart contracts are not directly supported.

## Lite wallets supported?
Yes, you can connect lightweight wallets (xpub, view-only wallets) for watch-only mode without storing private keys on the server.

## What is cloud service pricing?
The open-source version is free. Cloud service pricing depends on subscription level (contact sales for details).

## Testnet usage?
Yes, SHKeeper can work with testnet networks for development and testing purposes.

## Upload to the server or manual integration?
You can deploy SHKeeper on your own server (Docker, Helm, manual install) or integrate directly via API.

## Does SHKeeper generate a unique wallet for every transaction?
Yes, each transaction can have a unique deposit address generated from your wallet’s xpub.

## What if the WHMCS invoices are not marked as paid?
Check callback settings and confirm SHKeeper IPN is enabled. The system retries callbacks until acknowledged.

## Does SHKeeper support IPN callbacks for Telegram Bot?
Yes, you can use webhook/IPN callbacks to integrate with Telegram bots or any external service.

## Is there a custom admin dashboard for managing merchants?
Yes, SHKeeper provides a web dashboard to manage merchants, wallets, and transactions.

## Can I set different rates/fees?
Yes, you can configure custom fees per merchant or globally.

## Can I run SHKeeper without root?
Yes, SHKeeper can be run as a regular user via Docker or system services, no root required.

## Can my customer make a refund?
Refunds are not automated. You control outgoing transactions and can send funds back manually.