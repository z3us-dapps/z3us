import { getExtensionTabsByUrl } from 'chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const openRadixDevToolsPage = async () => {
	const devToolsUrl = browser.runtime.getURL(config.devTools.url)

	const result = await getExtensionTabsByUrl(config.devTools.url)

	if (result.isErr()) return

	const [devToolsTab] = result.value

	if (devToolsTab?.id) {
		await browser.tabs.update(devToolsTab.id, { active: true })
	} else {
		await browser.tabs.create({
			url: devToolsUrl,
		})
	}
}

export const addDevTools = () => {
	if (config.isDevlopmentMode) {
		browser.contextMenus.removeAll().then(() => {
			browser.contextMenus.create({
				id: 'radix-dev-tools',
				title: 'Radix Dev Tools',
				contexts: ['all'],
			})
			browser.contextMenus.onClicked.addListener(openRadixDevToolsPage)
		})
	}
}
