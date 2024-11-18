import browser from 'webextension-polyfill'

export const keystoreKey = 'z3us-keystore'

export const saveSecret = async (keystoreId: string, data: string) => {
	if (!keystoreId) {
		throw new Error('Invalid keystore!')
	}

	const itemKey = `${keystoreKey}-${keystoreId}`

	await browser.storage.local.set({ [itemKey]: data })
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}

export const getSecret = async (keystoreId: string): Promise<string | null> => {
	if (!keystoreId) {
		throw new Error('Invalid keystore!')
	}

	const itemKey = `${keystoreKey}-${keystoreId}`

	const data = await browser.storage.local.get(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}

	if (!data[itemKey]) {
		return null
	}

	return data[itemKey] as string
}

export const removeSecret = async (keystoreId: string) => {
	if (!keystoreId) {
		throw new Error('Invalid keystore!')
	}

	const itemKey = `${keystoreKey}-${keystoreId}`

	await browser.storage.local.remove(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}
