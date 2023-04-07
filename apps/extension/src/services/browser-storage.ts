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
		try {
			await this.storage.local.set({ [key]: value })
			const error = this.browser.checkForError()
			if (error) {
				throw error
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			throw err
		}
	}

	getItem = async (key: string): Promise<string> => {
		try {
			const data = await this.storage.local.get(key)
			const error = this.browser.checkForError()
			if (error) {
				throw error
			}

			return data[key]
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			throw err
		}
	}

	removeItem = async (key: string): Promise<void> => {
		try {
			await this.storage.local.remove(key)
			const error = this.browser.checkForError()
			if (error) {
				throw error
			}
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error(err)
			throw err
		}
	}
}
