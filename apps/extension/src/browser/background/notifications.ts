import {
	txNotificationPrefix as radixTxNotificationPrefix,
	txNotificationSplitter as radixTxNotificationSplitter,
} from '@radixdlt/connector-extension/src/chrome/background/notification-dispatcher'
import browser from 'webextension-polyfill'

import { openTabWithURL } from '@src/browser/tabs'

export const notificationDelimiter = '--'
export const txNotificationIdPrefix = `tx${notificationDelimiter}`

export const handleTransactionNotificationClick = async id => {
	const [, txId] = id.slice(txNotificationIdPrefix.length).split(notificationDelimiter)
	const url = `${browser.runtime.getURL('')}?tx=${txId}`

	return openTabWithURL(url)
}

export const handleRadixTransactionNotificationClick = async id => {
	const [, , txId] = id.split(radixTxNotificationSplitter)
	const url = `${browser.runtime.getURL('')}?tx=${txId}`

	return openTabWithURL(url)
}

export const handleNotificationClick = async id => {
	switch (true) {
		case id.startsWith(radixTxNotificationPrefix):
			return handleRadixTransactionNotificationClick(id)
		case id.startsWith(txNotificationIdPrefix):
			return handleTransactionNotificationClick(id)
		default:
			return openTabWithURL(browser.runtime.getURL(''))
	}
}

browser.notifications.onClicked.addListener(handleNotificationClick)
browser.notifications.onButtonClicked.addListener(handleNotificationClick)
