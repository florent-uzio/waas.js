import { URLs } from "../constants/urls.js"
import type {
  Core_Counterparty,
  Core_CreateCounterpartyRequest,
  Core_ListCounterpartiesResponse,
  DeleteCounterpartyPathParams,
  GetCounterpartyPathParams,
  ListCounterpartiesQueryParams,
  UpdateCounterpartyBody,
  UpdateCounterpartyPathParams,
} from "../services/addresses/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createCounterparties(t: TypedTransport) {
  return {
    list: (query?: ListCounterpartiesQueryParams) =>
      t.get<Core_ListCounterpartiesResponse>(URLs.counterparties, query),

    create: (body: Core_CreateCounterpartyRequest) =>
      t.post<Core_Counterparty>(URLs.counterparties, body),

    get: (params: GetCounterpartyPathParams) => t.get<Core_Counterparty>(URLs.counterparty, params),

    update: (params: UpdateCounterpartyPathParams, body: UpdateCounterpartyBody) =>
      t.put<Core_Counterparty>(URLs.counterparty, body, params),

    delete: (params: DeleteCounterpartyPathParams) => t.delete<unknown>(URLs.counterparty, params),
  } as const
}
