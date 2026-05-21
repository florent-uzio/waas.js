import { URLs } from "../constants/urls.js"
import type { Core_SyncWalletBalancesResponse } from "../services/balances/index.js"
import type {
  Core_GetWalletBalancesResponse,
  Core_GetWalletSequenceResponse,
  Core_ListGlobalWalletsResponse,
  Core_ListVaultWalletsResponse,
  Core_Wallet,
  CreateWalletBody,
  CreateWalletPathParams,
  DeleteWalletPathParams,
  GetWalletBalancesPathParams,
  GetWalletBalancesQueryParams,
  GetWalletByIdPathParams,
  GetWalletPathParams,
  GetWalletSequencePathParams,
  ListGlobalWalletsQueryParams,
  ListVaultWalletsPathParams,
  ListVaultWalletsQueryParams,
  SyncWalletBalancesPathParams,
  UpdateWalletBody,
  UpdateWalletPathParams,
  UpdateWalletSettingsBody,
  UpdateWalletSettingsPathParams,
} from "../services/wallets/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createWallets(t: TypedTransport) {
  return {
    /** List wallets across the organization. */
    listGlobal: (query?: ListGlobalWalletsQueryParams) =>
      t.get<Core_ListGlobalWalletsResponse>(URLs.wallets, query),

    /** Get a wallet by ID (org-wide lookup). */
    getById: (params: GetWalletByIdPathParams) => t.get<Core_Wallet>(URLs.wallet, params),

    /** List wallets within a vault. */
    list: (params: ListVaultWalletsPathParams, query?: ListVaultWalletsQueryParams) =>
      t.get<Core_ListVaultWalletsResponse>(URLs.vaultWallets, { ...params, ...query }),

    /** Create a new wallet within a vault. */
    create: (params: CreateWalletPathParams, body: CreateWalletBody) =>
      t.post<Core_Wallet>(URLs.vaultWallets, body, params),

    get: (params: GetWalletPathParams) => t.get<Core_Wallet>(URLs.walletById, params),

    update: (params: UpdateWalletPathParams, body: UpdateWalletBody) =>
      t.put<Core_Wallet>(URLs.walletById, body, params),

    delete: (params: DeleteWalletPathParams) => t.delete<unknown>(URLs.walletById, params),

    getBalances: (params: GetWalletBalancesPathParams, query?: GetWalletBalancesQueryParams) =>
      t.get<Core_GetWalletBalancesResponse>(URLs.walletBalances, { ...params, ...query }),

    syncBalances: (params: SyncWalletBalancesPathParams) =>
      t.post<Core_SyncWalletBalancesResponse>(URLs.walletBalancesSync, undefined, params),

    getSequence: (params: GetWalletSequencePathParams) =>
      t.get<Core_GetWalletSequenceResponse>(URLs.walletSequence, params),

    updateSettings: (params: UpdateWalletSettingsPathParams, body: UpdateWalletSettingsBody) =>
      t.put<Core_Wallet>(URLs.walletSettings, body, params),
  } as const
}
