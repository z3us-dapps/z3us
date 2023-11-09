import type { Tabs } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { config } from '@src/config'
import { getTheme } from '@src/styles/theme'

export const openAppPopup = async (path: string = '') => {
	const theme = await getTheme()
	const popupWindow = await browser.windows.create({
		url: browser.runtime.getURL(`${config.popup.dir}/${theme}.html${path}`),
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
