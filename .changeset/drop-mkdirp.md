---
'@unional/fixture': patch
---

Drop the `mkdirp` dependency in favour of `fs.mkdirSync(path, { recursive: true })`.

`ensureFolderExist()` behaves identically — `mkdirp.sync` has been a wrapper over
Node's own recursive mkdir since Node 10. Removing it also removes the stale
`@types/mkdirp` (v1 types against a v2 runtime) and retires the renovate PR that
could not pass: mkdirp v3 dropped the default export, so `import mkdirp from 'mkdirp'`
fails outright.
