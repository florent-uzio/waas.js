# @florent-uzio/waas

## 0.1.0

### Minor Changes

- 254328f: Initial release. Scaffolds an OpenAPI-driven TypeScript SDK for the Palisade Wallet-as-a-Service API.

  Public client:
  - `Waas` composes typed namespaces over a shared `TypedTransport` and a single cached OAuth token.
  - OAuth client-credentials auth via `POST /v2/credentials/oauth/token`, with in-flight refresh dedup, a 60s expiry buffer, and a one-shot 401 force-refresh retry.
  - Every HTTP failure surfaces as `WaasError`, carrying the API's `rpcStatus` payload, the HTTP status code, and the original cause.

  Namespaces:
  - `client.addresses` — counterparty addresses + org-wide address search.
  - `client.balances` — org, vault, and wallet balances; wallet sync.
  - `client.counterparties` — CRUD.
  - `client.policies` — wallet-limit policy rules (org + per-wallet).
  - `client.sweep` — trigger a sweep configuration; list a sweep instance's transactions.
  - `client.tags` — org / vault / wallet tag listings and CRUD.
  - `client.transactions` — generic listing, get, freeze/unfreeze, raw / sign-plaintext / transfer, fee estimation.
  - `client.vaults` — CRUD + balances + tags.
  - `client.wallets` — CRUD + balances + sequence + settings.
  - `client.webhooks` — webhook + subscription CRUD.
  - `client.xrp` — 9 XRP transaction submissions (account-set, AMM create/deposit/withdraw, clawback, offer cancel/create, signer-list-set, trust-set).
  - `client.auth` — token introspection / forced refresh.

  Tooling: pure ESM + NodeNext + strict TS, Vitest, Prettier with organize-imports, Changesets-driven npm release with provenance, GitHub Actions CI on PRs and release on `main`.
