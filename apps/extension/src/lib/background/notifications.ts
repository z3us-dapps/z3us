import browser from 'webextension-polyfill'
import { EXPLORER_URL } from '@src/config'

export const notificationDelimiter = '--'
export const txNotificationIdPrefix = `tx${notificationDelimiter}`

export const handleNotificationClick = async id => {
	if (id.startsWith(txNotificationIdPrefix)) {
		const [, txID] = id.slice(txNotificationIdPrefix.length).split(notificationDelimiter)
		const url = `${EXPLORER_URL}/transactions/${txID}`

		const currentWindow = await browser.windows.getCurrent()
		if (currentWindow != null) {
			currentWindow.focused = true
			return browser.tabs.create({ url, active: true })
		}
		return browser.windows.create({ url, focused: true })
	}
	return undefined
}
