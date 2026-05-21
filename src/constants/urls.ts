import type { paths } from "../models/waas-types.js"

export type PathKeys = keyof paths

function createURLs<T extends Record<string, PathKeys>>(urls: T): T {
  return urls
}

/**
 * Central registry of every URL template the SDK knows about. Each value is
 * constrained to be a literal key of the generated `paths` map, so a typo
 * fails at compile time. Path params use `{name}` placeholders that
 * `TypedTransport` interpolates at request time.
 */
export const URLs = createURLs({
  // Auth
  oauthToken: "/v2/credentials/oauth/token",

  // Vaults
  vaults: "/v2/vaults",
  vault: "/v2/vaults/{id}",
  vaultBalances: "/v2/vaults/{vaultId}/balances",
  vaultTags: "/v2/vaults/{vaultId}/tags",
  vaultsTags: "/v2/vaults/tags",
  vaultWallets: "/v2/vaults/{vaultId}/wallets",
  vaultWalletsTags: "/v2/vaults/{vaultId}/wallets/tags",

  // Wallets
  wallets: "/v2/wallets",
  wallet: "/v2/wallets/{id}",
  walletById: "/v2/vaults/{vaultId}/wallets/{walletId}",
  walletBalances: "/v2/vaults/{vaultId}/wallets/{walletId}/balances",
  walletBalancesSync: "/v2/vaults/{vaultId}/wallets/{walletId}/balances/sync",
  walletSequence: "/v2/vaults/{vaultId}/wallets/{walletId}/sequence",
  walletSettings: "/v2/vaults/{vaultId}/wallets/{walletId}/settings",
  walletTags: "/v2/vaults/{vaultId}/wallets/{walletId}/tags",
  walletLimits: "/v2/vaults/{vaultId}/wallets/{walletId}/policy-rules/limits",
  walletLimit: "/v2/vaults/{vaultId}/wallets/{walletId}/policy-rules/limits/{id}",

  // Transactions
  walletTransactions: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions",
  walletTransaction: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/{transactionId}",
  walletTransactionRaw: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/raw",
  walletTransactionSignPlaintext:
    "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/sign-plaintext",
  walletTransactionTransfer: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/transfer",
  walletTransactionFreeze:
    "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/{transactionId}/freeze",
  walletTransactionUnfreeze:
    "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/{transactionId}/unfreeze",
  transferEstimateFee: "/v2/transactions/transfer/estimate-fee",
  sweepTransactions: "/v2/transactions/sweep/{sweepId}",

  // XRP-specific transactions
  xrpAccountSet: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/account-set",
  xrpAmmCreate: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/amm-create",
  xrpAmmDeposit: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/amm-deposit",
  xrpAmmWithdraw: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/amm-withdraw",
  xrpClawback: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/clawback",
  xrpOfferCancel: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/offer-cancel",
  xrpOfferCreate: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/offer-create",
  xrpSignerListSet: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/signer-list-set",
  xrpTrustSet: "/v2/vaults/{vaultId}/wallets/{walletId}/transactions/xrp/trust-set",

  // Addresses & counterparties
  globalAddresses: "/v2/addresses",
  counterparties: "/v2/counterparties",
  counterparty: "/v2/counterparties/{id}",
  counterpartyAddresses: "/v2/counterparties/{counterpartyId}/addresses",
  counterpartyAddress: "/v2/counterparties/{counterpartyId}/addresses/{addressId}",

  // Balances
  orgBalances: "/v2/balances",

  // Tags & policies
  orgTags: "/v2/tags",
  orgWalletLimits: "/v2/policy-rules/limits",

  // Webhooks
  webhooks: "/v2/webhooks",
  webhook: "/v2/webhooks/{id}",
  webhookSubscriptions: "/v2/webhooks/{webhookId}/subscriptions",
  webhookSubscription: "/v2/webhooks/{webhookId}/subscriptions/{subscriptionId}",

  // Sweep
  sweepTrigger: "/v2/workflows/sweep/{id}/trigger",
} as const)
