import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_Counterparty = components["schemas"]["v2Counterparty"]
export type Core_CounterpartyAddress = components["schemas"]["counterpartyv2Address"]
export type Core_CreateCounterpartyRequest = components["schemas"]["v2CreateCounterpartyRequest"]
export type Core_ListCounterpartiesResponse = components["schemas"]["v2ListCounterpartiesResponse"]
export type Core_ListAddressesResponse = components["schemas"]["v2ListAddressesResponse"]
export type Core_ListGlobalAddressesResponse =
  components["schemas"]["v2ListGlobalAddressesResponse"]

// ── Counterparties ──────────────────────────────────────────────────────────
export type ListCounterpartiesQueryParams = NonNullable<
  operations["CounterpartyService_ListCounterparties"]["parameters"]["query"]
>
export type GetCounterpartyPathParams =
  operations["CounterpartyService_GetCounterparty"]["parameters"]["path"]
export type UpdateCounterpartyPathParams =
  operations["CounterpartyService_UpdateCounterparty"]["parameters"]["path"]
export type UpdateCounterpartyBody =
  operations["CounterpartyService_UpdateCounterparty"]["requestBody"]["content"]["application/json"]
export type DeleteCounterpartyPathParams =
  operations["CounterpartyService_DeleteCounterparty"]["parameters"]["path"]

// ── Addresses (counterparty-scoped) ─────────────────────────────────────────
export type ListCounterpartyAddressesPathParams =
  operations["CounterpartyService_ListAddresses"]["parameters"]["path"]
export type ListCounterpartyAddressesQueryParams = NonNullable<
  operations["CounterpartyService_ListAddresses"]["parameters"]["query"]
>
export type CreateCounterpartyAddressPathParams =
  operations["CounterpartyService_CreateAddress"]["parameters"]["path"]
export type CreateCounterpartyAddressBody =
  operations["CounterpartyService_CreateAddress"]["requestBody"]["content"]["application/json"]
export type GetCounterpartyAddressPathParams =
  operations["CounterpartyService_GetAddress"]["parameters"]["path"]
export type DeleteCounterpartyAddressPathParams =
  operations["CounterpartyService_DeleteAddress"]["parameters"]["path"]

// ── Global addresses ────────────────────────────────────────────────────────
export type ListGlobalAddressesQueryParams = NonNullable<
  operations["CounterpartyService_ListGlobalAddresses"]["parameters"]["query"]
>
