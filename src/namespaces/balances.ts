import { URLs } from "../constants/urls.js"
import type {
  Core_GetOrgBalancesResponse,
  Core_GetVaultBalancesResponse,
  Core_GetWalletBalancesResponse,
  Core_SyncWalletBalancesResponse,
  GetOrgBalancesQueryParams,
  GetVaultBalancesPathParams,
  GetVaultBalancesQueryParams,
  GetWalletBalancesPathParams,
  GetWalletBalancesQueryParams,
  SyncWalletBalancesPathParams,
} from "../services/balances/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createBalances(t: TypedTransport) {
  return {
    /** Aggregate balances across the entire organization. */
    getOrg: (query?: GetOrgBalancesQueryParams) =>
      t.get<Core_GetOrgBalancesResponse>(URLs.orgBalances, query),

    /** Aggregate balances across all wallets in a vault. */
    getVault: (params: GetVaultBalancesPathParams, query?: GetVaultBalancesQueryParams) =>
      t.get<Core_GetVaultBalancesResponse>(URLs.vaultBalances, { ...params, ...query }),

    /** Balances for a single wallet. */
    getWallet: (params: GetWalletBalancesPathParams, query?: GetWalletBalancesQueryParams) =>
      t.get<Core_GetWalletBalancesResponse>(URLs.walletBalances, { ...params, ...query }),

    /** Request a fresh on-chain sync of a wallet's balances. */
    syncWallet: (params: SyncWalletBalancesPathParams) =>
      t.post<Core_SyncWalletBalancesResponse>(URLs.walletBalancesSync, undefined, params),
  } as const
}
