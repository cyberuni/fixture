import { defineConfig } from 'tsdown'

/**
 * ESM only. One file per source module (`unbundle`), which is the shape `tsc`
 * emitted, so every `esm/` path the package already published stays put.
 *
 * Dependencies externalise normally. The CJS build this replaced had to inline
 * them (`chalk`, `execa` and `cp-file` are ESM-only, so a `require()` of them
 * would have thrown), and that constraint is gone with the CJS output.
 */
export default defineConfig({
	entry: ['ts/**/*.ts', '!ts/**/*.spec.ts'],
	format: 'esm',
	outDir: 'esm',
	platform: 'node',
	unbundle: true,
	// `dts.sourcemap` governs both `.d.ts.map` and `.js.map`. `tsc` published both,
	// and they resolve against the `ts/` sources the package already ships.
	dts: { sourcemap: true },
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	clean: ['esm']
})
