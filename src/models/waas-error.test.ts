import { describe, expect, it } from "vitest"
import { WaasError } from "./waas-error.js"

describe("WaasError", () => {
  it("uses the API message when available", () => {
    const err = new WaasError({ message: "vault not found", code: 5 }, 404)
    expect(err.message).toBe("vault not found")
    expect(err.statusCode).toBe(404)
    expect(err.errorMessage).toEqual({ message: "vault not found", code: 5 })
  })

  it("falls back to the cause's message when the API payload is missing", () => {
    const cause = new Error("ECONNREFUSED")
    const err = new WaasError(undefined, undefined, cause)
    expect(err.message).toBe("ECONNREFUSED")
    expect((err as Error & { cause?: unknown }).cause).toBe(cause)
  })

  it("serialises to JSON with the status code merged in", () => {
    const err = new WaasError({ message: "bad request", code: 3 }, 400)
    expect(err.toJSON()).toEqual({ message: "bad request", code: 3, statusCode: 400 })
  })
})
