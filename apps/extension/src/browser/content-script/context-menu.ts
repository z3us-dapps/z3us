import browser from 'webextension-polyfill'

import { handleContentScriptInject } from './status'

const menuId = 'z3us-content-script'

const injectContentScript = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
	if (tab?.id) handleContentScriptInject(tab.id)
}

export const addInjectContentScript = () => {
	browser.contextMenus.create({
		id: menuId,
		title: 'Inject Z3US',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(injectContentScript)
}
