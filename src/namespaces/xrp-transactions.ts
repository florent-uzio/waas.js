import { URLs } from "../constants/urls.js"
import type { Core_Transaction } from "../services/transactions/index.js"
import type {
  SubmitAccountSetBody,
  SubmitAmmCreateBody,
  SubmitAmmDepositBody,
  SubmitAmmWithdrawBody,
  SubmitClawbackBody,
  SubmitOfferCancelBody,
  SubmitOfferCreateBody,
  SubmitSignerListSetBody,
  SubmitTrustSetBody,
  SubmitXrpTxPathParams,
} from "../services/xrp-transactions/index.js"
import type { TypedTransport } from "../transport/index.js"

/**
 * XRP Ledger-specific transaction submissions. Every method submits one
 * transaction type against a `{vaultId, walletId}` and resolves to the
 * resulting `Core_Transaction`.
 */
export function createXrpTransactions(t: TypedTransport) {
  return {
    accountSet: (params: SubmitXrpTxPathParams, body: SubmitAccountSetBody) =>
      t.post<Core_Transaction>(URLs.xrpAccountSet, body, params),

    ammCreate: (params: SubmitXrpTxPathParams, body: SubmitAmmCreateBody) =>
      t.post<Core_Transaction>(URLs.xrpAmmCreate, body, params),

    ammDeposit: (params: SubmitXrpTxPathParams, body: SubmitAmmDepositBody) =>
      t.post<Core_Transaction>(URLs.xrpAmmDeposit, body, params),

    ammWithdraw: (params: SubmitXrpTxPathParams, body: SubmitAmmWithdrawBody) =>
      t.post<Core_Transaction>(URLs.xrpAmmWithdraw, body, params),

    clawback: (params: SubmitXrpTxPathParams, body: SubmitClawbackBody) =>
      t.post<Core_Transaction>(URLs.xrpClawback, body, params),

    offerCancel: (params: SubmitXrpTxPathParams, body: SubmitOfferCancelBody) =>
      t.post<Core_Transaction>(URLs.xrpOfferCancel, body, params),

    offerCreate: (params: SubmitXrpTxPathParams, body: SubmitOfferCreateBody) =>
      t.post<Core_Transaction>(URLs.xrpOfferCreate, body, params),

    signerListSet: (params: SubmitXrpTxPathParams, body: SubmitSignerListSetBody) =>
      t.post<Core_Transaction>(URLs.xrpSignerListSet, body, params),

    trustSet: (params: SubmitXrpTxPathParams, body: SubmitTrustSetBody) =>
      t.post<Core_Transaction>(URLs.xrpTrustSet, body, params),
  } as const
}
