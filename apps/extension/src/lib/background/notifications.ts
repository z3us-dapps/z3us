import browser from 'webextension-polyfill'
import { EXPLORER_URL } from '@src/config'
import { sharedStore } from '@src/store'
import { getNoneSharedStore } from '@src/services/state'
import { generateId } from '@src/utils/generate-id'
import browserService from '@src/services/browser'

export const notificationDelimiter = '--'

export const txNotificationIdPrefix = `tx${notificationDelimiter}`

export const handleTransactionNotificationClick = async id => {
	const [, txID] = id.slice(txNotificationIdPrefix.length).split(notificationDelimiter)
	const url = `${EXPLORER_URL}/transactions/${txID}`

	const currentWindow = await browser.windows.getCurrent()
	if (currentWindow != null) {
		currentWindow.focused = true
		return browser.tabs.create({ url, active: true })
	}
	return browser.windows.create({ url, focused: true })
}

export const injectContentScriptNotificationIdPrefix = `inject${notificationDelimiter}`

export const handleInjectContentScriptNotificationClick = async id => {
	const [selectKeystoreId, tabId, tabUrl] = id
		.slice(injectContentScriptNotificationIdPrefix.length)
		.split(notificationDelimiter)
	const url = new URL(tabUrl)

	await sharedStore.persist.rehydrate()
	const { theme } = sharedStore.getState()

	const noneSharedStore = await getNoneSharedStore(selectKeystoreId)
	await noneSharedStore.persist.rehydrate()
	const { addPendingActionAction } = noneSharedStore.getState()

	const messageId = generateId()
	addPendingActionAction(messageId, { host: url.host, request: { tabId, tabUrl } })

	await browserService.showPopup(theme, `/notification/inject/${messageId}`)
}

export const handleNotificationClick = async id => {
	switch (true) {
		case id.startsWith(txNotificationIdPrefix):
			return handleTransactionNotificationClick(id)
		case id.startsWith(injectContentScriptNotificationIdPrefix):
			return handleInjectContentScriptNotificationClick(id)
		default:
			return undefined
	}
}
