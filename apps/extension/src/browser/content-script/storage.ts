import { getConnectionPassword } from '@radixdlt/connector-extension/src/chrome/helpers/get-connection-password'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'

import { sendMessageToDapp } from './radix'

getConnectionPassword().map(connectionPassword =>
	sendMessageToDapp(createRadixMessage.extensionStatus(!!connectionPassword)),
)

export const onRadixStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
	if (changes.connectionPassword)
		sendMessageToDapp(createRadixMessage.extensionStatus(!!changes.connectionPassword?.newValue))
}
