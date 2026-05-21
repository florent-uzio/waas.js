import { URLs } from "../constants/urls.js"
import type {
  Core_TriggerSweepConfigurationResponse,
  TriggerSweepConfigurationPathParams,
} from "../services/sweep/index.js"
import type {
  Core_ListSweepInstanceTransactionsResponse,
  ListSweepInstanceTransactionsPathParams,
} from "../services/transactions/index.js"
import type { TypedTransport } from "../transport/index.js"

/**
 * Sweep configurations and their derived instances.
 *
 * Listing the transactions of a sweep instance also lives at
 * `client.transactions.listForSweep` (the underlying call is identical) —
 * it's mirrored here so the sweep workflow has one ergonomic entry point.
 */
export function createSweep(t: TypedTransport) {
  return {
    /** Manually trigger a sweep configuration to run now. */
    trigger: (params: TriggerSweepConfigurationPathParams) =>
      t.post<Core_TriggerSweepConfigurationResponse>(URLs.sweepTrigger, undefined, params),

    /** List every transaction created by a sweep instance. */
    listInstanceTransactions: (params: ListSweepInstanceTransactionsPathParams) =>
      t.get<Core_ListSweepInstanceTransactionsResponse>(URLs.sweepTransactions, params),
  } as const
}
