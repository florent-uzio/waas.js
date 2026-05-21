export interface AuthServiceOptions {
  /** Base URL of the Palisade API (sandbox or mainnet). */
  apiUrl: string
  /** OAuth client ID. */
  clientId: string
  /** OAuth client secret. */
  clientSecret: string
  /** Optional per-request timeout, in ms. */
  timeout?: number
}

export interface TokenSnapshot {
  /** The current access token, or `undefined` if none has been fetched. */
  accessToken: string | undefined
  /** Unix epoch ms at which the token expires (best-effort, with safety buffer). */
  expiresAt: number | undefined
}
