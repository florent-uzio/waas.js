import { isUndefined } from "../typeof-fns/index.js"

/**
 * Replace `{name}` placeholders in `template` with values from `params`.
 * Returns the interpolated URL and the set of param keys that were consumed,
 * so callers can route the remaining keys to a query string.
 */
export function replacePathParams(
  template: string,
  params: Record<string, unknown> | undefined,
): { url: string; consumed: Set<string> } {
  const consumed = new Set<string>()
  if (!params) return { url: template, consumed }

  const url = template.replace(/\{([^}]+)\}/g, (_match, key: string) => {
    const value = params[key]
    if (isUndefined(value)) {
      throw new Error(`Missing path parameter "${key}" for template "${template}"`)
    }
    consumed.add(key)
    return encodeURIComponent(String(value))
  })

  return { url, consumed }
}
