import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-ledger'

const openRadixLedgerPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const url = browser.runtime.getURL(config.popup.pages.ledger)
	const result = await getExtensionTabsByUrl(config.popup.pages.ledger)
	if (result.isErr()) return

	const [page] = result.value
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		await browser.tabs.create({url})
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
