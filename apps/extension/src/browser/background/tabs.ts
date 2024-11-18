import { LedgerTabWatcher } from '@radixdlt/connector-extension/src/chrome/background/ledger-tab-watcher'
import type { Tabs } from 'webextension-polyfill'

export const ledgerTabWatcher = LedgerTabWatcher()

export const handleTabRemoved = (tabId: number) => {
	ledgerTabWatcher.triggerTabRemoval(tabId)
}

export const handleTabUpdated = async (tabId: number, info: Tabs.OnUpdatedChangeInfoType) => {
	if (info.status === 'loading' && !info.url) ledgerTabWatcher.triggerTabRemoval(tabId)
}
