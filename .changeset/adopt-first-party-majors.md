---
'@unional/fixture': major
---

Adopt the current majors of the first-party dependencies: `standard-log`
`^11.5.2` -> `^13.2.0`, `standard-log-color` `^12.0.0` -> `^13.2.0`, `tersify`
`^3.12.1` -> `^4.0.7`, and `iso-error` `^6.0.5` -> `^7.0.0`.

**Why this matters to consumers.** Installing `@unional/fixture@5.0.0` resolved
five majors of `type-plus` and two of `tersify`. The old `standard-log@11` line
pulls `@just-func/types@0.5.1`, which still depends on `type-plus@^5.0.0`, so
`type-plus@5.6.0` and `type-plus@6.8.1` were nested under this package in every
consumer's tree, and `tersify@3.12.1` was hoisted out of it. This release
removes all three: `type-plus` and `tersify` each resolve to a single version
(`8.0.0-beta.10` and `4.0.7`), and `standard-log` to `13.2.0` only.

**Breaking.** `Logger` (`standard-log`), `IsoError` (`iso-error`) and
`Tersible` (`tersify`) all appear in this package's emitted `.d.ts`, so a
consumer's own copies of those packages must move with it. `standard-log@13`
also drops ES5 output.

`engines.node` is unchanged at `>= 20`; `iso-error@7.0.0`'s major was that same
raise, which this package had already made.

No behaviour of `@unional/fixture` changes. The only source change is in a
test: `createStandardLogForTest()` moved to the `standard-log/testing` subpath
in `standard-log@12`. `tersify@4` preserves the source's own quote style rather
than normalising to double quotes, but no assertion in this package's suite
embeds tersified function source, so no expectation moved.
