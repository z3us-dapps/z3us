import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const openRadixPairingPage = async () => {
	const pairingUrl = browser.runtime.getURL(config.popup.pages.pairing)

	const result = await getExtensionTabsByUrl(config.popup.pages.pairing)

	if (result.isErr()) return

	const [devToolsTab] = result.value

	if (devToolsTab?.id) {
		await browser.tabs.update(devToolsTab.id, { active: true })
	} else {
		await browser.tabs.create({
			url: pairingUrl,
		})
	}
}

export const addPairing = () => {
	if (config.isDevlopmentMode) {
		browser.contextMenus.create({
			id: 'radix-pairing',
			title: 'Radix Pairing',
			contexts: ['all'],
		})
		browser.contextMenus.onClicked.addListener(openRadixPairingPage)
	}
}
