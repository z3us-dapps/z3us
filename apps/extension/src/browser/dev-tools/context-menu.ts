import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-dev-tools'

const openRadixDevToolsPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

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
	if (!APP_DEV_TOOLS) return

	browser.contextMenus.create({
		id: menuId,
		title: 'Radix Dev Tools',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openRadixDevToolsPage)
}