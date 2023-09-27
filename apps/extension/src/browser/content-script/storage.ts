import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { Storage } from 'webextension-polyfill'

import { getConnectionPassword } from '@src/browser/vault/storage'

import { sendRadixMessageToDapp } from './radix'
import { isHandledByRadix } from './radix-connector'

export const checkConnectButtonStatus = () =>
	isHandledByRadix().then(enabled => {
		if (enabled) {
			getConnectionPassword().then(connectionPassword =>
				sendRadixMessageToDapp(createRadixMessage.extensionStatus(!!connectionPassword)),
			)
		} else {
			sendRadixMessageToDapp(createRadixMessage.extensionStatus(true))
		}
	})

export const onStorageChange = (changes: { [key: string]: Storage.StorageChange }) => {
	if (changes.connectionPassword) checkConnectButtonStatus()
}
