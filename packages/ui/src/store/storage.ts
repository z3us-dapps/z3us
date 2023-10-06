interface StorageArea {
	get(keys?: null | string | string[] | Record<string, any>): Promise<Record<string, any>>
	set(items: Record<string, any>): Promise<void>
	remove(keys: string | string[]): Promise<void>
}

export class StateStorage {
	private storage: StorageArea

	constructor(storage: StorageArea) {
		this.storage = storage
	}

	setItem = async (key: string, value: string): Promise<void> => {
		await this.storage.set({ [key]: value })
	}

	getItem = async (key: string): Promise<string> => {
		const data = await this.storage.get(key)
		return data[key]
	}

	removeItem = async (key: string): Promise<void> => {
		await this.storage.remove(key)
	}
}
