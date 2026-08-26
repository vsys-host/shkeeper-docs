---
title: Network Confirmations
---

# Network Confirmations

Each wallet stores `confirmations` (default **1**). After a deposit is seen, SHKeeper keeps `need_more_confirmations=true` until the coin backend reports at least that many confirmations for the txid.

```text
confirmations_on_chain >= wallet.confirmations  →  callback eligible
```

The invoice callback is still delayed by `NOTIFICATION_TASK_DELAY` (default 60 seconds) after the transaction is created.

Set the threshold in the wallet UI, or through the wallet settings API (`POST /api/v1/<crypto>/autopayout` includes confirmation-related wallet fields used by the dashboard). Helm preset: [Safe confirmations](../../tutorials/helm_configs/safe_confirmation.md).

Unconfirmed sightings can emit a separate payload if `UNCONFIRMED_TX_NOTIFICATION` is enabled (`status: unconfirmed`). Treat those as **not final**. Do not fulfill orders until `paid` is true and you have verified the HMAC signature.

Payouts use a different knob: `MIN_CONFIRMATION_BLOCK_FOR_PAYOUT` (default `1`) before status `SUCCESS` and the payout webhook.

Related: [Flash payments](../flash-payments-fraud-protection.md), [Sync settings](../sync-settings.md).
