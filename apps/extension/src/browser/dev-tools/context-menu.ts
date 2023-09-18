import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-dev-tools'

const openRadixDevToolsPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const url = browser.runtime.getURL(config.devTools.url)
	const result = await getExtensionTabsByUrl(config.devTools.url)
	if (result.isErr()) return

	const [page] = result.value
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		await browser.tabs.create({url})
	}
}

export const addDevTools = () => {
	if (!APP_DEV_TOOLS) return

	browser.contextMenus.create({
		id: menuId,
		title: 'Radix DevTools',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openRadixDevToolsPage)
}