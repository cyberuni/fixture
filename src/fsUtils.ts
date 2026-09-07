import fs from 'node:fs'
import path from 'node:path'
import rimraf from 'rimraf'

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
	rimraf.sync(`${folder}${path.sep}*`)
	rimraf.sync(`${folder}${path.sep}.*`)
}
