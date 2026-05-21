import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_Vault = components["schemas"]["v2Vault"]
export type Core_VaultTag = components["schemas"]["v2VaultTag"]
export type Core_CreateVaultRequest = components["schemas"]["v2CreateVaultRequest"]
export type Core_ListVaultsResponse = components["schemas"]["v2ListVaultsResponse"]
export type Core_GetVaultBalancesResponse = components["schemas"]["v2GetVaultBalancesResponse"]

// ── ListVaults ──────────────────────────────────────────────────────────────
export type ListVaultsQueryParams = NonNullable<
  operations["VaultService_ListVaults"]["parameters"]["query"]
>

// ── GetVault ────────────────────────────────────────────────────────────────
export type GetVaultPathParams = operations["VaultService_GetVault"]["parameters"]["path"]

// ── UpdateVault ─────────────────────────────────────────────────────────────
export type UpdateVaultPathParams = operations["VaultService_UpdateVault"]["parameters"]["path"]
export type UpdateVaultBody =
  operations["VaultService_UpdateVault"]["requestBody"]["content"]["application/json"]

// ── Vault balances ──────────────────────────────────────────────────────────
export type GetVaultBalancesPathParams =
  operations["BalanceService_GetVaultBalances"]["parameters"]["path"]
export type GetVaultBalancesQueryParams = NonNullable<
  operations["BalanceService_GetVaultBalances"]["parameters"]["query"]
>

// ── Vault tags ──────────────────────────────────────────────────────────────
export type ListVaultTagsPathParams = operations["VaultService_ListVaultTags"]["parameters"]["path"]
export type AddVaultTagPathParams = operations["VaultService_AddVaultTag"]["parameters"]["path"]
export type AddVaultTagBody =
  operations["VaultService_AddVaultTag"]["requestBody"]["content"]["application/json"]
export type DeleteVaultTagPathParams =
  operations["VaultService_DeleteVaultTag"]["parameters"]["path"]
export type DeleteVaultTagQueryParams = NonNullable<
  operations["VaultService_DeleteVaultTag"]["parameters"]["query"]
>
