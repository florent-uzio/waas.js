import type { components } from "./waas-types.js"

export type Core_ErrorMessage = components["schemas"]["rpcStatus"]

/**
 * The single error type thrown by the SDK. Wraps the API's `rpcStatus`
 * payload along with the HTTP status code and the original cause.
 */
export class WaasError extends Error {
  public readonly errorMessage?: Core_ErrorMessage
  public readonly statusCode?: number

  constructor(errorData: Core_ErrorMessage | undefined, statusCode?: number, cause?: Error) {
    super(errorData?.message ?? cause?.message ?? "Waas API error")
    this.name = "WaasError"
    this.errorMessage = errorData
    this.statusCode = statusCode
    if (cause) {
      ;(this as Error & { cause?: unknown }).cause = cause
    }
  }

  public toJSON(): Core_ErrorMessage & { statusCode?: number } {
    return {
      ...(this.errorMessage ?? {}),
      statusCode: this.statusCode,
    }
  }

  [Symbol.for("nodejs.util.inspect.custom")](): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      errorMessage: this.errorMessage,
    }
  }
}
