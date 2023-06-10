import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-pairing'

const openRadixPairingPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const url = browser.runtime.getURL(config.popup.pages.pairing)
	const result = await getExtensionTabsByUrl(config.popup.pages.pairing)
	if (result.isErr()) return

	const [page] = result.value
	if (page?.id) {
		await browser.tabs.update(page.id, { active: true })
	} else {
		await browser.tabs.create({url})
	}
}

export const addPairing = () => {
	if (!APP_DEV_TOOLS) return

	browser.contextMenus.create({
		id: menuId,
		title: 'Radix Pairing',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openRadixPairingPage)
}
