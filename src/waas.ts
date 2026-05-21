import { DEFAULT_API_URL } from "./constants/defaults.js"
import {
  createAddresses,
  createBalances,
  createCounterparties,
  createPolicies,
  createSweep,
  createTags,
  createTransactions,
  createVaults,
  createWallets,
  createWebhooks,
  createXrpTransactions,
} from "./namespaces/index.js"
import { ApiService } from "./services/apis/api.service.js"
import { AuthService } from "./services/auth/auth.service.js"
import { TypedTransport } from "./transport/typed-transport.js"
import type { WaasClientOptions } from "./waas.types.js"

/**
 * The public client. Compose this once at app boot and access every API
 * surface via `client.<namespace>.<method>()`. All namespaces share a
 * single transport and a single cached OAuth token.
 */
export class Waas {
  private readonly authService: AuthService
  private readonly apiService: ApiService
  private readonly transport: TypedTransport

  public readonly addresses: ReturnType<typeof createAddresses>
  public readonly balances: ReturnType<typeof createBalances>
  public readonly counterparties: ReturnType<typeof createCounterparties>
  public readonly policies: ReturnType<typeof createPolicies>
  public readonly sweep: ReturnType<typeof createSweep>
  public readonly tags: ReturnType<typeof createTags>
  public readonly transactions: ReturnType<typeof createTransactions>
  public readonly vaults: ReturnType<typeof createVaults>
  public readonly wallets: ReturnType<typeof createWallets>
  public readonly webhooks: ReturnType<typeof createWebhooks>
  /** XRP Ledger-specific transaction submissions (account-set, AMM, offers, trust-set, etc.). */
  public readonly xrp: ReturnType<typeof createXrpTransactions>

  constructor(options: WaasClientOptions) {
    const apiUrl = options.apiUrl ?? DEFAULT_API_URL
    this.authService = new AuthService({
      apiUrl,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      timeout: options.timeout,
    })
    this.apiService = new ApiService({
      apiUrl,
      authService: this.authService,
      timeout: options.timeout,
    })
    this.transport = new TypedTransport(this.apiService)

    this.addresses = createAddresses(this.transport)
    this.balances = createBalances(this.transport)
    this.counterparties = createCounterparties(this.transport)
    this.policies = createPolicies(this.transport)
    this.sweep = createSweep(this.transport)
    this.tags = createTags(this.transport)
    this.transactions = createTransactions(this.transport)
    this.vaults = createVaults(this.transport)
    this.wallets = createWallets(this.transport)
    this.webhooks = createWebhooks(this.transport)
    this.xrp = createXrpTransactions(this.transport)
  }

  /**
   * Auth helpers. The token is fetched lazily on the first authenticated
   * request and refreshed automatically before expiry.
   */
  public readonly auth = {
    getAccessToken: (forceRefresh = false): Promise<string> =>
      this.authService.getAccessToken(forceRefresh),
    getSnapshot: () => this.authService.getSnapshot(),
  }
}
