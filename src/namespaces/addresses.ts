import { URLs } from "../constants/urls.js"
import type {
  Core_CounterpartyAddress,
  Core_ListAddressesResponse,
  Core_ListGlobalAddressesResponse,
  CreateCounterpartyAddressBody,
  CreateCounterpartyAddressPathParams,
  DeleteCounterpartyAddressPathParams,
  GetCounterpartyAddressPathParams,
  ListCounterpartyAddressesPathParams,
  ListCounterpartyAddressesQueryParams,
  ListGlobalAddressesQueryParams,
} from "../services/addresses/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createAddresses(t: TypedTransport) {
  return {
    /** Search every counterparty address across the organization. */
    listGlobal: (query?: ListGlobalAddressesQueryParams) =>
      t.get<Core_ListGlobalAddressesResponse>(URLs.globalAddresses, query),

    /** List the addresses of a counterparty. */
    list: (
      params: ListCounterpartyAddressesPathParams,
      query?: ListCounterpartyAddressesQueryParams,
    ) =>
      t.get<Core_ListAddressesResponse>(URLs.counterpartyAddresses, {
        ...params,
        ...query,
      }),

    create: (params: CreateCounterpartyAddressPathParams, body: CreateCounterpartyAddressBody) =>
      t.post<Core_CounterpartyAddress>(URLs.counterpartyAddresses, body, params),

    get: (params: GetCounterpartyAddressPathParams) =>
      t.get<Core_CounterpartyAddress>(URLs.counterpartyAddress, params),

    delete: (params: DeleteCounterpartyAddressPathParams) =>
      t.delete<unknown>(URLs.counterpartyAddress, params),
  } as const
}
