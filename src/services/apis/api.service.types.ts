import type { AuthService } from "../auth/auth.service.js"

export interface ApiServiceOptions {
  apiUrl: string
  authService: AuthService
  timeout?: number
}
