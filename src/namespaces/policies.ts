import { URLs } from "../constants/urls.js"
import type {
  Core_ListGlobalWalletLimitsResponse,
  Core_ListWalletLimitsResponse,
  Core_WalletLimit,
  CreateWalletLimitBody,
  CreateWalletLimitPathParams,
  DeleteWalletLimitPathParams,
  GetWalletLimitPathParams,
  ListGlobalWalletLimitsQueryParams,
  ListWalletLimitsPathParams,
  ListWalletLimitsQueryParams,
} from "../services/policies/index.js"
import type { TypedTransport } from "../transport/index.js"

/**
 * Wallet-limit policy rules. Limits cap how much a wallet can move within
 * a duration window, scoped to a specific asset (and optionally a contract
 * / matcher).
 */
export function createPolicies(t: TypedTransport) {
  return {
    /** List wallet limits across the entire organization. */
    listGlobalWalletLimits: (query?: ListGlobalWalletLimitsQueryParams) =>
      t.get<Core_ListGlobalWalletLimitsResponse>(URLs.orgWalletLimits, query),

    /** List wallet limits configured on a single wallet. */
    listWalletLimits: (params: ListWalletLimitsPathParams, query?: ListWalletLimitsQueryParams) =>
      t.get<Core_ListWalletLimitsResponse>(URLs.walletLimits, {
        ...params,
        ...query,
      }),

    createWalletLimit: (params: CreateWalletLimitPathParams, body: CreateWalletLimitBody) =>
      t.post<Core_WalletLimit>(URLs.walletLimits, body, params),

    getWalletLimit: (params: GetWalletLimitPathParams) =>
      t.get<Core_WalletLimit>(URLs.walletLimit, params),

    deleteWalletLimit: (params: DeleteWalletLimitPathParams) =>
      t.delete<unknown>(URLs.walletLimit, params),
  } as const
}
