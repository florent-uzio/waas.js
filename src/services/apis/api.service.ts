import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import qs from "qs"
import { DEFAULT_TIMEOUT_MS } from "../../constants/defaults.js"
import type { Core_ErrorMessage } from "../../models/waas-error.js"
import { WaasError } from "../../models/waas-error.js"
import type { RequestConfig } from "../../transport/transport.types.js"
import type { AuthService } from "../auth/auth.service.js"
import type { ApiServiceOptions } from "./api.service.types.js"

/**
 * Low-level HTTP client. Owns the axios instance, injects bearer tokens,
 * normalises errors into `WaasError`, and retries once on `401` after a
 * forced token refresh.
 */
export class ApiService {
  private readonly http: AxiosInstance
  private readonly authService: AuthService

  constructor(options: ApiServiceOptions) {
    this.authService = options.authService
    this.http = axios.create({
      baseURL: options.apiUrl,
      timeout: options.timeout ?? DEFAULT_TIMEOUT_MS,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      paramsSerializer: {
        serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
      },
    })
  }

  public get<T>(url: string, query?: Record<string, unknown>, config?: RequestConfig): Promise<T> {
    return this.request<T>({ method: "get", url, params: query, config })
  }

  public post<T>(
    url: string,
    body?: unknown,
    query?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "post", url, data: body, params: query, config })
  }

  public put<T>(
    url: string,
    body?: unknown,
    query?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "put", url, data: body, params: query, config })
  }

  public patch<T>(
    url: string,
    body?: unknown,
    query?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "patch", url, data: body, params: query, config })
  }

  public delete<T>(
    url: string,
    query?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: "delete", url, params: query, config })
  }

  private async request<T>(args: {
    method: AxiosRequestConfig["method"]
    url: string
    data?: unknown
    params?: Record<string, unknown>
    config?: RequestConfig
  }): Promise<T> {
    const { method, url, data, params, config } = args
    const baseConfig: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      timeout: config?.timeout,
      headers: { ...(config?.headers ?? {}) },
    }

    try {
      const response = await this.sendWithAuth<T>(baseConfig, config?.skipAuth ?? false)
      return response.data
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        !(config?.skipAuth ?? false)
      ) {
        // Token may have been revoked or rotated server-side: force-refresh and retry once.
        try {
          const response = await this.sendWithAuth<T>(baseConfig, false, true)
          return response.data
        } catch (retryError) {
          throw this.toWaasError(retryError)
        }
      }
      throw this.toWaasError(error)
    }
  }

  private async sendWithAuth<T>(
    config: AxiosRequestConfig,
    skipAuth: boolean,
    forceRefresh = false,
  ): Promise<AxiosResponse<T>> {
    if (!skipAuth) {
      const token = await this.authService.getAccessToken(forceRefresh)
      config.headers = { ...(config.headers ?? {}), Authorization: `Bearer ${token}` }
    }
    return this.http.request<T>(config)
  }

  private toWaasError(error: unknown): WaasError {
    if (error instanceof WaasError) return error
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as Core_ErrorMessage | undefined
      return new WaasError(data, error.response?.status, error)
    }
    const cause = error instanceof Error ? error : undefined
    return new WaasError(undefined, undefined, cause)
  }
}
