import browser from 'webextension-polyfill'

import { getExtensionTabsByUrl } from '@src/browser/tabs'
import { config } from '@src/config'
import { getTheme } from '@src/styles/theme'

const menuId = 'z3us-app'

const openAppPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return
	const theme = await getTheme()
	const app = `${config.popup.dir}/${theme}.html`
	const [page] = await getExtensionTabsByUrl(app)
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		const url = browser.runtime.getURL(app)
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
