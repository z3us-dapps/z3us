import browser, { Storage } from 'webextension-polyfill'

const checkForError = () => {
	const { lastError } = browser.runtime
	if (!lastError) {
		return undefined
	}
	return new Error(lastError.message)
}

export class BrowserStorageService {
	private storage: Storage.Static

	constructor(storage: Storage.Static) {
		this.storage = storage
	}

	setItem = async (key: string, value: string): Promise<void> => {
		await this.storage.local.set({ [key]: value })
		const error = checkForError()
		if (error) {
			throw error
		}
	}

	getItem = async (key: string): Promise<string> => {
		const data = await this.storage.local.get(key)
		const error = checkForError()
		if (error) {
			throw error
		}

		return data[key]
	}

	removeItem = async (key: string): Promise<void> => {
		await this.storage.local.remove(key)
		const error = checkForError()
		if (error) {
			throw error
		}
	}
}
