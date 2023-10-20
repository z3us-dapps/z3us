import browser from 'webextension-polyfill'

import { getExtensionTabsByUrl } from '@src/browser/tabs'
import { config } from '@src/config'

const menuId = 'z3us-app'

const openAppPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const [page] = await getExtensionTabsByUrl(config.popup.pages.app)
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		const url = browser.runtime.getURL(config.popup.pages.app)
		await browser.tabs.create({ url })
	}
}

export const addDashboard = () => {
	browser.contextMenus.create({
		id: menuId,
		title: 'Open in Browser',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openAppPage)
}
