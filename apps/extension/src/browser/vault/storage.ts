import browser from 'webextension-polyfill'

import type { Keystore } from 'ui/src/store/types'

export const keystoreKey = 'z3us-keystore'

export const saveSecret = async (keystore: Keystore, data: string) => {
	if (!keystore) {
		throw new Error(`Invalid keystore: ${JSON.stringify(keystore)}`)
	}

	const itemKey = `${keystoreKey}-${keystore.id}`

	await browser.storage.local.set({ [itemKey]: data })
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}

export const getSecret = async (keystore: Keystore): Promise<string | null> => {
	if (!keystore) {
		throw new Error(`Invalid keystore: ${JSON.stringify(keystore)}`)
	}

	const itemKey = `${keystoreKey}-${keystore.id}`

	const data = await browser.storage.local.get(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}

	return data[itemKey] || null
}

export const removeSecret = async (keystore: Keystore) => {
	if (!keystore) {
		throw new Error(`Invalid keystore: ${JSON.stringify(keystore)}`)
	}

	const itemKey = `${keystoreKey}-${keystore.id}`

	await browser.storage.local.remove(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}

export const setConnectionPassword = async (connectionPassword: string) => {
	if (connectionPassword) {
		await browser.storage.local.set({ connectionPassword })
		const { lastError } = browser.runtime
		if (lastError) {
			throw new Error(lastError.message)
		}
	} else {
		await browser.storage.local.remove('connectionPassword')
		const { lastError } = browser.runtime
		if (lastError) {
			throw new Error(lastError.message)
		}
	}
}

export const getConnectionPassword = async (): Promise<string> => {
	const data = await browser.storage.local.get('connectionPassword')
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
	return data?.connectionPassword || ''
}

export const hasConnectionPassword = async (): Promise<boolean> => {
	return (await getConnectionPassword()) !== ''
}
