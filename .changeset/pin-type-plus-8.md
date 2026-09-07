---
"@unional/fixture": major
---

Pin `type-plus` to the exact version `8.0.0-beta.10`.

`type-plus` 8 is still a prerelease line where breaking changes have landed between
betas (for example `beta.10` changed `Equal`'s signature and removed `isType.f`), so
`type-plus` is pinned to an exact version rather than a caret range: `^8.0.0-beta.10`
would admit every later 8.0.0 prerelease plus `8.0.0` and `8.1.0`, letting a lockfile
refresh silently pull in a breaking prerelease. An exact pin makes each bump a
reviewable PR instead.

`type-plus` types are re-exported through this package's public API (`PartialPick`
in `command.d.ts`), so consumers now inherit `type-plus@8`'s `typescript >= 5.6.0`
peer dependency requirement.

Also raises the minimum supported Node.js version from `>= 18` to `>= 20`, matching
the floor required by `type-plus@8`'s `unpartial` dependency (`engines: { node: '>=
20' }`). This is independently breaking for consumers still on Node 18 or 19.

Migration:
- Ensure your project uses TypeScript `>= 5.6.0`.
- Ensure your project runs on Node.js `>= 20`.

This release lets `clibuilder`, `repobuddy` and `mocktomata` drop a stale transitive
`type-plus` that this package was keeping alive.
