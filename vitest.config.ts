import { nodeTestPreset } from '@repobuddy/vitest/config/node'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	// `includeGeneralTests` is required, not cosmetic. The preset's default include
	// only matches platform-suffixed names like `*.spec.node.ts`; this repo's specs
	// are plain `*.spec.ts`, which fall under the preset's `testGeneral` globs.
	// Without the flag the suite silently runs zero tests.
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		// The preset does not decide these.
		globals: true,
		coverage: {
			provider: 'v8',
			// The preset excludes test files; `src/index.ts` is this repo's own
			// barrel-only exclusion and has to stay here.
			exclude: ['src/index.ts'],
			// The shared pnpm-verify workflow's codecov step uploads `lcov.info`,
			// and the preset sets no reporters.
			reporter: ['text', 'lcov'],
			// Set just below what the suite achieves on CI, so a regression fails the
			// build instead of quietly reporting a lower number. CI reports slightly
			// lower than a local run (96.81 / 93.42 / 93.1 / 96.7 vs 97.17 / 94.73 /
			// 94.25 / 96.7) because some platform-conditional paths are not taken on
			// the ubuntu runner, so the floor is set from the CI numbers.
			thresholds: { statements: 96, branches: 93, functions: 93, lines: 96 }
		}
	}
})
