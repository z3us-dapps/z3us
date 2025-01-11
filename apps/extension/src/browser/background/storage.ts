import { messageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { SessionId, WalletPublicKey } from '@radixdlt/connector-extension/src/chrome/offscreen/session-router'
import type { ConnectorExtensionOptions } from '@radixdlt/connector-extension/src/options'
import type { Connections } from '@radixdlt/connector-extension/src/pairing/state/connections'
import type { Storage } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

export const handleStorageChange = async (changes: { [key: string]: Storage.StorageChange }, area: string) => {
	if (changes.connections && area === 'local') {
		const radixMsg = createMessage.setConnections(
			messageSource.background,
			(changes.connections?.newValue || {}) as Connections,
		)
		await browser.runtime.sendMessage(radixMsg)
	}

	if (changes.options && area === 'local') {
		const radixMsg = createMessage.setConnectorExtensionOptions(
			messageSource.background,
			changes.options.newValue as ConnectorExtensionOptions,
		)
		await browser.runtime.sendMessage(radixMsg)
	}

	if (changes.sessionRouter && area === 'local') {
		const radixMsg = createMessage.setSessionRouterData(
			changes.sessionRouter.newValue as Record<SessionId, WalletPublicKey>,
			messageSource.background,
		)
		await browser.runtime.sendMessage(radixMsg)
	}
	return undefined
}
