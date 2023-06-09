import { getExtensionTabsByUrl } from '@radixdlt/connector-extension/src/chrome/helpers/get-extension-tabs-by-url'
import browser from 'webextension-polyfill'

import { config } from '@src/config'

const menuId = 'radix-offscreen'

const openRadixOffscreenPage = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const offscreenUrl = browser.runtime.getURL(config.offscreen.url)

	const result = await getExtensionTabsByUrl(config.offscreen.url)

	if (result.isErr()) return

	const [offscreenTab] = result.value

	if (offscreenTab?.id) {
		await browser.tabs.update(offscreenTab.id, { active: true })
	} else {
		await browser.tabs.create({
			url: offscreenUrl,
		})
	}
}

export const addOffscreen = () => {
	if (!APP_DEV_TOOLS) return

	browser.contextMenus.create({
		id: menuId,
		title: 'Radix Offscreen',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openRadixOffscreenPage)
}
