import type { Tabs } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

import { getExtensionTabsByUrl } from '@src/browser/tabs'
import { config } from '@src/config'
import { getTheme } from '@src/styles/theme'

export const openAppPopup = async (path: string = '') => {
	const theme = await getTheme()
	const app = `${config.popup.dir}/${theme}.html`
	const [tab] = await getExtensionTabsByUrl(app)
	if (!tab) {
		const popupWindow = await browser.windows.create({
			url: browser.runtime.getURL(`${app}${path}`),
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

	await browser.windows.update(tab.windowId, { focused: true })

	await browser.tabs.update(tab.id!, { active: true })
	return tab
}
