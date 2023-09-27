import browser from 'webextension-polyfill'

import { getExtensionTabsByUrl } from '@src/browser/tabs'
import { config } from '@src/config'

const menuId = 'radix-ledger'

const openRadixLedgerPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const [page] = await getExtensionTabsByUrl(config.popup.pages.ledger)
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		const url = browser.runtime.getURL(config.popup.pages.ledger)
		await browser.tabs.create({ url })
	}
}

export const addLedger = () => {
	if (!APP_DEV_TOOLS) return

	browser.contextMenus.create({
		id: menuId,
		title: 'Radix Ledger',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openRadixLedgerPage)
}
