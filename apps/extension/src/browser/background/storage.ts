import { messageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { Storage } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

export const handleStorageChange = async (changes: { [key: string]: Storage.StorageChange }, area: string) => {
	if (changes.connections && area === 'local') {
		const radixMsg = createMessage.setConnections(messageSource.background, changes.connections?.newValue || {})
		await browser.runtime.sendMessage(radixMsg)
	}

	if (changes.options && area === 'local') {
		const radixMsg = createMessage.setConnectorExtensionOptions(messageSource.background, changes.options.newValue)
		await browser.runtime.sendMessage(radixMsg)
	}

	if (changes.sessionRouter && area === 'local') {
		const radixMsg = createMessage.setSessionRouterData(changes.sessionRouter.newValue, messageSource.background)
		await browser.runtime.sendMessage(radixMsg)
	}
	return undefined
}
