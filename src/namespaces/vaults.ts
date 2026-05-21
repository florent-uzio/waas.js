import { URLs } from "../constants/urls.js"
import type {
  AddVaultTagBody,
  AddVaultTagPathParams,
  Core_CreateVaultRequest,
  Core_GetVaultBalancesResponse,
  Core_ListVaultsResponse,
  Core_Vault,
  Core_VaultTag,
  DeleteVaultTagPathParams,
  DeleteVaultTagQueryParams,
  GetVaultBalancesPathParams,
  GetVaultBalancesQueryParams,
  GetVaultPathParams,
  ListVaultsQueryParams,
  ListVaultTagsPathParams,
  UpdateVaultBody,
  UpdateVaultPathParams,
} from "../services/vaults/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createVaults(t: TypedTransport) {
  return {
    list: (query?: ListVaultsQueryParams) => t.get<Core_ListVaultsResponse>(URLs.vaults, query),

    create: (body: Core_CreateVaultRequest) => t.post<Core_Vault>(URLs.vaults, body),

    get: (params: GetVaultPathParams) => t.get<Core_Vault>(URLs.vault, params),

    update: (params: UpdateVaultPathParams, body: UpdateVaultBody) =>
      t.put<Core_Vault>(URLs.vault, body, params),

    getBalances: (params: GetVaultBalancesPathParams, query?: GetVaultBalancesQueryParams) =>
      t.get<Core_GetVaultBalancesResponse>(URLs.vaultBalances, { ...params, ...query }),

    listTags: (params: ListVaultTagsPathParams) => t.get<Core_VaultTag[]>(URLs.vaultTags, params),

    addTag: (params: AddVaultTagPathParams, body: AddVaultTagBody) =>
      t.post<Core_VaultTag[]>(URLs.vaultTags, body, params),

    deleteTag: (params: DeleteVaultTagPathParams, query: DeleteVaultTagQueryParams) =>
      t.delete<unknown>(URLs.vaultTags, { ...params, ...query }),
  } as const
}
