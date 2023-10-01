import type { Tabs } from 'webextension-polyfill';
import browser from 'webextension-polyfill'

import { getExtensionTabsByUrl } from '@src/browser/tabs'
import { config } from '@src/config'

export const openAppPopup = async (path: string = '') => {
	const [tab] = await getExtensionTabsByUrl(config.popup.pages.app)
	if (!tab) {
		const popupWindow = await browser.windows.create({
			url: browser.runtime.getURL(`${config.popup.pages.app}${path}`),
			type: 'popup',
			width: config.popup.width,
			height: config.popup.height,
		})

		return new Promise<Tabs.Tab>(resolve => {
			const listener = (tabId: number, info: Tabs.OnUpdatedChangeInfoType) => {
				if (info.status === 'complete' && tabId === popupWindow?.tabs?.[0].id) {
					browser.tabs.onUpdated.removeListener(listener)
					resolve(popupWindow?.tabs?.[0])
				}
			}
			browser.tabs.onUpdated.addListener(listener)
		})
	}

	await chrome.windows.update(tab.windowId, { focused: true })

	await browser.tabs.update(tab.id!, { active: true })
	return tab
}
