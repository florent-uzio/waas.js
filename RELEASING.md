# Releasing `@florent-uzio/waas`

Releases are driven by [changesets](https://github.com/changesets/changesets) and the
[`changesets/action`](https://github.com/changesets/action) GitHub Action wired into
`.github/workflows/release.yml`. You add a changeset describing the change; merging it
triggers an auto-generated "Version Packages" PR; merging that PR publishes to npm.

## One-time setup

Before the first publish, do these once:

1. **Create an npm Automation token.**
   - On <https://www.npmjs.com> → **Access Tokens** → **Generate New Token** → choose
     **Automation** (bypasses 2FA in CI).
2. **Add it as a GitHub secret.**
   - Repo Settings → Secrets and variables → Actions → **New repository secret**.
   - Name it exactly `NPM_TOKEN` (that's what `release.yml` reads).
3. **Make sure the npm scope is yours.**
   - The package name is `@florent-uzio/waas`. The Automation token must have publish
     rights to the `@florent-uzio` scope. If your npm username differs, update the
     `name` field in `package.json`.

## Every release

1. **Add a changeset.**

   ```bash
   npm run add-changeset
   ```

   Pick the bump level (patch / minor / major) and write a short, user-facing summary.
   The command writes `.changeset/<slug>.md`. Commit that file alongside your code
   changes.

2. **Merge your feature PR into `main`** (with the changeset commit included).

3. **Wait for the "Version Packages" PR.** On the push to `main`, the release workflow
   sees pending changesets and opens (or updates) a PR titled `chore: version
packages`. That PR:
   - bumps `package.json` (e.g. `0.1.0` → `0.2.0`),
   - regenerates `CHANGELOG.md`,
   - deletes the consumed `.changeset/*.md` file.

4. **Merge the Version Packages PR.** On the next push to `main`, the workflow sees no
   pending changesets and runs `npm run release` (= `changeset publish`) → publishes to
   npm with provenance.

So the loop is: **changeset → merge feature PR → merge auto-generated Version Packages
PR → published.**

## Conventions

- **Bump levels.**
  - `patch` — bug fix or internal change, no API surface change.
  - `minor` — new method, new namespace, new optional field. Backwards-compatible.
  - `major` — removed/renamed export, changed required field, changed return shape.
- **Reuse pending changesets.** If you ship a follow-up change to the same unreleased
  feature, **edit the existing `.changeset/*.md`** instead of adding a new one.
- **Write changesets in user-facing language.** They become `CHANGELOG.md` entries —
  describe what changed for consumers, not what you did internally.

## Provenance

`release.yml` sets `NPM_CONFIG_PROVENANCE=true` and requests `id-token: write` so npm
attaches a signed provenance attestation to each published version. Consumers can
verify it with `npm audit signatures`.

## Cheatsheet

```bash
# After making code changes
npm run add-changeset
git add .changeset
git commit -m "chore: add changeset"
git push

# Open PR → merge it into main
# A "Version Packages" PR appears automatically → merge it too
# npm publish runs on the merge of the Version Packages PR
```

## Manual fallback

If GitHub Actions can't run (rare), you can release locally:

```bash
npm run local-release   # = changeset version && changeset publish
```

You'll need to be `npm login`-ed with publish rights to the scope. Prefer the CI flow —
the manual path bypasses provenance.

## Troubleshooting

- **`npm publish` fails with 403.** The `NPM_TOKEN` doesn't have publish rights to
  `@florent-uzio`. Regenerate it as **Automation**, or check that the scope's package
  settings on npm allow your token.
- **No "Version Packages" PR appears after merging.** Make sure your PR actually
  contained a `.changeset/*.md` file — the workflow only opens the PR when it finds
  pending changesets.
- **Version Packages PR merges but nothing publishes.** Check the `release.yml` run
  for the merge commit — the publish step only runs when there are _no_ pending
  changesets, so the PR has to land cleanly without anyone adding a new changeset
  in between.

## See also

- [`CLAUDE.md`](./CLAUDE.md) — SDK conventions, including "reuse pending changesets".
- [`.changeset/config.json`](./.changeset/config.json) — the changesets config.
- [`.github/workflows/release.yml`](./.github/workflows/release.yml) — the workflow.
