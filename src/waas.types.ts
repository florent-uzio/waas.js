export interface WaasClientOptions {
  /**
   * OAuth client ID issued by Palisade.
   */
  clientId: string

  /**
   * OAuth client secret issued by Palisade.
   */
  clientSecret: string

  /**
   * Base URL of the Palisade API. Defaults to the sandbox host.
   * Use `https://api.palisade.co` for mainnet.
   */
  apiUrl?: string

  /**
   * Default request timeout, in milliseconds.
   */
  timeout?: number
}
