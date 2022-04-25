import { Storage } from 'webextension-polyfill'

export class BrowserStorageService {
	private storage?: Storage

	constructor(storage = null) {
		this.storage = storage
	}

	setItem = async (key: string, value: string): Promise<void> => {
		if (this?.storage?.local) {
			return this.storage.local.set({ [key]: value })
		}
		return new Promise(resolve => {
			resolve(localStorage.setItem(key, value))
		})
	}

	getItem = async (key: string): Promise<string> => {
		if (this?.storage?.local) {
			const data = await this.storage.local.get(key)
			return data[key]
		}
		return new Promise(resolve => {
			resolve(localStorage.getItem(key))
		})
	}

	removeItem = async (key: string): Promise<void> => {
		if (this?.storage?.local) {
			return this.storage.local.remove(key)
		}
		return new Promise(resolve => {
			resolve(localStorage.removeItem(key))
		})
	}
}
