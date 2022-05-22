import { Storage } from 'webextension-polyfill'
import { BrowserService } from './browser'

export class BrowserStorageService {
	private browser: BrowserService

	private storage: Storage.Static

	constructor(browser: BrowserService, storage: Storage.Static) {
		this.browser = browser
		this.storage = storage
	}

	setItem = async (key: string, value: string): Promise<void> => {
		await this.storage.local.set({ [key]: value })
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
	}

	getItem = async (key: string): Promise<string> => {
		const data = await this.storage.local.get(key)
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
		return data[key]
	}

	removeItem = async (key: string): Promise<void> => {
		await this.storage.local.remove(key)
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
	}
}
