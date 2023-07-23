import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'
import {
	txNotificationPrefix as radixTxNotificationPrefix,
	txNotificationSplitter as radixTxNotificationSplitter,
} from '@radixdlt/connector-extension/src/chrome/background/notification-dispatcher'
import browser from 'webextension-polyfill'

export const notificationDelimiter = '--'
export const txNotificationIdPrefix = `tx${notificationDelimiter}`

export const openTabWithURL = async (url: string) => {
	const currentWindow = await browser.windows.getCurrent()
	if (currentWindow != null) {
		currentWindow.focused = true
		return browser.tabs.create({ url, active: true })
	}
	return browser.windows.create({ url, focused: true })
}

export const handleTransactionNotificationClick = async id => {
	const [, txID] = id.slice(txNotificationIdPrefix.length).split(notificationDelimiter)
	const url = `${browser.runtime.getURL('')}/transactions/${txID}`

	return openTabWithURL(url)
}

export const handleRadixTransactionNotificationClick = async id => {
	const [, networkId, txId] = id.split(radixTxNotificationSplitter)
	return openTabWithURL(`${RadixNetworkConfigById[Number(networkId)].dashboardUrl}/transaction/${txId}`)
}

export const handleNotificationClick = async id => {
	switch (true) {
		case id.startsWith(radixTxNotificationPrefix):
			return handleTransactionNotificationClick(id)
		case id.startsWith(txNotificationIdPrefix):
			return handleTransactionNotificationClick(id)
		default:
			return openTabWithURL(browser.runtime.getURL(''))
	}
}
