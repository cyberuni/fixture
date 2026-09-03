import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts', 'ts/index.ts'],
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
