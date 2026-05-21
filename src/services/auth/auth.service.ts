import axios, { type AxiosInstance } from "axios"
import { DEFAULT_TIMEOUT_MS, TOKEN_EXPIRY_BUFFER_MS } from "../../constants/defaults.js"
import { URLs } from "../../constants/urls.js"
import { WaasError } from "../../models/waas-error.js"
import type { components } from "../../models/waas-types.js"
import type { AuthServiceOptions, TokenSnapshot } from "./auth.service.types.js"

type ExchangeRequest = components["schemas"]["v2ExchangeCredentialRequest"]
type ExchangeResponse = components["schemas"]["v2ExchangeCredentialResponse"]

/**
 * Manages the OAuth client-credentials exchange and caches the resulting
 * Bearer token until it nears expiry. Concurrent callers share a single
 * in-flight refresh promise to avoid stampedes.
 */
export class AuthService {
  private readonly http: AxiosInstance
  private readonly clientId: string
  private readonly clientSecret: string

  private accessToken: string | undefined
  private expiresAt: number | undefined
  private inFlight: Promise<string> | undefined

  constructor(options: AuthServiceOptions) {
    this.clientId = options.clientId
    this.clientSecret = options.clientSecret
    this.http = axios.create({
      baseURL: options.apiUrl,
      timeout: options.timeout ?? DEFAULT_TIMEOUT_MS,
      headers: { "Content-Type": "application/json" },
    })
  }

  /** Returns a valid access token, refreshing if needed. */
  public async getAccessToken(forceRefresh = false): Promise<string> {
    if (!forceRefresh && this.accessToken && this.expiresAt && Date.now() < this.expiresAt) {
      return this.accessToken
    }
    if (this.inFlight) return this.inFlight

    this.inFlight = this.fetchToken().finally(() => {
      this.inFlight = undefined
    })
    return this.inFlight
  }

  public getSnapshot(): TokenSnapshot {
    return { accessToken: this.accessToken, expiresAt: this.expiresAt }
  }

  private async fetchToken(): Promise<string> {
    const body: ExchangeRequest = {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    }
    try {
      const response = await this.http.post<ExchangeResponse>(URLs.oauthToken, body)
      const { accessToken, expiresIn } = response.data
      if (!accessToken) {
        throw new WaasError({ message: "Auth response missing accessToken" }, response.status)
      }
      this.accessToken = accessToken
      const ttlMs = (expiresIn ?? 3600) * 1000
      this.expiresAt = Date.now() + Math.max(0, ttlMs - TOKEN_EXPIRY_BUFFER_MS)
      return accessToken
    } catch (error) {
      if (error instanceof WaasError) throw error
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as components["schemas"]["rpcStatus"] | undefined
        throw new WaasError(data, error.response?.status, error)
      }
      throw error
    }
  }
}
