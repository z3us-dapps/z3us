import { Network as NetworkID } from '@radixdlt/application'
import browser from 'webextension-polyfill'

import { explorerURLMap } from '@src/config'

export const notificationDelimiter = '--'

export const txNotificationIdPrefix = `tx${notificationDelimiter}`

export const handleTransactionNotificationClick = async id => {
	const [, txID] = id.slice(txNotificationIdPrefix.length).split(notificationDelimiter)
	const url = `${explorerURLMap[NetworkID.MAINNET]}/transactions/${txID}`

	const currentWindow = await browser.windows.getCurrent()
	if (currentWindow != null) {
		currentWindow.focused = true
		return browser.tabs.create({ url, active: true })
	}
	return browser.windows.create({ url, focused: true })
}

export const handleNotificationClick = async id => {
	switch (true) {
		case id.startsWith(txNotificationIdPrefix):
			return handleTransactionNotificationClick(id)
		default:
			return undefined
	}
}
