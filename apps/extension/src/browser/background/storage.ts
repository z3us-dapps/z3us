import { createMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { Storage } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

export const handleStorageChange = async (changes: { [key: string]: Storage.StorageChange }) => {
	if (changes?.connectionPassword) {
		const radixMsg = createMessage.setConnectionPassword('background', changes?.connectionPassword?.newValue)
		return browser.runtime.sendMessage(radixMsg)
	}
	return undefined
}
