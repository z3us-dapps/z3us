import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import browser from 'webextension-polyfill'

const menuId = 'radix-logs'

const exportLogs = async ({ menuItemId }) => {
	if (menuItemId !== menuId) return

	browser.runtime.sendMessage(createRadixMessage.downloadLogs())
}

export const addLogs = () => {
	browser.contextMenus.create({
		id: menuId,
		title: 'Export Radix Connector Logs',
		contexts: ['action'],
	})
	browser.contextMenus.onClicked.addListener(exportLogs)
}
