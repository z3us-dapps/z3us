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
		try {
			await this.storage.local.set({ [key]: value })
			const error = checkForError()
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
			const error = checkForError()
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
			const error = checkForError()
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
