import browser from 'webextension-polyfill'

import { getExtensionTabsByUrl } from '@src/browser/tabs'
import { config } from '@src/config'

const menuId = 'radix-dev-tools'

const openRadixDevToolsPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const [page] = await getExtensionTabsByUrl(config.devTools.url)
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		const url = browser.runtime.getURL(config.devTools.url)
		await browser.tabs.create({ url })
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
