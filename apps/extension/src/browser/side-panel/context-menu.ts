import browser from 'webextension-polyfill'

const menuId = 'z3us-side-panel'

const openSidePanel = async ({ menuItemId }, tab) => {
	if (menuItemId !== menuId) return
	if (chrome?.sidePanel) {
		await (chrome.sidePanel as any).open({ windowId: tab.windowId })
	} else {
		await browser.sidebarAction.open()
	}
}

export const addSidePanel = () => {
	browser.contextMenus.create({
		id: menuId,
		title: 'Open in Side Panel',
		contexts: ['all'],
	})
	browser.contextMenus.onClicked.addListener(openSidePanel)
}
