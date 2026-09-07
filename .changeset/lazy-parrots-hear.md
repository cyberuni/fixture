---
'@unional/fixture': patch
---

Move the TypeScript sources from `ts/` to `src/`.

The published package now ships its sources under `src/`, and the emitted
declaration and source maps resolve against that path. The public entry points
(`esm/index.js`, `esm/index.d.ts`) are unchanged.
