import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_GetOrgBalancesResponse = components["schemas"]["v2GetOrgBalancesResponse"]
export type Core_GetVaultBalancesResponse = components["schemas"]["v2GetVaultBalancesResponse"]
export type Core_GetWalletBalancesResponse = components["schemas"]["v2GetWalletBalancesResponse"]
export type Core_SyncWalletBalancesResponse = components["schemas"]["v2SyncWalletBalancesResponse"]

// ── GetOrgBalances ──────────────────────────────────────────────────────────
export type GetOrgBalancesQueryParams = NonNullable<
  operations["BalanceService_GetOrgBalances"]["parameters"]["query"]
>

// ── GetVaultBalances ────────────────────────────────────────────────────────
export type GetVaultBalancesPathParams =
  operations["BalanceService_GetVaultBalances"]["parameters"]["path"]
export type GetVaultBalancesQueryParams = NonNullable<
  operations["BalanceService_GetVaultBalances"]["parameters"]["query"]
>

// ── GetWalletBalances ───────────────────────────────────────────────────────
export type GetWalletBalancesPathParams =
  operations["BalanceService_GetWalletBalances"]["parameters"]["path"]
export type GetWalletBalancesQueryParams = NonNullable<
  operations["BalanceService_GetWalletBalances"]["parameters"]["query"]
>

// ── SyncWalletBalances ──────────────────────────────────────────────────────
export type SyncWalletBalancesPathParams =
  operations["BalanceService_SyncWalletBalances"]["parameters"]["path"]
