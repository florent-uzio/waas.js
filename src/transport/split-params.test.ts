import { describe, expect, it } from "vitest"
import { splitParams } from "./split-params.js"

describe("splitParams", () => {
  it("returns the template unchanged when no params are supplied", () => {
    const result = splitParams("/v2/vaults", undefined)
    expect(result.url).toBe("/v2/vaults")
    expect(result.query).toBeUndefined()
  })

  it("interpolates path placeholders and routes leftovers to the query bag", () => {
    const result = splitParams("/v2/vaults/{id}", { id: "abc", pageSize: 10 })
    expect(result.url).toBe("/v2/vaults/abc")
    expect(result.query).toEqual({ pageSize: 10 })
  })

  it("URL-encodes path values", () => {
    const result = splitParams("/v2/counterparties/{id}", { id: "a/b c" })
    expect(result.url).toBe("/v2/counterparties/a%2Fb%20c")
    expect(result.query).toBeUndefined()
  })

  it("returns no query bag when only placeholders were supplied", () => {
    const result = splitParams("/v2/vaults/{vaultId}/wallets/{walletId}", {
      vaultId: "v1",
      walletId: "w1",
    })
    expect(result.url).toBe("/v2/vaults/v1/wallets/w1")
    expect(result.query).toBeUndefined()
  })

  it("throws when a required path placeholder is missing", () => {
    expect(() => splitParams("/v2/vaults/{id}", {})).toThrow(/Missing path parameter "id"/)
  })

  it("skips undefined query values", () => {
    const result = splitParams("/v2/vaults", { pageSize: undefined, pageToken: "next" })
    expect(result.url).toBe("/v2/vaults")
    expect(result.query).toEqual({ pageToken: "next" })
  })
})
