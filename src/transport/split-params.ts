import { replacePathParams } from "../helpers/url/replace-path-params.js"

export interface SplitResult {
  url: string
  query: Record<string, unknown> | undefined
}

/**
 * Interpolate `{name}` placeholders in `template` from `params`, and forward
 * any remaining keys as query parameters. Lets namespace methods accept one
 * flat object that matches the OpenAPI operation shape.
 */
export function splitParams(
  template: string,
  params: Record<string, unknown> | undefined,
): SplitResult {
  const { url, consumed } = replacePathParams(template, params)
  if (!params) return { url, query: undefined }

  const query: Record<string, unknown> = {}
  let hasQuery = false
  for (const key of Object.keys(params)) {
    if (consumed.has(key)) continue
    const value = params[key]
    if (value === undefined) continue
    query[key] = value
    hasQuery = true
  }

  return { url, query: hasQuery ? query : undefined }
}
