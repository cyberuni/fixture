import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

/**
 * Two outputs, matching what the package has always published:
 *
 * - `cjs/index.js` — a single bundled CommonJS entry, plus the `cjs/package.json`
 *   `{"type":"commonjs"}` marker the `"type": "module"` root would otherwise override.
 *   This is what the `esbuild --bundle` script used to emit.
 * - `esm/*.js` + `esm/*.d.ts` — one file per source module (`unbundle`), which is the
 *   shape `tsc -p tsconfig.esm.json` emitted, so no published path moves.
 */
export default defineConfig([
	{
		entry: ['ts/index.ts'],
		format: 'cjs',
		outDir: 'cjs',
		platform: 'node',
		dts: false,
		// The `esbuild --bundle` script this replaces inlined every dependency into the
		// CJS entry, and that is load-bearing: `chalk`, `execa` and `cp-file` are
		// ESM-only, so leaving them as `require()` calls would break the CJS entry on
		// any Node without `require(esm)`. Node builtins stay external.
		noExternal: [/^[^.]/],
		outExtensions: () => ({ js: '.js' }),
		clean: ['cjs'],
		hooks: {
			// `copy`'s `to` is treated as a directory, so it cannot write a file named
			// `cjs/package.json`. Write it after the build instead.
			'build:done': async () => {
				await writeFile('cjs/package.json', `${JSON.stringify({ type: 'commonjs' }, null, 2)}\n`)
			}
		}
	},
	{
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
	}
])
