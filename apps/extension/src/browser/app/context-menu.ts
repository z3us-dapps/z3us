import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'z3us-app'

const openAppPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const url = browser.runtime.getURL(config.popup.pages.app)
	const result = await getExtensionTabsByUrl(config.popup.pages.app)
	if (result.isErr()) return

	const [page] = result.value
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		await browser.tabs.create({ url })
	}
}

export const addDashboard = () => {
	browser.contextMenus.create({
		id: menuId,
		title: 'Open in browser',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openAppPage)
}
