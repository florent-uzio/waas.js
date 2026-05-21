# waas.js

A TypeScript SDK for the Palisade Wallet-as-a-Service API, generated from
the vendor's OpenAPI spec.

> The architecture is documented in [issue #1](https://github.com/florent-uzio/waas.js/issues/1).

## Install

```bash
npm install @florent-uzio/waas
```

## Quick start

```ts
import { Waas } from "@florent-uzio/waas"

const client = new Waas({
  clientId: process.env.PALISADE_CLIENT_ID!,
  clientSecret: process.env.PALISADE_CLIENT_SECRET!,
  // Defaults to https://api.sandbox.palisade.co (testnet)
  // apiUrl: "https://api.palisade.co",
})

const { vaults } = await client.vaults.list()
console.log(vaults)

const wallet = await client.wallets.create(
  { vaultId: "..." },
  {
    name: "USD Issuing wallet",
    keystore: "MPC",
  },
)
```

The client lazily fetches an OAuth access token on the first authenticated
request and refreshes it before expiry. You can inspect or force-refresh it
via `client.auth.getSnapshot()` and `client.auth.getAccessToken(true)`.

## Layout

```
src/
  index.ts            # public barrel — only thing consumers import from
  waas.ts             # the Waas client class
  models/
    waas-types.ts     # AUTO-GENERATED from OpenAPI — never edit
    waas-error.ts     # WaasError class + Core_ErrorMessage type
  constants/          # URL registry + defaults
  transport/          # TypedTransport + splitParams
  services/           # ApiService, AuthService, per-resource type files
  namespaces/         # createX(transport) factories — one per REST resource
  helpers/, type-utils/
```

## Regenerating types

The vendor's OpenAPI spec lives at `openapi/palisade-api.json` (do not edit
by hand). Whenever it changes, regenerate the typed surface:

```bash
npm run generate:waas-types
```

## Scripts

| Script                            | What it does                                                |
| --------------------------------- | ----------------------------------------------------------- |
| `npm run build`                   | `tsc` — emits `dist/`                                       |
| `npm run test`                    | `vitest run`                                                |
| `npm run dev`                     | `vitest` (watch mode)                                       |
| `npm run format` / `check-format` | Prettier                                                    |
| `npm run ci`                      | build + format check + tests                                |
| `npm run generate:waas-types`     | Regenerate `src/models/waas-types.ts` from the OpenAPI spec |
| `npm run add-changeset`           | Author a changeset for the next release                     |
