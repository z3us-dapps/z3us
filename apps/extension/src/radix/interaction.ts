import { WalletInteraction } from '@radixdlt/radix-dapp-toolkit'
import browser from 'webextension-polyfill'

export const storageKey = 'z3us-interactions'

export const saveInteractions = async (interaction: WalletInteraction) => {
	if (!interaction.interactionId) {
		throw new Error('Invalid interaction!')
	}

	const itemKey = `${storageKey}-${interaction.interactionId}`

	await browser.storage.local.set({ [itemKey]: interaction })
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}

export const getInteraction = async (interactionId: string): Promise<WalletInteraction> => {
	if (!interactionId) {
		throw new Error('Invalid keystore!')
	}

	const itemKey = `${storageKey}-${interactionId}`

	const data = await browser.storage.local.get(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}

	return data[itemKey] || null
}

export const removeInteraction = async (interactionId: string) => {
	if (!interactionId) {
		throw new Error('Invalid keystore!')
	}

	const itemKey = `${storageKey}-${interactionId}`

	await browser.storage.local.remove(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}
