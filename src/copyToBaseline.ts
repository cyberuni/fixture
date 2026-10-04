import path from 'node:path'
import { copyFile } from 'cp-file'
import { glob } from 'glob'
import { ensureFolderExist } from './fsUtils.js'

export interface CopyToBaseline {
	(wildcardOrRegExp?: string): Promise<void>
	skip(wildcardOrRegExp?: string): Promise<void>
}
export function createCopyToBaselineFunction(baselineFolder: string, resultFolder: string) {
	return Object.assign(
		function copyToBaseline(wildcardOrRegExp = '*') {
			ensureFolderExist(baselineFolder)
			return glob(wildcardOrRegExp, { cwd: resultFolder }).then((files) => {
				return Promise.all(files.map((f) => copyFile(path.join(resultFolder, f), path.join(baselineFolder, f)))).then(
					() => {
						return
					}
				)
			})
		},
		{
			skip() {
				return Promise.resolve()
			}
		}
	)
}
