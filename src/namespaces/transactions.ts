import { URLs } from "../constants/urls.js"
import type {
  Core_EstimateTransferFeeResponse,
  Core_ListSweepInstanceTransactionsResponse,
  Core_ListWalletTransactionsResponse,
  Core_Transaction,
  EstimateTransferFeeBody,
  FreezeTransactionPathParams,
  GetTransactionPathParams,
  ListSweepInstanceTransactionsPathParams,
  ListWalletTransactionsPathParams,
  ListWalletTransactionsQueryParams,
  RawTransactionBody,
  RawTransactionPathParams,
  SignPlaintextBody,
  SignPlaintextPathParams,
  TransferTransactionBody,
  TransferTransactionPathParams,
  UnfreezeTransactionPathParams,
} from "../services/transactions/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createTransactions(t: TypedTransport) {
  return {
    list: (params: ListWalletTransactionsPathParams, query?: ListWalletTransactionsQueryParams) =>
      t.get<Core_ListWalletTransactionsResponse>(URLs.walletTransactions, {
        ...params,
        ...query,
      }),

    get: (params: GetTransactionPathParams) =>
      t.get<Core_Transaction>(URLs.walletTransaction, params),

    freeze: (params: FreezeTransactionPathParams) =>
      t.post<Core_Transaction>(URLs.walletTransactionFreeze, undefined, params),

    unfreeze: (params: UnfreezeTransactionPathParams) =>
      t.post<Core_Transaction>(URLs.walletTransactionUnfreeze, undefined, params),

    raw: (params: RawTransactionPathParams, body: RawTransactionBody) =>
      t.post<Core_Transaction>(URLs.walletTransactionRaw, body, params),

    signPlaintext: (params: SignPlaintextPathParams, body: SignPlaintextBody) =>
      t.post<Core_Transaction>(URLs.walletTransactionSignPlaintext, body, params),

    transfer: (params: TransferTransactionPathParams, body: TransferTransactionBody) =>
      t.post<Core_Transaction>(URLs.walletTransactionTransfer, body, params),

    estimateTransferFee: (body: EstimateTransferFeeBody) =>
      t.post<Core_EstimateTransferFeeResponse>(URLs.transferEstimateFee, body),

    listForSweep: (params: ListSweepInstanceTransactionsPathParams) =>
      t.get<Core_ListSweepInstanceTransactionsResponse>(URLs.sweepTransactions, params),
  } as const
}
