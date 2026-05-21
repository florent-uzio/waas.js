import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
/** The trigger endpoint returns an empty object on success — keep the alias for symmetry. */
export type Core_TriggerSweepConfigurationResponse =
  components["schemas"]["v2TriggerSweepConfigurationResponse"]

// ── TriggerSweepConfiguration ───────────────────────────────────────────────
export type TriggerSweepConfigurationPathParams =
  operations["SweepService_TriggerSweepConfiguration"]["parameters"]["path"]
