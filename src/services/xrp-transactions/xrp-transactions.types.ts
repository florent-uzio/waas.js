import type { operations } from "../../models/waas-types.js"

/**
 * Every XRP transaction submission endpoint has the same path params
 * (`{ vaultId, walletId }`) and returns `Core_Transaction`. Only the body
 * differs per transaction type.
 */
export type SubmitXrpTxPathParams =
  operations["TransactionsService_SubmitAccountSet"]["parameters"]["path"]

// ── Per-operation request bodies ────────────────────────────────────────────
export type SubmitAccountSetBody =
  operations["TransactionsService_SubmitAccountSet"]["requestBody"]["content"]["application/json"]

export type SubmitAmmCreateBody =
  operations["TransactionsService_SubmitAMMCreate"]["requestBody"]["content"]["application/json"]

export type SubmitAmmDepositBody =
  operations["TransactionsService_SubmitAMMDeposit"]["requestBody"]["content"]["application/json"]

export type SubmitAmmWithdrawBody =
  operations["TransactionsService_SubmitAMMWithdraw"]["requestBody"]["content"]["application/json"]

export type SubmitClawbackBody =
  operations["TransactionsService_SubmitClawback"]["requestBody"]["content"]["application/json"]

export type SubmitOfferCancelBody =
  operations["TransactionsService_SubmitOfferCancel"]["requestBody"]["content"]["application/json"]

export type SubmitOfferCreateBody =
  operations["TransactionsService_SubmitOfferCreate"]["requestBody"]["content"]["application/json"]

export type SubmitSignerListSetBody =
  operations["TransactionsService_SubmitSignerListSet"]["requestBody"]["content"]["application/json"]

export type SubmitTrustSetBody =
  operations["TransactionsService_SubmitTrustSet"]["requestBody"]["content"]["application/json"]
