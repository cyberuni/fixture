import fs from 'node:fs'
import path from 'node:path'
import { rimrafSync } from 'rimraf'

export function isHidden(subject: string) {
	return /(^|\/)\.[^/.]/g.test(subject)
}

export function isFolder(subject: string) {
	return fs.lstatSync(path.resolve(subject)).isDirectory()
}

export function ensureFolderExist(folder: string) {
	if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
}

export function ensureFolderEmpty(folder: string) {
	rimrafSync(`${folder}${path.sep}*`, { glob: true })
	rimrafSync(`${folder}${path.sep}.*`, { glob: true })
}
