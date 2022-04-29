import { Storage } from 'webextension-polyfill'
import { BrowserService } from './browser'

export class BrowserStorageService {
	private browser?: BrowserService

	private storage?: Storage

	constructor(browser = null, storage = null) {
		this.browser = browser
		this.storage = storage
	}

	setItem = async (key: string, value: string): Promise<void> => {
		if (this?.storage?.local) {
			const item = this.storage.local.set({ [key]: value })

			const error = this.browser.checkForError()
			if (error) {
				throw error
			}

			return item
		}
		return new Promise(resolve => {
			resolve(localStorage.setItem(key, value))
		})
	}

	getItem = async (key: string): Promise<string> => {
		if (this?.storage?.local) {
			const data = await this.storage.local.get(key)

			const error = this.browser.checkForError()
			if (error) {
				throw error
			}

			return data[key]
		}
		return new Promise(resolve => {
			resolve(localStorage.getItem(key))
		})
	}

	removeItem = async (key: string): Promise<void> => {
		if (!this?.storage?.local) {
			return new Promise(resolve => {
				resolve(localStorage.removeItem(key))
			})
		}

		await this.storage.local.remove(key)

		const error = this.browser.checkForError()
		if (error) {
			throw error
		}

		return undefined
	}
}
