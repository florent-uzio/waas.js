import type { PathKeys } from "../constants/urls.js"

/**
 * Optional per-request configuration recognised by the transport layer.
 * Forwarded to the underlying axios instance as a partial `AxiosRequestConfig`.
 */
export interface RequestConfig {
  /** Skip the `Authorization` header on this request (e.g. the token exchange itself). */
  skipAuth?: boolean
  /** Per-request timeout override, in ms. */
  timeout?: number
  /** Additional headers to merge onto the request. */
  headers?: Record<string, string>
}

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete"

export type UrlTemplate = PathKeys
