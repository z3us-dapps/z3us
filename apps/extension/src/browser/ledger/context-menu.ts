import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-ledger'

const openRadixLedgerPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const ledgerUrl = browser.runtime.getURL(config.popup.pages.ledger)

	const result = await getExtensionTabsByUrl(config.popup.pages.ledger)

	if (result.isErr()) return

	const [ledger] = result.value

	if (ledger?.id) {
		await browser.tabs.update(ledger.id, { active: true })
	} else {
		await browser.tabs.create({
			url: ledgerUrl,
		})
	}
}

export const addLedger = () => {
	if (!APP_DEV_TOOLS) return

	browser.contextMenus.create({
		id: menuId,
		title: 'Radix ledger',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openRadixLedgerPage)
}
