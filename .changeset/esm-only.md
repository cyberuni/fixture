---
'@unional/fixture': major
---

Drop CommonJS support. The package is now ESM-only.

There is no `cjs/` output any more and `exports` resolves only to
`./esm/index.js`. Import it:

```js
import { baseline } from '@unional/fixture'
```

What this breaks, precisely:

- `require('@unional/fixture')` from a CommonJS file on Node older than 22.12
  now throws `ERR_REQUIRE_ESM`. Move the calling test file to ESM, or use
  `const { baseline } = await import('@unional/fixture')`.
- On Node 22.12 and newer, `require()` of an ES module is supported by Node
  itself and keeps working against the ESM entry.

`engines.node` is now declared as `>= 18` — the floor the dependencies already
required, previously left unstated.

Nothing the ESM entry exports changed: same names, same types, same `esm/`
paths as 3.2.x.
