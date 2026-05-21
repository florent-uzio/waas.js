import { URLs } from "../constants/urls.js"
import type {
  AddWalletTagBody,
  AddWalletTagPathParams,
  Core_ListGlobalTagsResponse,
  DeleteWalletTagPathParams,
  DeleteWalletTagQueryParams,
  ListWalletTagsInVaultPathParams,
  ListWalletTagsPathParams,
} from "../services/tags/index.js"
import type {
  AddVaultTagBody,
  AddVaultTagPathParams,
  Core_VaultTag,
  DeleteVaultTagPathParams,
  DeleteVaultTagQueryParams,
  ListVaultTagsPathParams,
} from "../services/vaults/index.js"
import type { Core_WalletTag } from "../services/wallets/index.js"
import type { TypedTransport } from "../transport/index.js"

/**
 * One-stop namespace for tag operations across the organization, vaults,
 * and wallets. Vault-tag CRUD also lives on `client.vaults.*` for ergonomic
 * symmetry; the underlying HTTP calls are the same.
 */
export function createTags(t: TypedTransport) {
  return {
    // ── Org-wide ──────────────────────────────────────────────────────────
    /** List every tag (vault + wallet) configured anywhere in the organization. */
    listOrg: () => t.get<Core_ListGlobalTagsResponse>(URLs.orgTags),

    /** List every vault tag configured anywhere in the organization. */
    listGlobalVaultTags: () => t.get<Core_VaultTag[]>(URLs.vaultsTags),

    // ── Vault tags ────────────────────────────────────────────────────────
    listVaultTags: (params: ListVaultTagsPathParams) =>
      t.get<Core_VaultTag[]>(URLs.vaultTags, params),

    addVaultTag: (params: AddVaultTagPathParams, body: AddVaultTagBody) =>
      t.post<Core_VaultTag[]>(URLs.vaultTags, body, params),

    deleteVaultTag: (params: DeleteVaultTagPathParams, query: DeleteVaultTagQueryParams) =>
      t.delete<unknown>(URLs.vaultTags, { ...params, ...query }),

    // ── Wallet tags ───────────────────────────────────────────────────────
    /** List every wallet tag in use across all wallets within a vault. */
    listWalletTagsInVault: (params: ListWalletTagsInVaultPathParams) =>
      t.get<Core_WalletTag[]>(URLs.vaultWalletsTags, params),

    listWalletTags: (params: ListWalletTagsPathParams) =>
      t.get<Core_WalletTag[]>(URLs.walletTags, params),

    addWalletTag: (params: AddWalletTagPathParams, body: AddWalletTagBody) =>
      t.post<Core_WalletTag[]>(URLs.walletTags, body, params),

    deleteWalletTag: (params: DeleteWalletTagPathParams, query: DeleteWalletTagQueryParams) =>
      t.delete<unknown>(URLs.walletTags, { ...params, ...query }),
  } as const
}
