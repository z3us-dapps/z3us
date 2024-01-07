import { LedgerTabWatcher } from '@radixdlt/connector-extension/src/chrome/background/ledger-tab-watcher'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { Tabs } from 'webextension-polyfill'

import type { MessageClientType } from './message-client'

export const ledgerTabWatcher = LedgerTabWatcher()

export const getTabRemovedHandler = (messageHandler: MessageClientType) => (tabId: number) => {
	ledgerTabWatcher.triggerTabRemoval(tabId)
	messageHandler.onRadixMessage(createRadixMessage.closeDappTab('background', tabId), tabId)
}

export const getTabUpdatedHandler = (messageHandler: MessageClientType) => {
	const handleTabRemoved = getTabRemovedHandler(messageHandler)

	return async (tabId: number, info: Tabs.OnUpdatedChangeInfoType) => {
		if (info.status === 'loading' && !info.url) handleTabRemoved(tabId)
	}
}
