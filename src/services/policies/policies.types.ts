import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_WalletLimit = components["schemas"]["v2WalletLimit"]
export type Core_LimitType = components["schemas"]["v2LimitType"]
export type Core_Matcher = components["schemas"]["v2Matcher"]
export type Core_ListGlobalWalletLimitsResponse =
  components["schemas"]["v2ListGlobalWalletLimitsResponse"]
export type Core_ListWalletLimitsResponse = components["schemas"]["v2ListWalletLimitsResponse"]

// ── ListGlobalWalletLimits ──────────────────────────────────────────────────
export type ListGlobalWalletLimitsQueryParams = NonNullable<
  operations["PolicyService_ListGlobalWalletLimits"]["parameters"]["query"]
>

// ── ListWalletLimits ────────────────────────────────────────────────────────
export type ListWalletLimitsPathParams =
  operations["PolicyService_ListWalletLimits"]["parameters"]["path"]
export type ListWalletLimitsQueryParams = NonNullable<
  operations["PolicyService_ListWalletLimits"]["parameters"]["query"]
>

// ── CreateWalletLimit ───────────────────────────────────────────────────────
export type CreateWalletLimitPathParams =
  operations["PolicyService_CreateWalletLimit"]["parameters"]["path"]
export type CreateWalletLimitBody =
  operations["PolicyService_CreateWalletLimit"]["requestBody"]["content"]["application/json"]

// ── GetWalletLimit / DeleteWalletLimit ──────────────────────────────────────
export type GetWalletLimitPathParams =
  operations["PolicyService_GetWalletLimit"]["parameters"]["path"]
export type DeleteWalletLimitPathParams =
  operations["PolicyService_DeleteWalletLimit"]["parameters"]["path"]
