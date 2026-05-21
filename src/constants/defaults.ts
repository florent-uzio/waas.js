export const DEFAULT_TIMEOUT_MS = 30_000

/**
 * Refresh tokens this many ms before their reported `expiresIn` boundary,
 * to avoid racing the server clock.
 */
export const TOKEN_EXPIRY_BUFFER_MS = 60_000

/**
 * Default base URL — Palisade sandbox. Override via `WaasClientOptions.apiUrl`.
 */
export const DEFAULT_API_URL = "https://api.sandbox.palisade.co"
