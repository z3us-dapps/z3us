import { LedgerTabWatcher } from '@radixdlt/connector-extension/src/chrome/background/ledger-tab-watcher'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { Tabs } from 'webextension-polyfill'

import { handleCheckContentScript } from '@src/browser/content-script/status'

import { MessageClientType } from './message-client'

export const ledgerTabWatcher = LedgerTabWatcher()

export const handleTabActivated = ({ tabId }: Tabs.OnActivatedActiveInfoType) => handleCheckContentScript(tabId)

export const getTabRemovedHandler = (messageHandler: MessageClientType) => {
	return (tabId: number) => {
		ledgerTabWatcher.triggerTabRemoval(tabId)
		messageHandler.onRadixMessage(createRadixMessage.closeDappTab('background', tabId), tabId)
	}
}

export const getTabUpdatedHandler = (messageHandler: MessageClientType) => {
	const handleTabRemoved = getTabRemovedHandler(messageHandler)

	return async (tabId: number, info: Tabs.OnUpdatedChangeInfoType) => {
		if (info.status === 'loading' && !info.url) handleTabRemoved(tabId)
		await handleCheckContentScript(tabId)
	}
}
