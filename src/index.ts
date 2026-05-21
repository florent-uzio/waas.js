// Public client
export { Waas } from "./waas.js"
export type { WaasClientOptions } from "./waas.types.js"

// Errors + constants
export { DEFAULT_API_URL, DEFAULT_TIMEOUT_MS } from "./constants/defaults.js"
export { WaasError } from "./models/waas-error.js"
export type { Core_ErrorMessage } from "./models/waas-error.js"

// Generated type maps — consumers can reach into `components["schemas"]["…"]`
// or `operations["…"]` when they need a type the SDK has not aliased.
export type { components, operations, paths } from "./models/waas-types.js"

// Resource types (re-exports of the per-service barrels)
export type * from "./services/addresses/index.js"
export type * from "./services/policies/index.js"
export type * from "./services/sweep/index.js"
export type * from "./services/tags/index.js"
export type * from "./services/transactions/index.js"
export type * from "./services/vaults/index.js"
export type * from "./services/wallets/index.js"
export type * from "./services/webhooks/index.js"
export type * from "./services/xrp-transactions/index.js"

// Balances service only re-exports the symbols not already covered by the
// vaults/wallets barrels (vault and wallet balance types are canonical there).
export type {
  Core_GetOrgBalancesResponse,
  Core_SyncWalletBalancesResponse,
  GetOrgBalancesQueryParams,
} from "./services/balances/index.js"

// Auth snapshot type
export type { TokenSnapshot } from "./services/auth/auth.service.types.js"
