import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_Transaction = components["schemas"]["transactionsv2Transaction"]
export type Core_ListWalletTransactionsResponse =
  components["schemas"]["v2ListWalletTransactionsResponse"]
export type Core_ListSweepInstanceTransactionsResponse =
  components["schemas"]["v2ListSweepInstanceTransactionsResponse"]
export type Core_EstimateTransferFeeResponse =
  components["schemas"]["v2EstimateTransferFeeResponse"]

// ── List + Get + Freeze/Unfreeze ────────────────────────────────────────────
export type ListWalletTransactionsPathParams =
  operations["TransactionsService_ListWalletTransactions"]["parameters"]["path"]
export type ListWalletTransactionsQueryParams = NonNullable<
  operations["TransactionsService_ListWalletTransactions"]["parameters"]["query"]
>
export type GetTransactionPathParams =
  operations["TransactionsService_GetTransaction"]["parameters"]["path"]
export type FreezeTransactionPathParams =
  operations["TransactionsService_FreezeTransaction"]["parameters"]["path"]
export type UnfreezeTransactionPathParams =
  operations["TransactionsService_UnfreezeTransaction"]["parameters"]["path"]

// ── Raw / SignPlaintext / Transfer ──────────────────────────────────────────
export type RawTransactionPathParams =
  operations["TransactionsService_RawTransaction"]["parameters"]["path"]
export type RawTransactionBody =
  operations["TransactionsService_RawTransaction"]["requestBody"]["content"]["application/json"]

export type SignPlaintextPathParams =
  operations["TransactionsService_SignPlaintext"]["parameters"]["path"]
export type SignPlaintextBody =
  operations["TransactionsService_SignPlaintext"]["requestBody"]["content"]["application/json"]

export type TransferTransactionPathParams =
  operations["TransactionsService_TransferTransaction"]["parameters"]["path"]
export type TransferTransactionBody =
  operations["TransactionsService_TransferTransaction"]["requestBody"]["content"]["application/json"]

// ── Fee estimation ──────────────────────────────────────────────────────────
export type EstimateTransferFeeBody =
  operations["TransactionsService_EstimateTransferFee"]["requestBody"]["content"]["application/json"]

// ── Sweep listing ───────────────────────────────────────────────────────────
export type ListSweepInstanceTransactionsPathParams =
  operations["TransactionsService_ListSweepInstanceTransactions"]["parameters"]["path"]
