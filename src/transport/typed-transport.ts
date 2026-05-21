import type { PathKeys } from "../constants/urls.js"
import type { ApiService } from "../services/apis/api.service.js"
import { splitParams } from "./split-params.js"
import type { RequestConfig } from "./transport.types.js"

/**
 * Thin wrapper that namespaces actually call. Handles URL template
 * interpolation via `splitParams`, then delegates to `ApiService`.
 * Every verb has the signature `(url, body?, params?, config?)`, returning
 * `Promise<T>` where the caller fixes `T` to a generated type.
 */
export class TypedTransport {
  constructor(private readonly api: ApiService) {}

  public get<T>(
    url: PathKeys,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    const { url: resolved, query } = splitParams(url, params)
    return this.api.get<T>(resolved, query, config)
  }

  public post<T>(
    url: PathKeys,
    body?: unknown,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    const { url: resolved, query } = splitParams(url, params)
    return this.api.post<T>(resolved, body, query, config)
  }

  public put<T>(
    url: PathKeys,
    body?: unknown,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    const { url: resolved, query } = splitParams(url, params)
    return this.api.put<T>(resolved, body, query, config)
  }

  public patch<T>(
    url: PathKeys,
    body?: unknown,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    const { url: resolved, query } = splitParams(url, params)
    return this.api.patch<T>(resolved, body, query, config)
  }

  public delete<T>(
    url: PathKeys,
    params?: Record<string, unknown>,
    config?: RequestConfig,
  ): Promise<T> {
    const { url: resolved, query } = splitParams(url, params)
    return this.api.delete<T>(resolved, query, config)
  }
}
