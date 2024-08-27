import browser from 'webextension-polyfill'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'

export const sendInteractionMessage = (interaction: WalletInteractionWithTabId, message: any) => {
	if (interaction.fromTabId) {
		return browser.tabs.sendMessage(interaction.fromTabId, message)
	}
	return browser.runtime.sendMessage(message)
}

export const storageKey = 'z3us-interactions'

export const saveInteractions = async (interaction: WalletInteractionWithTabId) => {
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

export const getInteraction = async (interactionId: string): Promise<WalletInteractionWithTabId> => {
	if (!interactionId) {
		throw new Error('Invalid interaction!')
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
		throw new Error('Invalid interaction!')
	}

	const itemKey = `${storageKey}-${interactionId}`

	await browser.storage.local.remove(itemKey)
	const { lastError } = browser.runtime
	if (lastError) {
		throw new Error(lastError.message)
	}
}
