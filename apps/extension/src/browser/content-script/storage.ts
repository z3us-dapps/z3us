import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { Storage } from 'webextension-polyfill'

import { sharedStore } from 'ui/src/store'

import { getConnectionPassword } from '@src/browser/vault/storage'

import { sendRadixMessageToDapp } from './radix'
import { isHandledByRadix } from './radix-connector'

export const checkConnectButtonStatus = async () => {
	const enabled = await isHandledByRadix()
	if (enabled) {
		const connectionPassword = await getConnectionPassword()
		sendRadixMessageToDapp(createRadixMessage.extensionStatus(!!connectionPassword))
	} else {
		await sharedStore.persist.rehydrate()
		const sharedState = sharedStore.getState()
		sendRadixMessageToDapp(createRadixMessage.extensionStatus(sharedState.keystores.length > 0))
	}
}

export const onStorageChange = (changes: { [key: string]: Storage.StorageChange }) => {
	if (changes.connectionPassword) checkConnectButtonStatus()
}
