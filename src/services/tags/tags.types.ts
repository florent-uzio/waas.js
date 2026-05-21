import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_ListGlobalTagsResponse = components["schemas"]["v2ListGlobalTagsResponse"]

// ── ListWalletTagsInVault ───────────────────────────────────────────────────
export type ListWalletTagsInVaultPathParams =
  operations["VaultService_ListWalletTagsInVault"]["parameters"]["path"]

// ── ListWalletTags / AddWalletTag / DeleteWalletTag ─────────────────────────
export type ListWalletTagsPathParams =
  operations["VaultService_ListWalletTags"]["parameters"]["path"]
export type AddWalletTagPathParams = operations["VaultService_AddWalletTag"]["parameters"]["path"]
export type AddWalletTagBody =
  operations["VaultService_AddWalletTag"]["requestBody"]["content"]["application/json"]
export type DeleteWalletTagPathParams =
  operations["VaultService_DeleteWalletTag"]["parameters"]["path"]
export type DeleteWalletTagQueryParams = NonNullable<
  operations["VaultService_DeleteWalletTag"]["parameters"]["query"]
>
