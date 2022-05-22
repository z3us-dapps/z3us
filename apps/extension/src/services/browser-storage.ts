import { sharedStoreKey } from '@src/config'
import { SharedStore } from '@src/store/types'
import { Storage } from 'webextension-polyfill'
import { BrowserService } from './browser'

export class BrowserStorageService {
	private browser: BrowserService

	private storage: Storage.Static

	constructor(browser: BrowserService, storage: Storage.Static) {
		this.browser = browser
		this.storage = storage
	}

	setItem = async (key: string, value: string, prefix: string = null): Promise<void> => {
		if (prefix === null) {
			prefix = await this.getKeystorePrefix()
		}
		await this.storage.local.set({ [`${prefix}${key}`]: value })
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
	}

	getItem = async (key: string, prefix: string = null): Promise<string> => {
		if (prefix === null) {
			prefix = await this.getKeystorePrefix()
		}
		const data = await this.storage.local.get(`${prefix}${key}`)
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
		return data[`${prefix}${key}`]
	}

	removeItem = async (key: string, prefix: string = null): Promise<void> => {
		if (prefix === null) {
			prefix = await this.getKeystorePrefix()
		}
		await this.storage.local.remove(`${prefix}${key}`)
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
	}

	private getKeystorePrefix = async () => {
		const data = await this.storage.local.get(sharedStoreKey)
		const error = this.browser.checkForError()
		if (error) {
			throw error
		}
		if (!data[sharedStoreKey]) {
			return ''
		}
		return (JSON.parse(data[sharedStoreKey]) as SharedStore)?.selectKeystoreName || ''
	}
}
