import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_Wallet = components["schemas"]["vaultv2Wallet"]
export type Core_WalletTag = components["schemas"]["v2WalletTag"]
export type Core_ListVaultWalletsResponse = components["schemas"]["v2ListVaultWalletsResponse"]
export type Core_ListGlobalWalletsResponse = components["schemas"]["v2ListGlobalWalletsResponse"]
export type Core_GetWalletBalancesResponse = components["schemas"]["v2GetWalletBalancesResponse"]
export type Core_GetWalletSequenceResponse = components["schemas"]["v2GetWalletSequenceResponse"]

// ── ListVaultWallets ────────────────────────────────────────────────────────
export type ListVaultWalletsPathParams =
  operations["VaultService_ListVaultWallets"]["parameters"]["path"]
export type ListVaultWalletsQueryParams = NonNullable<
  operations["VaultService_ListVaultWallets"]["parameters"]["query"]
>

// ── ListGlobalWallets ───────────────────────────────────────────────────────
export type ListGlobalWalletsQueryParams = NonNullable<
  operations["VaultService_ListGlobalWallets"]["parameters"]["query"]
>

// ── CreateWallet ────────────────────────────────────────────────────────────
export type CreateWalletPathParams = operations["VaultService_CreateWallet"]["parameters"]["path"]
export type CreateWalletBody =
  operations["VaultService_CreateWallet"]["requestBody"]["content"]["application/json"]

// ── GetWallet / UpdateWallet / DeleteWallet ─────────────────────────────────
export type GetWalletPathParams = operations["VaultService_GetWallet"]["parameters"]["path"]
export type UpdateWalletPathParams = operations["VaultService_UpdateWallet"]["parameters"]["path"]
export type UpdateWalletBody =
  operations["VaultService_UpdateWallet"]["requestBody"]["content"]["application/json"]
export type DeleteWalletPathParams = operations["VaultService_DeleteWallet"]["parameters"]["path"]

// ── GetWalletByID (org-wide lookup) ─────────────────────────────────────────
export type GetWalletByIdPathParams = operations["VaultService_GetWalletByID"]["parameters"]["path"]

// ── Balances ────────────────────────────────────────────────────────────────
export type GetWalletBalancesPathParams =
  operations["BalanceService_GetWalletBalances"]["parameters"]["path"]
export type GetWalletBalancesQueryParams = NonNullable<
  operations["BalanceService_GetWalletBalances"]["parameters"]["query"]
>
export type SyncWalletBalancesPathParams =
  operations["BalanceService_SyncWalletBalances"]["parameters"]["path"]

// ── Sequence / Settings ─────────────────────────────────────────────────────
export type GetWalletSequencePathParams =
  operations["VaultService_GetWalletSequence"]["parameters"]["path"]
export type UpdateWalletSettingsPathParams =
  operations["VaultService_UpdateWalletSettings"]["parameters"]["path"]
export type UpdateWalletSettingsBody =
  operations["VaultService_UpdateWalletSettings"]["requestBody"]["content"]["application/json"]
