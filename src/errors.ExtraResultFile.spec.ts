import t from 'node:assert'
import fs from 'node:fs'
import { ExtraResultFile } from './index.js'

test('diff 10k line file should take < 1 seconds', () => {
	const filePath = 'fixtures/diff-large/large.yaml'
	const content = fs.readFileSync(filePath, 'utf-8')

	const time = Date.now()
	const extra = new ExtraResultFile('fixtures/diff-large/large.yaml', content, {
		largeFileAmbientLines: 5,
		largeFileThreshold: 100
	})
	t(extra)
	const elapsed = Date.now() - time
	expect(elapsed).toBeLessThanOrEqual(1000)
})
