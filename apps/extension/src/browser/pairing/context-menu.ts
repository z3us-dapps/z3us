import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-pairing'

const openRadixPairingPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const pairingUrl = browser.runtime.getURL(config.popup.pages.pairing)

	const result = await getExtensionTabsByUrl(config.popup.pages.pairing)

	if (result.isErr()) return

	const [pairing] = result.value

	if (pairing?.id) {
		await browser.tabs.update(pairing.id, { active: true })
	} else {
		await browser.tabs.create({
			url: pairingUrl,
		})
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
